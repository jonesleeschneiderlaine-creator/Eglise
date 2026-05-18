import React, { useState } from 'react';
import './EventsSidebar.css';

const EventsSidebar = ({ events, currentFilter, onFilterChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const getLocationIcon = (location) => {
        if (location === "Bobin") return <i className="fas fa-tree"></i>;
        if (location === "Fortin") return <i className="fas fa-building"></i>;
        return <i className="fas fa-church"></i>;
    };

    const filteredEvents = currentFilter === 'all' ? events : events.filter(e => e.location === currentFilter);
    const monthOrder = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    const sortedEvents = [...filteredEvents].sort((a, b) => {
        const monthA = monthOrder.indexOf(a.month);
        const monthB = monthOrder.indexOf(b.month);
        if (monthA !== monthB) return monthA - monthB;
        return a.day - b.day;
    });

    return (
        <>
            <button className="open-sidebar-btn" onClick={() => setIsOpen(true)}>
                <i className="fas fa-calendar-alt"></i> <span>Événements</span>
            </button>
            <div className={`events-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="events-header">
                    <i className="fas fa-calendar-alt"></i>
                    <h3>📅 Événements à venir</h3>
                    <button className="close-sidebar" onClick={() => setIsOpen(false)}> ✕</button>
                   
                </div>
                <div className="filters-container">
                    <button className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`} onClick={() => onFilterChange('all')}>⛪ Toutes</button>
                    <button className={`filter-btn ${currentFilter === 'Bobin' ? 'active' : ''}`} onClick={() => onFilterChange('Bobin')}>🌿 Bobin</button>
                    <button className={`filter-btn ${currentFilter === 'Fortin' ? 'active' : ''}`} onClick={() => onFilterChange('Fortin')}>🏢 Fortin</button>
                </div>
                <div className="events-list">
                    {sortedEvents.length === 0 ? (
                        <div className="no-events"><i className="fas fa-calendar-times"></i><p>Aucun événement</p></div>
                    ) : (
                        sortedEvents.map(event => (
                            <div key={event.id} className={`event-item ${event.status === 'closed' ? 'closed' : ''}`}>
                                <div className="event-date"><span className="event-day">{event.day}</span><span className="event-month">{event.month}</span></div>
                                <div className="event-details">
                                    <h4>{event.title}{event.status === 'closed' && <span className="closed-badge">🔴 FERMÉ</span>}</h4>
                                    <p><i className="fas fa-clock"></i> {event.time}</p>
                                    <p>{getLocationIcon(event.location)} {event.location}</p>
                                    {event.status === 'closed' && <p className="closed-message"><i className="fas fa-ban"></i> Événement annulé</p>}
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className="events-footer"><a href="#contact" className="event-contact-link"><i className="fas fa-envelope"></i> +509 3423 6300</a></div>
            </div>
            {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>}
        </>
    );
};

export default EventsSidebar;