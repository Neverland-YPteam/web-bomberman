import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { IRoute } from '@organisms/app-routes'

interface Props {
  item: IRoute;
}

const MainMenuItem = ({ item }: Props) => {
  return (
    <Box
      component={Link}
      to={item.path}
      sx={{
        textDecoration: 'none',
        position: 'relative',
        ':hover::before': {
          position: 'absolute',
          content: 'url("/src/assets/images/bomb.png")',
          left: '-60px',
        }
      }}
    >
      <Typography variant="subtitle1">
        {item.title}
      </Typography>
    </Box>
  )
}

export default MainMenuItem
