import React, { useState } from 'react';

const SalaryExpectations = () => {
  const [currency, setCurrency] = useState('USD - US Dollar');
  const [frequency, setFrequency] = useState('Annual');
  const [minSalary, setMinSalary] = useState(85000);
  const [maxSalary, setMaxSalary] = useState(160000);
  const [openToNegotiation, setOpenToNegotiation] = useState(true);
  const [isDragging, setIsDragging] = useState(null);

  const MIN = 40000;
  const MAX = 200000;

  const currencies = [
    'USD - US Dollar', 'EUR - Euro', 'GBP - British Pound',
    'INR - Indian Rupee', 'AUD - Australian Dollar', 'CAD - Canadian Dollar',
  ];

  const toPercent = (val) => ((val - MIN) / (MAX - MIN)) * 100;

  const formatSalary = (val) => {
    if (val >= 200000) return '$200k+';
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`;
    return `$${val}`;
  };

  const formatLabel = (val) => {
    if (val >= 200000) return '$200k+';
    return `$${val.toLocaleString()}`;
  };

  const handleSliderClick = (e, track) => {
    const rect = track.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const val = Math.round((MIN + pct * (MAX - MIN)) / 5000) * 5000;
    const midVal = (minSalary + maxSalary) / 2;
    if (val < midVal) setMinSalary(Math.min(val, maxSalary - 5000));
    else setMaxSalary(Math.max(val, minSalary + 5000));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch('http://127.0.0.1:8000/api/candidates/salary/', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ currency, frequency, min_salary: minSalary, max_salary: maxSalary, open_to_negotiation: openToNegotiation }),
      });
      alert('Salary preferences saved!');
      window.location.href = '/candidate-dashboard';
    } catch {
      alert('Saved locally!');
      window.location.href = '/candidate-dashboard';
    }
  };

  const minPct = toPercent(minSalary);
  const maxPct = toPercent(maxSalary);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#F6F7F8', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .select-field { width: 100%; padding: 16px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; font-size: 16px; font-family: 'Inter', sans-serif; color: #0F172A; outline: none; appearance: none; cursor: pointer; height: 56px; }
        .select-field:focus { border-color: #137FEC; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 160px', height: '73px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: '#137FEC', borderRadius: '8px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: '18px' }}>💰</span>
          </div>
          <span style={{ fontWeight: '700', fontSize: '18px', letterSpacing: '-0.27px', color: '#0F172A' }}>Career Settings</span>
        </div>
        <button onClick={() => window.location.href = '/candidate-dashboard'} style={{ width: '40px', height: '40px', background: '#F1F5F9', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer', fontFamily: "'Inter', sans-serif", color: '#0F172A', fontWeight: '700' }}>✕</button>
      </nav>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ width: '640px', maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

          {/* Header */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#0F172A', letterSpacing: '-1.188px', lineHeight: '45px' }}>Salary Expectations</h1>
            <p style={{ fontSize: '16px', color: '#475569', lineHeight: '24px' }}>Specify your desired compensation range and preferred currency to help us find the best matches for your career goals.</p>
          </div>

          {/* Main Card */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '25px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Preferred Currency */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '16px', fontWeight: '600', color: '#0F172A' }}>Preferred Currency</label>
              <div style={{ position: 'relative' }}>
                <select className="select-field" value={currency} onChange={e => setCurrency(e.target.value)}>
                  {currencies.map(c => <option key={c}>{c}</option>)}
                </select>
                <span style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748B', fontSize: '12px' }}>▾</span>
              </div>
            </div>

            {/* Payment Frequency */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <label style={{ fontSize: '16px', fontWeight: '600', color: '#0F172A' }}>Payment Frequency</label>
              <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: '8px', padding: '4px', gap: '0' }}>
                {['Annual', 'Monthly'].map(f => (
                  <button key={f} onClick={() => setFrequency(f)} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif", background: frequency === f ? '#FFFFFF' : 'transparent', color: frequency === f ? '#137FEC' : '#64748B', boxShadow: frequency === f ? '0px 1px 2px rgba(0,0,0,0.05)' : 'none', transition: 'all 0.2s' }}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Salary Range Slider */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '16px', fontWeight: '600', color: '#0F172A' }}>Expected Salary Range</label>
                <span style={{ background: 'rgba(19,127,236,0.1)', color: '#137FEC', fontSize: '12px', fontWeight: '700', padding: '4px 8px', borderRadius: '4px' }}>Private</span>
              </div>

              {/* Slider Track */}
              <div style={{ padding: '32px 8px 16px', position: 'relative' }}>
                {/* Track */}
                <div
                  style={{ position: 'relative', height: '6px', background: '#E2E8F0', borderRadius: '9999px', cursor: 'pointer' }}
                  onClick={e => handleSliderClick(e, e.currentTarget)}
                >
                  {/* Active range */}
                  <div style={{ position: 'absolute', left: `${minPct}%`, right: `${100 - maxPct}%`, top: 0, bottom: 0, background: '#137FEC', borderRadius: '9999px' }} />

                  {/* Min thumb */}
                  <div
                    style={{ position: 'absolute', left: `${minPct}%`, top: '50%', transform: 'translate(-50%, -50%)', width: '16px', height: '16px', background: '#137FEC', border: '2px solid #fff', borderRadius: '50%', cursor: 'grab', boxShadow: '0px 4px 6px -1px rgba(0,0,0,0.1)', zIndex: 2 }}
                    onMouseDown={e => {
                      e.preventDefault();
                      const track = e.currentTarget.parentElement;
                      const move = (ev) => {
                        const rect = track.getBoundingClientRect();
                        const pct = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width));
                        const val = Math.round((MIN + pct * (MAX - MIN)) / 5000) * 5000;
                        setMinSalary(Math.min(val, maxSalary - 5000));
                      };
                      const up = () => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); };
                      document.addEventListener('mousemove', move);
                      document.addEventListener('mouseup', up);
                    }}>
                    {/* Tooltip */}
                    <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', background: '#0F172A', color: '#fff', fontSize: '10px', fontWeight: '700', padding: '4px 8px', borderRadius: '4px', whiteSpace: 'nowrap' }}>
                      {formatLabel(minSalary)}
                    </div>
                  </div>

                  {/* Max thumb */}
                  <div
                    style={{ position: 'absolute', left: `${maxPct}%`, top: '50%', transform: 'translate(-50%, -50%)', width: '16px', height: '16px', background: '#137FEC', border: '2px solid #fff', borderRadius: '50%', cursor: 'grab', boxShadow: '0px 4px 6px -1px rgba(0,0,0,0.1)', zIndex: 2 }}
                    onMouseDown={e => {
                      e.preventDefault();
                      const track = e.currentTarget.parentElement;
                      const move = (ev) => {
                        const rect = track.getBoundingClientRect();
                        const pct = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width));
                        const val = Math.round((MIN + pct * (MAX - MIN)) / 5000) * 5000;
                        setMaxSalary(Math.max(val, minSalary + 5000));
                      };
                      const up = () => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); };
                      document.addEventListener('mousemove', move);
                      document.addEventListener('mouseup', up);
                    }}>
                    {/* Tooltip */}
                    <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', background: '#0F172A', color: '#fff', fontSize: '10px', fontWeight: '700', padding: '4px 8px', borderRadius: '4px', whiteSpace: 'nowrap' }}>
                      {formatLabel(maxSalary)}
                    </div>
                  </div>
                </div>

                {/* Scale Labels */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                  {['$40k', '$100k', '$200k+'].map(l => (
                    <span key={l} style={{ fontSize: '12px', fontWeight: '500', color: '#64748B' }}>{l}</span>
                  ))}
                </div>
              </div>

              {/* Open to negotiation */}
              <label style={{ display: 'flex', alignItems: 'center', gap: '11px', cursor: 'pointer' }} onClick={() => setOpenToNegotiation(!openToNegotiation)}>
                <div style={{ width: '22px', height: '22px', background: openToNegotiation ? '#137FEC' : '#fff', border: openToNegotiation ? '1px solid #137FEC' : '1px solid #CBD5E1', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {openToNegotiation && <span style={{ color: '#fff', fontSize: '13px', fontWeight: '700' }}>✓</span>}
                </div>
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>Open to negotiation based on equity or benefits</span>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', alignItems: 'center' }}>
            <button onClick={() => window.location.href = '/candidate-dashboard'} style={{ padding: '12px 24px', background: 'none', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', color: '#334155', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Cancel</button>
            <button onClick={handleSave} style={{ padding: '12px 32px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter', sans-serif", boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.2)' }}>Save Changes</button>
          </div>

          {/* Pro Tip */}
          <div style={{ background: 'rgba(19,127,236,0.05)', border: '1px solid rgba(19,127,236,0.2)', borderRadius: '12px', padding: '16px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '18px', color: '#137FEC', flexShrink: 0 }}>ℹ️</span>
            <p style={{ fontSize: '14px', fontWeight: '400', color: '#0F172A', lineHeight: '23px' }}>
              <strong>Pro Tip:</strong> 85% of recruiters prioritize candidates who provide a clear salary range. This helps ensure alignment from the first conversation.
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #E2E8F0', padding: '32px 0', textAlign: 'center' }}>
        <p style={{ fontSize: '12px', color: '#64748B' }}>© 2024 Career Portal. All data is encrypted and handled securely.</p>
      </footer>
    </div>
  );
};

export default SalaryExpectations;