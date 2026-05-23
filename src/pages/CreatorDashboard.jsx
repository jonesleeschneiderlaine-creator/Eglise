import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../admin/EventCard';
import AddEventForm from '../admin/AddEventForm';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../hooks/useEvents';
import { supabase } from '../../lib/supabase';
import '../admin/Admin.css';

const CreatorDashboard = () => {
    const { profile, signOut, runWithAuthStateSuppressed } = useAuth();
    const { events, loading, error, updateEvent, deleteEvent, toggleEventStatus, addEvent, refreshEvents } = useEvents({ profile });
    const [churches, setChurches] = useState([]);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [localisation, setLocalisation] = useState('');
    const [type, setType] = useState('admin');
    const [feedback, setFeedback] = useState('');
    const [loadingChurches, setLoadingChurches] = useState(true);
    const [isWorking, setIsWorking] = useState(false);

    const localisations = useMemo(() => {
        const values = churches
            .filter((church) => church.type === 'admin')
            .map((church) => church.localisation)
            .filter(Boolean);
        return [...new Set(values)];
    }, [churches]);

    const fetchChurches = async () => {
        setLoadingChurches(true);

        const { data, error: usersError } = await supabase
            .from('users')
            .select('*')
            .order('created_at', { ascending: false });

        if (usersError) {
            setFeedback(usersError.message);
            setChurches([]);
        } else {
            setChurches(data ?? []);
        }

        setLoadingChurches(false);
    };

    useEffect(() => {
        fetchChurches();
    }, []);

    const withFeedback = async (action, successMessage) => {
        if (isWorking) return;

        setIsWorking(true);
        setFeedback('');

        try {
            await action();
            setFeedback(successMessage);
        } catch (actionError) {
            setFeedback(actionError.message);
        } finally {
            setIsWorking(false);
        }
    };

    const createChurch = async () => {
        if (!email.trim() || !username.trim() || !password.trim() || !localisation.trim() || !type.trim()) {
            throw new Error('Veuillez remplir email, username, password, localisation et type.');
        }

        await runWithAuthStateSuppressed(async () => {
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: email.trim(),
                password: password.trim(),
                options: {
                    data: {
                        username: username.trim(),
                        localisation: localisation.trim(),
                        type: type.trim(),
                    },
                },
            });

            if (authError) {
                throw authError;
            }

            const authUserId = authData.user?.id;

            if (!authUserId) {
                throw new Error('Creation du compte impossible.');
            }

            const { error: insertError } = await supabase
                .from('users')
                .insert({
                    id: authUserId,
                    username: username.trim(),
                    localisation: localisation.trim(),
                    type: type.trim(),
                });

            if (insertError) {
                throw insertError;
            }
        });

        setEmail('');
        setUsername('');
        setPassword('');
        setLocalisation('');
        setType('admin');
        await fetchChurches();
    };

    const handleDeleteChurch = async (church) => {
        if (church.id === profile?.id) {
            throw new Error('Vous ne pouvez pas supprimer le compte connecte.');
        }

        const { error: eventsError } = await supabase
            .from('events')
            .delete()
            .eq('localisation', church.localisation);

        if (eventsError) {
            throw eventsError;
        }

        const { error: deleteError } = await supabase
            .from('users')
            .delete()
            .eq('id', church.id);

        if (deleteError) {
            throw deleteError;
        }

        await fetchChurches();
        await refreshEvents();
    };

    if (loading || loadingChurches) return <div className="loading">Chargement...</div>;

    return (
        <div className="admin-container">
            <div className="admin-header">
                <div>
                    <h1><i className="fas fa-crown"></i> Dashboard Creator</h1>
                    <p>{profile?.username} : gerez les eglises et tous les evenements.</p>
                </div>
                <div className="admin-buttons">
                    <Link to="/" className="btn-site">Voir le site</Link>
                    <button onClick={signOut} className="btn-logout">Deconnexion</button>
                </div>
            </div>

            {(feedback || error) && <div className="dashboard-alert">{feedback || error}</div>}

            <div className="dashboard-section">
                <div className="section-card">
                    <h2>Ajouter un compte</h2>
                    <form className="church-form" onSubmit={(event) => {
                        event.preventDefault();
                        withFeedback(createChurch, 'Compte ajoute avec succes.');
                    }}>
                        <div className="form-grid">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isWorking}
                            />
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                disabled={isWorking}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isWorking}
                            />
                            <input
                                type="text"
                                placeholder="Localisation"
                                value={localisation}
                                onChange={(e) => setLocalisation(e.target.value)}
                                disabled={isWorking}
                            />
                            <select value={type} onChange={(e) => setType(e.target.value)} disabled={isWorking}>
                                <option value="admin">admin</option>
                                <option value="creator">creator</option>
                            </select>
                        </div>
                        <button type="submit" className="btn-add" disabled={isWorking}>Ajouter</button>
                    </form>
                </div>

                <div className="section-card">
                    <h2>Liste des comptes</h2>
                    <div className="church-list">
                        {churches.map((church) => (
                            <div key={church.id} className="church-item">
                                <div>
                                    <strong>{church.username}</strong>
                                    <p>{church.localisation || 'Sans localisation'} - {church.type}</p>
                                </div>
                                <button
                                    type="button"
                                    className="btn-delete"
                                    disabled={isWorking || church.id === profile?.id}
                                    onClick={() => withFeedback(() => handleDeleteChurch(church), 'Compte supprime.')}
                                >
                                    Supprimer
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="events-grid">
                {events.map((event) => (
                    <EventCard
                        key={event.id}
                        event={event}
                        availableLocalisations={localisations}
                        disabled={isWorking}
                        onUpdate={(id, data) => withFeedback(() => updateEvent(id, data), 'Evenement mis a jour.')}
                        onDelete={(id) => withFeedback(() => deleteEvent(id), 'Evenement supprime.')}
                        onToggle={(id) => withFeedback(() => toggleEventStatus(id), 'Statut modifie.')}
                    />
                ))}
            </div>

            <AddEventForm
                onAdd={(data) => withFeedback(() => addEvent(data), 'Evenement ajoute.')}
                availableLocalisations={localisations}
                disabled={isWorking}
            />
        </div>
    );
};

export default CreatorDashboard;
