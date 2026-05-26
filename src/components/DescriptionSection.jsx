import React from 'react';
import './DescriptionSection.css';

const DescriptionSection = () => {
    return (
        <section className="description-section" id="a-propos">
            <div className="container">
                <div className="description-grid">
                    <div className="description-text">
                        <div className="title-with-logo">
                            <img src="/images/logo.jpg" alt="Logo" className="title-logo" />
                            <h3 className="section-title">Notre mission</h3>
                        </div>
                        <p><strong>Mission Église de DIEU de la Grâce par la Foi en Christ</strong> est un lieu de culte chaleureux où la Parole de Dieu est proclamée avec puissance et amour. Nous croyons que c'est par la grâce, reçue par la foi en Jésus-Christ, que nous sommes sauvés et transformés.</p>
                        <p>Nous vous invitons à découvrir une communauté vivante, engagée dans la prière, l'enseignement biblique et les œuvres de charité.</p>
                        <div className="pastor-card">
                            <i className="fas fa-church"></i>
                            <div>
                                <h4>Pasteur fondateur</h4>
                                <p className="pastor-name"><strong>Pasteur Élisée Rome</strong></p>
                                <p>Un homme de Dieu au cœur dévoué, appelé à répandre la grâce dans les régions de Bobin et Fortin.</p>
                            </div>
                        </div>
                    </div>
                    <div className="description-gallery">
                        <img src="/images/logo.jpg" alt="Église" loading="lazy" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DescriptionSection;