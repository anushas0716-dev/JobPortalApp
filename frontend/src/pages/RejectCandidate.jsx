import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RejectCandidate = () => {
  const navigate = useNavigate();
  const [selectedReason, setSelectedReason] = useState('Position filled internally');
  const [internalNote, setInternalNote] = useState('');
  const [emailSubject] = useState('Update regarding your application at TechFlow');
  const [selectedTemplate, setSelectedTemplate] = useState('Standard Professional');

  const rejectionReasons = [
    'Position filled internally',
    'Skills mismatch',
    'Experience level',
    'Cultural fit / Values',
  ];

  const emailMessage = `Dear Jacob,

Thank you for the time you spent interviewing with us for the Senior Product Designer position. We truly enjoyed learning more about your background and seeing your portfolio.

After careful consideration, we have decided to move forward with other candidates at this time. This was a difficult decision, as we were impressed by your skills and experience.

We encourage you to apply for future opportunities at TechFlow that match your profile.

Best regards,
The TechFlow Hiring Team`;

  return (
    <div style={{
      fontFamily: "'Inter', sans-serif",
      background: '#F6F7F8',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '40px 160px',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .rc-radio-option {
          box-sizing: border-box;
          display: flex; flex-direction: row; align-items: center;
          padding: 16px; gap: 12px;
          height: 54px; border-radius: 8px; cursor: pointer;
          transition: all 0.15s;
        }
        .rc-radio-option.selected {
          background: rgba(19,127,236,0.05);
          border: 1px solid #137FEC;
        }
        .rc-radio-option.unselected {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
        }
        .rc-radio-option:hover.unselected { background: #F8FAFC; }

        .rc-toolbar-btn {
          display: flex; justify-content: center; align-items: center;
          background: none; border: none; cursor: pointer;
          padding: 2px; border-radius: 3px; transition: background 0.12s;
        }
        .rc-toolbar-btn:hover { background: #F1F5F9; }

        .rc-note-input {
          width: 100%; height: 38px; padding: 9px 12px 10px;
          background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px;
          font-family: 'Inter', sans-serif; font-size: 14px; color: #0F172A;
          outline: none; transition: border-color 0.15s, box-shadow 0.15s;
        }
        .rc-note-input::placeholder { color: #6B7280; }
        .rc-note-input:focus { border-color: #137FEC; box-shadow: 0 0 0 3px rgba(19,127,236,0.1); }

        .btn-cancel {
          display: flex; justify-content: center; align-items: center;
          padding: 10px 20px; height: 40px; border-radius: 8px;
          background: transparent; border: none;
          font-family: 'Inter', sans-serif; font-weight: 600;
          font-size: 14px; color: #475569; cursor: pointer;
          transition: color 0.15s;
        }
        .btn-cancel:hover { color: #0F172A; }

        .btn-confirm {
          display: flex; flex-direction: row; align-items: center;
          padding: 10px 24px; gap: 8px; height: 40px;
          background: #137FEC; border-radius: 8px; border: none;
          font-family: 'Inter', sans-serif; font-weight: 700;
          font-size: 14px; color: #FFFFFF; cursor: pointer;
          box-shadow: 0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -2px rgba(0,0,0,0.1);
          transition: background 0.2s, transform 0.1s;
        }
        .btn-confirm:hover { background: #0e6fd4; transform: translateY(-1px); }
        .btn-confirm:active { transform: translateY(0); }

        .rc-template-select {
          height: 24px; padding: '3px 28px 3px 12px';
          background: #F1F5F9; border: none; border-radius: 8px;
          font-family: 'Inter', sans-serif; font-weight: 600;
          font-size: 12px; color: '#0F172A'; outline: none;
          appearance: none; cursor: pointer; padding: 3px 28px 3px 12px;
        }
      `}</style>

      {/* ── MAIN MODAL CARD ── */}
      <div style={{
        boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
        width: 800, maxWidth: 800,
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        boxShadow: '0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)',
        borderRadius: 12, overflow: 'hidden',
      }}>

        {/* ── MODAL HEADER ── */}
        <div style={{
          boxSizing: 'border-box',
          display: 'flex', flexDirection: 'row',
          justifyContent: 'space-between', alignItems: 'center',
          padding: '16px 24px', width: '100%', height: 73,
          borderBottom: '1px solid #E2E8F0',
        }}>
          {/* Title group */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            {/* Red icon box */}
            <div style={{
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              width: 40, height: 40, background: '#FEE2E2', borderRadius: 8,
            }}>
              <svg width="21" height="16" viewBox="0 0 21 16" fill="none">
                <circle cx="8" cy="5" r="4" stroke="#DC2626" strokeWidth="1.6"/>
                <path d="M1 15C1 11.686 4.134 9 8 9" stroke="#DC2626" strokeWidth="1.6" strokeLinecap="round"/>
                <line x1="15" y1="8" x2="20" y2="13" stroke="#DC2626" strokeWidth="1.6" strokeLinecap="round"/>
                <line x1="20" y1="8" x2="15" y2="13" stroke="#DC2626" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </div>
            {/* Text */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, lineHeight: '22px', letterSpacing: '-0.45px', color: '#0F172A' }}>
                Reject Candidate
              </span>
              <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, lineHeight: '16px', color: '#64748B' }}>
                Application Management
              </span>
            </div>
          </div>
          {/* Close button */}
          <button style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: 40, height: 40, background: '#F1F5F9', borderRadius: 8,
            border: 'none', cursor: 'pointer', transition: 'background 0.15s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#E2E8F0'}
            onMouseLeave={e => e.currentTarget.style.background = '#F1F5F9'}
            onClick={() => navigate(-1)}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <line x1="1" y1="1" x2="11" y2="11" stroke="#475569" strokeWidth="1.6" strokeLinecap="round"/>
              <line x1="11" y1="1" x2="1" y2="11" stroke="#475569" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* ── BODY ── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 24, gap: 32, width: '100%' }}>

          {/* ── CANDIDATE INFO ── */}
          <div style={{
            boxSizing: 'border-box',
            display: 'flex', flexDirection: 'row', alignItems: 'center',
            padding: 16, gap: 16, width: 750, height: 82,
            background: '#F8FAFC', border: '1px solid #F1F5F9', borderRadius: 12,
          }}>
            {/* Avatar */}
            <div style={{
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              width: 48, height: 48, borderRadius: '9999px',
              background: 'rgba(19,127,236,0.1)', flexShrink: 0,
            }}>
              <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 20, lineHeight: '28px', color: '#137FEC' }}>
                JM
              </span>
            </div>
            {/* Info */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, lineHeight: '22px', color: '#0F172A' }}>
                Jacob Marcus
              </span>
              <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#64748B' }}>
                Senior Product Designer • Applied 12 days ago
              </span>
            </div>
          </div>

          {/* ── REJECTION REASON ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 750 }}>
            {/* Section heading */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                <circle cx="8.5" cy="8.5" r="8" stroke="#137FEC" strokeWidth="1.4"/>
                <line x1="8.5" y1="5.5" x2="8.5" y2="11.5" stroke="#137FEC" strokeWidth="1.4" strokeLinecap="round"/>
                <circle cx="8.5" cy="4" r="0.8" fill="#137FEC"/>
              </svg>
              <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 16, lineHeight: '20px', color: '#0F172A' }}>
                Reason for Rejection
              </span>
            </div>

            {/* 2x2 Radio grid */}
            <div style={{ position: 'relative', width: 750, height: 120 }}>
              {rejectionReasons.map((reason, i) => {
                const isLeft = i % 2 === 0;
                const isTop = i < 2;
                const isSelected = selectedReason === reason;
                return (
                  <div
                    key={reason}
                    className={`rc-radio-option ${isSelected ? 'selected' : 'unselected'}`}
                    style={{
                      position: 'absolute',
                      left: isLeft ? 0 : 381,
                      right: isLeft ? 381 : 0,
                      top: isTop ? 0 : 66,
                    }}
                    onClick={() => setSelectedReason(reason)}
                  >
                    {/* Radio button */}
                    <div style={{
                      boxSizing: 'border-box',
                      width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                      display: 'flex', justifyContent: 'center', alignItems: 'center',
                      border: isSelected ? '2px solid #137FEC' : '2px solid #CBD5E1',
                      background: '#FFFFFF',
                    }}>
                      {isSelected && (
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#137FEC' }} />
                      )}
                    </div>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 14, lineHeight: '20px', color: '#334155' }}>
                      {reason}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── EMAIL NOTIFICATION ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 750 }}>
            {/* Section heading + template */}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 750, height: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <svg width="17" height="13" viewBox="0 0 17 13" fill="none">
                  <rect x="0.5" y="0.5" width="16" height="12" rx="1.5" stroke="#137FEC" strokeWidth="1.2"/>
                  <path d="M0.5 3L8.5 8L16.5 3" stroke="#137FEC" strokeWidth="1.2"/>
                </svg>
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 16, lineHeight: '20px', color: '#0F172A' }}>
                  Candidate Email
                </span>
              </div>
              {/* Template selector */}
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, lineHeight: '16px', color: '#64748B' }}>
                  Template:
                </span>
                <div style={{ position: 'relative' }}>
                  <select
                    className="rc-template-select"
                    value={selectedTemplate}
                    onChange={e => setSelectedTemplate(e.target.value)}
                    style={{
                      height: 24, padding: '3px 28px 3px 12px',
                      background: '#F1F5F9', border: 'none', borderRadius: 8,
                      fontFamily: "'Inter',sans-serif", fontWeight: 600,
                      fontSize: 12, color: '#0F172A', outline: 'none',
                      appearance: 'none', cursor: 'pointer',
                    }}
                  >
                    <option>Standard Professional</option>
                    <option>Brief & Direct</option>
                    <option>Warm & Encouraging</option>
                  </select>
                  <div style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 3.5L5 6.5L8 3.5" stroke="#6B7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Email editor card */}
            <div style={{
              boxSizing: 'border-box',
              display: 'flex', flexDirection: 'column',
              width: 750, borderRadius: 12,
              border: '1px solid #E2E8F0', overflow: 'hidden',
            }}>
              {/* Toolbar */}
              <div style={{
                boxSizing: 'border-box',
                display: 'flex', flexDirection: 'row', alignItems: 'center',
                padding: '8px 16px 7px', gap: 16, height: 35,
                background: '#F8FAFC', borderBottom: '1px solid #E2E8F0',
              }}>
                {/* Bold */}
                <button className="rc-toolbar-btn">
                  <span style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 12, color: '#64748B' }}>B</span>
                </button>
                {/* Italic */}
                <button className="rc-toolbar-btn">
                  <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 12, color: '#64748B' }}>I</span>
                </button>
                {/* Link */}
                <button className="rc-toolbar-btn">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M8 6C7.5 5.3 6.7 4.8 5.8 4.7L3.5 7C3 7.5 2.7 8.3 3 9.2C3.3 10 4 10.7 4.8 11L6.2 9.6" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round"/>
                    <path d="M6 8C6.5 8.7 7.3 9.2 8.2 9.3L10.5 7C11 6.5 11.3 5.7 11 4.8C10.7 4 10 3.3 9.2 3L7.8 4.4" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </button>
                {/* Divider */}
                <div style={{ width: 1, height: 16, background: '#CBD5E1' }} />
                {/* List */}
                <button className="rc-toolbar-btn">
                  <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                    <line x1="4" y1="1" x2="14" y2="1" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round"/>
                    <line x1="4" y1="4" x2="14" y2="4" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round"/>
                    <line x1="4" y1="7" x2="14" y2="7" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round"/>
                    <circle cx="1.5" cy="1" r="1" fill="#64748B"/>
                    <circle cx="1.5" cy="4" r="1" fill="#64748B"/>
                    <circle cx="1.5" cy="7" r="1" fill="#64748B"/>
                  </svg>
                </button>
              </div>

              {/* Email content */}
              <div style={{ display: 'flex', flexDirection: 'column', padding: 16, gap: 16, width: '100%' }}>
                {/* Subject */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{
                    fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 10,
                    lineHeight: '15px', letterSpacing: '1px', textTransform: 'uppercase', color: '#94A3B8',
                  }}>Subject</span>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 16, lineHeight: '24px', color: '#334155' }}>
                    {emailSubject}
                  </span>
                </div>

                {/* Separator */}
                <div style={{ width: '100%', height: 1, background: '#F1F5F9' }} />

                {/* Message */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{
                    fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 10,
                    lineHeight: '15px', letterSpacing: '1px', textTransform: 'uppercase', color: '#94A3B8',
                  }}>Message</span>
                  <div style={{ overflow: 'hidden', maxHeight: 160 }}>
                    {emailMessage.split('\n\n').map((para, i) => (
                      <p key={i} style={{
                        fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14,
                        lineHeight: '23px', color: '#475569', marginBottom: i < emailMessage.split('\n\n').length - 1 ? 0 : 0,
                      }}>{para}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── INTERNAL NOTE ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 750 }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
                <line x1="0" y1="1" x2="14" y2="1" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round"/>
                <line x1="0" y1="5" x2="10" y2="5" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round"/>
                <line x1="0" y1="9" x2="6" y2="9" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, lineHeight: '20px', color: '#0F172A' }}>
                Internal Hiring Note (Optional)
              </span>
            </div>
            <input
              className="rc-note-input"
              type="text"
              placeholder="Add a private note for the hiring team..."
              value={internalNote}
              onChange={e => setInternalNote(e.target.value)}
            />
          </div>
        </div>

        {/* ── FOOTER ACTIONS ── */}
        <div style={{
          boxSizing: 'border-box',
          display: 'flex', flexDirection: 'row',
          justifyContent: 'flex-end', alignItems: 'center',
          padding: '20px 24px', gap: 12, width: '100%', height: 81,
          background: '#F8FAFC', borderTop: '1px solid #E2E8F0',
        }}>
          <button className="btn-cancel" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button className="btn-confirm">
            Confirm Rejection
            <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
              <path d="M1 6h12M8 1l5 5-5 5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default RejectCandidate;