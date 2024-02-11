import axios from 'axios';

const BASE_URL = '/api/v1/rekap';

const rekapService = {
  getAllDistrictsWithRekapVotes: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/districts`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },

  getAllVillagesByDistrictIdWithRekapVotes: async (districtId) => {
    try {
      const response = await axios.get(`${BASE_URL}/villages/${districtId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },

  getAllTpsByVillageIdWithRekapVotes: async (villageId) => {
    try {
      const response = await axios.get(`${BASE_URL}/tps/${villageId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },

  getAllRekapBallots: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/ballot`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  getAllRekapBallotsByDistrictId: async (districtId) => {
    try {
      const response = await axios.get(`${BASE_URL}/ballot-district/${districtId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  getAllCandidateVotes: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/candidate`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  getAllCandidateVotesInDistrict: async (districtId) => {
    try {
      const response = await axios.get(`${BASE_URL}/candidate/district/${districtId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  getAllCandidateVotesInVillage: async (villageId) => {
    try {
      const response = await axios.get(`${BASE_URL}/candidate/village/${villageId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
};

export default rekapService;
