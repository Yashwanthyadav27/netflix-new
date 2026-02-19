import React from 'react';

const Hero = () => {
  const handlePlay = () => {
    alert('Playing Stranger Things...');
  };

  return (
    <section className="hero">
      <div className="hero-background">
        <img 
          src="/stranger things.jpg" 
          alt="Stranger Things" 
        />
        <div className="hero-gradient"></div>
      </div>
      <div className="hero-content">
        <div className="hero-badge">
          <span className="netflix-series-badge">
          </span>
        </div>
        <div className="stranger-things-logo-container">
          <div className="st-line st-stranger">STRANGER</div>
          <div className="st-line st-things">THINGS</div>
        </div>
        <div className="hero-meta">
          <span className="match-badge">98% Match</span>
          <span className="year">2022</span>
          <span className="maturity">U/A 16+</span>
          <span className="seasons">4 Seasons</span>
          <span className="quality">HD</span>
        </div>
        <p className="hero-description">
          When a young boy vanishes, a small town uncovers a mystery involving secret experiments, 
          terrifying supernatural forces and one strange little girl.
        </p>
        <div className="hero-starring">
          <span className="starring-label">Starring:</span> Winona Ryder, David Harbour, Millie Bobby Brown
        </div>
        <div className="hero-creators">
          <span className="creators-label">Creators:</span> The Duffer Brothers
        </div>
        <div className="hero-buttons">
          <button className="btn btn-play" onClick={handlePlay}>
            <span className="btn-icon">▶</span> Play
          </button>
          <button className="btn btn-info">
            <span className="btn-icon">ℹ</span> More Info
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
