import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Grid, 
  Button, 
  Tabs, 
  Tab,
  Divider,
  Card,
  CardContent
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { 
  YouTube as YouTubeIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const ChannelDetail = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <YouTubeIcon sx={{ fontSize: 56, color: 'error.main', mr: 2 }} />
          <Box>
            <Typography variant="h4">Test Channel</Typography>
            <Typography variant="body2" color="textSecondary">
              ID: UC1234567890 • 0 abone
            </Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Button 
              startIcon={<EditIcon />} 
              variant="outlined" 
              sx={{ mr: 1 }}
            >
              Düzenle
            </Button>
            <Button 
              startIcon={<DeleteIcon />} 
              variant="outlined" 
              color="error"
            >
              Sil
            </Button>
          </Box>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Kanal İstatistikleri
                </Typography>
                <Typography variant="body2">
                  Abone: 0
                </Typography>
                <Typography variant="body2">
                  Toplam Video: 0
                </Typography>
                <Typography variant="body2">
                  Toplam Görüntüleme: 0
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  İçerik Durumu
                </Typography>
                <Typography variant="body2">
                  Planlanan İçerik: 0
                </Typography>
                <Typography variant="body2">
                  Onay Bekleyen: 0
                </Typography>
                <Typography variant="body2">
                  Yayınlanan: 0
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Entegrasyonlar
                </Typography>
                <Typography variant="body2">
                  YouTube API: Devre Dışı
                </Typography>
                <Typography variant="body2">
                  Google Sheets: Devre Dışı
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
      
      <Box sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="İçerik" />
          <Tab label="Analitik" />
          <Tab label="Ayarlar" />
        </Tabs>
      </Box>
      
      <Paper sx={{ p: 3 }}>
        {tabValue === 0 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              İçerik Yönetimi
            </Typography>
            <Typography variant="body1" gutterBottom>
              Bu sayfada kanal içeriklerini yönetebilirsiniz.
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button 
                variant="contained" 
                component={RouterLink} 
                to="/content/planning"
              >
                İçerik Planla
              </Button>
              <Button 
                variant="outlined" 
                component={RouterLink} 
                to="/content/pool"
              >
                İçerik Havuzu
              </Button>
            </Box>
          </Box>
        )}
        
        {tabValue === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Kanal Analitikleri
            </Typography>
            <Typography variant="body1">
              Bu sayfa yapım aşamasındadır. Burada kanal analitiği gösterilecek.
            </Typography>
          </Box>
        )}
        
        {tabValue === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Kanal Ayarları
            </Typography>
            <Typography variant="body1">
              Bu sayfa yapım aşamasındadır. Burada kanal ayarları gösterilecek.
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default ChannelDetail;
