import { useState, useEffect, useCallback, useRef } from "react";

const BASE = "http://127.0.0.1:8000";
const API  = `${BASE}/api`;
const tok  = () => localStorage.getItem("token");

async function api(path, opts = {}) {
  const isForm = opts.body instanceof FormData;
  const headers = {
    Authorization: `Bearer ${tok()}`,
    ...(isForm ? {} : { "Content-Type": "application/json" }),
    ...(opts.headers || {}),
  };
  const res = await fetch(`${API}${path}`, { ...opts, headers });
  if (res.status === 204) return null;
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw json;
  return json;
}

const DEGREE_CHOICES = [
  { value: "ssc",      label: "SSC / 10th" },
  { value: "hsc",      label: "HSC / 12th" },
  { value: "diploma",  label: "Diploma" },
  { value: "bachelor", label: "Bachelor's Degree" },
  { value: "master",   label: "Master's Degree" },
  { value: "phd",      label: "PhD" },
  { value: "other",    label: "Other" },
];
const EMP_CHOICES = [
  { value: "full_time",  label: "Full Time" },
  { value: "part_time",  label: "Part Time" },
  { value: "freelance",  label: "Freelance" },
  { value: "internship", label: "Internship" },
  { value: "contract",   label: "Contract" },
];
const PROF_CHOICES = [
  { value: "beginner",     label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced",     label: "Advanced" },
  { value: "expert",       label: "Expert" },
];

const S = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600;700&family=Nunito:wght@300;400;500;600;700&display=swap');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --bg:#f0f4f8; --white:#ffffff; --surface:#f8fafc; --border:#e2e8f0; --border2:#cbd5e1;
  --blue:#3b82f6; --blue-lt:#eff6ff; --blue-dk:#1d4ed8;
  --teal:#0d9488; --teal-lt:#f0fdfa;
  --orange:#f97316; --orange-lt:#fff7ed;
  --text:#0f172a; --muted:#64748b; --light:#94a3b8;
  --danger:#ef4444; --danger-lt:#fef2f2;
  --success:#10b981; --success-lt:#f0fdf4;
  --r:14px; --font:'Nunito',sans-serif; --head:'Fraunces',serif;
  --shadow:0 1px 3px rgba(0,0,0,.06),0 4px 16px rgba(0,0,0,.06);
  --shadow-lg:0 8px 32px rgba(0,0,0,.1);
}
body { background:var(--bg); font-family:var(--font); color:var(--text); }
.shell { min-height:100vh; }
.topbar {
  background:var(--white); border-bottom:1px solid var(--border);
  height:60px; display:flex; align-items:center; justify-content:space-between;
  padding:0 2rem; position:sticky; top:0; z-index:100;
  box-shadow:0 1px 0 var(--border);
}
.topbar-brand { font-family:var(--head); font-size:1.25rem; font-weight:700; color:var(--blue-dk); letter-spacing:-.02em; }
.topbar-brand span { color:var(--teal); }
.topbar-right { display:flex; align-items:center; gap:.75rem; }
.topbar-name { font-size:.83rem; font-weight:600; color:var(--muted); }
.topbar-av { width:34px; height:34px; border-radius:50%; object-fit:cover; border:2px solid var(--border2); }
.topbar-av-ph {
  width:34px; height:34px; border-radius:50%;
  background:linear-gradient(135deg,var(--blue),var(--teal));
  display:flex; align-items:center; justify-content:center;
  font-family:var(--head); font-size:.72rem; font-weight:700; color:#fff;
  border:2px solid var(--border2);
}
.layout {
  max-width:1140px; margin:0 auto; padding:2rem 1.5rem;
  display:grid; grid-template-columns:290px 1fr; gap:1.75rem; align-items:start;
}
.sidebar {
  background:var(--white); border-radius:var(--r);
  border:1px solid var(--border); box-shadow:var(--shadow);
  overflow:hidden; position:sticky; top:76px;
}
.sb-hero { position:relative; padding-bottom:1.5rem; }
.sb-cover {
  height:90px;
  background:linear-gradient(135deg,#3b82f6 0%,#0d9488 50%,#6366f1 100%);
  position:relative; overflow:hidden;
}
.sb-cover::after {
  content:''; position:absolute; inset:0;
  background:url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.07'%3E%3Ccircle cx='20' cy='20' r='15'/%3E%3C/g%3E%3C/svg%3E");
}
.sb-av-wrap { position:absolute; bottom:-36px; left:50%; transform:translateX(-50%); width:76px; height:76px; }
.sb-av-img { width:76px; height:76px; border-radius:50%; object-fit:cover; border:3px solid var(--white); box-shadow:var(--shadow-lg); }
.sb-av-ph {
  width:76px; height:76px; border-radius:50%;
  background:linear-gradient(135deg,var(--blue),var(--teal));
  display:flex; align-items:center; justify-content:center;
  font-family:var(--head); font-size:1.5rem; font-weight:700; color:#fff;
  border:3px solid var(--white); box-shadow:var(--shadow-lg);
}
.sb-info { margin-top:44px; text-align:center; padding:0 1.25rem .75rem; }
.sb-name { font-family:var(--head); font-size:1.05rem; font-weight:700; color:var(--text); margin-bottom:.2rem; }
.sb-headline { font-size:.78rem; color:var(--teal); font-weight:600; margin-bottom:.75rem; }
.sb-meta { display:flex; flex-direction:column; gap:.4rem; margin-bottom:.75rem; }
.sb-meta-row { display:flex; align-items:center; justify-content:center; gap:.4rem; font-size:.76rem; color:var(--muted); }
.sb-meta-row strong { color:var(--text); font-weight:600; }
.sb-chips { display:flex; flex-wrap:wrap; gap:.3rem; justify-content:center; padding-bottom:.5rem; }
.sb-chip { font-size:.68rem; padding:.18rem .55rem; border-radius:20px; background:var(--blue-lt); color:var(--blue-dk); border:1px solid #bfdbfe; font-weight:600; }
.nav { border-top:1px solid var(--border); padding:.4rem 0; }
.nav-item {
  display:flex; align-items:center; gap:.65rem; width:100%;
  padding:.65rem 1.25rem; font-size:.84rem; font-weight:600;
  color:var(--muted); background:none; border:none; cursor:pointer;
  text-align:left; transition:all .15s; border-left:3px solid transparent;
  font-family:var(--font);
}
.nav-item:hover { background:var(--surface); color:var(--text); }
.nav-item.active { color:var(--blue-dk); background:var(--blue-lt); border-left-color:var(--blue); }
.nav-dot { margin-left:auto; font-size:.67rem; font-weight:700; background:var(--border); border-radius:20px; padding:.1rem .45rem; color:var(--muted); }
.nav-item.active .nav-dot { background:#bfdbfe; color:var(--blue-dk); }
.main { display:flex; flex-direction:column; gap:1.25rem; }
.card { background:var(--white); border-radius:var(--r); border:1px solid var(--border); box-shadow:var(--shadow); overflow:hidden; animation:up .25s ease both; }
@keyframes up { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
.card-head { padding:1.1rem 1.5rem; border-bottom:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; background:var(--surface); }
.card-title { font-family:var(--head); font-size:.98rem; font-weight:700; display:flex; align-items:center; gap:.5rem; color:var(--text); }
.card-title-icon { color:var(--blue); }
.card-body { padding:1.5rem; }
.btn { display:inline-flex; align-items:center; gap:.35rem; padding:.5rem 1.1rem; border-radius:8px; font-size:.81rem; font-weight:700; cursor:pointer; border:none; transition:all .15s; font-family:var(--font); }
.btn-blue { background:var(--blue); color:#fff; }
.btn-blue:hover { background:var(--blue-dk); }
.btn-teal { background:var(--teal); color:#fff; }
.btn-teal:hover { background:#0f766e; }
.btn-ghost { background:var(--white); color:var(--muted); border:1.5px solid var(--border2); }
.btn-ghost:hover { border-color:var(--blue); color:var(--blue); }
.btn-danger { background:var(--danger-lt); color:var(--danger); border:1.5px solid #fecaca; }
.btn-danger:hover { background:#fee2e2; }
.btn-sm { padding:.3rem .7rem; font-size:.74rem; }
.btn:disabled { opacity:.5; cursor:not-allowed; }
.form { display:flex; flex-direction:column; gap:.95rem; }
.form-row { display:grid; grid-template-columns:1fr 1fr; gap:.95rem; }
.field { display:flex; flex-direction:column; gap:.3rem; }
.field label { font-size:.71rem; font-weight:700; color:var(--muted); text-transform:uppercase; letter-spacing:.07em; }
.field input,.field select,.field textarea { padding:.6rem .9rem; border:1.5px solid var(--border2); border-radius:8px; font-size:.86rem; font-family:var(--font); color:var(--text); background:var(--white); outline:none; transition:border-color .15s,box-shadow .15s; }
.field input:focus,.field select:focus,.field textarea:focus { border-color:var(--blue); box-shadow:0 0 0 3px rgba(59,130,246,.12); }
.field textarea { resize:vertical; min-height:80px; }
.inline-check { display:flex; align-items:center; gap:.5rem; font-size:.83rem; color:var(--muted); cursor:pointer; padding-top:1.5rem; }
.inline-check input { accent-color:var(--blue); width:15px; height:15px; }
.form-foot { display:flex; gap:.65rem; padding-top:.4rem; }
.form-box { background:var(--blue-lt); border:1.5px solid #bfdbfe; border-radius:10px; padding:1.25rem; margin-bottom:1.25rem; }
.photo-block { display:flex; align-items:center; gap:1.5rem; margin-bottom:1.5rem; padding:1.25rem; background:var(--surface); border-radius:10px; border:1px solid var(--border); }
.photo-av { position:relative; flex-shrink:0; }
.photo-av img { width:80px; height:80px; border-radius:50%; object-fit:cover; border:3px solid var(--border2); }
.photo-av-ph { width:80px; height:80px; border-radius:50%; background:linear-gradient(135deg,var(--blue),var(--teal)); display:flex; align-items:center; justify-content:center; font-family:var(--head); font-size:1.6rem; font-weight:700; color:#fff; border:3px solid var(--border2); }
.photo-edit-btn { position:absolute; bottom:0; right:0; width:26px; height:26px; border-radius:50%; background:var(--blue); border:2px solid white; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:background .15s; }
.photo-edit-btn:hover { background:var(--blue-dk); }
.photo-edit-btn input { display:none; }
.photo-info-name { font-weight:700; font-size:.9rem; margin-bottom:.2rem; }
.photo-info-headline { font-size:.78rem; color:var(--teal); font-weight:600; margin-bottom:.5rem; }
.tl { display:flex; flex-direction:column; gap:.85rem; }
.tl-item { background:var(--surface); border:1.5px solid var(--border); border-radius:10px; padding:1.1rem 1.25rem; display:flex; align-items:flex-start; justify-content:space-between; gap:1rem; transition:all .15s; }
.tl-item:hover { border-color:var(--border2); box-shadow:var(--shadow); }
.tl-left { flex:1; }
.tl-title { font-weight:700; font-size:.92rem; color:var(--text); }
.tl-sub { font-size:.8rem; color:var(--blue); font-weight:600; margin-top:.15rem; }
.tl-meta { font-size:.74rem; color:var(--muted); margin-top:.25rem; display:flex; align-items:center; gap:.5rem; flex-wrap:wrap; }
.tl-desc { font-size:.8rem; color:var(--muted); margin-top:.5rem; line-height:1.65; }
.tl-actions { display:flex; gap:.35rem; flex-shrink:0; }
.badge { display:inline-flex; font-size:.65rem; font-weight:700; padding:.15rem .55rem; border-radius:20px; }
.badge-blue { background:var(--blue-lt); color:var(--blue-dk); border:1px solid #bfdbfe; }
.badge-teal { background:var(--teal-lt); color:var(--teal); border:1px solid #99f6e4; }
.skills-wrap { display:flex; flex-wrap:wrap; gap:.55rem; }
.skill-chip { display:inline-flex; align-items:center; gap:.4rem; padding:.38rem .85rem; border-radius:20px; font-size:.79rem; font-weight:600; background:var(--surface); border:1.5px solid var(--border2); color:var(--text); transition:all .15s; }
.skill-chip:hover { border-color:var(--blue); background:var(--blue-lt); }
.skill-chip-prof { font-size:.67rem; color:var(--light); font-weight:500; }
.skill-del { background:none; border:none; cursor:pointer; color:var(--light); display:flex; align-items:center; padding:0; transition:color .15s; }
.skill-del:hover { color:var(--danger); }
.skill-add-row { display:flex; gap:.6rem; margin-top:1rem; align-items:flex-end; flex-wrap:wrap; }
.skill-add-row .field { flex:1; min-width:120px; }
.skill-add-row input,.skill-add-row select { padding:.6rem .9rem; border:1.5px solid var(--border2); border-radius:8px; font-size:.85rem; font-family:var(--font); color:var(--text); background:var(--white); outline:none; transition:border-color .15s; width:100%; }
.skill-add-row input:focus,.skill-add-row select:focus { border-color:var(--blue); }
.resume-list { display:flex; flex-direction:column; gap:.65rem; }
.resume-item { display:flex; align-items:center; justify-content:space-between; gap:1rem; background:var(--surface); border:1.5px solid var(--border); border-radius:10px; padding:.9rem 1.1rem; transition:all .15s; }
.resume-item:hover { border-color:var(--border2); box-shadow:var(--shadow); }
.resume-name { font-size:.87rem; font-weight:600; display:flex; align-items:center; gap:.5rem; }
.resume-date { font-size:.72rem; color:var(--muted); margin-top:.15rem; }
.resume-actions { display:flex; gap:.35rem; }
.drop-zone { border:2px dashed var(--border2); border-radius:10px; padding:1.75rem; text-align:center; cursor:pointer; transition:all .2s; margin-top:1rem; display:block; background:var(--surface); }
.drop-zone:hover { border-color:var(--blue); background:var(--blue-lt); }
.drop-zone input { display:none; }
.drop-zone p { font-size:.8rem; color:var(--muted); margin-top:.4rem; }
.empty { text-align:center; padding:2.5rem 1rem; color:var(--light); }
.empty svg { opacity:.3; margin-bottom:.75rem; }
.empty p { font-size:.85rem; }
.loader { display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:60vh; gap:1rem; color:var(--muted); }
.spinner { width:36px; height:36px; border:3px solid var(--border2); border-top-color:var(--blue); border-radius:50%; animation:spin .7s linear infinite; }
@keyframes spin { to{transform:rotate(360deg)} }
.toast { position:fixed; bottom:1.75rem; right:1.75rem; background:var(--white); border:1px solid var(--border); padding:.8rem 1.25rem; border-radius:10px; font-size:.83rem; display:flex; align-items:center; gap:.55rem; font-weight:600; box-shadow:var(--shadow-lg); z-index:999; animation:slideIn .25s ease; color:var(--text); }
.toast.success { border-left:3px solid var(--success); }
.toast.error   { border-left:3px solid var(--danger); }
@keyframes slideIn { from{opacity:0;transform:translateX(16px)} to{opacity:1;transform:translateX(0)} }
.err-banner { background:var(--danger-lt); border:1px solid #fecaca; border-radius:8px; padding:.65rem 1rem; font-size:.8rem; color:var(--danger); margin-bottom:1rem; font-weight:500; }
@media (max-width:780px) { .layout{grid-template-columns:1fr} .sidebar{position:static} .form-row{grid-template-columns:1fr} }
`;

const Ic = ({ d, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);
const IC = {
  user:   "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  edu:    ["M22 10v6M2 10l10-5 10 5-10 5z","M6 12v5c3 3 9 3 12 0v-5"],
  work:   ["M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z","M16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z"],
  skill:  "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  resume: ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z","M14 2v6h6","M16 13H8","M16 17H8","M10 9H8"],
  plus:   "M12 5v14M5 12h14",
  edit:   "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  trash:  ["M3 6h18","M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6","M10 11v6","M14 11v6","M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"],
  check:  "M20 6L9 17l-5-5",
  x:      "M18 6L6 18M6 6l12 12",
  upload: ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4","M17 8l-5-5-5 5","M12 3v12"],
  camera: ["M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z","M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
  phone:  "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z",
  pin:    "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  money:  ["M12 1v22","M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"],
  file:   ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z","M14 2v6h6"],
  star:   "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
};

function Toast({ msg, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3200); return () => clearTimeout(t); }, [onClose]);
  return <div className={`toast ${type}`}><Ic d={type === "success" ? IC.check : IC.x} size={14} />{msg}</div>;
}
function ErrBox({ err }) {
  if (!err) return null;
  const msg = typeof err === "string" ? err
    : Object.entries(err).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`).join(" | ");
  return <div className="err-banner">{msg}</div>;
}

function ProfileTab({ profile, candidateId, onSaved, toast }) {
  const blank = { full_name: "", phone: "", headline: "", experience_years: 0, current_salary: "", expected_salary: "", location: "", parent_name: "" };
  const [form, setForm]     = useState(profile ? { ...profile } : blank);
  const [saving, setSaving] = useState(false);
  const [err, setErr]       = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [imgFile, setImgFile]       = useState(null);

  useEffect(() => {
    if (profile) {
      setForm({ ...profile });
      setImgPreview(profile.profile_image ? `${BASE}${profile.profile_image}` : null);
    }
  }, [profile]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleImgChange = (e) => {
    const file = e.target.files[0]; if (!file) return;
    setImgFile(file);
    setImgPreview(URL.createObjectURL(file));
  };

  const save = async () => {
    setSaving(true); setErr(null);
    try {
      if (imgFile && candidateId) {
        const fd = new FormData();
        fd.append("profile_image", imgFile);
        await api(`/candidates/${candidateId}/`, { method: "PATCH", body: fd });
        setImgFile(null);
      }
      const payload = { ...form };
      if (!payload.current_salary)  delete payload.current_salary;
      if (!payload.expected_salary) delete payload.expected_salary;
      delete payload.profile_image;
      const result = candidateId
        ? await api(`/candidates/${candidateId}/`, { method: "PATCH", body: JSON.stringify(payload) })
        : await api("/candidates/", { method: "POST", body: JSON.stringify(payload) });
      onSaved(result); toast("Profile saved!", "success");
    } catch (e) { setErr(e); toast("Save failed", "error"); }
    setSaving(false);
  };

  const initials = form.full_name ? form.full_name.trim().split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() : "?";

  return (
    <div className="card">
      <div className="card-head">
        <div className="card-title"><span className="card-title-icon"><Ic d={IC.user} /></span> Personal Information</div>
      </div>
      <div className="card-body">
        {/* Photo upload block */}
        <div className="photo-block">
          <div className="photo-av">
            {imgPreview
              ? <img src={imgPreview} alt="Profile" />
              : <div className="photo-av-ph">{initials}</div>
            }
            <label className="photo-edit-btn">
              <input type="file" accept="image/*" onChange={handleImgChange} />
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
            </label>
          </div>
          <div>
            <div className="photo-info-name">{form.full_name || "Your Name"}</div>
            <div className="photo-info-headline">{form.headline || "Add a headline"}</div>
            <label className="btn btn-ghost btn-sm" style={{ cursor: "pointer" }}>
              <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleImgChange} />
              <Ic d={IC.camera} size={13} /> Change Photo
            </label>
          </div>
        </div>

        <ErrBox err={err} />
        <div className="form">
          <div className="form-row">
            <div className="field"><label>Full Name *</label><input value={form.full_name} onChange={e => set("full_name", e.target.value)} placeholder="Your full name" /></div>
            <div className="field"><label>Phone *</label><input value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+91XXXXXXXXXX" /></div>
          </div>
          <div className="field"><label>Headline</label><input value={form.headline} onChange={e => set("headline", e.target.value)} placeholder="e.g. Senior React Developer | 5 YOE" /></div>
          <div className="form-row">
            <div className="field"><label>Location *</label><input value={form.location} onChange={e => set("location", e.target.value)} placeholder="Bangalore, India" /></div>
            <div className="field"><label>Years of Experience</label><input type="number" min="0" value={form.experience_years} onChange={e => set("experience_years", e.target.value)} /></div>
          </div>
          <div className="field"><label>Parent / Guardian Name *</label><input value={form.parent_name} onChange={e => set("parent_name", e.target.value)} placeholder="Parent or guardian full name" /></div>
          <div className="form-row">
            <div className="field"><label>Current Salary (₹/yr)</label><input type="number" value={form.current_salary} onChange={e => set("current_salary", e.target.value)} placeholder="800000" /></div>
            <div className="field"><label>Expected Salary (₹/yr)</label><input type="number" value={form.expected_salary} onChange={e => set("expected_salary", e.target.value)} placeholder="1200000" /></div>
          </div>
          <div className="form-foot">
            <button className="btn btn-teal" onClick={save} disabled={saving}><Ic d={IC.check} size={13} />{saving ? "Saving…" : "Save Profile"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EducationTab({ candidateId, items, onRefresh, toast }) {
  const blank = { candidate: candidateId, degree: "bachelor", field_of_study: "", institution: "", start_year: "", end_year: "", is_current: false, grade: "" };
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState(blank);
  const [err, setErr]   = useState(null);
  const [busy, setBusy] = useState(false);
  const reset    = () => { setForm({ ...blank, candidate: candidateId }); setEdit(null); setShow(false); setErr(null); };
  const openEdit = (item) => { setForm({ ...item }); setEdit(item); setShow(true); };
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const save = async () => {
    setBusy(true); setErr(null);
    try {
      const payload = { ...form };
      if (payload.is_current) delete payload.end_year;
      if (!payload.grade) delete payload.grade;
      edit ? await api(`/educations/${edit.id}/`, { method: "PATCH", body: JSON.stringify(payload) })
           : await api("/educations/", { method: "POST", body: JSON.stringify(payload) });
      toast(edit ? "Updated!" : "Added!", "success"); reset(); onRefresh();
    } catch (e) { setErr(e); toast("Save failed", "error"); }
    setBusy(false);
  };
  const del = async (id) => {
    if (!window.confirm("Delete?")) return;
    try { await api(`/educations/${id}/`, { method: "DELETE" }); toast("Deleted!", "success"); onRefresh(); }
    catch { toast("Failed", "error"); }
  };
  const degreeLabel = (v) => DEGREE_CHOICES.find(d => d.value === v)?.label || v;
  return (
    <div className="card">
      <div className="card-head">
        <div className="card-title"><span className="card-title-icon"><Ic d={IC.edu} /></span> Education</div>
        <button className="btn btn-blue btn-sm" onClick={() => { reset(); setShow(true); }}><Ic d={IC.plus} size={13} /> Add</button>
      </div>
      <div className="card-body">
        {show && (
          <div className="form-box">
            <ErrBox err={err} />
            <div className="form">
              <div className="form-row">
                <div className="field"><label>Degree *</label>
                  <select value={form.degree} onChange={e => set("degree", e.target.value)}>
                    {DEGREE_CHOICES.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                  </select>
                </div>
                <div className="field"><label>Field of Study *</label><input value={form.field_of_study} onChange={e => set("field_of_study", e.target.value)} placeholder="Computer Science" /></div>
              </div>
              <div className="field"><label>Institution *</label><input value={form.institution} onChange={e => set("institution", e.target.value)} placeholder="University / College" /></div>
              <div className="form-row">
                <div className="field"><label>Start Year *</label><input type="number" value={form.start_year} onChange={e => set("start_year", e.target.value)} placeholder="2019" /></div>
                <div className="field"><label>Grade / CGPA</label><input value={form.grade} onChange={e => set("grade", e.target.value)} placeholder="8.5 / 10" /></div>
              </div>
              <div className="form-row">
                {!form.is_current && <div className="field"><label>End Year</label><input type="number" value={form.end_year} onChange={e => set("end_year", e.target.value)} placeholder="2023" /></div>}
                <label className="inline-check"><input type="checkbox" checked={form.is_current} onChange={e => set("is_current", e.target.checked)} />Currently studying</label>
              </div>
              <div className="form-foot">
                <button className="btn btn-teal" onClick={save} disabled={busy}><Ic d={IC.check} size={13} />{busy ? "Saving…" : edit ? "Update" : "Add"}</button>
                <button className="btn btn-ghost" onClick={reset}><Ic d={IC.x} size={13} />Cancel</button>
              </div>
            </div>
          </div>
        )}
        {items.length === 0 && !show ? <div className="empty"><Ic d={IC.edu} size={40} /><p>No education added yet</p></div>
          : <div className="tl">{items.map(item => (
              <div className="tl-item" key={item.id}>
                <div className="tl-left">
                  <div className="tl-title">{item.institution}</div>
                  <div className="tl-sub">{degreeLabel(item.degree)}{item.field_of_study ? ` · ${item.field_of_study}` : ""}</div>
                  <div className="tl-meta">
                    <span>{item.start_year} – {item.is_current ? "Present" : item.end_year || "—"}</span>
                    {item.grade && <span>· {item.grade}</span>}
                    {item.is_current && <span className="badge badge-teal">Current</span>}
                  </div>
                </div>
                <div className="tl-actions">
                  <button className="btn btn-ghost btn-sm" onClick={() => openEdit(item)}><Ic d={IC.edit} size={13} /></button>
                  <button className="btn btn-danger btn-sm" onClick={() => del(item.id)}><Ic d={IC.trash} size={13} /></button>
                </div>
              </div>
            ))}</div>
        }
      </div>
    </div>
  );
}

function ExperienceTab({ candidateId, items, onRefresh, toast }) {
  const blank = { candidate: candidateId, job_title: "", company_name: "", employment_type: "full_time", location: "", start_date: "", end_date: "", is_current: false, description: "", salary: "" };
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState(blank);
  const [err, setErr]   = useState(null);
  const [busy, setBusy] = useState(false);
  const reset    = () => { setForm({ ...blank, candidate: candidateId }); setEdit(null); setShow(false); setErr(null); };
  const openEdit = (item) => { setForm({ ...item, salary: item.salary || "" }); setEdit(item); setShow(true); };
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const save = async () => {
    setBusy(true); setErr(null);
    try {
      const payload = { ...form };
      if (payload.is_current) payload.end_date = null;
      if (!payload.salary) delete payload.salary;
      edit ? await api(`/work-experiences/${edit.id}/`, { method: "PATCH", body: JSON.stringify(payload) })
           : await api("/work-experiences/", { method: "POST", body: JSON.stringify(payload) });
      toast(edit ? "Updated!" : "Added!", "success"); reset(); onRefresh();
    } catch (e) { setErr(e); toast("Save failed", "error"); }
    setBusy(false);
  };
  const del = async (id) => {
    if (!window.confirm("Delete?")) return;
    try { await api(`/work-experiences/${id}/`, { method: "DELETE" }); toast("Deleted!", "success"); onRefresh(); }
    catch { toast("Failed", "error"); }
  };
  const empLabel = (v) => EMP_CHOICES.find(e => e.value === v)?.label || v;
  const fmt = (d) => d ? new Date(d).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : "";
  return (
    <div className="card">
      <div className="card-head">
        <div className="card-title"><span className="card-title-icon"><Ic d={IC.work} /></span> Work Experience</div>
        <button className="btn btn-blue btn-sm" onClick={() => { reset(); setShow(true); }}><Ic d={IC.plus} size={13} /> Add</button>
      </div>
      <div className="card-body">
        {show && (
          <div className="form-box">
            <ErrBox err={err} />
            <div className="form">
              <div className="form-row">
                <div className="field"><label>Job Title *</label><input value={form.job_title} onChange={e => set("job_title", e.target.value)} placeholder="Software Engineer" /></div>
                <div className="field"><label>Company Name *</label><input value={form.company_name} onChange={e => set("company_name", e.target.value)} placeholder="Company Ltd." /></div>
              </div>
              <div className="form-row">
                <div className="field"><label>Employment Type</label>
                  <select value={form.employment_type} onChange={e => set("employment_type", e.target.value)}>
                    {EMP_CHOICES.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
                  </select>
                </div>
                <div className="field"><label>Location</label><input value={form.location} onChange={e => set("location", e.target.value)} placeholder="Bangalore" /></div>
              </div>
              <div className="form-row">
                <div className="field"><label>Start Date *</label><input type="date" value={form.start_date} onChange={e => set("start_date", e.target.value)} /></div>
                {!form.is_current && <div className="field"><label>End Date</label><input type="date" value={form.end_date} onChange={e => set("end_date", e.target.value)} /></div>}
              </div>
              <label className="inline-check" style={{ paddingTop: 0 }}>
                <input type="checkbox" checked={form.is_current} onChange={e => set("is_current", e.target.checked)} />I currently work here
              </label>
              <div className="field"><label>Salary (₹/yr)</label><input type="number" value={form.salary} onChange={e => set("salary", e.target.value)} placeholder="800000" /></div>
              <div className="field"><label>Description</label><textarea value={form.description} onChange={e => set("description", e.target.value)} placeholder="Describe your role…" /></div>
              <div className="form-foot">
                <button className="btn btn-teal" onClick={save} disabled={busy}><Ic d={IC.check} size={13} />{busy ? "Saving…" : edit ? "Update" : "Add"}</button>
                <button className="btn btn-ghost" onClick={reset}><Ic d={IC.x} size={13} />Cancel</button>
              </div>
            </div>
          </div>
        )}
        {items.length === 0 && !show ? <div className="empty"><Ic d={IC.work} size={40} /><p>No experience added yet</p></div>
          : <div className="tl">{items.map(item => (
              <div className="tl-item" key={item.id}>
                <div className="tl-left">
                  <div className="tl-title">{item.job_title}</div>
                  <div className="tl-sub">{item.company_name}{item.location ? ` · ${item.location}` : ""}</div>
                  <div className="tl-meta">
                    <span>{fmt(item.start_date)} – {item.is_current ? "Present" : fmt(item.end_date)}</span>
                    <span className="badge badge-blue">{empLabel(item.employment_type)}</span>
                    {item.is_current && <span className="badge badge-teal">Current</span>}
                    {item.salary && <span style={{ color: "var(--teal)", fontWeight: 700 }}>₹{Number(item.salary).toLocaleString("en-IN")}/yr</span>}
                  </div>
                  {item.description && <div className="tl-desc">{item.description}</div>}
                </div>
                <div className="tl-actions">
                  <button className="btn btn-ghost btn-sm" onClick={() => openEdit(item)}><Ic d={IC.edit} size={13} /></button>
                  <button className="btn btn-danger btn-sm" onClick={() => del(item.id)}><Ic d={IC.trash} size={13} /></button>
                </div>
              </div>
            ))}</div>
        }
      </div>
    </div>
  );
}

function SkillsTab({ candidateId, items, onRefresh, toast }) {
  const [name, setName] = useState("");
  const [prof, setProf] = useState("intermediate");
  const [yoe, setYoe]   = useState(0);
  const [busy, setBusy] = useState(false);
  const add = async () => {
    if (!name.trim()) return; setBusy(true);
    try {
      await api("/skills/", { method: "POST", body: JSON.stringify({ candidate: candidateId, skill_name: name.trim(), proficiency: prof, years_of_experience: Number(yoe) }) });
      setName(""); setYoe(0); toast("Skill added!", "success"); onRefresh();
    } catch (e) { toast(e?.non_field_errors?.[0] || "Failed", "error"); }
    setBusy(false);
  };
  const del = async (id) => {
    try { await api(`/skills/${id}/`, { method: "DELETE" }); toast("Removed!", "success"); onRefresh(); }
    catch { toast("Failed", "error"); }
  };
  const profLabel = (v) => PROF_CHOICES.find(p => p.value === v)?.label || v;
  return (
    <div className="card">
      <div className="card-head">
        <div className="card-title"><span className="card-title-icon"><Ic d={IC.skill} /></span> Skills</div>
        <span style={{ fontSize: ".75rem", color: "var(--muted)", fontWeight: 600 }}>{items.length} skills</span>
      </div>
      <div className="card-body">
        {items.length === 0 ? <div className="empty"><Ic d={IC.star} size={40} /><p>No skills added yet</p></div>
          : <div className="skills-wrap">{items.map(s => (
              <span className="skill-chip" key={s.id}>
                {s.skill_name}
                <span className="skill-chip-prof">· {profLabel(s.proficiency)}</span>
                {s.years_of_experience > 0 && <span className="skill-chip-prof">{s.years_of_experience}y</span>}
                <button className="skill-del" onClick={() => del(s.id)}><Ic d={IC.x} size={11} /></button>
              </span>
            ))}</div>
        }
        <div className="skill-add-row">
          <div className="field" style={{ flex: 2 }}><label>Skill Name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="React, Python…" onKeyDown={e => e.key === "Enter" && add()} />
          </div>
          <div className="field"><label>Proficiency</label>
            <select value={prof} onChange={e => setProf(e.target.value)}>
              {PROF_CHOICES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>
          <div className="field" style={{ width: 80 }}><label>Yrs</label>
            <input type="number" min="0" value={yoe} onChange={e => setYoe(e.target.value)} />
          </div>
          <button className="btn btn-teal" style={{ alignSelf: "flex-end" }} onClick={add} disabled={busy}>
            <Ic d={IC.plus} size={14} />{busy ? "…" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ResumesTab({ candidateId, items, onRefresh, toast }) {
  const [uploading, setUploading] = useState(false);
  const upload = async (e) => {
    const file = e.target.files[0]; if (!file) return; setUploading(true);
    const fd = new FormData();
    fd.append("file", file); fd.append("title", file.name.replace(/\.[^.]+$/, "")); fd.append("candidate", candidateId);
    try { await api("/resumes/", { method: "POST", body: fd }); toast("Uploaded!", "success"); onRefresh(); }
    catch { toast("Upload failed", "error"); }
    setUploading(false); e.target.value = "";
  };
  const setDefault = async (id) => {
    try { await api(`/resumes/${id}/set-default/`, { method: "PATCH" }); toast("Set as default!", "success"); onRefresh(); }
    catch { toast("Failed", "error"); }
  };
  const del = async (id) => {
    if (!window.confirm("Delete?")) return;
    try { await api(`/resumes/${id}/`, { method: "DELETE" }); toast("Deleted!", "success"); onRefresh(); }
    catch { toast("Failed", "error"); }
  };
  return (
    <div className="card">
      <div className="card-head">
        <div className="card-title"><span className="card-title-icon"><Ic d={IC.resume} /></span> Resumes</div>
        <span style={{ fontSize: ".75rem", color: "var(--muted)", fontWeight: 600 }}>{items.length} files</span>
      </div>
      <div className="card-body">
        {items.length > 0 && (
          <div className="resume-list">{items.map(r => (
            <div className="resume-item" key={r.id}>
              <div>
                <div className="resume-name">
                  <Ic d={IC.file} size={15} style={{ color: "var(--blue)" }} />
                  {r.title || r.file?.split("/").pop() || "Resume"}
                  {r.is_default && <span className="badge badge-teal">Default</span>}
                </div>
                {r.created_at && <div className="resume-date">{new Date(r.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</div>}
              </div>
              <div className="resume-actions">
                {r.file && <a className="btn btn-ghost btn-sm" href={`${BASE}${r.file}`} target="_blank" rel="noreferrer">View</a>}
                {!r.is_default && <button className="btn btn-ghost btn-sm" onClick={() => setDefault(r.id)}><Ic d={IC.star} size={12} /> Default</button>}
                <button className="btn btn-danger btn-sm" onClick={() => del(r.id)}><Ic d={IC.trash} size={13} /></button>
              </div>
            </div>
          ))}</div>
        )}
        <label className="drop-zone">
          <input type="file" accept=".pdf,.doc,.docx" onChange={upload} disabled={uploading} />
          <div style={{ color: "var(--blue)" }}><Ic d={IC.upload} size={28} /></div>
          <p>{uploading ? "Uploading…" : "Click to upload — PDF, DOC, DOCX (max 10MB)"}</p>
        </label>
      </div>
    </div>
  );
}

export default function CandidateProfile() {
  const [tab, setTab]         = useState("profile");
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [education, setEdu]   = useState([]);
  const [experience, setExp]  = useState([]);
  const [skills, setSkills]   = useState([]);
  const [resumes, setResumes] = useState([]);
  const [toast, setToast]     = useState(null);
  const showToast = useCallback((msg, type = "success") => setToast({ msg, type }), []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const cList = await api("/candidates/");
      const candidates = cList?.results ?? (Array.isArray(cList) ? cList : []);
      const p = candidates[0] || null;
      setProfile(p);
      if (p) {
        const id = p.id;
        const [edu, exp, sk, res] = await Promise.allSettled([
          api(`/educations/?candidate=${id}`),
          api(`/work-experiences/?candidate=${id}`),
          api(`/skills/?candidate=${id}`),
          api(`/resumes/?candidate=${id}`),
        ]);
        const unwrap = r => r.status === "fulfilled" ? (r.value?.results ?? r.value ?? []) : [];
        setEdu(unwrap(edu)); setExp(unwrap(exp)); setSkills(unwrap(sk)); setResumes(unwrap(res));
      }
    } catch (e) { console.error(e); }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const tabs = [
    { key: "profile",    label: "Profile",    icon: IC.user,   count: null },
    { key: "education",  label: "Education",  icon: IC.edu,    count: education.length },
    { key: "experience", label: "Experience", icon: IC.work,   count: experience.length },
    { key: "skills",     label: "Skills",     icon: IC.skill,  count: skills.length },
    { key: "resumes",    label: "Resumes",    icon: IC.resume, count: resumes.length },
  ];

  const initials = profile?.full_name
    ? profile.full_name.trim().split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
    : "?";
  const imgSrc = profile?.profile_image ? `${BASE}${profile.profile_image}` : null;

  return (
    <>
      <style>{S}</style>
      <div className="shell">
        <header className="topbar">
          <div className="topbar-brand">Job<span>Portal</span></div>
          <div className="topbar-right">
            <span className="topbar-name">{profile?.full_name || "My Account"}</span>
            {imgSrc ? <img src={imgSrc} alt="avatar" className="topbar-av" /> : <div className="topbar-av-ph">{initials}</div>}
          </div>
        </header>

        {loading ? (
          <div className="loader"><div className="spinner" /><span>Loading profile…</span></div>
        ) : (
          <div className="layout">
            <aside className="sidebar">
              <div className="sb-hero">
                <div className="sb-cover" />
                <div className="sb-av-wrap">
                  {imgSrc ? <img src={imgSrc} alt="Profile" className="sb-av-img" /> : <div className="sb-av-ph">{initials}</div>}
                </div>
              </div>
              <div className="sb-info">
                <div className="sb-name">{profile?.full_name || "Your Name"}</div>
                {profile?.headline && <div className="sb-headline">{profile.headline}</div>}
                <div className="sb-meta">
                  {profile?.phone    && <div className="sb-meta-row"><Ic d={IC.phone} size={12} /><strong>{profile.phone}</strong></div>}
                  {profile?.location && <div className="sb-meta-row"><Ic d={IC.pin} size={12} /><strong>{profile.location}</strong></div>}
                  {profile?.experience_years > 0 && <div className="sb-meta-row"><Ic d={IC.work} size={12} /><strong>{profile.experience_years} yrs exp</strong></div>}
                  {(profile?.current_salary || profile?.expected_salary) && (
                    <div className="sb-meta-row">
                      <Ic d={IC.money} size={12} />
                      <strong>
                        {profile.current_salary ? `₹${Number(profile.current_salary).toLocaleString("en-IN")}` : "—"}
                        {" → "}
                        {profile.expected_salary ? `₹${Number(profile.expected_salary).toLocaleString("en-IN")}` : "—"}
                      </strong>
                    </div>
                  )}
                </div>
                {skills.length > 0 && (
                  <div className="sb-chips">
                    {skills.slice(0, 5).map(s => <span className="sb-chip" key={s.id}>{s.skill_name}</span>)}
                    {skills.length > 5 && <span className="sb-chip">+{skills.length - 5}</span>}
                  </div>
                )}
              </div>
              <nav className="nav">
                {tabs.map(t => (
                  <button key={t.key} className={`nav-item ${tab === t.key ? "active" : ""}`} onClick={() => setTab(t.key)}>
                    <Ic d={t.icon} size={15} />{t.label}
                    {t.count !== null && <span className="nav-dot">{t.count}</span>}
                  </button>
                ))}
              </nav>
            </aside>

            <main className="main">
              {tab === "profile"    && <ProfileTab    profile={profile} candidateId={profile?.id} onSaved={(p) => { setProfile(p); load(); }} toast={showToast} />}
              {tab === "education"  && profile?.id && <EducationTab  candidateId={profile.id} items={education}  onRefresh={load} toast={showToast} />}
              {tab === "experience" && profile?.id && <ExperienceTab candidateId={profile.id} items={experience} onRefresh={load} toast={showToast} />}
              {tab === "skills"     && profile?.id && <SkillsTab     candidateId={profile.id} items={skills}     onRefresh={load} toast={showToast} />}
              {tab === "resumes"    && profile?.id && <ResumesTab    candidateId={profile.id} items={resumes}    onRefresh={load} toast={showToast} />}
              {!profile?.id && tab !== "profile" && (
                <div className="card"><div className="card-body">
                  <div className="empty"><Ic d={IC.user} size={40} /><p>Save your profile first to add {tab}.</p></div>
                </div></div>
              )}
            </main>
          </div>
        )}
        {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </>
  );
}