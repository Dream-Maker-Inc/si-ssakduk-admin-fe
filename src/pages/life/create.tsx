import { withAuth } from '@/common/router'
import { CreateLifePostingView } from '@/domains/life-posting'

const CreateLifePostingPage = () => {
  return <CreateLifePostingView />
}

export default withAuth(CreateLifePostingPage)
