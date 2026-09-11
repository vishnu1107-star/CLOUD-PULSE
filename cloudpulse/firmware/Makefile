# ============================================================================
# CloudPulse Edge Pre-Filter Engine -- Makefile
# Supports: Generic Host GCC/Clang and RISC-V Cross-Compiler Toolchains
# ============================================================================

CC ?= gcc
CFLAGS ?= -O2 -Wall -Wextra -Wpedantic -std=c99 -I.
TARGET = pre_filter_bench

# Cross-compilation settings for C-DAC VEGA RISC-V (RV32IM)
# Set CROSS_COMPILE=riscv32-unknown-elf- or riscv-none-embed- when building for board
ifeq ($(ARCH),riscv)
    CROSS_COMPILE ?= riscv32-unknown-elf-
    CC = $(CROSS_COMPILE)gcc
    CFLAGS += -march=rv32im -mabi=ilp32 -mcmodel=medlow -ffreestanding -nostdlib
endif

SRCS = pre_filter.c main.c
OBJS = $(SRCS:.c=.o)

all: $(TARGET)

$(TARGET): $(OBJS)
	$(CC) $(CFLAGS) -o $@ $^

%.o: %.c pre_filter.h
	$(CC) $(CFLAGS) -c $< -o $@

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(OBJS) $(TARGET) $(TARGET).exe *.obj

.PHONY: all run clean
