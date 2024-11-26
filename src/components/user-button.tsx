'use client'

import {
  Avatar,
  Button,
  Link,
  Loader,
  Menu,
  buttonStyles,
} from '@/components/ui'
import { useCurrent } from '@/features/auth/api/use-current'
import { useLogout } from '@/features/auth/api/use-logout'
import {
  IconDotsHorizontal,
  IconLogin,
  IconLogout,
  IconPersonAdd,
} from 'justd-icons'

export const UserButton = () => {
  const { data: user, isLoading } = useCurrent()
  const { mutate: logout, isPending } = useLogout()

  if (isLoading) {
    return (
      <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-300">
        <Loader className="animate-spin size-4 text-muted-foreground" />
      </div>
    )
  }

  if (!user) {
    return (
      <Menu>
        <Menu.Trigger>
          <Button size="square-petite" appearance="outline">
            <IconDotsHorizontal />
          </Button>
        </Menu.Trigger>
        <Menu.Content className="min-w-48" placement="bottom end">
          <Menu.Item>
            <Link
              href="/sign-in"
              className={`${buttonStyles({ appearance: 'outline' })} w-full border-none flex items-center justify-between gap-2 hover:bg-transparent`}
            >
              Sign In
              <IconLogin />
            </Link>
          </Menu.Item>
          <Menu.Separator />
          <Menu.Item>
            <Link
              href="/sign-up"
              className={`${buttonStyles({ appearance: 'outline' })} w-full border-none flex items-center justify-between gap-2 hover:bg-transparent`}
            >
              Sign Up
              <IconPersonAdd />
            </Link>
          </Menu.Item>
        </Menu.Content>
      </Menu>
    )
  }

  const { name, email } = user

  const avatarFallback = name
    ? name.charAt(0).toUpperCase()
    : (email.charAt(0).toUpperCase() ?? '')

  return (
    <Menu>
      <Menu.Trigger className="outline-none relative">
        <Avatar
          className="size-10 hover:opacity-75 transition border border-neutral-300 bg-neutral-200 font-medium text-neutral-500"
          src={'/noAvatar.png'}
          initials={avatarFallback}
        />
      </Menu.Trigger>
      <Menu.Content className="min-w-48" placement="bottom end">
        <Menu.Item>{name || 'User'}</Menu.Item>
        <Menu.Item>{email}</Menu.Item>
        <Menu.Separator />
        <Menu.Item isDanger={true} onAction={() => logout()}>
          Log out
          <IconLogout />
        </Menu.Item>
      </Menu.Content>
    </Menu>
  )
}
