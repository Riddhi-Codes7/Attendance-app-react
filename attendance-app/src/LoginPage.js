import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AuthPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const defaultUsers = [
    { username: 'admin', password: 'admin', email: 'admin@example.com' },
    { username: 'john_doe', password: 'password123', email: 'john.doe@example.com' },
    { username: 'jane_doe', password: 'password123', email: 'jane.doe@example.com' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const isDefaultUser = defaultUsers.find(
      (user) => user.username === username && user.password === password
    );
    if (isDefaultUser) {
      navigate('/admin');
      return;
    }

    // Check for registered user login
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      navigate('/attendance', { state: { username: user.username } });
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="heading">Attendance App</h1>
      <div className="card p-4">
        <h2 className="text-center mb-4">Login Page</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="btn btn-primary btn-rounded w-100">Login</button>
        </form>
        <p className="mt-3">
          Not registered? <a href="/register">Create an account</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
