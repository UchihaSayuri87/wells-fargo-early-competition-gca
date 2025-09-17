import React from 'react';
import './App.css';

// Navigation bar for main sections
function NavBar() {
  return (
    <nav className="wf-navbar">
      <ul>
        <li><a href="#intro">Home</a></li>
        <li><a href="#partners">Partners</a></li>
        <li><a href="mailto:innovation@wellsfargo.com">Contact</a></li>
      </ul>
    </nav>
  );
}

// Header: Wells Fargo logo and title
function Header() {
  return (
    <header className="wf-header">
      <div className="wf-header-content">
        <img
          src="/wells-fargo-logo.png"
          alt="Wells Fargo Logo"
          className="wf-logo"
        />
        <h1>Wells Fargo Innovation Challenge</h1>
      </div>
    </header>
  );
}

// Introduction section with call-to-action buttons
function IntroSection() {
  return (
    <section className="wf-intro" id="intro">
      <h2>Empowering the Future of Financial Services</h2>
      <p>
        Wells Fargo is committed to fostering innovation and excellence in financial technology. Join us as we collaborate to create impactful solutions that shape the future of banking.
      </p>
      <Actions />
    </section>
  );
}

// Action buttons for intro section
function Actions() {
  // Smooth scroll to partners section
  const handleLearnMore = () => {
    const partnersSection = document.getElementById('partners');
    if (partnersSection) {
      partnersSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open mail client for contact
  const handleContact = () => {
    window.location.href = 'mailto:innovation@wellsfargo.com?subject=Innovation%20Challenge%20Inquiry';
  };

  return (
    <div className="wf-actions">
      <button
        className="wf-btn"
        aria-label="Learn more about the challenge"
        onClick={handleLearnMore}
      >
        Learn More
      </button>
      <button
        className="wf-btn wf-btn-secondary"
        aria-label="Contact Wells Fargo"
        onClick={handleContact}
      >
        Contact Us
      </button>
    </div>
  );
}

// Partners section with logos and links
function PartnersSection() {
  const partners = [
    {
      name: 'Partner Example',
      logo: '/wells-fargo-logo.png',
      url: 'https://www.wellsfargo.com/',
    },
    // ...add more partners as needed...
  ];

  return (
    <section className="wf-partners" id="partners">
      <h3>Our Partners</h3>
      <div className="wf-partner-logos">
        {partners.map((partner, idx) => (
          <a
            key={idx}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={partner.name}
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="wf-partner-logo"
            />
          </a>
        ))}
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="wf-footer">
      &copy; {new Date().getFullYear()} Wells Fargo. All rights reserved.
    </footer>
  );
}

// Main App
function App() {
  return (
    <div className="wf-container">
      <NavBar />
      <Header />
      <main className="wf-main">
        <IntroSection />
        <PartnersSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;