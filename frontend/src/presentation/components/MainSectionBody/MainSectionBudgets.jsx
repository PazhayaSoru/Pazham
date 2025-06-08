import React, { useState, useEffect } from 'react';
import { fetchBudgets, updateBudget, deleteBudget } from '../../../infrastructure/services/budget_service';
import { createBudget } from '../../../infrastructure/services/budget_service';  // Import API functions
import './MainSectionBudgets.css';
import { useSelector, useDispatch } from "react-redux";

const BudgetManager = () => {
  const [budgets, setBudgets] = useState([]);
  const [form, setForm] = useState({ category: '', budget_amount: '' });
  const [editId, setEditId] = useState(null);
  const [editAmount, setEditAmount] = useState('');

  const user_id = useSelector((state) => state.user.userId); // replace with actual user ID if using auth

  const categories = [
    "Groceries",
    "Food",
    "Clothing",
    "Utilities",
    "Entertainment",
    "Others",
  ];
  
  useEffect(() => {
    fetchBudgetsData();
  }, []);

  const fetchBudgetsData = async () => {
    try {
      const res = await fetchBudgets(user_id);
      console.log(res.data);
      setBudgets(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBudget({ ...form, user_id });
      setForm({ category: '', budget_amount: '' });
      fetchBudgetsData();
    } catch (err) {
      console.error('Create error:', err);
    }
  };

  const handleEdit = (id, currentAmount) => {
    setEditId(id);
    setEditAmount(currentAmount);
  };

  const handleUpdate = async (id) => {
    try {
      await updateBudget(id, editAmount);
      setEditId(null);
      setEditAmount('');
      fetchBudgetsData();
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBudget(id);
      fetchBudgetsData(); // Refresh list after deletion
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="main-content">
      <h2>Create New Budget</h2>
      <form onSubmit={handleSubmit} className="budget-form">
      <select className='categories'
  name="category"
  value={form.category}
  onChange={handleChange}
  required
>
  <option value="" disabled>Select a Category</option>
  {categories.map((cat, index) => (
    <option key={index} value={cat}>
      {cat}
    </option>
  ))}
</select>

        <input
          type="number"
          name="budget_amount"
          placeholder="Budget Amount"
          value={form.budget_amount}
          onChange={handleChange}
          required
        />
        <button type="submit">Create</button>
      </form>

      <h3>Your Budgets</h3>
      {budgets.map((b) => {
        const progress = Math.min((b.amount_spent / b.budget_amount) * 100, 100);
        return (
          <div key={b.id} className="budget-item">
            <div className="budget-header">
              <strong>{b.category}</strong>
              {editId === b.id ? (
                <div>
                  <input
                    type="number"
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                    className="edit-input"
                  />
                  <button onClick={() => handleUpdate(b.id)}>Save</button>
                  <button onClick={() => setEditId(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <span>₹{b.amount_spent} / ₹{b.budget_amount}</span>
                  <button className="update-button" onClick={() => handleEdit(b.id, b.budget_amount)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(b.id)} style={{ marginLeft: '5px' }}>Delete</button>
                </div>
              )}
            </div>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BudgetManager;
