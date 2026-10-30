import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function Projects({ data }) {
  const projects = Array.isArray(data) && data.length > 0 ? data : portfolioData.projects;
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Section Heading matching Screenshot 2 */}
        <div className="section-header">
          <h2 className="section-title">Personal Projects</h2>
          <p className="section-subtitle">
            A collection of things I've built, explored, and experimented with.
          </p>
        </div>

        {/* 2-Column Project Grid matching Screenshot 2 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
            gap: '56px 40px',
          }}
          className="projects-grid"
        >
          {projects.map((project) => (
            <div
              key={project._id || project.id}
              className="project-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
              }}
            >
              {/* Colorful Container Frame with Browser Mockup inside */}
              <div
                className="project-image-container"
                onClick={() => setSelectedProject(project)}
                style={{
                  background: project.containerBg,
                  borderRadius: '12px',
                  padding: '28px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  aspectRatio: '16 / 10',
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.25)',
                  transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease',
                }}
              >
                {/* Browser Mockup Window */}
                <div
                  className="mockup-window"
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    backgroundColor: '#12151B',
                    boxShadow: '0 16px 36px rgba(0, 0, 0, 0.35)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.35s ease',
                  }}
                >
                  {/* Window Bar (Traffic Lights) */}
                  <div
                    style={{
                      height: '24px',
                      backgroundColor: '#1B1F27',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 10px',
                      gap: '6px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FF5F56' }} />
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#27C93F' }} />
                  </div>

                  {/* Screenshot Image */}
                  <div style={{ flex: 1, overflow: 'hidden', backgroundColor: '#0B0D10' }}>
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'top center',
                        display: 'block',
                        transition: 'transform 0.4s ease',
                      }}
                      className="project-screenshot-img"
                    />
                  </div>
                </div>

                {/* Subtle Hover Overlay indicator */}
                <div
                  className="view-details-hover-tag"
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    right: '16px',
                    backgroundColor: 'rgba(11, 13, 16, 0.85)',
                    backdropFilter: 'blur(8px)',
                    color: '#FFFFFF',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '6px 12px',
                    borderRadius: '9999px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    opacity: 0,
                    transform: 'translateY(8px)',
                    transition: 'opacity 0.25s ease, transform 0.25s ease',
                  }}
                >
                  <span>View Details</span>
                  <ArrowRight size={14} />
                </div>
              </div>

              {/* Title & Description Below Image (Matches Reference Screenshot 2) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h3
                  onClick={() => setSelectedProject(project)}
                  style={{
                    fontSize: '1.45rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-magenta)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.94rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  {project.description}
                </p>

                {/* Technology Badges */}
                <div className="tech-pills-wrap" style={{ marginTop: '4px' }}>
                  {project.techStack.map((tech) => (
                    <span key={tech} className="tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links / Buttons */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginTop: '8px',
                    flexWrap: 'wrap',
                  }}
                >
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary"
                      style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                    >
                      <GithubIcon size={15} />
                      <span>GitHub</span>
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary"
                      style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                    >
                      <ExternalLink size={15} />
                      <span>Live Demo</span>
                    </a>
                  )}

                  <button
                    onClick={() => setSelectedProject(project)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--accent-purple)',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      transition: 'color var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-magenta)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--accent-purple)')}
                  >
                    <span>Read Case Study</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Scoped Hover Animations */}
      <style>{`
        .project-image-container:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.4);
        }

        .project-image-container:hover .project-screenshot-img {
          transform: scale(1.03);
        }

        .project-image-container:hover .view-details-hover-tag {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 600px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
