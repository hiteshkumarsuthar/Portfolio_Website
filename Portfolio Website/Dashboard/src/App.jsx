import React, { useState, useEffect, useCallback } from 'react';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import Toast from './components/Toast';
import DashboardOverview from './views/DashboardOverview';
import AboutMeView from './views/AboutMeView';
import SkillsView from './views/SkillsView';
import JourneyView from './views/JourneyView';
import ProjectsView from './views/ProjectsView';
import ContactView from './views/ContactView';
import MessagesView from './views/MessagesView';
import SettingsView from './views/SettingsView';
import adminService from './services/adminService';
import { Plus, X, FolderKanban, ShoppingBag, FileText, HelpCircle } from './components/Icons';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('metis_theme') || 'dark';
  });

  const [adminUser, setAdminUser] = useState({
    name: 'Hitesh Kumar',
    email: 'hiteshkumar.techdev@gmail.com',
    role: 'Super Admin',
    avatar: '/images/profile.jpg',
  });

  const [currentSection, setCurrentSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [stats, setStats] = useState(null);
  const [liveMessages, setLiveMessages] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [newItemModal, setNewItemModal] = useState(false);
  const [supportModal, setSupportModal] = useState(false);

  // Sync theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('metis_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Toast helper
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  // Fetch live stats, messages, and profile from MongoDB
  const loadDashboardData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const [statsData, msgsData, profileData] = await Promise.all([
        adminService.getDashboardStats().catch(() => null),
        adminService.getMessages().catch(() => []),
        adminService.getProfile().catch(() => null),
      ]);

      if (statsData) setStats(statsData);
      if (msgsData) setLiveMessages(msgsData);
      if (profileData?.name) {
        setAdminUser({
          name: profileData.name,
          email: profileData.socials?.email || 'hiteshkumar.techdev@gmail.com',
          role: 'Super Admin',
          avatar: profileData.profileImage || '/images/profile.jpg',
        });
      }
    } catch (err) {
      console.warn('Dashboard sync error:', err.message);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const unreadCount = stats?.metrics?.unreadMessages !== undefined 
    ? stats.metrics.unreadMessages 
    : (liveMessages.filter((m) => !m.isRead).length || 0);

  return (
    <div className="dashboard-layout">
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh' }}>
        {/* Metis Top Navigation */}
        <Topbar
          theme={theme}
          onToggleTheme={toggleTheme}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          adminUser={adminUser}
          onLogout={() => showToast('Session active (Direct admin access)', 'info')}
          unreadCount={unreadCount}
          onNavigateSection={(sec) => setCurrentSection(sec)}
          onOpenNotifications={() => setCurrentSection('messages')}
        />

        <div style={{ display: 'flex', flex: 1 }}>
          {/* Metis Left Sidebar */}
          <Sidebar
            currentSection={currentSection}
            onSelectSection={(sec) => {
              if (sec === 'support') {
                setSupportModal(true);
              } else {
                setCurrentSection(sec);
              }
            }}
            collapsed={sidebarCollapsed}
            unreadMessagesCount={unreadCount}
          />

          {/* Main Content Area */}
          <main className="main-wrapper">
            <div className="content-container">
              {currentSection === 'dashboard' && (
                <DashboardOverview
                  stats={stats}
                  onRefresh={loadDashboardData}
                  onNavigateSection={(sec) => setCurrentSection(sec)}
                  onOpenNewItemModal={() => setNewItemModal(true)}
                  liveMessages={liveMessages}
                  isRefreshing={isRefreshing}
                />
              )}

              {currentSection === 'analytics' && (
                <DashboardOverview
                  stats={stats}
                  onRefresh={loadDashboardData}
                  onNavigateSection={(sec) => setCurrentSection(sec)}
                  onOpenNewItemModal={() => setNewItemModal(true)}
                  liveMessages={liveMessages}
                  isRefreshing={isRefreshing}
                />
              )}

              {currentSection === 'about' && (
                <AboutMeView onNotify={showToast} />
              )}

              {currentSection === 'resume' && (
                <AboutMeView onNotify={showToast} />
              )}

              {currentSection === 'skills' && (
                <SkillsView onNotify={showToast} />
              )}

              {currentSection === 'journey' && (
                <JourneyView onNotify={showToast} />
              )}

              {currentSection === 'education' && (
                <JourneyView onNotify={showToast} />
              )}

              {currentSection === 'achievements' && (
                <JourneyView onNotify={showToast} />
              )}

              {currentSection === 'projects' && (
                <ProjectsView onNotify={showToast} />
              )}

              {currentSection === 'contact' && (
                <ContactView onNotify={showToast} />
              )}

              {currentSection === 'messages' && (
                <MessagesView onNotify={showToast} onRefreshStats={loadDashboardData} />
              )}

              {currentSection === 'settings' && (
                <SettingsView onNotify={showToast} />
              )}

              {currentSection === 'security' && (
                <SettingsView onNotify={showToast} />
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Quick "+ New Item" Modal */}
      {newItemModal && (
        <div className="modal-overlay" onClick={() => setNewItemModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Create New Portfolio Item
              </h3>
              <button onClick={() => setNewItemModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
              Choose which section you want to add content to:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={() => {
                  setNewItemModal(false);
                  setCurrentSection('projects');
                }}
                className="btn-secondary"
                style={{ padding: '14px 18px', justifyContent: 'flex-start', gap: '14px', borderRadius: '8px' }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'rgba(37, 99, 235, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6' }}>
                  <FolderKanban size={18} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.92rem' }}>New Personal Project</p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Add title, tech stack, screenshots, and URLs</p>
                </div>
              </button>

              <button
                onClick={() => {
                  setNewItemModal(false);
                  setCurrentSection('skills');
                }}
                className="btn-secondary"
                style={{ padding: '14px 18px', justifyContent: 'flex-start', gap: '14px', borderRadius: '8px' }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
                  <ShoppingBag size={18} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.92rem' }}>New Technical Skill</p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Configure name, proficiency, and category</p>
                </div>
              </button>

              <button
                onClick={() => {
                  setNewItemModal(false);
                  setCurrentSection('journey');
                }}
                className="btn-secondary"
                style={{ padding: '14px 18px', justifyContent: 'flex-start', gap: '14px', borderRadius: '8px' }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'rgba(139, 92, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8B5CF6' }}>
                  <FileText size={18} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.92rem' }}>New Journey Milestone</p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Record education, hackathon, or career step</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Support & Help Modal */}
      {supportModal && (
        <div className="modal-overlay" onClick={() => setSupportModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <HelpCircle size={20} color="#2563EB" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Help & Documentation
                </h3>
              </div>
              <button onClick={() => setSupportModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
              The Metis Admin Dashboard is directly synchronized with your MongoDB Atlas database on backend port 1111.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: 'var(--bg-input)', padding: '12px', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              <p>• Changes in About Me reflect instantly on the public Hero.</p>
              <p>• Added projects automatically appear on the project cards.</p>
              <p>• New inquiries from the public contact form appear in Messages.</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setSupportModal(false)} className="btn-primary">
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '', type: 'success' })}
        />
      )}
    </div>
  );
}
