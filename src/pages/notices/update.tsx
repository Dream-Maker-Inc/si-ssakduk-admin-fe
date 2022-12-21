import { withAuth } from '@/common/router'
import { UpdateNoticeView } from '@/domains/notices'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

const UpdateNoticePage = () => {
  const router = useRouter()
  const { id } = router.query
  if (!id) return <Fragment />

  return <UpdateNoticeView id={+id} />
}

export default withAuth(UpdateNoticePage)
