import React from 'react'
import { withNavbar } from '@services/withNavbar'
import { Box, Container, Stack } from '@mui/material'
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
  <Paper
    elevation={4}
    sx={{
      paddingX: 4,
      paddingTop: 2,
      paddingBottom: 3,
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
  </Paper>
)

const Landing = () => {
  return (
    <Stack spacing={4} marginTop={8}>
      <Box paddingX={5} sx={{ textAlign: 'center' }}>
        <img src={logo} alt='Логотип игры' />
      </Box>

      <Stack alignSelf="center" spacing={4} padding={5}>
        {LandingSection('Об игре', () => (
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
                  <TableRow key={alt[0]}>
                    <TableCell>{description}</TableCell>
                    <TableCell sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      {image.map((image, index) => (
                        <img
                          src={image}
                          alt={alt[index]}
                          style={{height: alt[0] === 'Стрелки' ? 64 : 40 }}
                        />
                      ))}
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
      </Stack>
    </Stack>
  )
}

export default withNavbar(Landing, 'landing')
