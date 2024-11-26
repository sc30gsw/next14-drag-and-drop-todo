import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className="h-20 bg-white flex items-center justify-between p-4 border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="ml-4">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={40} height={40} />
        </Link>
      </div>
    </header>
  )
}
