import Card from '@mui/material/Card'
import { ReactNode } from 'react'
import { css } from '@emotion/react'

type ContentContainerProps = {
  children: ReactNode
}

export const ContentContainer = ({ children }: ContentContainerProps) => (
  <Card css={style.card}>{children}</Card>
)

const style = {
  card: css`
    border: 1px solid #eee;
    padding: 40px;
    border-radius: 8px;
  `,
}
