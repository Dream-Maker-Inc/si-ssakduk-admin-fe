import { useRouter } from 'next/router'

import { PostingView } from '@/domains/posting/detail'

const PostingDetailPage = () => {
  const router = useRouter()
  const { id } = router.query
  if (!id) return

  return <PostingView id={`${id}`} />
}

export default PostingDetailPage
