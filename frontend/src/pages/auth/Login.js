import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { login, clearError } from '../../store/slices/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  // Form verilerindeki değişiklikleri takip et
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Şifre görünürlüğünü aç/kapat
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Form gönderimini işle
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  // Giriş başarılı olursa ana sayfaya yönlendir
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Component unmount olduğunda hata mesajını temizle
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h2" variant="h5" gutterBottom>
        Giriş Yap
      </Typography>

      {error && (
        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Kullanıcı Adı / E-posta"
        name="username"
        autoComplete="username"
        autoFocus
        value={formData.username}
        onChange={handleChange}
        disabled={loading}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Şifre"
        type={showPassword ? 'text' : 'password'}
        id="password"
        autoComplete="current-password"
        value={formData.password}
        onChange={handleChange}
        disabled={loading}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleTogglePassword}
                edge="end"
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Giriş Yap'}
      </Button>

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Link component={RouterLink} to="/register" variant="body2">
          Hesabınız yok mu? Kaydolun
        </Link>
      </Box>
    </Box>
  );
};

export default Login;
