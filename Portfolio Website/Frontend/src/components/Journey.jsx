import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { GraduationCap, BookOpen, Rocket, Sparkles } from 'lucide-react';

export default function Journey({ data }) {
  const journey = Array.isArray(data) && data.length > 0 ? data : portfolioData.journey;

  const getIcon = (type) => {
    switch (type) {
      case 'graduation':
        return <GraduationCap size={20} color="#FFFFFF" strokeWidth={2.2} />;
      case 'book':
        return <BookOpen size={20} color="#FFFFFF" strokeWidth={2.2} />;
      case 'rocket':
        return <Rocket size={20} color="#FFFFFF" strokeWidth={2.2} />;
      case 'sparkles':
      default:
        return <Sparkles size={20} color="#FFFFFF" strokeWidth={2.2} />;
    }
  };

  return (
    <section id="journey" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        {/* Section Heading matching Screenshot 4 */}
        <div className="section-header">
          <h2 className="section-title">My Journey</h2>
          <p className="section-subtitle">
            Academic milestones, technical learning trajectory, and hands-on engineering experience.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="timeline-wrapper">
          {/* Central Vertical Line */}
          <div className="timeline-spine" />

          {journey.map((item, index) => {
            const isEven = index % 2 === 0; // Even items on left, odd on right

            return (
              <div
                key={item.id}
                className={`timeline-row ${isEven ? 'row-left' : 'row-right'}`}
              >
                {/* Information Card (White Box with Dark Text) */}
                <div className="timeline-card-col">
                  <div className="timeline-card">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
                      <span className="card-badge">{item.category}</span>
                      <span className="card-period-inline">{item.period}</span>
                    </div>

                    <h3 className="card-title">{item.title}</h3>
                    <h4 className="card-subtitle">{item.subtitle}</h4>
                    <p className="card-desc">{item.description}</p>

                    <div className="card-tags">
                      {item.tags.map((tag) => (
                        <span key={tag} className="card-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Central Timeline Node (Purple Circle with Icon) */}
                <div className="timeline-node-col">
                  <div className="timeline-node">
                    {getIcon(item.icon)}
                  </div>
                  <span className="timeline-date-label">{item.period}</span>
                </div>

                {/* Empty Balancing Column for Desktop Alternating Grid */}
                <div className="timeline-empty-col" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Scoped CSS for the Alternating Timeline (Faithful to Reference Screenshot 4) */}
      <style>{`
        .timeline-wrapper {
          position: relative;
          max-width: 1040px;
          margin: 40px auto 0 auto;
        }

        .timeline-spine {
          position: absolute;
          top: 24px;
          bottom: 24px;
          left: 50%;
          width: 2px;
          background-color: rgba(255, 255, 255, 0.4);
          transform: translateX(-50%);
          z-index: 1;
        }

        [data-theme="light"] .timeline-spine {
          background-color: rgba(0, 0, 0, 0.2);
        }

        .timeline-row {
          display: grid;
          grid-template-columns: 1fr 80px 1fr;
          align-items: center;
          margin-bottom: 56px;
          position: relative;
          z-index: 2;
        }

        /* Alternating Order */
        .timeline-row.row-left .timeline-card-col {
          grid-column: 1;
          display: flex;
          justify-content: flex-end;
        }
        .timeline-row.row-left .timeline-node-col {
          grid-column: 2;
        }
        .timeline-row.row-left .timeline-empty-col {
          grid-column: 3;
        }

        .timeline-row.row-right .timeline-empty-col {
          grid-column: 1;
        }
        .timeline-row.row-right .timeline-node-col {
          grid-column: 2;
        }
        .timeline-row.row-right .timeline-card-col {
          grid-column: 3;
          display: flex;
          justify-content: flex-start;
        }

        /* Timeline Node */
        .timeline-node-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .timeline-node {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #8B00FF;
          border: 3px solid #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 16px rgba(139, 0, 255, 0.5);
          transition: transform 0.25s ease;
        }

        .timeline-row:hover .timeline-node {
          transform: scale(1.15);
          box-shadow: 0 0 24px rgba(224, 0, 255, 0.7);
        }

        .timeline-date-label {
          position: absolute;
          white-space: nowrap;
          font-size: 0.82rem;
          color: var(--text-muted);
          font-weight: 500;
          letter-spacing: 0.02em;
        }

        /* Position Date Labels next to node */
        .timeline-row.row-left .timeline-date-label {
          left: calc(100% + 16px);
          top: 14px;
        }
        .timeline-row.row-right .timeline-date-label {
          right: calc(100% + 16px);
          top: 14px;
        }

        /* White Info Card (Matches Reference Screenshot 4) */
        .timeline-card {
          background-color: #FFFFFF;
          color: #171717;
          border-radius: 6px;
          padding: 24px 28px;
          width: 100%;
          max-width: 450px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
          position: relative;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .timeline-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 32px rgba(0, 0, 0, 0.45);
        }

        .card-badge {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #8B00FF;
        }

        .card-period-inline {
          display: none;
          font-size: 0.78rem;
          color: #666;
          font-weight: 600;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #171717;
          margin-bottom: 4px;
          letter-spacing: -0.015em;
        }

        .card-subtitle {
          font-size: 0.92rem;
          font-weight: 600;
          color: #555555;
          margin-bottom: 12px;
        }

        .card-desc {
          font-size: 0.9rem;
          color: #444444;
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .card-tag {
          font-size: 0.75rem;
          font-weight: 600;
          background-color: #F0F0F4;
          color: #2D3748;
          padding: 3px 10px;
          border-radius: 9999px;
        }

        /* Mobile Responsiveness: Single column on left */
        @media (max-width: 768px) {
          .timeline-spine {
            left: 24px;
          }

          .timeline-row {
            display: flex;
            align-items: flex-start;
            margin-bottom: 40px;
            padding-left: 64px;
            position: relative;
          }

          .timeline-node-col {
            position: absolute;
            left: 2px;
            top: 14px;
          }

          .timeline-node {
            width: 42px;
            height: 42px;
          }

          .timeline-date-label {
            display: none;
          }

          .card-period-inline {
            display: block;
          }

          .timeline-empty-col {
            display: none;
          }

          .timeline-card-col {
            width: 100%;
          }

          .timeline-card {
            max-width: 100%;
            padding: 20px;
          }
        }
      `}</style>
    </section>
  );
}
