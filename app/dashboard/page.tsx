import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Athena-Neura Knowledge Base Dashboard',
}

export default function DashboardPage() {
  redirect('/dashboard/faq')
}
