import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

function SignUp({ onToggle }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      alert('Sign up successful! Please check your email to confirm your account.');
    } catch (err) {
      setError('Failed to sign up. Please try again or use a different email.');
      console.error('Sign up error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSignUp}>
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
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={loading}
        />
        <button type="submit" className='signIn-signUp-btn' disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      <p>
        Already have an account?{' '}
        <button
          type="button"
          onClick={onToggle}
          className="toggle-link"
          disabled={loading}
        >
          Sign In
        </button>
      </p>
    </div>
  );
}

export default SignUp;
