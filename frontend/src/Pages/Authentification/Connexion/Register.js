import React, { useState } from 'react';
import { FaLock, FaUser, FaEnvelope } from 'react-icons/fa';
import './Logout.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Envoyer les données au backend avec Axios
    axios.post('http://localhost:8081/register', {
      username,
      email,
      password,
      confirmPassword
    })
    .then(response => {
      console.log(response.data); // Succès de l'inscription
      alert('Inscription réussie');
    })
    .catch(error => {
      console.error('Erreur lors de l\'inscription:', error.response.data);
      alert('Erreur lors de l\'inscription');
    });
  };

  return (
  <div className='auth-page'>
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>

        <div className="input-box">
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <FaUser className='icon' />
        </div>

        <div className="input-box">
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FaEnvelope className='icon' />
        </div>

        <div className="input-box">
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className='icon' />
        </div>

        <div className="input-box">
          <input
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <FaLock className='icon' />
        </div>

        <button type='submit'>Register</button>

        <div className='register-link'>
          <p>Vous avez déjà un compte? <a href='#'><Link to="/">Se connecter</Link></a></p>
        </div>
      </form>
    </div>
   </div>
  );
};

export default Register;
