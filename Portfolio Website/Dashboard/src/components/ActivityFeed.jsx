import React from 'react';
import { MessageSquare, FolderKanban, Layers, Sparkles, Clock } from './Icons';

export default function ActivityFeed({ liveMessages = [], recentActivities = [] }) {
  // Format relative time helper
  const formatTimeAgo = (dateStr) => {
    if (!dateStr) return 'Recently';
    const diff = Math.floor((new Date() - new Date(dateStr)) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return new Date(dateStr).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  // Determine icon and color based on activity type
  const getIconForType = (type) => {
    switch (type) {
      case 'message':
        return { icon: MessageSquare, color: '#3B82F6', bg: 'rgba(37, 99, 235, 0.15)' };
      case 'project':
        return { icon: FolderKanban, color: '#10B981', bg: 'rgba(16, 185, 129, 0.15)' };
      case 'skill':
        return { icon: Layers, color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.15)' };
      default:
        return { icon: Sparkles, color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.15)' };
    }
  };

  // Build activities list from dynamic MongoDB stats
  let displayList = [];

  if (recentActivities && recentActivities.length > 0) {
    displayList = recentActivities.slice(0, 5).map((act) => {
      const meta = getIconForType(act.type);
      return {
        id: act.id,
        icon: meta.icon,
        iconColor: meta.color,
        iconBg: meta.bg,
        title: act.title,
        detail: `${act.detail} · ${formatTimeAgo(act.timestamp)}`,
      };
    });
  } else if (liveMessages && liveMessages.length > 0) {
    displayList = liveMessages.slice(0, 5).map((m) => {
      const meta = getIconForType('message');
      return {
        id: m._id,
        icon: meta.icon,
        iconColor: meta.color,
        iconBg: meta.bg,
        title: `Inquiry from ${m.name}`,
        detail: `${m.contact} · ${formatTimeAgo(m.createdAt)}`,
      };
    });
  }

  return (
    <div className="metis-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '18px' }}>
        Recent Activity
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {displayList.length === 0 ? (
          <div style={{ padding: '20px 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.86rem' }}>
            No recent activity yet. Updates will appear here in real-time.
          </div>
        ) : (
          displayList.map((act) => {
            const Icon = act.icon;
            return (
              <div
                key={act.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  padding: '4px 0',
                }}
              >
                {/* Rounded square icon container */}
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: act.iconBg || 'rgba(37, 99, 235, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: act.iconColor || '#3B82F6',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={17} />
                </div>

                {/* Text content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: '0.86rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '2px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {act.title}
                  </p>
                  <p
                    style={{
                      fontSize: '0.76rem',
                      color: 'var(--text-muted)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {act.detail}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
