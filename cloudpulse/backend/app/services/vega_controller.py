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
        timeout: float = 0.2,
        simulation_mode: bool = False
    ):
        self.port = port
        self.baud_rate = baud_rate
        self.timeout = timeout
        self.simulation_mode = simulation_mode
        self.serial_connection = None

    def is_connected(self) -> bool:
        """Check if physical VEGA serial connection is active and open."""
        return bool(self.serial_connection and self.serial_connection.is_open)

    def set_simulation_mode(self, enabled: bool):
        """Enable or disable explicit software simulation fallback mode."""
        self.simulation_mode = enabled
        logger.info("[VEGA] Simulation mode set to: %s", enabled)

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

            time.sleep(0.05)

            logger.info(
                "VEGA Aries V2 connected on %s",
                self.port
            )

            return True

        except Exception as exc:
            logger.warning(
                "VEGA connection unavailable on %s: %s",
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
        memory: float = 18.0,
        allow_simulation: bool = False
    ) -> Dict[str, Any]:
        """
        Send telemetry to physical VEGA Aries V2 for hardware safety validation.

        When physical VEGA is connected:
        - Sends UART frame: EVAL,<cpu>,<network>,<sockets>,<iops>,<memory>
        - Reclaims allowed ONLY if VEGA hardware returns APPROVED.

        When physical VEGA is disconnected/offline:
        - Returns VEGA_OFFLINE failure (approved=False).
        - Unsafe hardware-dependent actions are blocked safely.

        When software simulation is explicitly enabled:
        - Evaluates software rule thresholds and tags decision with mode='SIMULATION'.
        """

        use_simulation = allow_simulation or self.simulation_mode

        # Check physical hardware connection
        if not self.connect():
            if use_simulation:
                # Explicit software simulation mode (for offline development without hardware)
                is_safe = (cpu < 2.5) and (network < 10.0) and (int(sockets) == 0) and (iops <= 5.0)
                if is_safe:
                    logger.info("[VEGA SIMULATION] APPROVED: Zero active sockets, CPU < 2.5%, Net < 10 KB/s")
                    return {
                        "approved": True,
                        "status": "SIMULATED_APPROVED",
                        "reason": "VEGA software simulation validation passed (Zero sockets, CPU < 2.5%)",
                        "hardware_connected": False,
                        "mode": "SIMULATION"
                    }
                else:
                    logger.warning(f"[VEGA SIMULATION] REJECTED: Active sockets={sockets}, CPU={cpu}%, Net={network}KB/s")
                    return {
                        "approved": False,
                        "status": "SIMULATED_REJECTED",
                        "reason": f"VEGA simulation safety rejection: Sockets={sockets}, CPU={cpu:.1f}%, Net={network:.1f} KB/s",
                        "hardware_connected": False,
                        "mode": "SIMULATION"
                    }

            # Physical VEGA is disconnected / unavailable and simulation mode is NOT enabled
            logger.warning("[VEGA HARDWARE DISCONNECTED] evaluate_reclamation blocked: Physical VEGA board on %s is offline", self.port)
            return {
                "approved": False,
                "status": "VEGA_OFFLINE",
                "reason": f"Physical VEGA hardware is offline / disconnected on {self.port}",
                "hardware_connected": False,
                "mode": "REAL_VEGA"
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
                            "reason": "VEGA hardware safety validation passed",
                            "hardware_connected": True,
                            "mode": "REAL_VEGA"
                        }

                    if response.startswith("REJECTED"):
                        return {
                            "approved": False,
                            "status": "REJECTED",
                            "reason": response,
                            "hardware_connected": True,
                            "mode": "REAL_VEGA"
                        }

            # If physical hardware connected but timed out without response
            logger.warning("[VEGA TIMEOUT] No response received from VEGA on %s within timeout", self.port)
            return {
                "approved": False,
                "status": "VEGA_TIMEOUT",
                "reason": f"VEGA hardware on {self.port} did not respond within {self.timeout}s timeout window",
                "hardware_connected": True,
                "mode": "REAL_VEGA"
            }

        except Exception as exc:
            logger.error("VEGA evaluation error: %s", exc)
            self.disconnect()
            return {
                "approved": False,
                "status": "VEGA_ERROR",
                "reason": f"VEGA hardware serial communication error: {exc}",
                "hardware_connected": False,
                "mode": "REAL_VEGA"
            }

    def set_led_status(self, status: str, allow_simulation: bool = False) -> Dict[str, Any]:
        """
        Send physical LED command to VEGA Aries V2 over the shared COM6 serial connection.
        
        Mapping:
        - RUNNING / ACTIVE -> GREEN ON (GPIO 14 HIGH, GPIO 13 LOW)
        - FAST / IDLE / SAFE_TO_RECLAIM / IDLE CANDIDATE / RECLAIMED / PAUSED / STOPPED -> RED ON (GPIO 14 LOW, GPIO 13 HIGH)
        - OFF / Unknown / Error -> Both OFF (GPIO 14 & GPIO 13 LOW)
        """
        status_str = str(status).upper().strip()

        if status_str in ["RUNNING", "ACTIVE", "0", "GREEN"]:
            cmd_name = "RUNNING"
            gpio_log = "[VEGA LED] status=RUNNING GPIO14=HIGH GPIO13=LOW"
            led_info = "GREEN (GPIO 14 = HIGH, GPIO 13 = LOW)"
        elif status_str in ["IDLE", "FAST", "IDLE CANDIDATE", "IDLE_CANDIDATE", "SAFE_TO_RECLAIM", "RECLAIMED", "PAUSED", "STOPPED", "1", "RED"]:
            cmd_name = "FAST" if status_str == "FAST" else "IDLE"
            gpio_log = f"[VEGA LED] status={cmd_name} GPIO14=LOW GPIO13=HIGH"
            led_info = "RED (GPIO 14 = LOW, GPIO 13 = HIGH)"
        else:
            cmd_name = "OFF"
            gpio_log = "[VEGA LED] status=OFF GPIO14=LOW GPIO13=LOW"
            led_info = "OFF (Both GPIO 14 & 13 = LOW)"

        use_simulation = allow_simulation or self.simulation_mode

        if not self.connect():
            if use_simulation:
                logger.info(f"{gpio_log} ({self.port} serial offline - software simulated)")
                return {
                    "success": True,
                    "connected": False,
                    "status": cmd_name,
                    "led_state": cmd_name,
                    "led_info": f"{led_info} (Software Simulated)",
                    "gpio_log": gpio_log + " (Software Simulation mode)",
                    "mode": "SIMULATION"
                }

            logger.info(f"[VEGA LED] Physical VEGA disconnected on {self.port} — LED command not transmitted")
            return {
                "success": False,
                "connected": False,
                "status": "VEGA_OFFLINE",
                "led_state": "OFFLINE",
                "led_info": f"VEGA OFFLINE ({self.port} Disconnected)",
                "gpio_log": f"[VEGA OFFLINE] Hardware disconnected on {self.port}",
                "mode": "REAL_VEGA"
            }

        command = f"{cmd_name}\n"

        try:
            logger.info(gpio_log)
            print(gpio_log)
            self.serial_connection.write(command.encode("utf-8"))
            self.serial_connection.flush()
            return {
                "success": True,
                "connected": True,
                "status": cmd_name,
                "led_state": cmd_name,
                "led_info": led_info,
                "gpio_log": gpio_log,
                "mode": "REAL_VEGA"
            }
        except Exception as exc:
            logger.error("Failed to send LED command to VEGA: %s", exc)
            self.disconnect()
            return {
                "success": False,
                "connected": False,
                "status": "VEGA_ERROR",
                "led_state": "ERROR",
                "led_info": f"VEGA ERROR ({exc})",
                "reason": str(exc),
                "mode": "REAL_VEGA"
            }



# Shared physical VEGA controller
vega_controller = VegaController(
    port="COM6",
    baud_rate=115200,
    timeout=2.0
)