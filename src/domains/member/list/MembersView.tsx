import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { DataTable } from '@/common/components/DataTable'
import { SearchBar } from '@/common/components/SearchBar'
import { TitleContainer } from '@/common/components/TitleContainer'
import { Colors } from '@/common/themes/Color'
import { css } from '@emotion/react'
import { Pagination } from '@mui/material'
import { useMemberView } from './useMemberView'

export const MembersView = () => {
  const {
    membersFetchState,
    dataTableModel,
    handleDataRowClick,
    keywordState,
    paginationState,
    breadcrumbModels,
  } = useMemberView()

  const { isError, error } = membersFetchState

  if (isError) alert(error)

  return (
    <Stack gap={'24px'}>
      <Stack gap={'8px'}>
        <TitleContainer
          title={'회원 관리'}
          breadcrumbModels={breadcrumbModels}
        />

        <div css={st.subTitleRow}>
          <Typography variant='body2' color={Colors.TextSecondary}>
            탈퇴 회원 정보는 탈퇴 회원 관리에서 조회가 가능합니다.
          </Typography>

          <SearchBar
            textFieldProps={{
              value: keywordState.value,
              onChange: e => keywordState.onChange(e.target.value),
            }}
            onEndIconClick={keywordState.onSubmit}
          />
        </div>
      </Stack>

      <div css={st.tableContainer}>
        <DataTable model={dataTableModel} onDataRowClick={handleDataRowClick} />

        <div css={st.tableBottomContainer}>
          <Pagination
            color={'primary'}
            shape='rounded'
            count={paginationState.count}
            page={paginationState.page}
            onChange={(_, page) => paginationState.onChange(page)}
          />
        </div>
      </div>
    </Stack>
  )
}

const st = {
  subTitleRow: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  tableContainer: css`
    display: flex;
    flex-direction: column;
    gap: 24px;
  `,
  tableBottomContainer: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
}
