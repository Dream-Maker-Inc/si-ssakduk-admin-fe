import { Colors } from "@/common/themes/Color";
import { css } from "@emotion/react";
import { ReactNode } from "react";
import { CustomAppbar } from "../Appbar";
import { Sidebar } from "../Sidebar";

export interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div css={st.root}>
      <CustomAppbar>Appbar</CustomAppbar>

      <div css={st.inner}>
        <Sidebar></Sidebar>

        <main css={st.main}>{children}</main>
      </div>
    </div>
  );
};

const st = {
  root: css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
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
};
