import { memo, useMemo } from "react"

export const Footer = memo(function Footer() {
  // Memoize the year — no need to call new Date() on every re-render
  const currentYear = useMemo(() => new Date().getFullYear(), [])

  return (
    // All CSS classes are defined in index.css — no more inline <style> injection per render
    <footer className="site-footer mt-20">

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
          <a href="/" className="site-footer__brand" aria-label="FlatBase home">
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
})
