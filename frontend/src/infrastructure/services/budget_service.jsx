

import axios from 'axios';

const API_URL = 'http://localhost:3000/budgets'; 


export const fetchBudgets = (userId) => {
  return axios.get(`${API_URL}/user/${userId}`);
};

export const createBudget = (budgetData) => {
  return axios.post(API_URL, budgetData);
};


export const updateBudget = (id, budgetAmount) => {
  return axios.put(`${API_URL}/${id}`, { budget_amount: budgetAmount });
};


export const deleteBudget = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
