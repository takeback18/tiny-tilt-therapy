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

// ---- Coming-soon gate ----
// While false, /store and /downloads show a "coming soon" screen and the Store
// link is hidden from the nav. Set to true at launch to open the store to everyone.
export const STORE_OPEN = false

// SHA-256 of the preview password, so the public repo never contains the password
// itself. This is a soft gate for testing, not real security.
const PREVIEW_PASSWORD_SHA256 = 'be223342558a9dfc974383806e2bd28819d7399ec2fadc7706cc5f9e2f1c777b'
const PREVIEW_STORAGE_KEY = 'tinytilt-store-preview'

export function isStoreUnlocked(): boolean {
  if (STORE_OPEN) return true
  try {
    return window.localStorage.getItem(PREVIEW_STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

export async function tryUnlockStore(password: string): Promise<boolean> {
  const bytes = new TextEncoder().encode(password)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  const hex = Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('')
  if (hex !== PREVIEW_PASSWORD_SHA256) return false
  try {
    window.localStorage.setItem(PREVIEW_STORAGE_KEY, '1')
  } catch {
    // Storage blocked (private window etc.): unlocked for this visit only.
  }
  return true
}
