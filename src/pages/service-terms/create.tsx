import { withAuth } from '@/common/router'
import { CreateTermsView } from '@/domains/service-terms'

const CreateServiceTermsPage = () => {
  return <CreateTermsView />
}

export default withAuth(CreateServiceTermsPage)
