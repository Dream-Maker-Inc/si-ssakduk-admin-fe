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
      borderTop: '1px solid #ddd',
    }}
  >
    <Typography sx={{ opacity: 0.8 }} {...typographyProps} />
  </Stack>
)

export { TableDataColumn }
export type { TableDataColumnProps }
