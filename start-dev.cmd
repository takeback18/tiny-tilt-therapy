@echo off
REM Starts everything needed to test the store locally, each in its own window:
REM   1. Store worker (wrangler dev)      http://localhost:8787
REM   2. Stripe webhook forwarding        (stripe listen)
REM   3. Website (vite)                   http://localhost:5173
REM Close a window (or press Ctrl+C in it) to stop that piece.
REM First time, or after a schema change: run reset-local-store.cmd first.

set ROOT=%~dp0

start "Store worker" /d "%ROOT%store-worker" cmd /k npx wrangler dev
start "Stripe listen" /d "%ROOT%store-worker" cmd /k npm run stripe:listen
start "Website" /d "%ROOT%" cmd /k npm run dev

echo Waiting for the servers to start...
timeout /t 10 /nobreak >nul
start "" http://localhost:5173/store
