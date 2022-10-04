import { withAuth } from '@/common/router'
import { LifePostingsView } from '@/domains/life-posting'

const LifePage = () => {
  return <LifePostingsView />
}

export default withAuth(LifePage)
