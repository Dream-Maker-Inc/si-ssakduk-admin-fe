import { MemberDetailView } from '@/domains/member'
import { useRouter } from 'next/router'

const MemberDetailPage = () => {
  const { query } = useRouter()
  const { id } = query
  if (!id) return

  return <MemberDetailView id={`${id}`} />
}

export default MemberDetailPage
