import React, { useState, useEffect } from 'react';
import './ReportPage.css';

const ReportPage = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    
    const records = JSON.parse(localStorage.getItem('attendanceRecords')) || [];
    if (records.length === 0) {
      setError('No attendance records found');
      return;
    }

    setAttendanceRecords(records);
  }, []);

  
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  const formatTime = (date) => {
    return date ? new Date(date).toLocaleTimeString() : 'Absent';
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 text-white">Attendance Report</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Date</th>
            <th>Sign In Time</th>
            <th>Sign Out Time</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((record, index) => (
            <tr key={index}>
              <td>{record.username}</td>
              <td>{formatDate(record.date)}</td>
              <td>{formatTime(record.signInTime)}</td>
              <td>{formatTime(record.signOutTime)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportPage;
