'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

interface SearchContextValue {
  globalSearch: string
  setGlobalSearch: (q: string) => void
}

const SearchContext = createContext<SearchContextValue>({
  globalSearch: '',
  setGlobalSearch: () => {},
})

export function SearchProvider({ children }: { children: ReactNode }) {
  const [globalSearch, setGlobalSearch] = useState('')

  return (
    <SearchContext.Provider value={{ globalSearch, setGlobalSearch }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useGlobalSearch() {
  return useContext(SearchContext)
}
