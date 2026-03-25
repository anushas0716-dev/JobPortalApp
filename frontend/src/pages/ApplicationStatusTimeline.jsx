import React, { useState } from 'react';

const ApplicationStatusTimeline = () => {
  const [activeNav, setActiveNav] = useState('Applications');

  const navLinks = [
    { label: 'Dashboard', icon: '⊞' },
    { label: 'Applications', icon: '💼' },
    { label: 'Messages', icon: '💬' },
    { label: 'Profile', icon: '👤' },
  ];

  const timelineSteps = [
    {
      id: 1,
      title: 'Applied Successfully',
      date: 'Oct 12, 2023',
      desc: 'Your application was received and is in our queue for initial screening.',
      status: 'done',
    },
    {
      id: 2,
      title: 'Recruiter Review',
      date: 'Oct 15, 2023',
      desc: 'Sarah from the Talent Acquisition team reviewed your profile and portfolio.',
      status: 'done',
    },
    {
      id: 3,
      title: 'First Interview',
      date: 'Oct 20, 2023',
      desc: 'Initial screening call with the hiring manager completed.',
      status: 'done',
    },
    {
      id: 4,
      title: 'Technical Assessment',
      date: null,
      desc: 'We are reviewing the design challenge you submitted on Oct 24th.',
      status: 'active',
      extra: {
        label: 'Expected response by:',
        value: 'Oct 28, 2023 (within 2 business days)',
      },
    },
    {
      id: 5,
      title: 'Final Interview Rounds',
      date: 'Upcoming',
      desc: 'Meeting with the executive leadership and cross-functional team.',
      status: 'pending',
    },
  ];

  const StepDot = ({ status }) => {
    if (status === 'done') return (
      <div style={{
        width: 40, height: 40, borderRadius: '50%',
        background: '#137FEC',
        boxShadow: '0px 4px 6px -1px rgba(19,127,236,0.3), 0px 2px 4px -2px rgba(19,127,236,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, fontSize: '16px', color: '#fff',
      }}>✓</div>
    );
    if (status === 'active') return (
      <div style={{
        width: 40, height: 40, borderRadius: '50%',
        background: '#FFFFFF',
        border: '2px solid #137FEC',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, fontSize: '16px', color: '#137FEC',
      }}>⏳</div>
    );
    return (
      <div style={{
        width: 40, height: 40, borderRadius: '50%',
        background: '#F1F5F9',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, fontSize: '16px', color: '#94A3B8',
      }}>🔒</div>
    );
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .btn-outline { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 12px 16px; border: 1px solid #137FEC; border-radius: 12px; background: #fff; font-family: 'Inter',sans-serif; font-size: 16px; font-weight: 600; color: #137FEC; cursor: pointer; transition: background 0.2s; }
        .btn-outline:hover { background: rgba(19,127,236,0.05); }
        .btn-primary { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 12px 16px; border: none; border-radius: 12px; background: #137FEC; font-family: 'Inter',sans-serif; font-size: 16px; font-weight: 600; color: #fff; cursor: pointer; box-shadow: 0px 4px 6px -1px rgba(19,127,236,0.2), 0px 2px 4px -2px rgba(19,127,236,0.2); transition: background 0.2s; }
        .btn-primary:hover { background: #0e6fd4; }
        .nav-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; cursor: pointer; transition: background 0.15s; width: 100%; border: none; background: none; font-family: 'Inter',sans-serif; font-size: 16px; }
        .nav-item:hover { background: rgba(19,127,236,0.05); }
        .nav-item.active { background: rgba(19,127,236,0.1); }
      `}</style>

      {/* HEADER */}
      <header style={{
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
        padding: '16px 80px', height: 73,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: 40, height: 40, background: '#137FEC', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
          }}>⊞</div>
          <span style={{ fontWeight: 700, fontSize: '18px', letterSpacing: '-0.45px', color: '#0F172A' }}>CareerPort</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: 40, height: 40, cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🔔</button>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'rgba(19,127,236,0.2)', border: '1px solid rgba(19,127,236,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', cursor: 'pointer',
          }}>👩</div>
        </div>
      </header>

      {/* MAIN */}
      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '32px 80px' }}>
        <div style={{ width: '1000px', maxWidth: '100%', display: 'flex', gap: '0', position: 'relative' }}>

          {/* SIDEBAR */}
          <aside style={{
            position: 'absolute', left: 0, top: 0, bottom: 0,
            width: '226px',
            display: 'flex', flexDirection: 'column', gap: '24px',
          }}>
            {/* Nav links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {navLinks.map(({ label, icon }) => (
                <button
                  key={label}
                  className={`nav-item${activeNav === label ? ' active' : ''}`}
                  onClick={() => setActiveNav(label)}
                >
                  <span style={{ fontSize: '18px', color: activeNav === label ? '#137FEC' : '#64748B' }}>{icon}</span>
                  <span style={{ fontWeight: activeNav === label ? 600 : 500, color: activeNav === label ? '#137FEC' : '#334155' }}>{label}</span>
                </button>
              ))}
            </div>

            {/* Pro plan card — pushed to bottom */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <div style={{
                background: 'linear-gradient(135deg, #137FEC 0%, #2563EB 100%)',
                borderRadius: '16px', padding: '16px',
                boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.2), 0px 4px 6px -4px rgba(19,127,236,0.2)',
                display: 'flex', flexDirection: 'column', gap: '8px',
              }}>
                <p style={{ fontSize: '12px', fontWeight: 600, color: '#fff', letterSpacing: '0.6px', textTransform: 'uppercase', opacity: 0.8 }}>Pro Plan</p>
                <p style={{ fontSize: '14px', fontWeight: 500, color: '#fff', lineHeight: '20px' }}>
                  Unlock premium job insights and direct recruiter access.
                </p>
                <button style={{
                  background: '#FFFFFF', border: 'none', borderRadius: '8px',
                  fontFamily: 'inherit', fontSize: '14px', fontWeight: 700, color: '#137FEC',
                  cursor: 'pointer', padding: '8px 0', width: '100%',
                }}>Upgrade Now</button>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <div style={{
            position: 'absolute', left: '258px', right: 0, top: 0, bottom: 0,
            display: 'flex', flexDirection: 'column', gap: '24px',
          }}>

            {/* JOB HEADER CARD */}
            <div style={{
              background: '#FFFFFF', border: '1px solid #E2E8F0',
              boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '16px',
              padding: '24px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{
                    width: 56, height: 56, background: '#F1F5F9', borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0,
                  }}>🔷</div>
                  <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', lineHeight: '32px' }}>Senior Product Designer</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                      <span style={{ fontSize: '16px', color: '#64748B' }}>TechFlow Inc.</span>
                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#CBD5E1', display: 'inline-block' }} />
                      <span style={{ fontSize: '16px', color: '#64748B' }}>San Francisco, CA (Remote)</span>
                    </div>
                  </div>
                </div>
                <span style={{
                  background: '#FEF3C7', border: '1px solid #FDE68A',
                  color: '#B45309', fontSize: '12px', fontWeight: 700,
                  padding: '4px 12px', borderRadius: '9999px', letterSpacing: '0.3px', textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}>In Progress</span>
              </div>
            </div>

            {/* TIMELINE CARD */}
            <div style={{
              background: '#FFFFFF', border: '1px solid #E2E8F0',
              boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '16px',
              padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px',
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A' }}>Application Timeline</h3>

              {/* Steps */}
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '0' }}>
                {/* Vertical line */}
                <div style={{
                  position: 'absolute', left: '19px', top: '16px', bottom: '16px',
                  width: '2px', background: '#F1F5F9', zIndex: 0,
                }} />

                {timelineSteps.map((step, idx) => (
                  <div key={step.id} style={{
                    position: 'relative', zIndex: 1,
                    display: 'flex', gap: '24px',
                    paddingBottom: idx < timelineSteps.length - 1 ? '32px' : '0',
                    opacity: step.status === 'pending' ? 0.5 : 1,
                  }}>
                    <StepDot status={step.status} />

                    <div style={{ flex: 1, paddingTop: '4px' }}>
                      {/* Title + date */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <h4 style={{
                            fontSize: '18px', fontWeight: 700, lineHeight: '28px',
                            color: step.status === 'active' ? '#137FEC' : step.status === 'pending' ? '#0F172A' : '#0F172A',
                          }}>{step.title}</h4>
                          {step.status === 'active' && (
                            <span style={{
                              background: 'rgba(19,127,236,0.1)', color: '#137FEC',
                              fontSize: '10px', fontWeight: 700,
                              padding: '2px 8px', borderRadius: '4px',
                              letterSpacing: '1px', textTransform: 'uppercase',
                            }}>In Progress</span>
                          )}
                        </div>
                        <span style={{
                          fontSize: '14px', fontWeight: 500,
                          color: step.status === 'pending' ? '#94A3B8' : '#64748B',
                          whiteSpace: 'nowrap', marginLeft: '16px',
                        }}>{step.date}</span>
                      </div>

                      {/* Description */}
                      <p style={{
                        fontSize: '16px', lineHeight: '24px',
                        color: step.status === 'pending' ? '#94A3B8' : '#475569',
                      }}>{step.desc}</p>

                      {/* Extra info box (active step only) */}
                      {step.extra && (
                        <div style={{
                          marginTop: '16px',
                          background: '#F8FAFC', border: '1px solid #F1F5F9',
                          borderRadius: '12px', padding: '16px',
                          display: 'flex', flexDirection: 'column', gap: '4px',
                        }}>
                          <p style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>{step.extra.label}</p>
                          <p style={{ fontSize: '14px', color: '#64748B' }}>{step.extra.value}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BOTTOM CARDS ROW */}
            <div style={{ display: 'flex', gap: '24px' }}>
              {/* Preparation Resources */}
              <div style={{
                flex: 1, background: '#FFFFFF', border: '1px solid #E2E8F0',
                boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '16px',
                padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>Preparation Resources</h4>
                  <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '20px' }}>
                    View our guide on how we conduct final round interviews at TechFlow.
                  </p>
                </div>
                <div style={{ paddingTop: '24px' }}>
                  <button className="btn-outline">
                    <span style={{ fontSize: '14px' }}>📖</span> View Interview Guide
                  </button>
                </div>
              </div>

              {/* Hiring Contact */}
              <div style={{
                flex: 1, background: '#FFFFFF', border: '1px solid #E2E8F0',
                boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '16px',
                padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>Hiring Contact</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #f9a76b, #c27b4e)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '18px', flexShrink: 0,
                    }}>👩</div>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>Sarah Jenkins</p>
                      <p style={{ fontSize: '12px', color: '#64748B' }}>Talent Acquisition Partner</p>
                    </div>
                  </div>
                </div>
                <div style={{ paddingTop: '24px' }}>
                  <button className="btn-primary">
                    <span style={{ fontSize: '14px' }}>✉️</span> Send Message
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default ApplicationStatusTimeline;