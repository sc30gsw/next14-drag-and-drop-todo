import { Header } from '@/components/Header'
import type { ReactNode } from 'react'

const DashboardLayout = ({
  children,
}: {
  children: ReactNode
}) => {
  return (
    <main className="bg-blue-100 min-h-dvh w-screen pt-20">
      <Header />
      {children}
    </main>
  )
}

export default DashboardLayout
