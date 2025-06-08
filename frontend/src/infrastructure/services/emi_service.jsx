// src/services/emi_service.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/emi';

// Fetch Emi for a specific user
export const fetchEmi = async (userID) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userID}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching EMI:", error);
    throw error;
  }
};

// Create a new EMI
export const createEmi = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData);
    return response.data;
  } catch (error) {
    console.error("Error adding EMI:", error);
    throw error;
  }
};

// Delete an EMI
export const deleteEmi = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting EMI:", error);
    throw error;
  }
};

// Update an EMI
export const updateEmi = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating EMI:", error);
    throw error;
  }
};
