import React from 'react';
import './styles/ContactSection.css';

const ContactSection = () => {
    return (
        <section className="contact-section" id="contact">
            <div className="container">
                <h3 className="section-title text-center">Nos églises</h3>
                <div className="contact-grid">
                    <div className="contact-card">
                        <i className="fas fa-map-marker-alt"></i>
                        <h4>📍 Église de Bobin</h4>
                        <p>Bobin, Haïti<br />(Direction Léogâne)</p>
                    </div>
                    <div className="contact-card">
                        <i className="fas fa-map-marker-alt"></i>
                        <h4>📍 Église de Fortin</h4>
                        <p>Fortin, Haïti<br />(Zone métropolitaine)</p>
                    </div>
                </div>
                <div className="contact-grid">
                    <div className="contact-card">
                        <i className="fas fa-phone-alt"></i>
                        <h4>Téléphone</h4>
                        <p><a href="tel:+50934236300">+509 3423 6300</a><br /><a href="tel:+50947238390">+509 4723 8390</a></p>
                    </div>
                    <div className="contact-card">
                        <i className="fas fa-clock"></i>
                        <h4>Horaires</h4>
                        <p>Dimanche : 9h00 – 12h00<br />Mercredi : 18h30<br />Vendredi : 19h00</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;