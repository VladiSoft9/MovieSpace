import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
        <div className="home-content">
            <h1>Welcome!</h1>
            <p>This is the LogIn page of our application.</p>
            <Link to="/app">
              Click here to proceed to the main application (LogIn page is under construction)
            </Link>
      </div>

      
      <footer>
        <p>© {new Date().getFullYear()} MovieSpace - Created by VladiSoft</p>
        <p>Made it possible by: <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className='link'>The Movie Database (TMDb)</a>.</p>
      </footer>

    </div>
  );
}

export default Home;