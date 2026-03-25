import React, { useState } from 'react';

const UserOnboarding = () => {
  const [fullName, setFullName] = useState('');
  const [currentRole, setCurrentRole] = useState('');
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, title: 'Profile Setup', desc: 'Basic account details', icon: '✏️' },
    { id: 2, title: 'Set Preferences', desc: 'Match with your goals', icon: '⚙️' },
    { id: 3, title: 'Upload Resume', desc: 'AI analysis of skills', icon: '📄' },
  ];

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100 || 33;

  const handleSaveDraft = () => {
    localStorage.setItem('onboarding_draft', JSON.stringify({ fullName, currentRole, bio }));
    alert('Draft saved!');
  };

  const handleContinue = () => {
  if (!fullName) { alert('Please enter your full name.'); return; }
  setCurrentStep(2);
  window.location.href = '/profile-setup';
};

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhoto(url);
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#F6F7F8', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .input-field { width: 100%; padding: 10px 12px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 16px; font-family: 'Inter', sans-serif; color: #0F172A; outline: none; transition: border 0.2s; background: #fff; }
        .input-field::placeholder { color: #6B7280; }
        .input-field:focus { border-color: #137FEC; box-shadow: 0 0 0 3px rgba(19,127,236,0.1); }
        .step-active { background: #FFFFFF; box-shadow: 0px 1px 2px rgba(0,0,0,0.05); border-radius: 12px; }
        .step-inactive { border-radius: 12px; }
        .step-inactive:hover { background: #f8fafc; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 40px', height: '65px',
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '32px', height: '32px', background: 'rgba(19,127,236,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#137FEC', fontSize: '16px' }}>🚀</span>
          </div>
          <span style={{ fontWeight: '700', fontSize: '18px', letterSpacing: '-0.45px', color: '#0F172A' }}>OnboardPro</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ width: '40px', height: '40px', background: '#F1F5F9', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>🔔</button>
          <button style={{ width: '40px', height: '40px', background: '#F1F5F9', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>👤</button>
        </div>
      </nav>

      {/* MAIN */}
      <div style={{ flex: 1, padding: '40px 160px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '293px 1fr', gap: '40px' }}>

            {/* LEFT SIDEBAR */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* Progress */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A', letterSpacing: '0.7px', textTransform: 'uppercase' }}>Your Progress</span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#137FEC' }}>33% Complete</span>
                </div>
                <div style={{ background: '#E2E8F0', borderRadius: '9999px', height: '8px' }}>
                  <div style={{ background: '#137FEC', borderRadius: '9999px', height: '8px', width: '33%', transition: 'width 0.3s ease' }} />
                </div>
              </div>

              {/* Steps */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {steps.map(step => (
                  <div
                    key={step.id}
                    className={currentStep === step.id ? 'step-active' : 'step-inactive'}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '16px', cursor: 'pointer' }}
                    onClick={() => setCurrentStep(step.id)}
                  >
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                      background: currentStep === step.id ? '#137FEC' : '#E2E8F0',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '14px'
                    }}>
                      <span style={{ color: currentStep === step.id ? '#fff' : '#94A3B8' }}>{step.icon}</span>
                    </div>
                    <div>
                      <p style={{ fontSize: '16px', fontWeight: currentStep === step.id ? '700' : '500', color: currentStep === step.id ? '#0F172A' : '#475569', lineHeight: '24px' }}>{step.title}</p>
                      <p style={{ fontSize: '14px', color: currentStep === step.id ? '#64748B' : '#94A3B8', lineHeight: '20px' }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Why complete this */}
              <div style={{ background: 'rgba(19,127,236,0.05)', border: '1px solid rgba(19,127,236,0.1)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#137FEC', fontSize: '14px' }}>ℹ️</span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#137FEC' }}>Why complete this?</span>
                </div>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: '23px' }}>
                  Profiles with completed information receive 3x more relevant matches within the SaaS ecosystem.
                </p>
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

              {/* Form Card */}
              <div style={{
                background: '#FFFFFF', border: '1px solid #E2E8F0',
                borderRadius: '12px', padding: '32px 32px 48px',
                boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
                display: 'flex', flexDirection: 'column', gap: '32px'
              }}>
                {/* Title */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <h1 style={{ fontSize: '30px', fontWeight: '800', color: '#0F172A', letterSpacing: '-0.75px', lineHeight: '36px' }}>
                    Let's build your profile
                  </h1>
                  <p style={{ fontSize: '18px', color: '#64748B', lineHeight: '28px' }}>
                    Providing accurate information helps our AI match you with the best opportunities in the SaaS ecosystem.
                  </p>
                </div>

                {/* Form Fields */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                  {/* Full Name + Current Role */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Full Name</label>
                      <input className="input-field" placeholder="John Doe" value={fullName} onChange={e => setFullName(e.target.value)} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Current Role</label>
                      <input className="input-field" placeholder="Product Designer" value={currentRole} onChange={e => setCurrentRole(e.target.value)} />
                    </div>
                  </div>

                  {/* Bio */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Bio</label>
                    <textarea
                      className="input-field"
                      placeholder="Tell us about your professional journey..."
                      value={bio}
                      onChange={e => setBio(e.target.value)}
                      rows={4}
                      style={{ resize: 'vertical', fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>

                  {/* Photo Upload */}
                  <div>
                    <input type="file" id="photo-upload" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoUpload} />
                    <label htmlFor="photo-upload" style={{ cursor: 'pointer' }}>
                      <div style={{
                        background: '#F8FAFC', border: '2px dashed #E2E8F0',
                        borderRadius: '8px', padding: '24px',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                        transition: 'border 0.2s'
                      }}>
                        {photo ? (
                          <img src={photo} alt="Profile" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '48px', height: '48px', background: '#F1F5F9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                            <span style={{ fontSize: '20px', color: '#94A3B8' }}>📷</span>
                          </div>
                        )}
                        <p style={{ fontSize: '16px', fontWeight: '500', color: '#0F172A' }}>Profile Photo</p>
                        <p style={{ fontSize: '14px', color: '#64748B' }}>Drag and drop or click to upload</p>
                      </div>
                    </label>
                  </div>

                  {/* Buttons */}
                  <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                    <button
                      onClick={handleSaveDraft}
                      style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', background: 'transparent', fontSize: '16px', fontWeight: '700', color: '#475569', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}
                    >Save Draft</button>
                    <button
                      onClick={handleContinue}
                      style={{
                        padding: '10px 32px', borderRadius: '8px', border: 'none',
                        background: '#137FEC', color: '#fff', fontSize: '16px',
                        fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif",
                        display: 'flex', alignItems: 'center', gap: '8px',
                        boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.2)'
                      }}
                    >
                      Continue to Preferences →
                    </button>
                  </div>
                </div>
              </div>

              {/* Did you know card */}
              <div style={{
                background: 'linear-gradient(90deg, #137FEC 0%, #2563EB 100%)',
                borderRadius: '12px', padding: '24px',
                display: 'flex', alignItems: 'center', gap: '24px',
                position: 'relative', overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', width: '160px', height: '160px', right: '-40px', bottom: '-40px', background: 'rgba(255,255,255,0.1)', filter: 'blur(32px)', borderRadius: '50%' }} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', marginBottom: '7px' }}>Did you know?</h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: '23px' }}>
                    The next step, <strong style={{ color: '#fff' }}>Preferences</strong>, will allow you to specify your target salary, remote work choices, and company culture fit.
                  </p>
                </div>
                <div style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(2px)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '32px' }}>🧠</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: '#FFFFFF', borderTop: '1px solid #E2E8F0', padding: '24px 160px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '12px', color: '#64748B' }}>© 2024 OnboardPro. Secure and encrypted onboarding experience.</p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy Policy', 'Terms of Service', 'Help Center'].map(link => (
              <a key={link} href="#" style={{ fontSize: '12px', color: '#64748B', textDecoration: 'none' }}>{link}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOnboarding;