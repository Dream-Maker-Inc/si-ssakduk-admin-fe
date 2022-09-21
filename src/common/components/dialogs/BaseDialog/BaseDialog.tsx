import { css } from '@emotion/react'
import { CloseRounded } from '@mui/icons-material'
import { Dialog, IconButton, Typography } from '@mui/material'
import { ReactNode } from 'react'

type BaseDialogProps = {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export const BaseDialog = (p: BaseDialogProps) => {
  const { open, onClose, title, children } = p

  return (
    <Dialog open={open}>
      <div css={st.container}>
        <div css={st.header}>
          <Typography variant={'subtitle1'} fontWeight={500}>
            {title}
          </Typography>

          <IconButton onClick={onClose}>
            <CloseRounded />
          </IconButton>
        </div>

        {children}
      </div>
    </Dialog>
  )
}

const st = {
  container: css`
    min-width: 480px;
  `,
  header: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;

    border-bottom: 1px dashed #eee;
  `,
}
