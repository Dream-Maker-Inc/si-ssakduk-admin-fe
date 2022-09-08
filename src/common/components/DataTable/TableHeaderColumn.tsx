import { Stack, Typography, TypographyProps } from '@mui/material'

type TableHeaderColumnProps = {
  width?: string
  minWidth?: string
  typographyProps: TypographyProps
}

const TableHeaderColumn = ({
  width = '100%',
  minWidth,
  typographyProps,
}: TableHeaderColumnProps) => (
  <Stack
    sx={{
      minWidth,
      width,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Typography variant='subtitle1' fontWeight={600} {...typographyProps} />
  </Stack>
)

export { TableHeaderColumn }
export type { TableHeaderColumnProps }
