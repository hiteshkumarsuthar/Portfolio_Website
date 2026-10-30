import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Mail, ArrowUp, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon, FileTextIcon } from './Icons';

export default function Footer({ profileData: prof, contactData: cont }) {
  const personal = {
    ...portfolioData.personal,
    ...(prof || {}),
    socials: {
      ...portfolioData.personal.socials,
      ...(cont || {}),
      ...(prof?.socials || {}),
    },
  };
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer
      style={{
        padding: '60px 24px 80px 24px',
        backgroundColor: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        position: 'relative',
      }}
    >
      {/* Social Icons matching Screenshot 1 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <a
          href={personal.socials.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          style={{
            color: 'var(--text-primary)',
            transition: 'transform var(--transition-fast), color var(--transition-fast)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.color = 'var(--accent-magenta)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
        >
          <GithubIcon size={22} />
        </a>

        <a
          href={personal.socials.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          style={{
            color: 'var(--text-primary)',
            transition: 'transform var(--transition-fast), color var(--transition-fast)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.color = 'var(--accent-magenta)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
        >
          <LinkedinIcon size={22} />
        </a>

        <a
          href={`mailto:${personal.socials.email}`}
          aria-label="Email"
          style={{
            color: 'var(--text-primary)',
            transition: 'transform var(--transition-fast), color var(--transition-fast)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.color = 'var(--accent-magenta)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
        >
          <Mail size={22} />
        </a>

        <a
          href={personal.resumeUrl || '/Hitesh_Kumar_Resume.pdf'}
          download="Hitesh_Kumar_Resume.pdf"
          target="_blank"
          rel="noreferrer"
          aria-label="Download Resume"
          title="Download Resume (PDF)"
          id="footer-resume-download"
          style={{
            color: 'var(--text-primary)',
            transition: 'transform var(--transition-fast), color var(--transition-fast)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.color = 'var(--accent-magenta)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
        >
          <FileTextIcon size={22} />
        </a>
      </div>

      {/* Copyright text matching Screenshot 1: "A portfolio designed & built by Hitesh Kumar with 💜" */}
      <p
        style={{
          fontSize: '0.88rem',
          color: 'var(--text-secondary)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          textAlign: 'center',
        }}
      >
        <span>A portfolio designed &amp; built by {personal.name} with</span>
        <Heart size={14} fill="#8B00FF" color="#8B00FF" style={{ display: 'inline', verticalAlign: 'middle' }} />
      </p>

      {/* Floating Back to Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          title="Back to top"
          style={{
            position: 'fixed',
            bottom: '28px',
            right: '28px',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-subtle)',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 900,
            cursor: 'pointer',
            transition: 'transform var(--transition-fast), border-color var(--transition-fast), background-color var(--transition-fast)',
            animation: 'fadeIn 0.25s ease-out',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.borderColor = 'var(--accent-purple)';
            e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'var(--border-subtle)';
            e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
          }}
        >
          <ArrowUp size={20} />
        </button>
      )}
    </footer>
  );
}
