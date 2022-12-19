import { Dispatch, memo, ReactElement, SetStateAction, createContext, useEffect, useLayoutEffect, useState } from 'react'
import { useSelector } from '@utils/hooks'
import { createTheme, ThemeProvider } from '@mui/material'
import { userController } from '@services/controllers'

interface Props {
  children: ReactElement;
}

interface IColorModeContext {
  darkTheme?: boolean
  setDarkTheme?: Dispatch<SetStateAction<boolean>>
}

const DARK_THEME_STORAGE_KEY = 'darkTheme'

export const ColorModeContext = createContext<IColorModeContext>({})

let canChangeTheme = false

const AppThemeProvider = ({ children }: Props) => {
  const [darkTheme, setDarkTheme] = useState(false)
  const { user: { id: userId } } = useSelector(state => state)

  useLayoutEffect(() => {
    const preferDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDarkModeChosen = !!localStorage.getItem(DARK_THEME_STORAGE_KEY)
    const hasDarkTheme = preferDarkMode || isDarkModeChosen

    setDarkTheme(hasDarkTheme)
    setTimeout(() => canChangeTheme = true, 500)
  }, [])

  useEffect(() => {
    if (!canChangeTheme) {
      return
    }

    if (darkTheme) {
      localStorage.setItem(DARK_THEME_STORAGE_KEY, 'true')
    } else {
      localStorage.removeItem(DARK_THEME_STORAGE_KEY)
    }

    // Здесь обновляем у пользователя тему, когда он выбрал ее сам, будучи авторизованным
    if (userId) {
      userController.update({
        id: userId,
        theme: darkTheme ? 'dark' : 'light'
      })
    }
  }, [darkTheme])

  useEffect(() => {
    // Если userId меняется (пользователь авторизовался или сменился), определяем тему
    if (userId) {
      (async () => {
        const userDb = await userController.find({ id: userId })

        if (!userDb) {
          // Если пользователя в базе нет, создаем его и проставляем текущую тему
          userController.create({ id: userId, theme: darkTheme ? 'dark' : 'light' })
        } else if (!userDb.theme) {
          // Если у пользователя нет темы, проставляем ему текущую
          userController.update({ id: userId, theme: darkTheme ? 'dark' : 'light' })
        } else {
          // У пользователя есть тема. Переключаемся на нее, если нужно
          setDarkTheme(userDb.theme === 'dark')
        }
      })()
    }
  }, [userId])

  const theme = createTheme({
    palette: {
      mode: darkTheme ? 'dark' : 'light',

      primary: {
        main: '#333344',
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
        dark: '#1976E1',
      },
    },

    typography: {
      subtitle1: {
        fontSize: '32px',
        lineHeight: '40px',
        color: 'white',
        textTransform: 'uppercase',
        fontFamily: '"Press Start 2P"',
        '&:hover': {
          textDecoration: 'underline'
        }
      },
    },
  })

  return (
    <ColorModeContext.Provider value={{ darkTheme, setDarkTheme }}>
      <ThemeProvider theme={theme}>
        { children }
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default memo(AppThemeProvider);
