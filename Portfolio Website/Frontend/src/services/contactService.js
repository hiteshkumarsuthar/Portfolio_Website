import apiClient from '../api/client';

/**
 * Service to handle contact form and backend health operations via Axios
 */
export const contactService = {
  /**
   * Submit contact form message
   * @param {{ name: string, contact: string, message: string }} formData
   */
  async sendMessage(formData) {
    const response = await apiClient.post('/api/contact', formData);
    return response.data;
  },

  /**
   * Check backend health and database connectivity
   */
  async checkHealth() {
    const response = await apiClient.get('/api/health');
    return response.data;
  },

  /**
   * Fetch recent messages (optional administration/verification)
   */
  async getMessages() {
    const response = await apiClient.get('/api/contact');
    return response.data;
  },
};

export default contactService;
