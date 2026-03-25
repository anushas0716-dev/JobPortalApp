import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileSetupWizard = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = storedUser?.full_name || storedUser?.first_name || storedUser?.username || 'Alex Rivera';

  const [currentStep, setCurrentStep] = useState(0);

  // Step 1 — Basic Info
  const [headline, setHeadline] = useState('');
  const [location, setLocation] = useState('');
  const [workPreference, setWorkPreference] = useState('Remote');
  const [bio, setBio] = useState('');

  // Step 2 — Experience
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [expYears, setExpYears] = useState('');
  const [currentlyWorking, setCurrentlyWorking] = useState(false);

  // Step 3 — Education
  const [degree, setDegree] = useState('');
  const [school, setSchool] = useState('');
  const [gradYear, setGradYear] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');

  // Step 4 — Skills
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState(['Figma', 'React', 'UI/UX']);

  const steps = [
    { title: 'Basic Info',     icon: '👤', path: null },
    { title: 'Experience',     icon: '💼', path: null },
    { title: 'Education',      icon: '🎓', path: null },
    { title: 'Skills & Tools', icon: '🔧', path: null },
  ];

  // Completion % based on step
  const completionMap = [25, 50, 75, 100];
  const completion = completionMap[currentStep];

  // ── Add skill chip ──
  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
    }
    setSkillInput('');
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter(s => s !== skill));
  };

  // ── Save current step data to localStorage ──
  const saveProgress = () => {
    const profileData = {
      headline, location, workPreference, bio,
      jobTitle, company, expYears, currentlyWorking,
      degree, school, gradYear, fieldOfStudy,
      skills,
    };
    localStorage.setItem('profileSetup', JSON.stringify(profileData));
  };

  // ── Next step handler ──
  const handleNext = () => {
    saveProgress();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Final step — go to candidate profile
      navigate('/candidate-profile');
    }
  };

  // ── Back handler ──
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/candidate-dashboard');
    }
  };

  // ── Skip ──
  const handleSkip = () => {
    navigate('/candidate-dashboard');
  };

  // ── Step content renderer ──
  const renderStep = () => {
    switch (currentStep) {

      // ────── STEP 1: Basic Info ──────
      case 0:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.75px', marginBottom: '8px' }}>Tell us about yourself</h2>
              <p style={{ fontSize: '16px', color: '#64748B', lineHeight: '24px' }}>Your headline and location help recruiters find you for the right roles.</p>
            </div>

            {/* Headline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={labelStyle}>Professional Headline</label>
              <input className="pf-input" placeholder="e.g. Senior Full Stack Developer | React & Node.js"
                value={headline} onChange={e => setHeadline(e.target.value.slice(0, 80))} />
              <p style={hintStyle}>{headline.length}/80 characters</p>
            </div>

            {/* Location + Work Preference */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={labelStyle}>Current Location</label>
                <div style={{ position: 'relative' }}>
                  <span style={iconStyle}>📍</span>
                  <input className="pf-input" placeholder="San Francisco, CA" value={location}
                    onChange={e => setLocation(e.target.value)} style={{ paddingLeft: '44px' }} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={labelStyle}>Work Preference</label>
                <div style={{ position: 'relative' }}>
                  <span style={iconStyle}>🏠</span>
                  <select value={workPreference} onChange={e => setWorkPreference(e.target.value)}
                    style={{ ...selectStyle, paddingLeft: '44px' }}>
                    <option>Remote</option>
                    <option>Hybrid</option>
                    <option>On-site</option>
                  </select>
                  <span style={chevronStyle}>▾</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={labelStyle}>Bio <span style={{ color: '#94A3B8', fontWeight: '400' }}>(Optional)</span></label>
              <textarea className="pf-input" placeholder="Write a short summary about your professional journey..."
                value={bio} onChange={e => setBio(e.target.value)}
                rows={4} style={{ resize: 'vertical', lineHeight: '24px' }} />
            </div>
          </div>
        );

      // ────── STEP 2: Experience ──────
      case 1:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.75px', marginBottom: '8px' }}>Work Experience</h2>
              <p style={{ fontSize: '16px', color: '#64748B', lineHeight: '24px' }}>Add your most recent role. You can add more later from your profile.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={labelStyle}>Job Title</label>
                <input className="pf-input" placeholder="e.g. Senior Product Designer" value={jobTitle}
                  onChange={e => setJobTitle(e.target.value)} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={labelStyle}>Company</label>
                <input className="pf-input" placeholder="e.g. TechFlow Inc." value={company}
                  onChange={e => setCompany(e.target.value)} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={labelStyle}>Years of Experience</label>
                <div style={{ position: 'relative' }}>
                  <select value={expYears} onChange={e => setExpYears(e.target.value)} style={selectStyle}>
                    <option value="">Select years</option>
                    {['< 1 year','1–2 years','3–5 years','5–8 years','8–10 years','10+ years'].map(y => (
                      <option key={y}>{y}</option>
                    ))}
                  </select>
                  <span style={chevronStyle}>▾</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={labelStyle}>Employment Type</label>
                <div style={{ position: 'relative' }}>
                  <select style={selectStyle}>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Freelance</option>
                    <option>Internship</option>
                  </select>
                  <span style={chevronStyle}>▾</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input type="checkbox" id="currentWork" checked={currentlyWorking}
                onChange={e => setCurrentlyWorking(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#137FEC', cursor: 'pointer' }} />
              <label htmlFor="currentWork" style={{ fontSize: '15px', color: '#475569', cursor: 'pointer', fontWeight: '500' }}>
                I currently work here
              </label>
            </div>

            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '20px' }}>💡</span>
              <p style={{ fontSize: '14px', color: '#475569', lineHeight: '20px' }}>
                Want to add more details? Visit your{' '}
                <button onClick={() => navigate('/work-experience')} style={{ background: 'none', border: 'none', color: '#137FEC', fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: '14px' }}>
                  Work Experience Editor
                </button>{' '}after setup.
              </p>
            </div>
          </div>
        );

      // ────── STEP 3: Education ──────
      case 2:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.75px', marginBottom: '8px' }}>Education</h2>
              <p style={{ fontSize: '16px', color: '#64748B', lineHeight: '24px' }}>Add your highest degree. You can add more from your profile later.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={labelStyle}>Degree</label>
                <div style={{ position: 'relative' }}>
                  <select value={degree} onChange={e => setDegree(e.target.value)} style={selectStyle}>
                    <option value="">Select degree</option>
                    {["High School","Associate's","Bachelor's","Master's","MBA","PhD","Bootcamp / Certificate","Self-taught"].map(d => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                  <span style={chevronStyle}>▾</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={labelStyle}>Graduation Year</label>
                <div style={{ position: 'relative' }}>
                  <select value={gradYear} onChange={e => setGradYear(e.target.value)} style={selectStyle}>
                    <option value="">Select year</option>
                    {Array.from({ length: 30 }, (_, i) => String(2025 - i)).map(y => (
                      <option key={y}>{y}</option>
                    ))}
                  </select>
                  <span style={chevronStyle}>▾</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={labelStyle}>School / University</label>
              <input className="pf-input" placeholder="e.g. Stanford University" value={school}
                onChange={e => setSchool(e.target.value)} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={labelStyle}>Field of Study <span style={{ color: '#94A3B8', fontWeight: '400' }}>(Optional)</span></label>
              <input className="pf-input" placeholder="e.g. Computer Science, Design, Business" value={fieldOfStudy}
                onChange={e => setFieldOfStudy(e.target.value)} />
            </div>

            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '20px' }}>📚</span>
              <p style={{ fontSize: '14px', color: '#475569', lineHeight: '20px' }}>
                Want to add more details?{' '}
                <button onClick={() => navigate('/education')} style={{ background: 'none', border: 'none', color: '#137FEC', fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: '14px' }}>
                  Education Details Editor →
                </button>
              </p>
            </div>
          </div>
        );

      // ────── STEP 4: Skills ──────
      case 3:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.75px', marginBottom: '8px' }}>Skills & Tools</h2>
              <p style={{ fontSize: '16px', color: '#64748B', lineHeight: '24px' }}>Add your top skills. These help match you with the right opportunities.</p>
            </div>

            {/* Skill input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={labelStyle}>Add a Skill</label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input className="pf-input" placeholder="e.g. Figma, Python, Product Management"
                  value={skillInput} onChange={e => setSkillInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
                  style={{ flex: 1 }} />
                <button onClick={addSkill}
                  style={{ padding: '0 24px', background: '#137FEC', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif", flexShrink: 0 }}>
                  Add
                </button>
              </div>
              <p style={hintStyle}>Press Enter or click Add. Recruiters search by skills.</p>
            </div>

            {/* Skill chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {skills.map(skill => (
                <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(19,127,236,0.1)', border: '1px solid rgba(19,127,236,0.2)', borderRadius: '9999px', padding: '6px 14px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#137FEC' }}>{skill}</span>
                  <button onClick={() => removeSkill(skill)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: '14px', lineHeight: 1, padding: '0 2px' }}>✕</button>
                </div>
              ))}
              {skills.length === 0 && (
                <p style={{ fontSize: '14px', color: '#94A3B8', fontStyle: 'italic' }}>No skills added yet. Type above and press Enter.</p>
              )}
            </div>

            {/* Suggested skills */}
            <div>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#64748B', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Suggested Skills</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['JavaScript','TypeScript','Node.js','Python','Figma','UI/UX','Product Management','SQL','React','AWS','Design Systems','Agile'].map(s => (
                  !skills.includes(s) && (
                    <button key={s} onClick={() => setSkills([...skills, s])}
                      style={{ padding: '6px 14px', background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: '9999px', fontSize: '13px', fontWeight: '600', color: '#475569', cursor: 'pointer', fontFamily: "'Inter', sans-serif", transition: 'all 0.15s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(19,127,236,0.1)'; e.currentTarget.style.color = '#137FEC'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.color = '#475569'; }}>
                      + {s}
                    </button>
                  )
                ))}
              </div>
            </div>

            <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '20px' }}>🎯</span>
              <p style={{ fontSize: '14px', color: '#166534', lineHeight: '20px' }}>
                Adding 5+ skills increases your profile visibility by <strong>3x</strong>. You currently have <strong>{skills.length}</strong>.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // ── Shared styles ──
  const labelStyle = { fontSize: '15px', fontWeight: '600', color: '#334155' };
  const hintStyle = { fontSize: '12px', color: '#94A3B8' };
  const iconStyle = { position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px', pointerEvents: 'none' };
  const selectStyle = { width: '100%', padding: '16px', background: '#F6F7F8', border: '1px solid #E2E8F0', borderRadius: '12px', fontSize: '16px', fontFamily: "'Inter', sans-serif", color: '#0F172A', outline: 'none', appearance: 'none', cursor: 'pointer' };
  const chevronStyle = { position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#6B7280', pointerEvents: 'none', fontSize: '14px' };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#F6F7F8', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .pf-input { width: 100%; padding: 16px; background: #F6F7F8; border: 1px solid #E2E8F0; border-radius: 12px; font-size: 15px; font-family: 'Inter', sans-serif; color: #0F172A; outline: none; transition: border 0.2s, box-shadow 0.2s; }
        .pf-input::placeholder { color: #94A3B8; }
        .pf-input:focus { border-color: #137FEC; background: #fff; box-shadow: 0 0 0 3px rgba(19,127,236,0.1); }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 80px', height: '73px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => navigate('/candidate-dashboard')}>
          <div style={{ background: '#137FEC', borderRadius: '8px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: '18px' }}>💼</span>
          </div>
          <span style={{ fontWeight: '700', fontSize: '20px', letterSpacing: '-0.5px', color: '#0F172A' }}>JobPortal</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }} onClick={() => navigate('/candidate-profile')}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A' }}>{userName}</p>
            <p style={{ fontSize: '12px', color: '#64748B' }}>Candidate Account</p>
          </div>
          <div style={{ width: '40px', height: '40px', background: 'rgba(19,127,236,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(19,127,236,0.2)' }}>
            <span style={{ fontSize: '20px' }}>👤</span>
          </div>
        </div>
      </nav>

      {/* ── MAIN ── */}
      <div style={{ flex: 1, padding: '48px 80px', display: 'flex', gap: '48px', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>

        {/* ── LEFT SIDEBAR ── */}
        <div style={{ width: '280px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>Profile Setup</h1>
            <p style={{ fontSize: '14px', color: '#64748B' }}>Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}</p>
          </div>

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {steps.map((step, i) => (
              <button key={step.title}
                onClick={() => setCurrentStep(i)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 16px', gap: '12px', borderRadius: '10px', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: "'Inter', sans-serif",
                  background: currentStep === i ? 'rgba(19,127,236,0.1)' : 'transparent',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => { if (currentStep !== i) e.currentTarget.style.background = '#F1F5F9'; }}
                onMouseLeave={e => { if (currentStep !== i) e.currentTarget.style.background = 'transparent'; }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: i < currentStep ? '#137FEC' : i === currentStep ? 'rgba(19,127,236,0.15)' : '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>
                    {i < currentStep ? '✓' : step.icon}
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: currentStep === i ? '700' : '500', color: currentStep === i ? '#137FEC' : i < currentStep ? '#059669' : '#64748B' }}>
                    {step.title}
                  </span>
                </div>
                {currentStep === i && <span style={{ color: '#137FEC', fontSize: '16px' }}>›</span>}
                {i < currentStep && <span style={{ color: '#059669', fontSize: '14px', fontWeight: '700' }}>✓</span>}
              </button>
            ))}
          </div>

          {/* Completion */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', marginTop: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>Completion</span>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#137FEC' }}>{completion}%</span>
            </div>
            <div style={{ background: '#F1F5F9', borderRadius: '9999px', height: '8px', marginBottom: '10px' }}>
              <div style={{ background: '#137FEC', borderRadius: '9999px', height: '8px', width: `${completion}%`, transition: 'width 0.4s ease' }} />
            </div>
            <p style={{ fontSize: '12px', color: '#64748B', lineHeight: '16px' }}>
              {completion < 100
                ? `Complete ${steps[currentStep + 1]?.title || 'this step'} to reach ${completionMap[currentStep + 1] || 100}%`
                : '🎉 Profile is complete!'}
            </p>
          </div>

          {/* Quick links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <p style={{ fontSize: '11px', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '4px' }}>Other Profile Sections</p>
            {[
              { label: '🔗 Portfolio Links',   path: '/portfolio' },
              { label: '💰 Salary Expectations', path: '/salary' },
              { label: '🎯 Job Preferences',    path: '/job-preferences' },
              { label: '🔒 Privacy Settings',   path: '/privacy' },
            ].map(link => (
              <button key={link.label} onClick={() => navigate(link.path)}
                style={{ padding: '8px 12px', background: '#F8FAFC', border: '1px solid #F1F5F9', borderRadius: '8px', fontSize: '12px', fontWeight: '600', color: '#475569', cursor: 'pointer', fontFamily: "'Inter', sans-serif", textAlign: 'left', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#137FEC'; e.currentTarget.style.background = 'rgba(19,127,236,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.background = '#F8FAFC'; }}>
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── RIGHT CONTENT ── */}
        <div style={{ flex: 1 }}>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '24px', padding: '48px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '0', minHeight: '600px' }}>

            {/* Step content */}
            <div style={{ flex: 1 }}>
              {renderStep()}
            </div>

            {/* Footer buttons */}
            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '24px', marginTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                {currentStep > 0 && (
                  <button onClick={handleBack}
                    style={{ padding: '12px 24px', borderRadius: '10px', border: '1px solid #E2E8F0', background: '#FFFFFF', fontSize: '15px', fontWeight: '600', color: '#475569', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
                    ← Back
                  </button>
                )}
                <button onClick={handleSkip}
                  style={{ padding: '12px 24px', borderRadius: '10px', border: 'none', background: 'transparent', fontSize: '15px', fontWeight: '600', color: '#94A3B8', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
                  Skip for now
                </button>
              </div>

              <button onClick={handleNext}
                style={{ padding: '14px 40px', borderRadius: '12px', border: 'none', background: '#137FEC', color: '#fff', fontSize: '15px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif", boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.2)', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#0f6fd4'}
                onMouseLeave={e => e.currentTarget.style.background = '#137FEC'}>
                {currentStep < 3 ? `Next: ${steps[currentStep + 1].title} →` : '✓ Complete Profile'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{ padding: '24px', textAlign: 'center', borderTop: '1px solid #F1F5F9' }}>
        <p style={{ fontSize: '13px', color: '#94A3B8' }}>© 2024 JobPortal Inc. All rights reserved.</p>
      </div>
    </div>
  );
};

export default ProfileSetupWizard;