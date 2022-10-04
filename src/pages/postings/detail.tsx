import { useRouter } from 'next/router'

import { PostingView } from '@/domains/posting/views/detail'
import { Fragment } from 'react'
import { withAuth } from '@/common/router'

const PostingDetailPage = () => {
  const router = useRouter()
  const { id } = router.query
  if (!id) return <Fragment />

  return <PostingView id={`${id}`} />
}

export default withAuth(PostingDetailPage)
