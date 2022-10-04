import { withAuth } from '@/common/router'
import { ServiceTermView } from '@/domains/service-terms'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

const ServiceTermPage = () => {
  const router = useRouter()
  const { id } = router.query
  if (!id) return <Fragment />

  return <ServiceTermView id={+id} />
}

export default withAuth(ServiceTermPage)
