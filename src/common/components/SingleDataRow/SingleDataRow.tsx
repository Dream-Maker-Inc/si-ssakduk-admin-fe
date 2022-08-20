import Typography from '@mui/material/Typography'
import { css } from '@emotion/react'
import Link from 'next/link'
import { Divider } from '@mui/material'

type SingleDataRowProps = {
  title: string
  content: string | number
  contentLink?: string
}

export const SingleDataRow = ({
  title,
  content,
  contentLink,
}: SingleDataRowProps) => (
  <div>
    <article css={style.root}>
      <Typography css={style.title} variant='body1'>
        {title}
      </Typography>
      {contentLink ? (
        <Link href={contentLink}>
          <Typography variant='body2' css={style.link}>
            {content}
          </Typography>
        </Link>
      ) : (
        <Typography variant='body2'>{content}</Typography>
      )}
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
}
