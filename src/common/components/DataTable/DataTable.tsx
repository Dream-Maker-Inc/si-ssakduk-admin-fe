import { Colors } from '@/common/themes/Color'
import { css } from '@emotion/react'
import { Button, Card, colors } from '@mui/material'
import { ReactNode } from 'react'
import { TableDataColumn } from './TableDataColumn'
import { TableHeaderColumn, TableHeaderColumnProps } from './TableHeaderColumn'

type DataTableProps = {
  model: {
    headers: TableHeaderColumnProps[]
    data: ReactNode[][]
  }
  onDataRowClick: (id: number) => void
}

const DataTable = ({ model, onDataRowClick }: DataTableProps) => {
  const { headers, data } = model

  const renderTableDataColumn = (index: number, dataComp: ReactNode) => {
    const { minWidth, width } = headers[index]

    return (
      <TableDataColumn
        key={`td-${index}`}
        minWidth={minWidth}
        width={width}
        typographyProps={{ children: dataComp }}
      />
    )
  }

  return (
    <Card sx={{ px: '16px' }}>
      <div css={st.headerRow}>
        {headers.map((it, index) => (
          <TableHeaderColumn key={`th-${index}`} {...it} />
        ))}
      </div>

      {data.map((it, tdrIndex) => (
        <Button
          key={`tdr-${tdrIndex}`}
          css={st.dataRow}
          onClick={() => onDataRowClick(it[0] as number)}
        >
          {it.map((dataComp, index) => renderTableDataColumn(index, dataComp))}
        </Button>
      ))}
    </Card>
  )
}

const st = {
  headerRow: css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 56px;
    gap: 16px;
  `,
  dataRow: css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding: 0;
    color: ${Colors.TextPrimary};
    border-top: 1px solid #ddd;
    gap: 16px;
  `,
}

export { DataTable }
export type { DataTableProps }
