import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  Save, 
  FileText, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  Sparkles, 
  Loader2 
} from '../components/Icons';
import adminService from '../services/adminService';

export default function AboutMeView({ onNotify }) {
  const [profile, setProfile] = useState({
    name: 'Hitesh Kumar',
    title: 'AI & Data Science Developer',
    role: 'AI & Data Science Developer',
    bio: "I'm a B.Tech student specializing in Artificial Intelligence and Data Science, passionate about building intelligent applications, exploring emerging technologies, and solving real-world problems through code.",
    longBio: 'Deeply focused on building scalable machine learning pipelines, agentic workflows, and creative developer tools that simplify complex systems.',
    profileImage: '/images/profile.jpg',
    careerObjective: 'To innovate at the intersection of Artificial Intelligence, data systems, and software engineering.',
    educationSummary: 'B.Tech in Artificial Intelligence & Data Science (2025 - 2029 Expected)',
    workingStatus: 'Available for Opportunities',
    interests: 'Machine Learning, Full-Stack Web Development, Agentic AI, Cloud Computing',
    resumeUrl: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await adminService.getProfile();
        if (data) {
          setProfile((prev) => ({ ...prev, ...data }));
        }
      } catch (err) {
        console.warn('Failed to load profile from backend:', err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const res = await adminService.uploadFile(file);
      if (res?.url) {
        setProfile((prev) => ({ ...prev, profileImage: res.url }));
        onNotify('Profile image uploaded successfully!', 'success');
      }
    } catch (err) {
      onNotify(err.message || 'Image upload failed', 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingResume(true);
    try {
      const res = await adminService.uploadFile(file);
      if (res?.url) {
        setProfile((prev) => ({ ...prev, resumeUrl: res.url }));
        onNotify('Resume PDF uploaded successfully!', 'success');
      }
    } catch (err) {
      onNotify(err.message || 'Resume upload failed', 'error');
    } finally {
      setUploadingResume(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    try {
      await adminService.updateProfile(profile);
      setStatusMessage({ type: 'success', text: 'About Me content saved and published to database!' });
      onNotify('Profile successfully updated in database!', 'success');
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to update profile.' });
      onNotify(err.message || 'Update failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
        <Loader2 size={32} className="animate-spin" color="#2563EB" />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* View Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            About Me Management
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Manage personal biography, profile portrait, and career objectives synced to the live portfolio.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="btn-primary"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          <span>{saving ? 'Publishing...' : 'Save & Publish'}</span>
        </button>
      </div>

      {/* Status Notice */}
      {statusMessage && (
        <div
          style={{
            padding: '12px 18px',
            borderRadius: '8px',
            backgroundColor: statusMessage.type === 'success' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
            border: `1px solid ${statusMessage.type === 'success' ? '#10B981' : '#EF4444'}`,
            color: statusMessage.type === 'success' ? '#34D399' : '#F87171',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.9rem',
          }}
        >
          {statusMessage.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Main Grid: Edit Form (65%) + Live Preview Card (35%) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px', alignItems: 'start' }}>
        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="metis-card" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
            Edit Profile Information
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                name="name"
                value={profile.name || ''}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">Professional Title *</label>
              <input
                type="text"
                name="title"
                value={profile.title || ''}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>

          <div>
            <label className="form-label">Short Introduction (Hero Subtitle) *</label>
            <textarea
              name="bio"
              rows={3}
              value={profile.bio || ''}
              onChange={handleChange}
              required
              className="form-textarea"
            />
          </div>

          <div>
            <label className="form-label">Detailed About Me Description</label>
            <textarea
              name="longBio"
              rows={4}
              value={profile.longBio || ''}
              onChange={handleChange}
              className="form-textarea"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label className="form-label">Current Working Status</label>
              <input
                type="text"
                name="workingStatus"
                value={profile.workingStatus || ''}
                onChange={handleChange}
                placeholder="e.g. Available for Opportunities"
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">Education Summary</label>
              <input
                type="text"
                name="educationSummary"
                value={profile.educationSummary || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div>
            <label className="form-label">Career Objective</label>
            <textarea
              name="careerObjective"
              rows={2}
              value={profile.careerObjective || ''}
              onChange={handleChange}
              className="form-textarea"
            />
          </div>

          <div>
            <label className="form-label">Professional Interests (Comma Separated)</label>
            <input
              type="text"
              name="interests"
              value={profile.interests || ''}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Upload Profile Picture & Resume */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '10px' }}>
            <div>
              <label className="form-label">Profile Image Upload</label>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px',
                  border: '1px dashed var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-input)',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)',
                  fontSize: '0.85rem',
                }}
              >
                <Upload size={16} />
                <span>{uploadingImage ? 'Uploading...' : 'Choose Image'}</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
              </label>
            </div>

            <div>
              <label className="form-label">Resume / CV (PDF)</label>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px',
                  border: '1px dashed var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-input)',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)',
                  fontSize: '0.85rem',
                }}
              >
                <FileText size={16} />
                <span>{uploadingResume ? 'Uploading...' : (profile.resumeUrl ? 'Replace PDF' : 'Upload PDF')}</span>
                <input type="file" accept=".pdf" onChange={handleResumeUpload} style={{ display: 'none' }} />
              </label>
            </div>
          </div>
        </form>

        {/* Live Preview Card */}
        <div className="metis-card" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Live Portfolio Preview
            </h3>
            <span style={{ fontSize: '0.74rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
              <Eye size={13} /> Real-time
            </span>
          </div>

          {/* Profile Card Mockup */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '14px', padding: '16px 0' }}>
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                padding: '3px',
                background: 'linear-gradient(135deg, #2563EB, #10B981)',
                boxShadow: '0 4px 20px rgba(37, 99, 235, 0.35)',
              }}
            >
              <img
                src={profile.profileImage || '/images/profile.jpg'}
                alt={profile.name}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  backgroundColor: '#1E293B',
                }}
              />
            </div>

            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {profile.name || 'Hitesh Kumar'}
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#3B82F6', fontWeight: 600, marginTop: '2px' }}>
                {profile.title || 'AI & Data Science Developer'}
              </p>
              <div style={{ display: 'inline-block', marginTop: '8px', padding: '3px 10px', borderRadius: 'var(--radius-pill)', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10B981', fontSize: '0.72rem', fontWeight: 700 }}>
                {profile.workingStatus || 'AVAILABLE FOR OPPORTUNITIES'}
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6, textAlign: 'center' }}>
              {profile.bio}
            </p>

            {profile.educationSummary && (
              <div style={{ width: '100%', textAlign: 'left', backgroundColor: 'var(--bg-input)', padding: '12px 16px', borderRadius: '8px' }}>
                <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Education
                </p>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-primary)', marginTop: '2px' }}>
                  {profile.educationSummary}
                </p>
              </div>
            )}

            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#3B82F6',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                <FileText size={15} />
                <span>View Uploaded Resume PDF</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
