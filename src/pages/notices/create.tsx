import { withAuth } from '@/common/router'
import { CreateNoticeView } from '@/domains/notices'

const CreateNoticePage = () => {
  return <CreateNoticeView />
}

export default withAuth(CreateNoticePage)
