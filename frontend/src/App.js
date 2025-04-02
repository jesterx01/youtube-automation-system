import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ChannelList from './pages/channels/ChannelList';
import ChannelCreate from './pages/channels/ChannelCreate';
import ChannelDetail from './pages/channels/ChannelDetail';
import ContentPlanning from './pages/content/ContentPlanning';
import ContentPool from './pages/content/ContentPool';
import Analytics from './pages/analytics/Analytics';
import CompetitorAnalysis from './pages/analytics/CompetitorAnalysis';
import ABTesting from './pages/abtesting/ABTesting';
import Settings from './pages/settings/Settings';
import NotFound from './pages/NotFound';

// Auth guard component
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  // Tema oluşturma
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {/* Auth routes */}
        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Main application routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="channels">
            <Route index element={<ChannelList />} />
            <Route path="create" element={<ChannelCreate />} />
            <Route path=":id" element={<ChannelDetail />} />
          </Route>
          <Route path="content">
            <Route path="planning" element={<ContentPlanning />} />
            <Route path="pool" element={<ContentPool />} />
          </Route>
          <Route path="analytics">
            <Route index element={<Analytics />} />
            <Route path="competitors" element={<CompetitorAnalysis />} />
          </Route>
          <Route path="abtesting" element={<ABTesting />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
