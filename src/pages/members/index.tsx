import { withAuth } from '@/common/router'
import { MembersView } from '@/domains/member'

const MembersPage = () => {
  return <MembersView />
}

export default withAuth(MembersPage)
