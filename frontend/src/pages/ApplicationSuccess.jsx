import React, { useEffect, useState } from 'react';

const ApplicationSuccess = () => {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    const pieces = Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 1.2,
      duration: 2.4 + Math.random() * 1.6,
      color: ['#137FEC', '#61DAFB', '#FACC15', '#34D399', '#A78BFA', '#FB7185'][Math.floor(Math.random() * 6)],
      size: 6 + Math.random() * 6,
      rotate: Math.random() * 360,
    }));
    setConfetti(pieces);
  }, []);

  const nextSteps = [
    {
      num: '1',
      title: 'Initial Review',
      desc: 'Our hiring team will review your portfolio and experience within 3–5 business days.',
    },
    {
      num: '2',
      title: 'Email Confirmation',
      desc: 'Check your inbox for a detailed confirmation email with reference number #APP-99281.',
    },
    {
      num: '3',
      title: 'Interview Scheduling',
      desc: "If your profile matches, we'll reach out to schedule a brief introductory call.",
    },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          0%   { transform: scale(0.4); opacity: 0; }
          70%  { transform: scale(1.12); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes confettiFall {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(380px) rotate(720deg); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(19,127,236,0.4); }
          50%       { box-shadow: 0 0 0 16px rgba(19,127,236,0); }
        }

        .hero-card   { animation: fadeInUp 0.5s ease both; }
        .check-circle{ animation: popIn 0.6s cubic-bezier(.34,1.56,.64,1) 0.3s both, pulse 2.5s 1s infinite; }
        .content-section { animation: fadeInUp 0.5s ease 0.4s both; }
        .next-steps  { animation: fadeInUp 0.5s ease 0.55s both; }
        .actions     { animation: fadeInUp 0.5s ease 0.7s both; }
        .support     { animation: fadeInUp 0.5s ease 0.85s both; }

        .btn-primary {
          display: flex; align-items: center; gap: 8px; justify-content: center;
          background: #137FEC; border: none; border-radius: 12px;
          font-family: 'Inter',sans-serif; font-size: 16px; font-weight: 700; color: #fff;
          cursor: pointer; padding: 16px 32px; height: 56px;
          box-shadow: 0px 10px 15px -3px rgba(19,127,236,0.25), 0px 4px 6px -4px rgba(19,127,236,0.25);
          transition: background 0.2s, transform 0.15s;
        }
        .btn-primary:hover { background: #0e6fd4; transform: translateY(-1px); }

        .btn-outline {
          display: flex; align-items: center; gap: 8px; justify-content: center;
          background: rgba(19,127,236,0.05); border: 1px solid rgba(19,127,236,0.2);
          border-radius: 12px; font-family: 'Inter',sans-serif; font-size: 16px;
          font-weight: 700; color: #137FEC; cursor: pointer; padding: 16px 32px; height: 58px;
          transition: background 0.2s, transform 0.15s;
        }
        .btn-outline:hover { background: rgba(19,127,236,0.1); transform: translateY(-1px); }

        .step-item { transition: transform 0.15s; }
        .step-item:hover { transform: translateX(4px); }
      `}</style>

      {/* HEADER */}
      <header style={{
        background: '#FFFFFF',
        borderBottom: '1px solid rgba(19,127,236,0.1)',
        backdropFilter: 'blur(6px)',
        padding: '16px 160px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexShrink: 0, position: 'sticky', top: 0, zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: 32, height: 32,
            background: 'rgba(19,127,236,0.1)', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px',
          }}>🔷</div>
          <span style={{ fontWeight: 700, fontSize: '20px', letterSpacing: '-0.3px', color: '#0F172A' }}>ApplyFlow</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button style={{
            width: 40, height: 40,
            background: 'rgba(19,127,236,0.1)', border: 'none', borderRadius: '8px',
            cursor: 'pointer', fontSize: '18px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>🔔</button>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'linear-gradient(135deg, #f9a76b, #e97b3a)',
            border: '2px solid rgba(19,127,236,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px', cursor: 'pointer',
          }}>👤</div>
        </div>
      </header>

      {/* MAIN */}
      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '64px 16px' }}>
        <div style={{ width: '640px', maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: '0' }}>

          {/* HERO / CELEBRATION SECTION */}
          <div className="hero-card" style={{ marginBottom: '32px' }}>
            <div style={{
              position: 'relative',
              background: 'rgba(19,127,236,0.05)',
              border: '1px solid rgba(19,127,236,0.1)',
              borderRadius: '16px',
              height: '360px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
            }}>
              {/* Gradient overlay */}
              <div style={{
                position: 'absolute', inset: 1,
                background: 'linear-gradient(45deg, rgba(19,127,236,0.2) 0%, rgba(19,127,236,0) 50%, rgba(19,127,236,0.1) 100%)',
                borderRadius: '15px', pointerEvents: 'none',
              }} />

              {/* Confetti */}
              {confetti.map(p => (
                <div key={p.id} style={{
                  position: 'absolute',
                  left: `${p.x}%`,
                  top: '-10px',
                  width: p.size, height: p.size,
                  background: p.color,
                  borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                  animation: `confettiFall ${p.duration}s ${p.delay}s ease-in forwards`,
                  transform: `rotate(${p.rotate}deg)`,
                  opacity: 0,
                  pointerEvents: 'none',
                }} />
              ))}

              {/* Glow blobs */}
              <div style={{
                position: 'absolute', width: 80, height: 80,
                right: '28%', top: '18%',
                background: 'rgba(250,204,21,0.2)', filter: 'blur(12px)',
                borderRadius: '50%', pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute', width: 100, height: 100,
                left: '22%', bottom: '10%',
                background: 'rgba(19,127,236,0.2)', filter: 'blur(20px)',
                borderRadius: '50%', pointerEvents: 'none',
              }} />

              {/* Check circle */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div className="check-circle" style={{
                  width: 96, height: 96, borderRadius: '50%',
                  background: '#137FEC',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '40px',
                }}>✓</div>
              </div>
            </div>
          </div>

          {/* CONTENT SECTION */}
          <div className="content-section" style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: '16px', padding: '0 16px', marginBottom: '48px', textAlign: 'center',
          }}>
            <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.9px', lineHeight: '45px' }}>
              Application Submitted!
            </h1>
            <div style={{ maxWidth: '448px' }}>
              <p style={{ fontSize: '18px', color: '#475569', lineHeight: '29px', marginBottom: '2px' }}>
                Great job! Your application for the{' '}
              </p>
              <p style={{ fontSize: '18px', fontWeight: 600, color: '#137FEC', lineHeight: '29px' }}>
                Senior Product Designer role has been successfully received and is now being reviewed.
              </p>
            </div>
          </div>

          {/* NEXT STEPS */}
          <div className="next-steps" style={{ marginBottom: '40px' }}>
            <div style={{
              background: '#FFFFFF',
              border: '1px solid rgba(19,127,236,0.1)',
              boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
              borderRadius: '16px',
              padding: '32px',
              display: 'flex', flexDirection: 'column', gap: '24px',
            }}>
              {/* Section title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px', color: '#137FEC' }}>📡</span>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.5px' }}>Next Steps</h3>
              </div>

              {/* Steps list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {nextSteps.map((step, i) => (
                  <div key={i} className="step-item" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    {/* Step number bubble */}
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: 'rgba(19,127,236,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: '14px', color: '#137FEC',
                      flexShrink: 0, marginTop: '2px',
                    }}>{step.num}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <p style={{ fontSize: '16px', fontWeight: 600, color: '#0F172A', lineHeight: '24px' }}>{step.title}</p>
                      <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '20px' }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="actions" style={{
            display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '48px',
          }}>
            <button className="btn-primary">
              <span style={{ fontSize: '16px' }}>⊞</span>
              Back to Dashboard
            </button>
            <button className="btn-outline">
              <span style={{ fontSize: '16px' }}>📄</span>
              View Submission
            </button>
          </div>

          {/* SUPPORT FOOTER */}
          <div className="support" style={{ display: 'flex', justifyContent: 'center' }}>
            <p style={{ fontSize: '14px', color: '#64748B', textAlign: 'center' }}>
              Have questions?{' '}
              <a href="#" style={{ color: '#137FEC', fontWeight: 500 }}>Visit our Help Center</a>
              {' '}or{' '}
              <a href="#" style={{ color: '#137FEC', fontWeight: 500 }}>Contact Support</a>
            </p>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ApplicationSuccess;