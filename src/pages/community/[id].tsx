import Stack from '@mui/material/Stack'
import { TitleContainer } from '@/common/components/TitleContainer'
import { ContentContainer } from '@/common/ContentContainer'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import { IconButton } from '@mui/material'
import { DeleteRounded } from '@mui/icons-material'
import Link from 'next/link'
import { community } from '@/data/community'
import { SingleDataRow } from '@/common/components/SingleDataRow'
import { SingleImageRow } from '@/common/components/SingleImageRow'
import { CommentItem } from '@/common/components/CommentItem/CommentItem'

const Detail = () => {
  const router = useRouter()
  const { id } = router.query
  const data = community[id - 1]

  return (
    <Stack>
      <TitleContainer
        title={'커뮤니티 상세'}
        breadcrumbStrings={['커뮤니티 관리', '커뮤니티 상세']}
      />

      <ContentContainer>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant='h2'>글 정보</Typography>
          <Link href={`/community/${data.id}/hide`}>
            <IconButton>
              <DeleteRounded aria-label='글 삭제하기' />
            </IconButton>
          </Link>
        </Stack>

        <Stack>
          <SingleDataRow title='게시글 번호' content={data.id} />
          <SingleDataRow
            title={'작성자 이름(닉네임)'}
            content='ㅁㄴㅇㄹ(asdf)'
            contentLink={`/member/${data.authorId}`}
          />
          <SingleDataRow title='카테고리' content={data.category} />
          <SingleDataRow title='제목' content={data.title} />
          <SingleDataRow title='내용' content={data.content} />
          <SingleDataRow title='좋아요 수' content={data.likedCount} />
          <SingleDataRow title='조회 수' content={data.viewCount} />
          <SingleImageRow title='첨부 파일' images={data.attachments} />
          <SingleDataRow title='등록 일자' content={data.regDate} />
          <SingleDataRow title='최종 수정 일자' content={data.updateDate} />
        </Stack>
      </ContentContainer>

      <ContentContainer>
        <Typography variant='h2' style={{ marginBottom: 20 }}>
          댓글 목록 (총 11개)
        </Typography>

        <CommentItem
          avatarImageUrl='안'
          primaryText='가치를 창공에 끝에 무엇을 청춘의 피고 불어 봄바람이다. 열락의 붙잡아 할지니, 동력은 꽃이 열매를 시들어 싶이 있으랴?'
          captionText='이순신 · 3분 전 · 좋아요 10'
        />
        <CommentItem
          avatarImageUrl='녕'
          primaryText='가치를 창공에 끝에 무엇을 청춘의 피고 불어 봄바람이다. 열락의 붙잡아 할지니, 동력은 꽃이 열매를 시들어 싶이 있으랴?가치를 창공에 끝에 무엇을 청춘의 피고 불어 봄바람이다. 열락의 붙잡아 할지니, 동력은 꽃이 열매를 시들어 싶이 있으랴?가치를 창공에 끝에 무엇을 청춘의 피고 불어 봄바람이다. 열락의 붙잡아 할지니, 동력은 꽃이 열매를 시들어 싶이 있으랴?'
          captionText='이순신 · 3분 전 · 좋아요 10'
        />
        <CommentItem
          avatarImageUrl='하'
          primaryText='가치를 창공에 끝에 무엇을 청춘의 피고 불어 봄바람이다. 열락의 붙잡아 할지니, 동력은 꽃이 열매를 시들어 싶이 있으랴?'
          captionText='이순신 · 3분 전 · 좋아요 10'
        />
        <CommentItem
          avatarImageUrl='세'
          primaryText='가치를 창공에 끝에 무엇을 청춘의 피고 불어 봄바람이다. 열락의 붙잡아 할지니, 동력은 꽃이 열매를 시들어 싶이 있으랴?가치를 창공에 끝에 무엇을 청춘의 피고 불어 봄바람이다. 열락의 붙잡아 할지니, 동력은 꽃이 열매를 시들어 싶이 있으랴?가치를 창공에 끝에 무엇을 청춘의 피고 불어 봄바람이다. 열락의 붙잡아 할지니, 동력은 꽃이 열매를 시들어 싶이 있으랴?'
          captionText='이순신 · 3분 전 · 좋아요 10'
        />
        <CommentItem
          avatarImageUrl='요'
          primaryText='가치를 창공에 끝에 무엇을 청춘의 피고 불어 봄바람이다. 열락의 붙잡아 할지니, 동력은 꽃이 열매를 시들어 싶이 있으랴?'
          captionText='이순신 · 3분 전 · 좋아요 10'
        />
      </ContentContainer>
    </Stack>
  )
}

export default Detail