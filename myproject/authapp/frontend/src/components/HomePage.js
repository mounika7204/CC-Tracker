import React, { useState, useEffect } from 'react';
import './HomePage.css';

const HomePage = () => {
  // Static data
  const studentData = [
    {
      rollNo: '21wh1a05d4',
      email: '21wh1a05d4@bvrithyderabad.edu.in',
      platform_data: {
        codeforces: {
          rating: 860,
          problems_solved: 104
        },
        codechef: {
          rating: '1091',
          stars: '1★',
          problems_solved: 170
        },
        leetcode: {
          rating: 187535,
          problems_solved: 407
        },
        geeksforgeeks: {
          total_problems_solved: 2
        }
      }
    },
    {
      rollNo: '21wh1a05i6',
      email: '',
      platform_data: {
        codeforces: {
          rating: 528,
          problems_solved: 57
        },
        codechef: {
          rating: '1089',
          stars: '1★',
          problems_solved: 152
        },
        leetcode: {
          rating: 916212,
          problems_solved: 118
        },
        geeksforgeeks: {
          handle: 'https://www.geeksforgeeks.org/user/21wh1aexpy/',
          error: 'GeeksforGeeks data fetch failed: invalid literal for int() with base 10: \'__\''
        }
      }
    },
    {
      rollNo: '22wh5a0516',
      email: '',
      platform_data: {
        codeforces: {
          rating: 706,
          problems_solved: 13
        },
        codechef: {
          rating: '1074',
          stars: '1★',
          problems_solved: 156
        },
        leetcode: {
          rating: 2527837,
          problems_solved: 26
        },
        geeksforgeeks: {
          total_problems_solved: 1
        }
      }
    }
  ];

  // Fetch upcoming contests data
  const fetchUpcomingContests = async () => {
    try {
      // Fetch CodeForces upcoming contests
      const cfResponse = await fetch('https://codeforces.com/api/contest.list');
      const cfData = await cfResponse.json();

      // Filter contests that are upcoming
      const upcomingCF = cfData.result.filter(contest => contest.phase === 'BEFORE');

      // Fetch CodeChef upcoming contests
      const ccResponse = await fetch('https://api.codechef.com/contests');
      const ccData = await ccResponse.json();

      // Filter contests that are upcoming
      const upcomingCC = ccData.result.filter(contest => contest.status === 'UPCOMING');

      // LeetCode does not provide a direct API, so we may need to use another method.
      // For now, assuming we manually fetch or use an unofficial API.
      const upcomingLC = [
        { title: 'LeetCode Contest #1', date: '2024-12-30' },
        { title: 'LeetCode Contest #2', date: '2024-01-15' },
      ];

      return {
        codeforces: upcomingCF,
        codechef: upcomingCC,
        leetcode: upcomingLC
      };
    } catch (error) {
      console.error('Error fetching contests:', error);
      return {
        codeforces: [],
        codechef: [],
        leetcode: []
      };
    }
  };

  // Function to calculate total problems solved
  const calculateTotalProblemsSolved = (platformData) => {
    let total = 0;
    for (const platform in platformData) {
      const data = platformData[platform];
      if (data.problems_solved) {
        total += parseInt(data.problems_solved, 10);
      } else if (data.total_problems_solved) {
        total += parseInt(data.total_problems_solved, 10);
      }
    }
    return total;
  };

  // Sorting students based on total problems solved in descending order
  useEffect(() => {
    const sortedStudents = studentData.map(student => ({
      ...student,
      totalProblemsSolved: calculateTotalProblemsSolved(student.platform_data)
    })).sort((a, b) => b.totalProblemsSolved - a.totalProblemsSolved);

    setStudents(sortedStudents);

    // Fetch upcoming contests
    const getContests = async () => {
      const contests = await fetchUpcomingContests();
      setContests(contests);
    };

    getContests();
  }, []);

  const [students, setStudents] = useState([]);
  const [contests, setContests] = useState({ codeforces: [], codechef: [], leetcode: [] });

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
        <h2>🏆 Leaderboard</h2>
        <div className="student-submissions">
          {students.length > 0 ? (
            students.map((student, index) => (
              <div key={index} className="student-card">
                <h3>Roll No: {student.rollNo}</h3>
                <p>Total Problems Solved: {student.totalProblemsSolved}</p>
              </div>
            ))
          ) : (
            <p>No student data available.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;

// import React, { useState, useEffect } from 'react';
// import './HomePage.css';

// const HomePage = () => {
//   // Static data
//   const studentData = [
//     {
//       rollNo: '21wh1a05d4',
//       email: '21wh1a05d4@bvrithyderabad.edu.in',
//       platform_data: {
//         codeforces: {
//           rating: 860,
//           problems_solved: 104
//         },
//         codechef: {
//           rating: '1091',
//           stars: '1★',
//           problems_solved: 170
//         },
//         leetcode: {
//           rating: 187535,
//           problems_solved: 407
//         },
//         geeksforgeeks: {
//           total_problems_solved: 2
//         }
//       }
//     },
//     {
//       rollNo: '21wh1a05i6',
//       email: '',
//       platform_data: {
//         codeforces: {
//           rating: 528,
//           problems_solved: 57
//         },
//         codechef: {
//           rating: '1089',
//           stars: '1★',
//           problems_solved: 152
//         },
//         leetcode: {
//           rating: 916212,
//           problems_solved: 118
//         },
//         geeksforgeeks: {
//           handle: 'https://www.geeksforgeeks.org/user/21wh1aexpy/',
//           error: 'GeeksforGeeks data fetch failed: invalid literal for int() with base 10: \'__\''
//         }
//       }
//     },
//     {
//       rollNo: '22wh5a0516',
//       email: '',
//       platform_data: {
//         codeforces: {
//           rating: 706,
//           problems_solved: 13
//         },
//         codechef: {
//           rating: '1074',
//           stars: '1★',
//           problems_solved: 156
//         },
//         leetcode: {
//           rating: 2527837,
//           problems_solved: 26
//         },
//         geeksforgeeks: {
//           total_problems_solved: 1
//         }
//       }
//     }
//   ];

//   // Function to calculate total problems solved
//   const calculateTotalProblemsSolved = (platformData) => {
//     let total = 0;
//     for (const platform in platformData) {
//       const data = platformData[platform];
//       if (data.problems_solved) {
//         total += parseInt(data.problems_solved, 10);
//       } else if (data.total_problems_solved) {
//         total += parseInt(data.total_problems_solved, 10);
//       }
//     }
//     return total;
//   };

//   // Sorting students based on total problems solved in descending order
//   useEffect(() => {
//     const sortedStudents = studentData.map(student => ({
//       ...student,
//       totalProblemsSolved: calculateTotalProblemsSolved(student.platform_data)
//     })).sort((a, b) => b.totalProblemsSolved - a.totalProblemsSolved);

//     setStudents(sortedStudents);
//   }, []);

//   const [students, setStudents] = useState([]);

//   return (
//     <div className="home-page">
//       <header className="header">
//         <div className="header-logo">
//           <h1>CC Tracker</h1>
//         </div>
//         <nav className="header-nav">
//           <ul>
//             <li><a href="/">Home</a></li>
//             <li><a href="/dashboard">Dashboard</a></li>
//             <li><a href="/login">Login</a></li>
//           </ul>
//         </nav>
//       </header>

//       <main className="home-content">
//       <h2>🏆 Leaderboard</h2>
//         <div className="student-submissions">
//           {students.length > 0 ? (
//             students.map((student, index) => (
//               <div key={index} className="student-card">
//                 <h3>Roll No: {student.rollNo}</h3>
//                 <p>Total Problems Solved: {student.totalProblemsSolved}</p>
//               </div>
//             ))
//           ) : (
//             <p>No student data available.</p>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default HomePage;



// import React, { useState, useEffect } from 'react';
// import './HomePage.css';

// const HomePage = () => {
//   const [students, setStudents] = useState([]);

//   // Example data structure for students' submissions
//   const studentData = [
//     {
//       username: 'Mounika Kasa',
//       rollNo: '21wh1a05d4',
//       lastSubmission: '2024-12-08 16:20:00',
//     },
//     {
//       username: 'John Doe',
//       rollNo: '21wh1a05d5',
//       lastSubmission: '2024-12-08 17:00:00',
//     },
//     {
//       username: 'Jane Smith',
//       rollNo: '21wh1a05d6',
//       lastSubmission: '2024-12-09 09:30:00',
//     },
//     {
//       username: 'Jane Smith',
//       rollNo: '21wh1a05d6',
//       lastSubmission: '2024-12-09 09:30:00',
//     },
//     {
//       username: 'Jane Smith',
//       rollNo: '21wh1a05d6',
//       lastSubmission: '2024-12-09 09:30:00',
//     },
//     {
//       username: 'Jane Smith',
//       rollNo: '21wh1a05d6',
//       lastSubmission: '2024-12-09 09:30:00',
//     },
//     {
//       username: 'Jane Smith',
//       rollNo: '21wh1a05d6',
//       lastSubmission: '2024-12-09 09:30:00',
//     },
//     {
//       username: 'Jane Smith',
//       rollNo: '21wh1a05d6',
//       lastSubmission: '2024-12-09 09:30:00',
//     },

//     {
//       username: 'Jane Smith',
//       rollNo: '21wh1a05d6',
//       lastSubmission: '2024-12-09 09:30:00',
//     },
//     // Add more student data...
//   ];

//   // Sort students by the latest submission (desc)
//   useEffect(() => {
//     const sortedStudents = studentData.sort((a, b) => new Date(b.lastSubmission) - new Date(a.lastSubmission));
//     setStudents(sortedStudents);
//   }, []);

//   return (
//     <div className="home-page">
//       <header className="header">
//         <div className="header-logo">
//           <h1>CC Tracker</h1>
//         </div>
//         <nav className="header-nav">
//           <ul>
//             <li><a href="/">Home</a></li>
//             <li><a href="/dashboard">Dashboard</a></li>
//             <li><a href="/login">Login</a></li>
//           </ul>
//         </nav>
//       </header>

//       <main className="home-content">
//         <h2>Latest Submissions</h2>
//         <div className="student-submissions">
//           {students.length > 0 ? (
//             students.map((student, index) => (
//               <div key={index} className="student-card">
//                 <h3>{student.username}</h3>
//                 <p>Roll No: {student.rollNo}</p>
//                 <p>Last Submission: {student.lastSubmission}</p>
//               </div>
//             ))
//           ) : (
//             <p>No recent submissions.</p>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default HomePage;
