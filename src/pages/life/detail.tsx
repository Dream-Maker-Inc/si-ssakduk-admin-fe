import { withAuth } from '@/common/router'
import { LifePostingView } from '@/domains/life-posting'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

const LifePostingPage = () => {
  const router = useRouter()
  const { id } = router.query
  if (!id) return <Fragment />

  return <LifePostingView id={`${id}`} />
}

export default withAuth(LifePostingPage)
