import React from 'react';
import HeroWaveCanvas from './HeroWaveCanvas';
import { portfolioData } from '../data/portfolioData';
import { Mail, ArrowUpRight, ChevronDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon, DownloadIcon } from './Icons';

export default function Hero({ data, contactData }) {
  const personal = {
    ...portfolioData.personal,
    ...(data || {}),
    socials: {
      ...portfolioData.personal.socials,
      ...(contactData || {}),
      ...(data?.socials || {}),
    },
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'var(--nav-height)',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      {/* 3D Animated Ribbon Wave Canvas (Layered Behind Content) */}
      <HeroWaveCanvas />

      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          paddingTop: '40px',
          paddingBottom: '60px',
        }}
      >
        <div
          style={{
            maxWidth: '680px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
          className="hero-content"
        >
          {/* Social Icons row & Profile Image */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              flexWrap: 'wrap',
            }}
          >
            {/* Circular Profile Photograph */}
            <div
              style={{
                position: 'relative',
                width: '144px',
                height: '144px',
                borderRadius: '50%',
                padding: '3px',
                background: 'linear-gradient(135deg, #8B00FF, #E000FF)',
                boxShadow: '0 8px 32px rgba(139, 0, 255, 0.35)',
              }}
            >
              <img
                src={personal.profileImage}
                alt={personal.name}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  display: 'block',
                  backgroundColor: '#16181F',
                }}
              />
            </div>

            {/* Social Icons Header (Matches Reference: GitHub & LinkedIn above name) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <a
                  href={personal.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub Profile"
                  title="GitHub"
                  style={{
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-subtle)',
                    transition: 'transform var(--transition-fast), background-color var(--transition-fast), color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.backgroundColor = 'rgba(139, 0, 255, 0.15)';
                    e.currentTarget.style.borderColor = 'var(--accent-purple)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  }}
                >
                  <GithubIcon size={20} />
                </a>

                <a
                  href={personal.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn"
                  style={{
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-subtle)',
                    transition: 'transform var(--transition-fast), background-color var(--transition-fast), color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.backgroundColor = 'rgba(139, 0, 255, 0.15)';
                    e.currentTarget.style.borderColor = 'var(--accent-purple)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  }}
                >
                  <LinkedinIcon size={20} />
                </a>

                <a
                  href={`mailto:${personal.socials.email}`}
                  aria-label="Direct Email"
                  title="Email"
                  style={{
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-subtle)',
                    transition: 'transform var(--transition-fast), background-color var(--transition-fast), color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.backgroundColor = 'rgba(139, 0, 255, 0.15)';
                    e.currentTarget.style.borderColor = 'var(--accent-purple)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  }}
                >
                  <Mail size={20} />
                </a>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
                AVAILABLE FOR OPPORTUNITIES
              </span>
            </div>
          </div>

          {/* Main Heading: Hitesh Kumar */}
          <div>
            <h1
              style={{
                fontSize: 'clamp(2.8rem, 6.5vw, 4.6rem)',
                fontWeight: 700,
                letterSpacing: '-0.035em',
                lineHeight: 1.05,
                color: 'var(--text-primary)',
                marginBottom: '8px',
              }}
            >
              {personal.name}
            </h1>
            <h2
              style={{
                fontSize: 'clamp(1.25rem, 2.4vw, 1.85rem)',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                letterSpacing: '-0.015em',
              }}
            >
              {personal.role}
            </h2>
          </div>

          {/* Introduction Paragraph */}
          <p
            style={{
              fontSize: 'clamp(1rem, 1.25vw, 1.15rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              maxWidth: '580px',
            }}
          >
            {personal.bio}
          </p>

          {/* CTAs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              marginTop: '12px',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="btn-primary"
            >
              Explore My Projects
              <ArrowUpRight size={18} />
            </button>
            <a
              href={personal.resumeUrl || '/Hitesh_Kumar_Resume.pdf'}
              download="Hitesh_Kumar_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              id="hero-resume-download"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
              }}
            >
              <DownloadIcon size={16} />
              <span>Download Resume</span>
            </a>
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-secondary"
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <button
        onClick={() => scrollToSection('expertise')}
        aria-label="Scroll to Expertise section"
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'var(--text-muted)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.75rem',
          zIndex: 3,
          cursor: 'pointer',
          transition: 'color var(--transition-fast)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-purple)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
      >
        <span>SCROLL</span>
        <ChevronDown size={18} style={{ animation: 'bounce 2s infinite' }} />
      </button>

      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(6px); }
          60% { transform: translateY(3px); }
        }
      `}</style>
    </section>
  );
}
