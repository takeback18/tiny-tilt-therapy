// ---- Holiday gift guide ----
// true  = "Gift Guide" shows in the nav and a callout shows on the homepage.
// false = both are hidden after the holidays. The /gift-guide page itself stays
//         reachable, so links already shared (Instagram etc.) keep working.
export const GIFT_GUIDE_ON = true

export interface GiftGuide {
  name: string
  image: string
  href: string
}

// In developmental order. Images live in public/gift-guides/ (800px wide WebP).
// Each link goes to a list on the Tiny Tilt Amazon storefront.
export const giftGuides: GiftGuide[] = [
  {
    name: 'Tummy Time Warriors',
    image: '/gift-guides/tummy-time-warriors.webp',
    href: 'https://www.amazon.com/shop/tinytilt/list/2PZ63PF8KORZZ?tag=onamztinytilt-20&ref_=hype_hm_sf_e&ccs_id=faef162b-8665-4613-9aa3-2a11bb22a370',
  },
  {
    name: "Rockin' Rollers",
    image: '/gift-guides/rockin-rollers.webp',
    href: 'https://www.amazon.com/shop/tinytilt/list/3BRWFQNJ1KOP6?tag=onamztinytilt-20&ref_=hype_hm_sf_e&ccs_id=9abf9c91-aad3-451c-8c2a-e3a3439a15bd',
  },
  {
    name: 'Sitting Superstars',
    image: '/gift-guides/sitting-superstars.webp',
    href: 'https://www.amazon.com/shop/tinytilt/list/224AJZKXJP8X0?tag=onamztinytilt-20&ref_=hype_hm_sf_e&ccs_id=cdeab262-50db-4236-b1bb-6241d33c6556',
  },
  {
    name: 'Crawling Cuties',
    image: '/gift-guides/crawling-cuties.webp',
    href: 'https://www.amazon.com/shop/tinytilt/list/16Z2A98YVDGUE?tag=onamztinytilt-20&ref_=hype_hm_sf_e&ccs_id=b5b13f9c-0393-4626-8974-c18acf6e8ea8',
  },
  {
    name: 'Little Cruisers',
    image: '/gift-guides/little-cruisers.webp',
    href: 'https://www.amazon.com/shop/tinytilt/list/16K7IS4EXK5OR?tag=onamztinytilt-20&ref_=hype_hm_sf_e&ccs_id=7e2286bc-6877-4a3d-b517-0993761e2030',
  },
  {
    name: 'Wobbly Walkers',
    image: '/gift-guides/wobbly-walkers.webp',
    href: 'https://www.amazon.com/shop/tinytilt/list/3GVUNTHWBQNLD?tag=onamztinytilt-20&ref_=hype_hm_sf_e&ccs_id=1caafc50-e0e0-4f45-bb94-c4c78be8fadc',
  },
  {
    name: 'Toddler Trekkers',
    image: '/gift-guides/toddler-trekkers.webp',
    href: 'https://www.amazon.com/shop/tinytilt/list/11TGM3RN2PR6G?tag=onamztinytilt-20&ref_=hype_hm_sf_e&ccs_id=8027410c-7fe4-42e6-a171-e3de49589310',
  },
  {
    name: 'Preschool Pioneers',
    image: '/gift-guides/preschool-pioneers.webp',
    href: 'https://www.amazon.com/shop/tinytilt/list/39F3SWLN88AQU?tag=onamztinytilt-20&ref_=hype_hm_sf_e&ccs_id=1b260c89-2b3a-469f-865f-c42bd564eb33',
  },
]
