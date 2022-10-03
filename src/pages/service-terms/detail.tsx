import { ServiceTermView } from '@/domains/service-terms'
import { useRouter } from 'next/router'

const ServiceTermPage = () => {
  const router = useRouter()
  const { id } = router.query
  if (!id) return

  return <ServiceTermView id={+id} />
}

export default ServiceTermPage
