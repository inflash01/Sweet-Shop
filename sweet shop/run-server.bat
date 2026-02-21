@echo off
REM Simple HTTP Server for Sweet Shop Website
REM Navigate to the script directory and run it

cd /d "%~dp0"

echo.
echo Starting Sweet Paradise Website...
echo.
echo Open your browser and go to: http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.

python -m http.server 8000
