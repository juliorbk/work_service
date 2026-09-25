import type { MetadataRoute } from 'next'

const BASE_URL = 'https://www.workservice.site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/booking`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacidad`,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/terminos`,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]
}