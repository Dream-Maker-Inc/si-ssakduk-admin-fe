import Typography from '@mui/material/Typography'
import { css } from '@emotion/react'
import { Divider } from '@mui/material'

type DoubleDataRowProps = {
  firstTitle: string
  firstContent: string | number
  secondTitle: string
  secondContent: string | number
}

export const DoubleDataRow = ({
  firstTitle,
  firstContent,
  secondTitle,
  secondContent,
}: DoubleDataRowProps) => (
  <div>
    <article css={style.root}>
      <Typography css={style.title} variant='body1'>
        {firstTitle}
      </Typography>
      <Typography variant='body2'>{firstContent}</Typography>
      <Typography css={style.title} variant='body1'>
        {firstTitle}
      </Typography>
      <Typography variant='body2'>{firstContent}</Typography>
    </article>
    <Divider />
  </div>
)

const style = {
  root: css`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    min-height: 60px;
  `,
  title: css``,
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
