import { UpdateLifePostingView } from '@/domains/life-posting'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

const CreateLifePostingPage = () => {
  const router = useRouter()
  const { id } = router.query
  if (!id) return <Fragment />

  return <UpdateLifePostingView id={+id} />
}

export default CreateLifePostingPage
