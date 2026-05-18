import React, { useState, useEffect } from 'react';
import './HeroSlider.css';

const slides = [
    {
        image: "/images/hero1.jpeg",
        title: "Bienvenue dans la Maison du Père",
        description:
            "Une communauté vivante, enracinée dans la grâce et la foi en Jésus-Christ."
    },
    {
        image: "/images/hero2.jpeg",
        title: "La Grâce qui transforme",
        description:
            "Venez expérimenter l'amour infini de Dieu et la puissance de la foi."
    },
    {
        image: "/images/hero3.jpeg",
        title: "Une famille unie en Christ",
        description:
            "Priez, chantez, grandissez avec nous chaque dimanche."
    }
];

const HeroSlider = () => {

    const [currentIndex, setCurrentIndex] = useState(0);

    // Slide automatique
    useEffect(() => {

        const interval = setInterval(() => {

            setCurrentIndex((prev) =>
                (prev + 1) % slides.length
            );

        }, 6000);

        return () => clearInterval(interval);

    }, []);

    // Slide précédent
    const prevSlide = () => {
        setCurrentIndex(
            (currentIndex - 1 + slides.length) % slides.length
        );
    };

    // Slide suivant
    const nextSlide = () => {
        setCurrentIndex(
            (currentIndex + 1) % slides.length
        );
    };

    return (
        <div className="hero">

            <div className="hero-slider">

                {slides.map((slide, index) => (

                    <div
                        key={index}
                        className={`slide ${
                            index === currentIndex ? 'active' : ''
                        }`}
                        style={{
                            backgroundImage:
                                `linear-gradient(
                                    rgba(0,0,0,0.5),
                                    rgba(0,0,0,0.6)
                                ),
                                url(${slide.image})`
                        }}
                    >

                        <div className="hero-content">
                            <h2>{slide.title}</h2>
                            <p>{slide.description}</p>
                        </div>

                    </div>

                ))}

            </div>

            {/* Bouton gauche */}
            <button className="slider-btn prev" onClick={prevSlide}>
                ←
            </button>

            {/* Bouton droite */}
            <button className="slider-btn next" onClick={nextSlide}>
                →
            </button>

            {/* Points */}
            <div className="slider-dots">

                {slides.map((_, index) => (

                    <span
                        key={index}
                        className={`dot ${
                            index === currentIndex ? 'active' : ''
                        }`}
                        onClick={() => setCurrentIndex(index)}
                    ></span>

                ))}

            </div>

        </div>
    );
};

export default HeroSlider;