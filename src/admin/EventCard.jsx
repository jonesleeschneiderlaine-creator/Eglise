import React, { useEffect, useState } from 'react';
import './EventCard.css';

const EventCard = ({ event, onUpdate, onDelete, onToggle, availableLocalisations = [], canEditLocation = true, disabled = false }) => {
    const [day, setDay] = useState(event.day);
    const [month, setMonth] = useState(event.month);
    const [weekday, setWeekday] = useState(event.weekday);
    const [time, setTime] = useState(event.time);
    const [localisation, setLocalisation] = useState(event.localisation);
    const [status, setStatus] = useState(event.status);

    useEffect(() => {
        setDay(event.day);
        setMonth(event.month);
        setWeekday(event.weekday);
        setTime(event.time);
        setLocalisation(event.localisation);
        setStatus(event.status);
    }, [event]);

    const handleSave = () => {
        onUpdate(event.id, {
            day,
            month,
            weekday,
            time,
            localisation,
            status,
        });
    };

    const isPast = status === 'passer';
    const localisations = availableLocalisations.length
        ? availableLocalisations
        : [event.localisation].filter(Boolean);

    return (
        <div className={`event-card ${isPast ? 'closed' : ''}`}>
            <div className={`status-badge ${isPast ? 'closed' : 'open'}`}>
                {isPast ? 'Passer' : 'A venir'}
            </div>
            <h3>{event.title} <span>{localisation}</span></h3>
            <p className="event-meta">Ajoute par : {event.localisation}</p>
            <div className="fields">
                <div><label>Jour</label><input type="number" value={day} onChange={(e) => setDay(parseInt(e.target.value, 10))} disabled={disabled} /></div>
                <div><label>Mois</label><input type="text" value={month} onChange={(e) => setMonth(e.target.value)} disabled={disabled} /></div>
                <div><label>Jour semaine</label>
                    <select value={weekday} onChange={(e) => setWeekday(e.target.value)} disabled={disabled}>
                        <option>Lundi</option><option>Mardi</option><option>Mercredi</option>
                        <option>Jeudi</option><option>Vendredi</option><option>Samedi</option><option>Dimanche</option>
                    </select>
                </div>
                <div><label>Heure</label><input type="text" value={time} onChange={(e) => setTime(e.target.value)} disabled={disabled} /></div>
                <div><label>Lieu</label>
                    <select value={localisation} onChange={(e) => setLocalisation(e.target.value)} disabled={disabled || !canEditLocation}>
                        {localisations.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </div>
                <div><label>Statut</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} disabled={disabled}>
                        <option value="a_venir">A venir</option>
                        <option value="passer">Passer</option>
                    </select>
                </div>
            </div>
            <div className="actions">
                <button className="btn-toggle" onClick={() => onToggle(event.id)} disabled={disabled}>Changer statut</button>
                <button className="btn-save" onClick={handleSave} disabled={disabled}>Sauvegarder</button>
                <button className="btn-delete" onClick={() => onDelete(event.id)} disabled={disabled}>Supprimer</button>
            </div>
        </div>
    );
};

export default EventCard;
