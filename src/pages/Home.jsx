import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VerseBanner from '../components/VerseBanner';
import HeroSlider from '../components/HeroSlider';
import EventsSidebar from '../components/EventsSidebar';
import DescriptionSection from '../components/DescriptionSection';
import DonsSection from '../components/DonsSection';
import ContactSection from '../components/ContactSection';
import { useEvents } from '../hooks/useEvents';
import './Home.css';

const Home = () => {
    const { events, loading } = useEvents();
    const [filter, setFilter] = useState('all');

    if (loading) return <div className="loading">Chargement...</div>;

    return (
        <>
            <Header />
            <VerseBanner />
            <HeroSlider />
            <DescriptionSection />
            <DonsSection />
            <ContactSection />
            <Footer />
            <EventsSidebar events={events} currentFilter={filter} onFilterChange={setFilter} />
        </>
    );
};

export default Home;
