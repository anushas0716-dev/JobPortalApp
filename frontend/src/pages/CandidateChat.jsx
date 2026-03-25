import React, { useState, useRef, useEffect } from 'react';

const CandidateChat = () => {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1, type: 'recruiter',
      sender: 'Sarah Jenkins', time: '10:15 AM',
      text: "Hi Alex, I've just reviewed your application for the Senior Product Designer role. Your experience at PixelFlow looks very relevant!",
    },
    {
      id: 2, type: 'recruiter-cont',
      text: "Could you please share your latest portfolio and a PDF version of your resume? I'd like to forward them to the hiring manager.",
    },
    {
      id: 3, type: 'candidate',
      sender: 'You', time: '10:18 AM',
      text: "Hello Sarah! Thanks for reaching out. I'm glad to hear that. I've attached my updated resume and a link to my case studies below.",
    },
    { id: 4, type: 'attachment-file' },
    { id: 5, type: 'attachment-portfolio' },
    { id: 6, type: 'seen', time: '10:20 AM' },
  ]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!messageText.trim()) return;
    setMessages(prev => [...prev, {
      id: Date.now(), type: 'candidate',
      sender: 'You',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: messageText.trim(),
    }]);
    setMessageText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{
      fontFamily: "'Inter', sans-serif",
      background: '#F6F7F8',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'stretch',
      padding: '0 128px',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .cc-icon-btn {
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          background: #F1F5F9; border: none; border-radius: 8px;
          cursor: pointer; transition: background 0.12s; flex-shrink: 0;
        }
        .cc-icon-btn:hover { background: #E2E8F0; }

        .cc-toolbar-btn {
          display: flex; align-items: center; gap: 6px;
          background: none; border: none; cursor: pointer;
          font-family: 'Inter', sans-serif; font-size: 12px;
          font-weight: 600; color: #64748B;
          transition: color 0.12s; padding: 0;
        }
        .cc-toolbar-btn:hover { color: #334155; }

        .cc-send-btn {
          width: 39px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          background: #137FEC; border: none; border-radius: 12px;
          cursor: pointer; flex-shrink: 0;
          box-shadow: 0px 1px 2px rgba(0,0,0,0.05);
          transition: background 0.15s;
        }
        .cc-send-btn:hover { background: #0e6fd4; }

        .cc-attach-btn {
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          background: none; border: none; border-radius: 8px;
          cursor: pointer; color: #64748B; flex-shrink: 0;
          transition: background 0.12s;
        }
        .cc-attach-btn:hover { background: rgba(0,0,0,0.05); }

        .cc-msg-input {
          flex: 1; background: transparent; border: none; outline: none;
          font-family: 'Inter', sans-serif; font-size: 16px;
          color: #0F172A; resize: none;
          padding: 8px 12px; line-height: 24px; height: 40px;
        }
        .cc-msg-input::placeholder { color: #94A3B8; }

        .portfolio-card { cursor: pointer; transition: box-shadow 0.15s; }
        .portfolio-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.12) !important; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 2px; }
      `}</style>

      {/* ── CHAT WINDOW ── */}
      <div style={{
        width: 1024, maxWidth: 1024,
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        boxShadow: '0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden', minHeight: '100vh',
      }}>

        {/* ── HEADER ── */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '16px 24px', height: 81,
          background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
          flexShrink: 0,
        }}>
          {/* Left: avatar + info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Avatar with online dot */}
            <div style={{ position: 'relative', width: 48, height: 48, flexShrink: 0 }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: 'linear-gradient(135deg, #c9a882, #b8956a)',
                border: '2px solid #FFFFFF',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, overflow: 'hidden',
              }}>👩</div>
              <div style={{
                position: 'absolute', bottom: 0, right: 0,
                width: 12, height: 12, borderRadius: '50%',
                background: '#22C55E',
                boxShadow: '0 0 0 2px #FFFFFF',
              }} />
            </div>

            {/* Name + role row */}
            <div>
              <h2 style={{ fontWeight: 700, fontSize: 18, lineHeight: '22px', color: '#0F172A', marginBottom: 2 }}>
                Sarah Jenkins
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  padding: '2px 8px',
                  background: 'rgba(19,127,236,0.1)', borderRadius: '9999px',
                  fontWeight: 500, fontSize: 12,
                  letterSpacing: '0.6px', textTransform: 'uppercase',
                  color: '#137FEC',
                }}>RECRUITER</span>
                <span style={{ fontWeight: 400, fontSize: 14, color: '#64748B' }}>
                  TechCorp • Active now
                </span>
              </div>
            </div>
          </div>

          {/* Right: action buttons */}
          <div style={{ display: 'flex', gap: 12 }}>
            {/* Phone */}
            <button className="cc-icon-btn" title="Call">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 1H6.5L8 5L5.5 6.5C6.6 8.9 9.1 11.4 11.5 12.5L13 10L17 11.5V15C17 16.1 16.1 17 15 17C7.3 17 1 10.7 1 3C1 1.9 1.9 1 3 1Z"
                  stroke="#334155" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {/* Video */}
            <button className="cc-icon-btn" title="Video">
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
                <rect x="1" y="1" width="12" height="12" rx="2" stroke="#334155" strokeWidth="1.5"/>
                <path d="M13 5L19 2V12L13 9" stroke="#334155" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </button>
            {/* More */}
            <button className="cc-icon-btn" title="More">
              <svg width="4" height="16" viewBox="0 0 4 16" fill="none">
                <circle cx="2" cy="2"  r="1.5" fill="#334155"/>
                <circle cx="2" cy="8"  r="1.5" fill="#334155"/>
                <circle cx="2" cy="14" r="1.5" fill="#334155"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── CHAT AREA ── */}
        <div style={{
          flex: 1, overflowY: 'auto',
          background: '#F8FAFC',
          padding: '32px 24px',
          display: 'flex', flexDirection: 'column', gap: 0,
        }}>
          {/* Date divider */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
            <div style={{ flex: 1, height: 1, background: '#E2E8F0' }} />
            <span style={{
              padding: '0 16px',
              fontWeight: 600, fontSize: 11,
              letterSpacing: '1.2px', textTransform: 'uppercase',
              color: '#94A3B8',
            }}>TODAY</span>
            <div style={{ flex: 1, height: 1, background: '#E2E8F0' }} />
          </div>

          {/* Messages */}
          {messages.map(msg => {
            if (msg.type === 'recruiter') return (
              <div key={msg.id} style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginBottom: 12 }}>
                {/* Recruiter avatar */}
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, #c9a882, #b8956a)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                }}>👩</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 735 }}>
                  <span style={{ fontSize: 11, fontWeight: 500, color: '#64748B', paddingLeft: 4 }}>
                    {msg.sender} • {msg.time}
                  </span>
                  <div style={{
                    padding: '12px 16px',
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
                    borderRadius: '16px 16px 16px 0',
                  }}>
                    <p style={{ fontSize: 16, lineHeight: '24px', color: '#1E293B' }}>{msg.text}</p>
                  </div>
                </div>
              </div>
            );

            if (msg.type === 'recruiter-cont') return (
              <div key={msg.id} style={{ paddingLeft: 44, marginBottom: 20 }}>
                <div style={{
                  padding: '12px 16px',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
                  borderRadius: '16px 16px 16px 0',
                  maxWidth: 779,
                }}>
                  <p style={{ fontSize: 16, lineHeight: '24px', color: '#1E293B' }}>{msg.text}</p>
                </div>
              </div>
            );

            if (msg.type === 'candidate') return (
              <div key={msg.id} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', gap: 12, marginBottom: 10 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, maxWidth: 735 }}>
                  <span style={{ fontSize: 11, fontWeight: 500, color: '#64748B', paddingRight: 4 }}>
                    {msg.sender} • {msg.time}
                  </span>
                  <div style={{
                    padding: '12px 16px',
                    background: '#137FEC',
                    boxShadow: '0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -2px rgba(0,0,0,0.1)',
                    borderRadius: '16px 16px 0 16px',
                  }}>
                    <p style={{ fontSize: 16, lineHeight: '24px', color: '#FFFFFF' }}>{msg.text}</p>
                  </div>
                </div>
                {/* Candidate avatar */}
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, #C9D8E8, #A8BDD4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                }}>👩‍🦱</div>
              </div>
            );

            if (msg.type === 'attachment-file') return (
              <div key={msg.id} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 44, marginBottom: 10 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: 12, width: 288, height: 62,
                  background: 'rgba(19,127,236,0.08)',
                  border: '1px solid rgba(19,127,236,0.2)',
                  boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
                  borderRadius: 12, cursor: 'pointer',
                }}>
                  <div style={{
                    width: 36, height: 36, flexShrink: 0,
                    background: 'rgba(19,127,236,0.15)', borderRadius: 8,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                      <path d="M9 1H3C2.447 1 2 1.447 2 2V18C2 18.553 2.447 19 3 19H13C13.553 19 14 18.553 14 18V6L9 1Z"
                        stroke="#137FEC" strokeWidth="1.5"/>
                      <path d="M9 1V6H14" stroke="#137FEC" strokeWidth="1.5" strokeLinejoin="round"/>
                      <line x1="5" y1="10" x2="11" y2="10" stroke="#137FEC" strokeWidth="1.3" strokeLinecap="round"/>
                      <line x1="5" y1="13" x2="11" y2="13" stroke="#137FEC" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#0F172A', lineHeight: '20px' }}>
                      Alex_Rivera_Resume_2…
                    </p>
                    <p style={{ fontSize: 12, color: '#64748B', lineHeight: '16px' }}>2.4 MB • PDF</p>
                  </div>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2V11M8 11L5 8M8 11L11 8" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 13h12" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            );

            if (msg.type === 'attachment-portfolio') return (
              <div key={msg.id} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 44, marginBottom: 12 }}>
                <div className="portfolio-card" style={{
                  width: 288, background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
                  borderRadius: 12, overflow: 'hidden',
                }}>
                  {/* Preview image mockup */}
                  <div style={{
                    width: '100%', height: 128,
                    background: 'linear-gradient(135deg, #F2C4A8 0%, #E8A882 40%, #F0D0B8 70%, #EDB99A 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative', overflow: 'hidden',
                  }}>
                    {/* Mock device UI */}
                    <div style={{
                      width: 70, height: 90, background: '#FFFFFF',
                      borderRadius: 6, padding: '10px 8px',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
                      display: 'flex', flexDirection: 'column', gap: 5,
                    }}>
                      {[80, 60, 70, 40, 55].map((w, i) => (
                        <div key={i} style={{
                          height: 4, borderRadius: 2, width: `${w}%`,
                          background: i === 3 ? '#137FEC' : '#E2E8F0',
                        }} />
                      ))}
                      <div style={{ height: 22, background: '#F1F5F9', borderRadius: 3, marginTop: 2 }} />
                    </div>
                  </div>
                  {/* Card body */}
                  <div style={{ padding: 12 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#0F172A', lineHeight: '20px', marginBottom: 2 }}>
                      Portfolio - Product Design
                    </p>
                    <p style={{ fontSize: 12, color: '#64748B', lineHeight: '16px', marginBottom: 8 }}>
                      alexrivera.design
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#137FEC' }}>View Case Studies</span>
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M1 10L10 1M10 1H4M10 1V7" stroke="#137FEC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );

            if (msg.type === 'seen') return (
              <div key={msg.id} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 44, marginBottom: 8 }}>
                <span style={{ fontSize: 10, fontWeight: 500, color: '#94A3B8' }}>Seen {msg.time}</span>
              </div>
            );

            return null;
          })}

          <div ref={chatEndRef} />
        </div>

        {/* ── INPUT AREA ── */}
        <div style={{
          padding: '16px 63px',
          background: '#FFFFFF', borderTop: '1px solid #E2E8F0',
          flexShrink: 0,
        }}>
          {/* Input bar */}
          <div style={{
            display: 'flex', alignItems: 'flex-end',
            padding: 8, gap: 8,
            background: '#F1F5F9', borderRadius: 16,
            marginBottom: 8,
          }}>
            {/* Left tool buttons */}
            <div style={{ display: 'flex', gap: 4, paddingBottom: 4, flexShrink: 0 }}>
              {/* Attach */}
              <button className="cc-attach-btn" title="Attach file">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="7" stroke="#64748B" strokeWidth="1.5"/>
                  <line x1="10" y1="6" x2="10" y2="14" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="6" y1="10" x2="14" y2="10" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              {/* Emoji */}
              <button className="cc-attach-btn" title="Emoji">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="8" stroke="#64748B" strokeWidth="1.5"/>
                  <path d="M7 8C7 7.448 7.448 7 8 7C8.552 7 9 7.448 9 8" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round"/>
                  <path d="M11 8C11 7.448 11.448 7 12 7C12.552 7 13 7.448 13 8" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round"/>
                  <path d="M6.5 12C7.2 13.5 8.5 14.5 10 14.5C11.5 14.5 12.8 13.5 13.5 12" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Textarea */}
            <textarea
              className="cc-msg-input"
              rows={1}
              placeholder="Type your message..."
              value={messageText}
              onChange={e => setMessageText(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            {/* Send button */}
            <div style={{ paddingBottom: 4, flexShrink: 0 }}>
              <button className="cc-send-btn" onClick={handleSend}>
                <svg width="19" height="16" viewBox="0 0 19 16" fill="none">
                  <path d="M1 8L18 1L11 15L9 9L1 8Z" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="0.5" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Bottom toolbar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px' }}>
            <span style={{ fontSize: 10, color: '#94A3B8' }}>
              Press Enter to send, Shift + Enter for new line
            </span>
            <div style={{ display: 'flex', gap: 16 }}>
              <button className="cc-toolbar-btn">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="5" stroke="#64748B" strokeWidth="1.2"/>
                  <line x1="3" y1="6" x2="9" y2="6" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round"/>
                  <line x1="6" y1="3" x2="6" y2="9" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                Schedule Interview
              </button>
              <button className="cc-toolbar-btn">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <rect x="0.5" y="0.5" width="10" height="10" rx="1.5" stroke="#64748B" strokeWidth="1.1"/>
                  <line x1="2" y1="3.5" x2="9"  y2="3.5" stroke="#64748B" strokeWidth="1" strokeLinecap="round"/>
                  <line x1="2" y1="5.5" x2="7"  y2="5.5" stroke="#64748B" strokeWidth="1" strokeLinecap="round"/>
                  <line x1="2" y1="7.5" x2="8"  y2="7.5" stroke="#64748B" strokeWidth="1" strokeLinecap="round"/>
                </svg>
                Saved Replies
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateChat;