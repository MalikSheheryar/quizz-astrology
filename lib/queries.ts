export const BLOG_POSTS_QUERY = `*[_type == "blogPost"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  content,
  publishedAt,
  category,
  author,
  readTime,
  metaTitle,
  metaDescription,
  featuredImage
}`

export const BLOG_POST_BY_SLUG_QUERY = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  content,
  publishedAt,
  category,
  author,
  readTime,
  metaTitle,
  metaDescription,
  featuredImage
}`

export const QUIZ_CATEGORIES_QUERY = `*[_type == "quizCategory"] {
  _id,
  slug,
  contentDescription // Only fetching contentDescription now
}`

export const QUIZ_CATEGORY_BY_SLUG_QUERY = `*[_type == "quizCategory" && slug.current == $slug][0] {
  _id,
  slug,
  contentDescription // Only fetching contentDescription now
}`
