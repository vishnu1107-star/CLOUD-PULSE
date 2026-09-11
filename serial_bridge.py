# serial_bridge.py
import requests, time
# Swap USE_REAL_SERIAL to True once board is connected
USE_REAL_SERIAL = False
INSTANCE_ID = "i-0a1b2c3d"
FLASK_URL = f"http://localhost:5000/instances/{INSTANCE_ID}/prefilter"

def read_source():
    if USE_REAL_SERIAL:
        import serial
        ser = serial.Serial("COM3", 115200, timeout=2)  # update COM port
        while True:
            line = ser.readline().decode().strip()
            if "PREFILTER" in line:
                yield line.split(": ")[1]
    else:
        from fake_serial_sim import simulate_prefilter
        yield from simulate_prefilter()

for state in read_source():
    try:
        requests.post(FLASK_URL, json={"prefilter_flagged": state == "IDLE"})
        print(f"Posted: {state}")
    except Exception as e:
        print(f"POST failed: {e}")