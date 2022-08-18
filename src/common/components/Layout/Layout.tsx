import { Colors } from '@/common/themes/Color'
import { css } from '@emotion/react'
import { ReactNode } from 'react'
import { CustomAppbar } from '../Appbar'
import { Sidebar } from '../Sidebar'
import logo from '../../../../public/logo.svg'
import Image from 'next/image'
import { IconButton } from '@mui/material'
import { PersonRounded } from '@mui/icons-material'

export interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div css={st.root}>
      <CustomAppbar>
        <div>
          <Image src={logo} alt={'싹둑'} height={20} width={60} />
          싹둑 관리자페이지
        </div>
        <IconButton aria-label='계정' size='large' css={st.mypageIcon}>
          <PersonRounded />
        </IconButton>
      </CustomAppbar>

      <div css={st.inner}>
        <Sidebar />

        <main css={st.main}>{children}</main>
      </div>
    </div>
  )
}

const st = {
  root: css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  `,
  mypageIcon: css`
    color: white;
  `,
  inner: css`
    display: flex;
    width: 100%;
    height: 100%;
  `,
  main: css`
    width: 100%;
    height: 100%;
    background-color: ${Colors.MainContentBg};
  `,
}
