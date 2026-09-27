import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/booking`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacidad`,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/terminos`,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]
}
