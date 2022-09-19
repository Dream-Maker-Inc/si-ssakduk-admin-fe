import { createTheme } from '@mui/material/styles'
import { Colors, palette } from './Color'
import { BreakPoints } from './Limit'
import { typographyOptions } from './Typography'

// MUI에 적용될 테마를 정의 합니다.
export const theme = createTheme({
  // 컬러 팔레트
  palette: palette,

  // 폰트 스타일
  typography: typographyOptions,

  // 컴포넌트 둥글기
  shape: { borderRadius: 4 },

  // 반응형 처리 포인트
  breakpoints: {
    values: {
      xs: 0,
      sm: BreakPoints.sm + 1,
      md: BreakPoints.md + 1,
      lg: BreakPoints.lg + 1,
      xl: BreakPoints.xl + 1,
    },
  },

  // MUI 컴포넌트 Overriding
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          border: `1px solid ${Colors.Border}`,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          whiteSpace: 'pre-line',
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${Colors.Border}`,
          backgroundColor: Colors.AppbarBg,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {},

          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#e9e9e9',
          },

          '&:hover': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: `${Colors.PrimaryWeak} !important`,
            },
          },
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        sx: {
          '& .MuiOutlinedInput-root': {},

          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#e9e9e9',
          },

          '&:hover': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: `${Colors.PrimaryWeak} !important`,
            },
          },
        },
      },
    },
  },
})
