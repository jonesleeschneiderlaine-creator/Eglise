import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './styles/Apropos.css';

const Apropos = () => {
    return (
        <>
         

            {/* Hero senp ak deskriptif */}
            <section className="about-hero">
                <div className="container">
                    <h1>À propos de nous</h1>
                    <p>
                        Découvrez l'histoire, la mission et les personnes qui
                        font battre le cœur de notre communauté.
                    </p>
                </div>
            </section>

            {/* Misyon + vizyon */}
            <section className="about-mission">
                <div className="container">
                    <div className="mission-card">
                        <div className="icon-circle">🎯</div>
                        <h2>Notre Mission</h2>
                        <p>
                            Conduire chaque personne à une rencontre personnelle
                            avec Jésus-Christ, les aider à grandir dans la foi
                            et à servir avec amour.
                        </p>
                    </div>
                    <div className="mission-card">
                        <div className="icon-circle">✨</div>
                        <h2>Notre Vision</h2>
                        <p>
                            Une communauté unie où la grâce transforme les vies
                            et où chacun trouve sa place dans la famille de Dieu.
                        </p>
                    </div>
                </div>
            </section>

            {/* Poukisa chwazi nou */}
            <section className="about-why">
                <div className="container">
                    <h2>Pourquoi nous choisir ?</h2>
                    <div className="why-grid">
                        <div className="why-item">
                            <h3>🙏 Culte inspirant</h3>
                            <p>
                                Une louange vivante, des messages bibliques
                                profonds et une atmosphère de prière.
                            </p>
                        </div>
                        <div className="why-item">
                            <h3>👨‍👩‍👧‍👦 Famille</h3>
                            <p>
                                Un accueil chaleureux pour toutes les
                                générations. Des activités pour les enfants,
                                les jeunes et les adultes.
                            </p>
                        </div>
                        <div className="why-item">
                            <h3>🌱 Croissance</h3>
                            <p>
                                Des formations, des groupes de maison et un
                                accompagnement personnel pour grandir
                                spirituellement.
                            </p>
                        </div>
                        <div className="why-item">
                            <h3>🤝 Impact local</h3>
                            <p>
                                Engagement social, aide aux plus démunis et
                                partenariats pour transformer notre ville.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ekip / Konstriksyon sit la */}
            <section className="about-team">
                <div className="container">
                    <h2>L'équipe qui construit ce site</h2>
                    <p className="team-subtitle">
                        Des passionnés au service de Dieu et de la communauté.
                    </p>
                    <div className="team-grid">
                        <div className="team-card">
                            <div className="team-avatar">👤</div>
                            <h4>INNOCENT Jerry</h4>
                            <span>Web Designer</span>
                            <p>
                                Conception technique, intégration et
                                déploiement du site.
                            </p>
                        </div>
                        <div className="team-card">
                            <div className="team-avatar">👤</div>
                            <h4>Laine schneider J.</h4>
                            <span>Developpeur FrontEnd</span>
                            <p>
                                Création graphique, harmonie visuelle et
                                expérience utilisateur.
                            </p>
                        </div>
                       
                    </div>
                </div>
            </section>

          
        </>
    );
};

export default Apropos;