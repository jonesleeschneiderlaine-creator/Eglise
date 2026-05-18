import { useState, useEffect } from 'react';
import { defaultEvents } from '../data/defaultEvents';

export const useEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('eglise_events');
        if (stored) {
            setEvents(JSON.parse(stored));
        } else {
            localStorage.setItem('eglise_events', JSON.stringify(defaultEvents));
            setEvents(defaultEvents);
        }
        setLoading(false);
    }, []);

    const saveEvents = (newEvents) => {
        setEvents(newEvents);
        localStorage.setItem('eglise_events', JSON.stringify(newEvents));
    };

    const addEvent = (event) => {
        const newId = Math.max(...events.map(e => e.id), 0) + 1;
        const newEvent = { ...event, id: newId };
        saveEvents([...events, newEvent]);
    };

    const updateEvent = (id, updatedData) => {
        const newEvents = events.map(event => 
            event.id === id ? { ...event, ...updatedData } : event
        );
        saveEvents(newEvents);
    };

    const deleteEvent = (id) => {
        const newEvents = events.filter(event => event.id !== id);
        saveEvents(newEvents);
    };

    const toggleEventStatus = (id) => {
        const newEvents = events.map(event =>
            event.id === id ? { ...event, status: event.status === 'open' ? 'closed' : 'open' } : event
        );
        saveEvents(newEvents);
    };

    return { events, loading, addEvent, updateEvent, deleteEvent, toggleEventStatus };
};