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
import { MediaQueries } from '@/common/themes/Limit'
import { RouterPath } from '@/common/router'

export const Sidebar = () => {
  const { Main, Members, LeavedMembers, Postings, ServiceTerms } = RouterPath

  return (
    <div css={st.root}>
      <Link href={Main.path}>
        <ListItemButton>
          <ListItemIcon>
            <DashboardRounded />
          </ListItemIcon>
          <ListItemText primary='메인화면 관리' />
        </ListItemButton>
      </Link>
      <Link href={Members.path}>
        <ListItemButton>
          <ListItemIcon>
            <PersonRounded />
          </ListItemIcon>
          <ListItemText primary='회원 관리' />
        </ListItemButton>
      </Link>
      <Link href={LeavedMembers.path}>
        <ListItemButton>
          <ListItemIcon>
            <CancelRounded />
          </ListItemIcon>
          <ListItemText primary='탈퇴 회원 관리' />
        </ListItemButton>
      </Link>
      <Link href={Postings.path}>
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
      <Link href={ServiceTerms.path}>
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
