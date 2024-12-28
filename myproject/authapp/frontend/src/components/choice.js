import { Link } from 'react-router-dom';
import './choice.css'; // CSS for styling

function SignUpChoice() {
  return (
    <div className="signup-choice-container">
      <div className="signup-choice-box">
        <Link to="/signupadmin">
          <div className="signup-box-content">
            <h3>Admin</h3>
          </div>
        </Link>
      </div>
      <div className="signup-choice-box">
        <Link to="/signup">
          <div className="signup-box-content">
            <h3>Student</h3>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SignUpChoice;
