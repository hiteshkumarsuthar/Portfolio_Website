import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Instagram, 
  Twitter, 
  CheckCircle2, 
  Loader2 
} from '../components/Icons';
import adminService from '../services/adminService';

export default function ContactView({ onNotify }) {
  const [contact, setContact] = useState({
    email: 'hiteshkumar.techdev@gmail.com',
    phone: '+91 98765 43210',
    whatsapp: '+91 98765 43210',
    location: 'Bengaluru, India',
    city: 'Bengaluru',
    country: 'India',
    github: 'https://github.com/hiteshkumar-dev',
    linkedin: 'https://linkedin.com/in/hiteshkumar-ai',
    twitter: 'https://x.com/hiteshkumar_dev',
    instagram: '',
    heading: 'Contact Me',
    subtitle: "Got a project waiting to be realized? Let's collaborate and make it happen!",
    availabilityStatus: 'Available for Opportunities',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchContact() {
      try {
        const data = await adminService.getContact();
        if (data) {
          setContact((prev) => ({ ...prev, ...data }));
        }
      } catch (err) {
        console.warn('Failed to load contact info:', err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchContact();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminService.updateContact(contact);
      onNotify('Contact information saved and synced to database!', 'success');
    } catch (err) {
      onNotify(err.message || 'Error updating contact info', 'error');
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
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Contact Information Management
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Update your communication channels, social profiles, and contact page call-to-actions.
          </p>
        </div>

        <button onClick={handleSubmit} disabled={saving} className="btn-primary">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          <span>{saving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        {/* Personal Contact Details */}
        <div className="metis-card" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
            Direct Contact Information
          </h3>

          <div>
            <label className="form-label">Contact Email *</label>
            <input
              type="email"
              name="email"
              required
              value={contact.email || ''}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={contact.phone || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">WhatsApp Number</label>
              <input
                type="text"
                name="whatsapp"
                value={contact.whatsapp || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label className="form-label">City</label>
              <input
                type="text"
                name="city"
                value={contact.city || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">Country</label>
              <input
                type="text"
                name="country"
                value={contact.country || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div>
            <label className="form-label">Location String (Public Display)</label>
            <input
              type="text"
              name="location"
              value={contact.location || ''}
              onChange={handleChange}
              placeholder="e.g. Bengaluru, India"
              className="form-input"
            />
          </div>
        </div>

        {/* Social Links & Page Content */}
        <div className="metis-card" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
            Social Media & Page Copy
          </h3>

          <div>
            <label className="form-label">GitHub Profile URL</label>
            <input
              type="url"
              name="github"
              value={contact.github || ''}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div>
            <label className="form-label">LinkedIn Profile URL</label>
            <input
              type="url"
              name="linkedin"
              value={contact.linkedin || ''}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label className="form-label">Twitter / X URL</label>
              <input
                type="url"
                name="twitter"
                value={contact.twitter || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">Instagram URL</label>
              <input
                type="url"
                name="instagram"
                value={contact.instagram || ''}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div>
            <label className="form-label">Contact Section Heading</label>
            <input
              type="text"
              name="heading"
              value={contact.heading || ''}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div>
            <label className="form-label">Contact Section Subtitle</label>
            <textarea
              rows={2}
              name="subtitle"
              value={contact.subtitle || ''}
              onChange={handleChange}
              className="form-textarea"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
