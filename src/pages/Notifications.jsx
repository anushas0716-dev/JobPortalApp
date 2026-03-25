import { useState } from 'react';

const INIT = [
  { id:1,  dot:'#ff6584', category:'Interview', unread:true,  title:'Interview Invitation',         body:'Apple has invited you for a technical interview for Senior Frontend Engineer.',         time:'10 min ago',   action:'View Details' },
  { id:2,  dot:'#43e97b', category:'Application',unread:true, title:'Application Shortlisted',      body:'Google has shortlisted your application for Software Engineer II.',                    time:'2 hrs ago',    action:'View Application' },
  { id:3,  dot:'#6c63ff', category:'Jobs',      unread:true,  title:'5 New Job Matches',            body:'New jobs matching your skills: React, Node.js, TypeScript.',                          time:'3 hrs ago',    action:'View Jobs' },
  { id:4,  dot:'#f7971e', category:'Profile',   unread:false, title:'Profile Viewed',               body:'Your profile was viewed by 3 recruiters at Google, Microsoft & Zepto.',              time:'Yesterday',    action:null },
  { id:5,  dot:'#6c63ff', category:'Jobs',      unread:false, title:'Saved Job Expiring',           body:'The Senior Frontend Engineer role at Apple expires in 3 days. Apply soon!',           time:'Yesterday',    action:'Apply Now' },
  { id:6,  dot:'#43e97b', category:'Application',unread:false,title:'Application Status Update',   body:'Razorpay has moved your application to "Under Review" stage.',                        time:'2 days ago',   action:'Track' },
  { id:7,  dot:'#f7971e', category:'Profile',   unread:false, title:'Complete Your Profile',        body:'Add work experience to increase your profile completion to 90% and get more matches.','time':'3 days ago', action:'Edit Profile' },
];

const CATS = ['All','Interview','Application','Jobs','Profile'];

export default function Notifications() {
  const [notifs,  setNotifs]  = useState(INIT);
  const [filter,  setFilter]  = useState('All');

  const markAll  = () => setNotifs(n => n.map(x => ({...x, unread:false})));
  const dismiss  = (id) => setNotifs(n => n.filter(x => x.id!==id));
  const markOne  = (id) => setNotifs(n => n.map(x => x.id===id ? {...x,unread:false} : x));

  const filtered = notifs.filter(n => filter==='All' || n.category===filter);
  const unreadCt = notifs.filter(n => n.unread).length;

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
        <div>
          <h1 style={{fontSize:24,fontWeight:800,letterSpacing:'-0.5px'}}>🔔 Notifications</h1>
          <p style={{color:'var(--muted)',fontSize:13,marginTop:4}}>{unreadCt} unread notifications</p>
        </div>
        <button onClick={markAll} className="btn btn-ghost" style={{fontSize:12}}>Mark all as read</button>
      </div>

      {/* Filter tabs */}
      <div className="tabs" style={{marginBottom:20}}>
        {CATS.map(c=>(
          <div key={c} className={`tab${filter===c?' active':''}`} onClick={()=>setFilter(c)}>{c}</div>
        ))}
      </div>

      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {filtered.length===0 && (
          <div style={{textAlign:'center',padding:'60px',color:'var(--muted)',background:'var(--s1)',borderRadius:14,border:'1px solid var(--border)'}}>
            <div style={{fontSize:32,marginBottom:10}}>🔔</div>
            No notifications here.
          </div>
        )}
        {filtered.map(n=>(
          <div key={n.id} onClick={()=>markOne(n.id)}
            style={{background:'var(--s1)',border:`1px solid ${n.unread?'rgba(108,99,255,0.25)':'var(--border)'}`,borderRadius:13,padding:'16px 18px',display:'flex',gap:14,cursor:'pointer',transition:'border-color .2s',position:'relative'}}>
            {n.unread && <div style={{position:'absolute',top:16,right:16,width:8,height:8,borderRadius:'50%',background:n.dot}}/>}
            <div style={{width:42,height:42,borderRadius:11,background:`${n.dot}18`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,flexShrink:0}}>
              {n.category==='Interview'?'🗓️':n.category==='Application'?'📋':n.category==='Jobs'?'💼':'👤'}
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:3}}>
                <span style={{fontWeight:700,fontSize:13}}>{n.title}</span>
                <span style={{background:`${n.dot}20`,color:n.dot,fontSize:10,fontWeight:600,padding:'2px 8px',borderRadius:20}}>{n.category}</span>
              </div>
              <div style={{color:'var(--muted)',fontSize:12,lineHeight:1.5}}>{n.body}</div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:8}}>
                <span style={{fontSize:10,color:'var(--muted)'}}>{n.time}</span>
                <div style={{display:'flex',gap:8}}>
                  {n.action && <button style={aBtn}>{n.action} →</button>}
                  <button onClick={e=>{e.stopPropagation();dismiss(n.id)}} style={{...aBtn,color:'var(--muted)'}}>Dismiss</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const aBtn = {background:'transparent',border:'none',color:'var(--accent)',fontSize:11,fontWeight:600,cursor:'pointer',fontFamily:'var(--font)',padding:0};
