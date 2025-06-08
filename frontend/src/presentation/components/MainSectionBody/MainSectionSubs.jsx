import React, { useState, useEffect } from "react";
import "./MainSection.css"; 
import PrimaryButton from "../Buttons/PrimaryButton";
import { fetchSubs, createSub, deleteSub, updateSub } from '../../../infrastructure/services/subscription_service';
import { useSelector } from 'react-redux';

const MainSectionSubs = () => {
  const [Subs, setSubs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    service_name: "",
    amount: "",
    frequency: "",
    start_date: ""
  });
  const [editingSub, setEditingSub] = useState(null);

  const categories = ['Monthly','Quarterly', 'Yearly','Halfly']

  const userId = useSelector((state) => state.user.userId); 

  const fetchSubsData = async () => {
    try {
      const data = await fetchSubs(userId);
      setSubs(data);
    } catch (error) {
      console.error("Error fetching Subs:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchSubsData();
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
        user_id: userId,
        ...formData,
      };
      console.log("Submitting subscription:", cleanData); // Add this
      await createSub(cleanData);
      resetForm();
      fetchSubsData();
    } catch (error) {
      console.error("Error adding Sub:", error);
    }
  };
  

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    try {
      const cleanData = {
        ...formData,
      };
      await updateSub(id, cleanData);
      resetForm();
      fetchSubsData();
    } catch (error) {
      console.error("Error updating Sub:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this subscription?")) {
      try {
        await deleteSub(id);
        fetchSubsData();
      } catch (error) {
        console.error("Error deleting Sub:", error);
      }
    }
  };

  const handleEdit = (sub) => {
    setEditingSub(sub.id);
    setFormData({
      service_name: sub.service_name,
      amount: sub.amount,
      frequency: sub.frequency,
      start_date: sub.start_date.slice(0, 10)
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      service_name: '',
      amount: '',
      frequency: '',
      start_date: ''
    });
    setEditingSub(null);
    setShowForm(false);
  };

  return (
    <div className="main-content">
      <h1>Subscriptions</h1>
      <table className="data-table">
        <thead className="table-heading">
          <tr>
            <th>ID</th>
            <th>Service Name</th>
            <th>Amount</th>
            <th>Frequency</th>
            <th>Start Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Subs.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.service_name}</td>
              <td>{row.amount}</td>
              <td>{row.frequency}</td>
              <td>{row.start_date.slice(0, 10)}</td>
              <td>
                <button className="update-button" onClick={() => handleEdit(row)}>
                  Update
                </button>
                <button className="delete-button" onClick={() => handleDelete(row.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      {!showForm ? (
        <PrimaryButton text="Add Subscription" onClick={() => setShowForm(true)} />
      ) : (
        <div className="Subs-form-container">
          <h2>{editingSub ? "Update Subscription" : "Add New Subscription"}</h2>
          <form
            onSubmit={(e) => editingSub ? handleUpdate(e, editingSub) : handleSubmit(e)}
            className="Subs-form"
          >
            <div className="form-group">
              <label htmlFor="service_name">Service Name:</label>
              <input
                type="text"
                id="service_name"
                name="service_name"
                value={formData.service_name}
                onChange={handleInputChange}
                required
              />
            </div>

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
              <label htmlFor="frequency">Frequency:</label>
              <select
                id="frequency"
                name="frequency"
                value={formData.frequency}
                onChange={handleInputChange}
                required
              > 
              <option  value="">select</option>
                { categories.map((item) => (
                  <option key={item.id} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="start_date">Start Date:</label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                value={formData.start_date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-button">
                {editingSub ? "Update" : "Submit"}
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

export default MainSectionSubs;
