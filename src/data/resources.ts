// ─────────────────────────────────────────────────────────────
// To add a new category: add its label to CATEGORIES below,
// then add items with that category string in the array.
// ─────────────────────────────────────────────────────────────

export const CATEGORIES = [
  'Baby Care Items',
  'Baby Containers',
  'Baby Feeding',
  'Baby Safety',
  'Baby Toys',
  'Nursing and Pumping',
  'Toddler Toys',
] as const

export type Category = (typeof CATEGORIES)[number]

export interface Resource {
  category: Category
  name: string
  description: string
  href: string
  /** Optional: path to a product image in /public or an external URL */
  image?: string
}

export const resources: Resource[] = [
  {
    category: 'Baby Care Items',
    name: 'Bumco Baby Bum Brush - BPA-Free Diaper Cream Spatula',
    description: 'A mom-invented silicone spatula that applies diaper cream smoothly and hygienically — no messy fingers. Features a suction cup base to stand upright on any flat surface for easy hands-free access.',
    href: 'https://www.amazon.com/dp/B079G5FWXL?coliid=I1XXV437YW4TAE&colid=2RUAA34SGFVFE&th=1&linkCode=ll2&tag=tinytilt-20&linkId=33e6ba9d5cd9fe868db8bbb6308a9672&language=en_US&ref_=as_li_ss_tl',
    image: 'https://m.media-amazon.com/images/I/71U7QZ7wzyL._SL1500_.jpg',
  },
  {
    category: 'Baby Care Items',
    name: 'Wellements Baby Organic Vitamin D Drops for Infants & Toddlers',
    description: 'USDA Certified Organic vitamin D3 drops that deliver the recommended 400 IU in just one drop daily to support healthy bone development in newborns through toddlers. Made with simple, non-GMO ingredients and free from the top 9 allergens.',
    href: 'https://www.amazon.com/dp/B07DHXSY6G?coliid=I2ZBPGYF7HJ36J&colid=2RUAA34SGFVFE&psc=1&linkCode=ll2&tag=tinytilt-20&linkId=8a2cb72f650a83e287a7e43d8acdd728&language=en_US&ref_=as_li_ss_tl',
    image: 'https://m.media-amazon.com/images/I/610RR3MA63L._AC_SL1347_.jpg',
  },
  {
    category: 'Baby Care Items',
    name: 'Triple Paste Diaper Rash Cream for Baby - 8 Oz',
    description: 'Pediatrician-recommended zinc oxide ointment that treats, soothes, and prevents diaper rash in one application. Hypoallergenic and free from fragrance, parabens, and preservatives — safe for daily use on even the most sensitive skin.',
    href: 'https://www.amazon.com/dp/B000LTJRQ8?coliid=I373ECPQBDA7UK&colid=2RUAA34SGFVFE&th=1&linkCode=ll2&tag=tinytilt-20&linkId=344410f60d2aeba65e8b8af76e980cf7&language=en_US&ref_=as_li_ss_tl',
    image: 'https://m.media-amazon.com/images/I/71G1Lq0kPEL._AC_SL1500_.jpg',
  },
  {
    category: 'Baby Care Items',
    name: 'Hatch Baby Sound Machine & Night Light (Wi-Fi)',
    description: 'An all-in-one sleep support device with customizable lights, science-backed sounds, and a Time-to-Rise alarm to help build healthy sleep routines from newborn through toddler years. Controlled via app with access to real-time sleep consultant chat.',
    href: 'https://www.amazon.com/dp/B0FL4HPWHY?coliid=I1NOHC4QCRSXDM&colid=2RUAA34SGFVFE&th=1&linkCode=ll2&tag=tinytilt-20&linkId=b48d9cc0621fb9a76187c0fccb25598c&language=en_US&ref_=as_li_ss_tl',
    image: 'https://m.media-amazon.com/images/I/61-hVEm1gfL._SL1500_.jpg',
  },
  {
    category: 'Baby Care Items',
    name: 'Hatch Go Portable Sound Machine for Babies and Kids',
    description: 'A compact, clip-on portable sound machine with 10 soothing sounds — including white noise, heartbeat, and ocean — that clips onto strollers and goes anywhere. Rechargeable battery lasts up to 15 hours with no app, Wi-Fi, or Bluetooth required.',
    href: 'https://www.amazon.com/dp/B0C5S8VB2K?coliid=I2PMJEMK1C2BA6&colid=2RUAA34SGFVFE&th=1&linkCode=ll2&tag=tinytilt-20&linkId=44275306cf6d37feba32d28e34907004&language=en_US&ref_=as_li_ss_tl',
    image: 'https://m.media-amazon.com/images/I/61xr8mcEjSL._AC_SL1500_.jpg',
  },
  {
    category: 'Baby Care Items',
    name: 'Angelcare Baby Bath Support',
    description: 'An ergonomic mesh bath support that cradles newborns up to 6 months, keeping baby calm and comfortable while leaving both hands free for washing. The soft-touch material warms quickly with water and dries fast for easy hygiene.',
    href: 'https://www.amazon.com/dp/B008VWVS14?coliid=I24BWU9IXBUEA8&colid=2RUAA34SGFVFE&th=1&linkCode=ll2&tag=tinytilt-20&linkId=355ae3670f25fa76b1d52e1197be4180&language=en_US&ref_=as_li_ss_tl',
    image: 'https://m.media-amazon.com/images/I/518jlorsnyL._SL1000_.jpg',
  },
  {
    category: 'Baby Care Items',
    name: 'Munchkin STEP Diaper Pail Powered by Arm & Hammer',
    description: 'The #1 odor-control diaper pail with a patented self-sealing system that locks away smells whether the lid is open or closed. Powered by Arm & Hammer baking soda to keep the nursery smelling fresh.',
    href: 'https://www.amazon.com/dp/B01BDQDIGM?coliid=IWUEMK74P2Q1M&colid=2RUAA34SGFVFE&th=1&linkCode=ll2&tag=tinytilt-20&linkId=c894a7da365d5714347d4b3258dbaee8&language=en_US&ref_=as_li_ss_tl',
    image: 'https://m.media-amazon.com/images/I/71CfMQJJoHL._SL1500_.jpg',
  },
  {
    category: 'Baby Care Items',
    name: 'EuroBath 2-Stage Baby Bath Tub',
    description: 'One of the largest baby bathtubs on the market, featuring a two-stage design that transitions from a reclined newborn position (0–6 months) to an upright toddler position (6–24+ months). Made in the USA from BPA-, lead-, and phthalate-free materials.',
    href: 'https://www.amazon.com/dp/B09TS2PKS2?coliid=IJ2QIXGR15SVG&colid=2RUAA34SGFVFE&psc=1&linkCode=ll2&tag=tinytilt-20&linkId=652f6b7cd651e349e2c6984c2d8e45fb&language=en_US&ref_=as_li_ss_tl',
    image: 'https://m.media-amazon.com/images/I/51moB6bJ6GL._SL1500_.jpg',
  },
  {
    category: 'Baby Care Items',
    name: 'Munchkin Rinse Shampoo Bath Rinser Cup',
    description: 'A teardrop-shaped rinse cup with an ultra-soft flexible rim that gently hugs a child\'s forehead to keep soap and water out of their eyes during hair washing. Easy-grip handle and a shape that rests on the bathtub ledge between uses.',
    href: 'https://www.amazon.com/dp/B01M6416TW?coliid=I2YXDW4Z8LPFLW&colid=2RUAA34SGFVFE&th=1&linkCode=ll2&tag=tinytilt-20&linkId=b6bd089129852a5f23d857e181419421&language=en_US&ref_=as_li_ss_tl',
    image: 'https://m.media-amazon.com/images/I/51eAvGNu1fL._AC_SL1500_.jpg',
  },
  {
    category: 'Baby Care Items',
    name: 'Frida Baby 3-in-1 Nose, Nail + Ear Picker',
    description: 'A single grooming tool with four flexible silicone-tipped ends for safely cleaning baby\'s nose, ear wax, and under-nail debris. Each tip includes a parent-proof stopper to prevent inserting too far into delicate areas.',
    href: 'https://www.amazon.com/dp/B087XRDRF6?coliid=I2OD528OCY2R50&colid=2RUAA34SGFVFE&psc=1&linkCode=ll2&tag=tinytilt-20&linkId=0e0bed6bfd15c8c01301370b218ed4b6&language=en_US&ref_=as_li_ss_tl',
    image: 'https://m.media-amazon.com/images/I/71B4IOv+qQL._SL1500_.jpg',
  },
  {
    category: 'Baby Care Items',
    name: 'Frida Baby NoseFrida SnotSucker Nasal Aspirator',
    description: 'A clinically trusted nasal aspirator that creates a gentle seal outside the nostril to quickly clear congestion without direct insertion into delicate nasal passages. Includes hygiene filters clinically proven to block mucus and bacterial transfer.',
    href: 'https://www.amazon.com/dp/B00171WXII?coliid=I15RCBXPDQOZ4F&colid=2RUAA34SGFVFE&th=1&linkCode=ll2&tag=tinytilt-20&linkId=fca0ac79086abbe6cac200c4f2a45d26&language=en_US&ref_=as_li_ss_tl',
    image: 'https://m.media-amazon.com/images/I/71x9h8NxWnL._SL1500_.jpg',
  },
  {
    category: 'Baby Care Items',
    name: 'Frida Baby Rectal Thermometer for Babies',
    description: 'A digital rectal thermometer with a soft flexible tip that delivers accurate readings in just 10 seconds — gentle enough for newborns. Stores the last 10 readings for easy health monitoring and comes with a protective travel case.',
    href: 'https://www.amazon.com/dp/B0823DXJS9?coliid=I3B8CQKZAAR07R&colid=2RUAA34SGFVFE&psc=0&linkCode=ll2&tag=tinytilt-20&linkId=0c361f0db733f13a3282e718d2541d0f&language=en_US&ref_=as_li_ss_tl',
    image: 'https://m.media-amazon.com/images/I/61iL1-6ha0L._SL1500_.jpg',
  },
  {
    category: 'Baby Care Items',
    name: 'Carepod Mini Ultrasonic Cool Mist Humidifier',
    description: 'A whisper-quiet nursery humidifier with only 3 washable parts for effortless cleaning and up to 20 hours of cool mist on the lowest setting. Features auto shut-off when water runs low and a rounded tank designed to leave no hidden spots for buildup.',
    href: 'https://www.amazon.com/dp/B0916FW144?coliid=I29VAHAEFFBIK9&colid=2RUAA34SGFVFE&psc=1&linkCode=ll2&tag=tinytilt-20&linkId=2ab68921fd2f26f167d1a4104374cb33&language=en_US&ref_=as_li_ss_tl',
    image: 'https://m.media-amazon.com/images/I/61wSbk7peSL._AC_SL1500_.jpg',
  },
  {
    category: 'Baby Care Items',
    name: 'Mustela Baby Soothing Cleansing Water - No-Rinse Micellar Water',
    description: 'A fragrance-free, no-rinse micellar water made with 99% natural ingredients that gently cleans baby\'s face, body, and diaper area — no rinsing needed. EWG Verified and ideal for on-the-go cleanups of very sensitive skin.',
    href: 'https://www.amazon.com/dp/B09J57G4G6?coliid=I1URXNAGWB7366&colid=2RUAA34SGFVFE&th=1&linkCode=ll2&tag=tinytilt-20&linkId=c93b2ff4772be04061cc43869177638e&language=en_US&ref_=as_li_ss_tl',
    image: 'https://m.media-amazon.com/images/I/61z+Jrb7fjL._SL1500_.jpg',
  },
  {
    category: 'Baby Care Items',
    name: 'Mustela Cradle Cap Cream for Newborn - Fragrance-Free',
    description: 'A clinically and dermatologist-tested fragrance-free cream that gently smooths scalp flakes associated with cradle cap in newborns. Hypoallergenic formula with high skin tolerability for delicate baby scalps.',
    href: 'https://www.amazon.com/dp/B08289SWK1?coliid=I1S5XDOYXM3Q3N&colid=2RUAA34SGFVFE&psc=1&linkCode=ll2&tag=tinytilt-20&linkId=c8fa7005ec80388e3c0fe33f84204bff&language=en_US&ref_=as_li_ss_tl',
    image: 'https://m.media-amazon.com/images/I/61OPK3IHVcL._SL1500_.jpg',
  },
  {
    category: 'Baby Care Items',
    name: "Dr. Brown's HappyPaci 100% Silicone Baby Pacifier, 0-6m, 4-Pack",
    description: "A one-piece 100% silicone pacifier with a contoured butterfly-shaped shield that curves away from baby's face, providing comfort and airflow to prevent skin irritation. The nipple shape mirrors Dr. Brown's bottle nipple for an easy breast-to-pacifier transition.",
    href: 'https://www.amazon.com/dp/B0G3QM77RV?coliid=IE0DQP1IJC6YP&colid=2RUAA34SGFVFE&th=1&linkCode=ll2&tag=tinytilt-20&linkId=a5c2a9587171abe5a12b7cbdbe5b1b1e&language=en_US&ref_=as_li_ss_tl',
    image: 'https://m.media-amazon.com/images/I/71BRXMi8LQL._SL1500_.jpg',
  },
  {
    category: 'Baby Care Items',
    name: 'Dr. Noze Best NozeBot Electric Baby Nasal Aspirator',
    description: 'Designed by a pediatric ENT, this rechargeable electric nasal aspirator delivers hospital-quality suction at three levels to gently clear infant and toddler congestion. Dishwasher-safe parts make cleanup quick, and it is HSA/FSA eligible.',
    href: 'https://www.amazon.com/dp/B08G6SZ2LT?coliid=I2FPRD7WD6KHBE&colid=2RUAA34SGFVFE&psc=1&linkCode=ll2&tag=tinytilt-20&linkId=c6a88cfee30a2f336e46642b31abf195&language=en_US&ref_=as_li_ss_tl',
    image: 'https://m.media-amazon.com/images/I/71hu6pLRrlL._AC_SL1500_.jpg',
  },
  {
    category: 'Baby Care Items',
    name: 'WaterWipes Sensitive+ Newborn & Baby Wipes, 720 Count',
    description: 'Made with just 99.9% purified water and a drop of fruit extract, these unscented wipes are as pure as it gets for cleaning newborn and premature skin. Now 2x stronger and thicker while maintaining a neutral pH to protect baby\'s natural skin barrier.',
    href: 'https://www.amazon.com/dp/B008KJEYLO?coliid=I272YFE7JYVPVC&colid=2RUAA34SGFVFE&th=1&linkCode=ll2&tag=tinytilt-20&linkId=7d84b88b68425c70f9d82f5e9e63a43f&language=en_US&ref_=as_li_ss_tl',
    image: 'https://m.media-amazon.com/images/I/813fvE8SHRL._SL1500_.jpg',
  },
  {
    category: 'Baby Care Items',
    name: 'Babyganics Insect Spray, 2oz',
    description: 'A DEET-free insect repellent made with plant and essential oils — including citronella, peppermint, rosemary, lemongrass, and geranium — to help keep mosquitoes away from little ones. Free from parabens, sulfates, synthetic fragrances, and dyes.',
    href: 'https://www.amazon.com/dp/B00AN4ASBO?coliid=I2JHR9DXN9IWXA&colid=2RUAA34SGFVFE&th=1&linkCode=ll2&tag=tinytilt-20&linkId=a3d902ef8786f747e22099a6e133476a&language=en_US&ref_=as_li_ss_tl',
    image: 'https://m.media-amazon.com/images/I/61Zlhf-Oy6L._AC_SL1500_.jpg',
  },
  {
    category: 'Baby Care Items',
    name: 'Blue Lizard BABY Mineral Sunscreen SPF 50+, 5 oz.',
    description: 'A broad-spectrum SPF 50+ mineral sunscreen with zinc oxide that is fragrance-free, vegan, and free from parabens and harsh chemical actives — gentle enough for baby\'s delicate skin. Water resistant for 80 minutes and enriched with Calendula Extract and Organic Aloe.',
    href: 'https://www.amazon.com/dp/B084ZP1H7B?coliid=I20IRT8X53I5N8&colid=2RUAA34SGFVFE&th=1&linkCode=ll2&tag=tinytilt-20&linkId=a303c69c5f400f9ee161608c7ac83472&language=en_US&ref_=as_li_ss_tl',
    image: 'https://m.media-amazon.com/images/I/61o9SnbT-QL._SL1500_.jpg',
  },
  {
    category: 'Baby Care Items',
    name: 'Pampers Pure Baby Diapers, Size 3, 116 Count',
    description: 'Premium hypoallergenic diapers with a vitamin-enriched liner that provides clinically proven protection against the 4 main causes of diaper rash. Free from fragrance, elemental chlorine, parabens, and latex, with up to 100% leakproof coverage.',
    href: 'https://www.amazon.com/dp/B082QBFMSY?coliid=I33YT7AS1SLJIT&colid=2RUAA34SGFVFE&th=1&linkCode=ll2&tag=tinytilt-20&linkId=40b1d944f20039b4ea556213f852ed15&language=en_US&ref_=as_li_ss_tl',
    image: 'https://m.media-amazon.com/images/I/81p4JJN029L._AC_SL1500_.jpg',
  },
  {
    category: 'Baby Containers',
    name: 'BabyBjörn Bouncer Bliss, Sand Gray, Woven, Classic Quilt',
    description: 'A 2-in-1 ergonomic bouncer seat and toddler chair recognized as hip-healthy by the International Hip Dysplasia Institute, with four adjustable positions from newborn through 29 lbs. Baby\'s own movements naturally activate the gentle bounce motion, promoting early motor development without batteries or electricity.',
    href: 'https://www.amazon.com/dp/B0CLVMCHTJ?coliid=I213DJFOAQPIWD&colid=10NNOTTU1IAYX&th=1&linkCode=ll2&tag=tinytilt-20&linkId=18a01e6858ab25d64c65902c6bf9f1d1&language=en_US&ref_=as_li_ss_tl',
    image: 'https://images.ctfassets.net/50gzycvace50/eae5f24e1fd5ef5743208492e4c3b7957178efc3011cf3e9948e4815d9fba477/0ce40e85f4e23d825b9dac69817de6fa/eae5f24e1fd5ef5743208492e4c3b7957178efc3011cf3e9948e4815d9fba477.png?fl=progressive&fm=jpg&bg=rgb:fafafa&w=1240&h=1240',
  },
  {
    category: 'Baby Containers',
    name: 'Clek Foonf Convertible Car Seat with Rigid LATCH',
    description: 'A premium extended-rear-facing convertible car seat featuring rigid LATCH installation, a patented crumple zone safety system, and an anti-rebound bar for exceptional crash protection. Completely free of added flame retardants and supports rear-facing through most of toddlerhood for the safest car seat position.',
    href: 'https://www.amazon.com/dp/B0CZPCGF51?coliid=I1HOEQ5W1Z7MVS&colid=10NNOTTU1IAYX&th=1&linkCode=ll2&tag=tinytilt-20&linkId=cc46b7cdfe3bad091c79d526becf47dc&language=en_US&ref_=as_li_ss_tl',
    image: 'https://clekinc.com/cdn/shop/files/clek-foonf-railroad-ziip.jpg?v=1711388056',
  },
  {
    category: 'Baby Containers',
    name: 'Ergobaby Omni Classic Baby Carrier',
    description: 'A 4-position breathable mesh carrier that holds babies ergonomically from newborn (7 lbs) through toddler (45 lbs) with no infant insert needed, keeping baby in the recommended M-position with knees higher than the bottom. Padded lumbar support and adjustable shoulder straps distribute weight evenly for extended comfortable carries.',
    href: 'https://www.amazon.com/dp/B0FP2G6XCK?coliid=I37H1UOEXNQK9D&colid=10NNOTTU1IAYX&th=1&linkCode=ll2&tag=tinytilt-20&linkId=0aabe1ccdc44faf776b16c3884fc4bcf&language=en_US&ref_=as_li_ss_tl',
    image: 'https://hazelandfawn.com/cdn/shop/files/baby_carrier_omni_cotton_pearl_grey__4.webp?v=1750263433&width=1080',
  },
  {
    category: 'Baby Containers',
    name: 'Hexagon Playpen Mat',
    description: 'A 52×45" soft microfiber padded mat designed to fit inside Regalo 48" and hiccapop 53" PlayPod playpens, with a non-slip backing to keep it securely in place during active floor play. Provides the cushioned surface babies need for tummy time and independent exploration — a key part of torticollis home exercise programs.',
    href: 'https://www.amazon.com/dp/B083WTVTCD?coliid=IEXLE35A081V2&colid=10NNOTTU1IAYX&th=1&linkCode=ll2&tag=tinytilt-20&linkId=e52d4eab90a3e91e0a8c82955fcf93bd&language=en_US&ref_=as_li_ss_tl',
  },
  {
    category: 'Baby Containers',
    name: 'Nursing Pillow & Breastfeeding Pillow – Ergonomic C-Shape',
    description: 'An ergonomic C-shape pillow that supports breastfeeding, bottle feeding, tummy time, and sitting from birth through 12 months — covering all the positioning routines families work through during torticollis care. Breathable hypoallergenic filling with a machine-washable cover keeps it ready for daily use.',
    href: 'https://www.amazon.com/dp/B0F9T2QVCV?coliid=I2RVJCI1PHGG9O&colid=10NNOTTU1IAYX&th=1&linkCode=ll2&tag=tinytilt-20&linkId=eaa13b1896b6e3bc7255444bf75e4f9c&language=en_US&ref_=as_li_ss_tl',
  },
  {
    category: 'Baby Containers',
    name: 'Regalo Safety My Play Portable Baby Playpen & Play Yard',
    description: 'A lightweight, foldable 6-panel portable play yard measuring 48" across with breathable mesh sides for constant visibility and airflow, certified by the Baby Safety Alliance. Sets up in seconds and includes a carry bag, making it easy to create a safe supervised floor-play space for tummy time at home or on the go.',
    href: 'https://www.amazon.com/dp/B072BPGW6F?coliid=I193RH85EWEI98&colid=10NNOTTU1IAYX&psc=1&linkCode=ll2&tag=tinytilt-20&linkId=b5a545077d03bb8e5f08bc2ad74db809&language=en_US&ref_=as_li_ss_tl',
    image: 'https://m.media-amazon.com/images/I/81Y6c7RxxgL._AC_SL1500_.jpg',
  },
  {
    category: 'Baby Containers',
    name: 'Stokke Tripp Trapp Chair',
    description: 'A Norwegian-designed adjustable wooden high chair made from European beech wood that grows with a child from 6 months through adulthood, with a seat and footplate that adjust to keep the spine and hips in optimal ergonomic alignment at every stage. The active, close-to-the-table seating position encourages upright posture and core engagement from the very first meal.',
    href: 'https://www.amazon.com/dp/B07KQQHX6H?coliid=I2D8A2Y6X6PFZJ&colid=10NNOTTU1IAYX&th=1&linkCode=ll2&tag=tinytilt-20&linkId=9cd1ee6758661e95cc11aa7bb771ee58&language=en_US&ref_=as_li_ss_tl',
    image: 'https://images.ctfassets.net/50gzycvace50/20759d263d8d9f296f6aff12ad9d49421f7437f09aba0cd0c7ddd6885a54d6c2/a05d02d599c3f17a8ee5ca196de1fb98/20759d263d8d9f296f6aff12ad9d49421f7437f09aba0cd0c7ddd6885a54d6c2.png?fl=progressive&fm=jpg&bg=rgb:fafafa&w=1240&h=1240',
  },
  {
    category: 'Baby Containers',
    name: 'UPPAbaby Bassinet V3',
    description: 'A GREENGUARD Gold certified bassinet with an air-mesh mattress, cross-ventilation panels, and a vented base that together maximize safe airflow for sleeping newborns from birth to 20 lbs. Attaches to UPPAbaby Vista, Cruz, and Ridge strollers without adapters, and includes a UPF 50+ sunshade and bug shield.',
    href: 'https://www.amazon.com/dp/B0DDH627WH?coliid=IM023KU7IUHQN&colid=10NNOTTU1IAYX&th=1&linkCode=ll2&tag=tinytilt-20&linkId=4d6e8c176ff4bda652ec18bf28332ef2&language=en_US&ref_=as_li_ss_tl',
    image: 'https://strolleria.com/cdn/shop/files/0903-BAS-DCL_Hero.webp?v=1725382312',
  },
  {
    category: 'Baby Containers',
    name: 'UPPAbaby Vista V3 Convertible Single-to-Double Stroller',
    description: 'A flagship full-size stroller with enhanced FlexRide all-wheel suspension, a 30 lb XL storage basket, and 30+ configurations that grow from single to double as your family expands. Compatible with Mesa V3 and V2 infant car seats for a complete travel system, with a one-step fold that stands independently for compact storage.',
    href: 'https://www.amazon.com/dp/B0D9XRK8RM?coliid=ICGOHH9AGMIBL&colid=10NNOTTU1IAYX&th=1&linkCode=ll2&tag=tinytilt-20&linkId=3522e7f286eb8347a2182db8fc4bcfc1&language=en_US&ref_=as_li_ss_tl',
    image: 'https://strolleria.com/cdn/shop/files/0303-VIS-JKE_3QLeft_Hero_1800x1800.png?v=1759845654',
  },
  {
    category: 'Baby Containers',
    name: 'Upseat Ergonomic Baby Floor & Booster Seat',
    description: 'Co-developed with pediatric physical therapists, this floor and booster seat supports upright posture and healthy hip development from 4–24 months, making it ideal for families managing torticollis. The elevated seat position encourages active core engagement, and the dishwasher-safe extra-large tray converts it to a feeding chair at mealtime.',
    href: 'https://www.amazon.com/dp/B07JQXZ2CW?coliid=I3DFZY1PGKFRJW&colid=10NNOTTU1IAYX&th=1&linkCode=ll2&tag=tinytilt-20&linkId=bbc28208751d3c93c5102c1a0377fce6&language=en_US&ref_=as_li_ss_tl',
    image: 'https://images.ctfassets.net/50gzycvace50/9765be405dec4e96ed327561e919fecddbc347c5933d3da71beba31eac3f540f/d53eff6f587ca2588b3c455273fe3b02/9765be405dec4e96ed327561e919fecddbc347c5933d3da71beba31eac3f540f.png?fl=progressive&fm=jpg&bg=rgb:fafafa&w=1240&h=1240',
  },
  {
    category: 'Baby Feeding',
    name: 'ezpz Tiny Cup',
    description: 'A 100% silicone open cup designed by a pediatric feeding specialist to introduce open-cup drinking from 4 months, promoting healthy oral motor development and early feeding independence. The weighted base and finger notch make it easy for small hands to grip, and the soft silicone is gentle on developing gums.',
    href: 'https://www.amazon.com/dp/B0DB97YNDR?tag=tinytilt-20',
    image: 'https://images.ctfassets.net/50gzycvace50/ee36ea0639b2717861a016610fe2ee74f22a37ec4ee45516a29291abd20e1661/e468ce2200f556305f7ee47cce469fca/ee36ea0639b2717861a016610fe2ee74f22a37ec4ee45516a29291abd20e1661.png',
  },
  {
    category: 'Baby Feeding',
    name: 'Gulicola Natural Glass Baby Bottle, 5 oz, 2-Pack',
    description: 'Premium borosilicate glass bottles with an ultra-soft slow-flow nipple that closely mimics the feel and flow of breastfeeding, supporting natural latch development for newborns 0–3 months. BPA-free, anti-colic venting, and heat-resistant glass make for safe, convenient feeding from day one.',
    href: 'https://www.amazon.com/dp/B0BBQL2FD1?tag=tinytilt-20',
    image: 'https://thegulicola.com/wp-content/uploads/2025/10/Gulicola-Natural-Glass-Baby-Bottle-for-Breastfeeding-Babies-Newborn-Anti-Colic-Bottle-Set-with-Slow-Flow-Nipple-0-3-Months-5-oz-2-Pack-White.jpg',
  },
  {
    category: 'Baby Feeding',
    name: 'Momcozy KleanPal Pro Baby Bottle Washer, Sterilizer & Dryer',
    description: 'An all-in-one machine that washes, sterilizes, and dries up to 4 baby bottles simultaneously using 26 multi-angle water jets and 212°F steam sterilization. Four customizable cleaning modes — including a quick 19-minute wash — simplify the daily bottle routine so you can focus on therapy goals.',
    href: 'https://www.amazon.com/dp/B0CWLHKQNT?tag=tinytilt-20',
    image: 'https://momcozy.com/cdn/shop/files/Product_01_1024_2560_3x_48134800-1548-41b3-9100-568ae1fe7862.webp',
  },
  {
    category: 'Baby Feeding',
    name: 'NumNum Pre-Spoon GOOtensils, 6-Pack',
    description: 'A 6-pack of self-feeding pre-spoons with a round, flat shape that encourages symmetrical oral motor development from 6 months. The GOOtensil design lets babies scoop and self-feed purees with minimal frustration, making it an ideal first step in baby-led weaning.',
    href: 'https://www.amazon.com/dp/B0B9T4H6V8?tag=tinytilt-20',
    image: 'https://www.rgnaturalbabies.com/cdn/shop/products/gootensils_1024x1024.jpg?v=1644613100',
  },
  {
    category: 'Baby Feeding',
    name: 'OXO Tot Bottle Brush with Stand',
    description: 'A dual-bristle bottle brush with a flexible non-slip handle that reaches deep into bottles, plus a hidden nipple cleaner built into the handle for small parts. The included stand keeps the brush upright and off the counter between uses, and the brush is top-rack dishwasher safe.',
    href: 'https://www.amazon.com/dp/B0FNSFMZ3X?tag=tinytilt-20',
    image: 'https://images.ctfassets.net/50gzycvace50/ed244b8d6fcee606ccc7318e5da31e002aa458f73d24ccc1cb9869ac38bc9951/599fb0e1c131cd7e4b3bc8505d8ee1b5/1_870511_product.png',
  },
  {
    category: 'Baby Feeding',
    name: 'OXO Tot Bottle Drying Rack',
    description: 'A compact countertop drying rack that holds bottles, nipples, breast pump parts, and sippy cup components upright for thorough air-drying. A removable tray catches drips and is dishwasher-safe for easy cleanup.',
    href: 'https://www.amazon.com/dp/B0771CB9J4?tag=tinytilt-20',
    image: 'https://images.ctfassets.net/50gzycvace50/9dfb0f7934b4bd98f227bf58001a8247d19da89df2470203301022cc139bde21/e4707dade6a6ead74a44cd332b36ca81/9dfb0f7934b4bd98f227bf58001a8247d19da89df2470203301022cc139bde21.png',
  },
  {
    category: 'Baby Feeding',
    name: 'PandaEar Silicone Baby Bibs, 3-Pack',
    description: 'A set of three thick, waterproof silicone bibs with a deep food-catching pocket that keeps mealtime mess contained during self-feeding practice. Soft and flexible for comfortable wear, easy to wipe clean or rinse off, and sized for babies and toddlers 10–72 months.',
    href: 'https://www.amazon.com/dp/B08GFCX964?tag=tinytilt-20',
    image: 'https://pandaear.com/cdn/shop/files/thick-silicone-baby-bibs-3-pack-pandaear-1-34733853344058.jpg?v=1693216901&width=1946',
  },
]
