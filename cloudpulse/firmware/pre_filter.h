/**
 * ============================================================================
 * CloudPulse Edge Pre-Filter Engine
 * Target: C-DAC VEGA Aries v3.0 IoT Board (THEJAS32 SoC, VEGA ET1031 RISC-V Core)
 * Clock: 100 MHz | SRAM: 256 KB | Toolchain: RISC-V GCC / Generic C99
 * 
 * File: pre_filter.h
 * Description: Header definitions for lightweight on-device telemetry pre-filtering.
 * ============================================================================
 */

#ifndef CLOUDPULSE_PRE_FILTER_H
#define CLOUDPULSE_PRE_FILTER_H

#include <stdint.h>
#include <stdbool.h>
#include <stddef.h>

#ifdef __cplusplus
extern "C" {
#endif

/* ----------------------------------------------------------------------------
 * Classification States
 * ---------------------------------------------------------------------------- */
typedef enum {
    CLASS_ACTIVE         = 0,  /* Workload is actively serving or processing */
    CLASS_CANDIDATE_IDLE = 1   /* Workload meets low-utilization idle criteria */
} classification_t;

/* ----------------------------------------------------------------------------
 * Raw Telemetry Sample Structure
 * Memory footprint: Exactly 16 bytes (packed alignment)
 * ---------------------------------------------------------------------------- */
typedef struct {
    float    cpu_util_pct;       /* CPU utilization percentage [0.0 - 100.0]  (4 bytes) */
    uint32_t net_bytes_sec;      /* Network bandwidth in bytes/sec            (4 bytes) */
    uint32_t iops;               /* Disk / storage IO operations per second   (4 bytes) */
    uint16_t active_sockets;     /* Open TCP/HTTP/DB connection count         (2 bytes) */
    uint16_t reserved;           /* 16-bit alignment padding / flags          (2 bytes) */
} telemetry_sample_t;

/* ----------------------------------------------------------------------------
 * Hand-Tuned Decision Thresholds
 * Note: Deterministic heuristics for edge decimation, NOT an on-device ML model.
 * ---------------------------------------------------------------------------- */
typedef struct {
    float    max_idle_cpu_pct;       /* e.g., 5.0 % */
    uint32_t max_idle_net_bytes_sec;  /* e.g., 10240 bytes/sec (10 KB/s) */
    uint32_t max_idle_iops;           /* e.g., 5 IOPS */
    uint16_t max_idle_sockets;        /* e.g., 0 open client sockets */
} prefilter_thresholds_t;

/* ----------------------------------------------------------------------------
 * Multi-Sample Window Filter State (Optional Smoothing)
 * Sliding window buffer to prevent single-spike false triggers.
 * Memory footprint: 16B * WINDOW_SIZE + 8B control = ~136 bytes (for size 8).
 * ---------------------------------------------------------------------------- */
#define PREFILTER_WINDOW_SIZE 8

typedef struct {
    telemetry_sample_t history[PREFILTER_WINDOW_SIZE];
    uint8_t            head;
    uint8_t            count;
    uint8_t            consecutive_idle_count;
    uint8_t            idle_threshold_count; /* e.g., 3 consecutive idle samples to trigger */
} prefilter_window_state_t;

/* ----------------------------------------------------------------------------
 * Function Prototypes
 * ---------------------------------------------------------------------------- */

/**
 * Returns default conservative thresholds calibrated for non-prod cloud/edge nodes.
 */
prefilter_thresholds_t prefilter_get_default_thresholds(void);

/**
 * Core Slide-Ready Classification Logic (< 15 lines in C implementation).
 * Evaluates a single telemetry sample against configured threshold bounds.
 * Deterministic O(1) time, zero dynamic heap allocations.
 */
classification_t classify_telemetry_window(const telemetry_sample_t *sample,
                                          const prefilter_thresholds_t *thresh);

/**
 * Initializes sliding window filter state.
 */
void prefilter_window_init(prefilter_window_state_t *state, uint8_t idle_trigger_count);

/**
 * Ingests a new sample into the sliding window and returns smoothed classification.
 */
classification_t prefilter_window_feed(prefilter_window_state_t *state,
                                      const telemetry_sample_t *sample,
                                      const prefilter_thresholds_t *thresh);

/**
 * Stub upstream forwarding hook (simulates UART serial / edge-to-cloud dispatch).
 * In production firmware, this sends a compact packet over UART / SPI / Wi-Fi.
 */
void forward_candidate_idle_upstream(uint32_t node_id,
                                     const telemetry_sample_t *sample,
                                     classification_t classification);

#ifdef __cplusplus
}
#endif

#endif /* CLOUDPULSE_PRE_FILTER_H */
