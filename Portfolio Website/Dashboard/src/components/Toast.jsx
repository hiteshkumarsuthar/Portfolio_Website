import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from './Icons';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  const isSuccess = type === 'success';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        backgroundColor: 'var(--bg-card)',
        border: `1px solid ${isSuccess ? '#10B981' : '#EF4444'}`,
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: 2000,
        animation: 'slideUp 0.2s ease-out',
        maxWidth: '380px',
      }}
    >
      {isSuccess ? <CheckCircle2 size={18} color="#10B981" /> : <AlertCircle size={18} color="#EF4444" />}
      <span style={{ fontSize: '0.86rem', color: 'var(--text-primary)', fontWeight: 500, flex: 1 }}>
        {message}
      </span>
      <button
        onClick={onClose}
        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px' }}
      >
        <X size={15} />
      </button>
    </div>
  );
}
