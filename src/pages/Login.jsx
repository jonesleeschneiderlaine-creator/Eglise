import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../admin/Admin.css';

const Login = () => {
    const { signIn, error, setError, profile, isAuthenticated, loading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setError('');
    }, [setError]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signIn({ email, password });
        } catch (_error) {
            setPassword('');
        }
    };

    if (!loading && isAuthenticated) {
        return <Navigate to={profile?.type === 'creator' ? '/creator-dashboard' : '/admin-dashboard'} replace />;
    }

    return (
        <div className="admin-login">
            <div className="login-card">
                <i className="fas fa-lock"></i>
                <h2>Connexion</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        autoFocus
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mot de passe"
                    />
                    {error && <div className="error">{error}</div>}
                    <button type="submit">Se connecter</button>
                </form>
                <Link to="/">Retour au site</Link>
            </div>
        </div>
    );
};

export default Login;
