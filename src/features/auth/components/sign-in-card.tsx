import { DottedSeparator } from '@/components/dotted-separator'
import { Card } from '@/components/ui'
import { SignInForm } from '@/features/auth/components/sign-in-form'
import Link from 'next/link'

export const SignInCard = () => {
  return (
    <Card className="max-w-md mx-auto p-4">
      <Card.Header className="flex items-center justify-center text-center p-7">
        <Card.Title className="text-2xl">Sign in</Card.Title>
        <Card.Description>Welcome back!</Card.Description>
      </Card.Header>
      <div className="px-7 py-2">
        <DottedSeparator />
      </div>
      <SignInForm />
      <div className="px-7 py-2">
        <DottedSeparator />
      </div>
      <Card.Content className="p-7 flex items-center justify-center gap-2">
        <p>Don&apos;t have an account?</p>
        <Link href={'/sign-up'}>
          <span className="text-blue-700">&nbsp;Sign up</span>
        </Link>
      </Card.Content>
    </Card>
  )
}
