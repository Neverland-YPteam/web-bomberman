import React from 'react'
import { Button } from '@mui/material'

interface Props {
  children: string;
}

const SubmitButton = ({ children }: Props) => {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{
        mt: 3,
        mb: 2,
        bgcolor: ({palette}) => palette.info.dark,
        '&:hover': {
          bgcolor: ({palette}) => palette.info.main
        }
      }}
    >
      {children}
    </Button>
  )
}

export default SubmitButton
