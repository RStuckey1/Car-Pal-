import { useState, type FormEvent, type ChangeEvent } from 'react';

import Auth from '../utils/auth';
import { login } from '../api/authAPI';
import { useNavigate } from 'react-router-dom';
import type { UserLogin } from '../interfaces/UserLogin';
import "../index.css";

function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState<UserLogin>({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      Auth.login(data.token);
      setIsLoggedIn(true);
    } catch (err) {
      console.error('Failed to login', err);
    }
  };

  if (isLoggedIn) {
    navigate('/Landing');
  }

  return (
    <div className='form-container1'>
      <form className='form login-form' onSubmit={handleSubmit}>
        <h2>Welcome to the World of Car</h2>
        <h2>Maintenance Logbook</h2>
        <h1>Please Login</h1>
        <div className='form-group'>
          <label>Username</label>
          <input
            className='form-input'
            type='text'
            name='username'
            value={loginData.username || ''}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input
            className='form-input'
            type='password'
            name='password'
            value={loginData.password || ''}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-primary' type='submit'>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;

  
  