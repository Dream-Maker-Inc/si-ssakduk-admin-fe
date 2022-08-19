import { TypographyOptions } from '@mui/material/styles/createTypography'

// 테마에 적용될 폰트 스타일을 정의 합니다.
const baseTypographyOptions: TypographyOptions = {
  fontFamily: 'Noto Sans KR',
  h1: {
    fontSize: 30,
    fontWeight: 500,
  },
  h2: {
    fontSize: 24,
    fontWeight: 500,
  },
  body1: {
    fontSize: 16,
    fontWeight: 500,
  },
  body2: {
    fontSize: 16,
    fontWeight: 400,
    color: '#666',
  },
  caption: {
    fontWeight: 100,
    lineHeight: 1.4,
  },
}

export const typographyOptions: TypographyOptions = {
  ...baseTypographyOptions,
}
