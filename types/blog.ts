export interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  content: any[]
  publishedAt: string
  category: string
  author: string
  readTime: string
  metaTitle?: string
  metaDescription?: string
  featuredImage?: {
    asset: {
      _ref: string
    }
  }
}

export interface QuizCategory {
  _id: string
  slug: {
    current: string
  }
  contentDescription: string // This is now the main content field
  // Removed 'title', 'description', 'metaTitle', and 'metaDescription' from interface
}
