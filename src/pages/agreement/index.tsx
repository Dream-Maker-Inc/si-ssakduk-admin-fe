import Stack from '@mui/material/Stack'
import { TitleContainer } from '@/common/components/TitleContainer'
import { ContentContainer } from '@/common/ContentContainer'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Link from 'next/link'
import { css } from '@emotion/react'
import { agreement } from '@/data/agreement'

const Agreement = () => (
  <Stack>
    <TitleContainer title='약관 관리' breadcrumbStrings={['약관 관리']} />

    <ContentContainer>
      <Typography variant='h2'>약관 목록</Typography>

      <TableContainer style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>약관 번호</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>필수 동의 여부</TableCell>
              <TableCell>등록 일시</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agreement.map(row => (
              <Link href={`/agreement/${row.id}`} key={row.id}>
                <TableRow key={row.id} css={style.tableItem}>
                  <TableCell component='th' scope='row'>
                    <Typography variant='body2'>{row.id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2'>{row.title}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2'>
                      {row.isRequired ? '필수' : '선택'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2'>{row.regDate}</Typography>
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

export default Agreement
