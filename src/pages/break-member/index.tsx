import Link from 'next/link'
import { css } from '@emotion/react'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import PersonRounded from '@mui/icons-material/PersonRounded'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'

import { member } from '@/data/member'
import { SearchInputContainer } from '@/common/components/SearchInputContianer'
import { TitleContainer } from '@/common/components/TitleContainer'
import { ContentContainer } from '@/common/ContentContainer'

const BreakMember = () => (
  <Stack>
    <TitleContainer
      title={'탈퇴 회원 관리'}
      breadcrumbStrings={['틸퇴 회원 관리']}
    />

    <Typography variant='caption' style={{ marginTop: 20 }}>
      활동 중인 회원 정보는 회원 관리에서 조회가 가능합니다.
    </Typography>

    <ContentContainer>
      <SearchInputContainer
        containerTitle='회원 검색'
        inputStartIcon={<PersonRounded />}
        inputPlaceholder='회원 닉네임을 검색하세요.'
      />
    </ContentContainer>

    <ContentContainer>
      <Typography variant='h2'>회원 목록</Typography>
      <TableContainer style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>회원 번호</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>닉네임</TableCell>
              <TableCell>탈퇴일시</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {member.map(row => (
              <Link href={`/break-member/${row.idx}`} key={row.idx}>
                <TableRow key={row.idx} css={style.tableItem}>
                  <TableCell component='th' scope='row'>
                    <Typography variant='body2'>{row.idx}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2'>{row.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2'>{row.nickname}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2'>{row.breakDate}</Typography>
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

export default BreakMember
