'use client'

import { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import ToastContainer from '@/components/ui/Toast'
import FAQModal from '@/components/faqs/FAQModal'
import { ToastProvider } from '@/lib/toast-context'
import { SearchProvider } from '@/lib/search-context'
import QueryProvider from '@/lib/providers'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [faqModalOpen, setFaqModalOpen] = useState(false)

  return (
    <ToastProvider>
      <SearchProvider>
        <QueryProvider>
        <div className="flex h-screen overflow-hidden bg-bg">
          <Sidebar onNewEntry={() => setFaqModalOpen(true)} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-6">{children}</main>
          </div>
        </div>
        <FAQModal
          open={faqModalOpen}
          onClose={() => setFaqModalOpen(false)}
          onSaved={() => {
            window.location.reload()
          }}
        />
        </QueryProvider>
      </SearchProvider>
      <ToastContainer />
    </ToastProvider>
  )
}
