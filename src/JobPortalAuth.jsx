import { useState } from "react";

const ROLES = ["Job Seeker", "Recruiter"];

const EyeIcon = ({ open }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      </>
    )}
  </svg>
);

const BriefcaseIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    <line x1="12" y1="12" x2="12" y2="12"/>
    <path d="M2 12h20"/>
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#0077B5">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const steps = ["Account Type", "Basic Info", "Security", "Verify"];

function ProgressBar({ current }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 32 }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "none" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              background: i < current ? "#10b981" : i === current ? "#f59e0b" : "rgba(255,255,255,0.1)",
              border: i === current ? "2px solid #f59e0b" : "2px solid transparent",
              color: i <= current ? "#fff" : "rgba(255,255,255,0.3)",
              fontSize: 14, fontWeight: 700, transition: "all 0.3s",
              boxShadow: i === current ? "0 0 16px rgba(245,158,11,0.5)" : "none"
            }}>
              {i < current ? <CheckIcon /> : i + 1}
            </div>
            <span style={{ fontSize: 10, color: i === current ? "#f59e0b" : i < current ? "#10b981" : "rgba(255,255,255,0.3)", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", whiteSpace: "nowrap" }}>
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div style={{ flex: 1, height: 2, background: i < current ? "#10b981" : "rgba(255,255,255,0.1)", margin: "0 8px", marginBottom: 22, transition: "background 0.3s" }} />
          )}
        </div>
      ))}
    </div>
  );
}

function InputField({ label, type = "text", value, onChange, placeholder, icon, extra }) {
  const [showPass, setShowPass] = useState(false);
  const isPass = type === "password";
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>{label}</label>
      <div style={{ position: "relative" }}>
        {icon && <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.35)", pointerEvents: "none" }}>{icon}</span>}
        <input
          type={isPass && showPass ? "text" : type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: "100%", boxSizing: "border-box",
            padding: `14px ${isPass ? 48 : 16}px 14px ${icon ? 44 : 16}px`,
            background: "rgba(255,255,255,0.06)",
            border: "1.5px solid rgba(255,255,255,0.12)",
            borderRadius: 12, color: "#fff", fontSize: 15,
            outline: "none", transition: "border 0.2s, background 0.2s",
            fontFamily: "inherit",
          }}
          onFocus={e => { e.target.style.border = "1.5px solid #f59e0b"; e.target.style.background = "rgba(255,255,255,0.1)"; }}
          onBlur={e => { e.target.style.border = "1.5px solid rgba(255,255,255,0.12)"; e.target.style.background = "rgba(255,255,255,0.06)"; }}
        />
        {isPass && (
          <button type="button" onClick={() => setShowPass(v => !v)}
            style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", padding: 0 }}>
            <EyeIcon open={showPass} />
          </button>
        )}
      </div>
      {extra}
    </div>
  );
}

function OTPInput({ otp, setOtp }) {
  return (
    <div style={{ display: "flex", gap: 12, justifyContent: "center", margin: "24px 0" }}>
      {otp.map((v, i) => (
        <input
          key={i} id={`otp-${i}`}
          maxLength={1} value={v}
          onChange={e => {
            const val = e.target.value.replace(/\D/, "");
            const next = [...otp]; next[i] = val; setOtp(next);
            if (val && i < 5) document.getElementById(`otp-${i + 1}`)?.focus();
          }}
          onKeyDown={e => { if (e.key === "Backspace" && !v && i > 0) document.getElementById(`otp-${i - 1}`)?.focus(); }}
          style={{
            width: 52, height: 60, textAlign: "center", fontSize: 24, fontWeight: 700,
            background: "rgba(255,255,255,0.08)", border: "2px solid rgba(255,255,255,0.15)",
            borderRadius: 12, color: "#fff", outline: "none", fontFamily: "inherit",
            transition: "border 0.2s",
          }}
          onFocus={e => { e.target.style.border = "2px solid #f59e0b"; e.target.style.boxShadow = "0 0 12px rgba(245,158,11,0.3)"; }}
          onBlur={e => { e.target.style.border = "2px solid rgba(255,255,255,0.15)"; e.target.style.boxShadow = "none"; }}
        />
      ))}
    </div>
  );
}

function PasswordStrength({ password }) {
  const checks = [
    { label: "8+ characters", ok: password.length >= 8 },
    { label: "Uppercase", ok: /[A-Z]/.test(password) },
    { label: "Number", ok: /\d/.test(password) },
    { label: "Special char", ok: /[^a-zA-Z0-9]/.test(password) },
  ];
  const score = checks.filter(c => c.ok).length;
  const colors = ["#ef4444", "#f59e0b", "#3b82f6", "#10b981"];
  const labels = ["Weak", "Fair", "Good", "Strong"];
  if (!password) return null;
  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i < score ? colors[score-1] : "rgba(255,255,255,0.1)", transition: "background 0.3s" }} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {checks.map((c, i) => (
            <span key={i} style={{ fontSize: 11, color: c.ok ? "#10b981" : "rgba(255,255,255,0.3)", display: "flex", alignItems: "center", gap: 3 }}>
              <span style={{ fontSize: 10 }}>{c.ok ? "✓" : "○"}</span> {c.label}
            </span>
          ))}
        </div>
        <span style={{ fontSize: 12, fontWeight: 700, color: colors[score - 1] || "rgba(255,255,255,0.3)" }}>{score > 0 ? labels[score-1] : ""}</span>
      </div>
    </div>
  );
}

// ─── REGISTER FLOW ────────────────────────────────────────────────────────────
function RegisterForm({ onSwitch }) {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState("");
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", password: "", confirm: "" });
  const [otp, setOtp] = useState(["","","","","",""]);
  const [agree, setAgree] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }));

  if (success) return (
    <div style={{ textAlign: "center", padding: "40px 0" }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#f59e0b", marginBottom: 12 }}>Welcome Aboard!</h2>
      <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 28 }}>Your account has been created successfully as a <strong style={{ color: "#fff" }}>{role}</strong>.</p>
      <button onClick={onSwitch} style={btnStyle("#f59e0b", "#1a1a2e")}>Sign In Now</button>
    </div>
  );

  return (
    <div>
      <ProgressBar current={step} />

      {step === 0 && (
        <div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#fff", marginBottom: 8 }}>I am a...</h3>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, marginBottom: 28 }}>Choose your account type to get started</p>
          <div style={{ display: "flex", gap: 16, marginBottom: 32 }}>
            {[
              { r: "Job Seeker", icon: "🔍", desc: "Find your dream job" },
              { r: "Recruiter", icon: "🏢", desc: "Hire top talent" },
            ].map(({ r, icon, desc }) => (
              <div key={r} onClick={() => setRole(r)} style={{
                flex: 1, padding: "24px 16px", borderRadius: 16, cursor: "pointer", textAlign: "center",
                background: role === r ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.05)",
                border: role === r ? "2px solid #f59e0b" : "2px solid rgba(255,255,255,0.1)",
                transition: "all 0.2s",
                boxShadow: role === r ? "0 0 24px rgba(245,158,11,0.2)" : "none",
              }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>{icon}</div>
                <div style={{ fontWeight: 700, color: role === r ? "#f59e0b" : "#fff", fontSize: 16, marginBottom: 6 }}>{r}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{desc}</div>
              </div>
            ))}
          </div>
          <button onClick={() => role && setStep(1)} style={btnStyle(role ? "#f59e0b" : "rgba(255,255,255,0.15)", role ? "#1a1a2e" : "rgba(255,255,255,0.3)", !role)}>
            Continue →
          </button>
        </div>
      )}

      {step === 1 && (
        <div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#fff", marginBottom: 24 }}>Basic Information</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <InputField label="First Name" value={form.firstName} onChange={set("firstName")} placeholder="John" icon={<span style={{fontSize:16}}>👤</span>} />
            <InputField label="Last Name" value={form.lastName} onChange={set("lastName")} placeholder="Doe" />
          </div>
          <InputField label="Email Address" type="email" value={form.email} onChange={set("email")} placeholder="john@example.com" icon={<span style={{fontSize:16}}>✉️</span>} />
          <InputField label="Phone Number" type="tel" value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" icon={<span style={{fontSize:16}}>📱</span>} />
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <button onClick={() => setStep(0)} style={ghostBtn}>← Back</button>
            <button onClick={() => form.firstName && form.email && setStep(2)} style={{ ...btnStyle("#f59e0b", "#1a1a2e"), flex: 1 }}>Continue →</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#fff", marginBottom: 24 }}>Secure Your Account</h3>
          <InputField label="Password" type="password" value={form.password} onChange={set("password")} placeholder="Create a strong password"
            extra={<PasswordStrength password={form.password} />} />
          <InputField label="Confirm Password" type="password" value={form.confirm} onChange={set("confirm")} placeholder="Repeat your password"
            extra={form.confirm && form.confirm !== form.password ? <p style={{ color: "#ef4444", fontSize: 12, marginTop: 6 }}>Passwords don't match</p> : null} />
          <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", marginBottom: 24, marginTop: 4 }}>
            <div onClick={() => setAgree(v => !v)} style={{
              width: 20, height: 20, borderRadius: 5, border: `2px solid ${agree ? "#f59e0b" : "rgba(255,255,255,0.3)"}`,
              background: agree ? "#f59e0b" : "transparent", display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, marginTop: 1, transition: "all 0.2s", cursor: "pointer"
            }}>
              {agree && <CheckIcon />}
            </div>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>
              I agree to the <span style={{ color: "#f59e0b", cursor: "pointer" }}>Terms of Service</span> and <span style={{ color: "#f59e0b", cursor: "pointer" }}>Privacy Policy</span>
            </span>
          </label>
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => setStep(1)} style={ghostBtn}>← Back</button>
            <button onClick={() => agree && form.password === form.confirm && form.password.length >= 8 && setStep(3)}
              style={{ ...btnStyle(agree && form.password === form.confirm && form.password.length >= 8 ? "#f59e0b" : "rgba(255,255,255,0.15)", agree && form.password === form.confirm && form.password.length >= 8 ? "#1a1a2e" : "rgba(255,255,255,0.3)"), flex: 1 }}>
              Send OTP →
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📨</div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#fff", marginBottom: 8 }}>Verify Your Email</h3>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, marginBottom: 4 }}>We've sent a 6-digit code to</p>
          <p style={{ color: "#f59e0b", fontWeight: 700, marginBottom: 4 }}>{form.email || "your email"}</p>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, marginBottom: 8 }}>Check your inbox and enter the code below</p>
          <OTPInput otp={otp} setOtp={setOtp} />
          <button onClick={() => otp.join("").length === 6 && setSuccess(true)}
            style={btnStyle(otp.join("").length === 6 ? "#f59e0b" : "rgba(255,255,255,0.1)", otp.join("").length === 6 ? "#1a1a2e" : "rgba(255,255,255,0.3)", otp.join("").length < 6)}>
            Verify & Create Account
          </button>
          <p style={{ marginTop: 16, fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
            Didn't receive it? <span style={{ color: "#f59e0b", cursor: "pointer" }} onClick={() => setOtp(["","","","","",""])}>Resend Code</span>
          </p>
          <button onClick={() => setStep(2)} style={{ ...ghostBtn, marginTop: 12 }}>← Back</button>
        </div>
      )}
    </div>
  );
}

// ─── LOGIN FORM ───────────────────────────────────────────────────────────────
function LoginForm({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setError(""); setLoading(true);
    setTimeout(() => { setLoading(false); setError("Invalid credentials. Please try again."); }, 1400);
  };

  if (forgot) return (
    <div>
      {forgotSent ? (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ fontSize: 52, marginBottom: 12 }}>📬</div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#f59e0b", marginBottom: 8 }}>Check Your Inbox</h3>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, marginBottom: 24 }}>Reset link sent to <strong style={{ color: "#fff" }}>{forgotEmail}</strong></p>
          <button onClick={() => { setForgot(false); setForgotSent(false); }} style={ghostBtn}>← Back to Login</button>
        </div>
      ) : (
        <div>
          <button onClick={() => setForgot(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", padding: 0, fontSize: 13, marginBottom: 20, display: "flex", alignItems: "center", gap: 6 }}>
            ← Back to Login
          </button>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#fff", marginBottom: 8 }}>Reset Password</h3>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, marginBottom: 24 }}>Enter your registered email and we'll send you a reset link.</p>
          <InputField label="Email Address" type="email" value={forgotEmail} onChange={setForgotEmail} placeholder="you@example.com" icon={<span style={{fontSize:16}}>✉️</span>} />
          <button onClick={() => forgotEmail && setForgotSent(true)} style={btnStyle(forgotEmail ? "#f59e0b" : "rgba(255,255,255,0.15)", forgotEmail ? "#1a1a2e" : "rgba(255,255,255,0.3)")}>
            Send Reset Link
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <InputField label="Email Address" type="email" value={email} onChange={e => { setEmail(e); setError(""); }} placeholder="you@example.com" icon={<span style={{fontSize:16}}>✉️</span>} />
      <InputField label="Password" type="password" value={password} onChange={e => { setPassword(e); setError(""); }} placeholder="Enter your password" />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, marginTop: -4 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <div onClick={() => setRemember(v => !v)} style={{
            width: 18, height: 18, borderRadius: 4, border: `2px solid ${remember ? "#f59e0b" : "rgba(255,255,255,0.25)"}`,
            background: remember ? "#f59e0b" : "transparent", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s", cursor: "pointer", flexShrink: 0
          }}>
            {remember && <CheckIcon />}
          </div>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Remember me</span>
        </label>
        <span onClick={() => setForgot(true)} style={{ fontSize: 13, color: "#f59e0b", cursor: "pointer", fontWeight: 600 }}>Forgot password?</span>
      </div>

      {error && <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "10px 14px", color: "#ef4444", fontSize: 13, marginBottom: 16 }}>⚠️ {error}</div>}

      <button onClick={handleLogin} style={{ ...btnStyle("#f59e0b", "#1a1a2e"), opacity: loading ? 0.8 : 1 }} disabled={loading}>
        {loading ? (
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <span style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(0,0,0,0.2)", borderTopColor: "#1a1a2e", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
            Signing In...
          </span>
        ) : "Sign In"}
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontWeight: 600, letterSpacing: 1 }}>OR CONTINUE WITH</span>
        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        {[
          { icon: <GoogleIcon />, label: "Google" },
          { icon: <LinkedInIcon />, label: "LinkedIn" },
        ].map(({ icon, label }) => (
          <button key={label} style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            padding: "12px", borderRadius: 12, background: "rgba(255,255,255,0.06)",
            border: "1.5px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: 14, fontWeight: 600,
            cursor: "pointer", transition: "background 0.2s, border 0.2s", fontFamily: "inherit"
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.border = "1.5px solid rgba(255,255,255,0.25)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.border = "1.5px solid rgba(255,255,255,0.12)"; }}>
            {icon} {label}
          </button>
        ))}
      </div>
    </div>
  );
}

const btnStyle = (bg, color, disabled = false) => ({
  width: "100%", padding: "15px", borderRadius: 12, background: bg, color: color,
  border: "none", fontSize: 15, fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer",
  letterSpacing: 0.5, transition: "all 0.2s", fontFamily: "inherit",
  boxShadow: bg === "#f59e0b" ? "0 4px 20px rgba(245,158,11,0.3)" : "none",
});

const ghostBtn = {
  padding: "14px 20px", borderRadius: 12, background: "rgba(255,255,255,0.06)",
  border: "1.5px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)",
  fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function JobPortalAuth() {
  const [view, setView] = useState("login"); // "login" | "register"

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #0f0c29 0%, #1a1a3e 40%, #0f0c29 100%)",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif", padding: "24px 16px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Animated background blobs */}
      <div style={{ position: "fixed", top: "-20%", right: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "-20%", left: "-10%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", top: "40%", left: "20%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700;800&display=swap');
        * { box-sizing: border-box; }
        input::placeholder { color: rgba(255,255,255,0.2); }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>

      <div style={{ display: "flex", width: "100%", maxWidth: 960, minHeight: 580, borderRadius: 24, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.6)", animation: "fadeIn 0.5s ease" }}>

        {/* ── Left Panel ── */}
        <div style={{
          flex: "0 0 380px", background: "linear-gradient(160deg, #1e1b4b 0%, #312e81 50%, #1e3a5f 100%)",
          padding: "48px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between",
          position: "relative", overflow: "hidden",
        }}>
          {/* decorative circles */}
          <div style={{ position: "absolute", top: -60, right: -60, width: 220, height: 220, borderRadius: "50%", border: "40px solid rgba(245,158,11,0.08)" }} />
          <div style={{ position: "absolute", bottom: -40, left: -40, width: 180, height: 180, borderRadius: "50%", border: "30px solid rgba(255,255,255,0.05)" }} />

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
              <div style={{ color: "#f59e0b" }}><BriefcaseIcon /></div>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#fff", fontWeight: 800, letterSpacing: -0.5 }}>TalentBridge</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, color: "#fff", lineHeight: 1.2, marginBottom: 16, fontWeight: 800 }}>
              {view === "login" ? "Welcome\nBack." : "Start Your\nJourney."}
            </h1>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, lineHeight: 1.7 }}>
              {view === "login"
                ? "Sign in to access your personalized job feed, track applications, and connect with top employers."
                : "Join thousands of job seekers and recruiters building meaningful careers every day."}
            </p>
          </div>

          <div>
            {[
              { emoji: "🏢", stat: "50K+", label: "Companies Hiring" },
              { emoji: "💼", stat: "200K+", label: "Active Jobs" },
              { emoji: "✅", stat: "1M+", label: "Placements Made" },
            ].map(({ emoji, stat, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{emoji}</div>
                <div>
                  <div style={{ fontWeight: 800, color: "#f59e0b", fontSize: 18, lineHeight: 1 }}>{stat}</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 2 }}>{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div style={{ flex: 1, background: "#13111d", padding: "48px 44px", overflowY: "auto", animation: "slideIn 0.4s ease" }} key={view}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#fff", margin: 0, fontWeight: 800 }}>
                {view === "login" ? "Sign In" : "Create Account"}
              </h2>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, marginTop: 6 }}>
                {view === "login" ? "Don't have an account?" : "Already have an account?"}
                {" "}<span onClick={() => setView(view === "login" ? "register" : "login")} style={{ color: "#f59e0b", cursor: "pointer", fontWeight: 700 }}>
                  {view === "login" ? "Sign up free" : "Sign in"}
                </span>
              </p>
            </div>
          </div>

          {view === "login"
            ? <LoginForm onSwitch={() => setView("register")} />
            : <RegisterForm onSwitch={() => setView("login")} />
          }
        </div>
      </div>
    </div>
  );
}
