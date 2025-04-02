import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

// Asenkron thunk action'ları
export const fetchChannelAnalytics = createAsyncThunk(
  'analytics/fetchChannelAnalytics',
  async (channelId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(
        `${API_URL}/api/analytics/channels/${channelId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Kanal analizleri alınamadı'
      );
    }
  }
);

export const fetchContentAnalytics = createAsyncThunk(
  'analytics/fetchContentAnalytics',
  async (contentId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(
        `${API_URL}/api/analytics/content/${contentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'İçerik analizleri alınamadı'
      );
    }
  }
);

export const fetchCompetitorAnalytics = createAsyncThunk(
  'analytics/fetchCompetitorAnalytics',
  async (channelId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(
        `${API_URL}/api/analytics/channels/${channelId}/competitors`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Rakip analizleri alınamadı'
      );
    }
  }
);

export const fetchABTestResults = createAsyncThunk(
  'analytics/fetchABTestResults',
  async (channelId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(
        `${API_URL}/api/analytics/channels/${channelId}/abtests`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'A/B test sonuçları alınamadı'
      );
    }
  }
);

// Analytics slice
const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: {
    channelAnalytics: null,
    contentAnalytics: null,
    competitorAnalytics: null,
    abTestResults: [],
    loading: false,
    error: null,
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Son 30 gün
      end: new Date().toISOString().split('T')[0],
    },
  },
  reducers: {
    clearAnalyticsError: (state) => {
      state.error = null;
    },
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Channel Analytics
      .addCase(fetchChannelAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChannelAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.channelAnalytics = action.payload.analytics;
      })
      .addCase(fetchChannelAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Content Analytics
      .addCase(fetchContentAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContentAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.contentAnalytics = action.payload.analytics;
      })
      .addCase(fetchContentAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Competitor Analytics
      .addCase(fetchCompetitorAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompetitorAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.competitorAnalytics = action.payload.analytics;
      })
      .addCase(fetchCompetitorAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch AB Test Results
      .addCase(fetchABTestResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchABTestResults.fulfilled, (state, action) => {
        state.loading = false;
        state.abTestResults = action.payload.abTests;
      })
      .addCase(fetchABTestResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAnalyticsError, setDateRange } = analyticsSlice.actions;

export default analyticsSlice.reducer;
