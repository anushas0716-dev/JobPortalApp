import { useState, useRef } from 'react';

const INIT_RESUMES = [
  { id:1, name:'Arjun_Sharma_FullStack_2024.pdf', size:'284 KB', uploaded:'15 Mar 2026', primary:true  },
  { id:2, name:'Arjun_Sharma_Frontend_2024.pdf',  size:'196 KB', uploaded:'02 Jan 2026', primary:false },
];

export default function Resumes() {
  const [resumes,  setResumes]  = useState(INIT_RESUMES);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef();

  const setPrimary = (id) => setResumes(r => r.map(x => ({...x, primary: x.id===id})));
  const remove     = (id) => setResumes(r => r.filter(x => x.id!==id));

  const handleFile = (file) => {
    if (!file) return;
    const newR = { id: Date.now(), name: file.name, size: `${Math.round(file.size/1024)} KB`, uploaded: new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}), primary: false };
    setResumes(r => [...r, newR]);
  };

  return (
    <div>
      <div style={{marginBottom:28}}>
        <h1 style={{fontSize:24,fontWeight:800,letterSpacing:'-0.5px'}}>📄 Resumes</h1>
        <p style={{color:'var(--muted)',fontSize:13,marginTop:4}}>Manage your resumes. You can upload up to 5 resumes.</p>
      </div>

      {/* Upload area */}
      <div
        onDragOver={e=>{e.preventDefault();setDragging(true)}}
        onDragLeave={()=>setDragging(false)}
        onDrop={e=>{e.preventDefault();setDragging(false);handleFile(e.dataTransfer.files[0])}}
        onClick={()=>fileRef.current.click()}
        style={{
          border:`2px dashed ${dragging?'var(--accent)':'var(--border2)'}`,
          borderRadius:16, padding:'40px 20px', textAlign:'center',
          background: dragging?'rgba(108,99,255,0.06)':'var(--s1)',
          cursor:'pointer', transition:'all .2s', marginBottom:24,
        }}
      >
        <div style={{fontSize:36,marginBottom:12}}>📤</div>
        <div style={{fontWeight:700,fontSize:15,marginBottom:6}}>Drop your resume here or click to upload</div>
        <div style={{color:'var(--muted)',fontSize:12}}>Supports PDF, DOC, DOCX · Max 5 MB</div>
        <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" style={{display:'none'}} onChange={e=>handleFile(e.target.files[0])}/>
        <button className="btn btn-primary" style={{marginTop:16,pointerEvents:'none'}}>Choose File</button>
      </div>

      {/* Resume list */}
      <div style={{display:'flex',flexDirection:'column',gap:14}}>
        {resumes.map(r=>(
          <div key={r.id} style={{background:'var(--s1)',border:`1px solid ${r.primary?'rgba(108,99,255,0.4)':'var(--border)'}`,borderRadius:14,padding:'18px 22px',display:'flex',alignItems:'center',gap:16}}>
            <div style={{width:48,height:48,borderRadius:12,background:'rgba(255,80,80,0.12)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,flexShrink:0}}>📄</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <span style={{fontWeight:600,fontSize:13,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{r.name}</span>
                {r.primary && <span style={{background:'rgba(108,99,255,0.15)',color:'var(--accent)',fontSize:10,fontWeight:700,padding:'2px 8px',borderRadius:20,flexShrink:0}}>★ Primary</span>}
              </div>
              <div style={{color:'var(--muted)',fontSize:11,marginTop:3}}>{r.size} · Uploaded {r.uploaded}</div>
            </div>
            <div style={{display:'flex',gap:8,flexShrink:0}}>
              {!r.primary && (
                <button onClick={()=>setPrimary(r.id)} style={ghostBtn}>Set Primary</button>
              )}
              <button style={ghostBtn}>Preview</button>
              <button onClick={()=>remove(r.id)} style={{...ghostBtn,color:'var(--a2)',borderColor:'rgba(255,101,132,0.3)'}}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {resumes.length===0 && (
        <div style={{textAlign:'center',padding:'60px',color:'var(--muted)'}}>No resumes uploaded yet.</div>
      )}
    </div>
  );
}

const ghostBtn = {padding:'6px 12px',borderRadius:8,fontSize:11,fontWeight:600,cursor:'pointer',border:'1px solid var(--border)',background:'transparent',color:'var(--text)',fontFamily:'var(--font)',transition:'border-color .2s'};
