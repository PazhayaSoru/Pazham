import React, { useState, useEffect } from "react";
import "./MainSection.css";  // Ensure your styles are applied
import PrimaryButton from "../Buttons/PrimaryButton";  // Assuming you already have this button
import { fetchEmi, createEmi, deleteEmi, updateEmi } from '../../../infrastructure/services/emi_service';  // Assuming services
import { useSelector } from 'react-redux';

const MainSectionEMI = () => {
  const [emis, setEmis] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    total_amount: '',
    interest_rate: '',
    tenure_months: '',
    start_date: '',
    paid_installments: '',
    is_active: ''
  });
  const [editingEmi, setEditingEmi] = useState(null);

  const userId = useSelector((state) => state.user.userId);

  const fetchEmiData = async () => {
    try {
      const data = await fetchEmi(userId);
      setEmis(data);
    } catch (error) {
      console.error("Error fetching EMIs:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchEmiData();
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
        total_amount: Number(formData.total_amount),
        interest_rate: Number(formData.interest_rate),
        tenure_months: Number(formData.tenure_months),
        paid_installments: Number(formData.paid_installments),
        is_active: formData.is_active === "true",
        user_id: userId,
      };
      await createEmi(cleanData);
      resetForm();
      fetchEmiData();
    } catch (error) {
      console.error("Error adding EMI:", error);
    }
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    try {
      const cleanData = {
        ...formData,
        total_amount: Number(formData.total_amount),
        interest_rate: Number(formData.interest_rate),
        tenure_months: Number(formData.tenure_months),
        paid_installments: Number(formData.paid_installments),
        is_active: formData.is_active === "true",
      };
      await updateEmi(id, cleanData);
      resetForm();
      fetchEmiData();
    } catch (error) {
      console.error("Error updating EMI:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this EMI?")) {
      try {
        await deleteEmi(id);
        fetchEmiData();
      } catch (error) {
        console.error("Error deleting EMI:", error);
      }
    }
  };

  const handleEdit = (emi) => {
    setEditingEmi(emi.id);
    setFormData({
      title: emi.title,
      total_amount: emi.total_amount,
      interest_rate: emi.interest_rate,
      tenure_months: emi.tenure_months,
      start_date: emi.start_date.slice(0, 10),
      paid_installments: emi.paid_installments,
      is_active: emi.is_active ? "true" : "false",
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      total_amount: '',
      interest_rate: '',
      tenure_months: '',
      start_date: '',
      paid_installments: '',
      is_active: ''
    });
    setEditingEmi(null);
    setShowForm(false);
  };

  return (
    <div className="main-content">
      <h1>EMIs</h1>
      <table className="data-table">
        <thead className="table-heading">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Total Amount</th>
            <th>Interest Rate</th>
            <th style={{ width: '5px' }}>Tenure (Months)</th>
            <th>Start Date</th>
            <th>Monthly Installment</th>
            <th>Paid Installments</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {emis.map((emi) => (
            <tr key={emi.id}>
              <td>{emi.id}</td>
              <td>{emi.title}</td>
              <td>{emi.total_amount}</td>
              <td>{emi.interest_rate}</td>
              <td>{emi.tenure_months}</td>
              <td>{emi.start_date.slice(0, 10)}</td>
              <td>{emi.monthly_installment}</td>
              <td>{emi.paid_installments}</td>
              <td>{emi.is_active ? "Yes" : "No"}</td>
              <td>
                <button className="update-button" onClick={() => handleEdit(emi)}>
                  Update
                </button>
                <button className="delete-button" onClick={() => handleDelete(emi.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      {!showForm ? (
        <PrimaryButton text="Add EMI" onClick={() => setShowForm(true)} />
      ) : (
        <div className="emi-form-container">
          <h2>{editingEmi ? "Update EMI" : "Add New EMI"}</h2>
          <form
            onSubmit={(e) => editingEmi ? handleUpdate(e, editingEmi) : handleSubmit(e)}
            className="emi-form"
          >
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="total_amount">Total Amount:</label>
              <input
                type="number"
                id="total_amount"
                name="total_amount"
                value={formData.total_amount}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="interest_rate">Interest Rate:</label>
              <input
                type="number"
                id="interest_rate"
                name="interest_rate"
                value={formData.interest_rate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="tenure_months">Tenure (Months):</label>
              <input
                type="number"
                id="tenure_months"
                name="tenure_months"
                value={formData.tenure_months}
                onChange={handleInputChange}
                required
              />
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

            <div className="form-group">
              <label htmlFor="paid_installments">Paid Installments:</label>
              <input
                type="number"
                id="paid_installments"
                name="paid_installments"
                value={formData.paid_installments}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="is_active">Active:</label>
              <select
                id="is_active"
                name="is_active"
                value={formData.is_active}
                onChange={handleInputChange}
                required
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-button">
                {editingEmi ? "Update" : "Submit"}
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

export default MainSectionEMI;
