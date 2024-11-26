import { SignInCard } from '@/features/auth/components/sign-in-card'
import { getLoggedInUser } from '@/features/auth/server/action'
import { redirect } from 'next/navigation'

const SignInPage = async () => {
  const user = await getLoggedInUser()

  if (user) {
    redirect('/')
  }

  return <SignInCard />
}

export default SignInPage
