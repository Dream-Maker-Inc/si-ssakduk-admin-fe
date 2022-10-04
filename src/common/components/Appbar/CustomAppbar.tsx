import {
  AppBar,
  AppBarProps,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  ToolbarProps,
  Typography,
} from '@mui/material'
import { css } from '@emotion/react'
import Image from 'next/image'
import { PersonRounded } from '@mui/icons-material'
import Stack from '@mui/material/Stack'
import Link from 'next/link'
import { RouterPath } from '@/common/router'
import logo from '@/logo.svg'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useUserAuthentication } from '@/common/recoil'

export interface CustomAppbarProps {
  appbarProps?: AppBarProps
  toolbarProps?: ToolbarProps
}

export const CustomAppbar = ({
  appbarProps,
  toolbarProps,
}: CustomAppbarProps) => {
  return (
    <AppBar position='static' {...appbarProps}>
      <Toolbar {...toolbarProps} disableGutters css={style.root}>
        <Stack direction='row' alignItems='center'>
          <Link href={RouterPath.Main.path}>
            <div css={style.logoWrapper}>
              <Image src={logo} alt={'싹둑'} layout={'fill'} />
            </div>
          </Link>

          <Typography variant={'subtitle1'} color='#fff'>
            싹둑 관리자페이지
          </Typography>
        </Stack>

        <MyMenuIcon />
      </Toolbar>
    </AppBar>
  )
}

const style = {
  root: css`
    display: flex;
    justify-content: space-between;
  `,
  logoWrapper: css`
    position: relative;
    display: flex;
    width: 60px;
    height: 20px;
    cursor: pointer;
  `,
}

const MyMenuIcon = () => {
  const router = useRouter()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const { removeUser } = useUserAuthentication()

  const handleLogout = () => {
    if (confirm('정말 로그아웃 하시겠습니까?')) {
      removeUser()
      router.replace(RouterPath.Login.path)
    }
  }

  return (
    <div>
      <IconButton
        aria-label='계정'
        size='large'
        css={css`
          color: white;
        `}
        onClick={handleClick}
      >
        <PersonRounded />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleLogout}>{'로그아웃'}</MenuItem>
      </Menu>
    </div>
  )
}
