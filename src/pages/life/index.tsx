import { css } from '@emotion/react'
import Link from 'next/link'

import AddRounded from '@mui/icons-material/AddRounded'
import PersonRounded from '@mui/icons-material/PersonRounded'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

import { SearchInputContainer } from '@/common/components/SearchInputContianer'
import { TitleContainer } from '@/common/components/TitleContainer'
import { ContentContainer } from '@/common/ContentContainer'
import { RouterPath } from '@/common/router'
import { life } from '@/data/life'

const Life = () => {
  const { LifePostings } = RouterPath
  const breadcrumbModels = [
    {
      displayName: '라이프 관리',
      path: LifePostings.path,
    },
  ]

  return (
    <Stack>
      <TitleContainer
        title={'라이프 관리'}
        breadcrumbModels={breadcrumbModels}
      />

      <ContentContainer>
        <SearchInputContainer
          containerTitle='라이프 검색'
          inputStartIcon={<PersonRounded />}
          inputPlaceholder='게시글 제목을 검색하세요.'
        />
      </ContentContainer>

      <ContentContainer>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Typography variant='h6'>라이프 목록</Typography>
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
}

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
