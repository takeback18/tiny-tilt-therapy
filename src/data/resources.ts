// ─────────────────────────────────────────────────────────────
// To add a new category: add its label to CATEGORIES below,
// then add items with that category string in the array.
// ─────────────────────────────────────────────────────────────

export const CATEGORIES = ['Baby Toys', 'Books'] as const

export type Category = (typeof CATEGORIES)[number]

export interface Resource {
  category: Category
  name: string
  description: string
  href: string
  /** Optional: path to a product image in /public */
  image?: string
}

export const resources: Resource[] = [
  // Items will be added here.
  // Example:
  // {
  //   category: 'Books',
  //   name: 'My Book Title',
  //   description: 'A parent-friendly guide to torticollis.',
  //   href: 'https://amazon.com/...',
  // },
]
