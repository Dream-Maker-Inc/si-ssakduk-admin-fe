import Stack from '@mui/material/Stack'
import { TitleContainer } from '@/common/components/TitleContainer'
import { ContentContainer } from '@/common/ContentContainer'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import { IconButton } from '@mui/material'
import { DeleteRounded, EditRounded } from '@mui/icons-material'
import Link from 'next/link'
import { SingleDataRow } from '@/common/components/SingleDataRow'
import { agreement } from '@/data/agreement'

const Detail = () => {
  const router = useRouter()
  const { id } = router.query
  const data = agreement[id - 1]

  return (
    <Stack>
      <TitleContainer
        title={'약관 상세'}
        breadcrumbStrings={['약관 관리', '약관 상세']}
      />

      <ContentContainer>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant='h2'>약관 정보</Typography>
          <Stack direction='row'>
            <Link href={`/agreement/${data.id}/edit`}>
              <IconButton>
                <EditRounded aria-label='약관 수정하기' />
              </IconButton>
            </Link>
            <Link href={`/agreement/${data.id}/delete`}>
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

export default Detail
