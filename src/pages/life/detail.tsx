import { LifePostingView } from '@/domains/life-posting'
import { useRouter } from 'next/router'

const LifePostingPage = () => {
  const router = useRouter()
  const { id } = router.query
  if (!id) return

  return <LifePostingView id={`${id}`} />
}

export default LifePostingPage
