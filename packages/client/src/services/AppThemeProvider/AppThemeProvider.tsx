import { memo, ReactNode } from 'react'
import { ThemeProvider } from '@mui/material'
import { theme } from '@services/AppThemeProvider/theme'


interface Props {
  children: ReactNode;
}

const AppThemeProvider = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

export default memo(AppThemeProvider);
