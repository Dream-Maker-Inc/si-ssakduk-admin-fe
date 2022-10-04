import { withAuth } from '@/common/router'
import { PostingsView } from '@/domains/posting/views/list'

const PostingsPage = () => {
  return <PostingsView />
}

export default withAuth(PostingsPage)
