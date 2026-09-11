import serial
import time

PORT = "COM6"
BAUDRATE = 115200

vega = serial.Serial(PORT, BAUDRATE, timeout=2)

time.sleep(2)

print("VEGA connected")

vega.write(b"RUNNING\n")
print("Green command sent")

time.sleep(3)

vega.write(b"IDLE\n")
print("Red command sent")

time.sleep(3)

vega.write(b"OFF\n")
print("OFF command sent")

vega.close()
print("Connection closed")