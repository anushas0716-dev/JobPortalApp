import React, { useState, useRef, useEffect } from 'react';

const OfferLetter = () => {
  const [fullName, setFullName] = useState('Alex Rivera');
  const [agreed, setAgreed] = useState(false);
  const [signed, setSigned] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const canvasRef = useRef(null);
  const lastPos = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = '#137FEC';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
    }
  }, []);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const startDraw = (e) => {
    e.preventDefault();
    setIsDrawing(true);
    setHasSignature(true);
    const canvas = canvasRef.current;
    lastPos.current = getPos(e, canvas);
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pos = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos.current = pos;
  };

  const stopDraw = () => setIsDrawing(false);

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const compensationRows = [
    { label: 'Annual Base Salary', value: '$145,000.00 USD', sub: null },
    { label: 'Performance Bonus', value: '15% Targeted Annual', sub: null },
    { label: 'Equity Grant', value: '5,000 RSUs', sub: 'Subject to 4-year vesting schedule' },
    { label: 'Sign-on Bonus', value: '$10,000.00 USD', sub: null },
  ];

  const benefits = [
    { icon: '💼', title: 'Health & Wellness', desc: 'Premium medical, dental, and vision coverage for you and family.' },
    { icon: '✈️', title: 'Unlimited PTO', desc: 'Take the time you need to recharge, plus 12 paid holidays.' },
    { icon: '💰', title: '401(k) Matching', desc: 'We match 100% of your contributions up to 4% of salary.' },
    { icon: '🏠', title: 'Remote Stipend', desc: '$1,500 annual home office and learning budget.' },
  ];

  if (signed) return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '48px', background: '#fff', borderRadius: '16px', border: '1px solid #E2E8F0', maxWidth: '480px' }}>
        <div style={{ fontSize: '56px', marginBottom: '16px' }}>🎉</div>
        <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>Offer Accepted!</h2>
        <p style={{ fontSize: '16px', color: '#64748B', lineHeight: '24px', marginBottom: '24px' }}>
          Congratulations, {fullName}! We've received your signed offer and will be in touch with next steps shortly.
        </p>
        <button onClick={() => setSigned(false)} style={{
          background: '#137FEC', border: 'none', borderRadius: '8px',
          fontFamily: 'inherit', fontSize: '16px', fontWeight: 700, color: '#fff',
          cursor: 'pointer', padding: '12px 32px',
        }}>Back to Offer</button>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        input:focus { outline: none; border-color: #137FEC !important; }
        .section-card { background: #FFFFFF; border: 1px solid #E2E8F0; box-shadow: 0px 1px 2px rgba(0,0,0,0.05); border-radius: 12px; padding: 24px; }
        .btn-download { display: flex; align-items: center; gap: 8px; background: #F1F5F9; border: none; border-radius: 8px; font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 600; color: #334155; cursor: pointer; padding: 0 16px; height: 40px; transition: background 0.15s; }
        .btn-download:hover { background: #E2E8F0; }
        .btn-accept { width: 100%; padding: 12px 0; background: #137FEC; border: none; border-radius: 8px; font-family: 'Inter',sans-serif; font-size: 16px; font-weight: 700; color: #fff; cursor: pointer; box-shadow: 0px 10px 15px -3px rgba(19,127,236,0.2); transition: background 0.2s; }
        .btn-accept:hover:not(:disabled) { background: #0e6fd4; }
        .btn-accept:disabled { background: #94A3B8; cursor: not-allowed; box-shadow: none; }
        .btn-decline { width: 100%; padding: 4px 0; background: none; border: none; font-family: 'Inter',sans-serif; font-size: 14px; color: #64748B; cursor: pointer; transition: color 0.15s; }
        .btn-decline:hover { color: #334155; }
        .benefit-tile { background: #F8FAFC; border-radius: 8px; padding: 12px; display: flex; gap: 12px; align-items: flex-start; }
        footer-link { font-size: 14px; color: #64748B; cursor: pointer; }
        footer-link:hover { color: #137FEC; }
      `}</style>

      {/* HEADER */}
      <header style={{
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
        padding: '12px 160px', height: 65,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: 32, height: 32, background: '#137FEC', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>📄</div>
          <span style={{ fontWeight: 700, fontSize: '18px', letterSpacing: '-0.45px', color: '#0F172A' }}>TalentPortal</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-download">⬇ Download PDF</button>
          <button className="btn-download" style={{ padding: '0 16px', width: 47 }}>
            <span style={{ fontSize: '16px' }}>↗</span>
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '32px 160px' }}>
        <div style={{ width: '960px', maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: '32px' }}>

          {/* HERO SECTION */}
          <div style={{
            position: 'relative', height: '280px', borderRadius: '12px',
            overflow: 'hidden', background: '#0F172A',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            padding: '32px',
          }}>
            {/* Background image */}
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=960&h=280&fit=crop"
              alt="office"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
              onError={e => e.target.style.display = 'none'}
            />
            {/* Gradient */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 60%)', zIndex: 1 }} />

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ background: '#137FEC', color: '#fff', fontSize: '12px', fontWeight: 700, letterSpacing: '0.6px', textTransform: 'uppercase', padding: '4px 12px', borderRadius: '9999px', width: 'fit-content' }}>
                New Offer
              </span>
              <h1 style={{ fontSize: '36px', fontWeight: 900, color: '#FFFFFF', lineHeight: '45px' }}>
                Congratulations, Alex Rivera!
              </h1>
              <p style={{ fontSize: '18px', color: '#E2E8F0', lineHeight: '28px' }}>
                We are thrilled to invite you to join our design team at TechFlow Systems.
              </p>
            </div>
          </div>

          {/* TWO-COLUMN CONTENT */}
          <div style={{ position: 'relative', display: 'flex', gap: '32px' }}>

            {/* LEFT COLUMN */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '32px' }}>

              {/* Role Overview */}
              <div className="section-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <span style={{ fontSize: '20px', color: '#137FEC' }}>💼</span>
                  <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A' }}>Role Overview</h2>
                </div>
                <div style={{ position: 'relative', height: '120px' }}>
                  {[
                    [{ label: 'Position', value: 'Senior Product Designer' }, { label: 'Department', value: 'Product & Design' }],
                    [{ label: 'Reporting To', value: 'Jordan Smith, VP Design' }, { label: 'Location', value: 'San Francisco, CA (Hybrid)' }],
                  ].map((row, ri) => (
                    <div key={ri} style={{ position: 'absolute', top: ri * 72, left: 0, right: 0, display: 'flex', gap: '24px' }}>
                      {row.map(({ label, value }) => (
                        <div key={label} style={{ flex: 1 }}>
                          <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '2px' }}>{label}</p>
                          <p style={{ fontSize: '18px', fontWeight: 600, color: '#0F172A' }}>{value}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Compensation */}
              <div className="section-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <span style={{ fontSize: '20px', color: '#137FEC' }}>💵</span>
                  <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A' }}>Compensation &amp; Equity</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {compensationRows.map((row, i) => (
                    <div key={row.label} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '12px 0',
                      borderBottom: i < compensationRows.length - 1 ? '1px solid #F1F5F9' : 'none',
                    }}>
                      <div>
                        <p style={{ fontSize: '16px', color: '#475569' }}>{row.label}</p>
                        {row.sub && <p style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>{row.sub}</p>}
                      </div>
                      <p style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>{row.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="section-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <span style={{ fontSize: '20px', color: '#137FEC' }}>🎁</span>
                  <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A' }}>Comprehensive Benefits</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {benefits.map(b => (
                    <div key={b.title} className="benefit-tile">
                      <span style={{ fontSize: '18px', flexShrink: 0, marginTop: '1px' }}>{b.icon}</span>
                      <div>
                        <p style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A', marginBottom: '4px' }}>{b.title}</p>
                        <p style={{ fontSize: '12px', color: '#64748B', lineHeight: '16px' }}>{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div style={{ width: '298px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* Accept Offer Card */}
              <div style={{
                background: 'rgba(19,127,236,0.05)', border: '1px solid rgba(19,127,236,0.2)',
                borderRadius: '12px', padding: '24px 24px 40px',
                display: 'flex', flexDirection: 'column', gap: '16px',
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A' }}>Accept Your Offer</h3>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: '20px' }}>
                  This offer expires on <strong>September 24th, 2023</strong>. Please review all documents before signing.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '8px' }}>
                  {/* Full Legal Name */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '14px', fontWeight: 500, color: '#0F172A' }}>Full Legal Name</label>
                    <input
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      style={{
                        width: '100%', padding: '10px 16px',
                        background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px',
                        fontSize: '16px', color: '#6B7280', fontFamily: 'inherit',
                      }}
                    />
                  </div>

                  {/* Digital Signature */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label style={{ fontSize: '14px', fontWeight: 500, color: '#0F172A' }}>Digital Signature</label>
                      {hasSignature && (
                        <button onClick={clearSignature} style={{ background: 'none', border: 'none', fontSize: '12px', color: '#94A3B8', cursor: 'pointer', fontFamily: 'inherit' }}>Clear</button>
                      )}
                    </div>
                    <div style={{
                      background: '#FFFFFF', border: '2px dashed #CBD5E1', borderRadius: '8px',
                      height: '128px', position: 'relative', overflow: 'hidden', cursor: 'crosshair',
                    }}>
                      <canvas
                        ref={canvasRef}
                        width={248}
                        height={124}
                        style={{ width: '100%', height: '100%', display: 'block' }}
                        onMouseDown={startDraw}
                        onMouseMove={draw}
                        onMouseUp={stopDraw}
                        onMouseLeave={stopDraw}
                        onTouchStart={startDraw}
                        onTouchMove={draw}
                        onTouchEnd={stopDraw}
                      />
                      {!hasSignature && (
                        <div style={{
                          position: 'absolute', inset: 0,
                          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                          pointerEvents: 'none', gap: '8px',
                        }}>
                          <span style={{ fontSize: '22px', color: '#94A3B8' }}>✏️</span>
                          <p style={{ fontSize: '12px', color: '#94A3B8' }}>Click to draw or type signature</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Checkbox */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '8px 0' }}>
                    <input
                      type="checkbox" id="agree"
                      checked={agreed} onChange={e => setAgreed(e.target.checked)}
                      style={{ marginTop: '2px', accentColor: '#137FEC', width: 16, height: 16, flexShrink: 0 }}
                    />
                    <label htmlFor="agree" style={{ fontSize: '12px', color: '#64748B', lineHeight: '16px', cursor: 'pointer' }}>
                      I agree to the terms of employment and verify that all information provided is accurate.
                    </label>
                  </div>

                  {/* Sign Button */}
                  <button className="btn-accept" disabled={!agreed || !hasSignature || !fullName.trim()} onClick={() => setSigned(true)}>
                    Sign &amp; Accept Offer
                  </button>
                  <button className="btn-decline">Decline Offer</button>
                </div>
              </div>

              {/* Hiring Manager Contact */}
              <div className="section-card">
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Questions? Chat with us.</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #7c9abf, #5a7fa8)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px', flexShrink: 0,
                  }}>👩</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>Sarah Jenkins</p>
                    <p style={{ fontSize: '12px', color: '#64748B' }}>Talent Acquisition Lead</p>
                  </div>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#137FEC' }}>✉️</button>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div style={{
            borderTop: '1px solid #E2E8F0', padding: '48px 0',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div style={{ display: 'flex', gap: '24px' }}>
              {['Privacy Policy', 'Employment Terms', 'Help Center'].map(l => (
                <a key={l} href="#" style={{ fontSize: '14px', color: '#64748B' }}>{l}</a>
              ))}
            </div>
            <p style={{ fontSize: '14px', color: '#94A3B8' }}>© 2023 TechFlow Systems Inc. All rights reserved.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OfferLetter;