import axios from 'axios';

const API_BASE = 'https://your-api-gateway-endpoint.amazonaws.com/dev';

// Save user profile to DynamoDB via Lambda
export const saveUserProfile = async (profileData) => {
  const response = await axios.post(`${API_BASE}/profile`, profileData);
  return response.data;
};

// Upload meal image to S3 & trigger Bedrock via Lambda
export const uploadMealImage = async (formData) => {
  const response = await axios.post(`${API_BASE}/upload-meal`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Fetch latest meal for dashboard
export const getLatestMeal = async () => {
  const response = await axios.get(`${API_BASE}/meal/latest`);
  return response.data;
};

// Fetch all meals for history page
export const getMealHistory = async () => {
  const response = await axios.get(`${API_BASE}/meal/history`);
  return response.data;
};
