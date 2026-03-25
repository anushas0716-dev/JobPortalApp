const INTERVIEWS = [
  { id:1, company:'Apple',    icon:'🍎', bg:'#1a2a4a', role:'Senior Frontend Engineer', date:'Tomorrow',    time:'11:00 AM', mode:'Online',  link:'meet.google.com/xyz-abc',  status:'upcoming',  interviewer:'Sarah Wilson, James Kim' },
  { id:2, company:'Google',   icon:'G',  bg:'#2a1a1a', role:'Software Engineer II',     date:'28 Mar 2026', time:'2:30 PM',  mode:'Online',  link:'zoom.us/j/12345678',        status:'upcoming',  interviewer:'Raj Patel' },
  { id:3, company:'Razorpay', icon:'⚡', bg:'#2a1a2a', role:'React Developer',           date:'15 Mar 2026', time:'10:00 AM', mode:'On-site', link:'Bengaluru HQ, 4th Floor',   status:'completed', interviewer:'Priya Mehta', result:'Shortlisted ✅' },
  { id:4, company:'Swiggy',   icon:'🟢', bg:'#1a2a1a', role:'Backend Engineer',          date:'10 Mar 2026', time:'3:00 PM',  mode:'Online',  link:'teams.microsoft.com/xyz',   status:'completed', interviewer:'Amit Verma', result:'Rejected ❌' },
];

const PREP = [
  { q:"Tell me about yourself.",             a:'Highlight your 4+ years in full stack dev, key projects, and why this role excites you.' },
  { q:"What's your biggest strength?", a:'Problem-solving with complex data pipelines — give a specific example with measurable outcome.' },
  { q:"Explain the Virtual DOM in React.",   a:'A lightweight copy of the real DOM. React diffs it to minimize expensive real DOM updates.' },
  { q:"REST vs GraphQL?",                    a:'REST uses multiple endpoints; GraphQL uses one with flexible queries. Discuss trade-offs.' },
];

export default function Interviews() {
  const upcoming  = INTERVIEWS.filter(i=>i.status==='upcoming');
  const completed = INTERVIEWS.filter(i=>i.status==='completed');

  return (
    <div>
      <div style={{marginBottom:28}}>
        <h1 style={{fontSize:24,fontWeight:800,letterSpacing:'-0.5px'}}>📅 Interviews</h1>
        <p style={{color:'var(--muted)',fontSize:13,marginTop:4}}>{upcoming.length} upcoming interviews</p>
      </div>

      {/* Upcoming */}
      <div style={{fontWeight:700,fontSize:14,marginBottom:14,color:'var(--text)'}}>🔜 Upcoming</div>
      <div style={{display:'flex',flexDirection:'column',gap:14,marginBottom:28}}>
        {upcoming.map(iv=>(
          <div key={iv.id} style={{background:'var(--s1)',border:'1px solid rgba(108,99,255,0.3)',borderRadius:14,padding:'20px 22px',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',top:0,left:0,right:0,height:3,background:'linear-gradient(90deg,var(--accent),var(--a2))'}}/>
            <div style={{display:'flex',alignItems:'flex-start',gap:16}}>
              <div style={{width:50,height:50,borderRadius:12,background:iv.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,flexShrink:0}}>{iv.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:15,fontWeight:700}}>{iv.role}</div>
                <div style={{color:'var(--accent)',fontSize:12,marginTop:2}}>{iv.company}</div>
                <div style={{display:'flex',gap:16,marginTop:10,flexWrap:'wrap'}}>
                  <span style={meta}>📅 {iv.date}</span>
                  <span style={meta}>🕐 {iv.time}</span>
                  <span style={meta}>{iv.mode==='Online'?'🖥️':'🏢'} {iv.mode}</span>
                  <span style={meta}>👤 {iv.interviewer}</span>
                </div>
              </div>
              <div style={{textAlign:'right',flexShrink:0}}>
                <div style={{fontSize:11,color:'var(--muted)',marginBottom:10}}>{iv.link}</div>
                {iv.mode==='Online' && (
                  <a href={`https://${iv.link}`} target="_blank" rel="noreferrer">
                    <button className="btn btn-primary" style={{fontSize:11,padding:'7px 16px'}}>🔗 Join Meeting</button>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Completed */}
      <div style={{fontWeight:700,fontSize:14,marginBottom:14}}>✅ Past Interviews</div>
      <div style={{display:'flex',flexDirection:'column',gap:12,marginBottom:28}}>
        {completed.map(iv=>(
          <div key={iv.id} style={{background:'var(--s1)',border:'1px solid var(--border)',borderRadius:14,padding:'16px 20px',display:'flex',alignItems:'center',gap:16,opacity:.8}}>
            <div style={{width:42,height:42,borderRadius:10,background:iv.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>{iv.icon}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:600}}>{iv.role} · {iv.company}</div>
              <div style={{color:'var(--muted)',fontSize:11,marginTop:2}}>{iv.date} · {iv.time} · {iv.mode}</div>
            </div>
            <span style={{fontSize:12,fontWeight:700}}>{iv.result}</span>
          </div>
        ))}
      </div>

      {/* Prep tips */}
      <div style={{background:'var(--s1)',border:'1px solid var(--border)',borderRadius:14,padding:20}}>
        <div style={{fontWeight:700,fontSize:14,marginBottom:16}}>🧠 Interview Prep Tips</div>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {PREP.map((p,i)=>(
            <div key={i} style={{background:'var(--s2)',borderRadius:10,padding:'12px 16px'}}>
              <div style={{fontWeight:600,fontSize:12,marginBottom:5}}>Q: {p.q}</div>
              <div style={{color:'var(--muted)',fontSize:11}}>💡 {p.a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const meta = {fontSize:12,color:'var(--muted)',display:'flex',alignItems:'center',gap:4};
