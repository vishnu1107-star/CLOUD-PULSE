# CloudPulse — VEGA Telemetry & Communication Protocol

**Target Hardware:** C-DAC VEGA Aries v3.0 (THEJAS32 RISC-V Core)  
**Standard Baud:** 115200 bps | **Framing:** 8-N-1

---

## 1. Binary Frame Structure (On-Device Memory Representation)

The VEGA firmware allocates an ultra-compact, 16-byte packed C-struct for telemetry:

```c
typedef struct __attribute__((packed)) {
    float    cpu_util_pct;       /* CPU utilization percentage [0.0 - 100.0]  (4 bytes) */
    uint32_t net_bytes_sec;      /* Network bandwidth in bytes/sec            (4 bytes) */
    uint32_t iops;               /* Disk / storage IO operations per second   (4 bytes) */
    uint16_t active_sockets;     /* Open TCP/HTTP/DB connection count         (2 bytes) */
    uint16_t memory_pct;         /* RAM utilization [0 - 100]                 (2 bytes) */
} vega_telemetry_frame_t;
```

Total size: **16 bytes**. Fits easily in the 256 KB SRAM of THEJAS32.

---

## 2. JSON Wire Protocol over UART / Serial

When dispatched over serial UART or WiFi/Ethernet bridge, frames are formatted as newline-delimited JSON:

### Upstream Telemetry (VEGA → CloudPulse API)

```json
{
  "device_id": "vega-01",
  "timestamp": "2026-09-11T09:00:00Z",
  "cpu": 1.4,
  "network": 2.1,
  "sockets": 0,
  "iops": 1.0,
  "memory": 18.0,
  "process_activity": 0,
  "tinyml_decision": "IDLE_CANDIDATE",
  "tinyml_confidence": 0.94
}
```

### Downstream Decision (CloudPulse API → VEGA)

```json
{
  "device_id": "vega-01",
  "decision": "IDLE_CANDIDATE",
  "confidence": 0.94,
  "safety_status": "PASS",
  "recommended_action": "RECLAIM",
  "primary_reason": "Zero active connections, CPU < 2.5%, network bandwidth minimal."
}
```

---

## 3. Decision Codes

| Decision Code | Meaning | LED Indication | Action |
| :--- | :--- | :--- | :--- |
| `ACTIVE` | Heavy CPU or network traffic | LED Green OFF | Keep Running |
| `IDLE_CANDIDATE` | CPU < 2.5%, Net < 10KB/s, Sockets == 0 | LED Green Solid | Safe to Reclaim |
| `NOT_SAFE` | Low CPU but active sockets (>0) | LED Red Blinking | Block Reclaim / Protect |
| `OFFLINE_HOLD` | Cloud unavailable | LED Yellow | Local Decision Only |
