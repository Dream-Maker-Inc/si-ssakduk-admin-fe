import { Stack, Typography, TypographyProps } from '@mui/material'

type TableDataColumnProps = {
  width?: string
  minWidth?: string
  typographyProps: TypographyProps
}

const TableDataColumn = ({
  width = '100%',
  minWidth,
  typographyProps,
}: TableDataColumnProps) => (
  <Stack
    sx={{
      minWidth,
      width,
      height: '56px',
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Typography
      sx={{
        opacity: 0.8,
        width: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'block',
        whiteSpace: 'nowrap',
      }}
      {...typographyProps}
    />
  </Stack>
)

export { TableDataColumn }
export type { TableDataColumnProps }
