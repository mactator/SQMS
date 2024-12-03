@echo off
setlocal

:: Check if a parameter is passed (the number of instances)
if "%1"=="" (
    echo Please provide the number of instances to start.
    exit /b 1
)

set /a NUM_INSTANCES=%1
set /a START_PORT=5000

:: Loop to start the specified number of instances
for /l %%i in (1,1,%NUM_INSTANCES%) do (
    set /a PORT=%START_PORT% + %%i
    echo Starting server on port %PORT%...
    start cmd /k bun run dev --port %PORT%
)

echo All instances started.
