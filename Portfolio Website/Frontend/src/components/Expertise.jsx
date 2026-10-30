import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Code2, BarChart3, Cpu } from 'lucide-react';

export default function Expertise({ data }) {
  // If database skills are passed as an array
  let columns = portfolioData.expertise;

  if (Array.isArray(data) && data.length > 0) {
    const progSkills = data.filter((s) => s.category === 'Programming & Development').map((s) => s.name);
    const dataSkills = data.filter((s) => s.category === 'Data Science & Analytics').map((s) => s.name);
    const aiSkills = data.filter((s) => s.category === 'AI & Emerging Technologies').map((s) => s.name);

    columns = [
      {
        id: 'programming',
        title: 'Programming & Development',
        icon: 'code',
        description:
          'I enjoy building modern web applications and writing clean, efficient code. I continuously improve my programming skills while exploring frontend and backend development.',
        techStack: progSkills.length > 0 ? progSkills : portfolioData.expertise[0].techStack,
      },
      {
        id: 'data-science',
        title: 'Data Science & Analytics',
        icon: 'chart',
        description:
          "I'm interested in transforming raw data into meaningful insights using data analysis, statistical concepts, visualization, and machine learning techniques.",
        techStack: dataSkills.length > 0 ? dataSkills : portfolioData.expertise[1].techStack,
      },
      {
        id: 'ai-emerging',
        title: 'AI & Emerging Technologies',
        icon: 'brain',
        description:
          'I explore artificial intelligence, generative AI, automation, and intelligent applications to understand how emerging technologies can solve practical problems.',
        techStack: aiSkills.length > 0 ? aiSkills : portfolioData.expertise[2].techStack,
      },
    ];
  }

  const getIcon = (type) => {
    switch (type) {
      case 'code':
        return <Code2 size={36} strokeWidth={1.8} color="#FFFFFF" />;
      case 'chart':
        return <BarChart3 size={36} strokeWidth={1.8} color="#FFFFFF" />;
      case 'brain':
      default:
        return <Cpu size={36} strokeWidth={1.8} color="#FFFFFF" />;
    }
  };

  return (
    <section id="expertise" className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Section Heading matching Screenshot 3 */}
        <div className="section-header">
          <h2 className="section-title">Technical Expertise</h2>
          <p className="section-subtitle">
            Core domains where I design, engineer, and experiment with cutting-edge tools.
          </p>
        </div>

        {/* 3-Column Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '48px 36px',
          }}
          className="expertise-grid"
        >
          {columns.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
              className="expertise-column"
            >
              {/* Minimal White Icon */}
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                {getIcon(item.icon)}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: '1.45rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: '0.98rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                }}
              >
                {item.description}
              </p>

              {/* Tech Stack Label & White Pill Badges */}
              <div>
                <span
                  style={{
                    display: 'block',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    marginBottom: '10px',
                    letterSpacing: '0.02em',
                  }}
                >
                  Tech stack:
                </span>
                <div className="tech-pills-wrap" style={{ marginTop: '0' }}>
                  {item.techStack.map((tech) => (
                    <span key={tech} className="tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
