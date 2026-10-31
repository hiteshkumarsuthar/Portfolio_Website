import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Expertise from './Expertise';
import Journey from './Journey';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';
import apiClient, { API_BASE_URL } from '../api/client';
import { portfolioData } from '../data/portfolioData';

const PORTFOLIO_CACHE_KEY = 'portfolio_db_cache';

function readCache() {
  try {
    const raw = localStorage.getItem(PORTFOLIO_CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Uploaded files may be stored with the host they were uploaded from (e.g. http://localhost:1111).
// Always resolve /uploads/... paths against the live backend instead.
function resolveUploadUrl(url) {
  if (!url || url.startsWith('data:')) return url;
  const idx = url.indexOf('/uploads/');
  return idx === -1 ? url : `${API_BASE_URL}${url.slice(idx)}`;
}

export default function PublicPortfolio({ theme, onToggleTheme }) {
  // Hydrate instantly from the last successful API response (prevents default-image flash)
  const [dbData, setDbData] = useState(() => readCache());
  const [fetchDone, setFetchDone] = useState(false);

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const res = await apiClient.get('/api/portfolio');
        if (res.data?.success && res.data.data) {
          setDbData(res.data.data);
          try {
            localStorage.setItem(PORTFOLIO_CACHE_KEY, JSON.stringify(res.data.data));
          } catch { /* storage full / disabled */ }
        }
      } catch (err) {
        console.warn('Backend API offline or unreachable, using local fallback:', err.message);
      } finally {
        setFetchDone(true);
      }
    }
    fetchPortfolio();
  }, []);

  const personal = dbData?.profile?.name ? {
    ...portfolioData.personal,
    ...dbData.profile,
    profileImage: dbData.profile.profileImage || portfolioData.personal.profileImage,
    resumeUrl: resolveUploadUrl(dbData.profile.resumeUrl) || portfolioData.personal.resumeUrl,
    socials: {
      ...portfolioData.personal.socials,
      ...(dbData.contact || {}),
    }
  } : {
    ...portfolioData.personal,
    // Don't show the built-in photo until we know the backend has no custom one
    profileImage: fetchDone ? portfolioData.personal.profileImage : null,
  };

  const skills = dbData?.skills?.length ? dbData.skills : portfolioData.expertise;
  const journey = dbData?.journey?.length ? dbData.journey : portfolioData.journey;
  const projects = dbData?.projects?.length ? dbData.projects : portfolioData.projects;
  const contact = dbData?.contact || null;

  return (
    <div className="portfolio-app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <Navbar theme={theme} onToggleTheme={onToggleTheme} resumeUrl={personal.resumeUrl} />
      
      <main style={{ flex: 1 }}>
        <Hero data={personal} contactData={contact} />
        <Expertise data={skills} />
        <Journey data={journey} />
        <Projects data={projects} />
        <Contact data={contact} />
      </main>

      <Footer profileData={personal} contactData={contact} />
    </div>
  );
}
