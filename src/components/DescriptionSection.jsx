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
                        <p><strong>Mission Église de DIEU de la Grâce par la Foi en Christ</strong> est un lieu de culte chaleureux où la puissance et l’amour de la Parole de Dieu transforment les vies. Nous croyons fermement que c’est par la grâce, reçue au travers de la foi en Jésus-Christ, que nous sommes sauvés et renouvelés. Rejoignez une communauté dynamique, fervente dans la prière, ancrée dans l’enseignement biblique, et active dans les œuvres de charité..</p>
                        <div className="pastor-card">
                            <i className="fas fa-church"></i>
                            <div>
                                <h4>Pasteur fondateur</h4>
                                <p className="pastor-name"><strong>Pasteur Élisée Rome</strong></p>
                                <p>Le Pasteur Élisée ROME est un serviteur dévoué au Seigneur, rempli de sagesse, dont l’appel résonne avec puissance pour annoncer l’Évangile. Sa vie entière est un témoignage de foi, d’intégrité, et d’un amour profond pour le peuple de Dieu.</p>
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