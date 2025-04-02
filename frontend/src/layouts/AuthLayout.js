import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Container, Typography, Paper } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';

const AuthLayout = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Kullanıcı zaten giriş yapmışsa dashboard'a yönlendir
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'grey.100',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            py: 4,
            px: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 4,
            }}
          >
            <YouTubeIcon
              color="error"
              sx={{ fontSize: 48, mr: 2 }}
            />
            <Typography
              component="h1"
              variant="h4"
              color="primary"
              fontWeight="bold"
            >
              YouTube Otomasyon
            </Typography>
          </Box>
          
          {/* Auth sayfaları (Login, Register) */}
          <Outlet />
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthLayout;
