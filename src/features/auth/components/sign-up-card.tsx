import { DottedSeparator } from '@/components/dotted-separator'
import { Card } from '@/components/ui'
import { SignUpForm } from '@/features/auth/components/sign-up-form'
import Link from 'next/link'

export const SignUpCard = () => {
  return (
    <Card className="max-w-md mx-auto p-4">
      <Card.Header className="flex items-center justify-center text-center p-7">
        <Card.Title className="text-2xl">Sign up</Card.Title>
        <Card.Description>
          By signing up, you agree to our{' '}
          <Link href={'/privacy'}>
            <span>Privacy Policy</span>
          </Link>{' '}
          and <Link href={'/terms'}>Terms of Service</Link>
        </Card.Description>
      </Card.Header>
      <div className="px-7 py-2">
        <DottedSeparator />
      </div>
      <SignUpForm />
      <div className="px-7 py-2">
        <DottedSeparator />
      </div>
      <Card.Content className="p-7 flex items-center justify-center gap-2">
        <p>Already have an account?</p>
        <Link href={'/sign-in'}>
          <span className="text-blue-700">&nbsp;Sign in</span>
        </Link>
      </Card.Content>
    </Card>
  )
}
