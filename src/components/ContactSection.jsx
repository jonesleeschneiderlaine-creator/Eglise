import React from 'react';
import './ContactSection.css';

const ContactSection = () => {
    return (
        <section className="contact-section" id="contact">
            <div className="container">
                <h3 className="section-title text-center">...</h3>
                <div className="contact-grid">
                    <div className="contact-card">
                        <i className="fas fa-map-marker-alt"></i>
                        <h4>📍 Église de Bobin</h4>
                        <p>Bobin, Haïti<br />(delmas 95)</p>
                    </div>
                    <div className="contact-card">
                        <i className="fas fa-map-marker-alt"></i>
                        <h4>📍 Église de Fortin</h4>
                        <p>Fortin, Haïti<br />(corlette)</p>
                    </div>
                </div>
                <div className="contact-grid">
                    <div className="contact-card">
                        <i className="fas fa-phone-alt"></i>
                        <h4>Téléphone</h4>
                        <p><a href="tel:+50934236300">+509 3423 6300</a><br /><a href="tel:+50947238390">+509 4723 8390</a><br /><a href="tel:+50947238390">+509 4083 1418</a></p>
                    </div>
                    <div className="contact-card">
                        <i className="fas fa-clock"></i>
                        <h4>Horaires</h4>
                        <p>Dimanche : 9h00 – 11h00<br />Mardi : 16h30 - 19h30<br />mercredi : 17h00 - 19h30 <br />jeudi : 17h - 19h30 <br />Vendredi : 19h00 -1am </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;