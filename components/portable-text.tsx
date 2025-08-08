import { PortableText } from '@portabletext/react'
import { urlFor } from '@/lib/client'

const components = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8">
        <img
          src={urlFor(value).width(800).height(400).url() || '/placeholder.svg'}
          alt={value.alt || 'Blog image'}
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl md:text-4xl font-heading font-bold text-[#ECF0F1] mb-6 mt-8">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#ECF0F1] mb-4 mt-6">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl md:text-2xl font-heading font-bold text-[#ECF0F1] mb-3 mt-5">
        {children}
      </h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[#E67E22] pl-6 my-6 italic text-[#ECF0F1]/80 bg-[#8E44AD]/10 py-4 rounded-r-lg">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="text-[#ECF0F1]/90 font-body mb-4 leading-relaxed">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-[#ECF0F1]/90 font-body">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-[#ECF0F1]/90 font-body">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="ml-4 text-[#ECF0F1]/90 font-body">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="ml-4 text-[#ECF0F1]/90 font-body">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-[#E67E22]">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-[#ECF0F1]/80 font-body">{children}</em>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#E67E22] hover:text-[#E74C3C] underline transition-colors duration-200 font-semibold"
      >
        {children}
      </a>
    ),
  },
}

export default function CustomPortableText({ value }: { value: any[] }) {
  return <PortableText value={value} components={components} />
}
