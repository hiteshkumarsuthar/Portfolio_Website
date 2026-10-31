import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Shield, 
  Key, 
  Globe, 
  Database, 
  CheckCircle2, 
  AlertCircle, 
  Loader2 
} from '../components/Icons';
import adminService from '../services/adminService';
import { API_BASE_URL } from '../api/client';

export default function SettingsView({ onNotify }) {
  const [settings, setSettings] = useState({
    title: 'Hitesh Kumar — AI & Data Science Developer',
    description: 'Personal portfolio of Hitesh Kumar, an AI and Data Science engineer specializing in machine learning, agentic AI, and scalable web solutions.',
    keywords: 'AI Developer, Data Science, Machine Learning, Python, Full Stack, Portfolio',
    themePreference: 'dark',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [healthStatus, setHealthStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [sets, health] = await Promise.all([
          adminService.getSettings().catch(() => null),
          adminService.checkHealth().catch(() => null),
        ]);
        if (sets) setSettings((prev) => ({ ...prev, ...sets }));
        if (health) setHealthStatus(health);
      } catch (err) {
        console.warn('Settings load error:', err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      await adminService.updateSettings(settings);
      onNotify('Site settings & SEO updated successfully!', 'success');
    } catch (err) {
      onNotify(err.message || 'Error updating settings', 'error');
    } finally {
      setSavingSettings(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      onNotify('New password and confirmation do not match!', 'error');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      onNotify('Password must be at least 6 characters long.', 'error');
      return;
    }

    setUpdatingPassword(true);
    try {
      await adminService.updateAdminAccount({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      onNotify('Administrator password changed successfully!', 'success');
    } catch (err) {
      onNotify(err.message || 'Error changing password', 'error');
    } finally {
      setUpdatingPassword(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Website Settings & Security
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          Configure SEO metadata, search engine discoverability, and administrator authentication.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        {/* SEO & Site Settings */}
        <form onSubmit={handleSettingsSubmit} className="metis-card" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
            <Globe size={18} color="#2563EB" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              SEO & Metadata Configuration
            </h3>
          </div>

          <div>
            <label className="form-label">Website & Tab Title</label>
            <input
              type="text"
              value={settings.title || ''}
              onChange={(e) => setSettings({ ...settings, title: e.target.value })}
              className="form-input"
            />
          </div>

          <div>
            <label className="form-label">Meta Description</label>
            <textarea
              rows={3}
              value={settings.description || ''}
              onChange={(e) => setSettings({ ...settings, description: e.target.value })}
              className="form-textarea"
            />
          </div>

          <div>
            <label className="form-label">SEO Keywords</label>
            <input
              type="text"
              value={settings.keywords || ''}
              onChange={(e) => setSettings({ ...settings, keywords: e.target.value })}
              className="form-input"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="submit" disabled={savingSettings} className="btn-primary">
              {savingSettings ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              <span>Save Site Settings</span>
            </button>
          </div>
        </form>

        {/* Security & Password Change */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <form onSubmit={handlePasswordSubmit} className="metis-card" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
              <Shield size={18} color="#10B981" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Security & Password Management
              </h3>
            </div>

            <div>
              <label className="form-label">Current Password</label>
              <input
                type="password"
                required
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">New Password</label>
              <input
                type="password"
                required
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">Confirm New Password</label>
              <input
                type="password"
                required
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                className="form-input"
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
              <button type="submit" disabled={updatingPassword} className="btn-primary" style={{ backgroundColor: '#10B981' }}>
                {updatingPassword ? <Loader2 size={16} className="animate-spin" /> : <Key size={16} />}
                <span>Update Password</span>
              </button>
            </div>
          </form>

          {/* Database System Diagnostics */}
          <div className="metis-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <Database size={18} color="#3B82F6" />
              <h4 style={{ fontSize: '0.94rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Database Status
              </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Backend API:</span>
                <span style={{ color: healthStatus ? '#10B981' : '#EF4444', fontWeight: 600 }}>
                  {API_BASE_URL} ({healthStatus ? 'Online' : loading ? 'Checking...' : 'Offline'})
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>MongoDB State:</span>
                <span style={{ color: healthStatus?.dbConnected ? '#10B981' : '#EF4444', fontWeight: 600 }}>
                  {healthStatus?.dbConnected ? 'Connected (PortfolioWebsiteData)' : 'Disconnected'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Database Sync:</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Real-time Bidirectional</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
