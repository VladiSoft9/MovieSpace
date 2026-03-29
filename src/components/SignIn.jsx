import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

function SignIn({ onToggle }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn(email, password);
      // Reset form on successful sign in
      setEmail('');
      setPassword('');
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
      console.error('Sign in error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Sign In</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <button type="submit" className='signIn-signUp-btn' disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      <p>
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onToggle}
          className="toggle-link"
          disabled={loading}
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}

export default SignIn;
