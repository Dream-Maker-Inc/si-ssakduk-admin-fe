import { Colors } from '@/common/themes/Color'
import { css } from '@emotion/react'
import Link from 'next/link'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import BookmarkRounded from '@mui/icons-material/BookmarkRounded'
import DashboardRounded from '@mui/icons-material/DashboardRounded'
import PersonRounded from '@mui/icons-material/PersonRounded'
import CancelRounded from '@mui/icons-material/CancelRounded'
import PeopleRounded from '@mui/icons-material/PeopleRounded'
import ForumRounded from '@mui/icons-material/ForumRounded'
import { MediaQueries } from '@/common/themes/Limit'

export const Sidebar = () => {
  return (
    <div css={st.root}>
      <Link href='/main'>
        <ListItemButton>
          <ListItemIcon>
            <DashboardRounded />
          </ListItemIcon>
          <ListItemText primary='메인화면 관리' />
        </ListItemButton>
      </Link>
      <Link href='/member'>
        <ListItemButton>
          <ListItemIcon>
            <PersonRounded />
          </ListItemIcon>
          <ListItemText primary='회원 관리' />
        </ListItemButton>
      </Link>
      <Link href='/break-member'>
        <ListItemButton>
          <ListItemIcon>
            <CancelRounded />
          </ListItemIcon>
          <ListItemText primary='틸퇴 회원 관리' />
        </ListItemButton>
      </Link>
      <Link href='/community'>
        <ListItemButton>
          <ListItemIcon>
            <PeopleRounded />
          </ListItemIcon>
          <ListItemText primary='커뮤니티 관리' />
        </ListItemButton>
      </Link>
      <Link href='/life'>
        <ListItemButton>
          <ListItemIcon>
            <BookmarkRounded />
          </ListItemIcon>
          <ListItemText primary='라이프 관리' />
        </ListItemButton>
      </Link>
      <Link href='/talk'>
        <ListItemButton>
          <ListItemIcon>
            <ForumRounded />
          </ListItemIcon>
          <ListItemText primary='톡 관리' />
        </ListItemButton>
      </Link>
      <Link href='/agreement'>
        <ListItemButton>
          <ListItemIcon>
            <DashboardRounded />
          </ListItemIcon>
          <ListItemText primary='약관 관리' />
        </ListItemButton>
      </Link>
    </div>
  )
}

const st = {
  root: css`
    min-width: 240px;
    border-right: 1px solid ${Colors.Border};

    @media ${MediaQueries.md} {
      display: none;
    }
  `,
}
