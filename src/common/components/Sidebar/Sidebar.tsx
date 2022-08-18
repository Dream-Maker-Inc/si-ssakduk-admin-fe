import { Colors } from "@/common/themes/Color";
import { css } from "@emotion/react";

export const Sidebar = () => {
  return <div css={st.root}></div>;
};

const st = {
  root: css`
    display: flex;
    flex-direction: column;
    min-width: 240px;
    border-right: 1px solid ${Colors.Border};
  `,
};
