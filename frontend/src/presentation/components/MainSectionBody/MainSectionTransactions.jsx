// src/components/MainSectionTransactions.js
import React, { useState, useEffect } from "react";
import "./MainSection.css"; // Import the CSS file for MainSection
import PrimaryButton from "../Buttons/PrimaryButton"; // Import the PrimaryButton component
import { useSelector, useDispatch } from "react-redux";
import { setUserId } from "../../../infrastructure/actions/userActions"; // Import the action to set userId
import {
  fetchTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../../../infrastructure/services/transaction_service"; // Import the services for API calls

const MainSectionTransactions = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    type: "credit",
    category: "food",
  });
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    amount: "",
    type: "credit",
    category: "food",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const categories = [
    "Groceries",
    "Food",
    "Clothing",
    "Utilities",
    "Entertainment",
    "Others",
  ];

  const userId = useSelector((state) => state.user.userId); 
  const [transactions, setTransactions] = useState([]); 
  const dispatch = useDispatch(); 
  

  const fetchTransactionsData = async () => {
    if (!userId) {
      console.error("User ID is not set");
      return;
    }
    const data = await fetchTransactions(userId);
    setTransactions(data); // Set to local state instead of dispatching to Redux
  };
  

  useEffect(() => {
    if (userId) {
      fetchTransactionsData();
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTransaction({
        ...formData,
        user_id: userId, 
      });
      
      setFormData({
        amount: "",
        type: "credit",
        category: "food",
      });
      setShowForm(false);
      fetchTransactionsData(); 
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await deleteTransaction(id); 
        fetchTransactionsData(); 
      } catch (error) {
        console.error("Error deleting transaction:", error);
      }
    }
  };

  const handleEditClick = (row) => {
    setEditId(row.id);
    setEditData({
      amount: row.amount,
      type: row.type,
      category: row.category,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleEditSubmit = async (id) => {
    try {
      await updateTransaction(id, editData); 
      setEditId(null);
      fetchTransactionsData();
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = transactions.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(transactions.length / recordsPerPage);

  return (
    <div className="main-content">
      <h1>Transactions</h1>
      {/* Table */}
      <table className="data-table">
        <thead className="table-heading">
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Category</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>
                {editId === row.id ? (
                  <input
                    type="number"
                    name="amount"
                    value={editData.amount}
                    onChange={handleEditChange}
                  />
                ) : (
                  row.amount
                )}
              </td>
              <td>
                {editId === row.id ? (
                  <select name="type" value={editData.type} onChange={handleEditChange}>
                    <option value="credit">Credit</option>
                    <option value="debit">Debit</option>
                  </select>
                ) : (
                  row.type
                )}
              </td>
              <td>
                {editId === row.id ? (
                  <select name="category" value={editData.category} onChange={handleEditChange}>
                    {categories.map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                ) : (
                  row.category
                )}
              </td>
              <td>{row.created_at}</td>
              <td>
                {editId === row.id ? (
                  <>
                    <button className="submit-button" onClick={() => handleEditSubmit(row.id)}>
                      Save
                    </button>
                    <button className="cancel-button" onClick={() => setEditId(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button className="update-button" onClick={() => handleEditClick(row)}>
                      Update
                    </button>
                    <button className="delete-button" onClick={() => handleDelete(row.id)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      {!showForm ? (
        <PrimaryButton text="Add Transaction" onClick={() => setShowForm(true)} />
      ) : (
        <div className="transaction-form-container">
          <h2>Add New Transaction</h2>
          <form onSubmit={handleSubmit} className="transaction-form">
            <div className="form-group">
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">Type:</label>
              <select className="categories"
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <select className="categories"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                {categories.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-button">
                Submit
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MainSectionTransactions;
