import React, { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  ShoppingBag, 
  Clock, 
  Plus, 
  RotateCw, 
  Download, 
  Settings, 
  CheckCircle2, 
  Layers, 
  FolderKanban, 
  Sparkles 
} from '../components/Icons';
import StatCard from '../components/StatCard';
import RevenueChart from '../components/RevenueChart';
import ActivityFeed from '../components/ActivityFeed';
import BarChart from '../components/BarChart';
import DonutChart from '../components/DonutChart';

export default function DashboardOverview({ 
  stats, 
  onRefresh, 
  onNavigateSection, 
  onOpenNewItemModal, 
  liveMessages = [],
  isRefreshing = false 
}) {
  const [exportNotice, setExportNotice] = useState(false);

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(stats || {}, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header Bar matching screenshot */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '1.75rem',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              color: 'var(--text-primary)',
              lineHeight: 1.2,
            }}
          >
            Dashboard
          </h1>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Last 30 days · updated 5 minutes ago
          </p>
        </div>

        {/* Right utility buttons: + New Item, Refresh, Download, Settings */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={onOpenNewItemModal}
            className="btn-primary"
            style={{ padding: '8px 16px', fontSize: '0.88rem' }}
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>New Item</span>
          </button>

          <button
            onClick={onRefresh}
            title="Refresh database stats"
            className="btn-icon"
            disabled={isRefreshing}
          >
            <RotateCw size={17} style={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
          </button>

          <button
            onClick={handleExportData}
            title="Export portfolio backup"
            className="btn-icon"
          >
            <Download size={17} />
          </button>

          <button
            onClick={() => onNavigateSection('settings')}
            title="Dashboard Settings"
            className="btn-icon"
          >
            <Settings size={17} />
          </button>
        </div>
      </div>

      {/* Export notification alert */}
      {exportNotice && (
        <div
          style={{
            padding: '12px 18px',
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid #10B981',
            borderRadius: '8px',
            color: '#34D399',
            fontSize: '0.86rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          <CheckCircle2 size={16} />
          <span>Portfolio database snapshot exported successfully!</span>
        </div>
      )}

      {/* 4 Stat Cards Row matching screenshot */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
        }}
      >
        <StatCard
          icon={FolderKanban}
          title="TOTAL PROJECTS"
          value={`${stats?.metrics?.totalProjects ?? 0} Projects`}
          trend={`${stats?.metrics?.publishedProjects ?? 0} Published Live`}
          isPositive={true}
          onClick={() => onNavigateSection('projects')}
        />
        <StatCard
          icon={Layers}
          title="TECHNICAL SKILLS"
          value={`${stats?.metrics?.totalSkills ?? 0} Skills`}
          trend="Categorized in MongoDB"
          isPositive={true}
          onClick={() => onNavigateSection('skills')}
        />
        <StatCard
          icon={Sparkles}
          title="CAREER MILESTONES"
          value={`${stats?.metrics?.totalJourney ?? 0} Milestones`}
          trend="Education & Journey"
          isPositive={true}
          onClick={() => onNavigateSection('journey')}
        />
        <StatCard
          icon={Clock}
          title="CONTACT INQUIRIES"
          value={`${stats?.metrics?.totalMessages ?? 0} Inquiries`}
          trend={`${stats?.metrics?.unreadMessages ?? 0} Unread`}
          isPositive={(stats?.metrics?.unreadMessages ?? 0) === 0}
          onClick={() => onNavigateSection('messages')}
        />
      </div>

      {/* Middle Row: Revenue Overview (65%) + Recent Activity (35%) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '20px',
          alignItems: 'stretch',
        }}
      >
        <div style={{ flex: '2 1 60%' }}>
          <RevenueChart />
        </div>
        <div style={{ flex: '1 1 35%' }}>
          <ActivityFeed liveMessages={liveMessages} recentActivities={stats?.recentActivities} />
        </div>
      </div>

      {/* Bottom Row: Projects by Category + Skills Domain Distribution */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '20px',
        }}
      >
        <BarChart categories={stats?.projectCategories} />
        <DonutChart categories={stats?.skillCategories} totalCount={stats?.metrics?.totalSkills} />
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
