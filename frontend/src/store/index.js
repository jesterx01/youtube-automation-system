import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import channelReducer from './slices/channelSlice';
import contentReducer from './slices/contentSlice';
import analyticsReducer from './slices/analyticsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    channels: channelReducer,
    content: contentReducer,
    analytics: analyticsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
