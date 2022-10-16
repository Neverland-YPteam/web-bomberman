import React from 'react'
import { withNavbar } from '@services/withNavbar'
import { Box, Container } from '@mui/material'
import logo from '@images/main_logo.png'
import { controls } from './controls'
import { enemies } from './enemies'
import { bonuses } from './bonuses'
import { score } from './score'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const LandingSection = (title: string, InnerComponent: React.ComponentType) => (
  <Box
    component={Paper}
    sx={{
      marginTop: 4,
      paddingX: 4,
      paddingY: 2,
      overflow: 'hidden',
      borderRadius: 4,
    }}
  >
    <Box
      component="h2"
      fontFamily="'Press Start 2P'"
      sx={{ color: ({palette}) => palette.info.main }}
    >
      {title}
    </Box>

    <InnerComponent />
  </Box>
)

const Landing = () => {
  return (
    <Container
      sx={{
        flex: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box marginTop={8} sx={{ textAlign: 'center' }}>
        <img src={logo} alt='Логотип игры' />
      </Box>

      <Box flex="100%" alignSelf="center" display="flex" flexDirection="column" padding="48px">
        {LandingSection('Об игре',
        () => (
          <div>
            <p>
              Клон <a href="https://ru.wikipedia.org/wiki/Bomberman_(игра, 1983)" target="_blank">оригинальной игры</a>,
              созданный с использованием HTML5 Canvas.
            </p>
            <p>Основная цель — уничтожить всех врагов и найти выход.</p>
            <p>Всего в игре 20 уровней, генерируемых случайным образом.</p>
            <p>
              На каждом из них вас поджидают 6 противников — иногда они одинаковые, иногда разные.<br />
              Скорость и способности врагов различаются, с каждым новым уровнем бороться с ними всё сложнее.<br />
              От соприкосновения с противником главный герой погибает.
            </p>
            <p>Ставьте бомбы, чтобы разрушать стены и взрывать врагов. Но не взорвите себя!</p>
            <p>
              На каждом уровне также можно найти бонус, улучшающий одну из характеристик персонажа.<br />
              Будьте внимательны: если взорвать бонус, он пропадет!
            </p>
            <p>За выполнение различных действий вы зарабатываете очки.</p>
            <p>Завершить уровень можно, выйдя через дверь, которая находится под одной из стен.</p>
          </div>
        ))}

        {LandingSection('Управление', () => (
          <TableContainer>
            <Table>
              <TableBody>
                {controls.map(({ alt, image, description }) => (
                  <TableRow key={alt}>
                    <TableCell>{description}</TableCell>
                    <TableCell align="center">
                      <img src={image} alt={alt} style={{ height: alt === 'Стрелки' ? 64 : 40 }} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ))}

        {LandingSection('Враги', () => (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell sx={{ fontWeight: 600 }}>Имя</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Скорость</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Описание</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>Очки</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {enemies.map(({ name, image, alt, speed, description, score }) => (
                  <TableRow key={name}>
                    <TableCell component="th" align="center" width={80}>
                      <img src={image} alt={alt} />
                    </TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{speed}</TableCell>
                    <TableCell>{description}</TableCell>
                    <TableCell align="center">{score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ))}

        {LandingSection('Бонусы', () => (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell sx={{ fontWeight: 600 }}>Имя</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Описание</TableCell>
                  <TableCell align="center" sx={{ whiteSpace: 'nowrap', fontWeight: 600 }}>
                    Теряется при гибели
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bonuses.map(({ name, image, alt, description, canBeLost }) => (
                  <TableRow key={name}>
                    <TableCell component="th" align="center" width={80}>
                      <img src={image} alt={alt} />
                    </TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{description}</TableCell>
                    <TableCell align="center">{canBeLost ? 'Да' : 'Нет'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ))}

        {LandingSection('Начисление очков', () => (
          <TableContainer>
            <Table>
              <TableBody>
                {score.map(({ title, description }) => (
                  <TableRow key={title}>
                    <TableCell sx={{ fontWeight: 600 }}>{title}</TableCell>
                    <TableCell>{description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ))}
      </Box>
    </Container>
  )
}

export default withNavbar(Landing, 'landing')