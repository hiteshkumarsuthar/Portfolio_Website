import React from 'react';
import { 
  LayoutDashboard, 
  Rocket, 
  TrendingUp, 
  Users, 
  Box, 
  ShoppingBag, 
  FileText, 
  Layers, 
  FileBarChart, 
  MessageSquare, 
  Calendar, 
  Folder, 
  Copy, 
  Settings, 
  Shield, 
  HelpCircle,
  ExternalLink,
  ChevronDown
} from './Icons';

export default function Sidebar({ 
  currentSection, 
  onSelectSection, 
  collapsed, 
  unreadMessagesCount = 0 
}) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'live-site', label: 'Live Portfolio', icon: Rocket, badge: 'Live', badgeType: 'hot', isExternal: true },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'about', label: 'About Me', icon: Users },
    { id: 'projects', label: 'Projects', icon: Box },
    { id: 'skills', label: 'Technical Skills', icon: ShoppingBag },
    { id: 'journey', label: 'My Journey', icon: FileText, badge: 'New', badgeType: 'new' },
    { id: 'education', label: 'Education & Certs', icon: Layers, hasSubmenu: true },
    { id: 'achievements', label: 'Achievements', icon: FileBarChart },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: unreadMessagesCount > 0 ? unreadMessagesCount : null, badgeType: 'counter' },
    { id: 'resume', label: 'Resume & Files', icon: Folder },
    { id: 'contact', label: 'Contact Info', icon: Copy, hasSubmenu: true },
  ];

  const adminItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'support', label: 'Help & Support', icon: HelpCircle },
  ];

  const handleItemClick = (item) => {
    if (item.isExternal) {
      window.open('http://localhost:5175/', '_blank');
      return;
    }
    onSelectSection(item.id);
  };

  return (
    <aside
      style={{
        width: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
        backgroundColor: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 'var(--topbar-height)',
        height: 'calc(100vh - var(--topbar-height))',
        zIndex: 90,
        transition: 'width var(--transition)',
        overflowY: 'auto',
        overflowX: 'hidden',
        userSelect: 'none',
      }}
    >
      <div style={{ padding: '16px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              title={collapsed ? item.label : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: collapsed ? '11px 0' : '10px 14px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius: '8px',
                border: 'none',
                background: isActive ? 'rgba(37, 99, 235, 0.12)' : 'transparent',
                color: isActive ? '#3B82F6' : 'var(--text-secondary)',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'var(--transition)',
                position: 'relative',
                textAlign: 'left',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              {/* Active left indicator bar */}
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '6px',
                    bottom: '6px',
                    width: '3px',
                    backgroundColor: '#2563EB',
                    borderRadius: '0 4px 4px 0',
                  }}
                />
              )}

              <Icon size={18} color={isActive ? '#3B82F6' : 'currentColor'} style={{ flexShrink: 0 }} />

              {!collapsed && (
                <>
                  <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.label}
                  </span>

                  {/* Badges */}
                  {item.badge && item.badgeType === 'hot' && (
                    <span className="badge-hot">{item.badge}</span>
                  )}
                  {item.badge && item.badgeType === 'new' && (
                    <span className="badge-new">{item.badge}</span>
                  )}
                  {item.badge && item.badgeType === 'counter' && (
                    <span className="badge-counter">{item.badge}</span>
                  )}

                  {item.hasSubmenu && (
                    <ChevronDown size={14} color="var(--text-muted)" />
                  )}
                </>
              )}
            </button>
          );
        })}

        {/* Section Header: ADMIN */}
        <div style={{ marginTop: '20px', marginBottom: '8px', padding: collapsed ? '0' : '0 12px' }}>
          {!collapsed ? (
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                color: 'var(--text-muted)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              Admin
            </span>
          ) : (
            <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)', margin: '8px 4px' }} />
          )}
        </div>

        {/* Admin Items */}
        {adminItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectSection(item.id)}
              title={collapsed ? item.label : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: collapsed ? '11px 0' : '10px 14px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius: '8px',
                border: 'none',
                background: isActive ? 'rgba(37, 99, 235, 0.12)' : 'transparent',
                color: isActive ? '#3B82F6' : 'var(--text-secondary)',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'var(--transition)',
                position: 'relative',
                textAlign: 'left',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '6px',
                    bottom: '6px',
                    width: '3px',
                    backgroundColor: '#2563EB',
                    borderRadius: '0 4px 4px 0',
                  }}
                />
              )}

              <Icon size={18} color={isActive ? '#3B82F6' : 'currentColor'} style={{ flexShrink: 0 }} />

              {!collapsed && (
                <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Database connection badge at bottom of sidebar */}
      {!collapsed && (
        <div
          style={{
            padding: '14px 16px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(0, 0, 0, 0.15)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#10B981',
                boxShadow: '0 0 8px #10B981',
              }}
            />
            <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              MongoDB Live
            </span>
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>v2.4</span>
        </div>
      )}
    </aside>
  );
}
