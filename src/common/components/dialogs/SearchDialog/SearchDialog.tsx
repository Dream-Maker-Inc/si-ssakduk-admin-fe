import { css } from '@emotion/react'
import { CloseRounded } from '@mui/icons-material'
import {
  Checkbox,
  Dialog,
  FormControlLabel,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Tooltip,
  Typography,
} from '@mui/material'
import { SearchBar } from '../../SearchBar'

export type SearchDialogProps = {
  open: boolean
  onClose: () => void
  filterModel: {
    selectors?: {
      title: string
      value: string
      onChange: (v: string) => void
      items: string[]
    }[]
    radioGroup?: {
      value: string
      onChange: (v: string) => void
      items: {
        label: string
        value: string
      }[]
    }
    checkBoxes?: {
      checked: boolean
      onChange: (checked: boolean) => void
      label: string
      tooltip?: string
    }[]
  }
  keywordState: {
    value: string
    onChange: (v: string) => void
    onSubmit: () => void
  }
}

export const SearchDialog = (p: SearchDialogProps) => {
  const { open, onClose, filterModel, keywordState } = p
  const { selectors, radioGroup, checkBoxes } = filterModel

  //

  return (
    <Dialog open={open}>
      <div css={st.container}>
        <div css={st.header}>
          <Typography variant={'subtitle1'} fontWeight={500}>
            상세 검색
          </Typography>

          <IconButton onClick={onClose}>
            <CloseRounded />
          </IconButton>
        </div>

        <div css={st.inner}>
          {selectors &&
            selectors.map(it => (
              <div key={it.title} css={st.filterContainer}>
                <Typography variant={'subtitle2'}>{it.title}</Typography>

                <Select
                  size={'small'}
                  value={it.value}
                  onChange={e => it.onChange(e.target.value)}
                >
                  {it.items.map(it => (
                    <MenuItem key={it} value={it}>
                      {it}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            ))}

          <div>
            <Typography variant={'subtitle2'}>{'옵션'}</Typography>

            {radioGroup && (
              <RadioGroup
                row
                value={radioGroup.value}
                onChange={(_, v) => radioGroup.onChange(v)}
              >
                {radioGroup.items.map(it => (
                  <FormControlLabel
                    key={it.label}
                    value={it.value}
                    control={<Radio size={'small'} />}
                    label={
                      <Typography variant={'caption'}>{it.label}</Typography>
                    }
                  />
                ))}
              </RadioGroup>
            )}

            {checkBoxes &&
              checkBoxes.map(it => (
                <Tooltip key={it.label} title={it.tooltip ?? ''}>
                  <FormControlLabel
                    checked={it.checked}
                    onChange={(_, checked) => it.onChange(checked)}
                    control={<Checkbox size='small' />}
                    label={
                      <Typography variant={'caption'}>{it.label}</Typography>
                    }
                  />
                </Tooltip>
              ))}
          </div>
        </div>

        <div css={st.bottom}>
          <SearchBar
            textFieldProps={{
              fullWidth: true,
              value: keywordState.value,
              onChange: e => keywordState.onChange(e.target.value),
            }}
            onEndIconClick={keywordState.onSubmit}
          />
        </div>
      </div>
    </Dialog>
  )
}

const st = {
  container: css`
    min-width: 480px;
  `,
  header: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;

    border-bottom: 1px dashed #eee;
  `,
  inner: css`
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 16px;
  `,
  bottom: css`
    border-top: 1px dashed #eee;
    padding: 16px;
  `,
  filterContainer: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
}
