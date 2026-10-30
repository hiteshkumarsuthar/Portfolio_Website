import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Trash2, 
  CheckCheck, 
  Phone, 
  Clock, 
  Globe, 
  AlertCircle, 
  CheckCircle2, 
  Loader2 
} from '../components/Icons';
import adminService from '../services/adminService';

export default function MessagesView({ onNotify, onRefreshStats }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const loadMessages = async () => {
    try {
      const data = await adminService.getMessages();
      setMessages(data || []);
      if (data && data.length > 0 && !selectedMessage) {
        setSelectedMessage(data[0]);
      }
    } catch (err) {
      console.warn('Failed to load messages:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleSelectMessage = async (msg) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      try {
        await adminService.markMessageRead(msg._id);
        setMessages((prev) => prev.map((m) => (m._id === msg._id ? { ...m, isRead: true } : m)));
        if (onRefreshStats) onRefreshStats();
      } catch (err) {
        console.warn('Could not mark read:', err.message);
      }
    }
  };

  const handleDelete = async (msg) => {
    if (!window.confirm(`Delete message from "${msg.name}"?`)) return;
    try {
      await adminService.deleteMessage(msg._id);
      onNotify('Message deleted.', 'success');
      setMessages((prev) => prev.filter((m) => m._id !== msg._id));
      if (selectedMessage?._id === msg._id) {
        setSelectedMessage(null);
      }
      if (onRefreshStats) onRefreshStats();
    } catch (err) {
      onNotify(err.message || 'Error deleting message', 'error');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Contact Inquiries & Messages
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Inquiries received directly from the public portfolio contact form, stored securely in MongoDB.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Total Inquiries: <strong style={{ color: 'var(--text-primary)' }}>{messages.length}</strong>
          </span>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
          <Loader2 size={32} className="animate-spin" color="#2563EB" />
        </div>
      ) : messages.length === 0 ? (
        <div className="metis-card" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <Mail size={44} style={{ margin: '0 auto 14px', opacity: 0.4 }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>No Inquiries Yet</h3>
          <p style={{ fontSize: '0.86rem', marginTop: '4px' }}>
            When a visitor submits the contact form on your portfolio website, it will immediately appear here.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(360px, 1.5fr)', gap: '20px', alignItems: 'start' }}>
          {/* Messages List Column */}
          <div className="metis-card" style={{ padding: '12px 0', maxHeight: '720px', overflowY: 'auto' }}>
            {messages.map((msg) => {
              const isSelected = selectedMessage?._id === msg._id;
              return (
                <div
                  key={msg._id}
                  onClick={() => handleSelectMessage(msg)}
                  style={{
                    padding: '14px 20px',
                    borderBottom: '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    backgroundColor: isSelected ? 'rgba(37, 99, 235, 0.12)' : 'transparent',
                    borderLeft: isSelected ? '3px solid #2563EB' : '3px solid transparent',
                    transition: 'var(--transition)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: msg.isRead ? 600 : 800, color: 'var(--text-primary)' }}>
                      {msg.name}
                    </h4>
                    {!msg.isRead && (
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                    )}
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#3B82F6', marginBottom: '6px' }}>
                    {msg.contact}
                  </p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {msg.message}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Message Detail Column */}
          {selectedMessage ? (
            <div className="metis-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
                <div>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {selectedMessage.name}
                  </h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.84rem', color: '#3B82F6', fontWeight: 600 }}>
                      {selectedMessage.contact}
                    </span>
                    <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> {new Date(selectedMessage.createdAt).toLocaleString()}
                    </span>
                    {selectedMessage.ip && (
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Globe size={12} /> {selectedMessage.ip}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(selectedMessage)}
                  className="btn-icon"
                  style={{ color: '#EF4444' }}
                  title="Delete message"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Message Body */}
              <div style={{ backgroundColor: 'var(--bg-input)', padding: '20px', borderRadius: '8px', lineHeight: 1.7, fontSize: '0.94rem', color: 'var(--text-primary)', whiteSpace: 'pre-wrap' }}>
                {selectedMessage.message}
              </div>

              {/* Reply Link */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
                <a
                  href={`mailto:${selectedMessage.contact}?subject=Re: Inquiry from Portfolio&body=Hi ${selectedMessage.name},%0D%0A%0D%0AThank you for reaching out!`}
                  className="btn-primary"
                  style={{ textDecoration: 'none' }}
                >
                  <Mail size={16} />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="metis-card" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
              Select an inquiry from the list to view full details.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
