import { Colors } from '@/common/themes/Color'
import { DeleteForeverRounded } from '@mui/icons-material'
import { Button, Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import React from 'react'

//
type SubtitleContainerProps = {
  title: string
  onDelete?: () => void
}

export const SubtitleContainer = ({
  title,
  onDelete,
}: SubtitleContainerProps) => {
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

      {onDelete && (
        <Button
          variant={'outlined'}
          size={'small'}
          color={'error'}
          startIcon={<DeleteForeverRounded />}
          onClick={onDelete}
        >
          삭제
        </Button>
      )}
    </Stack>
  )
}
