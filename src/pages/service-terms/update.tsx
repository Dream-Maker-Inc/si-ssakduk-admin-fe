import { UpdateTermsView } from '@/domains/service-terms'
import { useRouter } from 'next/router'

const UpdateServiceTermsPage = () => {
  const router = useRouter()
  const { id } = router.query
  if (!id) return

  return <UpdateTermsView id={+id} />
}

export default UpdateServiceTermsPage
