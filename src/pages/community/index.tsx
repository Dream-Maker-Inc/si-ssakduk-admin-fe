import Link from 'next/link'
import { css } from '@emotion/react'

import Stack from '@mui/material/Stack'
import PeopleRounded from '@mui/icons-material/PeopleRounded'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import Chip from '@mui/material/Chip'

import { community } from '@/data/community'
import { TitleContainer } from '@/common/components/TitleContainer'
import { ContentContainer } from '@/common/ContentContainer'
import { SearchInputContainer } from '@/common/components/SearchInputContianer'

const Community = () => (
  <Stack>
    <TitleContainer
      title={'커뮤니티 관리'}
      breadcrumbStrings={['커뮤니티 관리']}
    />

    <ContentContainer>
      <Typography variant='h6'>카테고리 선택</Typography>
      <Stack direction='row' spacing={1} marginTop={4}>
        <Chip label='직장 폭력' variant='outlined' />
        <Chip label='데이트 폭력' variant='outlined' />
        <Chip label='학교 폭력' />
        <Chip label='가정 폭력' />
        <Chip label='성폭력' />
        <Chip label='사이버 폭력' />
        <Chip label='우울증' />
        <Chip label='비밀' />
        <Chip label='취미 공유' />
        <Chip label='고민' />
        <Chip label='기타' />
      </Stack>
    </ContentContainer>

    <ContentContainer>
      <SearchInputContainer
        containerTitle='커뮤니티 검색'
        inputStartIcon={<PeopleRounded />}
        inputPlaceholder='게시글 제목을 검색하세요.'
      />

      <Typography variant='body2' style={{ marginTop: 20 }}>
        카테고리를 선택한 후 검색해 주세요.
      </Typography>
    </ContentContainer>

    <ContentContainer>
      <Typography variant='h6'>커뮤니티 목록</Typography>

      <TableContainer style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>게시글 번호</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>좋아요 수</TableCell>
              <TableCell>조회 수</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {community.map(row => (
              <Link href={`/community/${row.id}`} key={row.id}>
                <TableRow css={style.tableItem}>
                  <TableCell component='th' scope='row'>
                    <Typography variant='body2'> {row.id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2'>{row.title}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2'>{row.likedCount}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2'>{row.viewCount}</Typography>
                  </TableCell>
                </TableRow>
              </Link>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ContentContainer>
  </Stack>
)

const style = {
  tableItem: css`
    transition: 0.3s;
    cursor: pointer;

    :hover {
      background-color: #f5f5f5;
      transition: 0.3s;
    }
  `,
}

export default Community
