# fake_serial_sim.py
import random, time

def simulate_prefilter():
    while True:
        reading = random.randint(0, 400)
        state = "IDLE" if reading < 200 else "ACTIVE"
        print(f"PREFILTER: {state}")
        yield state
        time.sleep(1)