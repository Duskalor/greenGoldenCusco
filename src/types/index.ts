export interface ItineraryItem {
  time: string
  text: string
}

export interface TourImages {
  hero?: string
  thumb?: string
  gallery?: string[]
}

export interface Tour {
  id: string
  name: string
  tag: string
  duration: string
  durationDays?: number
  price: string
  priceUSD?: string
  description: string
  longDescription: string
  includes: string[]
  notIncludes: string[]
  itinerary: ItineraryItem[]
  difficulty: string
  altitude: string
  groupSize: string
  images?: TourImages
  gradient?: string
  emoji?: string
}

export type Lang = 'es' | 'en' | 'pt'
export type Currency = 'PEN' | 'USD'
