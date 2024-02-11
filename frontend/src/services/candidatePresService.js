import axios from 'axios';

const BASE_URL = '/api/v1/candidates';

const candidateService = {
  bulk: async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/bulk`, userData);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  createOneCandidate: async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/`, userData);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  getAllCandidates: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/`);
      return response.data.data;
    } catch (error) {
      return error.response.data;
    }
  },
  deleteCandidate: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/`, id);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
};

export default candidateService;
