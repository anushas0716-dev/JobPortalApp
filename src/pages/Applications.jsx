import { useState } from 'react';

const ALL_APPS = [
  { id:1, icon:'🍎', bg:'#1a2a4a', company:'Apple',     title:'Senior Frontend Engineer',  applied:'20 Mar 2026', status:'interview',    stage:'Technical Interview', salary:'₹32–40 LPA' },
  { id:2, icon:'G',  bg:'#2a1a1a', company:'Google',    title:'Software Engineer II',       applied:'18 Mar 2026', status:'shortlisted',  stage:'HR Screening',        salary:'₹40–55 LPA' },
  { id:3, icon:'⚡', bg:'#2a1a2a', company:'Razorpay',  title:'React Developer',            applied:'15 Mar 2026', status:'review',       stage:'Under Review',        salary:'₹22–30 LPA' },
  { id:4, icon:'🟢', bg:'#1a2a1a', company:'Swiggy',    title:'Backend Engineer',           applied:'12 Mar 2026', status:'applied',      stage:'Application Sent',    salary:'₹24–34 LPA' },
  { id:5, icon:'🛒', bg:'#1a2a1a', company:'Flipkart',  title:'UI Engineer',                applied:'08 Mar 2026', status:'rejected',     stage:'—',                   salary:'₹20–28 LPA' },
  { id:6, icon:'🌊', bg:'#1a1e2a', company:'Freshworks',title:'Product Engineer',           applied:'05 Mar 2026', status:'applied',      stage:'Application Sent',    salary:'₹22–32 LPA' },
];

const STATUS_MAP = {
  applied:     { label:'Applied',      color:'var(--accent)', bg:'rgba(108,99,255,0.15)' },
  review:      { label:'Under Review', color:'var(--a4)',     bg:'rgba(247,151,30,0.15)' },
  shortlisted: { label:'Shortlisted',  color:'var(--a3)',     bg:'rgba(67,233,123,0.15)' },
  interview:   { label:'Interview',    color:'var(--a2)',     bg:'rgba(255,101,132,0.2)'  },
  offered:     { label:'Offered',      color:'var(--a3)',     bg:'rgba(67,233,123,0.2)'   },
  rejected:    { label:'Rejected',     color:'var(--muted)',  bg:'rgba(255,255,255,0.07)' },
};

const STAGES = ['Applied','Under Review','Shortlisted','Interview','Offered'];

export default function Applications() {
  const [filter, setFilter] = useState('All');

  const filters = ['All','interview','shortlisted','review','applied','rejected'];
  const filtered = filter==='All' ? ALL_APPS : ALL_APPS.filter(a=>a.status===filter);

  return (
    <div>
      <div style={{marginBottom:24}}>
        <h1 style={{fontSize:24,fontWeight:800,letterSpacing:'-0.5px'}}>📋 My Applications</h1>
        <p style={{color:'var(--muted)',fontSize:13,marginTop:4}}>{ALL_APPS.length} total applications</p>
      </div>

      {/* Pipeline summary */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:10,marginBottom:28}}>
        {STAGES.map((stage,i)=>{
          const statKey = stage.toLowerCase().replace(' ','');
          const count = ALL_APPS.filter(a=>a.status===statKey||
            (statKey==='underreview'&&a.status==='review')).length;
          return (
            <div key={i} style={{background:'var(--s1)',border:'1px solid var(--border)',borderRadius:12,padding:'14px 16px',textAlign:'center'}}>
              <div style={{fontSize:20,fontWeight:800,color:Object.values(STATUS_MAP)[i]?.color||'var(--text)'}}>{count}</div>
              <div style={{fontSize:11,color:'var(--muted)',marginTop:4}}>{stage}</div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="tabs" style={{marginBottom:20}}>
        {filters.map(f=>(
          <div key={f} className={`tab${filter===f?' active':''}`} onClick={()=>setFilter(f)} style={{textTransform:'capitalize'}}>
            {f==='All'?'All':STATUS_MAP[f]?.label||f}
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{background:'var(--s1)',border:'1px solid var(--border)',borderRadius:14,overflow:'hidden'}}>
        <div style={{display:'grid',gridTemplateColumns:'2fr 1.2fr 1fr 1fr 0.8fr',padding:'12px 20px',borderBottom:'1px solid var(--border)',fontSize:11,fontWeight:600,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.8px'}}>
          <span>Job</span><span>Stage</span><span>Applied</span><span>Salary</span><span>Status</span>
        </div>
        {filtered.map(app=>{
          const s = STATUS_MAP[app.status];
          return (
            <div key={app.id} style={{display:'grid',gridTemplateColumns:'2fr 1.2fr 1fr 1fr 0.8fr',padding:'14px 20px',borderBottom:'1px solid var(--border)',alignItems:'center',transition:'background .15s',cursor:'default'}}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.02)'}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <div style={{width:36,height:36,borderRadius:9,background:app.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,flexShrink:0}}>{app.icon}</div>
                <div>
                  <div style={{fontSize:13,fontWeight:600}}>{app.title}</div>
                  <div style={{fontSize:11,color:'var(--muted)'}}>{app.company}</div>
                </div>
              </div>
              <div style={{fontSize:12,color:'var(--muted)'}}>{app.stage}</div>
              <div style={{fontSize:12,color:'var(--muted)'}}>{app.applied}</div>
              <div style={{fontSize:12,color:'var(--a3)',fontWeight:600}}>{app.salary}</div>
              <span style={{padding:'3px 10px',borderRadius:20,fontSize:10,fontWeight:700,background:s.bg,color:s.color,display:'inline-block',width:'fit-content'}}>{s.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
