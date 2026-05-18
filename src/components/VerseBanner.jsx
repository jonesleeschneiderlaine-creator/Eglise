import React, { useState, useEffect } from 'react';
import './VerseBanner.css';

const verses = [
    { icon: "fas fa-cross", text: "Dieu aime celui qui donne avec joie — 2 Corinthiens 9:7" },
    { icon: "fas fa-heart", text: "Car c'est par la grâce que vous êtes sauvés — Éphésiens 2:8" },
    { icon: "fas fa-dove", text: "Donnez, et l'on vous donnera — Luc 6:38" },
    { icon: "fas fa-pray", text: "Que chacun donne comme il l'a décidé en son cœur — 2 Corinthiens 9:7" }
];

const VerseBanner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % verses.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="verse-banner">
            {verses.map((verse, index) => (
                <div key={index} className={`verse-slide ${index === currentIndex ? 'active' : ''}`}>
                    <i className={verse.icon}></i> "{verse.text}"
                </div>
            ))}
        </div>
    );
};

export default VerseBanner;