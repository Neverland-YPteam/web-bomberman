import React from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import { useTheme } from '@mui/material/styles';

interface Props {
  to: string;
  text: string;
}

const FormLink = ({to, text}: Props) => {
  const theme = useTheme();

  const StyledLink = styled(Link)`
    color: ${theme.palette.info.dark};
    &:hover {
      color: ${theme.palette.info.main};
    }
  `
  return (
    <StyledLink
      to={to}
    >
      {text}
    </StyledLink>
  )
}

export default FormLink