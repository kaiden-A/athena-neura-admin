import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { FAQVisibility } from '@/lib/types'

async function postJSON(url: string, body: unknown) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed.')
  return data
}

async function putJSON(url: string, body: unknown) {
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed.')
  return data
}

async function del(url: string) {
  const res = await fetch(url, { method: 'DELETE' })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error || 'Delete failed.')
  }
}

// --- Auth ---

export function useLogin() {
  return useMutation({
    mutationFn: (input: { email: string; password: string }) =>
      postJSON('/api/auth/login', input),
  })
}

export function useSignup() {
  return useMutation({
    mutationFn: (input: { name: string; email: string; password: string }) =>
      postJSON('/api/auth/signup', input),
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => postJSON('/api/auth/logout', {}),
    onSuccess: () => {
      queryClient.clear()
    },
  })
}

// --- Folders ---

export function useCreateFolder() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: { name: string; description: string }) =>
      postJSON('/api/folders', input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] })
    },
  })
}

// --- FAQs ---

export function useCreateFAQ(folderId?: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: {
      topicId: string
      question: string
      answer: string
      visibility: FAQVisibility
    }) => postJSON('/api/faqs', input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs', folderId] })
    },
  })
}

export function useUpdateFAQ(folderId?: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: {
      id: string
      topicId: string
      question: string
      answer: string
      visibility: FAQVisibility
      assistant: string
    }) => putJSON(`/api/faqs/${input.id}`, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs', folderId] })
    },
  })
}

export function useDeleteFAQ(folderId?: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => del(`/api/faqs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs', folderId] })
    },
  })
}
