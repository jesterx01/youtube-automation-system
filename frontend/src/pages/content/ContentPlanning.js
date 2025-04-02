import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Button, 
  Grid, 
  Card, 
  CardContent,
  CardActions,
  Chip,
  Divider,
  TextField,
  MenuItem
} from '@mui/material';
import { 
  Add as AddIcon,
  VideoLibrary as VideoIcon,
  CalendarMonth as CalendarIcon
} from '@mui/icons-material';

const ContentPlanning = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">İçerik Planlama</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
        >
          Yeni İçerik Ekle
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CalendarIcon sx={{ mr: 1 }} />
              <Typography variant="h6">İçerik Takvimi</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Henüz planlanmış bir içerik bulunmamaktadır. Yeni içerik ekleyerek takvim oluşturmaya başlayabilirsiniz.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <VideoIcon sx={{ mr: 1 }} />
              <Typography variant="h6">İçerik Oluşturma</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            
            <Typography variant="body1" gutterBottom>
              Yeni bir içerik oluşturmak için aşağıdaki formu doldurun:
            </Typography>

            <Box component="form" sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="İçerik Başlığı"
                    placeholder="İçerik için çekici bir başlık yazın"
                    variant="outlined"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="İçerik Türü"
                    select
                    variant="outlined"
                    defaultValue="video"
                  >
                    <MenuItem value="video">Video</MenuItem>
                    <MenuItem value="shorts">Shorts</MenuItem>
                    <MenuItem value="livestream">Canlı Yayın</MenuItem>
                    <MenuItem value="series">Seri İçerik</MenuItem>
                  </TextField>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Kanal Seçin"
                    select
                    variant="outlined"
                    defaultValue=""
                  >
                    <MenuItem value="" disabled>Kanal Seçin</MenuItem>
                    <MenuItem value="channel1">Test Channel</MenuItem>
                  </TextField>
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Anahtar Kelimeler"
                    placeholder="Virgülle ayrılmış anahtar kelimeler (SEO için önemli)"
                    variant="outlined"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="İçerik Açıklaması"
                    placeholder="İçeriğin kısa bir açıklaması"
                    variant="outlined"
                    multiline
                    rows={3}
                  />
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                  variant="contained" 
                  color="primary"
                  startIcon={<AddIcon />}
                >
                  İçerik Oluştur
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              İçerik Önerileri
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Typography variant="body2" color="textSecondary">
              AI destekli içerik önerileri burada görüntülenecek. İçerik oluştukça, kişiselleştirilmiş öneriler sunulacak.
            </Typography>
            
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Trend Konuları
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Henüz trend bilgisi yok.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Populer İçerikler
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Henüz popüler içerik verisi yok.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Rakip Analizi
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Henüz rakip analizi yok.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContentPlanning;
