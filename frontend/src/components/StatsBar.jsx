import React from 'react';

export default function StatsBar({ total, filtered, shortlisted, avgScore }) {
  const stats = [
    { label: 'Total Candidates', value: total, color: '#4a90d9' },
    { label: 'Filtered Results', value: filtered, color: '#00e5a0' },
    { label: 'Shortlisted', value: shortlisted, color: '#f5c518' },
    { label: 'Avg Match Score', value: `${avgScore}%`, color: '#a78bfa' },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 12,
      marginBottom: 24,
    }}>
      {stats.map((stat) => (
        <div key={stat.label} style={{
          background: '#0d1520',
          border: '1px solid #ffffff0f',
          borderRadius: 12,
          padding: '14px 18px',
        }}>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 22,
            fontWeight: 700,
            color: stat.color,
            lineHeight: 1,
            marginBottom: 5,
          }}>
            {stat.value}
          </div>
          <div style={{ fontSize: 11, color: '#445566', fontWeight: 500 }}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
