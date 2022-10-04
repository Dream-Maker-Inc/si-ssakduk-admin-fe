import { withAuth } from '@/common/router'
import { CommentsView } from '@/domains/comment'

const CommentsPage = () => {
  return <CommentsView />
}

export default withAuth(CommentsPage)
