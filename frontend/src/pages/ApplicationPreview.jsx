import React, { useState } from 'react';

const ApplicationPreview = () => {
  const [agreed, setAgreed] = useState(false);
  const [showFull, setShowFull] = useState(false);

  const contactInfo = [
    { label: 'Full Name', value: 'Alex Rivera' },
    { label: 'Email Address', value: 'alex.rivera@example.com' },
    { label: 'Phone Number', value: '+1 (555) 123-4567' },
    { label: 'Current Location', value: 'San Francisco, CA' },
  ];

  const coverLetterShort = `Dear Hiring Manager,\n\nI am writing to express my strong interest in the Senior UI Designer position at TechFlow. With over 6 years of experience in creating intuitive and visually stunning digital products...`;
  const coverLetterFull = `Dear Hiring Manager,\n\nI am writing to express my strong interest in the Senior UI Designer position at TechFlow. With over 6 years of experience in creating intuitive and visually stunning digital products, I believe I am an excellent match for this role.\n\nThroughout my career, I have consistently delivered high-quality design solutions that improve user experience and drive business results. I look forward to the opportunity to contribute to TechFlow's mission.`;

  const SectionCard = ({ icon, title, editLabel, children }) => (
    <div style={{
      background: '#FFFFFF', border: '1px solid #E2E8F0',
      boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 24px', borderBottom: '1px solid #F1F5F9',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '16px', color: '#137FEC' }}>{icon}</span>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A' }}>{title}</h3>
        </div>
        <button style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: '14px', fontWeight: 600, color: '#137FEC',
          fontFamily: 'inherit', padding: 0,
        }}>{editLabel}</button>
      </div>
      {children}
    </div>
  );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        .btn-submit { flex: 1; background: #137FEC; border: none; border-radius: 12px; font-family: 'Inter',sans-serif; font-size: 16px; font-weight: 700; color: #fff; cursor: pointer; height: 48px; box-shadow: 0px 10px 15px -3px rgba(19,127,236,0.2), 0px 4px 6px -4px rgba(19,127,236,0.2); transition: background 0.2s; }
        .btn-submit:hover { background: #0e6fd4; }
        .btn-submit:disabled { background: #94A3B8; cursor: not-allowed; box-shadow: none; }
        .btn-back { width: 128px; height: 48px; background: #F1F5F9; border: 1px solid #E2E8F0; border-radius: 12px; font-family: 'Inter',sans-serif; font-size: 16px; font-weight: 700; color: #0F172A; cursor: pointer; transition: background 0.15s; }
        .btn-back:hover { background: #E2E8F0; }
        .field-label { font-size: 12px; font-weight: 600; color: #64748B; letter-spacing: 0.6px; text-transform: uppercase; margin-bottom: 4px; }
        .field-value { font-size: 16px; font-weight: 500; color: #0F172A; line-height: 24px; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
        padding: '12px 40px', height: 65,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: 32, height: 32,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
          }}>💼</div>
          <span style={{ fontWeight: 700, fontSize: '18px', letterSpacing: '-0.27px', color: '#0F172A' }}>
            TechFlow Careers
          </span>
        </div>
        <button style={{
          width: 40, height: 40, background: '#F1F5F9', border: 'none',
          borderRadius: '8px', cursor: 'pointer', fontSize: '16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>✕</button>
      </nav>

      {/* MAIN */}
      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '32px 16px' }}>
        <div style={{ width: '800px', maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* PROGRESS BAR SECTION */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#137FEC', letterSpacing: '0.7px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Final Step
                </p>
                <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', lineHeight: '32px' }}>
                  Review &amp; Submit
                </h2>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '16px', fontWeight: 500, color: '#0F172A' }}>Step 4 of 4</p>
                <p style={{ fontSize: '14px', color: '#64748B' }}>100% Complete</p>
              </div>
            </div>
            {/* Full progress bar */}
            <div style={{ height: 10, background: '#E2E8F0', borderRadius: '9999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '100%', background: '#137FEC', borderRadius: '9999px' }} />
            </div>
          </div>

          {/* CONTACT INFORMATION */}
          <SectionCard icon="👤" title="Contact Information" editLabel="Edit">
            <div style={{ position: 'relative', padding: '24px', height: '160px' }}>
              {/* Row 1 */}
              <div style={{ position: 'absolute', left: 24, right: '51%', top: 24 }}>
                <p className="field-label">Full Name</p>
                <p className="field-value">Alex Rivera</p>
              </div>
              <div style={{ position: 'absolute', left: '51%', right: 24, top: 24 }}>
                <p className="field-label">Email Address</p>
                <p className="field-value">alex.rivera@example.com</p>
              </div>
              {/* Row 2 */}
              <div style={{ position: 'absolute', left: 24, right: '51%', top: 92 }}>
                <p className="field-label">Phone Number</p>
                <p className="field-value">+1 (555) 123-4567</p>
              </div>
              <div style={{ position: 'absolute', left: '51%', right: 24, top: 92 }}>
                <p className="field-label">Current Location</p>
                <p className="field-value">San Francisco, CA</p>
              </div>
            </div>
          </SectionCard>

          {/* RESUME */}
          <SectionCard icon="📄" title="Resume" editLabel="Replace">
            <div style={{ padding: '0 24px 24px' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '16px',
                background: '#F8FAFC', border: '1px solid #E2E8F0',
                borderRadius: '8px', padding: '16px', marginTop: '24px',
              }}>
                {/* PDF icon */}
                <div style={{
                  width: 48, height: 48, borderRadius: '4px',
                  background: 'rgba(19,127,236,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px', flexShrink: 0,
                }}>📋</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>Alex_Rivera_Resume_2024.pdf</p>
                  <p style={{ fontSize: '14px', color: '#64748B' }}>Uploaded on Oct 12, 2023 • 1.2 MB</p>
                </div>
                <button style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '18px', color: '#94A3B8', padding: '4px',
                }}>👁️</button>
              </div>
            </div>
          </SectionCard>

          {/* COVER LETTER */}
          <SectionCard icon="✉️" title="Cover Letter" editLabel="Edit">
            <div style={{ padding: '0 24px 24px' }}>
              <div style={{
                background: '#F8FAFC', borderRadius: '8px',
                padding: '16px', marginTop: '24px',
                display: 'flex', flexDirection: 'column', gap: '10px',
              }}>
                {(showFull ? coverLetterFull : coverLetterShort).split('\n\n').map((para, i) => (
                  <p key={i} style={{ fontSize: '14px', color: '#475569', lineHeight: '23px' }}>
                    {para}
                    {!showFull && i === 1 && (
                      <button
                        onClick={() => setShowFull(true)}
                        style={{ background: 'none', border: 'none', color: '#137FEC', cursor: 'pointer', fontFamily: 'inherit', fontSize: '14px', fontWeight: 500, padding: '0 0 0 4px' }}
                      >Read more</button>
                    )}
                  </p>
                ))}
                {showFull && (
                  <button
                    onClick={() => setShowFull(false)}
                    style={{ background: 'none', border: 'none', color: '#137FEC', cursor: 'pointer', fontFamily: 'inherit', fontSize: '14px', fontWeight: 500, textAlign: 'left', padding: 0 }}
                  >Show less</button>
                )}
              </div>
            </div>
          </SectionCard>

          {/* CONSENT CHECKBOX */}
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: '12px',
            background: 'rgba(19,127,236,0.05)',
            border: '1px solid rgba(19,127,236,0.2)',
            borderRadius: '8px', padding: '16px',
          }}>
            <div style={{ paddingTop: '4px', flexShrink: 0 }}>
              <input
                type="checkbox"
                id="consent"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                style={{
                  width: 16, height: 16,
                  border: '1px solid #CBD5E1', borderRadius: '4px',
                  cursor: 'pointer', accentColor: '#137FEC',
                }}
              />
            </div>
            <label htmlFor="consent" style={{ fontSize: '14px', color: '#475569', lineHeight: '20px', cursor: 'pointer' }}>
              I confirm that all the information provided above is accurate and complete to the best of my knowledge. I understand that any false statements may lead to the disqualification of my application.
            </label>
          </div>

          {/* ACTION BUTTONS */}
          <div style={{ display: 'flex', gap: '12px', paddingTop: '16px' }}>
            <button className="btn-submit" disabled={!agreed}>
              Submit Application
            </button>
            <button className="btn-back">Back</button>
          </div>

          {/* FINE PRINT */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
            <p style={{ fontSize: '12px', color: '#94A3B8', textAlign: 'center' }}>
              Your application will be sent securely to the TechFlow recruitment team.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ApplicationPreview;