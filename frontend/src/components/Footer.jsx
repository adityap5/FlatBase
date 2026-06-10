"use client"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer mt-20">
      <style>{`
        :root {
          --hero-max-width: 1820px;
        }

        .site-footer {
          position: relative;
          z-index: 100;
          overflow: hidden;
          background: #000000;
          color: #ffffff;
          font-family: "Geist", "Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          -webkit-font-smoothing: antialiased;
          text-rendering: geometricPrecision;
          width: 100%;
        }

        .site-footer a {
          color: inherit;
          text-decoration: none;
        }

        .footer-dots {
          position: relative;
          height: 120px;
          overflow: hidden;
          background: #000000;
        }

        .footer-dots__line {
          position: absolute;
          left: 0;
          top: 50%;
          width: 200%;
          height: 70px;
          opacity: 0.75;
          transform: translateY(-50%);
          background-image: 
            radial-gradient(circle, rgba(255, 255, 255, 0.55) 1.5px, transparent 2px),
            radial-gradient(circle, rgba(255, 255, 255, 0.35) 1px, transparent 1.5px),
            radial-gradient(circle, rgba(255, 255, 255, 0.45) 1.2px, transparent 1.8px);
          background-position: 0 8px, 24px 22px, 48px 14px;
          background-size: 72px 38px, 110px 44px, 160px 52px;
          animation: footerDotsMove 18s linear infinite;
        }

        @keyframes footerDotsMove {
          from { transform: translate3d(0, -50%, 0); }
          to   { transform: translate3d(-50%, -50%, 0); }
        }

        .site-footer__inner {
          width: min(100% - 96px, var(--hero-max-width));
          margin: 0 auto;
          padding: clamp(34px, 4vw, 66px) 0 clamp(18px, 2vw, 34px);
          box-sizing: border-box;
        }

        .site-footer__top {
          display: grid;
          grid-template-columns: minmax(320px, 1.25fr) repeat(3, minmax(150px, 0.42fr));
          gap: clamp(28px, 4vw, 76px);
          min-height: clamp(220px, 24vw, 330px);
        }

        .site-footer__heading {
          max-width: 680px;
          margin: 0;
          color: #ffffff;
          font-size: clamp(34px, 3.5vw, 62px);
          font-weight: 220;
          letter-spacing: 0;
          line-height: 1.06;
        }

        .site-footer__nav {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: clamp(14px, 1.35vw, 22px);
        }

        .site-footer__link {
          color: rgba(255, 255, 255, 0.88);
          font-size: 16px;
          font-weight: 650;
          line-height: 1.1;
          transition: color 180ms ease, transform 180ms ease;
        }

        .site-footer__link:hover {
          color: #ffffff;
          transform: translateX(3px);
        }

        .site-footer__brand-row {
          width: 100%;
          margin-top: clamp(18px, 3vw, 46px);
        }

        .site-footer__brand {
          display: flex;
          align-items: center;
          width: 100%;
          color: #ffffff;
        }

        .site-footer__mark {
          position: relative;
          flex: 0 0 clamp(58px, 6.1vw, 118px);
          aspect-ratio: 1;
          margin-right: clamp(14px, 1.6vw, 28px);
          overflow: hidden;
          border-radius: 50%;
          background: #ffffff;
        }

        .site-footer__mark::before {
          content: '';
          position: absolute;
          inset: -18%;
          background: #000000;
          clip-path: polygon(0 20%, 100% 8%, 100% 19%, 0 31%, 0 43%, 100 31%, 100% 42%, 0 54%, 0 66%, 100% 54%, 100% 65%, 0 77%);
        }

        /* Standard correction in case clip-path fails or has syntax errors */
        .site-footer__mark::before {
          clip-path: polygon(0% 20%, 100% 8%, 100% 19%, 0% 31%, 0% 43%, 100% 31%, 100% 42%, 0% 54%, 0% 66%, 100% 54%, 100% 65%, 0% 77%);
        }

        .site-footer__wordmark {
          display: block;
          flex: 1 1 auto;
          min-width: 0;
          font-size: clamp(58px, 11.1vw, 214px);
          font-weight: 760;
          letter-spacing: -0.055em;
          line-height: 0.78;
          white-space: nowrap;
        }

        .site-footer__legal {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: flex-start;
          gap: 8px 18px;
          margin-top: clamp(14px, 1.4vw, 24px);
          color: rgba(255, 255, 255, 0.52);
          font-size: 9px;
          line-height: 1.35;
        }

        @media (max-width: 980px) {
          .site-footer__inner {
            width: min(100% - 48px, var(--hero-max-width));
          }
          .site-footer__top {
            grid-template-columns: 1fr 1fr;
          }
          .site-footer__heading {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 560px) {
          .site-footer__inner {
            width: min(100% - 32px, var(--hero-max-width));
          }
          .site-footer__top {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .site-footer__link {
            font-size: 15px;
          }
          .site-footer__mark {
            flex-basis: clamp(38px, 12vw, 58px);
          }
          .site-footer__wordmark {
            font-size: clamp(45px, 18vw, 84px);
          }
        }
      `}</style>

      {/* DECORATIVE DOTS BAND */}
      <div className="footer-dots" aria-hidden="true">
        <div className="footer-dots__line" />
      </div>

      <div className="site-footer__inner">
        {/* TOP NAV GRID */}
        <div className="site-footer__top">
          <h2 className="site-footer__heading">
          Curated escapes for the modern collector.
          </h2>

          <nav className="site-footer__nav" aria-label="Footer navigation">
            <a href="#company" className="site-footer__link">Company</a>
            <a href="#technology" className="site-footer__link">Technology</a>
            <a href="#solutions" className="site-footer__link">Solutions</a>
            <a href="#our-edge" className="site-footer__link">Our Edge</a>
            <a href="#investors" className="site-footer__link">Investors</a>
          </nav>

          <nav className="site-footer__nav" aria-label="Company links">
            <a href="#our-team" className="site-footer__link">Our Team</a>
            <a href="#news" className="site-footer__link">News</a>
            <a href="#careers" className="site-footer__link">Careers</a>
            <a href="#contact" className="site-footer__link">Contact Us</a>
          </nav>

          <nav className="site-footer__nav" aria-label="Social links">
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="site-footer__link">LinkedIn</a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="site-footer__link">Follow Us on X</a>
          </nav>
        </div>

        {/* BRAND ROW */}
        <div className="site-footer__brand-row">
          <a href="/" className="site-footer__brand" aria-label="EngineTech home">
            <span className="site-footer__mark" aria-hidden="true" />
            <span className="site-footer__wordmark">FlatBase</span>
          </a>
        </div>

        {/* LEGAL LINE */}
        <div className="site-footer__legal">
          <span>&copy; {currentYear} FlatBase. All rights reserved.</span>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}
