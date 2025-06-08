// src/api.js
import axios from "axios";

const API_URL = "http://localhost:3000/transactions";


export const fetchTransactions = async (userID) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userID}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};


export const createTransaction = async (transactionData) => {
  try {
    const response = await axios.post(API_URL, transactionData);
    return response.data;
  } catch (error) {
    console.error("Error adding transaction:", error);
    throw error;
  }
};


export const updateTransaction = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw error;
  }
};


export const deleteTransaction = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
};
