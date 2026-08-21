@echo off
REM ============================================================================
REM CloudPulse Edge Pre-Filter -- Windows MSVC Build & Benchmark Script
REM ============================================================================
echo [1/3] Locating MSVC Environment...
if defined VCVARS_INITIALIZED goto COMPILE

if exist "C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools\VC\Auxiliary\Build\vcvars64.bat" (
    call "C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools\VC\Auxiliary\Build\vcvars64.bat" > nul 2>&1
    set VCVARS_INITIALIZED=1
) else if exist "C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Auxiliary\Build\vcvars64.bat" (
    call "C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Auxiliary\Build\vcvars64.bat" > nul 2>&1
    set VCVARS_INITIALIZED=1
)

:COMPILE
echo [2/3] Compiling C source code (MSVC /O2 /W4)...
cl /O2 /W4 /Fe:pre_filter_bench.exe pre_filter.c main.c

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Compilation failed!
    exit /b %ERRORLEVEL%
)

echo.
echo [3/3] Running Validation Test Suite & Timing Benchmark...
echo.
pre_filter_bench.exe
echo.
echo Benchmark complete.
