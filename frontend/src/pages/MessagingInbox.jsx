import React, { useState } from 'react';

const MessagingInbox = () => {
  const [activeConv, setActiveConv] = useState(0);
  const [activeTab, setActiveTab] = useState('Focused');
  const [message, setMessage] = useState('');
  const [sidebarSearch, setSidebarSearch] = useState('');

  const conversations = [
    {
      id: 0,
      name: 'Sarah Jenkins',
      role: 'Senior Product Designer',
      roleColor: '#137FEC',
      time: '10:42 AM',
      preview: 'Thanks for the update on the Senior…',
      online: true,
      avatar: '👩',
      avatarBg: '#f9c5a0',
      bold: true,
      unreadDot: false,
    },
    {
      id: 1,
      name: 'Michael Chen',
      role: 'Full Stack Developer',
      roleColor: '#64748B',
      time: 'Yesterday',
      preview: 'I am available for an interview on Tuesday or…',
      online: false,
      avatar: '👨',
      avatarBg: '#d1d5db',
      bold: false,
      unreadDot: false,
    },
    {
      id: 2,
      name: 'Jane Doe',
      role: 'Marketing Manager',
      roleColor: '#64748B',
      time: 'Oct 12',
      preview: 'Draft: Looking forward to meeting the team...',
      online: false,
      avatar: 'JD',
      avatarBg: '#E2E8F0',
      avatarText: true,
      bold: false,
      unreadDot: false,
    },
    {
      id: 3,
      name: 'Robert Smith',
      role: 'Talent Acquisition',
      roleColor: '#64748B',
      time: 'Oct 10',
      preview: 'You: Please let me know if you need any…',
      online: false,
      avatar: '👨‍💼',
      avatarBg: '#bfdbfe',
      bold: false,
      unreadDot: true,
    },
  ];

  const messages = [
    {
      id: 1,
      type: 'received',
      text: 'Hi there! I saw the posting for the Senior Product Designer position and I\'m very interested in learning more about the role and the design team at JobPortal.',
      time: '10:15 AM',
    },
    {
      id: 2,
      type: 'sent',
      text: 'Hi Sarah! Thanks for reaching out. We\'d love to learn more about your background. Your portfolio looks impressive — especially your work on the fintech redesign project.',
      time: '10:22 AM',
    },
    {
      id: 3,
      type: 'received',
      text: 'Thank you so much! I\'ve been following JobPortal for a while and I think the mission really aligns with my values. I\'ve attached my updated resume for your review.',
      time: '10:28 AM',
      attachment: { name: 'Sarah_Jenkins_Resume.pdf', size: '2.4 MB' },
    },
  ];

  const skills = ['Figma', 'Product Strategy', 'User Research', 'Prototyping'];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input, textarea { font-family: 'Inter', sans-serif; }
        input::placeholder, textarea::placeholder { color: #6B7280; }
        input:focus, textarea:focus { outline: none; }
        .conv-item { padding: 16px; cursor: pointer; border-top: 1px solid #F8FAFC; transition: background 0.15s; }
        .conv-item:hover { background: #F8FAFC; }
        .conv-item.active { background: rgba(19,127,236,0.05); border-left: 4px solid #137FEC; }
        .nav-link { display: flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 500; color: #64748B; text-decoration: none; cursor: pointer; border: none; background: none; font-family: 'Inter',sans-serif; transition: color 0.15s; }
        .nav-link.active { color: #137FEC; font-weight: 500; }
        .nav-link:hover { color: #137FEC; }
        .tab-btn { padding: 12px 8px; border: none; background: none; font-family: 'Inter',sans-serif; font-size: 14px; cursor: pointer; border-bottom: 2px solid transparent; color: #64748B; font-weight: 500; transition: color 0.15s; }
        .tab-btn.active { color: #137FEC; font-weight: 700; border-bottom-color: #137FEC; }
        .icon-btn { background: none; border: none; cursor: pointer; padding: 8px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; color: #64748B; transition: background 0.15s; }
        .icon-btn:hover { background: #F1F5F9; }
        .btn-send { background: #137FEC; border: none; border-radius: 8px; font-family: 'Inter',sans-serif; font-size: 12px; font-weight: 700; color: #fff; cursor: pointer; padding: 8px 16px; transition: background 0.2s; }
        .btn-send:hover { background: #0e6fd4; }
        .btn-discard { background: none; border: none; font-family: 'Inter',sans-serif; font-size: 12px; font-weight: 700; color: #64748B; cursor: pointer; }
        .btn-discard:hover { color: #334155; }
        .skill-tag { background: #F1F5F9; border-radius: 9999px; padding: 4px 10px; font-size: 11px; font-weight: 500; color: #0F172A; }
        .btn-schedule { width: 100%; padding: 8px 16px; background: #137FEC; border: none; border-radius: 8px; font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 700; color: #fff; cursor: pointer; box-shadow: 0px 1px 2px rgba(19,127,236,0.2); transition: background 0.2s; }
        .btn-schedule:hover { background: #0e6fd4; }
        .msg-bubble-received { background: #F1F5F9; border-radius: 0px 12px 12px 12px; padding: 14px 16px 16px; max-width: 435px; }
        .msg-bubble-sent { background: #137FEC; border-radius: 12px 0px 12px 12px; padding: 14px 16px 16px; max-width: 425px; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 2px; }
      `}</style>

      {/* TOP NAVBAR */}
      <nav style={{
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
        padding: '12px 24px', height: 61,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 32, height: 31, background: '#137FEC', borderRadius: '8px', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>💼</div>
            <span style={{ fontWeight: 700, fontSize: '18px', letterSpacing: '-0.45px', color: '#0F172A' }}>JobPortal</span>
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            {[['🏠', 'Home'], ['💼', 'Jobs'], ['💬', 'Messaging', true], ['👥', 'Network']].map(([icon, label, active]) => (
              <button key={label} className={`nav-link${active ? ' active' : ''}`}>
                <span>{icon}</span>{label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: '#F1F5F9', borderRadius: '8px', padding: '9px 16px 10px 40px', width: 256, height: 36, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 12, fontSize: '13px', color: '#94A3B8' }}>🔍</span>
            <input placeholder="Search people..." style={{ border: 'none', background: 'transparent', fontSize: '14px', color: '#0F172A', width: '100%' }} />
          </div>
          <button className="icon-btn" style={{ fontSize: '20px' }}>🔔</button>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(19,127,236,0.1)', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', cursor: 'pointer' }}>👤</div>
        </div>
      </nav>

      {/* BODY */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* LEFT SIDEBAR: Conversation List */}
        <aside style={{ width: 400, background: '#FFFFFF', borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          {/* Header */}
          <div style={{ padding: '16px', borderBottom: '1px solid #F1F5F9', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A' }}>Messaging</h1>
              <button className="icon-btn" style={{ color: '#137FEC', fontSize: '18px' }}>✏️</button>
            </div>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: '#94A3B8' }}>🔍</span>
              <input
                placeholder="Search messages"
                value={sidebarSearch}
                onChange={e => setSidebarSearch(e.target.value)}
                style={{ width: '100%', height: 38, padding: '9px 16px 10px 40px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px' }}
              />
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', padding: '0 16px', borderBottom: '1px solid #F1F5F9' }}>
            {['Focused', 'Other'].map(tab => (
              <button key={tab} className={`tab-btn${activeTab === tab ? ' active' : ''}`} onClick={() => setActiveTab(tab)}>
                {tab}
              </button>
            ))}
          </div>

          {/* Conversation list */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {conversations.map((conv, i) => (
              <div
                key={conv.id}
                className={`conv-item${activeConv === conv.id ? ' active' : ''}`}
                onClick={() => setActiveConv(conv.id)}
                style={{ paddingLeft: activeConv === conv.id ? '12px' : '16px' }}
              >
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  {/* Avatar */}
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: '50%',
                      background: conv.avatarBg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: conv.avatarText ? '16px' : '24px',
                      fontWeight: conv.avatarText ? 700 : 400,
                      color: conv.avatarText ? '#64748B' : 'inherit',
                      overflow: 'hidden',
                    }}>{conv.avatar}</div>
                    {conv.online && (
                      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, background: '#22C55E', border: '2px solid #fff', borderRadius: '50%' }} />
                    )}
                    {!conv.online && conv.id === 2 && (
                      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, background: '#CBD5E1', border: '2px solid #fff', borderRadius: '50%' }} />
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2px' }}>
                      <span style={{ fontSize: '14px', fontWeight: conv.bold ? 700 : 600, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{conv.name}</span>
                      <span style={{ fontSize: '11px', fontWeight: conv.bold ? 500 : 400, color: '#94A3B8', flexShrink: 0, marginLeft: '8px' }}>{conv.time}</span>
                    </div>
                    <p style={{ fontSize: '12px', fontWeight: conv.id === 0 ? 700 : 400, color: conv.roleColor, marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{conv.role}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ fontSize: '14px', fontWeight: conv.bold ? 500 : 400, color: '#475569', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>{conv.preview}</p>
                      {conv.unreadDot && <div style={{ width: 8, height: 8, background: '#137FEC', borderRadius: '50%', flexShrink: 0, marginLeft: '8px' }} />}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* CENTER: Chat Panel */}
        <section style={{ flex: 1, background: '#FFFFFF', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* Chat Header */}
          <div style={{ padding: '16px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, height: 73 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#f9c5a0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>👩</div>
              <div>
                <p style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>Sarah Jenkins</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: 6, height: 6, background: '#22C55E', borderRadius: '50%' }} />
                  <span style={{ fontSize: '12px', fontWeight: 500, color: '#22C55E' }}>Active now</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="icon-btn">📹</button>
              <button className="icon-btn">📞</button>
              <button className="icon-btn">⋯</button>
            </div>
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Profile card */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#f9c5a0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', marginBottom: '12px' }}>👩</div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Sarah Jenkins</h3>
              <p style={{ fontSize: '14px', color: '#64748B', textAlign: 'center', maxWidth: '320px', lineHeight: '20px', marginBottom: '16px' }}>
                Senior Product Designer @ Creative Studio • 8+ years experience
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ padding: '6px 16px', border: '1px solid #137FEC', borderRadius: '9999px', background: 'none', fontSize: '12px', fontWeight: 700, color: '#137FEC', cursor: 'pointer' }}>View Profile</button>
                <button style={{ padding: '6px 16px', border: '1px solid #E2E8F0', borderRadius: '9999px', background: 'none', fontSize: '12px', fontWeight: 700, color: '#64748B', cursor: 'pointer' }}>Share</button>
              </div>

              <div style={{ width: '100%', height: 1, background: '#F1F5F9', margin: '32px 0 16px' }} />
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', letterSpacing: '1.1px', textTransform: 'uppercase', alignSelf: 'flex-start' }}>OCTOBER 14, 2023</p>
            </div>

            {/* Received message 1 */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#f9c5a0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>👩</div>
              <div className="msg-bubble-received">
                <p style={{ fontSize: '14px', color: '#0F172A', lineHeight: '23px', marginBottom: '8px' }}>{messages[0].text}</p>
                <p style={{ fontSize: '10px', color: '#94A3B8' }}>{messages[0].time}</p>
              </div>
            </div>

            {/* Sent message */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div className="msg-bubble-sent">
                <p style={{ fontSize: '14px', color: '#FFFFFF', lineHeight: '23px', marginBottom: '8px' }}>{messages[1].text}</p>
                <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', textAlign: 'right' }}>{messages[1].time}</p>
              </div>
            </div>

            {/* Received message with attachment */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#f9c5a0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>👩</div>
              <div className="msg-bubble-received">
                <p style={{ fontSize: '14px', color: '#0F172A', lineHeight: '23px', marginBottom: '12px' }}>{messages[2].text}</p>
                {/* File attachment */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '8px' }}>
                  <div style={{ width: 29, height: 33, background: '#FEF2F2', borderRadius: '4px', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: '12px', color: '#DC2626' }}>📄</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>{messages[2].attachment.name}</p>
                    <p style={{ fontSize: '10px', color: '#94A3B8' }}>{messages[2].attachment.size}</p>
                  </div>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#94A3B8' }}>⬇</button>
                </div>
                <p style={{ fontSize: '10px', color: '#94A3B8', marginTop: '12px' }}>{messages[2].time}</p>
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div style={{ padding: '16px', borderTop: '1px solid #E2E8F0', flexShrink: 0 }}>
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '8px' }}>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Write a message..."
                style={{ width: '100%', minHeight: 80, padding: '8px 12px 52px', background: 'transparent', border: 'none', fontSize: '14px', color: '#0F172A', resize: 'none', outline: 'none', lineHeight: '20px' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0 0', borderTop: '1px solid rgba(226,232,240,0.5)' }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button className="icon-btn" style={{ fontSize: '15px' }}>🖼️</button>
                  <button className="icon-btn" style={{ fontSize: '15px' }}>📎</button>
                  <button className="icon-btn" style={{ fontSize: '15px' }}>😊</button>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <button className="btn-discard">Discard</button>
                  <button className="btn-send">Send</button>
                </div>
              </div>
            </div>
            <p style={{ fontSize: '10px', color: '#94A3B8', textAlign: 'right', marginTop: '4px' }}>Press Cmd+Enter to send</p>
          </div>
        </section>

        {/* RIGHT SIDEBAR: Application Details */}
        <aside style={{ width: 288, background: '#F8FAFC', borderLeft: '1px solid #E2E8F0', flexShrink: 0, overflowY: 'auto', padding: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Application Details</h2>

          {/* Application card */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Applied for */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: 32, height: 36, background: 'rgba(19,127,236,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>📄</div>
              <div>
                <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '4px' }}>Applied for</p>
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', lineHeight: '20px' }}>Senior Product Designer</p>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Match score */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', color: '#64748B' }}>Match score</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#16A34A' }}>94%</span>
                </div>
                <div style={{ height: 6, background: '#F1F5F9', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '94%', background: '#22C55E', borderRadius: '9999px' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                  <span style={{ fontSize: '12px', color: '#64748B' }}>Applied on</span>
                  <span style={{ fontSize: '12px', fontWeight: 500, color: '#0F172A' }}>Oct 10, 2023</span>
                </div>
              </div>
              {/* Status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#64748B' }}>Status</span>
                <span style={{ background: '#FEF9C3', color: '#A16207', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>Interviewing</span>
              </div>
            </div>
          </div>

          {/* Key Skills */}
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}>Key Skills</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
            {skills.map(skill => (
              <span key={skill} className="skill-tag">{skill}</span>
            ))}
          </div>

          {/* Upcoming Interview */}
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}>Upcoming Interview</h3>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ width: 40, height: 40, background: '#137FEC', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#fff', textTransform: 'uppercase' }}>OCT</span>
              <span style={{ fontSize: '18px', fontWeight: 700, color: '#fff', lineHeight: '18px' }}>24</span>
            </div>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>Technical Review</p>
              <p style={{ fontSize: '10px', color: '#64748B' }}>2:00 PM - 3:00 PM</p>
            </div>
          </div>

          <button className="btn-schedule">Schedule Next Round</button>
        </aside>
      </div>
    </div>
  );
};

export default MessagingInbox;