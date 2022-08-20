import Stack from '@mui/material/Stack'
import { TitleContainer } from '@/common/components/TitleContainer'
import { ContentContainer } from '@/common/ContentContainer'
import { ChangeEvent, useState } from 'react'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { css } from '@emotion/react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import SendRounded from '@mui/icons-material/SendRounded'

const New = () => {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [sponsorLink, setSponsorLink] = useState<string>('')

  const handleTitleChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleContentChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value)
  }

  const handleSponsorLinkChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setSponsorLink(event.target.value)
  }

  return (
    <Stack>
      <TitleContainer
        title='라이프 글 작성'
        breadcrumbStrings={['라이프 관리', '라이프 글 작성']}
      />

      <ContentContainer>
        <div>
          <article css={style.root}>
            <Typography css={style.title} variant='body1'>
              제목
            </Typography>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel>제목을 입력하세요.</InputLabel>
              <OutlinedInput
                value={title}
                onChange={handleTitleChanged}
                label='제목을 입력하세요'
              />
            </FormControl>
          </article>
          <Divider />

          <article css={style.root}>
            <Typography css={style.title} variant='body1'>
              내용을 입력하세요.
            </Typography>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                label='내용을 입력하세요.'
                multiline
                minRows={10}
                value={content}
                onChange={handleContentChanged}
                variant='outlined'
              />
            </FormControl>
          </article>
          <Divider />

          <article css={style.root}>
            <Typography css={style.title} variant='body1'>
              스폰서 링크
            </Typography>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel>스폰서 링크를 입력하세요.</InputLabel>
              <OutlinedInput
                value={sponsorLink}
                onChange={handleSponsorLinkChanged}
                label='스폰서 링크를 입력하세요'
              />
            </FormControl>
          </article>
          <Divider />

          <Button
            variant='outlined'
            endIcon={<SendRounded />}
            css={style.button}
          >
            게시물 등록하기
          </Button>
        </div>
      </ContentContainer>
    </Stack>
  )
}

const style = {
  root: css`
    display: flex;
    align-items: center;
    min-height: 60px;
  `,
  title: css`
    width: 300px;
  `,
  link: css`
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      transition: 0.3s;
      color: black;
      text-decoration: underline;
      text-underline: green;
      text-underline-position: under;
    }
  `,
  button: css`
    float: right;
    margin-top: 20px;
  `,
}

export default New
