import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { useDispatch } from 'react-redux';
import { setUserId } from '../../../infrastructure/actions/userActions';
import { login } from '../../../infrastructure/actions/authActions';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/users/login', {
        username,
        password,
      });

      const userId = res.data.userId;
      dispatch(setUserId(userId));
      dispatch(login()); // Set userId in Redux store
      console.log('Logged in userId:', userId);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>

      <p>Don't have an account? <a href="/signup">Sign Up</a></p>
    </div>
  );
};

export default Login;
