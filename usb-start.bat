@echo off
setlocal

cd /d "%~dp0"

set PORT=8080

if not exist "dist\index.html" (
    echo.
    echo [Error] dist\index.html not found next to usb-start.bat.
    echo Make sure the 'dist' folder is in the SAME directory as this .bat file.
    echo.
    pause
    exit /b 1
)

if not exist "miniserve.exe" (
    echo.
    echo [Error] miniserve.exe not found next to usb-start.bat.
    echo Download it from: https://github.com/svenstaro/miniserve/releases
    echo File: miniserve-x86_64-pc-windows-msvc.exe (rename to miniserve.exe)
    echo.
    pause
    exit /b 1
)

echo.
echo ============================================================
echo  Starting local web server on http://localhost:%PORT%/
echo  Do NOT close this window. Closing it stops the server.
echo  To stop: close this window or press Ctrl+C.
echo ============================================================
echo.

REM Open the browser in a detached child process after a ~2-second
REM delay so miniserve has time to start listening on the port.
REM 'ping -n 3 127.0.0.1' is the most portable Windows "sleep 2".
start "" /min cmd /c "ping -n 3 127.0.0.1 >nul && start http://localhost:%PORT%/"

REM Run miniserve in the foreground; closing this window stops it.
miniserve.exe dist --port %PORT% --index index.html --interfaces 127.0.0.1

REM If miniserve exited (error, port in use, blocked, etc.) keep the
REM window open so the user can read the message.
echo.
echo ============================================================
echo  Server stopped or failed to start. See messages above.
echo  Press any key to close this window.
echo ============================================================
pause >nul
