import serial
import time

PORT = "COM6"
BAUD = 115200

print("Connecting to VEGA...")

ser = serial.Serial(PORT, BAUD, timeout=2)

time.sleep(2)

print("Connected to VEGA on", PORT)

ser.write(b"PING\n")

time.sleep(1)

while ser.in_waiting:
    response = ser.readline().decode(errors="ignore").strip()
    print("VEGA:", response)

ser.close()

print("Connection test completed.")
