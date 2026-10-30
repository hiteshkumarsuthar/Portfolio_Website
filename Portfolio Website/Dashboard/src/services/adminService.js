import apiClient from '../api/client';

export const adminService = {
  // Authentication
  async login(email, password) {
    const res = await apiClient.post('/api/auth/login', { email, password });
    if (res.data?.token) {
      localStorage.setItem('metis_admin_token', res.data.token);
      localStorage.setItem('metis_admin_user', JSON.stringify(res.data.admin));
    }
    return res.data;
  },

  logout() {
    localStorage.removeItem('metis_admin_token');
    localStorage.removeItem('metis_admin_user');
  },

  getCurrentUser() {
    try {
      const u = localStorage.getItem('metis_admin_user');
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated() {
    return !!localStorage.getItem('metis_admin_token');
  },

  async getMe() {
    const res = await apiClient.get('/api/auth/me');
    return res.data?.admin;
  },

  async updateAdminAccount(data) {
    const res = await apiClient.put('/api/auth/profile', data);
    if (res.data?.admin) {
      localStorage.setItem('metis_admin_user', JSON.stringify(res.data.admin));
    }
    return res.data;
  },

  // Health & Stats
  async checkHealth() {
    const res = await apiClient.get('/api/health');
    return res.data;
  },

  async getDashboardStats() {
    const res = await apiClient.get('/api/dashboard/stats');
    return res.data?.data;
  },

  // About Me / Profile
  async getProfile() {
    const res = await apiClient.get('/api/profile');
    return res.data?.data;
  },

  async updateProfile(data) {
    const res = await apiClient.put('/api/profile', data);
    return res.data;
  },

  // Skills
  async getSkills() {
    const res = await apiClient.get('/api/skills');
    return res.data?.data || [];
  },

  async createSkill(data) {
    const res = await apiClient.post('/api/skills', data);
    return res.data?.data;
  },

  async updateSkill(id, data) {
    const res = await apiClient.put(`/api/skills/${id}`, data);
    return res.data?.data;
  },

  async deleteSkill(id) {
    const res = await apiClient.delete(`/api/skills/${id}`);
    return res.data;
  },

  // Journey
  async getJourney() {
    const res = await apiClient.get('/api/journey');
    return res.data?.data || [];
  },

  async createJourney(data) {
    const res = await apiClient.post('/api/journey', data);
    return res.data?.data;
  },

  async updateJourney(id, data) {
    const res = await apiClient.put(`/api/journey/${id}`, data);
    return res.data?.data;
  },

  async deleteJourney(id) {
    const res = await apiClient.delete(`/api/journey/${id}`);
    return res.data;
  },

  // Projects
  async getProjects() {
    const res = await apiClient.get('/api/projects');
    return res.data?.data || [];
  },

  async createProject(data) {
    const res = await apiClient.post('/api/projects', data);
    return res.data?.data;
  },

  async updateProject(id, data) {
    const res = await apiClient.put(`/api/projects/${id}`, data);
    return res.data?.data;
  },

  async deleteProject(id) {
    const res = await apiClient.delete(`/api/projects/${id}`);
    return res.data;
  },

  // Contact Info
  async getContact() {
    const res = await apiClient.get('/api/contact-info');
    return res.data?.data;
  },

  async updateContact(data) {
    const res = await apiClient.put('/api/contact-info', data);
    return res.data;
  },

  // Messages Center
  async getMessages() {
    const res = await apiClient.get('/api/messages');
    return res.data?.data || [];
  },

  async markMessageRead(id) {
    const res = await apiClient.put(`/api/messages/${id}/read`);
    return res.data?.data;
  },

  async deleteMessage(id) {
    const res = await apiClient.delete(`/api/messages/${id}`);
    return res.data;
  },

  // Site Settings & SEO
  async getSettings() {
    const res = await apiClient.get('/api/settings');
    return res.data?.data;
  },

  async updateSettings(data) {
    const res = await apiClient.put('/api/settings', data);
    return res.data;
  },

  // File Upload
  async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await apiClient.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },
};

export default adminService;
