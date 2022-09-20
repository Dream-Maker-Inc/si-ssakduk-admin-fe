import { RouterPath, RouterPathType } from '@/common/router'
import { Colors } from '@/common/themes/Color'
import { MediaQueries } from '@/common/themes/Limit'
import { css } from '@emotion/react'
import BookmarkRounded from '@mui/icons-material/BookmarkRounded'
import DashboardRounded from '@mui/icons-material/DashboardRounded'
import PeopleRounded from '@mui/icons-material/PeopleRounded'
import PersonRounded from '@mui/icons-material/PersonRounded'
import { TreeItem, TreeItemProps, TreeView } from '@mui/lab'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

export const Sidebar = () => {
  const { Main, Members, Postings, Comments, ServiceTerms, LifePostings } =
    RouterPath

  const models = [
    {
      nodeId: 'main',
      href: Main.path,
      labelIcon: <DashboardRounded />,
      labelText: '메인화면 관리',
    },
    {
      nodeId: 'member',
      href: Members.path,
      labelIcon: <PersonRounded />,
      labelText: '회원 관리',
    },
    {
      nodeId: 'community',
      labelIcon: <PeopleRounded />,
      labelText: '커뮤니티 관리',
      childs: [
        {
          nodeId: 'posting-list',
          href: Postings.path,
          labelText: '게시글 목록',
        },
        {
          nodeId: 'comment-list',
          href: Comments.path,
          labelText: '댓글 목록',
        },
      ],
    },
    {
      nodeId: 'life-list',
      href: LifePostings.path,
      labelIcon: <BookmarkRounded />,
      labelText: '라이프 관리',
    },
    {
      nodeId: 'service-term-list',
      href: ServiceTerms.path,
      labelIcon: <DashboardRounded />,
      labelText: '약관 관리',
    },
  ]

  return (
    <div css={st.root}>
      <TreeView css={st.treeView}>
        {models.map(model => (
          <FirstTreeItem
            key={model.nodeId}
            nodeId={model.nodeId}
            href={model.href}
            labelicon={model.labelIcon}
            labeltext={model.labelText}
          >
            {model.childs?.map(it => (
              <TreeItem
                key={it.nodeId}
                nodeId={it.nodeId}
                label={
                  <Link href={it.href}>
                    <ListItemButton dense>
                      <ListItemText
                        primary={it.labelText}
                        primaryTypographyProps={{
                          color: Colors.TitleSecondary,
                        }}
                      />
                    </ListItemButton>
                  </Link>
                }
              />
            ))}
          </FirstTreeItem>
        ))}
      </TreeView>
    </div>
  )
}

const st = {
  root: css`
    min-width: 240px;
    border-right: 1px solid ${Colors.Border};
  `,

  treeView: css`
    & .MuiTreeItem-iconContainer {
      display: none;
      width: 0 !important;
      margin: 0 !important;
    }
    & .MuiTreeItem-content {
      padding: 0;
    }
    & .MuiTreeItem-label {
      padding: 0 !important;
    }
  `,
}

type FirstTreeItemProps = {
  href?: string
  labelicon: ReactNode
  labeltext: string
} & TreeItemProps

const FirstTreeItem = (props: FirstTreeItemProps) => {
  const { href, labelicon: labelIcon, labeltext: labelText } = props

  const router = useRouter()
  const handleItemClick = () => href && router.push(href)

  return (
    <TreeItem
      {...props}
      label={
        <ListItemButton onClick={handleItemClick}>
          <ListItemIcon sx={{ minWidth: '40px' }}>{labelIcon}</ListItemIcon>
          <ListItemText
            primary={labelText}
            primaryTypographyProps={{ color: Colors.TitlePrimary }}
          />
        </ListItemButton>
      }
    />
  )
}
