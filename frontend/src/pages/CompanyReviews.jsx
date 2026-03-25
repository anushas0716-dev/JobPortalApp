import React, { useState } from 'react';

const CompanyReviews = () => {
  const [activeTab, setActiveTab] = useState('Reviews');
  const [search, setSearch] = useState('');

  const tabs = ['Overview', 'Reviews', 'Salaries', 'Benefits'];
  const ratingBars = [
    { stars: 5, pct: 55 }, { stars: 4, pct: 25 },
    { stars: 3, pct: 12 }, { stars: 2, pct: 5 }, { stars: 1, pct: 3 },
  ];
  const subRatings = [
    { label: 'Culture', val: 4.1, pct: 82 },
    { label: 'Work-Life Balance', val: 3.9, pct: 78 },
    { label: 'Management', val: 4.4, pct: 88 },
  ];
  const reviews = [
    {
      id: 1, title: '"Excellent career growth and culture"',
      type: 'Current Employee - Software Engineer', date: 'Oct 24, 2023',
      rating: 5, verified: true,
      pros: 'Great benefits package, unlimited PTO that is actually encouraged, and a very inclusive atmosphere.',
      cons: 'Rapid growth means processes change often, can be hard to keep up sometimes.',
      review: "Working at TechFlow has been the highlight of my career. The management team truly cares about individual growth. I've been here for 2 years and have already seen two promotions. The focus on work-life balance is real - no one expects you to answer Slack messages after 6 PM or on weekends.",
      ceoApproval: '95%', outlook: 'Positive', helpful: 42,
    },
    {
      id: 2, title: '"Good work, but high pressure environment"',
      type: 'Former Employee - Product Manager', date: 'Sep 12, 2023',
      rating: 4, verified: false,
      pros: 'Talented coworkers, cutting edge tech stack, and beautiful office space.',
      cons: 'The quarterly goals are extremely aggressive, leading to some burnout in the PM team.',
      review: "The company is moving fast which is exciting, but sometimes it feels like quantity of features is valued over quality. If you thrive in high-speed, high-stress environments, you'll love it. I personally found the balance difficult after a year.",
      ceoApproval: null, outlook: null, helpful: 18,
    },
  ];

  const StarRow = ({ n, size = 12 }) => (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ fontSize: size, color: i <= n ? '#EAB308' : '#E2E8F0' }}>★</span>
      ))}
    </div>
  );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .tab { display: flex; align-items: center; gap: 8px; padding: 0 4px 16px; font-size: 14px; font-weight: 700; cursor: pointer; border: none; border-bottom: 2px solid transparent; background: none; color: #64748B; font-family: 'Inter', sans-serif; transition: all 0.15s; }
        .tab.active { color: #137FEC; border-bottom-color: #137FEC; }
        .review-card { background: #fff; border: 1px solid #E2E8F0; border-radius: 12px; padding: 32px; box-shadow: 0px 1px 2px rgba(0,0,0,0.05); }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 80px', height: '67px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '22px', color: '#137FEC' }}>🏢</span>
            <span style={{ fontWeight: '700', fontSize: '18px', color: '#0F172A' }}>WorkPulse</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', background: '#F1F5F9', borderRadius: '8px', height: '40px', width: '256px' }}>
            <span style={{ padding: '0 16px', color: '#64748B' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search companies..." style={{ border: 'none', outline: 'none', fontSize: '14px', fontFamily: "'Inter',sans-serif", background: 'transparent', color: '#0F172A', flex: 1 }} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {['Companies', 'Jobs', 'Salaries'].map(l => (
            <a key={l} href="#" style={{ fontSize: '14px', fontWeight: '500', color: '#334155', textDecoration: 'none' }}>{l}</a>
          ))}
          <div style={{ width: '42px', height: '42px', background: 'rgba(19,127,236,0.1)', border: '1px solid rgba(19,127,236,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '32px', height: '32px', background: '#E2E8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>👤</div>
          </div>
        </div>
      </nav>

      <div style={{ padding: '0 128px' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '32px 40px' }}>

          {/* Hero Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ width: '80px', height: '80px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}>🏢</div>
              <div>
                <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.9px', lineHeight: '40px', marginBottom: '4px' }}>TechFlow Solutions</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px' }}>⭐</span>
                  <span style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>4.2</span>
                  <span style={{ fontSize: '16px', color: '#64748B' }}>based on 1,250 employee reviews</span>
                </div>
              </div>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 24px', height: '44px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter',sans-serif", boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.2)' }}>
              ✏️ Write a Review
            </button>
          </div>

          {/* Tabs */}
          <div style={{ borderBottom: '1px solid #E2E8F0', marginBottom: '32px' }}>
            <div style={{ display: 'flex', gap: '32px' }}>
              {tabs.map(t => (
                <button key={t} className={`tab${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)}>
                  <span>{t === 'Overview' ? '👁️' : t === 'Reviews' ? '⭐' : t === 'Salaries' ? '💰' : '🎁'}</span>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '293px 1fr', gap: '24px', marginBottom: '48px' }}>
            {/* Overall Rating */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>Overall Rating</p>
              <div style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '60px', fontWeight: '900', color: '#0F172A', letterSpacing: '-3px', lineHeight: '60px' }}>4.2</span>
                <StarRow n={4} size={18} />
                <p style={{ fontSize: '14px', color: '#64748B' }}>1,250 Verified Reviews</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {subRatings.map(r => (
                  <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px', color: '#475569', minWidth: '90px' }}>{r.label}</span>
                    <div style={{ flex: 1, height: '8px', background: '#F1F5F9', borderRadius: '9999px', position: 'relative' }}>
                      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${r.pct}%`, background: '#137FEC', borderRadius: '9999px' }} />
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', width: '28px', textAlign: 'right' }}>{r.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rating Distribution */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <p style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>Rating Distribution</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {ratingBars.map(r => (
                  <div key={r.stars} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A', width: '16px' }}>{r.stars}</span>
                    <span style={{ fontSize: '12px' }}>⭐</span>
                    <div style={{ flex: 1, height: '12px', background: '#F1F5F9', borderRadius: '9999px', position: 'relative' }}>
                      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${r.pct}%`, background: '#137FEC', borderRadius: '9999px' }} />
                    </div>
                    <span style={{ fontSize: '12px', color: '#64748B', width: '35px', textAlign: 'right' }}>{r.pct}%</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: '#64748B' }}>Would recommend to a friend</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '20px', color: '#22C55E' }}>👍</span>
                  <span style={{ fontSize: '20px', fontWeight: '900', color: '#0F172A' }}>88%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A' }}>Latest Reviews</h2>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', fontWeight: '500', color: '#0F172A', cursor: 'pointer', fontFamily: "'Inter',sans-serif" }}>
              ☰ Most Recent
            </button>
          </div>

          {/* Review Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {reviews.map(r => (
              <div key={r.id} className="review-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>{r.title}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <StarRow n={r.rating} size={11} />
                      <span style={{ color: '#94A3B8' }}>•</span>
                      <span style={{ fontSize: '14px', color: '#64748B' }}>{r.type}</span>
                      <span style={{ color: '#94A3B8' }}>•</span>
                      <span style={{ fontSize: '14px', color: '#64748B' }}>{r.date}</span>
                    </div>
                  </div>
                  {r.verified && (
                    <span style={{ background: '#DCFCE7', color: '#15803D', fontSize: '12px', fontWeight: '700', padding: '4px 12px', borderRadius: '9999px', letterSpacing: '0.6px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>✓ Verified</span>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '282px 1fr', gap: '32px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>Pros</p>
                      <p style={{ fontSize: '14px', color: '#475569', lineHeight: '20px' }}>{r.pros}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>Cons</p>
                      <p style={{ fontSize: '14px', color: '#475569', lineHeight: '20px' }}>{r.cons}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <p style={{ fontSize: '16px', color: '#334155', lineHeight: '26px' }}>{r.review}</p>
                    {r.ceoApproval && (
                      <div style={{ display: 'flex', gap: '16px' }}>
                        <span style={{ fontSize: '12px', color: '#64748B' }}>📍 CEO Approval: <strong>{r.ceoApproval}</strong></span>
                        <span style={{ fontSize: '12px', color: '#64748B' }}>📈 Business Outlook: <strong>{r.outlook}</strong></span>
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button style={{ background: 'none', border: 'none', fontSize: '14px', color: '#64748B', cursor: 'pointer', fontFamily: "'Inter',sans-serif" }}>
                    👍 Helpful ({r.helpful})
                  </button>
                  <button style={{ background: 'none', border: 'none', fontSize: '14px', color: '#94A3B8', cursor: 'pointer', fontFamily: "'Inter',sans-serif" }}>Report review</button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '40px' }}>
            <button style={{ padding: '12px 32px', background: '#fff', border: '1px solid #137FEC', borderRadius: '12px', fontSize: '16px', fontWeight: '700', color: '#137FEC', cursor: 'pointer', fontFamily: "'Inter',sans-serif" }}>
              Load More Reviews
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: '#FFFFFF', borderTop: '1px solid #E2E8F0', padding: '48px 80px', marginTop: '80px' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '20px', color: '#94A3B8' }}>🏢</span>
            <span style={{ fontWeight: '700', fontSize: '16px', color: '#0F172A' }}>WorkPulse</span>
            <span style={{ fontSize: '14px', color: '#94A3B8' }}>© 2024. All rights reserved.</span>
          </div>
          <div style={{ display: 'flex', gap: '32px' }}>
            {['Privacy', 'Terms', 'Guidelines', 'Support'].map(l => (
              <a key={l} href="#" style={{ fontSize: '14px', fontWeight: '500', color: '#64748B', textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CompanyReviews;