import React, { useEffect, useState } from 'react';
import './AddEventForm.css';

const AddEventForm = ({ onAdd, availableLocalisations = [], lockedLocalisation = '', disabled = false }) => {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('Mars');
    const [weekday, setWeekday] = useState('Samedi');
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');
    const [localisation, setLocalisation] = useState(lockedLocalisation || availableLocalisations[0] || '');
    const [status, setStatus] = useState('a_venir');

    const localisations = availableLocalisations.length ? availableLocalisations : ['Bobin', 'Fortin'];

    useEffect(() => {
        setLocalisation(lockedLocalisation || availableLocalisations[0] || '');
    }, [availableLocalisations, lockedLocalisation]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!day || !title || !time || !(lockedLocalisation || localisation)) {
            alert('Veuillez remplir tous les champs');
            return;
        }

        const selectedLocalisation = lockedLocalisation || localisation;

        await onAdd({
            day: parseInt(day, 10),
            month,
            weekday,
            title,
            time,
            localisation: selectedLocalisation,
            status,
        });

        setDay('');
        setTitle('');
        setTime('');
    };

    return (
        <div className="add-form">
            <h3><i className="fas fa-plus-circle"></i> Ajouter un evenement</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <input type="number" placeholder="Jour" value={day} onChange={(e) => setDay(e.target.value)} disabled={disabled} />
                    <select value={month} onChange={(e) => setMonth(e.target.value)} disabled={disabled}>
                        <option>Janvier</option><option>Fevrier</option><option>Mars</option>
                        <option>Avril</option><option>Mai</option><option>Juin</option>
                        <option>Juillet</option><option>Aout</option><option>Septembre</option>
                        <option>Octobre</option><option>Novembre</option><option>Decembre</option>
                    </select>
                    <select value={weekday} onChange={(e) => setWeekday(e.target.value)} disabled={disabled}>
                        <option>Lundi</option><option>Mardi</option><option>Mercredi</option>
                        <option>Jeudi</option><option>Vendredi</option><option>Samedi</option><option>Dimanche</option>
                    </select>
                    <input type="text" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} disabled={disabled} />
                    <input type="text" placeholder="Heure (ex: 09h00 - 12h00)" value={time} onChange={(e) => setTime(e.target.value)} disabled={disabled} />
                    <select value={lockedLocalisation || localisation} onChange={(e) => setLocalisation(e.target.value)} disabled={disabled || Boolean(lockedLocalisation)}>
                        {localisations.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} disabled={disabled}>
                        <option value="a_venir">evenement A venir</option>
                        <option value="passer">evenement Passer</option>
                    </select>
                </div>
                <button type="submit" className="btn-add" disabled={disabled}><i className="fas fa-plus"></i> Ajouter</button>
            </form>
        </div>
    );
};

export default AddEventForm;
