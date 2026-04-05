import { useState, type FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { loginStart, loginSuccess, loginFailure } from '../features/auth/authSlice';
import { setAuthToken } from '../api/axios';

export default function Login() {
  const [email, setEmail] = useState('admin@taskflow.com');
  const [password, setPassword] = useState('azerty');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { loading, error, token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginStart());

    // Simulation of API logic
    setTimeout(() => {
      if (email === 'admin@taskflow.com' && password === 'azerty') {
        const user = { id: '1', email: 'admin@taskflow.com', name: 'Admin Othmane' };
        
        // Simulating JWT token creation locally (for TP5 learning purposes)
        const fakeToken = btoa(JSON.stringify({ 
          userId: user.id, 
          email: user.email, 
          role: 'admin', 
          exp: Date.now() + 3600000 
        }));

        dispatch(loginSuccess({ user, token: fakeToken }));
        setAuthToken(fakeToken); // Initializing axios interceptor
        navigate('/');
      } else {
        dispatch(loginFailure('Identifiants incorrects (admin@taskflow.com / azerty)'));
      }
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Bienvenue sur TaskFlow</h2>
        <p>Connectez-vous pour accéder à vos projets</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>
          
          <button type="submit" disabled={loading} className="btn btn-primary login-btn">
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
          
          {error && <div className="error-msg">{error}</div>}
        </form>
      </div>
    </div>
  );
}
