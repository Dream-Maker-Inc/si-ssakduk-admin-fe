import { withAuth } from '@/common/router'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return <div></div>
}

export default withAuth(Home)
