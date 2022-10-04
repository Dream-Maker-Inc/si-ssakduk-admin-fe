import { NextComponentType, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import { RouterPath } from './router.path'

export const withAuth = (
  WrappedComponent: NextComponentType<NextPageContext, any, {}>,
) => {
  const Component = (props: any) => {
    const router = useRouter()

    if (typeof window !== 'undefined') {
      const accessToken = sessionStorage.getItem('accessToken')

      // If there is no access token we redirect to "/" page.
      if (!accessToken) {
        router.replace(RouterPath.Login.path)
        return null
      }

      return <WrappedComponent {...props} />
    }

    // If we are on server, return null
    return null
  }

  return Component
}
