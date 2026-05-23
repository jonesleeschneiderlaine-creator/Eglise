import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../admin/EventCard';
import AddEventForm from '../admin/AddEventForm';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../hooks/useEvents';
import '../admin/Admin.css';

const AdminDashboard = () => {
    const { profile, signOut } = useAuth();
    const { events, loading, error, updateEvent, deleteEvent, toggleEventStatus, addEvent } = useEvents({ profile });
    const [feedback, setFeedback] = useState('');
    const [isWorking, setIsWorking] = useState(false);

    const title = useMemo(() => profile?.localisation ?? 'Administration', [profile?.localisation]);

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

    if (loading) return <div className="loading">Chargement...</div>;

    return (
        <div className="admin-container">
            <div className="admin-header">
                <div>
                    <h1><i className="fas fa-church"></i> Dashboard Admin</h1>
                    <p>{title} : gerez uniquement vos evenements.</p>
                </div>
                <div className="admin-buttons">
                    <Link to="/" className="btn-site">Voir le site</Link>
                    <button onClick={signOut} className="btn-logout">Deconnexion</button>
                </div>
            </div>

            {(feedback || error) && <div className="dashboard-alert">{feedback || error}</div>}

            <div className="events-grid">
                {events.map((event) => (
                    <EventCard
                        key={event.id}
                        event={event}
                        canEditLocation={false}
                        disabled={isWorking}
                        onUpdate={(id, data) => withFeedback(() => updateEvent(id, data), 'Evenement mis a jour.')}
                        onDelete={(id) => withFeedback(() => deleteEvent(id), 'Evenement supprime.')}
                        onToggle={(id) => withFeedback(() => toggleEventStatus(id), 'Statut modifie.')}
                    />
                ))}
            </div>

            <AddEventForm
                onAdd={(data) => withFeedback(() => addEvent(data), 'Evenement ajoute.')}
                lockedLocalisation={profile?.localisation}
                availableLocalisations={[profile?.localisation].filter(Boolean)}
                disabled={isWorking}
            />
        </div>
    );
};

export default AdminDashboard;
