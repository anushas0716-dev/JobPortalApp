import React, { useState } from 'react';

const InterviewInvitation = () => {
  const [declined, setDeclined] = useState(false);
  const [scheduled, setScheduled] = useState(false);

  const interviewDetails = [
    { icon: '🕐', text: '45-minute Technical Introduction' },
    { icon: '📹', text: 'Video Call (Google Meet)' },
    { icon: '👤', text: 'With Sarah Jenkins, Lead Designer' },
  ];

  if (declined) return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '48px' }}>
        <p style={{ fontSize: '48px', marginBottom: '16px' }}>😔</p>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>Invitation Declined</h2>
        <p style={{ fontSize: '16px', color: '#64748B' }}>You've declined the interview invitation from TechFlow Solutions.</p>
        <button onClick={() => setDeclined(false)} style={{
          marginTop: '24px', background: '#137FEC', border: 'none', borderRadius: '8px',
          fontFamily: 'inherit', fontSize: '14px', fontWeight: 700, color: '#fff',
          cursor: 'pointer', padding: '12px 24px',
        }}>Go Back</button>
      </div>
    </div>
  );

  if (scheduled) return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '48px' }}>
        <p style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</p>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>Interview Scheduled!</h2>
        <p style={{ fontSize: '16px', color: '#64748B' }}>We'll send you a calendar invite with all the details.</p>
        <button onClick={() => setScheduled(false)} style={{
          marginTop: '24px', background: '#137FEC', border: 'none', borderRadius: '8px',
          fontFamily: 'inherit', fontSize: '14px', fontWeight: 700, color: '#fff',
          cursor: 'pointer', padding: '12px 24px',
        }}>Back to Invitation</button>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .btn-schedule { flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; background: #137FEC; border: none; border-radius: 8px; font-family: 'Inter',sans-serif; font-size: 16px; font-weight: 700; color: #fff; cursor: pointer; padding: 12px 24px; height: 48px; transition: background 0.2s; }
        .btn-schedule:hover { background: #0e6fd4; }
        .btn-reply { flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; background: #F1F5F9; border: none; border-radius: 8px; font-family: 'Inter',sans-serif; font-size: 16px; font-weight: 700; color: #0F172A; cursor: pointer; padding: 12px 24px; height: 48px; transition: background 0.2s; }
        .btn-reply:hover { background: #E2E8F0; }
        .btn-decline { background: none; border: none; font-family: 'Inter',sans-serif; font-size: 12px; font-weight: 500; color: #94A3B8; cursor: pointer; padding: 4px 8px; transition: color 0.15s; }
        .btn-decline:hover { color: #64748B; }
      `}</style>

      {/* HEADER */}
      <header style={{
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
        padding: '12px 40px', height: 65,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '28px', lineHeight: '1' }}>🔵</div>
          <span style={{ fontWeight: 700, fontSize: '18px', letterSpacing: '-0.45px', color: '#0F172A' }}>Interview Hub</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button style={{ width: 40, height: 40, background: '#F1F5F9', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🔔</button>
          <button style={{ width: 40, height: 40, background: '#F1F5F9', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👤</button>
        </div>
      </header>

      {/* MAIN */}
      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '48px 16px' }}>
        <div style={{ width: '640px', maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: '0' }}>

          {/* INVITATION CARD */}
          <div style={{
            background: '#FFFFFF', border: '1px solid #E2E8F0',
            boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            overflow: 'hidden',
          }}>

            {/* HERO SECTION */}
            <div style={{
              padding: '40px 16px 24px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
              width: '100%',
            }}>
              {/* Company logo with verified badge */}
              <div style={{ position: 'relative', marginBottom: '8px' }}>
                <div style={{
                  width: 112, height: 112, borderRadius: '50%',
                  background: 'rgba(19,127,236,0.1)',
                  border: '4px solid #FFFFFF',
                  boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
                  padding: '4px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{
                    width: 96, height: 96, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0d3040 0%, #1a5c6e 50%, #2a9d8f 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '32px',
                  }}>🏢</div>
                </div>
                {/* Green verified badge */}
                <div style={{
                  position: 'absolute', bottom: -4, right: -4,
                  width: 24, height: 24, borderRadius: '50%',
                  background: '#22C55E', border: '2px solid #FFFFFF',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', color: '#fff',
                }}>✓</div>
              </div>

              {/* Title + subtitle */}
              <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.6px', lineHeight: '32px' }}>
                  You've been invited!
                </h1>
                <p style={{ fontSize: '16px', color: '#64748B', marginTop: '4px' }}>
                  TechFlow Solutions wants to interview you.
                </p>
              </div>
            </div>

            {/* ROLE INFO BOX */}
            <div style={{
              background: '#F8FAFC', border: '1px solid #F1F5F9',
              borderRadius: '12px', padding: '24px',
              width: 'calc(100% - 100px)', marginBottom: '0',
              display: 'flex', flexDirection: 'column', gap: '16px',
            }}>
              {/* Position */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  width: 36, height: 35, borderRadius: '8px',
                  background: 'rgba(19,127,236,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px', flexShrink: 0,
                }}>💼</div>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: '2px' }}>Position</p>
                  <p style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A' }}>Senior Product Designer</p>
                </div>
              </div>

              <div style={{ height: 1, background: '#E2E8F0' }} />

              {/* Location + Salary */}
              <div style={{ position: 'relative', height: '52px' }}>
                <div style={{ position: 'absolute', left: 0, right: '50%' }}>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: '4px' }}>Location</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '12px', color: '#334155' }}>📍</span>
                    <span style={{ fontSize: '14px', fontWeight: 500, color: '#334155' }}>Remote (Global)</span>
                  </div>
                </div>
                <div style={{ position: 'absolute', left: '50%', right: 0 }}>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: '4px' }}>Salary Range</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '12px', color: '#334155' }}>💵</span>
                    <span style={{ fontSize: '14px', fontWeight: 500, color: '#334155' }}>$140k – $180k</span>
                  </div>
                </div>
              </div>
            </div>

            {/* DETAILS & DESCRIPTION */}
            <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>

              {/* Message from Hiring Manager */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>Message from Hiring Manager</h3>
                <div style={{
                  borderLeft: '4px solid rgba(19,127,236,0.3)',
                  paddingLeft: '16px', paddingTop: '4px', paddingBottom: '4px',
                }}>
                  <p style={{ fontSize: '14px', color: '#475569', lineHeight: '23px' }}>
                    "Hi there! We were really impressed with your portfolio, especially the case study on scalable design systems. Your experience aligns perfectly with what we're looking for to lead our new mobile initiative. We'd love to jump on a call to discuss the role further."
                  </p>
                </div>
              </div>

              {/* Interview Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>Interview Details</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {interviewDetails.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '18px', color: '#137FEC', width: 20, textAlign: 'center', flexShrink: 0 }}>{item.icon}</span>
                      <span style={{ fontSize: '14px', color: '#475569' }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Section */}
              <div style={{
                height: '128px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #a8d5f5 0%, #c5e3f7 30%, #d4eefa 50%, #b5d8f0 70%, #9ecfe8 100%)',
                position: 'relative', overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {/* Fake map grid lines */}
                {[...Array(6)].map((_, i) => (
                  <div key={`h${i}`} style={{ position: 'absolute', left: 0, right: 0, top: `${i * 20 + 5}%`, height: 1, background: 'rgba(255,255,255,0.4)' }} />
                ))}
                {[...Array(8)].map((_, i) => (
                  <div key={`v${i}`} style={{ position: 'absolute', top: 0, bottom: 0, left: `${i * 13 + 2}%`, width: 1, background: 'rgba(255,255,255,0.4)' }} />
                ))}
                {/* Blue overlay */}
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(19,127,236,0.1)' }} />
                {/* Location pin label */}
                <div style={{
                  position: 'relative', zIndex: 2,
                  background: '#FFFFFF', borderRadius: '9999px',
                  padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '8px',
                  boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)',
                }}>
                  <span style={{ fontSize: '12px', color: '#137FEC' }}>🗺️</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>TechFlow Headquarters</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', paddingTop: '16px' }}>
                <button className="btn-schedule" onClick={() => setScheduled(true)}>
                  <span>📅</span> Schedule Now
                </button>
                <button className="btn-reply">
                  <span>✉️</span> Reply to Message
                </button>
              </div>

              {/* Decline link */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button className="btn-decline" onClick={() => setDeclined(true)}>
                  Decline invitation
                </button>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div style={{ padding: '32px 16px 0', display: 'flex', justifyContent: 'center' }}>
            <p style={{ fontSize: '12px', color: '#94A3B8', textAlign: 'center', lineHeight: '16px' }}>
              This invitation was sent via Interview Hub on behalf of TechFlow Solutions.<br />
              © 2024 Interview Hub. All rights reserved.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewInvitation;