import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AuthPage.css';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find((user) => user.username === username);

    if (existingUser) {
      setError('Username already exists. Please choose a different username.');
      return;
    }

    if (phone.length !== 10) {
      setError('Phone number must be exactly 10 digits.');
      return;
    }

    users.push({ email, username, password });
    localStorage.setItem('users', JSON.stringify(users));
    setSuccess('Registered successfully!');
    setError('');
    setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setPhone(value);
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="heading">Attendance App</h1>
      <div className="card p-4">
        <h2 className="text-center mb-4">Register Page</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleRegister}>
          <div className="form-group mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Phone Number</label>
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={handlePhoneChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-rounded w-100">Register</button>
        </form>
        <p className="mt-3">
          Already registered? <a href="/login">Proceed to Login</a>

        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
