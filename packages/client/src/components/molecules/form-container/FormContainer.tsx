import React from 'react'
import { Box, Paper, Typography } from '@mui/material'

interface Props {
  onFormSubmit: (evt: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  title?: string
}

const FormContainer = ({ onFormSubmit, children, title }: Props) => {
  return (
    <Box
      sx={{
        marginTop: 4,
        paddingBottom: 4,
        borderRadius: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          maxWidth: '330px',
          margin: 'auto',
          textAlign: 'center',
          padding: '24px 28px',
        }}
      >
        {title && (
          <Typography
            component="h2"
            variant="h5"
            sx={{ marginBottom: 2 }}
          >
            {title}
          </Typography>
        )}
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          onSubmit={onFormSubmit}
        >
          {children}
        </Box>
      </Paper>
    </Box>
  )
}

export default FormContainer
