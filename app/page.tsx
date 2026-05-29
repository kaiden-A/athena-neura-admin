'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getStoredToken } from '@/lib/api/auth'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    if (getStoredToken()) {
      router.replace('/dashboard')
    } else {
      router.replace('/login')
    }
  }, [router])

  return null
}
