import React from 'react';
import heroImage from '../assets/hero.jpg'; // Replace with your uploaded image

const HeroSection = () => (
  <header className="hero">
    <img src={heroImage} alt="Sharmen Banner" className="hero-img" />
    <h1>Sharmen Project</h1>
    <p>Feel the Melody. Live the Vibe.</p>
    <div className="contacts">
      <p>📞 +254 704 322 434</p>
      <p>🎥 YouTube: @shammelody</p>
      <p>📲 TikTok & Facebook: @shammelody</p>
    </div>
  </header>
);

export default HeroSection;
