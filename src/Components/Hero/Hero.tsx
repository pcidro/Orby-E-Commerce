import React, { useRef } from "react";
import "../css/hero.css";

interface heroProps {
  scroll: () => void;
}

const Hero = ({ scroll }: heroProps) => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Nova Coleção 2026</h1>
        <p className="hero-subtitle">Descubra os mais novos Sneakers</p>
        <button onClick={scroll} className="hero-btn">
          Compre agora
        </button>
      </div>
    </section>
  );
};

export default Hero;
