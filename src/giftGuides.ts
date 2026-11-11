// ---- Holiday gift guide ----
// true  = "Gift Guide" shows in the nav and a callout shows on the homepage.
// false = both are hidden after the holidays. The /gift-guide page itself stays
//         reachable, so links already shared (Instagram etc.) keep working.
export const GIFT_GUIDE_ON = true

export interface GiftItem {
  name: string
  href: string
  store: string // shown on the button: "Shop on Amazon", "Shop at Inspira Spark"
  // Square photo in public/gift-guides/<guide>/ (600px WebP). Leave out to show a plain placeholder.
  image?: string
  // Discount code shown on the card with a copy button.
  code?: string
  codeText?: string // e.g. 'for 5% off'
}

export interface GiftGuide {
  slug: string // used in the page address: /gift-guide/<slug>
  name: string
  image: string
  // The Amazon storefront list. Used for the tile when the guide has no `items`.
  href: string
  // Blurb shown under the image, and the developmental stage line shown below it.
  description?: string
  stage?: string
  // If set, the tile opens the guide's own page on our site listing these items
  // (each with its own link) instead of going to the Amazon list.
  items?: GiftItem[]
}

// In developmental order. Images live in public/gift-guides/ (800px wide WebP).
export const giftGuides: GiftGuide[] = [
  {
    slug: 'tummy-time-warriors',
    name: 'Tummy Time Warriors',
    image: '/gift-guides/tummy-time-warriors.webp',
    description:
      'Tummy time is where the adventure begins! Our pediatric PT-inspired picks encourage babies to lift their heads, look around, track toys, and start building the strength needed for all those exciting first milestones. From high-contrast toys to tummy time essentials, these gifts make floor play a little more fun.',
    stage: 'Newborn to approximately 4 months',
    href: 'https://www.amazon.com/shop/tinytilt/list/2PZ63PF8KORZZ?tag=onamztinytilt-20&ref_=hype_hm_sf_e&ccs_id=faef162b-8665-4613-9aa3-2a11bb22a370',
  },
  {
    slug: 'rockin-rollers',
    name: 'Rockin’ Rollers',
    image: '/gift-guides/rockin-rollers.webp',
    description:
      'Ready, set, roll! This is the stage when babies are discovering how to move their bodies, reach for toys, and roll in both directions. Our favorite picks encourage reaching, trunk rotation, weight shifting, and plenty of floor play as little ones work toward becoming expert rollers.',
    stage: 'Approximately 3–7 months',
    href: 'https://www.amazon.com/shop/tinytilt/list/3BRWFQNJ1KOP6?tag=onamztinytilt-20&ref_=hype_hm_sf_e&ccs_id=9abf9c91-aad3-451c-8c2a-e3a3439a15bd',
  },
  {
    slug: 'sitting-superstars',
    name: 'Sitting Superstars',
    image: '/gift-guides/sitting-superstars.webp',
    description:
      'A whole new world opens up when babies start sitting! Our pediatric PT-inspired picks encourage balance, core control, reaching, trunk rotation, and coordination as little ones learn to sit and explore their surroundings. From early sitting practice to independent play, these toys help little sitters build confidence while having fun.',
    stage: 'Approximately 5–9 months',
    href: 'https://www.amazon.com/shop/tinytilt/list/224AJZKXJP8X0?tag=onamztinytilt-20&ref_=hype_hm_sf_e&ccs_id=cdeab262-50db-4236-b1bb-6241d33c6556',
  },
  {
    slug: 'crawling-cuties',
    name: 'Crawling Cuties',
    image: '/gift-guides/crawling-cuties.webp',
    description:
      'On the move! Whether your little one is rocking on hands and knees, learning to crawl, or figuring out how to get from one place to another, this stage is full of exciting discoveries. Our favorite picks encourage weight bearing through the arms, core strength, coordination, motor planning, and exploration.',
    stage: 'Approximately 7–12 months',
    href: 'https://www.amazon.com/shop/tinytilt/list/16Z2A98YVDGUE?tag=onamztinytilt-20&ref_=hype_hm_sf_e&ccs_id=b5b13f9c-0393-4626-8974-c18acf6e8ea8',
  },
  {
    slug: 'little-cruisers',
    name: 'Little Cruisers',
    image: '/gift-guides/little-cruisers.webp',
    description:
      'Pulling up, standing, and cruising along the furniture! Little ones are finding their feet and discovering all the ways they can move upright. Our pediatric PT-inspired picks encourage standing balance, weight shifting, coordination, lower-body strength, and those first steps toward independent walking.',
    stage: 'Approximately 9–15 months',
    href: 'https://www.amazon.com/shop/tinytilt/list/16K7IS4EXK5OR?tag=onamztinytilt-20&ref_=hype_hm_sf_e&ccs_id=7e2286bc-6877-4a3d-b517-0993761e2030',
    items: [
      {
        name: 'Little Balance Box',
        store: 'Inspira Spark',
        image: '/gift-guides/little-cruisers/balance-box.webp',
        href: 'https://inspiraspark.com/?dt_id=3631132',
        code: 'TINYTILT',
        codeText: 'for 5% off',
      },
      {
        name: 'Guidecraft Kitchen Helper',
        store: 'Amazon',
        image: '/gift-guides/little-cruisers/kitchen-helper.webp',
        href: 'https://www.amazon.com/dp/B00J3HZ2SG?asc_item-id=amzn1.ideas.16K7IS4EXK5OR&th=1&linkCode=ll2&tag=tinytilt-20&linkId=8fe915869bed23a885ba7eb4a1b4fa0f&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl',
      },
      {
        name: 'Shatterproof Kids Mirror',
        store: 'Amazon',
        image: '/gift-guides/little-cruisers/mirror.webp',
        href: 'https://www.amazon.com/dp/B0B15BDVPY?asc_item-id=amzn1.ideas.16K7IS4EXK5OR&th=1&linkCode=ll2&tag=tinytilt-20&linkId=4f1693532fed30119d8be7d189d7240e&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl',
      },
      {
        name: 'Nugget Play Couch',
        store: 'Amazon',
        image: '/gift-guides/little-cruisers/nugget.webp',
        href: 'https://www.amazon.com/dp/B0FP3XWS3N?asc_item-id=amzn1.ideas.16K7IS4EXK5OR&th=1&linkCode=ll2&tag=tinytilt-20&linkId=d69b381e87463783fcd03e36fa62fc31&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl',
      },
      {
        name: 'Lovevery Bath Set',
        store: 'Amazon',
        image: '/gift-guides/little-cruisers/bath-set.webp',
        href: 'https://www.amazon.com/dp/B0FH8DZ1YQ?asc_item-id=amzn1.ideas.16K7IS4EXK5OR&linkCode=ll2&tag=tinytilt-20&linkId=fb7901a014f8eda5b8fad337682fd362&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl',
      },
      {
        name: 'Spinning Stacking Toys',
        store: 'Amazon',
        image: '/gift-guides/little-cruisers/spinning-stacking.webp',
        href: 'https://www.amazon.com/dp/B09YRQVWSN?asc_item-id=amzn1.ideas.16K7IS4EXK5OR&th=1&linkCode=ll2&tag=tinytilt-20&linkId=6be861286e0b11d81a17c4347cd0f82e&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl',
      },
      {
        name: 'Whirly Squigz',
        store: 'Amazon',
        image: '/gift-guides/little-cruisers/whirly-squigz.webp',
        href: 'https://www.amazon.com/dp/B07F2QPXNC?asc_item-id=amzn1.ideas.16K7IS4EXK5OR&linkCode=ll2&tag=tinytilt-20&linkId=0bdb61a31ad20cb99cb4343be60a9ea5&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl',
      },
      {
        name: 'Suction Spinner Toys',
        store: 'Amazon',
        image: '/gift-guides/little-cruisers/suction-spinners.webp',
        href: 'https://www.amazon.com/dp/B097B3K46R?asc_item-id=amzn1.ideas.16K7IS4EXK5OR&th=1&linkCode=ll2&tag=tinytilt-20&linkId=0e75df2e9e340f1cd98b63612aed3942&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl',
      },
    ],
  },
  {
    slug: 'wobbly-walkers',
    name: 'Wobbly Walkers',
    image: '/gift-guides/wobbly-walkers.webp',
    description:
      'Those first independent steps are just the beginning! From taking a few wobbly steps to becoming more confident on two feet, little walkers are constantly practicing their balance and coordination. Our favorite picks encourage walking, climbing, squatting, navigating obstacles, and exploring the world on foot.',
    stage: 'Approximately 12–18 months',
    href: 'https://www.amazon.com/shop/tinytilt/list/3GVUNTHWBQNLD?tag=onamztinytilt-20&ref_=hype_hm_sf_e&ccs_id=1caafc50-e0e0-4f45-bb94-c4c78be8fadc',
  },
  {
    slug: 'toddler-trekkers',
    name: 'Toddler Trekkers',
    image: '/gift-guides/toddler-trekkers.webp',
    description:
      'Big energy, bigger adventures! Toddlers are busy running, climbing, jumping, and figuring out what their bodies can do. Our pediatric PT-inspired picks encourage balance, coordination, strength, motor planning, and active play as little ones continue building their movement skills.',
    stage: 'Approximately 18–36 months',
    href: 'https://www.amazon.com/shop/tinytilt/list/11TGM3RN2PR6G?tag=onamztinytilt-20&ref_=hype_hm_sf_e&ccs_id=8027410c-7fe4-42e6-a171-e3de49589310',
  },
  {
    slug: 'preschool-pioneers',
    name: 'Preschool Pioneers',
    image: '/gift-guides/preschool-pioneers.webp',
    description:
      'Ready, set, GO! Preschoolers are developing more advanced movement skills and finding new ways to challenge themselves. From hopping and skipping to balancing, throwing, catching, and navigating obstacle courses, our favorite picks encourage coordination, strength, balance, and confidence through play.',
    stage: 'Approximately 3–5 years',
    href: 'https://www.amazon.com/shop/tinytilt/list/39F3SWLN88AQU?tag=onamztinytilt-20&ref_=hype_hm_sf_e&ccs_id=1b260c89-2b3a-469f-865f-c42bd564eb33',
  },
]

export function findGuide(slug: string | undefined): GiftGuide | undefined {
  return giftGuides.find((g) => g.slug === slug)
}
