import { AppBar, AppBarProps, Toolbar, ToolbarProps } from '@mui/material'
import { ReactNode } from 'react'
import { css } from '@emotion/react'

export interface CustomAppbarProps {
  children: ReactNode
  appbarProps?: AppBarProps
  toolbarProps?: ToolbarProps
}

export const CustomAppbar = ({
  children,
  appbarProps,
  toolbarProps,
}: CustomAppbarProps) => {
  return (
    <AppBar position='static' {...appbarProps}>
      <Toolbar {...toolbarProps} css={style.root}>
        {children}
      </Toolbar>
    </AppBar>
  )
}

const style = {
  root: css`
    display: flex;
    justify-content: space-between;
  `,
}
