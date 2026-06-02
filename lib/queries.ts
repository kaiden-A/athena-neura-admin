import { useQuery } from '@tanstack/react-query'
import type { KnowledgeFolder, FAQArticle, User, LogEntry, Stats } from '@/lib/types'

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return res.json()
}

export function useFolders() {
  return useQuery({
    queryKey: ['folders'],
    queryFn: () =>
      fetchJSON<{ folders: KnowledgeFolder[] }>('/api/folders').then((d) => d.folders),
  })
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ['me'],
    queryFn: async (): Promise<User | null> => {
      const res = await fetch('/api/auth/me')
      if (!res.ok) return null
      const data = await res.json()
      return data.user ?? null
    },
    staleTime: 5 * 60 * 1000,
  })
}

export function useStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: () => fetchJSON<Stats>('/api/stats'),
    refetchInterval: 5000,
  })
}

export function useLogs() {
  return useQuery({
    queryKey: ['logs'],
    queryFn: () =>
      fetchJSON<{ logs: LogEntry[] }>('/api/logs').then((d) => d.logs),
  })
}

export function useFAQs(folderId: string, searchQuery: string) {
  return useQuery({
    queryKey: ['faqs', folderId, searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (folderId) params.set('folderId', folderId)
      if (searchQuery) params.set('q', searchQuery)
      const data = await fetchJSON<{ faqs: FAQArticle[] }>(`/api/faqs?${params}`)
      return data.faqs
    },
    enabled: !!folderId,
  })
}
