import ContactSection from '../components/ContactSection';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './styles/Contact.css';

export default function Contact() {
    return (
        <>
            <Header />
           <div className='contact-section'>
    <h2>Coordonnées</h2>
    <div className="contact-row">   {/* ← NOUVO */}
        <div className="coordonnes">
            <div className="card">
                <h3>Bobin et Fortin</h3>
            </div>
            <div className="card">
                <p>123 Rue de l'Église, 75000 Paris</p>
                <p>Téléphone : 01 23 45 67 89</p>
                <p>Email : contact@bobin-et-fortin.com</p>
            </div>
            <div className="card">
                <h3>Horaires d'ouverture</h3>
                <p>Lundi - Vendredi : 9h00 - 18h00</p>
                <p>Samedi : 10h00 - 16h00</p>
                <p>Dimanche : Fermé</p>
            </div>
        </div>

        <div className="form">
            <h2>Contactez-nous</h2>
            <div className="form-container">
                <form action="">
                    <input type="text" placeholder="Votre nom" />
                    <input type="email" placeholder="Votre email" />
                    <textarea placeholder="Votre message"></textarea>
                    <button type="submit">Envoyer</button>
                </form>
            </div>
        </div>
    </div>
</div>
            <Footer />
        </>
    );
}