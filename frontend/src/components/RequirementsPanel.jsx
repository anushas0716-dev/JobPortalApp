import React, { useState } from 'react';
import { SKILLS_OPTIONS, EXPERIENCE_LEVELS, EDUCATION_LEVELS } from '../data';

const styles = {
  panel: {
    background: '#0d1520',
    border: '1px solid #ffffff0f',
    borderRadius: 16,
    padding: 24,
    position: 'sticky',
    top: 24,
  },
  heading: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 18,
    fontWeight: 800,
    color: '#e8f0fe',
    marginBottom: 4,
    letterSpacing: '-0.02em',
  },
  subheading: {
    fontSize: 12,
    color: '#445566',
    marginBottom: 24,
    fontFamily: "'Space Mono', monospace",
  },
  label: {
    fontSize: 11,
    fontWeight: 600,
    color: '#445566',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: 8,
    display: 'block',
  },
  section: { marginBottom: 20 },
  input: {
    width: '100%',
    background: '#070d14',
    border: '1px solid #ffffff12',
    borderRadius: 8,
    padding: '9px 12px',
    color: '#e8f0fe',
    fontSize: 13,
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  select: {
    width: '100%',
    background: '#070d14',
    border: '1px solid #ffffff12',
    borderRadius: 8,
    padding: '9px 12px',
    color: '#e8f0fe',
    fontSize: 13,
    outline: 'none',
    appearance: 'none',
    cursor: 'pointer',
  },
  skillsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
    maxHeight: 200,
    overflowY: 'auto',
    padding: '2px 0',
  },
  skillChip: (selected) => ({
    padding: '5px 11px',
    borderRadius: 6,
    fontSize: 11,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.18s',
    background: selected ? '#00e5a020' : '#0a1520',
    color: selected ? '#00e5a0' : '#445566',
    border: `1px solid ${selected ? '#00e5a040' : '#ffffff10'}`,
    userSelect: 'none',
  }),
  divider: {
    height: 1,
    background: '#ffffff08',
    margin: '20px 0',
  },
  filterBtn: {
    width: '100%',
    padding: '11px 0',
    borderRadius: 10,
    border: 'none',
    background: 'linear-gradient(135deg, #00e5a0, #00c885)',
    color: '#070d14',
    fontWeight: 700,
    fontSize: 13,
    fontFamily: "'Syne', sans-serif",
    letterSpacing: '0.04em',
    transition: 'all 0.2s',
    boxShadow: '0 4px 20px #00e5a030',
  },
  resetBtn: {
    width: '100%',
    padding: '9px 0',
    borderRadius: 10,
    border: '1px solid #ffffff10',
    background: 'transparent',
    color: '#445566',
    fontWeight: 600,
    fontSize: 12,
    marginTop: 8,
    transition: 'all 0.2s',
  },
  scoreRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  scoreInput: {
    flex: 1,
    background: '#070d14',
    border: '1px solid #ffffff12',
    borderRadius: 8,
    padding: '9px 12px',
    color: '#e8f0fe',
    fontSize: 13,
    outline: 'none',
  },
  scoreLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: 13,
    color: '#00e5a0',
    minWidth: 36,
    textAlign: 'right',
  },
};

export default function RequirementsPanel({ requirements, onChange, onFilter, onReset }) {
  const [skillSearch, setSkillSearch] = useState('');

  const toggleSkill = (skill) => {
    const current = requirements.skills;
    if (current.includes(skill)) {
      onChange({ ...requirements, skills: current.filter(s => s !== skill) });
    } else {
      onChange({ ...requirements, skills: [...current, skill] });
    }
  };

  const filteredSkills = SKILLS_OPTIONS.filter(s =>
    s.toLowerCase().includes(skillSearch.toLowerCase())
  );

  return (
    <div style={styles.panel}>
      <h2 style={styles.heading}>Job Requirements</h2>
      <p style={styles.subheading}>Set filters to match candidates</p>

      {/* Job Title */}
      <div style={styles.section}>
        <label style={styles.label}>Job Title / Role</label>
        <input
          style={styles.input}
          placeholder="e.g. Senior React Developer"
          value={requirements.jobTitle}
          onChange={e => onChange({ ...requirements, jobTitle: e.target.value })}
          onFocus={e => e.target.style.borderColor = '#00e5a050'}
          onBlur={e => e.target.style.borderColor = '#ffffff12'}
        />
      </div>

      {/* Required Skills */}
      <div style={styles.section}>
        <label style={styles.label}>Required Skills ({requirements.skills.length} selected)</label>
        <input
          style={{ ...styles.input, marginBottom: 8 }}
          placeholder="Search skills..."
          value={skillSearch}
          onChange={e => setSkillSearch(e.target.value)}
          onFocus={e => e.target.style.borderColor = '#00e5a050'}
          onBlur={e => e.target.style.borderColor = '#ffffff12'}
        />
        <div style={styles.skillsGrid}>
          {filteredSkills.map(skill => (
            <span
              key={skill}
              style={styles.skillChip(requirements.skills.includes(skill))}
              onClick={() => toggleSkill(skill)}
            >
              {requirements.skills.includes(skill) ? '✓ ' : ''}{skill}
            </span>
          ))}
        </div>
      </div>

      <div style={styles.divider} />

      {/* Experience Level */}
      <div style={styles.section}>
        <label style={styles.label}>Experience Level</label>
        <div style={{ position: 'relative' }}>
          <select
            style={styles.select}
            value={requirements.experienceLevel}
            onChange={e => onChange({ ...requirements, experienceLevel: e.target.value })}
          >
            {EXPERIENCE_LEVELS.map(lvl => (
              <option key={lvl.label} value={lvl.label}>{lvl.label}</option>
            ))}
          </select>
          <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: '#445566', pointerEvents: 'none' }}>▾</span>
        </div>
      </div>

      {/* Education */}
      <div style={styles.section}>
        <label style={styles.label}>Minimum Education</label>
        <div style={{ position: 'relative' }}>
          <select
            style={styles.select}
            value={requirements.education}
            onChange={e => onChange({ ...requirements, education: e.target.value })}
          >
            {EDUCATION_LEVELS.map(lvl => (
              <option key={lvl} value={lvl}>{lvl}</option>
            ))}
          </select>
          <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: '#445566', pointerEvents: 'none' }}>▾</span>
        </div>
      </div>

      {/* Min Match Score */}
      <div style={styles.section}>
        <label style={styles.label}>Min Match Score</label>
        <div style={styles.scoreRow}>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={requirements.minScore}
            onChange={e => onChange({ ...requirements, minScore: Number(e.target.value) })}
            style={{ flex: 1, accentColor: '#00e5a0' }}
          />
          <span style={styles.scoreLabel}>{requirements.minScore}%</span>
        </div>
      </div>

      <div style={styles.divider} />

      <button style={styles.filterBtn} onClick={onFilter}
        onMouseEnter={e => e.target.style.transform = 'translateY(-1px)'}
        onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
      >
        ⚡ Filter Candidates
      </button>
      <button style={styles.resetBtn} onClick={onReset}
        onMouseEnter={e => { e.target.style.color = '#8899bb'; e.target.style.borderColor = '#ffffff20'; }}
        onMouseLeave={e => { e.target.style.color = '#445566'; e.target.style.borderColor = '#ffffff10'; }}
      >
        Reset All Filters
      </button>
    </div>
  );
}
