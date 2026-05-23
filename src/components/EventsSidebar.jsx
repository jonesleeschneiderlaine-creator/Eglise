import React, { useState } from 'react';
import './EventsSidebar.css';

const EventsSidebar = ({ events, currentFilter, onFilterChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const locations = [...new Set(events.map((event) => event.localisation).filter(Boolean))];
    const filteredEvents = currentFilter === 'all'
        ? events
        : events.filter((event) => event.localisation === currentFilter);
    const monthOrder = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];

    const sortedEvents = [...filteredEvents].sort((a, b) => {
        const monthA = monthOrder.indexOf(a.month);
        const monthB = monthOrder.indexOf(b.month);

        if (monthA !== monthB) return monthA - monthB;
        return a.day - b.day;
    });

    return (
        <>
            <button className="open-sidebar-btn" onClick={() => setIsOpen(true)}>
                <i className="fas fa-calendar-alt"></i> <span>Evenements</span>
            </button>
            <div className={`events-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="events-header">
                    <i className="fas fa-calendar-alt"></i>
                    <h3>Evenements</h3>
                    <button className="close-sidebar" onClick={() => setIsOpen(false)}>X</button>
                </div>
                <div className="filters-container">
                    <button className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`} onClick={() => onFilterChange('all')}>
                        Toutes
                    </button>
                    {locations.map((location) => (
                        <button
                            key={location}
                            className={`filter-btn ${currentFilter === location ? 'active' : ''}`}
                            onClick={() => onFilterChange(location)}
                        >
                            {location}
                        </button>
                    ))}
                </div>
                <div className="events-list">
                    {sortedEvents.length === 0 ? (
                        <div className="no-events"><i className="fas fa-calendar-times"></i><p>Aucun evenement</p></div>
                    ) : (
                        sortedEvents.map((event) => (
                            <div key={event.id} className={`event-item ${event.status === 'passer' ? 'closed' : ''}`}>
                                <div className="event-date">
                                    <span className="event-day">{event.day}</span>
                                    <span className="event-month">{event.month}</span>
                                </div>
                                <div className="event-details">
                                    <h4>{event.title}{event.status === 'passer' && <span className="closed-badge">Passe</span>}</h4>
                                    <p><i className="fas fa-clock"></i> {event.time}</p>
                                    <p><i className="fas fa-church"></i> {event.localisation}</p>
                                    <p><i className="fas fa-user-shield"></i> Ajoute par {event.localisation}</p>
                                    {event.status === 'passer' && <p className="closed-message"><i className="fas fa-ban"></i> Evenement passe</p>}
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
