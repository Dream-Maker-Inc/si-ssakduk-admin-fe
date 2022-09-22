import Link from 'next/link'
import { useRouter } from 'next/router'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import DeleteRounded from '@mui/icons-material/DeleteRounded'
import EditRounded from '@mui/icons-material/EditRounded'

import { agreement } from '@/data/agreement'
import { TitleContainer } from '@/common/components/TitleContainer'
import { ContentContainer } from '@/common/ContentContainer'
import { SingleDataRow } from '@/common/components/SingleDataRow'
import { RouterPath } from '@/common/router'

const ServiceTermDetailPage = () => {
  const router = useRouter()
  const { id } = router.query

  if (!id) return

  const data = agreement[+id - 1]

  const { ServiceTerms, ServiceTerm, ServiceTermUpdate, ServiceTermDelete } =
    RouterPath
  const breadcrumbModels = [
    {
      displayName: '약관 관리',
      path: ServiceTerms.path,
    },
    {
      displayName: '약관 상세',
      path: ServiceTerm.createPath(`${id}`),
    },
  ]

  return (
    <Stack>
      <TitleContainer title={'약관 상세'} breadcrumbModels={breadcrumbModels} />

      <ContentContainer>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant='h6'>약관 정보</Typography>
          <Stack direction='row'>
            <Link href={ServiceTermUpdate.path(`${data.id}`)}>
              <IconButton>
                <EditRounded aria-label='약관 수정하기' />
              </IconButton>
            </Link>
            <Link href={ServiceTermDelete.path(`${data.id}`)}>
              <IconButton>
                <DeleteRounded aria-label='약관 삭제하기' />
              </IconButton>
            </Link>
          </Stack>
        </Stack>

        <Stack>
          <SingleDataRow title='약관 번호' content={data.id} />
          <SingleDataRow title='제목' content={data.title} />
          <SingleDataRow title='내용' content={data.content} />
          <SingleDataRow
            title='필수 여부'
            content={data.isRequired ? '필수' : '선택'}
          />
          <SingleDataRow title='등록 일자' content={data.regDate} />
        </Stack>
      </ContentContainer>
    </Stack>
  )
}

export default ServiceTermDetailPage
