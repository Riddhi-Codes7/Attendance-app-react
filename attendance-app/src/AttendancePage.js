import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AttendancePage.css';

const AttendancePage = () => {
  const [signInTime, setSignInTime] = useState(null);
  const [signOutTime, setSignOutTime] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state || { username: '' };

  useEffect(() => {
    if (!username) {
      setError('No user data available');
      return;
    }

    const records = JSON.parse(localStorage.getItem('attendanceRecords')) || [];
    const userRecords = records.find(record => record.username === username);

    if (userRecords) {
      const today = new Date().toISOString().split('T')[0];
      if (userRecords.date === today) {
        setSignInTime(userRecords.signInTime ? new Date(userRecords.signInTime) : null);
        setSignOutTime(userRecords.signOutTime ? new Date(userRecords.signOutTime) : null);
      }
    }
  }, [username]);

  const handleSignIn = () => {
    if (!username) {
      setError('No user data available');
      return;
    }

    const currentTime = new Date();
    const today = currentTime.toISOString().split('T')[0];
    const records = JSON.parse(localStorage.getItem('attendanceRecords')) || [];
    const userRecords = records.find(record => record.username === username && record.date === today);

    if (userRecords && userRecords.signInTime) {
      setError('You have already signed in today');
      return;
    }

    if (userRecords) {
      userRecords.signInTime = currentTime;
    } else {
      records.push({
        username,
        date: today,
        signInTime: currentTime,
        signOutTime: null
      });
    }

    localStorage.setItem('attendanceRecords', JSON.stringify(records));
    setSignInTime(currentTime);
    setError('');
  };

  const handleSignOut = () => {
    if (!username) {
      setError('No user data available');
      return;
    }

    const currentTime = new Date();
    const today = currentTime.toISOString().split('T')[0];
    const records = JSON.parse(localStorage.getItem('attendanceRecords')) || [];
    const userRecords = records.find(record => record.username === username && record.date === today);

    if (!userRecords || !userRecords.signInTime) {
      setError('You need to sign in first');
      return;
    }

    if (userRecords.signOutTime) {
      setError('You have already signed out today');
      return;
    }

    userRecords.signOutTime = currentTime;
    localStorage.setItem('attendanceRecords', JSON.stringify(records));
    setSignOutTime(currentTime);
    setError('');
  };

  const viewReport = () => {
    navigate('/report', { state: { username } });
  };

  const formatDateTime = (date) => {
    if (!date) return '';
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="container">
      <h1 className="attendance-heading">Employee Attendance</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="attendance-cards">
        <div className="attendance-card">
          {signInTime ? (
            <div className="mb-4">
              <h4 className="text-primary">{formatDateTime(signInTime)}</h4>
            </div>
          ) : (
            <button onClick={handleSignIn} className="btn btn-primary btn-rounded">
              Sign In
            </button>
          )}
          <button onClick={viewReport} className="btn btn-outline-primary btn-rounded">
            View Report
          </button>
        </div>
        <div className="attendance-card">
          {signOutTime ? (
            <div className="mb-4">
              <h4 className="text-primary">{formatDateTime(signOutTime)}</h4>
            </div>
          ) : (
            signInTime && (
              <button onClick={handleSignOut} className="btn btn-primary btn-rounded">
                Sign Out
              </button>
            )
          )}
          <button onClick={viewReport} className="btn btn-outline-primary btn-rounded">
            View Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
