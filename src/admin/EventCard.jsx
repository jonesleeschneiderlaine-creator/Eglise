import React, { useState } from 'react';
import './EventCard.css';

const EventCard = ({ event, onUpdate, onDelete, onToggle }) => {
    const [day, setDay] = useState(event.day);
    const [month, setMonth] = useState(event.month);
    const [weekday, setWeekday] = useState(event.weekday);
    const [time, setTime] = useState(event.time);
    const [location, setLocation] = useState(event.location);
    const [status, setStatus] = useState(event.status);

    const handleSave = () => {
        onUpdate(event.id, { day, month, weekday, time, location, status });
        // alert('✅ Événement modifié');
    };

    return (
        <div className={`event-card ${status === 'closed' ? 'closed' : ''}`}>
            <div className={`status-badge ${status === 'open' ? 'open' : 'closed'}`}>
                {status === 'open' ? '✅ Ouvert' : '🔴 FERMÉ'}
            </div>
            <h3>{event.title} <span>{location === 'Bobin' ? '🌿' : '🏢'} {location}</span></h3>
            <div className="fields">
                <div><label>Jour</label><input type="number" value={day} onChange={(e) => setDay(parseInt(e.target.value))} /></div>
                <div><label>Mois</label><input type="text" value={month} onChange={(e) => setMonth(e.target.value)} /></div>
                <div><label>Jour semaine</label>
                    <select value={weekday} onChange={(e) => setWeekday(e.target.value)}>
                        <option>Lundi</option><option>Mardi</option><option>Mercredi</option>
                        <option>Jeudi</option><option>Vendredi</option><option>Samedi</option><option>Dimanche</option>
                    </select>
                </div>
                <div><label>Heure</label><input type="text" value={time} onChange={(e) => setTime(e.target.value)} /></div>
                <div><label>Lieu</label>
                    <select value={location} onChange={(e) => setLocation(e.target.value)}>
                        <option value="Bobin">🌿 Bobin</option>
                        <option value="Fortin">🏢 Fortin</option>
                    </select>
                </div>
                <div><label>Statut</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="open">✅ Ouvert</option>
                        <option value="closed">🔴 FERMÉ</option>
                    </select>
                </div>
            </div>
            <div className="actions">
                <button className="btn-toggle" onClick={() => onToggle(event.id)}>Ouvrir/Fermer</button>
                <button className="btn-save" onClick={handleSave}>💾 Sauvegarder</button>
                <button className="btn-delete" onClick={() => onDelete(event.id)}>🗑️ Supprimer</button>
            </div>
        </div>
    );
};

export default EventCard;