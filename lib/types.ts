export interface ResearchEntry {
  title: string
  venue: string
  publisher: string
  year: number
  abstract: string
  url: string
  tags: string[]
}

export interface ApproachPrinciple {
  index: string
  heading: string
  body: string
}

export interface ProjectEntry {
  slug: string
  title: string
  description: string
  tags: string[]
  image?: string
  url?: string
  githubUrl?: string
  featured: boolean
  private: boolean
}
