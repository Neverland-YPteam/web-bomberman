import { createTheme, PaletteOptions, ThemeOptions } from '@mui/material';

const paletteOptions: PaletteOptions = {
  primary: {
    main: '#333333',
  },
  secondary: {
    main: '#EBEBEB',
  },
  success: {
    main: '#6BC76B',
  },
  error: {
    main: '#EB5547',
  },
  warning: {
    main: '#F09942',
  },
  info: {
    main: '#4794EB',
  }
}

const defaultThemeOptions: ThemeOptions = {
  palette: paletteOptions,

  // тут можно стилизовать материаловские компоненты сразу для всего приложения
  components: {},

  mixins: {},
}

export const theme = createTheme({ ...defaultThemeOptions });
