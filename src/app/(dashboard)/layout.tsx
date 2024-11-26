import { Header } from '@/components/header'
import type { ReactNode } from 'react'

const DashboardLayout = ({
  children,
  modal,
}: {
  children: ReactNode
  modal: ReactNode
}) => {
  return (
    <main className="bg-blue-100 min-h-dvh w-screen pt-20">
      <Header />
      {children}
      {modal}
    </main>
  )
}

export default DashboardLayout
