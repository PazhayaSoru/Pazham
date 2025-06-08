import React from "react";
import "./HomeHeroSection.css"; // adjust path as needed
import heroImage from '../../assets/heroImage.webp'  // adjust path as needed
const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-left">
         <img src={heroImage} alt="Finance illustration" className="hero-image" />
      </div>
      <div className="hero-right">
        <h1>Welcome to <span className="pazham-hero">Pazham.</span></h1>
        <p>Your Personal Finance Assistant.</p>
        <div className="hero-buttons">
          <button className="cta-button primary">Get Started</button>
          <button className="cta-button secondary">Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
