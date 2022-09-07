import { TypographyOptions } from '@mui/material/styles/createTypography'
import { Colors } from './Color'

// 테마에 적용될 폰트 스타일을 정의 합니다.
const baseTypographyOptions: TypographyOptions = {
  fontFamily: 'Noto Sans KR',
  allVariants: {
    color: Colors.TextPrimary,
  },
  h4: {
    fontWeight: 700,
  },
  h5: {
    fontWeight: 700,
  },
  body1: {
    fontSize: 16,
    fontWeight: 400,
  },
  body2: {
    fontSize: 16,
    fontWeight: 400,
    color: '#33333399',
  },
  caption: {
    fontSize: 14,
    fontWeight: 300,
    lineHeight: 1.4,
  },
}

export const typographyOptions: TypographyOptions = {
  ...baseTypographyOptions,
}
