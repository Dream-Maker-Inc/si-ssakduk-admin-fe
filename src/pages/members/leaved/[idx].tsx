import { useRouter } from 'next/router'

import { LeavedMemberView } from '@/domains/member'

const Detail = () => {
  const { query } = useRouter()
  const { idx } = query
  if (!idx) return

  return <LeavedMemberView id={`${idx}`} />
}

export default Detail
