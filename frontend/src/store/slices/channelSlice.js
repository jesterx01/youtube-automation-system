import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

// Asenkron thunk action'ları
export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(`${API_URL}/api/channels`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Kanallar alınamadı'
      );
    }
  }
);

export const fetchChannel = createAsyncThunk(
  'channels/fetchChannel',
  async (channelId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(`${API_URL}/api/channels/${channelId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Kanal alınamadı'
      );
    }
  }
);

export const createChannel = createAsyncThunk(
  'channels/createChannel',
  async (channelData, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.post(`${API_URL}/api/channels`, channelData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Kanal oluşturulamadı'
      );
    }
  }
);

export const updateChannel = createAsyncThunk(
  'channels/updateChannel',
  async ({ channelId, channelData }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.put(
        `${API_URL}/api/channels/${channelId}`,
        channelData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Kanal güncellenemedi'
      );
    }
  }
);

export const deleteChannel = createAsyncThunk(
  'channels/deleteChannel',
  async (channelId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      await axios.delete(`${API_URL}/api/channels/${channelId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return channelId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Kanal silinemedi'
      );
    }
  }
);

// Channel slice
const channelSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannel: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearChannelError: (state) => {
      state.error = null;
    },
    setCurrentChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
    clearCurrentChannel: (state) => {
      state.currentChannel = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Channels
      .addCase(fetchChannels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.loading = false;
        state.channels = action.payload.channels;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Channel
      .addCase(fetchChannel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.currentChannel = action.payload.channel;
      })
      .addCase(fetchChannel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Channel
      .addCase(createChannel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.channels.push(action.payload.channel);
        state.currentChannel = action.payload.channel;
      })
      .addCase(createChannel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Channel
      .addCase(updateChannel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateChannel.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.channels.findIndex(
          (channel) => channel.id === action.payload.channel.id
        );
        if (index !== -1) {
          state.channels[index] = action.payload.channel;
        }
        state.currentChannel = action.payload.channel;
      })
      .addCase(updateChannel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Channel
      .addCase(deleteChannel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.channels = state.channels.filter(
          (channel) => channel.id !== action.payload
        );
        if (state.currentChannel && state.currentChannel.id === action.payload) {
          state.currentChannel = null;
        }
      })
      .addCase(deleteChannel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearChannelError, setCurrentChannel, clearCurrentChannel } =
  channelSlice.actions;

export default channelSlice.reducer;
