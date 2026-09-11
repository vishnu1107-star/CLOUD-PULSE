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


# Shared physical VEGA controller
vega_controller = VegaController(
    port="COM6",
    baud_rate=115200,
    timeout=2.0
)