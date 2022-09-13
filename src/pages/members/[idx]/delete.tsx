import { useRouter } from 'next/router'

import { MemberDeleteView } from '@/domains/member/delete/MemberDeleteView'

const MemberDeletePage = () => {
  const router = useRouter()
  const { idx } = router.query
  if (!idx) return

  return <MemberDeleteView id={`${idx}`} />
}

export default MemberDeletePage
