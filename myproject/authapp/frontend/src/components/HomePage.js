import React, { useState, useEffect } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [students, setStudents] = useState([]);

  // Example data structure for students' submissions
  const studentData = [
    {
      username: 'Mounika Kasa',
      rollNo: '21wh1a05d4',
      lastSubmission: '2024-12-08 16:20:00',
    },
    {
      username: 'John Doe',
      rollNo: '21wh1a05d5',
      lastSubmission: '2024-12-08 17:00:00',
    },
    {
      username: 'Jane Smith',
      rollNo: '21wh1a05d6',
      lastSubmission: '2024-12-09 09:30:00',
    },
    {
      username: 'Jane Smith',
      rollNo: '21wh1a05d6',
      lastSubmission: '2024-12-09 09:30:00',
    },
    {
      username: 'Jane Smith',
      rollNo: '21wh1a05d6',
      lastSubmission: '2024-12-09 09:30:00',
    },
    {
      username: 'Jane Smith',
      rollNo: '21wh1a05d6',
      lastSubmission: '2024-12-09 09:30:00',
    },
    {
      username: 'Jane Smith',
      rollNo: '21wh1a05d6',
      lastSubmission: '2024-12-09 09:30:00',
    },
    {
      username: 'Jane Smith',
      rollNo: '21wh1a05d6',
      lastSubmission: '2024-12-09 09:30:00',
    },

    {
      username: 'Jane Smith',
      rollNo: '21wh1a05d6',
      lastSubmission: '2024-12-09 09:30:00',
    },
    // Add more student data...
  ];

  // Sort students by the latest submission (desc)
  useEffect(() => {
    const sortedStudents = studentData.sort((a, b) => new Date(b.lastSubmission) - new Date(a.lastSubmission));
    setStudents(sortedStudents);
  }, []);

  return (
    <div className="home-page">
      <header className="header">
        <div className="header-logo">
          <h1>CC Tracker</h1>
        </div>
        <nav className="header-nav">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </nav>
      </header>

      <main className="home-content">
        <h2>Latest Submissions</h2>
        <div className="student-submissions">
          {students.length > 0 ? (
            students.map((student, index) => (
              <div key={index} className="student-card">
                <h3>{student.username}</h3>
                <p>Roll No: {student.rollNo}</p>
                <p>Last Submission: {student.lastSubmission}</p>
              </div>
            ))
          ) : (
            <p>No recent submissions.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
