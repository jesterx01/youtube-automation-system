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
  Grid,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { register, clearError } from '../../store/slices/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Form verilerindeki değişiklikleri takip et
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Eğer daha önce bir form hatası varsa, alan değiştiğinde temizle
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };

  // Şifre görünürlüğünü aç/kapat
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Şifre onay görünürlüğünü aç/kapat
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Form doğrulama
  const validateForm = () => {
    const errors = {};
    
    // Kullanıcı adı doğrulama
    if (formData.username.length < 3) {
      errors.username = 'Kullanıcı adı en az 3 karakter olmalıdır';
    }
    
    // E-posta doğrulama
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Geçerli bir e-posta adresi giriniz';
    }
    
    // Şifre doğrulama
    if (formData.password.length < 6) {
      errors.password = 'Şifre en az 6 karakter olmalıdır';
    }
    
    // Şifre onay doğrulama
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Şifreler eşleşmiyor';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Form gönderimini işle
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // FormData'dan confirmPassword'ü çıkar
      const { confirmPassword, ...registerData } = formData;
      dispatch(register(registerData));
    }
  };

  // Kayıt başarılı olursa ana sayfaya yönlendir
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
        Hesap Oluştur
      </Typography>

      {error && (
        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="Ad"
            name="firstName"
            autoComplete="given-name"
            value={formData.firstName}
            onChange={handleChange}
            disabled={loading}
            error={!!formErrors.firstName}
            helperText={formErrors.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Soyad"
            name="lastName"
            autoComplete="family-name"
            value={formData.lastName}
            onChange={handleChange}
            disabled={loading}
            error={!!formErrors.lastName}
            helperText={formErrors.lastName}
          />
        </Grid>
      </Grid>

      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Kullanıcı Adı"
        name="username"
        autoComplete="username"
        value={formData.username}
        onChange={handleChange}
        disabled={loading}
        error={!!formErrors.username}
        helperText={formErrors.username}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="E-posta Adresi"
        name="email"
        autoComplete="email"
        value={formData.email}
        onChange={handleChange}
        disabled={loading}
        error={!!formErrors.email}
        helperText={formErrors.email}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Şifre"
        type={showPassword ? 'text' : 'password'}
        id="password"
        autoComplete="new-password"
        value={formData.password}
        onChange={handleChange}
        disabled={loading}
        error={!!formErrors.password}
        helperText={formErrors.password}
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

      <TextField
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Şifre Onay"
        type={showConfirmPassword ? 'text' : 'password'}
        id="confirmPassword"
        autoComplete="new-password"
        value={formData.confirmPassword}
        onChange={handleChange}
        disabled={loading}
        error={!!formErrors.confirmPassword}
        helperText={formErrors.confirmPassword}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle confirm password visibility"
                onClick={handleToggleConfirmPassword}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
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
        {loading ? <CircularProgress size={24} /> : 'Kaydol'}
      </Button>

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Link component={RouterLink} to="/login" variant="body2">
          Zaten hesabınız var mı? Giriş yapın
        </Link>
      </Box>
    </Box>
  );
};

export default Register;
