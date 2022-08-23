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
    border: 1px solid #ccc;
    margin-top: 30px;
    padding: 40px;
  `,
}
