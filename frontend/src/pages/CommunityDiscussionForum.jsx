import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CommunityDiscussionForum = () => {
  const [activeTab, setActiveTab] = useState('Trending');
  const [activeNav, setActiveNav] = useState('Feed');
  const [postInput, setPostInput] = useState('');
  const [search, setSearch] = useState('');
  const [votes, setVotes] = useState({ 1: 142, 2: 89, 3: 205 });
  const navigate = useNavigate();

  const tabs = ['Trending', 'Latest', 'Career Advice', 'Industry News'];

  const sidebarNav = [
    { label: 'Feed',        icon: '🏠', path: '/community' },
    { label: 'Communities', icon: '👥', path: '/community' },
    { label: 'Mentorship',  icon: '🎓', path: '/learning' },
    { label: 'Job Board',   icon: '💼', path: '/jobs' },
    { label: 'Settings',    icon: '⚙️', path: '/profile-settings' },
  ];

  const trendingTopics = ['#networking', '#engineering', '#leadership', '#careerpath', '#tech', '#remote'];

  const posts = [
    { id: 1, author: 'Sarah Chen',      avatarColor: '#f0c8a0', postedIn: 'Career Advice', timeAgo: 'Posted 2 hours ago', title: 'How to transition from IC to Engineering Manager? My experiences so far.', excerpt: "After 6 years as a Senior Software Engineer, I finally made the jump into management. It's been a wild ride of learning how to delegate and realizing…", tags: ['#LEADERSHIP', '#ENGINEERING'], comments: 24,  hasImage: false },
    { id: 2, author: 'James Miller',    avatarColor: '#a0b8d0', postedIn: 'Industry News',  timeAgo: 'Posted 5 hours ago', title: 'The impact of LLMs on the SaaS landscape in 2024.',              excerpt: "We're seeing a massive shift in how products are being built and marketed. Integration is becoming secondary to agents...",                        tags: ['#TECH', '#AI'],               comments: 56,  hasImage: false },
    { id: 3, author: 'Elena Rodriguez', avatarColor: '#c0b0e0', postedIn: 'Networking',     timeAgo: 'Posted 8 hours ago', title: 'The art of cold-messaging on LinkedIn without being annoying.',   excerpt: "We've all received them: the copy-paste messages that immediately go to the archive. Here is my proven framework for getting a 70% response rate...", tags: ['#NETWORKING', '#CAREER'],     comments: 112, hasImage: true },
  ];

  const contributors = [
    { name: 'Marc Wilson', role: 'Chief Architect at Tec…', pts: '1.2k pts', avatarColor: '#4a6a8a' },
    { name: 'Lisa Wang',   role: 'Product Director',        pts: '948 pts',  avatarColor: '#8a6a9a' },
    { name: 'Anita Smith', role: 'UX Lead @ Designify',     pts: '821 pts',  avatarColor: '#9a7a6a' },
  ];

  const Avatar = ({ color, size = 20, initials = '' }) => (
    <div style={{ width: size, height: size, background: color, borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: size * 0.35, fontWeight: '700', color: 'rgba(255,255,255,0.9)' }}>
      {initials}
    </div>
  );

  const PostImage = () => (
    <div style={{ width: '100%', height: '192px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #F1F5F9', background: '#f8ede8' }}>
      <svg viewBox="0 0 518 192" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect width="518" height="192" fill="#f5e0d8"/>
        <ellipse cx="220" cy="140" rx="80" ry="100" fill="#2d5a3a" transform="rotate(-20, 220, 140)"/>
        <ellipse cx="195" cy="130" rx="65" ry="85" fill="#3a7050" transform="rotate(-15, 195, 130)"/>
        <path d="M210 60 Q240 120 200 180 Q180 140 190 100 Z" fill="#22503a" opacity="0.7"/>
        <path d="M205 70 Q220 120 205 175" stroke="#1a3a28" strokeWidth="1.5" fill="none" opacity="0.5"/>
        <path d="M205 100 Q230 108 250 100" stroke="#1a3a28" strokeWidth="1" fill="none" opacity="0.4"/>
        <path d="M204 115 Q228 123 248 118" stroke="#1a3a28" strokeWidth="1" fill="none" opacity="0.3"/>
        <path d="M203 130 Q225 138 244 135" stroke="#1a3a28" strokeWidth="1" fill="none" opacity="0.3"/>
        <ellipse cx="215" cy="185" rx="55" ry="8" fill="rgba(0,0,0,0.1)"/>
      </svg>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        .cf-nav-link { display: flex; align-items: center; gap: 12px; padding: 8px 12px; border-radius: 8px; cursor: pointer; border: none; background: transparent; font-family: 'Inter',sans-serif; width: 100%; transition: background 0.15s; }
        .cf-nav-link.active { background: rgba(19,127,236,0.1); }
        .cf-nav-link:not(.active):hover { background: #F1F5F9; }
        .cf-tab { padding: 16px 0; font-size: 14px; font-weight: 700; cursor: pointer; border: none; background: transparent; font-family: 'Inter',sans-serif; border-bottom: 2px solid transparent; flex: 1; text-align: center; transition: all 0.15s; }
        .cf-tab.active { color: #137FEC; border-bottom-color: #137FEC; }
        .cf-tab:not(.active) { color: #64748B; }
        .cf-post { background: #FFFFFF; border: 1px solid #E2E8F0; box-shadow: 0px 1px 2px rgba(0,0,0,0.05); border-radius: 12px; padding: 20px; cursor: pointer; transition: box-shadow 0.2s; }
        .cf-post:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
        .cf-vote-btn { width: 32px; height: 32px; border-radius: 4px; display: flex; align-items: center; justify-content: center; border: none; background: transparent; cursor: pointer; transition: background 0.15s; }
        .cf-vote-btn:hover { background: #F1F5F9; }
        .cf-tag { background: #F1F5F9; borderRadius: 6px; padding: 2px 8px; fontSize: 10px; fontWeight: 700; color: #64748B; textTransform: uppercase; }
      `}</style>

      {/* HEADER */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 40px', height: '65px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* ✅ Logo → community */}
            <div onClick={() => navigate('/community')} style={{ width: '32px', height: '32px', background: '#137FEC', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 4h16v10a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" stroke="white" strokeWidth="1.5" fill="none"/><path d="M2 4l8 6 8-6" stroke="white" strokeWidth="1.5"/></svg>
            </div>
            <span onClick={() => navigate('/community')} style={{ fontWeight: '800', fontSize: '20px', color: '#0F172A', letterSpacing: '-0.5px', cursor: 'pointer' }}>ProForum</span>
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {/* ✅ Nav links */}
            <span onClick={() => navigate('/candidate-dashboard')} style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A', cursor: 'pointer' }}>Home</span>
            <span onClick={() => navigate('/community')}           style={{ fontSize: '14px', fontWeight: '500', color: '#475569', cursor: 'pointer' }}>Network</span>
            <span onClick={() => navigate('/jobs')}                style={{ fontSize: '14px', fontWeight: '500', color: '#475569', cursor: 'pointer' }}>News</span>
          </nav>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: '#F1F5F9', borderRadius: '8px', height: '40px', width: '256px' }}>
            <span style={{ padding: '0 0 0 12px', color: '#94A3B8', fontSize: '13px' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search discussions..." style={{ border: 'none', outline: 'none', fontSize: '14px', background: 'transparent', color: '#94A3B8', width: '100%', padding: '0 12px', fontFamily: 'Inter,sans-serif' }} />
          </div>
          {/* ✅ Bell → notifications */}
          <button onClick={() => navigate('/notifications')} style={{ width: '40px', height: '40px', background: '#F1F5F9', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none"><path d="M8 0C6.4 0 5 1.4 5 3V3.5C2.7 4.4 1 6.5 1 9V14L0 16H16L15 14V9C15 6.5 13.3 4.4 11 3.5V3C11 1.4 9.6 0 8 0ZM8 20C9.1 20 10 19.1 10 18H6C6 19.1 6.9 20 8 20Z" fill="#475569"/></svg>
          </button>
          {/* ✅ Avatar → profile */}
          <div onClick={() => navigate('/candidate-profile')} style={{ cursor: 'pointer' }}>
            <Avatar color="#2d4a6a" size={40} initials="AR" />
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div style={{ display: 'flex', padding: '32px 40px', gap: '24px', maxWidth: '1280px', width: '100%' }}>

        {/* LEFT SIDEBAR */}
        <aside style={{ width: '256px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* ✅ User info → profile */}
            <div onClick={() => navigate('/candidate-profile')} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <Avatar color="#d4a070" size={48} initials="AR" />
              <div>
                <div style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>Alex Rivera</div>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#137FEC', letterSpacing: '0.6px', textTransform: 'uppercase' }}>Premium Member</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {sidebarNav.map(item => (
                <button key={item.label} className={`cf-nav-link${activeNav === item.label ? ' active' : ''}`}
                  onClick={() => { setActiveNav(item.label); navigate(item.path); }}>
                  <span style={{ fontSize: '16px', width: '20px', textAlign: 'center', flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: activeNav === item.label ? '#137FEC' : '#475569' }}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Trending Topics */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="20" height="12" viewBox="0 0 20 12" fill="none"><path d="M1 11L7 5L11 9L19 1" stroke="#137FEC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>Trending Topics</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {trendingTopics.map(topic => (
                <button key={topic} onClick={() => setActiveTab('Trending')} style={{ background: '#F1F5F9', border: 'none', borderRadius: '9999px', padding: '6px 12px', fontSize: '12px', fontWeight: '700', color: '#334155', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', minWidth: 0 }}>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0' }}>
              {tabs.map(tab => (
                <button key={tab} className={`cf-tab${activeTab === tab ? ' active' : ''}`} onClick={() => setActiveTab(tab)}>{tab}</button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px' }}>
              <Avatar color="#d4a070" size={40} initials="AR" />
              <div style={{ flex: 1 }}>
                <div style={{ background: '#F1F5F9', borderRadius: '8px', padding: '11px 16px', cursor: 'text' }} onClick={() => {}}>
                  <span style={{ fontSize: '14px', color: '#6B7280' }}>Start a discussion...</span>
                </div>
              </div>
            </div>
          </div>

          {/* POSTS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {posts.map(post => (
              <div key={post.id} className="cf-post">
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', width: '32px', flexShrink: 0 }}>
                    {/* ✅ Upvote */}
                    <button className="cf-vote-btn" onClick={() => setVotes(v => ({ ...v, [post.id]: v[post.id] + 1 }))}>
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 7L6 1L11 7" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#0F172A' }}>{votes[post.id]}</span>
                    {/* ✅ Downvote */}
                    <button className="cf-vote-btn" onClick={() => setVotes(v => ({ ...v, [post.id]: v[post.id] - 1 }))}>
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1L6 7L11 1" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {/* ✅ Author avatar → profile */}
                      <div onClick={() => navigate('/candidate-profile')} style={{ cursor: 'pointer' }}>
                        <Avatar color={post.avatarColor} size={20} initials={post.author[0]} />
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: '#334155' }}>{post.author}</span>
                      <span style={{ fontSize: '12px', color: '#64748B' }}>·</span>
                      <span style={{ fontSize: '12px', color: '#64748B' }}>{post.timeAgo} in</span>
                      {/* ✅ Category → switch tab */}
                      <span onClick={() => setActiveTab(post.postedIn)} style={{ fontSize: '12px', fontWeight: '700', color: '#137FEC', cursor: 'pointer' }}>{post.postedIn}</span>
                    </div>
                    <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A', lineHeight: '28px' }}>{post.title}</h2>
                    {post.hasImage && <PostImage />}
                    <p style={{ fontSize: '14px', color: '#475569', lineHeight: '20px' }}>{post.excerpt}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {post.tags.map(tag => (
                          <span key={tag} style={{ background: '#F1F5F9', borderRadius: '6px', padding: '2px 8px', fontSize: '10px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>{tag}</span>
                        ))}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        {/* ✅ Comments */}
                        <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M1 1h13v9H8l-4 4V10H1V1z" stroke="#64748B" strokeWidth="1.3" fill="none" strokeLinejoin="round"/></svg>
                          <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748B' }}>{post.comments} Comments</span>
                        </button>
                        {/* ✅ Share */}
                        <button onClick={() => { navigator.clipboard?.writeText(window.location.href); alert('Link copied!'); }} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
                          <svg width="14" height="15" viewBox="0 0 14 15" fill="none"><path d="M1 5L7 1L13 5V13H1V5Z" stroke="#64748B" strokeWidth="1.3" fill="none" strokeLinejoin="round"/><path d="M5 13V8H9V13" stroke="#64748B" strokeWidth="1.3" strokeLinejoin="round"/></svg>
                          <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748B' }}>Share</span>
                        </button>
                        {/* ✅ Save */}
                        <button onClick={() => alert('Post saved!')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
                          <svg width="11" height="14" viewBox="0 0 11 14" fill="none"><path d="M1 1h9v12L5.5 9.5 1 13V1z" stroke="#64748B" strokeWidth="1.3" fill="none" strokeLinejoin="round"/></svg>
                          <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748B' }}>Save</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
            <button style={{ padding: '8px 24px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '9999px', fontSize: '14px', fontWeight: '700', color: '#475569', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
              Load More Discussions
            </button>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside style={{ width: '288px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>Community Stats</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '8px' }}>
              {[
                { label: 'Total Members', value: '12.4k', dot: null },
                { label: 'Active Now',    value: '482',   dot: '#22C55E' },
                { label: 'Discussions',   value: '8.1k',  dot: null },
              ].map(stat => (
                <div key={stat.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#64748B' }}>{stat.label}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {stat.dot && <div style={{ width: '8px', height: '8px', background: stat.dot, borderRadius: '9999px' }} />}
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>{stat.value}</span>
                  </div>
                </div>
              ))}
            </div>
            {/* ✅ Create New Thread */}
            <button onClick={() => alert('Create new thread — coming soon!')} style={{ width: '100%', padding: '10px 0', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#FFFFFF', cursor: 'pointer', fontFamily: 'Inter,sans-serif', boxShadow: '0px 4px 6px -1px rgba(19,127,236,0.2)' }}>
              Create New Thread
            </button>
          </div>

          {/* Top Contributors */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>Top Contributors</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {contributors.map(person => (
                /* ✅ Contributor → profile */
                <div key={person.name} onClick={() => navigate('/candidate-profile')} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <Avatar color={person.avatarColor} size={40} initials={person.name[0]} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>{person.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>{person.role}</div>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#137FEC', flexShrink: 0 }}>{person.pts}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer links */}
          <div style={{ padding: '0 8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {[['About','/landing'],['Guidelines','/community'],['Privacy','/privacy'],['Terms','/platform']].map(([l,p]) => (
                <span key={l} onClick={() => navigate(p)} style={{ fontSize: '12px', color: '#94A3B8', cursor: 'pointer' }}>{l}</span>
              ))}
            </div>
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>© 2024 ProForum. All rights reserved.</span>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CommunityDiscussionForum;