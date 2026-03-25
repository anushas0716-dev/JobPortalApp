import { useState } from 'react';

const INIT_SAVED = [
  { id:1, icon:"🍎", bg:"#1a2a4a", company:"Apple",      title:"Senior Frontend Engineer",  location:"Bengaluru, IN", salary:"₹32–40 LPA", type:"Full-time · Remote",  deadline:"3 days",  match:96 },
  { id:2, icon:"🚀", bg:"#2a201a", company:"Zepto",      title:"Tech Lead – Node.js",        location:"Mumbai, IN",    salary:"₹30–42 LPA", type:"Full-time · Hybrid",  deadline:"6 days",  match:75 },
  { id:3, icon:"💳", bg:"#1a2a22", company:"CRED",       title:"Full Stack Engineer",        location:"Bengaluru, IN", salary:"₹25–35 LPA", type:"Full-time · Remote",  deadline:"12 days", match:72 },
  { id:4, icon:"🌊", bg:"#1a1e2a", company:"Freshworks", title:"Product Engineer",           location:"Chennai, IN",   salary:"₹22–32 LPA", type:"Full-time · Hybrid",  deadline:"15 days", match:68 },
];

export default function SavedJobs() {
  const [saved,   setSaved]   = useState(INIT_SAVED);
  const [applied, setApplied] = useState([]);

  const remove = (id) => setSaved(s => s.filter(j => j.id !== id));
  const apply  = (id) => setApplied(a => a.includes(id) ? a : [...a, id]);

  return (
    <div>
      <div style={{marginBottom:28}}>
        <h1 style={{fontSize:24,fontWeight:800,letterSpacing:'-0.5px'}}>🔖 Saved Jobs</h1>
        <p style={{color:'var(--muted)',fontSize:13,marginTop:4}}>{saved.length} saved · {saved.filter(j=>parseInt(j.deadline)<=5).length} expiring soon</p>
      </div>

      {saved.length === 0 && (
        <div style={{textAlign:'center',padding:'80px 20px',color:'var(--muted)',background:'var(--s1)',borderRadius:16,border:'1px solid var(--border)'}}>
          <div style={{fontSize:40,marginBottom:12}}>🔖</div>
          <div style={{fontSize:15,fontWeight:600,marginBottom:6}}>No saved jobs</div>
          <div style={{fontSize:13}}>Browse jobs and hit Save to bookmark them here.</div>
        </div>
      )}

      <div style={{display:'flex',flexDirection:'column',gap:14}}>
        {saved.map(job=>(
          <div key={job.id} style={{background:'var(--s1)',border:'1px solid var(--border)',borderRadius:14,padding:'20px 22px'}}>
            <div style={{display:'flex',alignItems:'center',gap:16}}>
              <div style={{width:48,height:48,borderRadius:12,background:job.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,flexShrink:0}}>{job.icon}</div>
              <div style={{flex:1}}>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <span style={{fontSize:15,fontWeight:700}}>{job.title}</span>
                  {parseInt(job.deadline) <= 5 && (
                    <span style={{background:'rgba(255,101,132,0.15)',color:'var(--a2)',fontSize:10,fontWeight:700,padding:'2px 8px',borderRadius:20}}>⚠ Expires in {job.deadline}</span>
                  )}
                </div>
                <div style={{color:'var(--muted)',fontSize:12,marginTop:3}}>{job.company} · {job.location}</div>
                <div style={{display:'flex',gap:8,marginTop:8}}>
                  <span style={{background:'var(--s3)',color:'var(--muted)',fontSize:10,padding:'3px 10px',borderRadius:20}}>{job.type}</span>
                  <span style={{background:'rgba(67,233,123,0.1)',color:'var(--a3)',fontSize:10,fontWeight:700,padding:'3px 10px',borderRadius:20}}>{job.match}% match</span>
                </div>
              </div>
              <div style={{textAlign:'right',flexShrink:0}}>
                <div style={{color:'var(--a3)',fontWeight:700,fontSize:15}}>{job.salary}</div>
                <div style={{color:'var(--muted)',fontSize:11,marginTop:2}}>Deadline in {job.deadline}</div>
                <div style={{display:'flex',gap:8,marginTop:12,justifyContent:'flex-end'}}>
                  <button onClick={()=>remove(job.id)} style={{padding:'6px 12px',borderRadius:8,fontSize:11,fontWeight:600,cursor:'pointer',border:'1px solid var(--border)',background:'transparent',color:'var(--muted)',fontFamily:'var(--font)'}}>Remove</button>
                  <button onClick={()=>apply(job.id)} style={{padding:'6px 14px',borderRadius:8,fontSize:11,fontWeight:600,cursor:'pointer',border:'none',background:applied.includes(job.id)?'rgba(67,233,123,0.15)':'var(--accent)',color:applied.includes(job.id)?'var(--a3)':'#fff',fontFamily:'var(--font)'}}>
                    {applied.includes(job.id)?'✅ Applied':'Apply Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
