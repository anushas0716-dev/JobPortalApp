import React, { useState } from 'react';

const SubmitConfirmation = () => {
  const [submitted, setSubmitted] = useState(false);

  const summaryDetails = [
    { label: 'Application ID', value: '#APP-2024-8842' },
    { label: 'Role Applied For', value: 'Senior Product Designer' },
    { label: 'Attached Documents', value: 'CV, Portfolio, Cover Letter' },
  ];

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: '#F6F7F8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif", padding: '16px' }}>
        <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0px 25px 50px -12px rgba(0,0,0,0.25)', width: '100%', maxWidth: '560px', padding: '48px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0F172A', marginBottom: '12px' }}>Application Submitted!</h2>
          <p style={{ fontSize: '16px', color: '#475569', lineHeight: '26px', marginBottom: '24px' }}>Your application for <strong>Senior Product Designer</strong> has been submitted successfully. You'll hear back within 5–7 business days.</p>
          <button onClick={() => setSubmitted(false)} style={{ padding: '14px 32px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter',sans-serif" }}>Back to Jobs</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F6F7F8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif", padding: '76px 16px' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; }`}</style>

      <div style={{ background: '#FFFFFF', borderRadius: '12px', boxShadow: '0px 25px 50px -12px rgba(0,0,0,0.25)', width: '100%', maxWidth: '560px', overflow: 'hidden' }}>

        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '18px', color: '#137FEC' }}>📋</span>
            <span style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', letterSpacing: '-0.45px' }}>Application Submission</span>
          </div>
          <button style={{ width: '40px', height: '40px', background: '#F1F5F9', border: 'none', borderRadius: '50%', cursor: 'pointer', fontSize: '14px', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter',sans-serif", fontWeight: '700' }}>✕</button>
        </div>

        {/* VISUAL HEADER IMAGE */}
        <div style={{ padding: '24px 24px 0' }}>
          <div style={{ width: '100%', height: '180px', borderRadius: '12px', overflow: 'hidden', background: '#E2E8F0' }}>
            <img
              src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=560&h=180&fit=crop"
              alt="submission"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={e => { e.target.style.display = 'none'; e.target.parentElement.style.background = 'linear-gradient(135deg,#dbeafe,#eff6ff)'; }}
            />
          </div>
        </div>

        {/* MAIN MESSAGE */}
        <div style={{ padding: '24px 24px 0', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h2 style={{ fontSize: '30px', fontWeight: '700', color: '#0F172A', lineHeight: '38px' }}>Are you sure?</h2>
          <p style={{ fontSize: '16px', color: '#475569', lineHeight: '26px' }}>
            Please review your details one last time. Once submitted, your application enters the processing stage and you won't be able to make further changes.
          </p>
        </div>

        {/* SUMMARY SECTION */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px', color: '#137FEC' }}>☑️</span>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>Summary of details</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {summaryDetails.map(d => (
              <div key={d.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8FAFC', border: '1px solid #F1F5F9', borderRadius: '8px', padding: '12px' }}>
                <span style={{ fontSize: '14px', color: '#64748B' }}>{d.label}</span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A' }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div style={{ padding: '8px 24px 32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            onClick={() => setSubmitted(true)}
            style={{ width: '100%', padding: '14px 0', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter',sans-serif", boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.2)' }}>
            Confirm and Submit Application
          </button>
          <button style={{ width: '100%', padding: '14px 0', background: '#F1F5F9', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', color: '#334155', cursor: 'pointer', fontFamily: "'Inter',sans-serif" }}>
            Go Back and Edit
          </button>
        </div>

        {/* FOOTER NOTE */}
        <div style={{ padding: '0 24px 24px', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: '#94A3B8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            🔒 Your data is encrypted and handled securely.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubmitConfirmation;