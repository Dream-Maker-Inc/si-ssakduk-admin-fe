import { TypographyOptions } from '@mui/material/styles/createTypography'

// 테마에 적용될 폰트 스타일을 정의 합니다.
const baseTypographyOptions: TypographyOptions = {
  fontFamily: 'Noto Sans KR',
  body1: {
    fontWeight: 200,
  },
  body2: {
    fontWeight: 200,
  },
  caption: {
    fontWeight: 100,
    lineHeight: 1.4,
  },
}

export const typographyOptions: TypographyOptions = {
  ...baseTypographyOptions,
}
