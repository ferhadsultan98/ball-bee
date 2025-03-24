// BallBeeLogin.jsx
import React, { useState } from 'react';
import './BallBeeLogin.scss';
import { signInWithEmailAndPassword, auth  } from '../Firebase/Firebase';
import { useNavigate } from 'react-router-dom'; // Yönlendirme için useNavigate

const BallBeeLogin = () => {
  const [email, setEmail] = useState(''); // Username yerine email kullanıyoruz (Firebase Auth için)
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Yönlendirme için hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Firebase Authentication ile giriş yapma
      await signInWithEmailAndPassword(auth, email, password);
      // Giriş başarılıysa admin panele yönlendir
      navigate('/admin');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid credentials or login error');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        <div>
          <input
            type="email" // Email tipi kullanıyoruz
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default BallBeeLogin;