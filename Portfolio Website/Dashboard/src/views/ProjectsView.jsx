import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  Github, 
  Upload, 
  Star, 
  Eye, 
  X, 
  FolderKanban, 
  Loader2 
} from '../components/Icons';
import adminService from '../services/adminService';

export default function ProjectsView({ onNotify }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    image: '',
    techStack: '',
    githubUrl: '',
    liveUrl: '',
    category: 'Full-Stack / AI',
    status: 'Completed',
    isFeatured: true,
    isPublished: true,
  });

  const loadProjects = async () => {
    try {
      const data = await adminService.getProjects();
      setProjects(data || []);
    } catch (err) {
      console.warn('Failed to load projects:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      longDescription: '',
      image: '/images/leetcode_sync.jpg',
      techStack: 'React, Node.js, Python, MongoDB',
      githubUrl: 'https://github.com/hiteshkumar-dev/',
      liveUrl: 'https://',
      category: 'Full-Stack / AI',
      status: 'Completed',
      isFeatured: true,
      isPublished: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (proj) => {
    setEditingProject(proj);
    setFormData({
      title: proj.title,
      description: proj.description || '',
      longDescription: proj.longDescription || '',
      image: proj.image || '',
      techStack: Array.isArray(proj.techStack) ? proj.techStack.join(', ') : (proj.techStack || ''),
      githubUrl: proj.githubUrl || '',
      liveUrl: proj.liveUrl || '',
      category: proj.category || 'Web Application',
      status: proj.status || 'Completed',
      isFeatured: proj.isFeatured !== false,
      isPublished: proj.isPublished !== false,
    });
    setModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const res = await adminService.uploadFile(file);
      if (res?.url) {
        setFormData((prev) => ({ ...prev, image: res.url }));
        onNotify('Project image uploaded!', 'success');
      }
    } catch (err) {
      onNotify(err.message || 'Image upload failed', 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...formData,
      techStack: typeof formData.techStack === 'string'
        ? formData.techStack.split(',').map((t) => t.trim()).filter(Boolean)
        : formData.techStack,
    };

    try {
      if (editingProject) {
        await adminService.updateProject(editingProject._id, payload);
        onNotify(`Project "${formData.title}" updated successfully!`, 'success');
      } else {
        await adminService.createProject(payload);
        onNotify(`Project "${formData.title}" added to database!`, 'success');
      }
      setModalOpen(false);
      await loadProjects();
    } catch (err) {
      onNotify(err.message || 'Error saving project', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (proj) => {
    if (!window.confirm(`Delete project "${proj.title}"?`)) return;
    try {
      await adminService.deleteProject(proj._id);
      onNotify(`Project "${proj.title}" deleted.`, 'success');
      setProjects((prev) => prev.filter((p) => p._id !== proj._id));
    } catch (err) {
      onNotify(err.message || 'Error deleting project', 'error');
    }
  };

  const handleTogglePublish = async (proj) => {
    try {
      await adminService.updateProject(proj._id, { isPublished: !proj.isPublished });
      setProjects((prev) => prev.map((p) => (p._id === proj._id ? { ...p, isPublished: !p.isPublished } : p)));
      onNotify(`Publication status updated.`, 'success');
    } catch (err) {
      onNotify(err.message || 'Error toggling publish state', 'error');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Personal Projects Management
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Add, update, feature, and publish projects to the public creative portfolio.
          </p>
        </div>

        <button onClick={openCreateModal} className="btn-primary">
          <Plus size={16} strokeWidth={2.5} />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
          <Loader2 size={32} className="animate-spin" color="#2563EB" />
        </div>
      ) : projects.length === 0 ? (
        <div className="metis-card" style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <FolderKanban size={40} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
          <p style={{ fontWeight: 600 }}>No projects found in database.</p>
          <button onClick={openCreateModal} className="btn-primary" style={{ marginTop: '14px' }}>
            Create First Project
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px',
          }}
        >
          {projects.map((proj) => (
            <div
              key={proj._id}
              className="metis-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0',
                overflow: 'hidden',
              }}
            >
              {/* Project Thumbnail Image */}
              <div style={{ position: 'relative', height: '170px', backgroundColor: '#1E2532' }}>
                <img
                  src={proj.image || '/images/leetcode_sync.jpg'}
                  alt={proj.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Badges on image */}
                <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '6px' }}>
                  {proj.isFeatured && (
                    <span style={{ backgroundColor: '#F59E0B', color: '#FFFFFF', padding: '3px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Star size={11} fill="white" /> Featured
                    </span>
                  )}
                  <button
                    onClick={() => handleTogglePublish(proj)}
                    style={{
                      backgroundColor: proj.isPublished ? '#10B981' : '#64748B',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {proj.isPublished ? 'Published' : 'Draft'}
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {proj.title}
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, flex: 1 }}>
                  {proj.description}
                </p>

                {/* Tech Stack Pills */}
                {proj.techStack && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '6px 0' }}>
                    {(Array.isArray(proj.techStack) ? proj.techStack : proj.techStack.split(',')).slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.72rem',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          backgroundColor: 'var(--bg-input)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {tech.trim ? tech.trim() : tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Bottom Actions */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', marginTop: 'auto' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }} title="GitHub Repo">
                        <Github size={16} />
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }} title="Live Preview">
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => openEditModal(proj)} className="btn-icon" style={{ width: '32px', height: '32px' }} title="Edit">
                      <Edit3 size={14} />
                    </button>
                    <button onClick={() => handleDelete(proj)} className="btn-icon" style={{ width: '32px', height: '32px', color: '#EF4444' }} title="Delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
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
                {editingProject ? 'Edit Project' : 'Add New Personal Project'}
              </h3>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="form-label">Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. LeetCode GitHub Sync"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Short Summary (Card Preview) *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Concise overview of what this project accomplishes"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div>
                <label className="form-label">In-Depth Case Study Description</label>
                <textarea
                  rows={3}
                  placeholder="Detailed breakdown for case study modal view..."
                  value={formData.longDescription}
                  onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label className="form-label">GitHub Repository URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Live Demo URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Technologies Used (Comma Separated) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. React, Next.js, Python, PostgreSQL, AI"
                  value={formData.techStack}
                  onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  className="form-input"
                />
              </div>

              {/* Upload Screenshot */}
              <div>
                <label className="form-label">Project Screenshot / Mockup Image</label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/images/project.jpg or uploaded URL"
                    className="form-input"
                    style={{ flex: 1 }}
                  />
                  <label
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-card-hover)',
                      border: '1px solid var(--border-subtle)',
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                      color: 'var(--text-primary)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <Upload size={14} />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                  </label>
                </div>
              </div>

              {/* Toggles */}
              <div style={{ display: 'flex', gap: '24px', marginTop: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    id="projFeatured"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    style={{ width: '16px', height: '16px', accentColor: '#2563EB', cursor: 'pointer' }}
                  />
                  <label htmlFor="projFeatured" style={{ fontSize: '0.88rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
                    Mark as Featured Project
                  </label>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    id="projPublished"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    style={{ width: '16px', height: '16px', accentColor: '#2563EB', cursor: 'pointer' }}
                  />
                  <label htmlFor="projPublished" style={{ fontSize: '0.88rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
                    Publish to Public Website
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="btn-primary">
                  {submitting && <Loader2 size={15} className="animate-spin" />}
                  <span>{editingProject ? 'Save Changes' : 'Create Project'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
