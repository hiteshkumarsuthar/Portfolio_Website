import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Code2, 
  Database, 
  Brain, 
  Cpu, 
  Loader2, 
  Search, 
  Layers 
} from '../components/Icons';
import adminService from '../services/adminService';

const CATEGORIES = [
  'Programming Languages',
  'Frontend Development',
  'Backend Development',
  'Data Science & Analytics',
  'AI & Emerging Technologies',
  'Databases',
  'Developer Tools',
];

export default function SkillsView({ onNotify }) {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Programming Languages',
    proficiency: 85,
    icon: 'code',
    description: '',
    isActive: true,
  });

  const loadSkills = async () => {
    try {
      const data = await adminService.getSkills();
      setSkills(data || []);
    } catch (err) {
      console.warn('Failed to load skills:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const openCreateModal = () => {
    setEditingSkill(null);
    setFormData({
      name: '',
      category: 'Programming Languages',
      proficiency: 85,
      icon: 'code',
      description: '',
      isActive: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category || 'Programming Languages',
      proficiency: skill.proficiency || 85,
      icon: skill.icon || 'code',
      description: skill.description || '',
      isActive: skill.isActive !== false,
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingSkill) {
        await adminService.updateSkill(editingSkill._id, formData);
        onNotify(`Skill "${formData.name}" updated successfully!`, 'success');
      } else {
        await adminService.createSkill(formData);
        onNotify(`Skill "${formData.name}" created successfully!`, 'success');
      }
      setModalOpen(false);
      await loadSkills();
    } catch (err) {
      onNotify(err.message || 'Error saving skill', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (skill) => {
    if (!window.confirm(`Are you sure you want to delete "${skill.name}"?`)) return;
    try {
      await adminService.deleteSkill(skill._id);
      onNotify(`Skill "${skill.name}" deleted.`, 'success');
      setSkills((prev) => prev.filter((s) => s._id !== skill._id));
    } catch (err) {
      onNotify(err.message || 'Error deleting skill', 'error');
    }
  };

  const handleToggleActive = async (skill) => {
    try {
      const updated = await adminService.updateSkill(skill._id, { isActive: !skill.isActive });
      setSkills((prev) => prev.map((s) => (s._id === skill._id ? { ...s, isActive: !s.isActive } : s)));
      onNotify(`Skill visibility updated.`, 'success');
    } catch (err) {
      onNotify(err.message || 'Error toggling skill', 'error');
    }
  };

  const filteredSkills = skills.filter((s) => {
    if (selectedCategory === 'All') return true;
    return s.category === selectedCategory;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Technical Expertise Management
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Manage skills, proficiency levels, and categories displayed on the public portfolio.
          </p>
        </div>

        <button onClick={openCreateModal} className="btn-primary">
          <Plus size={16} strokeWidth={2.5} />
          <span>Add New Skill</span>
        </button>
      </div>

      {/* Category Pills Filter */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {['All', ...CATEGORIES].map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                backgroundColor: isSelected ? '#2563EB' : 'var(--bg-card)',
                color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-pill)',
                padding: '6px 16px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'var(--transition)',
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Skills Table / Cards */}
      <div className="metis-card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
            <Loader2 size={28} className="animate-spin" color="#2563EB" />
          </div>
        ) : filteredSkills.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <Layers size={36} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
            <p style={{ fontWeight: 600 }}>No skills found for this category.</p>
            <button onClick={openCreateModal} className="btn-primary" style={{ marginTop: '14px' }}>
              Add First Skill
            </button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-input)' }}>
                  <th style={{ padding: '14px 20px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Skill Name</th>
                  <th style={{ padding: '14px 20px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Category</th>
                  <th style={{ padding: '14px 20px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Proficiency</th>
                  <th style={{ padding: '14px 20px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Status</th>
                  <th style={{ padding: '14px 20px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSkills.map((skill) => (
                  <tr
                    key={skill._id}
                    style={{
                      borderBottom: '1px solid var(--border-subtle)',
                      transition: 'background-color 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#1E2532', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6' }}>
                          <Code2 size={16} />
                        </div>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                          {skill.name}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      {skill.category}
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '100px', height: '6px', borderRadius: '3px', backgroundColor: 'var(--bg-input)', overflow: 'hidden' }}>
                          <div style={{ width: `${skill.proficiency || 85}%`, height: '100%', backgroundColor: '#2563EB', borderRadius: '3px' }} />
                        </div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                          {skill.proficiency || 85}%
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <button
                        onClick={() => handleToggleActive(skill)}
                        style={{
                          background: skill.isActive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                          color: skill.isActive ? '#10B981' : '#EF4444',
                          border: 'none',
                          borderRadius: 'var(--radius-pill)',
                          padding: '3px 10px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        {skill.isActive ? 'Active' : 'Hidden'}
                      </button>
                    </td>
                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                        <button
                          onClick={() => openEditModal(skill)}
                          className="btn-icon"
                          style={{ width: '32px', height: '32px' }}
                          title="Edit"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(skill)}
                          className="btn-icon"
                          style={{ width: '32px', height: '32px', color: '#EF4444' }}
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Add / Edit Skill */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {editingSkill ? 'Edit Technical Skill' : 'Add New Technical Skill'}
              </h3>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="form-label">Skill Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Python, React, PostgreSQL"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="form-select"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label className="form-label" style={{ margin: 0 }}>Proficiency Level ({formData.proficiency}%)</label>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={formData.proficiency}
                  onChange={(e) => setFormData({ ...formData, proficiency: Number(e.target.value) })}
                  style={{ width: '100%', accentColor: '#2563EB', cursor: 'pointer' }}
                />
              </div>

              <div>
                <label className="form-label">Short Description</label>
                <textarea
                  rows={2}
                  placeholder="Optional context about how you use this technology"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                <input
                  type="checkbox"
                  id="activeToggle"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  style={{ width: '16px', height: '16px', accentColor: '#2563EB', cursor: 'pointer' }}
                />
                <label htmlFor="activeToggle" style={{ fontSize: '0.88rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
                  Display on Public Portfolio
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="btn-primary">
                  {submitting && <Loader2 size={15} className="animate-spin" />}
                  <span>{editingSkill ? 'Save Changes' : 'Create Skill'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
