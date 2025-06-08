// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/subs';

// Fetch Subs for a specific user
export const fetchSubs = async (userID) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userID}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Subs:", error);
    throw error;
  }
};

// Create a new Sub
export const createSub = async (formData) => {
  try {
    const response = await axios.post(API_URL, {
      ...formData
    });
    return response.data;
  } catch (error) {
    console.error("Error adding Subs:", error);
    throw error;
  }
};

// Delete a Sub
export const deleteSub = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting Sub:", error);
    throw error;
  }
};

// Update a Sub
export const updateSub = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating Sub:", error);
    throw error;
  }
};
