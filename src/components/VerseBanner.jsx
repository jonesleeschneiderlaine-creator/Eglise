import React, { useState, useEffect } from 'react';
import './styles/VerseBanner.css';

const verses = [
    {  text: "Dieu aime celui qui donne avec joie — 2 Corinthiens 9:7" },
  
];

const VerseBanner = () => {
    

    return (
        <div className="verse-banner">
           <p>Verset du jour: {verses[0].text}</p>
        </div>
    );
};

export default VerseBanner;