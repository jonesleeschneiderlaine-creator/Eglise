import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [shouldRedirectAfterLogin, setShouldRedirectAfterLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const { signIn, signOut, error, setError, isAuthenticated, profile } = useAuth();

    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    useEffect(() => {
        if (menuOpen || isLoginOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [menuOpen, isLoginOpen]);

    useEffect(() => {
        if (shouldRedirectAfterLogin && isAuthenticated && profile?.type) {
            setIsLoginOpen(false);
            setShouldRedirectAfterLogin(false);
            setEmail('');
            setPassword('');
            navigate(profile.type === 'creator' ? '/creator-dashboard' : '/admin-dashboard');
        }
    }, [isAuthenticated, navigate, profile, shouldRedirectAfterLogin]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const openLogin = () => {
        setError('');
        setIsLoginOpen(true);
        setMenuOpen(false);
    };

    const closeLogin = () => {
        setIsLoginOpen(false);
        setShouldRedirectAfterLogin(false);
        setEmail('');
        setPassword('');
        setError('');
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        setShouldRedirectAfterLogin(true);

        try {
            await signIn({ email, password });
        } catch (_loginError) {
            setShouldRedirectAfterLogin(false);
            setPassword('');
        }
    };

    const handleAccountAction = async () => {
        if (isAuthenticated) {
            await signOut();
            navigate('/');
            return;
        }

        openLogin();
    };

    const dashboardPath = profile?.type === 'creator' ? '/creator-dashboard' : '/admin-dashboard';

    return (
        <>
            <header className="header">
                <div className="nav-container">
                    <div className="logo">
                        <img
                            src="/images/logo.jpg"
                            alt="Logo"
                            className="logo-img"
                        />

                        <div className="logo-text">
                            <h1>
                                Mission Eglise de DIEU de la Grace par la Foi en Christ
                            </h1>
                        </div>
                    </div>

                    <nav className="desktop-nav">
                        <Link to="/">Accueil</Link>
                        <a href="#a-propos">A propos</a>
                        <Link to="/video">Videos</Link>
                        <a href="#dons">Dons</a>
                        <a href="#contact">Contact</a>
                        {/* {isAuthenticated && (
                            <Link to={dashboardPath}>Dashboard</Link>
                        )} */}
                        
                        <button type="button" className="header-login-btn" onClick={handleAccountAction}>
                            {isAuthenticated ? 'Deconnexion' : 'Connexion'}
                        </button>
                    </nav>

                    <button
                        className="mobile-menu-btn"
                        onClick={toggleMenu}
                    >
                        {menuOpen ? 'X' : '☰'}
                    </button>

                </div>
            </header>

            <div
                className={`mobile-nav-overlay ${menuOpen ? 'active' : ''}`}
                onClick={closeMenu}
            ></div>

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
                        X
                    </button>

                </div>

                <div className="mobile-nav-links">

                    <Link to="/" onClick={closeMenu}>
                        Accueil
                    </Link>

                    <a href="#a-propos" onClick={closeMenu}>
                        A propos
                    </a>

                    <Link to="/video" onClick={closeMenu}>
                        Videos
                    </Link>

                    <a href="#dons" onClick={closeMenu}>
                        Dons
                    </a>

                    <a href="#contact" onClick={closeMenu}>
                        Contact
                    </a>

                    {isAuthenticated && (
                        <Link to={dashboardPath} onClick={closeMenu}>
                            Dashboard
                        </Link>
                    )}

                    <button type="button" className="mobile-login-btn" onClick={handleAccountAction}>
                        {isAuthenticated ? 'Deconnexion' : 'Connexion'}
                    </button>

                </div>

                <div className="mobile-nav-footer">
                    <p>+509 3423 6300</p>
                    <p>Que Dieu vous benisse</p>
                </div>

            </div>

            {isLoginOpen && (
                <div className="login-modal-overlay" onClick={closeLogin}>
                    <div className="login-modal" onClick={(event) => event.stopPropagation()}>
                        <button type="button" className="login-modal-close" onClick={closeLogin}>X</button>
                        <h3>Connexion</h3>
                        <form onSubmit={handleLogin}>
                            <input
                                type="email"
                                placeholder="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                autoFocus
                            />
                            <input
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            {error && <div className="header-login-error">{error}</div>}
                            <button type="submit" className="header-login-submit">Se connecter</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
