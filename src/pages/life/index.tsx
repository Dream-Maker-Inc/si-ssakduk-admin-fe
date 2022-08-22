import Link from 'next/link'
import { css } from '@emotion/react'

import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import AddRounded from '@mui/icons-material/AddRounded'
import PersonRounded from '@mui/icons-material/PersonRounded'

import { life } from '@/data/life'
import { TitleContainer } from '@/common/components/TitleContainer'
import { ContentContainer } from '@/common/ContentContainer'
import { SearchInputContainer } from '@/common/components/SearchInputContianer'

const Life = () => (
  <Stack>
    <TitleContainer title={'라이프 관리'} breadcrumbStrings={['라이프 관리']} />

    <ContentContainer>
      <SearchInputContainer
        containerTitle='라이프 검색'
        inputStartIcon={<PersonRounded />}
        inputPlaceholder='게시글 제목을 검색하세요.'
      />
    </ContentContainer>

    <ContentContainer>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography variant='h2'>라이프 목록</Typography>
        <Link href='/life/new'>
          <Button variant='outlined' startIcon={<AddRounded />}>
            글 작성하기
          </Button>
        </Link>
      </Stack>

      <TableContainer style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>글 번호</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>등록 일자</TableCell>
              <TableCell>조회수</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {life.map(row => (
              <Link href={`/life/${row.id}`} key={row.id}>
                <TableRow key={row.id} css={style.tableItem}>
                  <TableCell component='th' scope='row'>
                    <Typography variant='body2'>{row.id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2'>{row.title}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2'>{row.regDate}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2'>
                      {row.viewCount.toLocaleString()}
                    </Typography>
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

export default Life
