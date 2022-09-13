import { PaletteOptions } from '@mui/material'

// 컬러 상수를 정의 합니다.
export enum Colors {
  Primary = '#02745d',
  PrimaryWeak = '#02745d99',

  Secondary = '#212121',

  Danger = '#E74C3C',

  Border = '#eee',

  MainContentBg = '#f6f6f6',
  AppbarBg = '#2f2f37',

  TitlePrimary = '#333',
  TitleSecondary = '#666',
  TextPrimary = '#757575',
  TextSecondary = '#999',

  BackgroundDefault = '#fafafa',

  Info = '#000',
}

// 테마에 적용될 컬러 팔레트를 정의 합니다.
export const palette: PaletteOptions = {
  primary: {
    main: Colors.Primary,
  },
  secondary: {
    main: Colors.Secondary,
  },
  text: {
    primary: Colors.TextPrimary,
    secondary: Colors.TextSecondary,
  },
  background: {
    default: Colors.BackgroundDefault,
  },
  error: {
    main: Colors.Danger,
  },
  info: {
    main: Colors.Info,
  },
}
