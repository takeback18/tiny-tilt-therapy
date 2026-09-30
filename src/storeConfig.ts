export const STORE_WORKER_URL: string = import.meta.env.VITE_STORE_WORKER_URL ?? ''

// Cloudflare's Turnstile test site key: always passes, on any domain. The real
// widget only allows tinytilttherapy.com, so on localhost it fails with error
// 110200. When running `npm run dev` on localhost we swap in the test key; it
// pairs with the test secret in store-worker/.dev.vars. Production builds and
// the live site always use the real key.
const TURNSTILE_TEST_SITE_KEY = '1x00000000000000000000AA'
const isLocalDev =
  import.meta.env.DEV && ['localhost', '127.0.0.1'].includes(window.location.hostname)

export const TURNSTILE_SITE_KEY: string = isLocalDev
  ? TURNSTILE_TEST_SITE_KEY
  : (import.meta.env.VITE_TURNSTILE_SITE_KEY ?? '')
