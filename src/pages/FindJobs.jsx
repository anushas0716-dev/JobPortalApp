import { useState } from 'react';

const ALL_JOBS = [
  { id:1,  icon:"🍎", bg:"#1a2a4a", company:"Apple",      title:"Senior Frontend Engineer",  location:"Bengaluru, IN", salary:"₹32–40 LPA", type:"Full-time", mode:"Remote",  exp:"4–7 yrs",  industry:"Tech",     posted:"Today",      match:96 },
  { id:2,  icon:"G",  bg:"#2a1a1a", company:"Google",     title:"Software Engineer II",       location:"Hyderabad, IN", salary:"₹40–55 LPA", type:"Full-time", mode:"Hybrid",  exp:"3–6 yrs",  industry:"Tech",     posted:"Today",      match:91 },
  { id:3,  icon:"Ⓜ",  bg:"#1a1a2e", company:"Microsoft",  title:"Full Stack Developer",       location:"Pune, IN",      salary:"₹28–36 LPA", type:"Full-time", mode:"On-site", exp:"3–5 yrs",  industry:"Tech",     posted:"2 days ago", match:87 },
  { id:4,  icon:"⚡", bg:"#2a1a2a", company:"Razorpay",   title:"React Engineer",             location:"Bengaluru, IN", salary:"₹22–30 LPA", type:"Full-time", mode:"Remote",  exp:"2–4 yrs",  industry:"Fintech",  posted:"3 days ago", match:83 },
  { id:5,  icon:"🛒", bg:"#1a2a1a", company:"Flipkart",   title:"UI Engineer",                location:"Bengaluru, IN", salary:"₹20–28 LPA", type:"Full-time", mode:"Hybrid",  exp:"2–4 yrs",  industry:"E-comm",   posted:"Today",      match:79 },
  { id:6,  icon:"🚀", bg:"#2a201a", company:"Zepto",      title:"Tech Lead – Node.js",        location:"Mumbai, IN",    salary:"₹30–42 LPA", type:"Full-time", mode:"Hybrid",  exp:"5–8 yrs",  industry:"Startup",  posted:"1 day ago",  match:75 },
  { id:7,  icon:"💳", bg:"#1a2a22", company:"CRED",       title:"Full Stack Engineer",        location:"Bengaluru, IN", salary:"₹25–35 LPA", type:"Full-time", mode:"Remote",  exp:"3–6 yrs",  industry:"Fintech",  posted:"4 days ago", match:72 },
  { id:8,  icon:"🌊", bg:"#1a1e2a", company:"Freshworks", title:"Product Engineer",           location:"Chennai, IN",   salary:"₹22–32 LPA", type:"Full-time", mode:"Hybrid",  exp:"2–5 yrs",  industry:"SaaS",     posted:"5 days ago", match:68 },
  { id:9,  icon:"🧩", bg:"#1e1a2a", company:"Infosys",    title:"Platform Engineer",          location:"Bengaluru, IN", salary:"₹18–24 LPA", type:"Contract",  mode:"On-site", exp:"3–5 yrs",  industry:"IT",       posted:"1 week ago", match:64 },
  { id:10, icon:"🟢", bg:"#1a2a1a", company:"Swiggy",     title:"Backend Engineer",           location:"Bengaluru, IN", salary:"₹24–34 LPA", type:"Full-time", mode:"Hybrid",  exp:"2–4 yrs",  industry:"Startup",  posted:"2 days ago", match:71 },
];

const MODES = ["All","Remote","Hybrid","On-site"];
const TYPES = ["All","Full-time","Part-time","Contract"];

export default function FindJobs() {
  const [search,   setSearch]   = useState('');
  const [location, setLocation] = useState('');
  const [mode,     setMode]     = useState('All');
  const [type,     setType]     = useState('All');
  const [saved,    setSaved]    = useState([]);
  const [applied,  setApplied]  = useState([]);

  const filtered = ALL_JOBS.filter(j => {
    const q = search.toLowerCase();
    const matchQ = !q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q);
    const matchL = !location || j.location.toLowerCase().includes(location.toLowerCase());
    const matchM = mode === 'All' || j.mode === mode;
    const matchT = type === 'All' || j.type === type;
    return matchQ && matchL && matchM && matchT;
  });

  const toggleSave  = (id) => setSaved(s  => s.includes(id) ? s.filter(x=>x!==id) : [...s, id]);
  const applyJob    = (id) => setApplied(a => a.includes(id) ? a : [...a, id]);

  return (
    <div>
      <div style={{marginBottom:28}}>
        <h1 style={{fontFamily:'var(--font)',fontSize:24,fontWeight:800,letterSpacing:'-0.5px'}}>🔍 Find Jobs</h1>
        <p style={{color:'var(--muted)',fontSize:13,marginTop:4}}>{filtered.length} jobs match your profile</p>
      </div>

      {/* Search bar */}
      <div style={{display:'flex',gap:12,marginBottom:20,flexWrap:'wrap'}}>
        <input
          style={inputStyle}
          placeholder="Job title, company, or skills…"
          value={search}
          onChange={e=>setSearch(e.target.value)}
        />
        <input
          style={{...inputStyle,maxWidth:200}}
          placeholder="Location…"
          value={location}
          onChange={e=>setLocation(e.target.value)}
        />
        <button className="btn btn-primary" style={{padding:'10px 22px'}}>Search</button>
      </div>

      {/* Filters */}
      <div style={{display:'flex',gap:8,marginBottom:24,flexWrap:'wrap'}}>
        <span style={{fontSize:12,color:'var(--muted)',alignSelf:'center',marginRight:4}}>Work Mode:</span>
        {MODES.map(m=>(
          <button key={m} className={`tab${mode===m?' active':''}`} onClick={()=>setMode(m)}>{m}</button>
        ))}
        <span style={{fontSize:12,color:'var(--muted)',alignSelf:'center',marginLeft:12,marginRight:4}}>Type:</span>
        {TYPES.map(t=>(
          <button key={t} className={`tab${type===t?' active':''}`} onClick={()=>setType(t)}>{t}</button>
        ))}
      </div>

      {/* Job cards */}
      <div style={{display:'flex',flexDirection:'column',gap:14}}>
        {filtered.length === 0 && (
          <div style={{textAlign:'center',padding:'60px 20px',color:'var(--muted)'}}>
            No jobs found. Try different filters.
          </div>
        )}
        {filtered.map(job=>(
          <div key={job.id} style={jobCardStyle}>
            <div style={{display:'flex',alignItems:'flex-start',gap:16}}>
              <div style={{width:48,height:48,borderRadius:12,background:job.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,flexShrink:0}}>{job.icon}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap'}}>
                  <span style={{fontSize:15,fontWeight:700}}>{job.title}</span>
                  <span style={{background:'rgba(67,233,123,0.12)',color:'var(--a3)',fontSize:10,fontWeight:700,padding:'2px 8px',borderRadius:20}}>{job.match}% match</span>
                </div>
                <div style={{color:'var(--muted)',fontSize:12,marginTop:3}}>{job.company} · {job.location}</div>
                <div style={{display:'flex',gap:8,marginTop:10,flexWrap:'wrap'}}>
                  {[job.type, job.mode, job.exp, job.industry].map((tag,i)=>(
                    <span key={i} style={tagStyle}>{tag}</span>
                  ))}
                </div>
              </div>
              <div style={{textAlign:'right',flexShrink:0}}>
                <div style={{color:'var(--a3)',fontWeight:700,fontSize:14}}>{job.salary}</div>
                <div style={{color:'var(--muted)',fontSize:11,marginTop:2}}>Posted {job.posted}</div>
                <div style={{display:'flex',gap:8,marginTop:12,justifyContent:'flex-end'}}>
                  <button
                    onClick={()=>toggleSave(job.id)}
                    style={{...btnSmall, background: saved.includes(job.id)?'rgba(108,99,255,0.2)':'var(--s3)', color: saved.includes(job.id)?'var(--accent)':'var(--muted)'}}>
                    {saved.includes(job.id)?'🔖 Saved':'🔖 Save'}
                  </button>
                  <button
                    onClick={()=>applyJob(job.id)}
                    style={{...btnSmall, background: applied.includes(job.id)?'rgba(67,233,123,0.15)':'var(--accent)', color: applied.includes(job.id)?'var(--a3)':'#fff', boxShadow: applied.includes(job.id)?'none':'0 4px 12px rgba(108,99,255,0.3)'}}>
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

const inputStyle = {
  flex:1, minWidth:200, padding:'10px 16px',
  background:'var(--s2)', border:'1px solid var(--border)',
  borderRadius:10, color:'var(--text)', fontSize:13,
  fontFamily:'var(--font)', outline:'none',
};
const jobCardStyle = {
  background:'var(--s1)', border:'1px solid var(--border)',
  borderRadius:14, padding:'20px 22px', transition:'border-color .2s, transform .2s', cursor:'default',
};
const tagStyle = {
  background:'var(--s3)', color:'var(--muted)', fontSize:10,
  padding:'3px 10px', borderRadius:20, fontWeight:500,
};
const btnSmall = {
  padding:'6px 14px', borderRadius:8, fontSize:11,
  fontWeight:600, cursor:'pointer', border:'none', fontFamily:'var(--font)', transition:'all .18s',
};
