import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    // Fermer le menu quand on change de page
    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    // Bloquer le scroll quand le menu mobile est ouvert
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [menuOpen]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <>
            <header className="header">
                <div className="nav-container">

                    {/* Logo */}
                    <div className="logo">
                        <img
                            src="/images/logo.jpg"
                            alt="Logo"
                            className="logo-img"
                        />

                        <div className="logo-text">
                            <h1>
                                Église de DIEU de la Grâce par la Foi en Christ
                            </h1>
                        </div>
                    </div>

                    {/* Navigation Desktop */}
                    <nav className="desktop-nav">
                        <Link to="/">Accueil</Link>
                        <a href="#a-propos">À propos</a>
                        <Link to="/video">Vidéos</Link>
                        <a href="#dons">Dons</a>
                        <a href="#contact">Contact</a>
                    </nav>

                    {/* Bouton Burger Mobile */}
                    <button
                        className="mobile-menu-btn"
                        onClick={toggleMenu}
                    >
                        {menuOpen ? '✕' : '☰'}
                    </button>

                </div>
            </header>

            {/* Overlay */}
            <div
                className={`mobile-nav-overlay ${
                    menuOpen ? 'active' : ''
                }`}
                onClick={closeMenu}
            ></div>

            {/* Menu Mobile */}
            <div className={`mobile-nav ${menuOpen ? 'active' : ''}`}>

                <div className="mobile-nav-header">

                    <img
                        src="/images/logo.jpg"
                        alt="Logo"
                        className="mobile-nav-logo"
                    />

                    <button
                        className="mobile-nav-close"
                        onClick={closeMenu}
                    >
                        ✕
                    </button>

                </div>

                <div className="mobile-nav-links">

                    <Link to="/" onClick={closeMenu}>
                        Accueil
                    </Link>

                    <a href="#a-propos" onClick={closeMenu}>
                        À propos
                    </a>

                    <Link to="/video" onClick={closeMenu}>
                        Vidéos
                    </Link>

                    <a href="#dons" onClick={closeMenu}>
                        Dons
                    </a>

                    <a href="#contact" onClick={closeMenu}>
                        Contact
                    </a>

                </div>

                <div className="mobile-nav-footer">
                    <p>+509 3423 6300</p>
                    <p>Que Dieu vous bénisse</p>
                </div>

            </div>
        </>
    );
};

export default Header;