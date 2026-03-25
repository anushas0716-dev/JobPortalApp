import React, { useState } from 'react';

const InterviewScheduling = () => {
  const [currentMonth, setCurrentMonth] = useState({ year: 2023, month: 9 }); // Oct 2023
  const [selectedDay, setSelectedDay] = useState(5);
  const [selectedTime, setSelectedTime] = useState(null);
  const [timezone, setTimezone] = useState('America/New_York (GMT-4)');

  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const dayNames = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDay = (year, month) => new Date(year, month, 1).getDay();

  const { year, month } = currentMonth;
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDay(year, month);
  const prevMonthDays = getDaysInMonth(year, month - 1);

  const timezones = [
    'America/New_York (GMT-4)',
    'America/Chicago (GMT-5)',
    'America/Los_Angeles (GMT-7)',
    'Europe/London (GMT+1)',
    'Europe/Paris (GMT+2)',
    'Asia/Tokyo (GMT+9)',
  ];

  const availableTimes = ['9:00 AM', '10:00 AM', '11:00 AM', '1:30 PM', '2:30 PM', '4:00 PM', '4:30 PM'];

  const getDayLabel = (day) => {
    const date = new Date(year, month, day);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  };

  const prevMonth = () => {
    setCurrentMonth(prev => {
      if (prev.month === 0) return { year: prev.year - 1, month: 11 };
      return { year: prev.year, month: prev.month - 1 };
    });
    setSelectedDay(null);
  };

  const nextMonth = () => {
    setCurrentMonth(prev => {
      if (prev.month === 11) return { year: prev.year + 1, month: 0 };
      return { year: prev.year, month: prev.month + 1 };
    });
    setSelectedDay(null);
  };

  // Build calendar grid cells
  const cells = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push({ day: prevMonthDays - firstDay + 1 + i, current: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, current: true });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ day: cells.length - firstDay - daysInMonth + 1, current: false });
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        .nav-link { font-size: 14px; font-weight: 500; color: #475569; text-decoration: none; }
        .nav-link:hover { color: #137FEC; }
        .cal-day { display: flex; align-items: center; justify-content: center; height: 40px; width: 100%; border-radius: 8px; font-size: 16px; cursor: pointer; border: none; background: none; font-family: 'Inter', sans-serif; transition: background 0.15s; }
        .cal-day:hover { background: rgba(19,127,236,0.07); }
        .cal-day.selected { background: #137FEC; color: #fff; font-weight: 700; box-shadow: 0px 4px 6px -1px rgba(19,127,236,0.3); }
        .cal-day.today-highlight { background: rgba(19,127,236,0.05); color: #137FEC; }
        .cal-day.inactive { color: #CBD5E1; cursor: default; }
        .cal-day.inactive:hover { background: none; }
        .time-btn { width: 100%; padding: 12px 0; border: 2px solid rgba(19,127,236,0.4); border-radius: 8px; background: #fff; font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 700; color: #137FEC; cursor: pointer; transition: all 0.15s; }
        .time-btn:hover { background: rgba(19,127,236,0.05); border-color: #137FEC; }
        .time-btn.selected { background: #137FEC; color: #fff; border-color: #137FEC; box-shadow: 0px 4px 6px -1px rgba(19,127,236,0.3); }
        .btn-next { width: 100%; padding: 12px 0; background: #137FEC; border: none; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 700; color: #fff; cursor: pointer; box-shadow: 0px 10px 15px -3px rgba(19,127,236,0.2), 0px 4px 6px -4px rgba(19,127,236,0.2); transition: background 0.2s; }
        .btn-next:hover { background: #0e6fd4; }
        .btn-next:disabled { background: #94A3B8; cursor: not-allowed; box-shadow: none; }
        select { appearance: none; width: 100%; padding: 10px 40px 10px 40px; background: #fff; border: 1px solid #E2E8F0; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 14px; color: #0F172A; cursor: pointer; outline: none; }
        select:focus { border-color: #137FEC; }
      `}</style>

      {/* HEADER */}
      <header style={{
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
        padding: '16px 160px', height: 73,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: 32, height: 32, background: 'rgba(19,127,236,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px' }}>📅</div>
          <span style={{ fontWeight: 700, fontSize: '18px', letterSpacing: '-0.45px', color: '#0F172A' }}>HireFlow</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', gap: '36px' }}>
            {['Dashboard', 'Meetings', 'Settings'].map(l => (
              <a key={l} href="#" className="nav-link">{l}</a>
            ))}
          </div>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'linear-gradient(135deg, #7c9abf, #5a7fa8)',
            border: '2px solid rgba(19,127,236,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px', cursor: 'pointer',
          }}>👨</div>
        </div>
      </header>

      {/* MAIN */}
      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '32px 160px' }}>
        <div style={{ width: '960px', maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: '32px' }}>

          {/* PAGE HEADER */}
          <div>
            <h1 style={{ fontSize: '36px', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.9px', lineHeight: '45px', marginBottom: '8px' }}>
              Schedule Your Interview
            </h1>
            <p style={{ fontSize: '18px', color: '#64748B', lineHeight: '27px' }}>
              Choose a slot for your technical assessment with the engineering team.
            </p>
          </div>

          {/* TWO-COLUMN LAYOUT */}
          <div style={{ position: 'relative', height: '545px' }}>

            {/* LEFT: Meeting Info + Timezone */}
            <div style={{
              position: 'absolute', left: 0, top: 0,
              width: '298px',
              display: 'flex', flexDirection: 'column', gap: '24px',
            }}>
              {/* Meeting Info Card */}
              <div style={{
                background: '#FFFFFF', border: '1px solid #E2E8F0',
                boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px',
                padding: '24px',
              }}>
                {/* Image */}
                <div style={{
                  height: '160px', borderRadius: '8px', marginBottom: '8px',
                  background: 'linear-gradient(135deg, #2d6a6a 0%, #3d8a7a 40%, #5aad99 100%)',
                  overflow: 'hidden', position: 'relative',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{ fontSize: '48px', opacity: 0.6 }}>🖥️</div>
                  <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', display: 'flex', gap: '6px' }}>
                    {[1,2,3,4].map(i => (
                      <div key={i} style={{ flex: 1, height: '32px', background: 'rgba(255,255,255,0.3)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>👤</div>
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 700, color: '#137FEC', letterSpacing: '0.6px', textTransform: 'uppercase' }}>Interview Type</p>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', lineHeight: '28px' }}>Senior Software Engineer</h3>
                  <div style={{ paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '13px', color: '#64748B' }}>🕐</span>
                      <span style={{ fontSize: '14px', color: '#64748B' }}>60 minutes</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '13px', color: '#64748B' }}>📹</span>
                      <span style={{ fontSize: '14px', color: '#64748B' }}>Google Meet / Video Call</span>
                    </div>
                  </div>
                  <div style={{ height: 1, background: '#F1F5F9', margin: '8px 0' }} />
                  <p style={{ fontSize: '14px', color: '#475569', lineHeight: '20px' }}>
                    Preparation: Please have your IDE ready and ensure a stable internet connection.
                  </p>
                </div>
              </div>

              {/* Timezone Selector */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>Your Timezone</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px', color: '#94A3B8', zIndex: 1, pointerEvents: 'none' }}>🌐</span>
                  <select value={timezone} onChange={e => setTimezone(e.target.value)}>
                    {timezones.map(tz => <option key={tz}>{tz}</option>)}
                  </select>
                  <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '10px', color: '#94A3B8', pointerEvents: 'none' }}>▼</span>
                </div>
              </div>
            </div>

            {/* RIGHT: Calendar + Time Selection */}
            <div style={{
              position: 'absolute', left: '330px', right: 0, top: 0, bottom: 0,
              background: '#FFFFFF', border: '1px solid #E2E8F0',
              boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px',
              padding: '24px', display: 'flex', gap: '24px',
            }}>
              {/* Calendar */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Month nav */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>
                    {monthNames[month]} {year}
                  </h3>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button onClick={prevMonth} style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0F172A' }}>‹</button>
                    <button onClick={nextMonth} style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0F172A' }}>›</button>
                  </div>
                </div>

                {/* Day headers */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
                  {dayNames.map(d => (
                    <div key={d} style={{ textAlign: 'center', fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', padding: '8px 0' }}>{d}</div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', flex: 1 }}>
                  {cells.map((cell, idx) => {
                    const isSelected = cell.current && cell.day === selectedDay;
                    const isHighlight = cell.current && cell.day === 2 && month === 9; // Oct 2 highlight from design
                    return (
                      <button
                        key={idx}
                        className={`cal-day${isSelected ? ' selected' : ''}${!cell.current ? ' inactive' : ''}${isHighlight && !isSelected ? ' today-highlight' : ''}`}
                        onClick={() => cell.current && setSelectedDay(cell.day)}
                        style={{ fontWeight: isSelected ? 700 : 500 }}
                      >{cell.day}</button>
                    );
                  })}
                </div>
              </div>

              {/* Divider */}
              <div style={{ width: 1, background: '#F1F5F9', flexShrink: 0 }} />

              {/* Time Selection */}
              <div style={{ width: '199px', display: 'flex', flexDirection: 'column', gap: '16px', flexShrink: 0 }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>
                  {selectedDay ? getDayLabel(selectedDay) : 'Select a date'}
                </h3>

                {selectedDay && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '360px', overflowY: 'auto' }}>
                    {availableTimes.map(time => (
                      <button
                        key={time}
                        className={`time-btn${selectedTime === time ? ' selected' : ''}`}
                        onClick={() => setSelectedTime(time)}
                      >{time}</button>
                    ))}
                  </div>
                )}

                <div style={{ flex: 1 }} />

                <button
                  className="btn-next"
                  disabled={!selectedDay || !selectedTime}
                  style={{ marginTop: 'auto' }}
                >Next</button>
              </div>
            </div>
          </div>

          {/* FOOTER HELP */}
          <div style={{ borderTop: '1px solid #E2E8F0', padding: '40px 0', display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '16px', color: '#64748B' }}>❓</span>
              <span style={{ fontSize: '14px', color: '#64748B' }}>Trouble finding a time?</span>
              <a href="#" style={{ fontSize: '14px', fontWeight: 700, color: '#137FEC' }}>Contact Recruiting</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewScheduling;