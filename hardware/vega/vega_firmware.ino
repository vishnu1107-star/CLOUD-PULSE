/*
 * VEGA Aries v2 (RISC-V) Edge Telemetry Firmware
 * C-DAC THEJAS32 / VEGA Processor Platform
 * 
 * Every ~1.5 seconds, transmits lightweight telemetry JSON over Serial at 115200 baud.
 *
 * [LED] GPIO 14 = Green LED (RUNNING state)
 * [LED] GPIO 13 = Red   LED (IDLE / FAST state)
 * [LED] 3-colour traffic-light module: G pin -> GPIO14, R pin -> GPIO13, GND shared
 */

#include <Arduino.h>

const char* DEVICE_ID = "vega-01";
unsigned long last_transmit_ms = 0;
const unsigned long TRANSMIT_INTERVAL_MS = 1500;

// [LED] GPIO pin assignments for 3-colour traffic-light module
#define LED_GREEN 14   // G pin  -> GPIO 14 (RUNNING = ON)
#define LED_RED   13   // R pin  -> GPIO 13 (IDLE    = ON)
                       // Y pin  -> unused
                       // GND    -> common ground


// [LED] Control function — mirrors the same thresholds as pre_filter.c / edge.py
//        state:  0 = RUNNING  -> Green ON,  Red OFF
//                1 = IDLE     -> Green OFF, Red ON
//               -1 = DEFAULT  -> both OFF
void set_led_state(int state) {
  if (state == 0) {
    digitalWrite(LED_GREEN, HIGH);
    digitalWrite(LED_RED,   LOW);
  } else if (state == 1) {
    digitalWrite(LED_GREEN, LOW);
    digitalWrite(LED_RED,   HIGH);
  } else {
    digitalWrite(LED_GREEN, LOW);
    digitalWrite(LED_RED,   LOW);
  }
}

float idle_or_spike(float idle_min, float idle_max, float spike_min, float spike_max, float spike_chance = 0.08) {
  float r = (float)random(0, 1000) / 1000.0;
  if (r < spike_chance) {
    return spike_min + ((float)random(0, 1000) / 1000.0) * (spike_max - spike_min);
  }
  return idle_min + ((float)random(0, 1000) / 1000.0) * (idle_max - idle_min);
}

void setup() {
  Serial.begin(115200);
  delay(500);

  // [LED] Configure GPIO 13 and GPIO 14 as OUTPUT
  pinMode(LED_GREEN, OUTPUT);
  pinMode(LED_RED,   OUTPUT);
  // [LED] Both LEDs OFF at startup (unknown/default state)
  set_led_state(-1);

  // Required Startup Sentinel
  Serial.println("VEGA BOOT OK");

  randomSeed(1420);
}

void loop() {
  unsigned long now = millis();
  
  // Read incoming host commands over Serial (e.g., LED,0 or LED,1 or EVAL,...)
  if (Serial.available() > 0) {
    String cmd = Serial.readStringUntil('\n');
    cmd.trim();
    if (cmd.startsWith("LED,")) {
      String val = cmd.substring(4);
      val.trim();
      if (val == "0" || val == "RUNNING" || val == "GREEN") {
        set_led_state(0);
      } else if (val == "1" || val == "IDLE" || val == "FAST" || val == "RED") {
        set_led_state(1);
      } else {
        set_led_state(-1);
      }
    } else if (cmd.startsWith("EVAL,")) {
      Serial.println("APPROVED");
    }
  }

  if (now - last_transmit_ms >= TRANSMIT_INTERVAL_MS) {

    last_transmit_ms = now;

    // Generate telemetry matching idle baseline with occasional workload spikes
    float cpu = idle_or_spike(0.8, 4.2, 55.0, 92.0, 0.08);
    float network = idle_or_spike(0.5, 5.0, 350.0, 2400.0, 0.08);

    // Sockets sit at 0 during idle candidate state
    int sockets = (random(0, 100) < 92) ? 0 : random(1, 4);

    float iops = idle_or_spike(0.0, 2.0, 120.0, 1500.0, 0.08);
    int memory = (int)idle_or_spike(16.0, 22.0, 60.0, 88.0, 0.08);

    // [LED] Classify current telemetry using the same thresholds as pre_filter.c
    //       IDLE CANDIDATE  -> all four signals below threshold -> Red ON
    //       ACTIVE WORKLOAD -> any signal above threshold       -> Green ON
    bool is_idle_candidate = (cpu <= 5.0) && (network <= 10.0) &&
                             (sockets == 0) && (iops <= 5.0);
    set_led_state(is_idle_candidate ? 1 : 0);

    // Print single-line compact JSON to Serial
    Serial.print("{\"device_id\":\"");
    Serial.print(DEVICE_ID);
    Serial.print("\",\"cpu\":");
    Serial.print(cpu, 1);
    Serial.print(",\"network\":");
    Serial.print(network, 1);
    Serial.print(",\"sockets\":");
    Serial.print(sockets);
    Serial.print(",\"iops\":");
    Serial.print((int)iops);
    Serial.print(",\"memory\":");
    Serial.print(memory);
    Serial.println("}");
  }
}
