import Typography from '@mui/material/Typography'
import { css } from '@emotion/react'
import Link from 'next/link'
import { Divider } from '@mui/material'

type SingleImageRowProps = {
  title: string
  images: string[]
}

export const SingleImageRow = ({ title, images }: SingleImageRowProps) => (
  <div>
    <article css={style.root}>
      <Typography css={style.title} variant='body1'>
        {title}
      </Typography>
      {images.map(item => (
        <img src={item} key={item} alt={item} css={style.image} />
      ))}
    </article>
    <Divider />
  </div>
)

const style = {
  root: css`
    display: flex;
    align-items: center;
    min-height: 60px;
  `,
  title: css`
    width: 300px;
  `,
  image: css`
    margin-right: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    max-width: 400px;
    max-height: 400px;
    border-radius: 8px;
  `,
}
