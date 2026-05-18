import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VerseBanner from '../components/VerseBanner';
import './Video.css';

const videos = [
    { 
        id: 1, 
        date: "15 Décembre 2024", 
        title: "Culte de la Victoire", 
        description: "Un moment puissant de louange et d'adoration. La présence de Dieu était manifeste lors de cette célébration de Noël.",
        videoId: "8WmPXaOwkts"
    },
    { 
        id: 2, 
        date: "10 Novembre 2024", 
        title: "Conférence de la Grâce", 
        description: "Enseignement profond sur Éphésiens 2:8-9. Une parole prophétique qui a transformé des vies.",
        videoId: "2LBHCGxSpQU"
    },
    { 
        id: 3, 
        date: "22 Septembre 2024", 
        title: "Célébration de baptêmes", 
        description: "15 âmes ont confessé publiquement leur foi en Jésus-Christ. Un moment de joie et de renouveau spirituel.",
        videoId: "G2AZ5lrqJm8" 
    },  
    { 
        id: 4, 
        date: "18 Août 2024", 
        title: "Camp de la jeunesse", 
        description: "Un week-end inoubliable avec les jeunes de l'église. Louange, enseignement et prière.",
        videoId: "lk1GiTCBfZg" 
    },
    { 
        id: 5, 
        date: "5 Mai 2024", 
        title: "Veillée de prière", 
        description: "Une nuit de prière intense pour Haïti. Des témoignages de guérison et de délivrance.",
        videoId: "db7RDK78djSQ"  
    },
    { 
        id: 6, 
        date: "10 Mars 2024", 
        title: "Culte d'adoration du dimanche", 
        description: "Un moment de louange et d'adoration avec toute la communauté.",
        videoId: "SZgaswAVwmM"  
    },
    { 
        id: 7, 
        date: "25 Février 2024", 
        title: "Réunion de prière", 
        description: "Une soirée de prière et d'intercession pour les besoins de l'église et de la nation.",
        videoId: "yTJl368ZxU4"  
    }
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
                                <iframe 
                                    src={`https://www.youtube.com/embed/${video.videoId}`} 
                                    title={video.title} 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    referrerPolicy="strict-origin-when-cross-origin" 
                                    allowFullScreen>
                                </iframe>
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