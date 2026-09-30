@echo off
REM Wipes the LOCAL test database and file storage (never touches the live site),
REM then recreates the tables and loads the products and PDFs from products.sql.
REM Stop "Store worker" (wrangler dev) before running this.

cd /d "%~dp0store-worker"

if exist ".wrangler\state" (
  echo Clearing local test data...
  rmdir /s /q ".wrangler\state"
)

call npm run db:migrate:local || goto :error
call npm run products:local || goto :error

echo.
echo Local store is ready. Run start-dev.cmd next.
pause
exit /b 0

:error
echo.
echo Something failed above. Scroll up for the error.
pause
exit /b 1
