import { SignUpCard } from '@/features/auth/components/sign-up-card'
import { getLoggedInUser } from '@/features/auth/server/action'
import { redirect } from 'next/navigation'

const SignUpPage = async () => {
  const user = await getLoggedInUser()

  if (user) {
    redirect('/')
  }

  return <SignUpCard />
}

export default SignUpPage
