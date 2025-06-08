import React, { useState } from "react";
import axios from "axios";  // Ensure axios is installed for making API requests
import './Signup.css';
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    city: "",
    montly_income: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/users", formData);
      console.log(response.data);
      // Redirect to login page or show success message
      navigate('/login'); // Redirect to login page after successful signup
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Error creating user, please try again.");
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {/* Username Field */}
        <div>
          <label htmlFor="username">Username:</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            value={formData.username} 
            onChange={handleInputChange}
            required 
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleInputChange}
            required 
          />
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={formData.password} 
            onChange={handleInputChange}
            required 
          />
        </div>

        {/* City Field */}
        <div>
          <label htmlFor="city">City:</label>
          <input 
            type="text" 
            id="city" 
            name="city" 
            value={formData.city} 
            onChange={handleInputChange}
            required 
          />
        </div>

        {/* Income Field */}
        <div>
          <label htmlFor="montly_income">Income (in ₹):</label>
          <input 
            type="number" 
            id="montly_income" 
            name="montly_income" 
            value={formData.montly_income} 
            onChange={handleInputChange}
            required 
          />
        </div>

        {/* Submit Button */}
        <button type="submit">Sign Up</button>
      </form>

      {/* Redirect to Login */}
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default Signup;
