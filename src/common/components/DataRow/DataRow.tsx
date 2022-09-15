import React, { ReactNode } from 'react'
import { css } from '@emotion/react'
import { Divider } from '@mui/material'
import Typography from '@mui/material/Typography'

type DataRowProps = {
  title: string
  content: ReactNode
  isBottomBorder?: boolean
}

export const DataRow = ({
  title,
  content,
  isBottomBorder = false,
}: DataRowProps) => {
  const st = {
    root: css`
      display: flex;
      flex-direction: column;
      width: 100%;
    `,
    inner: css`
      display: flex;
      align-items: center;
      padding: 16px 0;
    `,
    title: css`
      min-width: 180px;
      width: 180px;
      font-weight: 500;
    `,
    body: css`
      opacity: 0.8;
    `,
  }

  return (
    <div css={st.root}>
      <div css={st.inner}>
        <Typography css={st.title} variant='subtitle1'>
          {title}
        </Typography>
        <Typography component={'div'} variant='body2' css={st.body}>
          {content}
        </Typography>
      </div>

      {isBottomBorder && <Divider />}
    </div>
  )
}
