import { PaletteOptions } from '@mui/material'

// 컬러 상수를 정의 합니다.
export enum Colors {
  Primary = '#34c759',
  PrimaryWeak = '#34c75999',

  Danger = '#E74C3C',

  Border = '#eee',

  MainContentBg = '#eee',
  AppbarBg = '#2f2f37',

  TextPrimary = '#333',
  TextSecondary = '#666',
}

// 테마에 적용될 컬러 팔레트를 정의 합니다.
export const palette: PaletteOptions = {
  primary: {
    main: Colors.Primary,
  },
  text: {
    primary: Colors.TextPrimary,
    secondary: Colors.TextSecondary,
  },
  error: {
    main: Colors.Danger,
  },
}
