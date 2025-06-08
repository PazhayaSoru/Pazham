import React, { useState, useEffect } from "react";
import "./MainSection.css"; 
import PrimaryButton from "../Buttons/PrimaryButton";
import { fetchDues, createDue, deleteDue, updateDue } from '../../../infrastructure/services/dues_service';
import { useSelector } from 'react-redux';

const MainSectionDues = () => {
  const [dues, setDues] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    due_date: '',
    closed: ''
  });
  const [editingDue, setEditingDue] = useState(null);

  const userId = useSelector((state) => state.user.userId); 

  const fetchDuesData = async () => {
    try {
      const data = await fetchDues(userId);
      setDues(data);
    } catch (error) {
      console.error("Error fetching dues:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchDuesData();
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cleanData = {
        ...formData,
        closed: formData.closed === "Yes",
        user_id: userId,
      };
      await createDue(cleanData, userId);
      resetForm();
      fetchDuesData();
    } catch (error) {
      console.error("Error adding dues:", error);
    }
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    try {
      const cleanData = {
        ...formData,
        closed: formData.closed === "Yes",
      };
      await updateDue(id, cleanData);
      resetForm();
      fetchDuesData();
    } catch (error) {
      console.error("Error updating due:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this due?")) {
      try {
        await deleteDue(id);
        fetchDuesData();
      } catch (error) {
        console.error("Error deleting due:", error);
      }
    }
  };

  const handleEdit = (due) => {
    setEditingDue(due.dues_id);
    setFormData({
      amount: due.amount,
      category: due.category,
      due_date: due.due_date.slice(0, 10),
      closed: due.closed ? "Yes" : "No"
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      amount: '',
      category: '',
      due_date: '',
      closed: ''
    });
    setEditingDue(null);
    setShowForm(false);
  };

  return (
    <div className="main-content">
      <h1>Dues</h1>
      <table className="data-table">
        <thead className="table-heading">
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Due Date</th>
            <th>Closed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {console.log(dues)}
          {dues.map((row) => (
            <tr key={row.dues_id}>
              <td>{row.dues_id}</td>
              <td>{row.amount}</td>
              <td>{row.category}</td>
              <td>{row.due_date.slice(0, 10)}</td>
              <td>{row.closed ? "Yes" : "No"}</td>
              <td>
                <button className="update-button" onClick={() => handleEdit(row)}>
                  Update
                </button>
                <button className="delete-button" onClick={() => handleDelete(row.dues_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      {!showForm ? (
        <PrimaryButton text="Add Dues" onClick={() => setShowForm(true)} />
      ) : (
        <div className="Dues-form-container">
          <h2>{editingDue ? "Update Dues" : "Add New Dues"}</h2>
          <form
            onSubmit={(e) => editingDue ? handleUpdate(e, editingDue) : handleSubmit(e)}
            className="Dues-form"
          >
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
              <label htmlFor="category">Category:</label>
              <input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="due_date">Due Date:</label>
              <input
                type="date"
                id="due_date"
                name="due_date"
                value={formData.due_date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="closed">Closed:</label>
              <select
                id="closed"
                name="closed"
                value={formData.closed}
                onChange={handleInputChange}
                required
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-button">
                {editingDue ? "Update" : "Submit"}
              </button>
              <button type="button" className="cancel-button" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MainSectionDues;
