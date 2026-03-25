import { useState } from 'react';

const INIT = {
  name: 'Arjun Sharma', title: 'Full Stack Developer', email: 'arjun.sharma@email.com',
  phone: '+91 98765 43210', location: 'Bengaluru, IN', bio: 'Passionate full stack developer with 4+ years of experience building scalable web applications.',
  skills: ['React','Node.js','TypeScript','MongoDB','AWS','Docker','GraphQL','PostgreSQL'],
  experience: [
    { id:1, role:'Senior Frontend Developer', company:'TechCorp', period:'Jan 2022 – Present', desc:'Led frontend architecture for 3 products.' },
    { id:2, role:'Full Stack Developer',       company:'StartupXYZ', period:'Jun 2020 – Dec 2021', desc:'Built RESTful APIs and React dashboards.' },
  ],
  education: [
    { id:1, degree:'B.Tech – Computer Science', school:'VTU, Bengaluru', year:'2020' },
  ],
  expectedSalary: '₹30–40 LPA', preferredRole: 'Full Stack Developer', visibility: 'Public',
};

export default function MyProfile() {
  const [profile,    setProfile]    = useState(INIT);
  const [editBasic,  setEditBasic]  = useState(false);
  const [newSkill,   setNewSkill]   = useState('');
  const [saved,      setSaved]      = useState(false);

  const update = (field, value) => setProfile(p => ({ ...p, [field]: value }));
  const addSkill = () => { if (newSkill.trim()) { update('skills', [...profile.skills, newSkill.trim()]); setNewSkill(''); } };
  const removeSkill = (s) => update('skills', profile.skills.filter(x => x !== s));

  const handleSave = () => { setEditBasic(false); setSaved(true); setTimeout(()=>setSaved(false),2500); };

  const completion = (() => {
    let pts = 0;
    if (profile.name)         pts += 20;
    if (profile.bio)          pts += 15;
    if (profile.skills.length>=3) pts += 20;
    if (profile.experience.length>=1) pts += 25;
    if (profile.education.length>=1)  pts += 20;
    return pts;
  })();

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:28}}>
        <div>
          <h1 style={{fontSize:24,fontWeight:800,letterSpacing:'-0.5px'}}>👤 My Profile</h1>
          <p style={{color:'var(--muted)',fontSize:13,marginTop:4}}>Manage your public profile and job preferences</p>
        </div>
        {saved && <span style={{background:'rgba(67,233,123,0.15)',color:'var(--a3)',padding:'8px 16px',borderRadius:10,fontSize:12,fontWeight:600}}>✅ Profile saved!</span>}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1.6fr',gap:20}}>

        {/* Left column */}
        <div style={{display:'flex',flexDirection:'column',gap:18}}>

          {/* Avatar + completion */}
          <div style={card}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',paddingBottom:20,borderBottom:'1px solid var(--border)',marginBottom:20}}>
              <div style={{width:80,height:80,borderRadius:'50%',background:'linear-gradient(135deg,#6c63ff,#ff6584)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:30,fontWeight:800,marginBottom:14,boxShadow:'0 0 0 4px rgba(108,99,255,0.2)'}}>AS</div>
              <div style={{fontSize:18,fontWeight:700}}>{profile.name}</div>
              <div style={{color:'var(--muted)',fontSize:13,marginTop:2}}>{profile.title}</div>
              <div style={{display:'flex',alignItems:'center',gap:6,marginTop:8,fontSize:12,color:'var(--muted)'}}><span>📍</span>{profile.location}</div>
              <div style={{marginTop:6,padding:'3px 12px',borderRadius:20,background:profile.visibility==='Public'?'rgba(67,233,123,0.12)':'rgba(247,151,30,0.12)',color:profile.visibility==='Public'?'var(--a3)':'var(--a4)',fontSize:11,fontWeight:600}}>
                {profile.visibility==='Public'?'🌐 Public':'🔒 Private'}
              </div>
            </div>
            <div>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:6}}>
                <span style={{color:'var(--muted)'}}>Profile Completion</span>
                <span style={{color:'var(--accent)',fontWeight:700}}>{completion}%</span>
              </div>
              <div style={{height:6,background:'var(--s3)',borderRadius:10,overflow:'hidden'}}>
                <div style={{height:'100%',width:`${completion}%`,background:'linear-gradient(90deg,#6c63ff,#a78bfa)',borderRadius:10,transition:'width 1s'}}/>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div style={card}>
            <div style={{fontWeight:700,marginBottom:16,fontSize:14}}>⚙️ Job Preferences</div>
            {[
              {label:'Preferred Role',   key:'preferredRole'},
              {label:'Expected Salary',  key:'expectedSalary'},
              {label:'Profile Visibility',key:'visibility'},
            ].map(f=>(
              <div key={f.key} style={{marginBottom:14}}>
                <div style={{fontSize:11,color:'var(--muted)',marginBottom:5}}>{f.label}</div>
                {f.key==='visibility'
                  ? <select value={profile.visibility} onChange={e=>update('visibility',e.target.value)} style={inputS}>
                      <option>Public</option><option>Private</option>
                    </select>
                  : <input value={profile[f.key]} onChange={e=>update(f.key,e.target.value)} style={inputS}/>
                }
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{display:'flex',flexDirection:'column',gap:18}}>

          {/* Basic info */}
          <div style={card}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
              <div style={{fontWeight:700,fontSize:14}}>📋 Basic Information</div>
              <button onClick={()=>editBasic?handleSave():setEditBasic(true)} className="btn btn-primary" style={{fontSize:11,padding:'6px 16px'}}>
                {editBasic?'Save Changes':'Edit Profile'}
              </button>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              {[
                {label:'Full Name',    key:'name'},
                {label:'Job Title',    key:'title'},
                {label:'Email',        key:'email'},
                {label:'Phone',        key:'phone'},
                {label:'Location',     key:'location'},
              ].map(f=>(
                <div key={f.key} style={f.key==='bio'?{gridColumn:'span 2'}:{}}>
                  <div style={{fontSize:11,color:'var(--muted)',marginBottom:5}}>{f.label}</div>
                  <input
                    disabled={!editBasic}
                    value={profile[f.key]}
                    onChange={e=>update(f.key,e.target.value)}
                    style={{...inputS, background:editBasic?'var(--s2)':'var(--s3)', cursor:editBasic?'text':'default'}}
                  />
                </div>
              ))}
              <div style={{gridColumn:'span 2'}}>
                <div style={{fontSize:11,color:'var(--muted)',marginBottom:5}}>Bio</div>
                <textarea
                  disabled={!editBasic}
                  value={profile.bio}
                  onChange={e=>update('bio',e.target.value)}
                  rows={3}
                  style={{...inputS,resize:'vertical',background:editBasic?'var(--s2)':'var(--s3)',cursor:editBasic?'text':'default'}}
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div style={card}>
            <div style={{fontWeight:700,fontSize:14,marginBottom:16}}>🛠️ Skills</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:16}}>
              {profile.skills.map(s=>(
                <span key={s} style={{background:'rgba(108,99,255,0.15)',color:'var(--accent)',fontSize:12,fontWeight:600,padding:'4px 12px',borderRadius:20,display:'flex',alignItems:'center',gap:6}}>
                  {s}
                  <span onClick={()=>removeSkill(s)} style={{cursor:'pointer',opacity:.6,fontSize:14,lineHeight:1}}>×</span>
                </span>
              ))}
            </div>
            <div style={{display:'flex',gap:10}}>
              <input value={newSkill} onChange={e=>setNewSkill(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addSkill()} placeholder="Add a skill…" style={{...inputS,flex:1}}/>
              <button onClick={addSkill} className="btn btn-primary" style={{fontSize:12,padding:'8px 16px'}}>Add</button>
            </div>
          </div>

          {/* Experience */}
          <div style={card}>
            <div style={{fontWeight:700,fontSize:14,marginBottom:16}}>💼 Work Experience</div>
            {profile.experience.map(exp=>(
              <div key={exp.id} style={{paddingBottom:16,marginBottom:16,borderBottom:'1px solid var(--border)',lastChild:{borderBottom:'none'}}}>
                <div style={{fontWeight:600,fontSize:13}}>{exp.role}</div>
                <div style={{color:'var(--accent)',fontSize:12,marginTop:2}}>{exp.company}</div>
                <div style={{color:'var(--muted)',fontSize:11,marginTop:2}}>{exp.period}</div>
                <div style={{color:'var(--muted)',fontSize:12,marginTop:6}}>{exp.desc}</div>
              </div>
            ))}
            <button className="btn btn-ghost" style={{fontSize:11,padding:'6px 14px',marginTop:4}}>+ Add Experience</button>
          </div>

          {/* Education */}
          <div style={card}>
            <div style={{fontWeight:700,fontSize:14,marginBottom:16}}>🎓 Education</div>
            {profile.education.map(edu=>(
              <div key={edu.id} style={{marginBottom:14}}>
                <div style={{fontWeight:600,fontSize:13}}>{edu.degree}</div>
                <div style={{color:'var(--accent)',fontSize:12,marginTop:2}}>{edu.school}</div>
                <div style={{color:'var(--muted)',fontSize:11,marginTop:2}}>Graduated {edu.year}</div>
              </div>
            ))}
            <button className="btn btn-ghost" style={{fontSize:11,padding:'6px 14px',marginTop:4}}>+ Add Education</button>
          </div>

        </div>
      </div>
    </div>
  );
}

const card   = {background:'var(--s1)',border:'1px solid var(--border)',borderRadius:14,padding:20};
const inputS = {width:'100%',padding:'9px 12px',background:'var(--s2)',border:'1px solid var(--border)',borderRadius:9,color:'var(--text)',fontSize:12,fontFamily:'var(--font)',outline:'none'};
