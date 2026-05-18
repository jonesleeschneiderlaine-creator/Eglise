import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../../hooks/useEvents';
import AddEventForm from './AddEventForm';
import './styles/Admin.css';

const ADMIN_PASSWORD = 'admin123';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { events, loading, updateEvent, deleteEvent, toggleEventStatus, addEvent } = useEvents();
    const [localEvents, setLocalEvents] = useState([]);

    useEffect(() => {
        const auth = sessionStorage.getItem('admin_auth');
        if (auth === 'true') setIsAuthenticated(true);
    }, []);

    useEffect(() => {
        if (events.length) setLocalEvents([...events]);
    }, [events]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            sessionStorage.setItem('admin_auth', 'true');
            setError('');
        } else {
            setError('Mot de passe incorrect');
            setPassword('');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('admin_auth');
        setIsAuthenticated(false);
    };

    const handleUpdate = (id, data) => {
        updateEvent(id, data);
    };

    if (!isAuthenticated) {
        return (
            <div className="admin-login">
                <div className="login-card">
                    <i className="fas fa-lock"></i>
                    <h2>Accès Administrateur</h2>
                    <form onSubmit={handleLogin}>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" autoFocus />
                        {error && <div className="error">{error}</div>}
                        <button type="submit">Se connecter</button>
                    </form>
                    <Link to="/">← Retour au site</Link>
                </div>
            </div>
        );
    }

    if (loading) return <div className="loading">Chargement...</div>;

    return (
        <div className="admin-container">
            <div className="admin-header">
                <div>
                    <h1><i className="fas fa-lock"></i> Administration</h1>
                    <p>Gérez les événements de Bobin et Fortin</p>
                </div>
                <div className="admin-buttons">
                    <Link to="/" className="btn-site">Voir le site</Link>
                    <button onClick={handleLogout} className="btn-logout">Déconnexion</button>
                </div>
            </div>
            <div className="events-grid">
                {localEvents.map(event => (
                    <EventCard key={event.id} event={event} onUpdate={handleUpdate} onDelete={deleteEvent} onToggle={toggleEventStatus} />
                ))}
            </div>
            <AddEventForm onAdd={addEvent} />
        </div>
    );
};

export default Admin;