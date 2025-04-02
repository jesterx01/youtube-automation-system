import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
  Link,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
} from '@mui/material';
import {
  YouTube as YouTubeIcon,
  VideoLibrary as VideoIcon,
  Analytics as AnalyticsIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { fetchChannels } from '../store/slices/channelSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { channels, loading } = useSelector((state) => state.channels);

  useEffect(() => {
    dispatch(fetchChannels());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Hoş geldiniz, {user?.first_name || user?.username}! İşte YouTube kanallarınızın genel durumu.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Kanal Özeti Bölümü */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Typography variant="h6" component="h2">
                Kanallarınız
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                component={RouterLink}
                to="/channels/create"
                size="small"
              >
                Yeni Kanal Ekle
              </Button>
            </Box>
            <Divider sx={{ my: 2 }} />

            {loading ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '200px',
                }}
              >
                <CircularProgress />
              </Box>
            ) : channels && channels.length > 0 ? (
              <Grid container spacing={2}>
                {channels.slice(0, 4).map((channel) => (
                  <Grid item xs={12} key={channel.id}>
                    <Card variant="outlined">
                      <CardContent sx={{ py: 2 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          {channel.thumbnail_url ? (
                            <Box
                              component="img"
                              sx={{
                                width: 48,
                                height: 48,
                                borderRadius: 1,
                                mr: 2,
                              }}
                              src={channel.thumbnail_url}
                              alt={channel.title}
                            />
                          ) : (
                            <YouTubeIcon
                              sx={{
                                width: 48,
                                height: 48,
                                color: 'error.main',
                                mr: 2,
                              }}
                            />
                          )}
                          <Box>
                            <Typography variant="subtitle1" component="div">
                              {channel.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                            >
                              {channel.subscriber_count || 0} abone &bull;{' '}
                              {channel.video_count || 0} video
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                      <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
                        <Button
                          size="small"
                          component={RouterLink}
                          to={`/channels/${channel.id}`}
                        >
                          Detaylar
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  py: 4,
                }}
              >
                <YouTubeIcon
                  sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }}
                />
                <Typography variant="body1" color="text.secondary" mb={2}>
                  Henüz hiç YouTube kanalınız yok.
                </Typography>
                <Button
                  variant="contained"
                  component={RouterLink}
                  to="/channels/create"
                  startIcon={<AddIcon />}
                >
                  İlk Kanalınızı Ekleyin
                </Button>
              </Box>
            )}

            {channels && channels.length > 4 && (
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Link
                  component={RouterLink}
                  to="/channels"
                  sx={{ textDecoration: 'none' }}
                >
                  <Typography variant="body2">
                    Tüm kanalları görüntüle ({channels.length})
                  </Typography>
                </Link>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Hızlı Erişim Bölümü */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              Hızlı Erişim
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <VideoIcon sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h6" component="div">
                      İçerik Üretimi
                    </Typography>
                    <Typography variant="body2">
                      Yeni içerik planla ve AI ile içerik oluştur
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      component={RouterLink}
                      to="/content/planning"
                      sx={{ color: 'inherit' }}
                    >
                      İçerik Planla
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    bgcolor: 'secondary.light',
                    color: 'secondary.contrastText',
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <VideoIcon sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h6" component="div">
                      İçerik Havuzu
                    </Typography>
                    <Typography variant="body2">
                      Onay bekleyen içerikleri incele
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      component={RouterLink}
                      to="/content/pool"
                      sx={{ color: 'inherit' }}
                    >
                      İçerikleri İncele
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    bgcolor: 'info.light',
                    color: 'info.contrastText',
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <AnalyticsIcon sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h6" component="div">
                      Analitik
                    </Typography>
                    <Typography variant="body2">
                      Kanal ve içerik performansını analiz et
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      component={RouterLink}
                      to="/analytics"
                      sx={{ color: 'inherit' }}
                    >
                      Analizleri Gör
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    bgcolor: 'success.light',
                    color: 'success.contrastText',
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <AnalyticsIcon sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h6" component="div">
                      Rakip Analizi
                    </Typography>
                    <Typography variant="body2">
                      Rakip kanalları analiz et
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      component={RouterLink}
                      to="/analytics/competitors"
                      sx={{ color: 'inherit' }}
                    >
                      Rakipleri Gör
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
