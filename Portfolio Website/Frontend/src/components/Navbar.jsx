import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { DownloadIcon } from './Icons';

export default function Navbar({ theme, onToggleTheme, resumeUrl = '/Hitesh_Kumar_Resume.pdf' }) {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navLinks = [
    { name: 'Expertise', href: '#expertise' },
    { name: 'History', href: '#journey' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  // Monitor scroll for active section & progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      const winHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (winHeight > 0) {
        setScrollProgress((scrollY / winHeight) * 100);
      }

      // Check current section
      const sections = ['hero', 'expertise', 'journey', 'projects', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const navOffset = 70;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '2px',
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #8B00FF 0%, #E000FF 100%)',
          zIndex: 1001,
          transition: 'width 0.1s ease-out',
        }}
      />

      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 'var(--nav-height)',
          backgroundColor: scrolled ? 'var(--bg-nav)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
          zIndex: 1000,
          transition: 'background-color var(--transition-fast), border-color var(--transition-fast)',
        }}
      >
        <div
          className="container"
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Left: Minimal Theme Toggle (Matching Reference) */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle Dark and Light theme"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              color: 'var(--text-primary)',
              transition: 'transform var(--transition-fast), color var(--transition-fast), background-color var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {theme === 'dark' ? (
              <Sun size={20} strokeWidth={2.2} />
            ) : (
              <Moon size={20} strokeWidth={2.2} />
            )}
          </button>

          {/* Right: Desktop Navigation Links (Expertise, History, Projects, Contact) */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '32px',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const linkId = link.href.replace('#', '');
              const isActive = activeSection === linkId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  style={{
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontWeight: isActive ? '600' : '500',
                    fontSize: '0.95rem',
                    position: 'relative',
                    padding: '8px 0',
                    transition: 'color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  {link.name}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: 'linear-gradient(90deg, #8B00FF, #E000FF)',
                        borderRadius: '2px',
                      }}
                    />
                  )}
                </a>
              );
            })}

            {/* Resume Download Button */}
            {/* <a
              href={resumeUrl || '/Hitesh_Kumar_Resume.pdf'}
              download="Hitesh_Kumar_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              id="navbar-resume-download"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '7px 16px',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#FFFFFF',
                background: 'linear-gradient(135deg, rgba(139, 0, 255, 0.85) 0%, rgba(224, 0, 255, 0.85) 100%)',
                boxShadow: '0 2px 10px rgba(139, 0, 255, 0.25)',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(139, 0, 255, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(139, 0, 255, 0.25)';
              }}
            >
              <DownloadIcon size={15} color="#FFFFFF" />
              <span>Resume</span>
            </a> */}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            aria-label="Toggle navigation menu"
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '42px',
              height: '42px',
              borderRadius: '8px',
              color: 'var(--text-primary)',
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: 'var(--nav-height)',
            backgroundColor: 'var(--bg-primary)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            padding: '36px 24px',
            gap: '24px',
            borderTop: '1px solid var(--border-subtle)',
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              style={{
                fontSize: '1.4rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                padding: '12px 0',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              {link.name}
            </a>
          ))}

          {/* Mobile Drawer Resume Download */}
          <a
            href={resumeUrl || '/Hitesh_Kumar_Resume.pdf'}
            download="Hitesh_Kumar_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            id="mobile-resume-download"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '12px 20px',
              borderRadius: '10px',
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#FFFFFF',
              background: 'linear-gradient(135deg, #8B00FF 0%, #E000FF 100%)',
              textDecoration: 'none',
              marginTop: '12px',
              boxShadow: '0 4px 14px rgba(139, 0, 255, 0.35)',
            }}
          >
            <DownloadIcon size={18} color="#FFFFFF" />
            <span>Download Resume</span>
          </a>
        </div>
      )}

      {/* Responsive media query helper for Navbar */}
      <style>{`
        @media (min-width: 769px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
