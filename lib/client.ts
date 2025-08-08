import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'xf2bhbso',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-12-01',
})

const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => builder.image(source)
