import React, { useRef, useState, useEffect, createContext, useContext } from 'react';
import './App.css';
// import { motion } from 'framer-motion'; // Uncomment if using Framer Motion
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// --- Language Context ---
const LangContext = createContext();
const translations = {
  en: {
    skip: "Skip to main content",
    testimonials: "What Our Partners Say",
    team: "Meet the Team",
    clients: "Our Clients & Partners",
    contact: "Contact",
    feedback: "Feedback",
    print: "Print Proposal",
    sitemap: "Sitemap",
    notfound: "Page Not Found",
    backhome: "Back to Home"
  },
  es: {
    skip: "Saltar al contenido principal",
    testimonials: "Lo que dicen nuestros socios",
    team: "Conoce al equipo",
    clients: "Nuestros clientes y socios",
    contact: "Contacto",
    feedback: "Comentarios",
    print: "Imprimir propuesta",
    sitemap: "Mapa del sitio",
    notfound: "Página no encontrada",
    backhome: "Volver al inicio"
  },
  fr: {
    skip: "Aller au contenu principal",
    testimonials: "Ce que disent nos partenaires",
    team: "Rencontrez l'équipe",
    clients: "Nos clients et partenaires",
    contact: "Contact",
    feedback: "Retour",
    print: "Imprimer la proposition",
    sitemap: "Plan du site",
    notfound: "Page non trouvée",
    backhome: "Retour à l'accueil"
  },
  ja: {
    skip: "メインコンテンツへスキップ",
    testimonials: "パートナーの声",
    team: "チーム紹介",
    clients: "クライアントとパートナー",
    contact: "お問い合わせ",
    feedback: "フィードバック",
    print: "提案書を印刷",
    sitemap: "サイトマップ",
    notfound: "ページが見つかりません",
    backhome: "ホームに戻る"
  },
  zh: {
    skip: "跳到主要内容",
    testimonials: "合作伙伴评价",
    team: "团队介绍",
    clients: "我们的客户与合作伙伴",
    contact: "联系",
    feedback: "反馈",
    print: "打印提案",
    sitemap: "网站地图",
    notfound: "页面未找到",
    backhome: "返回首页"
  }
};
function useLang() {
  return useContext(LangContext);
}
function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const langs = [
    { code: 'en', label: 'EN', native: 'English' },
    { code: 'es', label: 'ES', native: 'Español' },
    { code: 'fr', label: 'FR', native: 'Français' },
    { code: 'ja', label: '日本語', native: '日本語' },
    { code: 'zh', label: '中文', native: '中文' }
  ];
  return (
    <nav aria-label="Language switcher" className="wf-lang-switcher">
      {langs.map(l => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          aria-label={`Switch to ${l.native}`}
          lang={l.code}
          disabled={lang === l.code}
        >
          {l.label}
        </button>
      ))}
    </nav>
  );
}

// --- Skip Link ---
function SkipLink() {
  const { lang } = useLang();
  return (
    <a href="#main-content" className="wf-skip-link">
      {translations[lang].skip}
    </a>
  );
}

// --- Progress Bar ---
function ProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = (window.scrollY / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(scrolled);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: `${progress}%`, height: 4,
      background: 'linear-gradient(90deg,#c40404,#ffcc00)', zIndex: 2000, transition: 'width 0.2s'
    }} aria-hidden="true" />
  );
}

// --- Print Button ---
function PrintButton() {
  const { lang } = useLang();
  return (
    <button className="wf-btn wf-btn-secondary" style={{position:'fixed',bottom:'1.5rem',right:'1.5rem',zIndex:1000}}
      onClick={() => window.print()} aria-label={translations[lang].print}>
      🖨️ {translations[lang].print}
    </button>
  );
}

// --- Feedback Widget ---
function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);
  const { lang } = useLang();
  return (
    <div style={{position:'fixed',bottom:'1.5rem',left:'1.5rem',zIndex:1000}}>
      <button className="wf-btn" aria-label={translations[lang].feedback} onClick={() => setOpen(o=>!o)}>
        💬 {translations[lang].feedback}
      </button>
      {open && (
        <form className="wf-card" style={{marginTop:'0.5rem',minWidth:220}} onSubmit={e=>{
          e.preventDefault(); setSent(true); setTimeout(()=>{setOpen(false);setSent(false);setMsg('');},1500);
        }}>
          <label htmlFor="wf-feedback" style={{fontWeight:600}}>Your feedback:</label>
          <textarea id="wf-feedback" rows={3} value={msg} onChange={e=>setMsg(e.target.value)} required style={{width:'100%',margin:'0.5em 0'}} />
          <button className="wf-btn" type="submit" disabled={sent || !msg.trim()}>{sent ? "Sent!" : "Send"}</button>
        </form>
      )}
    </div>
  );
}

// --- Sitemap Link ---
function SitemapLink() {
  const { lang } = useLang();
  return (
    <a href="/sitemap.xml" className="wf-btn wf-btn-secondary" style={{marginLeft:'1rem'}} target="_blank" rel="noopener noreferrer">
      {translations[lang].sitemap}
    </a>
  );
}

// --- 404 Page ---
function NotFound() {
  const { lang } = useLang();
  return (
    <div className="wf-main" style={{textAlign:'center',padding:'4rem 1rem'}}>
      <h2>404 - {translations[lang].notfound}</h2>
      <Link to="/" className="wf-btn">{translations[lang].backhome}</Link>
    </div>
  );
}

// --- Section Animation Wrapper (Framer Motion or fallback) ---
function Section({ children }) {
  // Uncomment below if using Framer Motion
  // return <motion.section initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.6}}>{children}</motion.section>;
  return <section style={{transition:'opacity 0.6s, transform 0.6s'}}>{children}</section>;
}

// --- Contact Form with Validation and ARIA errors ---
function ContactForm() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const { lang } = useLang();
  function validate(e) {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email.');
      e.preventDefault();
      return false;
    }
    setError('');
    setSent(true);
    setTimeout(() => { setSent(false); setEmail(''); setMsg(''); }, 1500);
    e.preventDefault();
    return true;
  }
  return (
    <form className="wf-card" style={{maxWidth:400,margin:'2rem auto'}} onSubmit={validate} aria-label="Contact form">
      <label htmlFor="contact-email" style={{fontWeight:600}}>Email</label>
      <input id="contact-email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required
        aria-invalid={!!error} aria-describedby={error ? "contact-email-error" : undefined}
        style={{width:'100%',margin:'0.5em 0'}} />
      {error && <div id="contact-email-error" style={{color:'#c40404'}} role="alert">{error}</div>}
      <label htmlFor="contact-msg" style={{fontWeight:600}}>Message</label>
      <textarea id="contact-msg" rows={3} value={msg} onChange={e=>setMsg(e.target.value)} style={{width:'100%',margin:'0.5em 0'}} />
      <button className="wf-btn" type="submit" disabled={sent}>{sent ? "Sent!" : "Send"}</button>
    </form>
  );
}

// --- Main App ---
function App() {
  const [lang, setLang] = useState('en');
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <Router>
        <SkipLink />
        <LanguageSwitcher />
        <ProgressBar />
        <PrintButton />
        <FeedbackWidget />
        <div className="wf-container">
          <header className="wf-header">
            <div className="wf-header-content">
              <img src="/wells-fargo-logo.png" alt="Wells Fargo Logo" className="wf-logo" />
              <h1>Wells Fargo Innovation Challenge</h1>
            </div>
          </header>
          <Routes>
            <Route path="/" element={
              <main className="wf-main" id="main-content">
                <Section><IntroSection /></Section>
                <hr className="wf-section-divider" />
                <Section><Carousel /></Section>
                <hr className="wf-section-divider" />
                <Section><Testimonials /></Section>
                <hr className="wf-section-divider" />
                <Section><Team /></Section>
                <hr className="wf-section-divider" />
                <Section><PartnersSection /></Section>
                <hr className="wf-section-divider" />
                <Section><ContactForm /></Section>
              </main>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <footer className="wf-footer">
            <SocialLinks />
            &copy; {new Date().getFullYear()} Wells Fargo. All rights reserved.
            <SitemapLink />
          </footer>
        </div>
      </Router>
    </LangContext.Provider>
  );
}

// Skip to main content for accessibility
function SkipLink() {
  return (
    <a href="#main-content" className="wf-skip-link">
      Skip to main content
    </a>
  );
}

// Dark mode toggle
function DarkModeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      className="wf-btn wf-dark-toggle"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setDarkMode(dm => !dm)}
    >
      {darkMode ? "🌞 Light" : "🌙 Dark"}
    </button>
  );
}

// Cookie consent banner
function CookieConsent() {
  const [show, setShow] = useState(() => !localStorage.getItem('wf-cookie-consent'));
  if (!show) return null;
  return (
    <div className="wf-cookie-banner" role="dialog" aria-live="polite">
      <span>
        This site uses cookies for analytics and improved experience. See our <a href="#">privacy policy</a>.
      </span>
      <button className="wf-btn wf-btn-secondary" onClick={() => {
        localStorage.setItem('wf-cookie-consent', '1');
        setShow(false);
      }}>Accept</button>
    </div>
  );
}

// Social media links
function SocialLinks() {
  return (
    <div className="wf-social-links" aria-label="Wells Fargo Social Media">
      <a href="https://twitter.com/wellsfargo" aria-label="Twitter" target="_blank" rel="noopener noreferrer">🐦</a>
      <a href="https://linkedin.com/company/wellsfargo" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">💼</a>
      <a href="https://facebook.com/wellsfargo" aria-label="Facebook" target="_blank" rel="noopener noreferrer">📘</a>
    </div>
  );
}

// Loading skeleton for testimonials/team
function Skeleton({ width = "100%", height = "1.2em" }) {
  return <div className="wf-skeleton" style={{ width, height }} aria-hidden="true"></div>;
}

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

// Testimonials Section with loading skeleton
function Testimonials() {
  const [loading, setLoading] = useState(true);
  const testimonials = [
    {
      quote: "Wells Fargo's innovation challenge helped us rethink our digital strategy.",
      author: "Jane Doe",
      role: "VP, Digital Banking",
      company: "Acme Corp"
    },
    {
      quote: "The collaboration and support from the Wells Fargo team was outstanding.",
      author: "John Smith",
      role: "CTO",
      company: "FinTech Solutions"
    }
  ];
  useEffect(() => { const t = setTimeout(() => setLoading(false), 800); return () => clearTimeout(t); }, []);
  return (
    <section className="wf-testimonials" aria-label="Testimonials">
      <h2>What Our Partners Say</h2>
      {loading
        ? [1, 2].map(i => (
            <div key={i} className="wf-testimonial">
              <Skeleton width="80%" /><Skeleton width="40%" />
            </div>
          ))
        : testimonials.map((t, i) => (
            <div key={i} className="wf-testimonial">
              <blockquote className="wf-testimonial-quote">"{t.quote}"</blockquote>
              <div className="wf-testimonial-author">{t.author}</div>
              <div className="wf-testimonial-role">{t.role}, {t.company}</div>
            </div>
          ))}
    </section>
  );
}

// Team Section with loading skeleton
function Team() {
  const [loading, setLoading] = useState(true);
  const team = [
    {
      name: "Alice Johnson",
      role: "Project Lead",
      photo: "/wells-fargo-logo.png",
      linkedin: "https://linkedin.com/in/alicejohnson"
    },
    {
      name: "Bob Lee",
      role: "Lead Developer",
      photo: "/wells-fargo-logo.png",
      linkedin: "https://linkedin.com/in/boblee"
    },
    {
      name: "Maria Garcia",
      role: "UX Designer",
      photo: "/wells-fargo-logo.png",
      linkedin: "https://linkedin.com/in/mariagarcia"
    }
  ];
  useEffect(() => { const t = setTimeout(() => setLoading(false), 800); return () => clearTimeout(t); }, []);
  return (
    <section className="wf-team" aria-label="Team">
      <h2>Meet the Team</h2>
      <div className="wf-team-list">
        {loading
          ? [1, 2, 3].map(i => (
              <div className="wf-team-member" key={i}>
                <Skeleton width="80px" height="80px" />
                <Skeleton width="60%" />
                <Skeleton width="40%" />
                <Skeleton width="40%" />
              </div>
            ))
          : team.map((member, i) => (
              <div className="wf-team-member" key={i}>
                <img src={member.photo} alt={member.name} className="wf-team-photo" loading="lazy" />
                <div className="wf-team-name">{member.name}</div>
                <div className="wf-team-role">{member.role}</div>
                <a
                  href={member.linkedin}
                  className="wf-team-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`LinkedIn profile of ${member.name}`}
                >
                  LinkedIn
                </a>
              </div>
            ))}
      </div>
    </section>
  );
}

// Carousel Section (Partners/Clients)
function Carousel() {
  const carouselRef = useRef(null);
  const partners = [
    { name: "Acme Corp", logo: "/wells-fargo-logo.png" },
    { name: "FinTech Solutions", logo: "/wells-fargo-logo.png" },
    { name: "NextGen Bank", logo: "/wells-fargo-logo.png" },
    { name: "SecurePay", logo: "/wells-fargo-logo.png" },
    { name: "CloudBank", logo: "/wells-fargo-logo.png" }
  ];
  const scroll = (dir) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: dir * 200, behavior: 'smooth' });
    }
  };
  return (
    <section className="wf-carousel" aria-label="Partners Carousel">
      <h2>Our Clients & Partners</h2>
      <button
        className="wf-carousel-arrow left"
        aria-label="Scroll left"
        onClick={() => scroll(-1)}
        type="button"
      >&larr;</button>
      <div className="wf-carousel-track" ref={carouselRef} tabIndex={0} aria-label="Partner logos">
        {partners.map((p, i) => (
          <div className="wf-carousel-item" key={i}>
            <img src={p.logo} alt={p.name} loading="lazy" />
            <span>{p.name}</span>
          </div>
        ))}
      </div>
      <button
        className="wf-carousel-arrow right"
        aria-label="Scroll right"
        onClick={() => scroll(1)}
        type="button"
      >&rarr;</button>
    </section>
  );
}
