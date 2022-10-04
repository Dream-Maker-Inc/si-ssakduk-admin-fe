import { withAuth } from '@/common/router'
import { UpdateTermsView } from '@/domains/service-terms'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

const UpdateServiceTermsPage = () => {
  const router = useRouter()
  const { id } = router.query
  if (!id) return <Fragment />

  return <UpdateTermsView id={+id} />
}

export default withAuth(UpdateServiceTermsPage)
