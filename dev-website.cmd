@echo off
REM Runs the website for LOCAL testing with Cloudflare's Turnstile test site key
REM (always passes, shows a small "testing" widget). It pairs with the test secret
REM in store-worker\.dev.vars so the "Resend my downloads" page works on localhost.
REM Only affects this window; .env.local and production builds keep the real key.
REM Note: the contact form will fail here, because it talks to the LIVE contact
REM worker, which expects the real key. Use plain "npm run dev" to test that form.

set VITE_TURNSTILE_SITE_KEY=1x00000000000000000000AA
npm run dev
