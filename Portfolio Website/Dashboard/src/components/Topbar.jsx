import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  Search, 
  Moon, 
  Sun, 
  Maximize2, 
  Minimize2, 
  Bell, 
  ChevronDown, 
  ExternalLink, 
  User, 
  LogOut, 
  CheckCircle2, 
  ShieldCheck 
} from './Icons';

export default function Topbar({ 
  theme, 
  onToggleTheme, 
  sidebarCollapsed, 
  onToggleSidebar, 
  adminUser, 
  onLogout,
  unreadCount = 0,
  onNavigateSection,
  onOpenNotifications
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const profileRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const displayName = adminUser?.name || 'Hitesh Kumar';
  const displayRole = adminUser?.role === 'admin' ? 'Super Admin' : (adminUser?.role || 'Super Admin');

  return (
    <header
      style={{
        height: 'var(--topbar-height)',
        backgroundColor: 'var(--bg-topbar)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        transition: 'var(--transition)',
      }}
    >
      {/* Left: Brand Logo + Sidebar Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Metis Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => onNavigateSection('dashboard')}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(37, 99, 235, 0.4)',
            }}
          >
            <span style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '1.05rem', fontFamily: 'sans-serif' }}>M</span>
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            Metis
          </span>
        </div>

        {/* Sidebar Hamburger Toggle */}
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle navigation drawer"
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '6px',
            transition: 'var(--transition)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
        >
          <Menu size={20} />
        </button>

        {/* Search Bar matching screenshot: Search... (Ctrl+K) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: 'var(--bg-input)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-pill)',
            padding: '7px 16px',
            width: '280px',
            transition: 'var(--transition)',
          }}
        >
          <input
            type="text"
            placeholder="Search... (Ctrl+K)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              width: '100%',
            }}
          />
          <Search size={16} color="var(--text-muted)" style={{ flexShrink: 0 }} />
        </div>
      </div>

      {/* Right: Theme Toggle, Fullscreen, Notification, Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Dark / Light Toggle */}
        <button
          onClick={onToggleTheme}
          aria-label="Toggle Dark and Light theme"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          className="btn-icon"
          style={{ border: 'none', background: 'transparent' }}
        >
          {theme === 'dark' ? <Moon size={19} /> : <Sun size={19} />}
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          aria-label="Toggle Fullscreen"
          title="Toggle Fullscreen"
          className="btn-icon"
          style={{ border: 'none', background: 'transparent' }}
        >
          {isFullscreen ? <Minimize2 size={19} /> : <Maximize2 size={19} />}
        </button>

        {/* Notifications Icon with Red Badge "3" */}
        <button
          onClick={onOpenNotifications}
          aria-label="Notifications"
          title="Recent Inquiries & Notifications"
          className="btn-icon"
          style={{ position: 'relative', border: 'none', background: 'transparent' }}
        >
          <Bell size={19} />
          {unreadCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: '#EF4444',
                color: '#FFFFFF',
                fontSize: '0.65rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid var(--bg-topbar)',
              }}
            >
              {unreadCount}
            </span>
          )}
        </button>

        {/* User Profile Dropdown matching screenshot (John Doe / Admin) */}
        <div style={{ position: 'relative' }} ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '9px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
            }}
          >
            {/* Circular Avatar */}
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#1E293B',
                border: '1px solid var(--border-subtle)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {adminUser?.avatar ? (
                <img src={adminUser.avatar} alt={displayName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <User size={18} color="#94A3B8" />
              )}
            </div>

            <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {displayName}
            </span>
            <ChevronDown size={14} color="var(--text-muted)" style={{ transform: profileOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>

          {/* Profile Dropdown Menu */}
          {profileOpen && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: 'calc(100% + 8px)',
                width: '240px',
                backgroundColor: 'var(--bg-dropdown)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-dropdown)',
                padding: '8px 0',
                zIndex: 200,
                animation: 'slideUp 0.15s ease-out',
              }}
            >
              {/* Header Info */}
              <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border-subtle)' }}>
                <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>{displayName}</p>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{adminUser?.email || 'admin@hiteshkumar.dev'}</p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '6px', backgroundColor: 'var(--primary-light)', padding: '2px 8px', borderRadius: '4px' }}>
                  <ShieldCheck size={12} color="#3B82F6" />
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#3B82F6' }}>{displayRole}</span>
                </div>
              </div>

              {/* Menu items */}
              <div style={{ padding: '6px 0' }}>
                <a
                  href="http://localhost:5175/"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 16px',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'var(--transition)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  <ExternalLink size={15} color="#3B82F6" />
                  <span>View Public Website</span>
                </a>

                <button
                  onClick={() => {
                    setProfileOpen(false);
                    onNavigateSection('settings');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '8px 16px',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  <User size={15} />
                  <span>Account Settings</span>
                </button>
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', padding: '6px 0 0' }}>
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    onLogout();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '8px 16px',
                    fontSize: '0.85rem',
                    color: '#EF4444',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <LogOut size={15} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
