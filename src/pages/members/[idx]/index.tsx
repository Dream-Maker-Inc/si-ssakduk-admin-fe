import { MemberDetailView } from '@/domains/member'
import { useRouter } from 'next/router'

const MemberDetailPage = () => {
  const { query } = useRouter()
  const { idx } = query
  if (!idx) return

  return <MemberDetailView id={+idx} />
}

export default MemberDetailPage
