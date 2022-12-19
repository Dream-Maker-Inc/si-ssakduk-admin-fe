import { Colors } from '@/common/themes/Color'
import { css } from '@emotion/react'
import { ReactNode } from 'react'
import { CustomAppbar } from '../Appbar'
import { Sidebar } from '../Sidebar'

export interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div css={st.root}>
      <CustomAppbar />

      <div css={st.inner}>
        <Sidebar />

        <div css={st.main}>{children}</div>
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
    overflow: hidden;
  `,
  inner: css`
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
  `,
  main: css`
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;
    background-color: ${Colors.MainContentBg};
    padding: 40px;
    overflow: auto;
  `,
}
