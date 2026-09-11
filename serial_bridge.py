# serial_bridge.py — VEGA Aries RISC-V Serial-to-API Telemetry Bridge
import sys
import time
import json
import requests

PORT = "COM3"
BAUD_RATE = 115200
API_URL = "http://localhost:5000/api/edge/telemetry"
FASTAPI_URL = "http://localhost:8000/api/v1/edge/telemetry"

USE_REAL_SERIAL = True

def connect_serial():
    """Attempts to connect to the VEGA board serial interface with auto-reconnect."""
    if not USE_REAL_SERIAL:
        return None

    try:
        import serial
        print(f"[BRIDGE] Connecting to VEGA Aries board on {PORT} at {BAUD_RATE} baud...")
        ser = serial.Serial(PORT, BAUD_RATE, timeout=2)
        print(f"[BRIDGE] Successfully connected to VEGA Aries board on {PORT}!")
        return ser
    except Exception as e:
        print(f"[BRIDGE WARNING] Could not open serial port {PORT}: {e}")
        print("[BRIDGE] Retrying connection in 3 seconds...")
        return None

def send_telemetry_payload(data_dict):
    """Posts telemetry JSON payload to CloudPulse backend endpoints."""
    headers = {"Content-Type": "application/json"}
    
    # Try primary Flask endpoint (port 5000)
    success = False
    try:
        res = requests.post(API_URL, json=data_dict, headers=headers, timeout=3)
        print(f"[SENT -> Flask:5000] Status: {res.status_code} | Payload: {json.dumps(data_dict)} | Resp: {res.text.strip()}")
        success = True
    except Exception as e:
        print(f"[BRIDGE Flask:5000 Warning] {e}")

    # Also post to FastAPI endpoint (port 8000) if active
    try:
        res2 = requests.post(FASTAPI_URL, json=data_dict, headers=headers, timeout=2)
        print(f"[SENT -> FastAPI:8000] Status: {res2.status_code} | Resp: {res2.text.strip()}")
        success = True
    except Exception:
        pass

    return success

def run_bridge_loop():
    """Main bridge event loop reading serial frames and forwarding to API."""
    print("=" * 70)
    print("      CLOUDPULSE — VEGA ARIES RISC-V HARDWARE TELEMETRY BRIDGE      ")
    print("=" * 70)
    
    ser = None

    while True:
        if USE_REAL_SERIAL and ser is None:
            ser = connect_serial()
            if ser is None:
                time.sleep(3)
                continue

        try:
            if ser and ser.is_open:
                line = ser.readline().decode('utf-8', errors='ignore').strip()
                if not line:
                    continue

                print(f"[SERIAL RECV] {line}")

                if "VEGA BOOT OK" in line:
                    print("[BRIDGE EVENT] VEGA Board Boot Sentinel Received!")
                    continue

                if line.startswith("{") and line.endswith("}"):
                    try:
                        payload = json.loads(line)
                        send_telemetry_payload(payload)
                    except json.JSONDecodeError:
                        print(f"[BRIDGE ERROR] Invalid JSON frame received: {line}")
            else:
                # Simulated Fallback loop if real serial hardware is unavailable
                from telemetry import generate_telemetry
                sim_data = generate_telemetry("i-0a1b2c3d")
                payload = {
                    "device_id": "vega-01",
                    "cpu": sim_data["cpu_percent"],
                    "network": round(sim_data["network_bytes"] / 1000.0, 1),
                    "sockets": sim_data["open_sockets"],
                    "iops": int(sim_data["iops"]),
                    "memory": 18,
                    "timestamp": time.time()
                }
                send_telemetry_payload(payload)
                time.sleep(1.5)

        except KeyboardInterrupt:
            print("\n[BRIDGE] Stopping serial bridge.")
            if ser and ser.is_open:
                ser.close()
            sys.exit(0)
        except Exception as err:
            print(f"[BRIDGE ERROR] Serial communication fault: {err}")
            if ser:
                try:
                    ser.close()
                except Exception:
                    pass
            ser = None
            time.sleep(2)

if __name__ == "__main__":
    run_bridge_loop()