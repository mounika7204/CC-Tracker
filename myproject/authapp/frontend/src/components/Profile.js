import React from 'react';
import './Profile.css'; // Add styling for layout and profile

const Profile = () => {
  // Example static data for platform submissions
  const platforms = [
    { name: 'Codeforces', submissions: 150 },
    { name: 'LeetCode', submissions: 120 },
    { name: 'HackerRank', submissions: 90 },
    { name: 'Codechef', submissions: 75 },
  ];

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-content">
          {/* Profile Circle on the left side */}
          <div className="profile-circle">
            <img src="https://via.placeholder.com/150" alt="Profile" />
            <p className="roll-no">Roll No: 12345</p>
          </div>

          {/* Submission Section */}
          <div className="submission-section">
            <div className="top-row">
              <div className="submission-card">
                <h4>{platforms[0].name}</h4>
                <p>Submissions: {platforms[0].submissions}</p>
              </div>
              <div className="submission-card">
                <h4>{platforms[1].name}</h4>
                <p>Submissions: {platforms[1].submissions}</p>
              </div>
            </div>
            <div className="bottom-row">
              <div className="submission-card">
                <h4>{platforms[2].name}</h4>
                <p>Submissions: {platforms[2].submissions}</p>
              </div>
              <div className="submission-card">
                <h4>{platforms[3].name}</h4>
                <p>Submissions: {platforms[3].submissions}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
