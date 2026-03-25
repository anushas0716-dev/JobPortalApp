import { useState } from 'react';

const CONVOS = [
  { id:1, name:'Sarah Wilson', role:'HR Manager · Apple', avatar:'SW', color:'#6c63ff', unread:2, last:"Thanks for applying! We'd like to schedule an interview.", time:'10 min' },
  { id:2, name:'Raj Patel', role:'Tech Lead · Google', avatar:'RP', color:'#43e97b', unread:1, last:'Hi Arjun, your profile looks great for this role.', time:'1 hr' },
  { id:3, name:'Priya Mehta', role:'Recruiter · Razorpay', avatar:'PM', color:'#f7971e', unread:0, last:"We'll get back to you within 3–5 business days.", time:'Yesterday' },
  { id:4, name:'Tom Brooks', role:'CTO · CRED', avatar:'TB', color:'#ff6584', unread:0, last:"Thanks for your application. We'll review it shortly.", time:'2 days' },
];

const INIT_CHATS = {
  1: [
  { from:'them', text:"Hi Arjun! I came across your profile and think you'd be a great fit for our Senior Frontend Engineer role.", time:'9:42 AM' },
  { from:'me', text:"Hi Sarah! Thank you for reaching out. I'm definitely interested in the opportunity.", time:'9:58 AM' },
  { from:'them', text:"Great! We'd like to schedule a technical interview. Are you available this week?", time:'10:03 AM' },
  { from:'me', text:"Yes, I'm available Thursday or Friday afternoon.", time:'10:11 AM' },
  { from:'them', text:"Thanks for applying! We'd like to schedule an interview.", time:'10:15 AM' },
],
  2: [
  { from:'them', text:'Hi Arjun, your profile looks great for this role.', time:'11:30 AM' },
  { from:'me',   text:"Thank you Raj! I'm excited about this opportunity.", time:'11:45 AM' },
],
  3: [
  { from:'them', text:"We'll get back to you within 3–5 business days.", time:'Yesterday' },
],
  4: [
  { from:'them', text:"Thanks for your application. We'll review it shortly.", time:'2 days ago' },
],
};

export default function Messages() {
  const [activeConvo, setActiveConvo] = useState(1);
  const [chats,       setChats]       = useState(INIT_CHATS);
  const [input,       setInput]       = useState('');
  const [convos,      setConvos]      = useState(CONVOS);

  const active = convos.find(c => c.id === activeConvo);

  const send = () => {
    if (!input.trim()) return;
    const msg = { from:'me', text: input.trim(), time: new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}) };
    setChats(c => ({ ...c, [activeConvo]: [...(c[activeConvo]||[]), msg] }));
    setInput('');
  };

  const openConvo = (id) => {
    setActiveConvo(id);
    setConvos(c => c.map(x => x.id===id ? {...x, unread:0} : x));
  };

  return (
    <div>
      <div style={{marginBottom:20}}>
        <h1 style={{fontSize:24,fontWeight:800,letterSpacing:'-0.5px'}}>💬 Messages</h1>
        <p style={{color:'var(--muted)',fontSize:13,marginTop:4}}>Secure messaging with recruiters</p>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'300px 1fr',gap:0,background:'var(--s1)',border:'1px solid var(--border)',borderRadius:16,overflow:'hidden',height:'calc(100vh - 220px)'}}>

        {/* Convo list */}
        <div style={{borderRight:'1px solid var(--border)',overflowY:'auto'}}>
          <div style={{padding:'16px',borderBottom:'1px solid var(--border)'}}>
            <input placeholder="Search messages…" style={{width:'100%',padding:'8px 12px',background:'var(--s2)',border:'1px solid var(--border)',borderRadius:9,color:'var(--text)',fontSize:12,fontFamily:'var(--font)',outline:'none'}}/>
          </div>
          {convos.map(c=>(
            <div key={c.id} onClick={()=>openConvo(c.id)}
              style={{padding:'14px 16px',cursor:'pointer',background:activeConvo===c.id?'rgba(108,99,255,0.08)':'transparent',borderLeft:`3px solid ${activeConvo===c.id?'var(--accent)':'transparent'}`,transition:'background .15s'}}>
              <div style={{display:'flex',alignItems:'flex-start',gap:12}}>
                <div style={{width:40,height:40,borderRadius:'50%',background:c.color,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:13,flexShrink:0,opacity:.85}}>{c.avatar}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <span style={{fontWeight:600,fontSize:13}}>{c.name}</span>
                    <span style={{fontSize:10,color:'var(--muted)'}}>{c.time}</span>
                  </div>
                  <div style={{color:'var(--muted)',fontSize:11,marginTop:1}}>{c.role}</div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:4}}>
                    <span style={{fontSize:11,color:'var(--muted)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:160}}>{c.last}</span>
                    {c.unread>0 && <span style={{background:'var(--accent)',color:'#fff',fontSize:9,fontWeight:700,padding:'2px 6px',borderRadius:20,flexShrink:0}}>{c.unread}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat area */}
        <div style={{display:'flex',flexDirection:'column'}}>
          {/* Header */}
          <div style={{padding:'14px 20px',borderBottom:'1px solid var(--border)',display:'flex',alignItems:'center',gap:12}}>
            <div style={{width:38,height:38,borderRadius:'50%',background:active.color,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:12,opacity:.85}}>{active.avatar}</div>
            <div>
              <div style={{fontWeight:700,fontSize:14}}>{active.name}</div>
              <div style={{color:'var(--a3)',fontSize:11,display:'flex',alignItems:'center',gap:5}}><span style={{width:6,height:6,borderRadius:'50%',background:'var(--a3)',display:'inline-block'}}/>Online</div>
            </div>
          </div>

          {/* Messages */}
          <div style={{flex:1,overflowY:'auto',padding:'20px',display:'flex',flexDirection:'column',gap:12}}>
            {(chats[activeConvo]||[]).map((msg,i)=>(
              <div key={i} style={{display:'flex',justifyContent:msg.from==='me'?'flex-end':'flex-start'}}>
                <div style={{maxWidth:'70%',padding:'10px 14px',borderRadius:msg.from==='me'?'14px 14px 4px 14px':'14px 14px 14px 4px',background:msg.from==='me'?'var(--accent)':'var(--s2)',color:msg.from==='me'?'#fff':'var(--text)',fontSize:12,lineHeight:1.5}}>
                  <div>{msg.text}</div>
                  <div style={{fontSize:10,opacity:.6,marginTop:4,textAlign:'right'}}>{msg.time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{padding:'16px 20px',borderTop:'1px solid var(--border)',display:'flex',gap:10}}>
            <input
              value={input}
              onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>e.key==='Enter'&&send()}
              placeholder="Type a message…"
              style={{flex:1,padding:'10px 16px',background:'var(--s2)',border:'1px solid var(--border)',borderRadius:10,color:'var(--text)',fontSize:13,fontFamily:'var(--font)',outline:'none'}}
            />
            <button onClick={send} className="btn btn-primary" style={{padding:'10px 20px',fontSize:13}}>Send →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
