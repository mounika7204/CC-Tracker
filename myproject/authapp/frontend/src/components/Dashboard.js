import React, { useState } from 'react';
import { SiLeetcode, SiCodeforces, SiCodechef, SiHackerrank } from 'react-icons/si';
import './Dashboard.css';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setError('Please enter a name');
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`http://127.0.0.1:8000/students/search/${searchTerm}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Student not found');
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
        setError(error.message || 'Error fetching data');
        setLoading(false);
      });
  };

  return (
    <div className="dashboard">
      <header className="header">
        <div className="header-logo">
          <h1>CC Tracker</h1>
        </div>
        <nav className="header-nav">
          <ul>
            <li><a href="/">HOME</a></li>
            <li><a href="/dashboard">DASHBOARD</a></li>
            <li><a href="/login">LOGIN</a></li>
          </ul>
        </nav>
      </header>

      {/* Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by roll number..."
          className="search-bar"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>

      {/* Display Loading State */}
      {loading && <p>Loading...</p>}

      {/* Display Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Display User Data */}
      {userData && (
        <div className="user-profile-card">
          <div className="profile-info">
            <div className="profile-pic">
              <img src="https://via.placeholder.com/120" alt="User" />
            </div>
            <h3>{userData.roll_no}</h3>
            <p>{userData.email}</p>
          </div>

          <div className="coding-profiles">
            {/* Codeforces Profile */}
            {userData.platform_data.codeforces ? (
              <div className="coding-profile">
                <a
                  href={`https://codeforces.com/profile/${userData.platform_data.codeforces.handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="coding-icon"
                >
                  <SiCodeforces />
                </a>
                <h4>Codeforces</h4>
                <p>Rank: {userData.platform_data.codeforces.rating || 'N/A'}</p>
                <p>Problems Solved: {userData.platform_data.codeforces.problems_solved || 'N/A'}</p>
              </div>
            ) : (
              <p>No Codeforces data available.</p>
            )}

            {/* CodeChef Profile */}
            {userData.platform_data.codechef ? (
                  <div className="coding-profile">
                    <a
                      href={`https://www.codechef.com/users/${userData.platform_data.codechef.handle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="coding-icon"
                    >
                      <SiCodechef />
                    </a>
                    <h4>CodeChef</h4>
                    <p>Rating: {userData.platform_data.codechef.rating || 'N/A'}</p>
                    <p>Stars: {userData.platform_data.codechef.stars || 'N/A'}</p>
                    <p>Problems Solved: {userData.platform_data.codechef.problems_solved || 'N/A'}</p>
                  </div>
                ) : (
                  <p>No CodeChef data available.</p>
                )}


                {userData.platform_data.leetcode ? (
                  <div className="coding-profile">
                    <a
                      href={`https://leetcode.com/${userData.platform_data.leetcode.handle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="coding-icon"
                    >
                      <SiLeetcode />
                    </a>
                    <h4>LeetCode</h4>
                    <p>Rating: {userData.platform_data.leetcode.rating || 'N/A'}</p>
                    <p>Total Problems Solved: {userData.platform_data.leetcode.problems_solved || 'N/A'}</p>
                  </div>
                ) : (
                  <p>No LeetCode data available.</p>
                )}



            {/* HackerRank Profile */}
            {userData.platform_data.hackerrank ? (
              <div className="coding-profile">
                <a
                  href={`https://www.hackerrank.com/${userData.platform_data.hackerrank.handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="coding-icon"
                >
                  <SiHackerrank />
                </a>
                <h4>HackerRank</h4>
                <p>Rating: {userData.platform_data.hackerrank.rating || 'N/A'}</p>
              </div>
            ) : (
              <p>No HackerRank data available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;



// import React, { useState } from 'react';
// import { SiLeetcode, SiCodeforces, SiCodechef, SiHackerrank } from 'react-icons/si';
// import './Dashboard.css';

// const Dashboard = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSearch = () => {
//     if (!searchTerm.trim()) {
//       setError('Please enter a valid roll number');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     fetch(`http://127.0.0.1:8000/students/student/${searchTerm}/`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Student not found');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setUserData(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching student data:', error);
//         setError(error.message || 'Error fetching data');
//         setLoading(false);
//       });
//   };

//   return (
//     <div className="dashboard">
//       <header className="header">
//         <div className="header-logo">
//           <h1>CC Tracker</h1>
//         </div>
//         <nav className="header-nav">
//           <ul>
//             <li><a href="/">HOME</a></li>
//             <li><a href="/dashboard">DASHBOARD</a></li>
//             <li><a href="/login">LOGIN</a></li>
//           </ul>
//         </nav>
//       </header>

//       {/* Search Bar */}
//       <div className="search-bar-container">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search by roll number..."
//           className="search-bar"
//         />
//         <button onClick={handleSearch} className="search-button">Search</button>
//       </div>

//       {/* Display Loading State */}
//       {loading && <p>Loading...</p>}

//       {/* Display Error Message */}
//       {error && <p className="error-message">{error}</p>}

//       {/* Display User Data */}
//       {userData && (
//         <div className="user-profile-card">
//           <div className="profile-info">
//             <div className="profile-pic">
//               <img src="https://via.placeholder.com/120" alt="User" />
//             </div>
//             <h3>{userData.roll_no}</h3>
//             <p>{userData.email}</p>
//           </div>

//           <div className="coding-profiles">
//             {/* Codeforces Profile */}
//             {userData.platform_data.codeforces && (
//               <div className="coding-profile">
//                 <a
//                   href={`https://codeforces.com/profile/${userData.platform_data.codeforces.handle}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="coding-icon"
//                 >
//                   <SiCodeforces />
//                 </a>
//                 <h4>Codeforces</h4>
//                 <p>Handle: {userData.platform_data.codeforces.handle}</p>
//                 <p>Rating: {userData.platform_data.codeforces.rating}</p>
//                 <p>Rank: {userData.platform_data.codeforces.rank}</p>
//               </div>
//             )}

//             {/* CodeChef Profile */}
//             {userData.platform_data.codechef && (
//               <div className="coding-profile">
//                 <a
//                   href={`https://www.codechef.com/users/${userData.platform_data.codechef.handle}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="coding-icon"
//                 >
//                   <SiCodechef />
//                 </a>
//                 <h4>CodeChef</h4>
//                 <p>Handle: {userData.platform_data.codechef.handle}</p>
//                 <p>Rating: {userData.platform_data.codechef.rating}</p>
//                 <p>Global Rank: {userData.platform_data.codechef.global_rank}</p>
//               </div>
//             )}

//             {/* Add similar sections for LeetCode and HackerRank */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;
