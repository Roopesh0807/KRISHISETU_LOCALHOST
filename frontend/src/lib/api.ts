import axios from 'axios';

// Configure your backend URL
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Admin API calls
export const adminAPI = {
  // Authentication
  login: (email: string, password: string) =>
    api.post('/api/admin/login', { email, password }),
    
  // Dashboard Stats
  getStats: () => api.get('/api/admin/stats'),
  // Updated API call to include timeRange query parameter
  getAnalyticsdashboard: () => api.get('/api/admin/analyticsdashboard'),
  getAnalytics: (timeRange: string) => 
    api.get('/api/admin/analytics', { params: { timeRange } }),
    
  // Farmers
  getFarmers: () => api.get('/api/admin/farmers'),
  // Changed to PUT requests
  approveFarmer: (farmerId: string) =>
    api.put(`/api/admin/farmers/${farmerId}/approve`),
  rejectFarmer: (farmerId: string, data: { reason: string }) =>
    api.put(`/api/admin/farmers/${farmerId}/reject`, data),
  banFarmer: (farmerId: string) =>
    api.put(`/api/admin/farmers/${farmerId}/ban`),
  // New API call to get detailed farmer info
  getFarmerDetails: (farmerId: string) =>
    api.get(`/api/admin/farmers/${farmerId}`),
    
  // Consumers
  getConsumers: () => api.get('/api/admin/consumers'),
  // NEW FUNCTION ADDED
  updateConsumerWallet: (consumerId: string, data: { amount: number, operation: 'add' | 'deduct' }) =>
    api.put(`/api/admin/consumers/${consumerId}/wallet`, data),
    
  // Products
  getProducts: (status?: string, marketType?: string) =>
    api.get('/api/admin/products', { params: { status, marketType } }),
  approveProduct: (productId: string) =>
    api.put(`/api/admin/products/${productId}/approve`),
  rejectProduct: (productId: string) =>
    api.put(`/api/admin/products/${productId}/reject`),
    
  // Orders
  getOrders: () => api.get('/api/admin/orders'),
  // New API call for updating order status
  updateOrderStatus: (orderId: string, status: string) =>
    api.put(`/api/admin/orders/${orderId}/status`, { status }),
    
  // Payments
  getPayments: () => api.get('/api/admin/payments'),
    
  // Demand Prediction
  getDemandPrediction: (crop?: string) =>
    api.get('/api/admin/demand', { params: { crop } }),
    
  // Settings
  getSettings: () => api.get('/api/admin/settings'),
  updateSettings: (settings: any) =>
    api.put('/api/admin/settings', settings),

  // NEW: Notifications
  getNotifications: () => api.get('/api/admin/notifications'),
  // The 'data' object here will contain title, message, type, target_audience, etc.
  createNotification: (data: any) =>
    api.post('/api/admin/notifications', data),
  sendNotification: (notificationId: string) =>
    api.put(`/api/admin/notifications/${notificationId}/send`),
  deleteNotification: (notificationId: string) =>
    api.delete(`/api/admin/notifications/${notificationId}`),
  // NEW: User Counts for Notifications/Stats (Added here)
  getUserCounts: () => api.get('/api/admin/user-counts'),
};

export default api;