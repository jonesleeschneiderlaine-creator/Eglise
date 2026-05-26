import React from 'react';
import './DonsSection.css';

const DonsSection = () => {
    const copyToClipboard = (text, btn) => {
        navigator.clipboard.writeText(text);
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copié !';
        setTimeout(() => { btn.innerHTML = original; }, 2000);
    };

    return (
        <section className="dons-section" id="dons">
            <div className="container">
                <div className="title-with-logo centered">
                    <img src="/images/logo.jpg" alt="Logo" className="title-logo" />
                    <h3 className="section-title">Soutenir l'église 💝</h3>
                </div>
                <p className="dons-intro">Votre générosité contribue à l'œuvre de Dieu. Que Dieu vous bénisse abondamment.</p>
                <div className="dons-grid">
                    <div className="don-card">
                        <div className="don-icon"><i className="fas fa-mobile-alt"></i></div>
                        <h4>Moncash</h4>
                        <div className="don-number"><span>+509 3423 6300</span></div>
                        <button className="copy-btn" onClick={(e) => copyToClipboard('+50934236300', e.currentTarget)}><i className="fas fa-copy"></i> Copier</button>
                    </div>
                    <div className="don-card">
                        <div className="don-icon"><i className="fas fa-mobile-alt"></i></div>
                        <h4>Natcash</h4>
                        <div className="don-number"><span>+509 4083 1418</span></div>
                        <button className="copy-btn" onClick={(e) => copyToClipboard('+50947238390', e.currentTarget)}><i className="fas fa-copy"></i> Copier</button>
                    </div>
                    <div className="don-card">
                        <div className="don-icon"><i className="fas fa-university"></i></div>
                        <h4>Compte Bancaire</h4>
                        <div className="don-number"><span>Banque Unibank</span></div>
                        <p className="don-bank-info">Compte: 1234 5678 9012 3456</p>
                        <button className="copy-btn" onClick={(e) => copyToClipboard('1234567890123456', e.currentTarget)}><i className="fas fa-copy"></i> Copier</button>
                    </div>
                    <div className="don-card">
                        <div className="don-icon"><i className="fas fa-envelope"></i></div>
                        <h4>Zelle</h4>
                        <div className="don-number"><span>eglisegrace@gmail.com</span></div>
                        <button className="copy-btn" onClick={(e) => copyToClipboard('eglisegrace@gmail.com', e.currentTarget)}><i className="fas fa-copy"></i> Copier</button>
                    </div>
                </div>
                <div className="don-verse">
                    <i className="fas fa-quote-left"></i> "Dieu aime celui qui donne avec joie" <strong>— 2 Corinthiens 9:7</strong>
                </div>
            </div>
        </section>
    );
};

export default DonsSection;