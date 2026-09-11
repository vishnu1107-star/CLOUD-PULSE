/*
 * VEGA Aries V2 Standalone GPIO & LED Hardware Test Firmware
 * Platform: C-DAC THEJAS32 RISC-V (VEGA Aries V2)
 * Baud Rate: 115200
 *
 * Physical Wiring:
 *   VEGA GPIO 14 -> Module G (Green LED)
 *   VEGA GPIO 13 -> Module R (Red LED)
 *   VEGA GND     -> Module GND (Ground)
 *   Module Y     -> Unused
 *
 * Test Cycle:
 *   1. Green LED ON  (GPIO 14 HIGH, GPIO 13 LOW)  [2000 ms]
 *   2. Red LED ON    (GPIO 14 LOW,  GPIO 13 HIGH) [2000 ms]
 *   3. Both LEDs OFF (GPIO 14 LOW,  GPIO 13 LOW)  [1000 ms]
 */

#include <Arduino.h>

#define PIN_GREEN_LED 14  // VEGA GPIO 14 -> G pin
#define PIN_RED_LED   13  // VEGA GPIO 13 -> R pin

void setup() {
  Serial.begin(115200);
  delay(1000);

  Serial.println("==================================================");
  Serial.println("  VEGA Aries V2 Standalone Hardware GPIO Test");
  Serial.println("==================================================");
  Serial.println("[INIT] Configuring GPIO 14 (Green) & GPIO 13 (Red) as OUTPUT...");

  pinMode(PIN_GREEN_LED, OUTPUT);
  pinMode(PIN_RED_LED, OUTPUT);

  // Both OFF initially
  digitalWrite(PIN_GREEN_LED, LOW);
  digitalWrite(PIN_RED_LED, LOW);

  Serial.println("[INIT] Startup Complete. Beginning LED Hardware Test Loop...");
}

void loop() {
  // Step 1: GREEN LED ON
  Serial.println("[GPIO-TEST] GREEN ON  -> GPIO14 = HIGH, GPIO13 = LOW");
  digitalWrite(PIN_GREEN_LED, HIGH);
  digitalWrite(PIN_RED_LED, LOW);
  delay(2000);

  // Step 2: RED LED ON
  Serial.println("[GPIO-TEST] RED ON    -> GPIO14 = LOW,  GPIO13 = HIGH");
  digitalWrite(PIN_GREEN_LED, LOW);
  digitalWrite(PIN_RED_LED, HIGH);
  delay(2000);

  // Step 3: BOTH LEDs OFF
  Serial.println("[GPIO-TEST] BOTH OFF  -> GPIO14 = LOW,  GPIO13 = LOW");
  digitalWrite(PIN_GREEN_LED, LOW);
  digitalWrite(PIN_RED_LED, LOW);
  delay(1000);
}
