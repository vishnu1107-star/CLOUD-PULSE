/*
 * VEGA Aries v2 (RISC-V) Edge Telemetry Firmware
 * C-DAC THEJAS32 / VEGA Processor Platform
 * 
 * Every ~1.5 seconds, transmits lightweight telemetry JSON over Serial at 115200 baud.
 */

#include <Arduino.h>

const char* DEVICE_ID = "vega-01";
unsigned long last_transmit_ms = 0;
const unsigned long TRANSMIT_INTERVAL_MS = 1500;

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
  
  // Required Startup Sentinel
  Serial.println("VEGA BOOT OK");
  
  randomSeed(1420);
}

void loop() {
  unsigned long now = millis();
  
  if (now - last_transmit_ms >= TRANSMIT_INTERVAL_MS) {
    last_transmit_ms = now;

    // Generate telemetry matching idle baseline with occasional workload spikes
    float cpu = idle_or_spike(0.8, 4.2, 55.0, 92.0, 0.08);
    float network = idle_or_spike(0.5, 5.0, 350.0, 2400.0, 0.08);
    
    // Sockets sit at 0 during idle candidate state
    int sockets = (random(0, 100) < 92) ? 0 : random(1, 4);
    
    float iops = idle_or_spike(0.0, 2.0, 120.0, 1500.0, 0.08);
    int memory = (int)idle_or_spike(16.0, 22.0, 60.0, 88.0, 0.08);

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
