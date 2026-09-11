import sys
import os

sys.path.insert(0, os.path.dirname(__file__))

from app.services.vega_controller import vega_controller

print("==========================================")
print("  CloudPulse VEGA LED Integration Test   ")
print("==========================================")
print("Testing set_led_status('RUNNING')...")
res_running = vega_controller.set_led_status("RUNNING")
print("Result for RUNNING:", res_running)

print("\nTesting set_led_status('IDLE')...")
res_idle = vega_controller.set_led_status("IDLE")
print("Result for IDLE:", res_idle)

print("\nTesting set_led_status('OFF')...")
res_off = vega_controller.set_led_status("OFF")
print("Result for OFF:", res_off)
