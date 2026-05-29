export type FolderPreset = 'dark' | 'blue' | 'light'

export interface KnowledgeFolder {
  id: string
  title: string
  badge: string
  description: string
  preset: FolderPreset
  icon: string
}

export type FAQVisibility = 'public' | 'private'

export interface FAQArticle {
  id: string
  folderId: string
  question: string
  answer: string
  isVerified: boolean
  visibility: FAQVisibility
  createdAt?: string
  updatedAt?: string
}

export interface User {
  email: string
  name: string
  verified: boolean
}

export interface LogEntry {
  timestamp: string
  level: 'INFO' | 'OK' | 'WARN' | 'ERROR'
  message: string
}

export interface Stats {
  totalArticles: number
  totalFolders: number
  verifiedCount: number
}
