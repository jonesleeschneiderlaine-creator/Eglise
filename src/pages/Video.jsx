import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VerseBanner from '../components/VerseBanner';
import './Video.css';

const videos = [
    { id: 1, date: "15 Décembre 2024", title: "Culte de la Victoire", description: "Un moment puissant de louange et d'adoration.", videoId: "dQw4w9WgXcQ" },
    { id: 2, date: "10 Novembre 2024", title: "Conférence de la Grâce", description: "Enseignement profond sur Éphésiens 2:8-9.", videoId: "dQw4w9WgXcQ" },
    { id: 3, date: "22 Septembre 2024", title: "Célébration de baptêmes", description: "15 âmes ont confessé publiquement leur foi.", videoId: "dQw4w9WgXcQ" },
    { id: 4, date: "18 Août 2024", title: "Camp de la jeunesse", description: "Un week-end inoubliable avec les jeunes.", videoId: "dQw4w9WgXcQ" },
    { id: 5, date: "5 Mai 2024", title: "Veillée de prière", description: "Une nuit de prière pour Haïti.", videoId: "dQw4w9WgXcQ" }
];

const Video = () => {
    return (
        <>
            <Header />
            <VerseBanner />
            <section className="video-hero">
                <div className="container">
                    <h1><i className="fas fa-video"></i> Moments marquants</h1>
                    <p>Revivez les instants de grâce où Dieu s'est manifesté parmi nous.</p>
                </div>
            </section>
            <section className="videos-grid">
                <div className="container">
                    <Link to="/" className="btn-retour"><i className="fas fa-arrow-left"></i> Retour</Link>
                    {videos.map(video => (
                        <div key={video.id} className="video-card">
                            <div className="video-wrapper">
                                <iframe src={`https://www.youtube.com/embed/${video.videoId}`} title={video.title} frameBorder="0" allowFullScreen></iframe>
                            </div>
                            <div className="video-info">
                                <span className="video-date"><i className="far fa-calendar-alt"></i> {video.date}</span>
                                <h3>{video.title}</h3>
                                <p>{video.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Video;