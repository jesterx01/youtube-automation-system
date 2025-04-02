import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Grid,
  FormControlLabel,
  Switch
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const ChannelCreate = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4">Yeni Kanal Ekle</Typography>
        <Typography variant="body2" color="textSecondary">
          YouTube kanalınızı ekleyerek otomasyona başlayın
        </Typography>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <Typography variant="h6" gutterBottom>
            Kanal Bilgileri
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Kanal Adı"
                variant="outlined"
                placeholder="YouTube kanal adınız"
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Kanal ID veya URL"
                variant="outlined"
                placeholder="Örn: UCxxxxxxxx veya https://www.youtube.com/c/KanalAdiniz"
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Açıklama"
                variant="outlined"
                placeholder="Kanalınızın kısa bir açıklaması"
                multiline
                rows={3}
                margin="normal"
              />
            </Grid>
          </Grid>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            API Ayarları
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="YouTube API Anahtarı"
                variant="outlined"
                placeholder="Google Cloud Console'dan aldığınız API anahtarı"
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch color="primary" />}
                label="YouTube API'yi etkinleştir"
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch color="primary" />}
                label="Google Sheets entegrasyonunu etkinleştir"
              />
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              component={RouterLink}
              to="/channels"
              color="inherit"
            >
              İptal
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Kanal Ekle
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ChannelCreate;
