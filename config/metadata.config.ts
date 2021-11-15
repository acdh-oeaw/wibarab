import { baseUrl } from './site.config'

export interface SiteMetadata {
  url: string
  title: string
  shortTitle?: string
  description: string
  favicon: {
    src: string
    maskable?: boolean
  }
  image: {
    src: string
    publicPath: string
    alt: string
  }
  twitter?: {
    handle?: string
  }
  creator?: {
    name: string
    shortName?: string
    affiliation?: string
    website: string
    address?: {
      street: string
      zip: string
      city: string
    }
    image?: {
      src: string
      publicPath: string
      alt: string
    }
    phone?: string
    email?: string
    twitter?: {
      handle?: string
    }
  }
}

export const siteMetadata: SiteMetadata = {
  url: baseUrl,
  title: 'What is bedouin-type Arabic?',
  shortTitle: 'WIBARAB',
  description:
    'The linguistic and socio-historical realities behind the millennia-old dichotomous concept of nomadic and sedentary people in the Middle East and North Africa',
  favicon: {
    src: 'public/assets/images/logo-maskable.svg',
    maskable: true,
  },
  image: {
    src: 'public/android-chrome-512x512.png',
    publicPath: '/android-chrome-512x512.png',
    alt: '',
  },
  twitter: {},
  creator: {
    name: 'Austrian Centre for Digital Humanities and Cultural Heritage',
    shortName: 'ACDH-CH',
    website: 'https://www.oeaw.ac.at/acdh/',
  },
} as const
