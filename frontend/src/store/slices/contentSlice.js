import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

// Asenkron thunk action'ları
export const fetchContentPlanning = createAsyncThunk(
  'content/fetchContentPlanning',
  async (channelId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(
        `${API_URL}/api/channels/${channelId}/content/planning`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'İçerik planları alınamadı'
      );
    }
  }
);

export const createContentPlan = createAsyncThunk(
  'content/createContentPlan',
  async ({ channelId, contentData }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.post(
        `${API_URL}/api/channels/${channelId}/content/planning`,
        contentData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'İçerik planı oluşturulamadı'
      );
    }
  }
);

export const fetchContentPool = createAsyncThunk(
  'content/fetchContentPool',
  async (channelId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(
        `${API_URL}/api/channels/${channelId}/content/pool`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'İçerik havuzu alınamadı'
      );
    }
  }
);

export const reviewContent = createAsyncThunk(
  'content/reviewContent',
  async ({ contentId, reviewData }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.post(
        `${API_URL}/api/content/${contentId}/review`,
        reviewData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'İçerik değerlendirilemedi'
      );
    }
  }
);

export const generateAIContent = createAsyncThunk(
  'content/generateAIContent',
  async ({ contentId, promptData }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.post(
        `${API_URL}/api/content/${contentId}/generate`,
        promptData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'AI içeriği oluşturulamadı'
      );
    }
  }
);

// Content slice
const contentSlice = createSlice({
  name: 'content',
  initialState: {
    contentPlanning: [],
    contentPool: {
      pendingReview: [],
      approved: [],
      rejected: [],
    },
    currentContent: null,
    loading: false,
    generatingContent: false,
    error: null,
  },
  reducers: {
    clearContentError: (state) => {
      state.error = null;
    },
    setCurrentContent: (state, action) => {
      state.currentContent = action.payload;
    },
    clearCurrentContent: (state) => {
      state.currentContent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Content Planning
      .addCase(fetchContentPlanning.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContentPlanning.fulfilled, (state, action) => {
        state.loading = false;
        state.contentPlanning = action.payload.contentPlanning;
      })
      .addCase(fetchContentPlanning.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Content Plan
      .addCase(createContentPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createContentPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.contentPlanning.push(action.payload.contentPlan);
      })
      .addCase(createContentPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Content Pool
      .addCase(fetchContentPool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContentPool.fulfilled, (state, action) => {
        state.loading = false;
        state.contentPool = action.payload.contentPool;
      })
      .addCase(fetchContentPool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Review Content
      .addCase(reviewContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reviewContent.fulfilled, (state, action) => {
        state.loading = false;
        
        // Değerlendirme sonucuna göre içeriği ilgili listelere taşı
        const { content, reviewResult } = action.payload;
        const contentId = content.id;
        
        // İnceleme bekleyen içeriklerden kaldır
        state.contentPool.pendingReview = state.contentPool.pendingReview.filter(
          (item) => item.id !== contentId
        );
        
        // Sonuca göre ekle
        if (reviewResult === 'approved') {
          state.contentPool.approved.push(content);
        } else if (reviewResult === 'rejected') {
          state.contentPool.rejected.push(content);
        } else if (reviewResult === 'revision') {
          // Revizyon için tekrar inceleme bekleyenlere ekle
          state.contentPool.pendingReview.push(content);
        }
      })
      .addCase(reviewContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Generate AI Content
      .addCase(generateAIContent.pending, (state) => {
        state.generatingContent = true;
        state.error = null;
      })
      .addCase(generateAIContent.fulfilled, (state, action) => {
        state.generatingContent = false;
        
        // Mevcut içeriği güncelle veya havuza ekle
        const { content } = action.payload;
        
        // Eğer bu içerik zaten inceleme bekleyenler içindeyse, güncelle
        const poolIndex = state.contentPool.pendingReview.findIndex(
          (item) => item.id === content.id
        );
        
        if (poolIndex !== -1) {
          state.contentPool.pendingReview[poolIndex] = content;
        } else {
          // Yoksa yeni ekle
          state.contentPool.pendingReview.push(content);
        }
        
        // Mevcut içerik olarak ayarla
        state.currentContent = content;
      })
      .addCase(generateAIContent.rejected, (state, action) => {
        state.generatingContent = false;
        state.error = action.payload;
      });
  },
});

export const { clearContentError, setCurrentContent, clearCurrentContent } =
  contentSlice.actions;

export default contentSlice.reducer;
