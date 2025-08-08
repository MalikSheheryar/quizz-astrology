import { Metadata } from 'next'
import { client } from '@/lib/client'
import { BLOG_POST_BY_SLUG_QUERY } from '@/lib/queries'
import BlogPostClientPage from '@/components/blog-post-client-page'
import { BlogPost } from '@/types/blog'

interface BlogPostPageProps {
  params: { slug: string }
}

// Generate metadata for the blog post page
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = params
  const post: BlogPost = await client.fetch(BLOG_POST_BY_SLUG_QUERY, { slug })

  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: post.featuredImageUrl ? [post.featuredImageUrl] : [],
    },
  }
}

export default async function BlogPostServerPage({
  params,
}: BlogPostPageProps) {
  const { slug } = params
  const post: BlogPost = await client.fetch(BLOG_POST_BY_SLUG_QUERY, { slug })

  // You can handle a 404 here if the post is not found
  if (!post) {
    // Next.js will automatically render a not-found.tsx if it exists
    // or you can redirect to a custom 404 page
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Blog post not found
          </h1>
          <a
            href="/blog"
            className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
          >
            Back to Blog
          </a>
        </div>
      </div>
    )
  }

  return <BlogPostClientPage post={post} />
}
