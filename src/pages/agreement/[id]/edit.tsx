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
import { Checkbox, FormControlLabel } from '@mui/material'

const Edit = () => {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')

  const handleTitleChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleContentChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value)
  }

  return (
    <Stack>
      <TitleContainer
        title='약관 수정'
        breadcrumbStrings={['약관 관리', '약관 글 상세', '약관 글 수정']}
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
              필수 동의 여부
            </Typography>
            <FormControlLabel control={<Checkbox />} label='필수' />
          </article>
          <Divider />

          <Button
            variant='outlined'
            endIcon={<SendRounded />}
            css={style.button}
          >
            약관 수정하기
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

export default Edit
