import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  GraduationCap, 
  Briefcase, 
  Trophy, 
  Sparkles, 
  X, 
  Loader2 
} from '../components/Icons';
import adminService from '../services/adminService';

const JOURNEY_TYPES = [
  'Education',
  'Practical Experience',
  'Technical Learning',
  'Emerging Exploration',
  'Achievement & Hackathons',
];

export default function JourneyView({ onNotify }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    category: 'Education',
    period: '',
    description: '',
    tags: '',
    isActive: true,
  });

  const loadJourney = async () => {
    try {
      const data = await adminService.getJourney();
      setEntries(data || []);
    } catch (err) {
      console.warn('Failed to load journey entries:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJourney();
  }, []);

  const openCreateModal = () => {
    setEditingEntry(null);
    setFormData({
      title: '',
      subtitle: '',
      category: 'Education',
      period: '2025 — 2029 (Expected)',
      description: '',
      tags: '',
      isActive: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (entry) => {
    setEditingEntry(entry);
    setFormData({
      title: entry.title,
      subtitle: entry.subtitle || '',
      category: entry.category || 'Education',
      period: entry.period || '',
      description: entry.description || '',
      tags: Array.isArray(entry.tags) ? entry.tags.join(', ') : (entry.tags || ''),
      isActive: entry.isActive !== false,
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...formData,
      tags: typeof formData.tags === 'string'
        ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : formData.tags,
    };

    try {
      if (editingEntry) {
        await adminService.updateJourney(editingEntry._id, payload);
        onNotify('Journey entry updated successfully!', 'success');
      } else {
        await adminService.createJourney(payload);
        onNotify('Journey entry added successfully!', 'success');
      }
      setModalOpen(false);
      await loadJourney();
    } catch (err) {
      onNotify(err.message || 'Error saving journey entry', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (entry) => {
    if (!window.confirm(`Delete entry "${entry.title}"?`)) return;
    try {
      await adminService.deleteJourney(entry._id);
      onNotify('Journey entry deleted.', 'success');
      setEntries((prev) => prev.filter((item) => item._id !== entry._id));
    } catch (err) {
      onNotify(err.message || 'Error deleting entry', 'error');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            My Journey & Milestones Management
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Manage the chronological education and career timeline rendered on the portfolio.
          </p>
        </div>

        <button onClick={openCreateModal} className="btn-primary">
          <Plus size={16} strokeWidth={2.5} />
          <span>Add Journey Entry</span>
        </button>
      </div>

      {/* Journey Cards Grid */}
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
          <Loader2 size={32} className="animate-spin" color="#2563EB" />
        </div>
      ) : entries.length === 0 ? (
        <div className="metis-card" style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <GraduationCap size={40} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
          <p style={{ fontWeight: 600 }}>No journey entries found.</p>
          <button onClick={openCreateModal} className="btn-primary" style={{ marginTop: '14px' }}>
            Create First Milestone
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {entries.map((entry, idx) => (
            <div
              key={entry._id || idx}
              className="metis-card"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '20px',
                padding: '20px 24px',
              }}
            >
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    backgroundColor: '#1E2532',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#8B5CF6',
                    flexShrink: 0,
                  }}
                >
                  <GraduationCap size={20} />
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#3B82F6', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {entry.category || 'Milestone'}
                    </span>
                    <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                      • {entry.period}
                    </span>
                    {!entry.isActive && (
                      <span style={{ fontSize: '0.68rem', backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#EF4444', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                        HIDDEN
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
                    {entry.title}
                  </h3>

                  {entry.subtitle && (
                    <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                      {entry.subtitle}
                    </p>
                  )}

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, marginTop: '8px', maxWidth: '780px' }}>
                    {entry.description}
                  </p>

                  {/* Tags */}
                  {entry.tags && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
                      {(Array.isArray(entry.tags) ? entry.tags : entry.tags.split(',')).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          style={{
                            fontSize: '0.72rem',
                            padding: '3px 9px',
                            borderRadius: 'var(--radius-pill)',
                            backgroundColor: 'var(--bg-input)',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          {tag.trim ? tag.trim() : tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => openEditModal(entry)}
                  className="btn-icon"
                  title="Edit entry"
                >
                  <Edit3 size={15} />
                </button>
                <button
                  onClick={() => handleDelete(entry)}
                  className="btn-icon"
                  style={{ color: '#EF4444' }}
                  title="Delete entry"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {editingEntry ? 'Edit Journey Milestone' : 'Add New Milestone'}
              </h3>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="form-label">Title (Degree / Role) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bachelor of Technology (B.Tech)"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label className="form-label">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="form-select"
                  >
                    {JOURNEY_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label">Period / Duration *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2025 — 2029 (Expected)"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Subtitle / Specialization</label>
                <input
                  type="text"
                  placeholder="e.g. Specialization in Artificial Intelligence & Data Science"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Detailed Description *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your learning, achievements, and focus areas..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div>
                <label className="form-label">Tags (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="e.g. AI & Data Science, B.Tech, Machine Learning"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  id="journeyActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  style={{ width: '16px', height: '16px', accentColor: '#2563EB', cursor: 'pointer' }}
                />
                <label htmlFor="journeyActive" style={{ fontSize: '0.88rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
                  Display on Public Journey Timeline
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="btn-primary">
                  {submitting && <Loader2 size={15} className="animate-spin" />}
                  <span>{editingEntry ? 'Update Milestone' : 'Save Milestone'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
