import Link from 'next/link'
import { useRouter } from 'next/router'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import DeleteRounded from '@mui/icons-material/DeleteRounded'
import EditRounded from '@mui/icons-material/EditRounded'

import { life } from '@/data/life'
import { TitleContainer } from '@/common/components/TitleContainer'
import { ContentContainer } from '@/common/ContentContainer'
import { SingleDataRow } from '@/common/components/SingleDataRow'
import { SingleImageRow } from '@/common/components/SingleImageRow'
import { RouterPath } from '@/common/router'

const Detail = () => {
  const router = useRouter()
  const { id } = router.query
  if (!id) return

  const data = life[+id - 1]
  if (!data) return

  const { LifePostings, LifePosting } = RouterPath
  const breadcrumbModels = [
    {
      displayName: '라이프 관리',
      path: LifePostings.path,
    },
    {
      displayName: '라이프 상세',
      path: LifePosting.createPath(`${id}`),
    },
  ]

  return (
    <Stack>
      <TitleContainer
        title={'라이프 상세'}
        breadcrumbModels={breadcrumbModels}
      />

      <ContentContainer>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant='h6'>글 정보</Typography>
          <Stack direction='row'>
            <Link href={`/life/${data.id}/edit`}>
              <IconButton>
                <EditRounded aria-label='글 수정하기' />
              </IconButton>
            </Link>
            <Link href={`/life/${data.id}/delete`}>
              <IconButton>
                <DeleteRounded aria-label='글 삭제하기' />
              </IconButton>
            </Link>
          </Stack>
        </Stack>

        <Stack>
          <SingleDataRow title='게시글 번호' content={data.id} />
          <SingleDataRow
            title={'작성자 이름(닉네임)'}
            content='ㅁㄴㅇㄹ(asdf)'
            contentLink={`/member/${data.authorId}`}
          />
          <SingleDataRow title='제목' content={data.title} />
          <SingleDataRow title='내용' content={data.content} />
          <SingleDataRow title='스폰서 링크' content={data.sponsorLink} />
          <SingleDataRow title='조회 수' content={data.viewCount} />
          <SingleImageRow title='첨부 파일' images={data.attachments} />
          <SingleDataRow title='등록 일자' content={data.regDate} />
          <SingleDataRow title='최종 수정 일자' content={data.updateDate} />
        </Stack>
      </ContentContainer>
    </Stack>
  )
}

export default Detail
