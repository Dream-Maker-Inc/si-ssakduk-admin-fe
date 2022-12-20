import { withAuth } from '@/common/router'
import { NoticeView } from '@/domains/notices'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

const NoticePage = () => {
  const router = useRouter()
  const { id } = router.query
  if (!id) return <Fragment />

  return <NoticeView id={+id} />
}

export default withAuth(NoticePage)
