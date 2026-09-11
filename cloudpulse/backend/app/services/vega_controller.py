import serial
import time
import logging
from typing import Dict, Any

logger = logging.getLogger(__name__)


class VegaController:
    """
    Physical VEGA Aries V2 hardware safety interlock.

    CloudPulse sends resource telemetry to VEGA.
    VEGA validates the telemetry and returns:
        APPROVED
        REJECTED,...
    """

    def __init__(
        self,
        port: str = "COM6",
        baud_rate: int = 115200,
        timeout: float = 2.0
    ):
        self.port = port
        self.baud_rate = baud_rate
        self.timeout = timeout
        self.serial_connection = None

    def connect(self) -> bool:
        """Open the physical VEGA serial connection."""

        if self.serial_connection and self.serial_connection.is_open:
            return True

        try:
            self.serial_connection = serial.Serial(
                self.port,
                self.baud_rate,
                timeout=self.timeout
            )

            time.sleep(1)

            logger.info(
                "VEGA Aries V2 connected on %s",
                self.port
            )

            return True

        except Exception as exc:
            logger.error(
                "VEGA connection failed on %s: %s",
                self.port,
                exc
            )

            self.serial_connection = None
            return False

    def disconnect(self):
        """Close VEGA connection."""

        if self.serial_connection:
            try:
                self.serial_connection.close()
            except Exception:
                pass

        self.serial_connection = None

    def evaluate_reclamation(
        self,
        cpu: float,
        network: float,
        sockets: int,
        iops: float,
        memory: float = 18.0
    ) -> Dict[str, Any]:
        """
        Send telemetry to VEGA Aries V2.

        Reclamation is allowed ONLY if VEGA returns APPROVED.
        """

        if not self.connect():
            return {
                "approved": False,
                "status": "VEGA_OFFLINE",
                "reason": "VEGA Aries V2 is unavailable"
            }

        command = (
            f"EVAL,"
            f"{cpu:.2f},"
            f"{network:.2f},"
            f"{int(sockets)},"
            f"{iops:.2f},"
            f"{memory:.2f}\n"
        )

        try:
            self.serial_connection.reset_input_buffer()

            logger.info(
                "VEGA request: %s",
                command.strip()
            )

            self.serial_connection.write(
                command.encode("utf-8")
            )

            self.serial_connection.flush()

            deadline = time.time() + self.timeout

            while time.time() < deadline:

                if self.serial_connection.in_waiting:

                    response = (
                        self.serial_connection
                        .readline()
                        .decode("utf-8", errors="ignore")
                        .strip()
                    )

                    logger.info(
                        "VEGA response: %s",
                        response
                    )

                    if response == "APPROVED":
                        return {
                            "approved": True,
                            "status": "APPROVED",
                            "reason": "VEGA hardware safety validation passed"
                        }

                    if response.startswith("REJECTED"):
                        return {
                            "approved": False,
                            "status": "REJECTED",
                            "reason": response
                        }

            return {
                "approved": False,
                "status": "VEGA_TIMEOUT",
                "reason": "No response received from VEGA"
            }

        except Exception as exc:

            logger.error(
                "VEGA evaluation error: %s",
                exc
            )

            self.disconnect()

            return {
                "approved": False,
                "status": "VEGA_ERROR",
                "reason": str(exc)
            }

    def set_led_status(self, status: str) -> Dict[str, Any]:
        """
        Send physical LED command to VEGA Aries V2 over the shared COM6 serial connection.
        
        Mapping:
        - RUNNING / ACTIVE -> GREEN ON (GPIO 14 HIGH, GPIO 13 LOW)
        - FAST / IDLE / RECLAIMED / PAUSED / STOPPED -> RED ON (GPIO 14 LOW, GPIO 13 HIGH)
        - Unknown / Error / Unavailable -> Both OFF (GPIO 14 & GPIO 13 LOW)
        """
        if not self.connect():
            return {
                "success": False,
                "status": "VEGA_OFFLINE",
                "reason": "VEGA Aries V2 unavailable on " + str(self.port)
            }

        status_str = str(status).upper().strip()

        if status_str in ["RUNNING", "ACTIVE", "0", "GREEN"]:
            cmd_val = "0"
            led_info = "GREEN (GPIO 14 = HIGH, GPIO 13 = LOW)"
        elif status_str in ["IDLE", "FAST", "IDLE CANDIDATE", "RECLAIMED", "PAUSED", "STOPPED", "1", "RED"]:
            cmd_val = "1"
            led_info = "RED (GPIO 14 = LOW, GPIO 13 = HIGH)"
        else:
            cmd_val = "-1"
            led_info = "OFF (Both GPIO 14 & 13 = LOW)"

        command = f"LED,{cmd_val}\n"

        try:
            logger.info("Sending VEGA LED command: %s for status '%s'", command.strip(), status_str)
            self.serial_connection.write(command.encode("utf-8"))
            self.serial_connection.flush()
            return {
                "success": True,
                "status": status_str,
                "led_state": cmd_val,
                "led_info": led_info
            }
        except Exception as exc:
            logger.error("Failed to send LED command to VEGA: %s", exc)
            self.disconnect()
            return {
                "success": False,
                "status": "VEGA_ERROR",
                "reason": str(exc)
            }



# Shared physical VEGA controller
vega_controller = VegaController(
    port="COM6",
    baud_rate=115200,
    timeout=2.0
)