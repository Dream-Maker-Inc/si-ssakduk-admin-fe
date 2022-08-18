import { Colors } from '@/common/themes/Color'
import { css } from '@emotion/react'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import {
  BookmarkRounded,
  DashboardRounded,
  ForumRounded,
  PersonRounded,
} from '@mui/icons-material'

export const Sidebar = () => {
  return (
    <div css={st.root}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardRounded />
        </ListItemIcon>
        <ListItemText primary='메인화면 관리' />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <PersonRounded />
        </ListItemIcon>
        <ListItemText primary='회원 관리' />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <ForumRounded />
        </ListItemIcon>
        <ListItemText primary='커뮤니티 관리' />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <BookmarkRounded />
        </ListItemIcon>
        <ListItemText primary='라이프 관리' />
      </ListItemButton>
    </div>
  )
}

const st = {
  root: css`
    min-width: 240px;
    border-right: 1px solid ${Colors.Border};
  `,
}
