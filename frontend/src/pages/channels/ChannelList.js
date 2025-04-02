import React from 'react';
import { Box, Typography, Container, Paper, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Add as AddIcon } from '@mui/icons-material';

const ChannelList = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Kanal Listesi</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          component={RouterLink}
          to="/channels/create"
        >
          Yeni Kanal Ekle
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Bu sayfa yapım aşamasındadır. Burada YouTube kanallarınızın listesi gösterilecek.
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Henüz kanal eklenmemiş. Yeni bir kanal eklemek için "Yeni Kanal Ekle" butonunu kullanabilirsiniz.
        </Typography>
      </Paper>
    </Container>
  );
};

export default ChannelList;
