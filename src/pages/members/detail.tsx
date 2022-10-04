import { withAuth } from '@/common/router'
import { MemberDetailView } from '@/domains/member'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

const MemberDetailPage = () => {
  const { query } = useRouter()
  const { id } = query
  if (!id) return <Fragment />

  return <MemberDetailView id={`${id}`} />
}

export default withAuth(MemberDetailPage)
