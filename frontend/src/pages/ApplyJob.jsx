import React, { useState } from 'react';

const ApplyJob = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' });

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input { font-family: 'Inter', sans-serif; }
        input::placeholder { color: #94A3B8; }
        input:focus { outline: none; border-color: #137FEC !important; box-shadow: 0 0 0 3px rgba(19,127,236,0.1); }
        .nav-link { font-size: 14px; font-weight: 500; color: #475569; text-decoration: none; }
        .nav-link:hover { color: #137FEC; }
        .btn-draft { background: none; border: none; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500; color: #64748B; cursor: pointer; padding: 0; }
        .btn-draft:hover { color: #334155; }
        .btn-primary { background: #137FEC; border: none; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 700; color: #fff; cursor: pointer; display: flex; align-items: center; gap: 8px; padding: 12px 32px; box-shadow: 0px 10px 15px -3px rgba(19,127,236,0.2), 0px 4px 6px -4px rgba(19,127,236,0.2); transition: background 0.2s; }
        .btn-primary:hover { background: #0e6fd4; }
        .btn-view { background: #F1F5F9; border: none; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700; color: #334155; cursor: pointer; padding: 9.5px 20px; transition: background 0.2s; }
        .btn-view:hover { background: #E2E8F0; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 40px 12px 37px', height: '65px',
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: 30, height: 24,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: '22px' }}>💼</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: '20px', letterSpacing: '-0.3px', color: '#0F172A' }}>HireFlow</span>
        </div>

        {/* Right: nav + icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
            <a href="#" className="nav-link">Find Jobs</a>
            <a href="#" className="nav-link">My Applications</a>
            <a href="#" className="nav-link">Messages</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Bell */}
            <div style={{
              width: 40, height: 40,
              background: '#F1F5F9', borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: '16px', color: '#334155',
            }}>🔔</div>
            {/* Avatar */}
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'linear-gradient(135deg, #CBD5E1, #94A3B8)',
              border: '2px solid #F1F5F9',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px', cursor: 'pointer', overflow: 'hidden',
            }}>👤</div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
        padding: '32px 0',
      }}>
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '24px',
          width: '800px', maxWidth: '800px',
        }}>

          {/* PROGRESS STEPPER */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
            borderRadius: '12px',
            padding: '24px',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Label row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '16px', fontWeight: 600, color: '#0F172A' }}>
                  Step 1: Contact Information
                </span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#137FEC' }}>
                  33% Complete
                </span>
              </div>

              {/* Progress bar */}
              <div style={{ position: 'relative', height: 8, background: '#F1F5F9', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0,
                  width: '33%',
                  background: '#137FEC', borderRadius: '9999px',
                }} />
              </div>

              {/* Next step hint */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '4px' }}>
                <span style={{ fontSize: '11px', color: '#94A3B8' }}>→</span>
                <span style={{
                  fontSize: '12px', fontWeight: 400, color: '#64748B',
                  letterSpacing: '0.6px', textTransform: 'uppercase',
                }}>Next: Experience &amp; Skills</span>
              </div>
            </div>
          </div>

          {/* JOB SUMMARY CARD */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
          }}>
            {/* Left: Info */}
            <div style={{
              flex: 1, padding: '24px',
              display: 'flex', flexDirection: 'column', gap: '16px',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {/* Label */}
                <span style={{
                  fontSize: '12px', fontWeight: 700, color: '#137FEC',
                  letterSpacing: '1.2px', textTransform: 'uppercase',
                }}>Job Summary</span>

                {/* Title */}
                <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', lineHeight: '30px' }}>
                  Senior Product Designer
                </h1>

                {/* Meta */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '4px' }}>
                  <span style={{ fontSize: '14px', color: '#64748B' }}>🗂</span>
                  <span style={{ fontSize: '14px', color: '#64748B' }}>Design Systems Team</span>
                  <span style={{
                    width: 4, height: 4, borderRadius: '50%',
                    background: '#CBD5E1', display: 'inline-block',
                  }} />
                  <span style={{ fontSize: '14px', color: '#64748B' }}>🕐</span>
                  <span style={{ fontSize: '14px', color: '#64748B' }}>Full-time</span>
                </div>
              </div>

              <button className="btn-view">View Job Details</button>
            </div>

            {/* Right: Image */}
            <div style={{
              width: '266px', minHeight: '160px', flexShrink: 0,
              background: 'linear-gradient(135deg, #1a3a2a 0%, #2d5a3d 50%, #1a3a2a 100%)',
              position: 'relative', overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <img
                src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=400&h=200&fit=crop"
                alt="job"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={e => e.target.style.display = 'none'}
              />
            </div>
          </div>

          {/* APPLICATION FORM */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
            borderRadius: '12px',
            padding: '32px 32px 48px',
            display: 'flex', flexDirection: 'column', gap: '32px',
          }}>
            {/* Header */}
            <div style={{
              borderBottom: '1px solid #F1F5F9',
              paddingBottom: '24px',
              display: 'flex', flexDirection: 'column', gap: '4px',
            }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.36px' }}>
                Basic Details
              </h2>
              <p style={{ fontSize: '16px', color: '#64748B', lineHeight: '24px' }}>
                Please provide your contact information to start your application.
              </p>
            </div>

            {/* Form Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* First Name + Last Name row */}
              <div style={{ display: 'flex', gap: '24px' }}>
                {/* First Name */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>First Name</label>
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="e.g. John"
                    style={{
                      width: '100%', height: 48, padding: '13px 16px',
                      background: '#FFFFFF', border: '1px solid #E2E8F0',
                      borderRadius: '8px', fontSize: '16px', color: '#0F172A',
                    }}
                  />
                </div>

                {/* Last Name */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>Last Name</label>
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="e.g. Doe"
                    style={{
                      width: '100%', height: 48, padding: '13px 16px',
                      background: '#FFFFFF', border: '1px solid #E2E8F0',
                      borderRadius: '8px', fontSize: '16px', color: '#0F172A',
                    }}
                  />
                </div>
              </div>

              {/* Email Address */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <span style={{
                    position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)',
                    fontSize: '16px', color: '#94A3B8', pointerEvents: 'none',
                  }}>✉️</span>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john.doe@example.com"
                    style={{
                      width: '100%', height: 48, padding: '13px 16px 13px 48px',
                      background: '#FFFFFF', border: '1px solid #E2E8F0',
                      borderRadius: '8px', fontSize: '16px', color: '#0F172A',
                    }}
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>Phone Number</label>
                <div style={{ position: 'relative' }}>
                  <span style={{
                    position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)',
                    fontSize: '16px', color: '#94A3B8', pointerEvents: 'none',
                  }}>📞</span>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    style={{
                      width: '100%', height: 48, padding: '13px 16px 13px 48px',
                      background: '#FFFFFF', border: '1px solid #E2E8F0',
                      borderRadius: '8px', fontSize: '16px', color: '#0F172A',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Form Footer: Save Draft + Continue */}
            <div style={{
              borderTop: '1px solid #F1F5F9',
              paddingTop: '24px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <button className="btn-draft">Save as Draft</button>
              <button className="btn-primary">
                Continue to Experience <span style={{ fontSize: '14px' }}>→</span>
              </button>
            </div>
          </div>

          {/* FOOTER HELP */}
          <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            padding: '16px 0',
          }}>
            <span style={{ fontSize: '12px', color: '#64748B' }}>
              Having trouble?{' '}
              <a href="#" style={{ color: '#137FEC', fontWeight: 500, textDecoration: 'none' }}>
                Contact Support
              </a>
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ApplyJob;