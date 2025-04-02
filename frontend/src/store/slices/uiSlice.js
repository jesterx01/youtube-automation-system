import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarOpen: true,
    notifications: [],
    loading: false,
    currentModal: null,
    modalData: null,
    drawer: {
      open: false,
      content: null,
      data: null,
    },
  },
  reducers: {
    // Sidebar
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    
    // Notifications
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        message: action.payload.message,
        type: action.payload.type || 'info',
        duration: action.payload.duration || 5000,
        timestamp: new Date().toISOString(),
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    
    // Loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    // Modal management
    openModal: (state, action) => {
      state.currentModal = action.payload.modal;
      state.modalData = action.payload.data || null;
    },
    closeModal: (state) => {
      state.currentModal = null;
      state.modalData = null;
    },
    
    // Drawer management
    openDrawer: (state, action) => {
      state.drawer.open = true;
      state.drawer.content = action.payload.content;
      state.drawer.data = action.payload.data || null;
    },
    closeDrawer: (state) => {
      state.drawer.open = false;
      // Leave content and data for transition animations
    },
    clearDrawer: (state) => {
      state.drawer.open = false;
      state.drawer.content = null;
      state.drawer.data = null;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  addNotification,
  removeNotification,
  clearNotifications,
  setLoading,
  openModal,
  closeModal,
  openDrawer,
  closeDrawer,
  clearDrawer,
} = uiSlice.actions;

export default uiSlice.reducer;
