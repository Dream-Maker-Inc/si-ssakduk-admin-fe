import Stack from '@mui/material/Stack'
import { TitleContainer } from '@/common/components/TitleContainer'
import { ContentContainer } from '@/common/ContentContainer'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import { IconButton } from '@mui/material'
import { DeleteRounded, EditRounded } from '@mui/icons-material'
import Link from 'next/link'
import { community } from '@/data/community'
import { SingleDataRow } from '@/common/components/SingleDataRow'
import { SingleImageRow } from '@/common/components/SingleImageRow'
import { CommentItem } from '@/common/components/CommentItem/CommentItem'
import { life } from '@/data/life'

const Detail = () => {
  const router = useRouter()
  const { id } = router.query
  const data = life[id - 1]

  return (
    <Stack>
      <TitleContainer
        title={'라이프 상세'}
        breadcrumbStrings={['라이프 관리', '라이프 상세']}
      />

      <ContentContainer>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant='h2'>글 정보</Typography>
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
