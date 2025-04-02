import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Grid, 
  Tabs, 
  Tab,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Divider,
  TextField,
  Badge
} from '@mui/material';
import { 
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Pending as PendingIcon,
  Edit as EditIcon,
  PlayArrow as PlayArrowIcon
} from '@mui/icons-material';

const ContentPool = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4">İçerik Havuzu</Typography>
        <Typography variant="body2" color="textSecondary">
          AI tarafından oluşturulan içerikleri burada inceleyip onaylayabilirsiniz
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab 
            label={
              <Badge badgeContent={0} color="primary">
                İnceleme Bekleyen
              </Badge>
            } 
          />
          <Tab 
            label={
              <Badge badgeContent={0} color="success">
                Onaylanan
              </Badge>
            } 
          />
          <Tab 
            label={
              <Badge badgeContent={0} color="error">
                Reddedilen
              </Badge>
            } 
          />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <Paper sx={{ p: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              İnceleme Bekleyen İçerikler
            </Typography>
            <Divider />
          </Box>
          
          {/* Henüz inceleme bekleyen içerik yok */}
          <Box sx={{ py: 3, textAlign: 'center' }}>
            <PendingIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              İnceleme Bekleyen İçerik Yok
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Şu anda inceleme bekleyen içerik bulunmuyor. İçerik Planlama sayfasından yeni içerik oluşturabilirsiniz.
            </Typography>
            <Button 
              variant="contained" 
              color="primary"
              href="/content/planning"
            >
              İçerik Oluştur
            </Button>
          </Box>
        </Paper>
      )}

      {tabValue === 1 && (
        <Paper sx={{ p: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Onaylanan İçerikler
            </Typography>
            <Divider />
          </Box>
          
          {/* Henüz onaylanan içerik yok */}
          <Box sx={{ py: 3, textAlign: 'center' }}>
            <CheckCircleIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Onaylanan İçerik Yok
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Şu anda onaylanan içerik bulunmuyor. İçerikleri inceleyip onayladıkça burada görüntülenecekler.
            </Typography>
          </Box>
        </Paper>
      )}

      {tabValue === 2 && (
        <Paper sx={{ p: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Reddedilen İçerikler
            </Typography>
            <Divider />
          </Box>
          
          {/* Henüz reddedilen içerik yok */}
          <Box sx={{ py: 3, textAlign: 'center' }}>
            <CancelIcon sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Reddedilen İçerik Yok
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Şu anda reddedilen içerik bulunmuyor. İçerikleri inceleyip reddettiğinizde burada görüntülenecekler.
            </Typography>
          </Box>
        </Paper>
      )}

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          AI İçerik Üretimi
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Typography variant="body1" paragraph>
          İçerik havuzunu doldurmak için AI destekli içerik üretimini kullanabilirsiniz. İçerik oluşturmak için İçerik Planlama sayfasına gidin.
        </Typography>
        
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            variant="outlined" 
            startIcon={<EditIcon />}
          >
            İçerik Şablonları
          </Button>
          
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<PlayArrowIcon />}
            href="/content/planning"
          >
            İçerik Üretimine Başla
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ContentPool;
