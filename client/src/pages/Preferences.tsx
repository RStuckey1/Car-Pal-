import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, updateCurrentUser } from '../api/userAPI';
import { useAuth } from '../context/AuthContext';
import auth from '../utils/auth';
import './Preferences.css';

const Preferences = () => {
  const { isLoggedIn, loading: authLoading, updateUser } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (authLoading) return;
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
      return;
    }

    getCurrentUser()
      .then((user) => {
        setUsername(user.username);
        setEmail(user.email);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Unable to load account preferences.');
      })
      .finally(() => setLoading(false));
  }, [authLoading, isLoggedIn, navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (password && !currentPassword) {
      setError('Enter your current password to set a new password.');
      return;
    }
    if (!password && currentPassword) {
      setError('Enter a new password or clear the current password field.');
      return;
    }

    setSaving(true);
    try {
      const profile = await updateCurrentUser({
        username: username.trim(),
        email: email.trim(),
        ...(password ? { currentPassword, password } : {}),
      });
      updateUser({ id: profile.user.id, username: profile.user.username });
      if (profile.token) {
        auth.login(profile.token);
      }
      setUsername(profile.user.username);
      setEmail(profile.user.email);
      setCurrentPassword('');
      setPassword('');
      setSuccess('Your preferences have been saved.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save account preferences.');
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return <p className="preferences-status">Loading preferences...</p>;
  }

  return (
    <main className="preferences-page">
      <h2>Account Preferences</h2>
      <p className="preferences-intro">Update your account information.</p>
      <form className="preferences-form" onSubmit={handleSubmit}>
        <label htmlFor="preferences-username">Username</label>
        <input
          id="preferences-username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />

        <label htmlFor="preferences-email">Email</label>
        <input
          id="preferences-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <h3>Change password</h3>
        <p>Leave both password fields blank to keep your current password.</p>
        <label htmlFor="preferences-current-password">Current password</label>
        <input
          id="preferences-current-password"
          type="password"
          autoComplete="current-password"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
        />

        <label htmlFor="preferences-new-password">New password</label>
        <input
          id="preferences-new-password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {error && <p className="preferences-message preferences-error" role="alert">{error}</p>}
        {success && <p className="preferences-message preferences-success" role="status">{success}</p>}
        <button type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Save preferences'}
        </button>
      </form>
    </main>
  );
};

export default Preferences;
