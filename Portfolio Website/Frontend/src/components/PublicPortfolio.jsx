import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Expertise from './Expertise';
import Journey from './Journey';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';
import apiClient from '../api/client';
import { portfolioData } from '../data/portfolioData';

export default function PublicPortfolio({ theme, onToggleTheme }) {
  const [dbData, setDbData] = useState(null);

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const res = await apiClient.get('/api/portfolio');
        if (res.data?.success && res.data.data) {
          setDbData(res.data.data);
        }
      } catch (err) {
        console.warn('Backend API offline or unreachable, using local fallback:', err.message);
      }
    }
    fetchPortfolio();
  }, []);

  const personal = dbData?.profile?.name ? {
    ...portfolioData.personal,
    ...dbData.profile,
    resumeUrl: dbData.profile.resumeUrl || portfolioData.personal.resumeUrl,
    socials: {
      ...portfolioData.personal.socials,
      ...(dbData.contact || {}),
    }
  } : portfolioData.personal;

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
