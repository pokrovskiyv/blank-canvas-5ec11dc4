@echo off
chcp 65001 >nul
setlocal

REM ============================================================
REM  Запуск сайта с флешки (Windows). Двойной клик по этому файлу.
REM
REM  Структура на флешке:
REM      <корень флешки>\
REM          dist\              ← собранный сайт (папка из репозитория)
REM          miniserve.exe      ← портативный веб-сервер (см. ниже)
REM          usb-start.bat      ← этот файл
REM
REM  Откуда взять miniserve.exe:
REM      1. Открой https://github.com/svenstaro/miniserve/releases
REM      2. Скачай файл вида:
REM             miniserve-vX.Y.Z-x86_64-pc-windows-msvc.exe
REM      3. Переименуй в miniserve.exe
REM      4. Положи рядом с этим bat-файлом.
REM ============================================================

cd /d "%~dp0"

if not exist "dist\index.html" (
    echo.
    echo [Ошибка] Рядом с usb-start.bat не найдена папка dist\index.html.
    echo Скопируй на флешку папку dist целиком.
    echo.
    pause
    exit /b 1
)

if not exist "miniserve.exe" (
    echo.
    echo [Ошибка] Рядом с usb-start.bat не найден miniserve.exe.
    echo.
    echo Скачай его с:
    echo     https://github.com/svenstaro/miniserve/releases
    echo Файл: miniserve-vX.Y.Z-x86_64-pc-windows-msvc.exe
    echo Переименуй в miniserve.exe и положи на флешку рядом с этим bat.
    echo.
    pause
    exit /b 1
)

set PORT=8080
echo.
echo Запускаю локальный сервер на http://localhost:%PORT%
echo Чтобы остановить — закрой это окно или нажми Ctrl+C.
echo.

start "" "http://localhost:%PORT%/"

miniserve.exe dist --port %PORT% --index index.html --interfaces 127.0.0.1
