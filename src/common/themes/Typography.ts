import { TypographyOptions } from '@mui/material/styles/createTypography'

// 테마에 적용될 폰트 스타일을 정의 합니다.
const baseTypographyOptions: TypographyOptions = {
  fontFamily: 'Noto Sans KR',
  h1: {
    fontSize: 30,
    fontWeight: 700,
  },
  h2: {
    fontSize: 24,
    fontWeight: 700,
  },
  body1: {
    fontSize: 16,
    fontWeight: 400,
  },
  body2: {
    fontSize: 16,
    fontWeight: 700,
    color: '#999',
  },
  caption: {
    fontSize: 14,
    fontWeight: 300,
    color: 'gray',
    lineHeight: 1.4,
  },
}

export const typographyOptions: TypographyOptions = {
  ...baseTypographyOptions,
}
