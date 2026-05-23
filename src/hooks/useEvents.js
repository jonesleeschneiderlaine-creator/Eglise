import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const normalizeStatus = (status) => {
    if (status === 'open') return 'a_venir';
    if (status === 'closed') return 'passer';
    return status ?? 'a_venir';
};

const normalizeEvent = (event) => ({
    ...event,
    status: normalizeStatus(event.status),
    localisation: event.localisation ?? '',
});

export const useEvents = ({ profile } = {}) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchEvents = useCallback(async () => {
        setLoading(true);
        setError('');

        let query = supabase
            .from('events')
            .select('*')
            .order('month', { ascending: true })
            .order('day', { ascending: true });

        if (profile?.type === 'admin' && profile.localisation) {
            query = query.eq('localisation', profile.localisation);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) {
            setError(fetchError.message);
            setEvents([]);
        } else {
            setEvents((data ?? []).map(normalizeEvent));
        }

        setLoading(false);
    }, [profile?.localisation, profile?.type]);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    const addEvent = useCallback(async (eventData) => {
        const baseLocalisation = profile?.type === 'admin'
            ? profile.localisation
            : eventData.localisation;

        const payload = {
            ...eventData,
            status: normalizeStatus(eventData.status),
            localisation: baseLocalisation,
        };

        const { data, error: insertError } = await supabase
            .from('events')
            .insert(payload)
            .select()
            .single();

        if (insertError) {
            throw insertError;
        }

        setEvents((current) => [...current, normalizeEvent(data)]);
        return data;
    }, [profile?.localisation, profile?.type]);

    const updateEvent = useCallback(async (id, updatedData) => {
        const payload = {
            ...updatedData,
            status: normalizeStatus(updatedData.status),
        };

        if (profile?.type === 'admin') {
            payload.localisation = profile.localisation;
        }

        const { data, error: updateError } = await supabase
            .from('events')
            .update(payload)
            .eq('id', id)
            .select()
            .single();

        if (updateError) {
            throw updateError;
        }

        setEvents((current) => current.map((event) => (
            event.id === id ? normalizeEvent(data) : event
        )));

        return data;
    }, [profile?.localisation, profile?.type]);

    const deleteEvent = useCallback(async (id) => {
        const { error: deleteError } = await supabase
            .from('events')
            .delete()
            .eq('id', id);

        if (deleteError) {
            throw deleteError;
        }

        setEvents((current) => current.filter((event) => event.id !== id));
    }, []);

    const toggleEventStatus = useCallback(async (id) => {
        const target = events.find((event) => event.id === id);

        if (!target) return null;

        const nextStatus = target.status === 'a_venir' ? 'passer' : 'a_venir';
        return updateEvent(id, { status: nextStatus });
    }, [events, updateEvent]);

    return {
        events,
        loading,
        error,
        addEvent,
        updateEvent,
        deleteEvent,
        toggleEventStatus,
        refreshEvents: fetchEvents,
    };
};
