import React, { useState } from 'react';

const EDUCATION_ORDER = ["High School", "Associate's", "Bachelor's", "Master's", "PhD"];

function ScoreRing({ score }) {
  const color = score >= 85 ? '#00e5a0' : score >= 70 ? '#f5c518' : '#ff6b6b';
  const circumference = 2 * Math.PI * 20;
  const strokeDash = (score / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: 56, height: 56, flexShrink: 0 }}>
      <svg width="56" height="56" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="28" cy="28" r="20" fill="none" stroke="#ffffff0a" strokeWidth="3" />
        <circle
          cx="28" cy="28" r="20" fill="none"
          stroke={color} strokeWidth="3"
          strokeDasharray={`${strokeDash} ${circumference}`}
          strokeLinecap="round"
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column',
      }}>
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 11, fontWeight: 700, color, lineHeight: 1
        }}>{score}</span>
      </div>
    </div>
  );
}

function ResumeUploader({ candidateId, resumeFile, resumeUrl, onUpload }) {
  const [dragging, setDragging] = useState(false);

  const handleFile = (file) => {
    if (!file) return;
    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file only.');
      return;
    }
    const url = URL.createObjectURL(file);
    onUpload(candidateId, file, url);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div style={{ marginTop: 12 }}>
      {resumeFile ? (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 12px', borderRadius: 8,
          background: '#00e5a00a', border: '1px solid #00e5a025',
        }}>
          <span style={{ fontSize: 16 }}>📄</span>
          <span style={{ flex: 1, fontSize: 11, color: '#00e5a0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {resumeFile.name}
          </span>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 10, fontWeight: 700, color: '#00e5a0',
              textDecoration: 'none', padding: '3px 8px',
              border: '1px solid #00e5a040', borderRadius: 4,
              background: '#00e5a015',
            }}
          >VIEW</a>
          <label style={{ cursor: 'pointer', fontSize: 10, color: '#445566', padding: '3px 8px',
            border: '1px solid #ffffff10', borderRadius: 4 }}>
            Replace
            <input type="file" accept=".pdf" style={{ display: 'none' }}
              onChange={e => handleFile(e.target.files[0])} />
          </label>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          style={{
            border: `1.5px dashed ${dragging ? '#00e5a0' : '#ffffff15'}`,
            borderRadius: 8, padding: '10px 14px',
            display: 'flex', alignItems: 'center', gap: 8,
            background: dragging ? '#00e5a008' : 'transparent',
            transition: 'all 0.2s',
          }}
        >
          <span style={{ fontSize: 14 }}>📎</span>
          <span style={{ flex: 1, fontSize: 11, color: '#445566' }}>
            Drop PDF resume here or{' '}
            <label style={{ color: '#4a90d9', cursor: 'pointer', textDecoration: 'underline' }}>
              browse
              <input type="file" accept=".pdf" style={{ display: 'none' }}
                onChange={e => handleFile(e.target.files[0])} />
            </label>
          </span>
        </div>
      )}
    </div>
  );
}

export default function CandidateCard({ candidate, requiredSkills, onToggleShortlist, onUpload, index }) {
  const [expanded, setExpanded] = useState(false);

  const matchedSkills = requiredSkills.filter(s => candidate.skills.includes(s));
  const unmatchedSkills = candidate.skills.filter(s => !requiredSkills.includes(s));
  const missingSkills = requiredSkills.filter(s => !candidate.skills.includes(s));

  const scoreColor = candidate.score >= 85 ? '#00e5a0' : candidate.score >= 70 ? '#f5c518' : '#ff6b6b';

  return (
    <div
      className="animate-in"
      style={{
        background: '#0d1520',
        border: `1px solid ${candidate.shortlisted ? '#00e5a025' : '#ffffff0f'}`,
        borderRadius: 14,
        padding: 20,
        transition: 'all 0.25s',
        animationDelay: `${index * 0.06}s`,
        animationFillMode: 'both',
        boxShadow: candidate.shortlisted ? '0 0 30px #00e5a010' : 'none',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = candidate.shortlisted ? '#00e5a040' : '#ffffff18'}
      onMouseLeave={e => e.currentTarget.style.borderColor = candidate.shortlisted ? '#00e5a025' : '#ffffff0f'}
    >
      {/* Top Row */}
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        <ScoreRing score={candidate.score} />

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Name + Actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, flexWrap: 'wrap' }}>
            <div>
              <h3 style={{
                margin: 0, fontSize: 15, fontWeight: 700,
                fontFamily: "'Syne', sans-serif", color: '#e8f0fe',
                letterSpacing: '-0.01em',
              }}>
                {candidate.name}
                {candidate.shortlisted && (
                  <span style={{ marginLeft: 8, fontSize: 10, padding: '2px 7px', borderRadius: 10,
                    background: '#00e5a015', color: '#00e5a0', border: '1px solid #00e5a030', verticalAlign: 'middle' }}>
                    SHORTLISTED
                  </span>
                )}
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: 12, color: '#4a90d9', fontFamily: "'Space Mono', monospace" }}>
                {candidate.role} · {candidate.location}
              </p>
            </div>

            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
              <button
                onClick={() => onToggleShortlist(candidate.id)}
                style={{
                  padding: '5px 12px', borderRadius: 7, fontSize: 11,
                  fontWeight: 700, transition: 'all 0.18s',
                  background: candidate.shortlisted ? '#00e5a020' : 'transparent',
                  color: candidate.shortlisted ? '#00e5a0' : '#556677',
                  border: `1px solid ${candidate.shortlisted ? '#00e5a040' : '#ffffff12'}`,
                }}
              >
                {candidate.shortlisted ? '✓ Shortlisted' : '+ Shortlist'}
              </button>
              <button
                onClick={() => setExpanded(!expanded)}
                style={{
                  padding: '5px 10px', borderRadius: 7, fontSize: 11,
                  fontWeight: 600, background: 'transparent',
                  color: '#445566', border: '1px solid #ffffff10', transition: 'all 0.18s',
                }}
              >
                {expanded ? '▲' : '▼'}
              </button>
            </div>
          </div>

          {/* Meta row */}
          <div style={{ display: 'flex', gap: 14, marginTop: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, color: '#445566', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span>🎓</span> {candidate.education}
            </span>
            <span style={{ fontSize: 11, color: '#445566', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span>⏱</span> {candidate.experienceYears} yr{candidate.experienceYears !== 1 ? 's' : ''}
            </span>
            <span style={{ fontSize: 11, color: '#445566', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span>✉</span> {candidate.email}
            </span>
          </div>

          {/* Skills row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 10 }}>
            {matchedSkills.map(skill => (
              <span key={skill} style={{
                padding: '3px 9px', borderRadius: 5, fontSize: 10, fontWeight: 700,
                background: '#00e5a015', color: '#00e5a0', border: '1px solid #00e5a030',
              }}>{skill}</span>
            ))}
            {unmatchedSkills.map(skill => (
              <span key={skill} style={{
                padding: '3px 9px', borderRadius: 5, fontSize: 10, fontWeight: 600,
                background: '#ffffff05', color: '#445566', border: '1px solid #ffffff0a',
              }}>{skill}</span>
            ))}
          </div>

          {/* Match info */}
          {requiredSkills.length > 0 && (
            <div style={{ marginTop: 8, fontSize: 11, color: '#445566' }}>
              <span style={{ color: '#00e5a0', fontWeight: 700 }}>{matchedSkills.length}</span>
              <span>/{requiredSkills.length} required skills matched</span>
              {missingSkills.length > 0 && (
                <span style={{ marginLeft: 8, color: '#ff6b6b' }}>
                  Missing: {missingSkills.join(', ')}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Expanded section */}
      {expanded && (
        <div style={{
          marginTop: 16,
          paddingTop: 16,
          borderTop: '1px solid #ffffff08',
          animation: 'fadeInUp 0.2s ease',
        }}>
          {/* Summary */}
          <p style={{ fontSize: 12, color: '#8899bb', lineHeight: 1.6, marginBottom: 12 }}>
            {candidate.summary}
          </p>

          {/* Score breakdown */}
          <div style={{
            background: '#070d14', borderRadius: 10, padding: '12px 16px',
            border: '1px solid #ffffff08', marginBottom: 12,
          }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: '#445566', letterSpacing: '0.08em',
              textTransform: 'uppercase', marginBottom: 8 }}>
              Match Breakdown
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {[
                { label: 'Overall', val: candidate.score, color: scoreColor },
                { label: 'Skills', val: requiredSkills.length > 0 ? Math.round((matchedSkills.length / requiredSkills.length) * 100) : 100, color: '#4a90d9' },
                { label: 'Experience', val: 80, color: '#f5c518' },
                { label: 'Education', val: 75, color: '#a78bfa' },
              ].map(item => (
                <div key={item.label} style={{ minWidth: 80 }}>
                  <div style={{ fontSize: 10, color: '#445566', marginBottom: 4 }}>{item.label}</div>
                  <div style={{ height: 4, background: '#ffffff0a', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${item.val}%`,
                      background: item.color, borderRadius: 2,
                      transition: 'width 0.6s ease',
                    }} />
                  </div>
                  <div style={{ fontSize: 10, color: item.color, marginTop: 2, fontFamily: "'Space Mono', monospace" }}>
                    {item.val}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resume uploader */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, color: '#445566', letterSpacing: '0.08em',
              textTransform: 'uppercase', marginBottom: 6 }}>
              Resume (PDF)
            </p>
            <ResumeUploader
              candidateId={candidate.id}
              resumeFile={candidate.resumeFile}
              resumeUrl={candidate.resumeUrl}
              onUpload={onUpload}
            />
          </div>
        </div>
      )}
    </div>
  );
}
