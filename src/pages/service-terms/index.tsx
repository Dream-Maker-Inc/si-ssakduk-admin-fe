import { withAuth } from '@/common/router'
import { ServiceTermsView } from '@/domains/service-terms'

const ServiceTermsPage = () => {
  return <ServiceTermsView />
}

export default withAuth(ServiceTermsPage)
