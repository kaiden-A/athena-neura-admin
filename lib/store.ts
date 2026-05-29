import type { KnowledgeFolder, FAQArticle, User, LogEntry } from './types'
import { seedFolders, seedFAQs, seedUsers, seedLogs } from './mock-data'

let foldersStore: KnowledgeFolder[] = [...seedFolders]
let faqsStore: FAQArticle[] = [...seedFAQs]
let usersStore: User[] = [...seedUsers]
let logsStore: LogEntry[] = [...seedLogs]

export function getFolders(): KnowledgeFolder[] {
  return foldersStore
}

export function setFolders(f: KnowledgeFolder[]): void {
  foldersStore = f
}

export function getFAQs(): FAQArticle[] {
  return faqsStore
}

export function setFAQs(f: FAQArticle[]): void {
  faqsStore = f
}

export function getUsers(): User[] {
  return usersStore
}

export function setUsers(u: User[]): void {
  usersStore = u
}

export function getLogs(): LogEntry[] {
  return logsStore
}

export function appendLog(entry: LogEntry): void {
  logsStore = [...logsStore, entry]
}
