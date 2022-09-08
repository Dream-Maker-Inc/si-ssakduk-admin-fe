import { SearchRounded } from '@mui/icons-material'
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material'

export type SearchBarProps = {
  onEndIconClick: () => void
  textFieldProps?: TextFieldProps
}

export const SearchBar = ({
  onEndIconClick,
  textFieldProps,
}: SearchBarProps) => (
  <TextField
    variant={'outlined'}
    size={'small'}
    placeholder={'검색어를 입력해주세요'}
    InputProps={{
      sx: {
        backgroundColor: '#fff',
        paddingRight: 0,
      },
      endAdornment: (
        <InputAdornment position={'end'}>
          <IconButton onClick={onEndIconClick}>
            <SearchRounded />
          </IconButton>
        </InputAdornment>
      ),
    }}
    {...textFieldProps}
  />
)
