import Link from 'next/link'
import { useRouter } from 'next/router'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import DeleteRounded from '@mui/icons-material/DeleteRounded'

import { community } from '@/data/community'
import { SingleDataRow } from '@/common/components/SingleDataRow'
import { SingleImageRow } from '@/common/components/SingleImageRow'
import { CommentItem } from '@/common/components/CommentItem/CommentItem'
import { TitleContainer } from '@/common/components/TitleContainer'
import { ContentContainer } from '@/common/ContentContainer'

const Detail = () => {
  const router = useRouter()
  const { id } = router.query
  if (!id) return

  const data = community[+id - 1]

  if (!data) return

  return (
    <Stack>
      <TitleContainer
        title={'커뮤니티 상세'}
        breadcrumbStrings={['커뮤니티 관리', '커뮤니티 상세']}
      />

      <ContentContainer>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant='h6'>글 정보</Typography>
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
          <SingleDataRow
            title='숨김 여부'
            content={
              data.isVisible
                ? '정상 게시 중입니다.'
                : '숨김 처리된 게시물입니다.'
            }
          />
        </Stack>
      </ContentContainer>

      <ContentContainer>
        <Typography variant='h6' style={{ marginBottom: 20 }}>
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
