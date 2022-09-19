import { RouterPath } from '@/common/router'
import { PostingsApi } from '@/data/postings'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from 'react-query'

export const usePostingView = (id: string) => {
  const router = useRouter()

  // fetch posting
  const { data: postingDetail, refetch } = useQuery(['posting', id], () =>
    PostingsApi.findOne(id),
  )

  // blind posting
  const { mutate: mutatePostingBlind } = useMutation(
    'blind-posting',
    (isBlind: boolean) => PostingsApi.modify(id, { isBlind }),
    {
      onSuccess: () => refetch(),
      onError: (err: any) => {
        console.error(err)
        alert(err.message)
      },
    },
  )

  const result = { data: null }
  if (!postingDetail) return result

  // breadcrumbs
  const breadcrumbModels = [
    {
      displayName: '게시글 관리',
      path: RouterPath.Postings.path,
    },
    {
      displayName: '게시글 상세',
      path: RouterPath.Posting.createPath(id),
    },
  ]

  const handleBlind = (isBlind: boolean) => mutatePostingBlind(isBlind)

  return {
    data: {
      postingDetail,
      breadcrumbModels,
      handleBlind,
    },
  }
}
