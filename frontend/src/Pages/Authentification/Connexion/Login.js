import React, { useState } from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';  // Import de useNavigate
import './Logout.css';

function Login() {
  // États pour l'email et le mot de passe
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // useNavigate pour la redirection
  const navigate = useNavigate(); 

  // Gestion de la soumission du formulaire
  function handleSubmit(event) {
    event.preventDefault();
    
    // Appel API pour le login
    axios.post('http://localhost:8081/login', { email, password })
      .then(res => {
        console.log(res.data);

        // Redirection vers le Dashboard après le succès du login
        navigate('/dashboard');  // Redirige vers le tableau de bord après un login réussi
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }

  return (
   <div className='auth-page'>
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input 
            type='email' 
            placeholder='Email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <FaUser className='icon' />
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

        <div className="remember-forgot">
          <label><input type='checkbox' />Remember me</label>
          <a href='#'>Mot de passe oublié?</a>
        </div>

        <button type='submit'>Login</button>
        
        <div className='register-link'>
          <p>Vous n'avez pas de compte? <Link to="/register">Créez un compte</Link></p>
        </div>
      </form>
    </div>
   </div>
  );
}

export default Login;
