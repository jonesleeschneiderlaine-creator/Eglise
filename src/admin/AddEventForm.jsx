import React, { useState } from 'react';
import './AddEventForm.css';

const AddEventForm = ({ onAdd }) => {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('Mars');
    const [weekday, setWeekday] = useState('Samedi');
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('Bobin');
    const [status, setStatus] = useState('open');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!day || !title || !time) {
            alert('Veuillez remplir tous les champs');
            return;
        }
        onAdd({ day: parseInt(day), month, weekday, title, time, location, status });
        setDay(''); setTitle(''); setTime('');
        alert('✨ Événement ajouté');
    };

    return (
        <div className="add-form">
            <h3><i className="fas fa-plus-circle"></i> Ajouter un événement</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <input type="number" placeholder="Jour" value={day} onChange={(e) => setDay(e.target.value)} />
                    <select value={month} onChange={(e) => setMonth(e.target.value)}>
                        <option>Janvier</option><option>Février</option><option>Mars</option>
                        <option>Avril</option><option>Mai</option><option>Juin</option>
                        <option>Juillet</option><option>Août</option><option>Septembre</option>
                        <option>Octobre</option><option>Novembre</option><option>Décembre</option>
                    </select>
                    <select value={weekday} onChange={(e) => setWeekday(e.target.value)}>
                        <option>Lundi</option><option>Mardi</option><option>Mercredi</option>
                        <option>Jeudi</option><option>Vendredi</option><option>Samedi</option><option>Dimanche</option>
                    </select>
                    <input type="text" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input type="text" placeholder="Heure (ex: 09h00 - 12h00)" value={time} onChange={(e) => setTime(e.target.value)} />
                    <select value={location} onChange={(e) => setLocation(e.target.value)}>
                        <option value="Bobin">🌿 Bobin</option>
                        <option value="Fortin">🏢 Fortin</option>
                    </select>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="open">✅ Ouvert</option>
                        <option value="closed">🔴 FERMÉ</option>
                    </select>
                </div>
                <button type="submit" className="btn-add"><i className="fas fa-plus"></i> Ajouter</button>
            </form>
        </div>
    );
};

export default AddEventForm;