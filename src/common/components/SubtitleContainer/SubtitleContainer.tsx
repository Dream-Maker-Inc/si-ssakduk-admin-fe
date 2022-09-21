import { Colors } from '@/common/themes/Color'
import { Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import { ReactNode } from 'react'

//
type SubtitleContainerProps = {
  title: string
  right?: ReactNode
}

export const SubtitleContainer = ({ title, right }: SubtitleContainerProps) => {
  return (
    <Stack direction='row' justifyContent='space-between' alignItems={'center'}>
      <Typography
        variant='h6'
        fontWeight={600}
        color={Colors.TitlePrimary}
        sx={{ opacity: 0.7 }}
      >
        {title}
      </Typography>

      {right}
    </Stack>
  )
}
