"use client";


export function PageHeader() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="page-header">
      <div className="header-content">
        <h1 className="page-title">
          <span className="sparkle">✨</span>
          Ethereum Real Time Dashboard
          <span className="sparkle">✨</span>
        </h1>
        
        <nav className="page-nav">
          <button onClick={() => scrollToSection('latest-blocks')} className="nav-button">
            Latest Blocks
          </button>
          <button onClick={() => scrollToSection('volume-chart')} className="nav-button">
            USDT Volume & Network Metrics
          </button>
        </nav>
      </div>
    </header>
  );
} 