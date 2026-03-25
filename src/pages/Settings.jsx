import { useState } from 'react';

export default function Settings() {
  const [notifSettings, setNotifSettings] = useState({
    emailNotifs: true, smsNotifs: false, pushNotifs: true,
    jobMatches: true, appUpdates: true, messages: true, profileViews: false,
  });
  const [privacy, setPrivacy] = useState({ profileVisible: true, showEmail: false, showPhone: false });
  const [saved,   setSaved]   = useState(false);

  const toggleN = (k) => setNotifSettings(s => ({...s,[k]:!s[k]}));
  const toggleP = (k) => setPrivacy(s => ({...s,[k]:!s[k]}));

  const handleSave = () => { setSaved(true); setTimeout(()=>setSaved(false),2500); };

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:28}}>
        <div>
          <h1 style={{fontSize:24,fontWeight:800,letterSpacing:'-0.5px'}}>⚙️ Settings</h1>
          <p style={{color:'var(--muted)',fontSize:13,marginTop:4}}>Manage your account preferences</p>
        </div>
        {saved && <span style={{background:'rgba(67,233,123,0.15)',color:'var(--a3)',padding:'8px 16px',borderRadius:10,fontSize:12,fontWeight:600}}>✅ Settings saved!</span>}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>

        {/* Notification settings */}
        <div style={card}>
          <div style={{fontWeight:700,fontSize:14,marginBottom:20}}>🔔 Notification Preferences</div>
          <div style={{fontWeight:600,fontSize:12,color:'var(--muted)',marginBottom:10,textTransform:'uppercase',letterSpacing:'1px'}}>Channels</div>
          {[
            {key:'emailNotifs', label:'Email Notifications', desc:'Receive updates via email'},
            {key:'smsNotifs',   label:'SMS Notifications',   desc:'Receive SMS alerts'},
            {key:'pushNotifs',  label:'Push Notifications',  desc:'Browser push notifications'},
          ].map(item=>(
            <ToggleRow key={item.key} {...item} checked={notifSettings[item.key]} onChange={()=>toggleN(item.key)}/>
          ))}
          <div style={{fontWeight:600,fontSize:12,color:'var(--muted)',margin:'20px 0 10px',textTransform:'uppercase',letterSpacing:'1px'}}>Alert Types</div>
          {[
            {key:'jobMatches',   label:'Job Matches',      desc:'New jobs matching your profile'},
            {key:'appUpdates',   label:'Application Updates', desc:'Status changes on your applications'},
            {key:'messages',     label:'New Messages',     desc:'Recruiter messages'},
            {key:'profileViews', label:'Profile Views',    desc:'When recruiters view your profile'},
          ].map(item=>(
            <ToggleRow key={item.key} {...item} checked={notifSettings[item.key]} onChange={()=>toggleN(item.key)}/>
          ))}
        </div>

        {/* Privacy */}
        <div style={{display:'flex',flexDirection:'column',gap:20}}>
          <div style={card}>
            <div style={{fontWeight:700,fontSize:14,marginBottom:20}}>🔒 Privacy</div>
            {[
              {key:'profileVisible', label:'Public Profile',   desc:'Allow recruiters to find your profile'},
              {key:'showEmail',      label:'Show Email',       desc:'Display email on your public profile'},
              {key:'showPhone',      label:'Show Phone',       desc:'Display phone on your public profile'},
            ].map(item=>(
              <ToggleRow key={item.key} {...item} checked={privacy[item.key]} onChange={()=>toggleP(item.key)}/>
            ))}
          </div>

          {/* Account */}
          <div style={card}>
            <div style={{fontWeight:700,fontSize:14,marginBottom:16}}>🔑 Account</div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {['Change Password','Change Email','Download My Data'].map(label=>(
                <button key={label} className="btn btn-ghost" style={{textAlign:'left',fontSize:12,justifyContent:'flex-start'}}>{label}</button>
              ))}
              <button className="btn" style={{textAlign:'left',fontSize:12,background:'rgba(255,101,132,0.1)',color:'var(--a2)',border:'1px solid rgba(255,101,132,0.2)'}}>Delete Account</button>
            </div>
          </div>

          {/* App info */}
          <div style={card}>
            <div style={{fontWeight:700,fontSize:14,marginBottom:14}}>ℹ️ App Info</div>
            {[['Version','1.0.0'],['Build','2026.03.25'],['Plan','Free']].map(([k,v])=>(
              <div key={k} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid var(--border)',fontSize:12}}>
                <span style={{color:'var(--muted)'}}>{k}</span>
                <span style={{fontWeight:600}}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{marginTop:20,display:'flex',justifyContent:'flex-end'}}>
        <button onClick={handleSave} className="btn btn-primary" style={{padding:'10px 28px',fontSize:13}}>Save Settings</button>
      </div>
    </div>
  );
}

function ToggleRow({ label, desc, checked, onChange }) {
  return (
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:'1px solid var(--border)'}}>
      <div>
        <div style={{fontSize:13,fontWeight:500}}>{label}</div>
        <div style={{fontSize:11,color:'var(--muted)',marginTop:1}}>{desc}</div>
      </div>
      <div onClick={onChange} style={{width:42,height:24,borderRadius:12,background:checked?'var(--accent)':'var(--s3)',cursor:'pointer',position:'relative',transition:'background .2s',flexShrink:0}}>
        <div style={{width:18,height:18,borderRadius:'50%',background:'#fff',position:'absolute',top:3,left:checked?20:3,transition:'left .2s',boxShadow:'0 1px 4px rgba(0,0,0,0.3)'}}/>
      </div>
    </div>
  );
}

const card = {background:'var(--s1)',border:'1px solid var(--border)',borderRadius:14,padding:20};
