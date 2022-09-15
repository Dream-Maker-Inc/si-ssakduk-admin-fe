import { ListPageTemplate } from '@/common/templates'
import { useMembersView } from './useMembersView'

export const MembersView = () => {
  const {
    membersFetchState,
    dataTableProps,
    keywordState,
    paginationState,
    breadcrumbModels,
  } = useMembersView()

  const { isError, error } = membersFetchState

  if (isError) alert(error)

  return (
    <ListPageTemplate
      pageTitle='회원 관리'
      pageSubtitle='탈퇴 회원 정보는 탈퇴 회원 관리에서 조회가 가능합니다.'
      keywordState={keywordState}
      dataTableProps={dataTableProps}
      paginationState={paginationState}
      breadcrumbModels={breadcrumbModels}
    />
  )
}
