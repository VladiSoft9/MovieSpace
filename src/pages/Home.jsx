import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import SignIn from '../components/SignIn.jsx';
import SignUp from '../components/SignUp.jsx';


function Home() {
  const { session, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && session) {
      navigate('/app', { replace: true });
    }
  }, [session, loading, navigate]);
  
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="home">
        <div className="home-content">
            <h1>Welcome!</h1>
            <p>To be able to enjoy our MovieSpace application, please sign in or create an account.</p>
            <div className="login-form">
              {isSignUp ? (
                <SignUp onToggle={toggleForm} />
              ) : (
                <SignIn onToggle={toggleForm} />
              )}
            </div>
      </div>

      
      <footer>
        <p>© {new Date().getFullYear()} MovieSpace - Created by VladiSoft</p>
        <p>Made it possible by: <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className='link'>The Movie Database (TMDb)</a>.</p>
      </footer>

    </div>
  );
}

export default Home;