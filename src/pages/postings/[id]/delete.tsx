import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { css } from '@emotion/react'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import SendRounded from '@mui/icons-material/SendRounded'

import { Colors } from '@/common/themes/Color'
import { community } from '@/data/community'
import { TitleContainer } from '@/common/components/TitleContainer'
import { ContentContainer } from '@/common/ContentContainer'
import { RouterPath } from '@/common/router'

const PostingDeletePage = () => {
  const router = useRouter()
  const { id } = router.query

  const [checked, setChecked] = useState<boolean>(false)
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)

  if (!id) return

  const data = community[+id - 1]
  if (!data) return

  const handleCheckboxChecked = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement
    target.checked ? setChecked(true) : setChecked(false)
    checked ? handleButtonClickable() : setButtonDisabled(false)
  }

  const handleButtonClickable = () => setButtonDisabled(true)

  const handleButtonClick = () => {
    alert('반영되었습니다.')
    router.push('/community')
  }

  const { Postings, Posting, PostingDelete } = RouterPath
  const breadcrumbModels = [
    {
      displayName: '게시글 관리',
      path: Postings.path,
    },
    {
      displayName: '게시글 상세',
      path: Posting.createPath(`${id}`),
    },
    {
      displayName: '게시글 삭제',
      path: PostingDelete.createPath(`${id}`),
    },
  ]

  return (
    <Stack>
      <TitleContainer
        title={'커뮤니티 글 숨김'}
        breadcrumbModels={breadcrumbModels}
      />

      <ContentContainer>
        <Typography variant='body1'>
          {data.authorId}(닉네임) 님의 [{data.title}] 게시물을 숨김 처리합니다.
        </Typography>

        <Typography variant='body1' color={Colors.Danger}>
          ※ 본 작업은 실행 후 취소할 수 없으므로 신중히 진행하시기 바랍니다.
        </Typography>

        <FormControlLabel
          control={<Checkbox />}
          label='동의합니다.'
          onChange={handleCheckboxChecked}
        />

        <Button
          disabled={buttonDisabled}
          variant='outlined'
          endIcon={<SendRounded />}
          css={style.button}
          onClick={handleButtonClick}
        >
          게시물 숨김 처리하기
        </Button>
      </ContentContainer>
    </Stack>
  )
}

const style = {
  button: css`
    float: right;
    margin-top: 20px;
  `,
}

export default PostingDeletePage
