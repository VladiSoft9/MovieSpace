import { useAuth } from '../context/AuthContext.jsx';
import './UserBar.css';

function UserBar() {
  const { session, loading, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const firstCapital = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const username = session?.user?.email ? firstCapital(session.user.email.split('@')[0]) : 'User';

  return (
    <div className="user-bar">
      <div className="user-info">
        <span className="welcome-text">Welcome, {username}</span>
      </div>
      <button onClick={handleSignOut} className="sign-out-btn" disabled={loading}>
        {loading ? 'Signing Out...' : 'Sign Out'}
      </button>
    </div>
  );
}

export default UserBar;