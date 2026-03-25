import React, { useState, useRef } from 'react';

const CoverLetterEditor = () => {
  const [activeTab, setActiveTab] = useState('rich');
  const [content, setContent] = useState(
    `Dear Hiring Manager,\n\nI am writing to express my enthusiastic interest in the [Job Title] position at [Company Name]. With a proven track record in [Key Skill/Industry], I am confident that my skills and dedication make me an ideal candidate for your team...`
  );
  const [dragOver, setDragOver] = useState(false);
  const editorRef = useRef(null);

  const execCmd = (cmd, value = null) => {
    document.execCommand(cmd, false, value);
    editorRef.current?.focus();
  };

  const toolbarBtns = [
    { label: 'B', cmd: 'bold', style: { fontWeight: 700 } },
    { label: 'I', cmd: 'italic', style: { fontStyle: 'italic' } },
    { label: '≡', cmd: 'insertUnorderedList', style: {} },
    { label: '🔗', cmd: 'createLink', style: {} },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        .btn-primary { background: #137FEC; border: none; border-radius: 8px; font-family: 'Inter',sans-serif; font-size: 16px; font-weight: 700; color: #fff; cursor: pointer; padding: 12px 32px; gap: 8px; display: flex; align-items: center; box-shadow: 0px 10px 15px -3px rgba(19,127,236,0.2), 0px 4px 6px -4px rgba(19,127,236,0.2); transition: background 0.2s; white-space: nowrap; }
        .btn-primary:hover { background: #0e6fd4; }
        .btn-back { background: #fff; border: 1px solid #E2E8F0; border-radius: 8px; font-family: 'Inter',sans-serif; font-size: 16px; font-weight: 700; color: #475569; cursor: pointer; padding: 12px 24px; display: flex; align-items: center; gap: 8px; transition: background 0.2s; }
        .btn-back:hover { background: #F8FAFC; }
        .btn-save { background: #137FEC; border: none; border-radius: 8px; font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 700; color: #fff; cursor: pointer; padding: 8px 24px; box-shadow: 0px 1px 2px rgba(0,0,0,0.05); transition: background 0.2s; }
        .btn-save:hover { background: #0e6fd4; }
        .btn-clear { background: none; border: none; font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 600; color: #475569; cursor: pointer; padding: 8px 16px; transition: color 0.15s; }
        .btn-clear:hover { color: #0F172A; }
        .toolbar-btn { background: none; border: none; border-radius: 4px; cursor: pointer; padding: 8px; color: #64748B; font-family: 'Inter',sans-serif; font-size: 14px; display: flex; align-items: center; justify-content: center; min-width: 28px; height: 30px; transition: background 0.15s; }
        .toolbar-btn:hover { background: #F1F5F9; color: #0F172A; }
        .editor-area { width: 100%; min-height: 320px; padding: 24px; border: none; outline: none; font-family: 'Inter',sans-serif; font-size: 16px; line-height: 26px; color: #6B7280; background: transparent; resize: none; }
        .editor-area:focus { color: #0F172A; }
        [contenteditable]:empty:before { content: attr(data-placeholder); color: #94A3B8; }
        .drop-zone { border: 2px dashed #CBD5E1; border-radius: 8px; background: rgba(255,255,255,0.5); transition: border-color 0.2s, background 0.2s; cursor: pointer; }
        .drop-zone.dragover { border-color: #137FEC; background: rgba(19,127,236,0.04); }
        .drop-zone:hover { border-color: #94A3B8; }
        .tab-btn { flex: 1; display: flex; justify-content: center; align-items: center; gap: 8px; padding: 16px 0; cursor: pointer; font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 700; border: none; background: none; transition: background 0.15s; }
      `}</style>

      {/* HEADER */}
      <header style={{
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
        padding: '16px 80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: 40, height: 40, background: '#137FEC', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
          }}>📄</div>
          <span style={{ fontWeight: 700, fontSize: '18px', letterSpacing: '-0.45px', color: '#0F172A' }}>CareerFlow</span>
        </div>
        <button style={{
          width: 40, height: 40, background: '#F1F5F9', border: 'none', borderRadius: '8px',
          cursor: 'pointer', fontSize: '16px', color: '#475569',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>✕</button>
      </header>

      {/* MAIN */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 0 6px' }}>
        <div style={{ width: '896px', maxWidth: '100%', position: 'relative', paddingBottom: '80px' }}>

          {/* PROGRESS STEPPER */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '48px 16px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#137FEC' }}>Step 3 of 4</span>
              <span style={{ fontSize: '14px', fontWeight: 500, color: '#64748B' }}>75% Complete</span>
            </div>
            <div style={{ position: 'relative', height: 8, background: '#E2E8F0', borderRadius: '9999px', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '75%', background: '#137FEC', borderRadius: '9999px' }} />
            </div>
            <p style={{ fontSize: '14px', color: '#64748B', paddingTop: '4px' }}>Content &amp; Final Touches</p>
          </div>

          {/* PAGE HEADING */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '40px 16px 0' }}>
            <h1 style={{ fontSize: '30px', fontWeight: 700, color: '#0F172A', lineHeight: '36px' }}>Write your cover letter</h1>
            <p style={{ fontSize: '16px', color: '#475569', lineHeight: '24px' }}>
              Personalize your application with a compelling story or upload your existing document.
            </p>
          </div>

          {/* EDITOR CARD */}
          <div style={{
            margin: '32px 16px 0',
            background: '#FFFFFF', border: '1px solid #E2E8F0',
            boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: '12px',
            overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '24px',
            paddingBottom: '24px',
          }}>

            {/* TAB BAR */}
            <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0' }}>
              <button
                className="tab-btn"
                style={{
                  color: activeTab === 'rich' ? '#137FEC' : '#64748B',
                  background: activeTab === 'rich' ? 'rgba(19,127,236,0.05)' : 'transparent',
                  borderBottom: activeTab === 'rich' ? '2px solid #137FEC' : '2px solid transparent',
                  marginBottom: '-1px',
                }}
                onClick={() => setActiveTab('rich')}
              >
                <span style={{ fontSize: '14px' }}>✏️</span>
                <span>Rich Text Editor</span>
              </button>
              <button
                className="tab-btn"
                style={{
                  color: activeTab === 'upload' ? '#137FEC' : '#64748B',
                  background: activeTab === 'upload' ? 'rgba(19,127,236,0.05)' : 'transparent',
                  borderBottom: activeTab === 'upload' ? '2px solid #137FEC' : '2px solid transparent',
                  marginBottom: '-1px',
                }}
                onClick={() => setActiveTab('upload')}
              >
                <span style={{ fontSize: '14px' }}>📁</span>
                <span>Upload File</span>
              </button>
            </div>

            {activeTab === 'rich' ? (
              /* RICH TEXT EDITOR */
              <div style={{
                margin: '0 24px',
                background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px',
                display: 'flex', flexDirection: 'column', overflow: 'hidden',
              }}>
                {/* Email header */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '16px',
                  padding: '16px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0',
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%', background: '#F1F5F9',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '16px', color: '#94A3B8', flexShrink: 0,
                  }}>👤</div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A' }}>Alex Johnson</p>
                    <p style={{ fontSize: '12px', color: '#64748B' }}>To: Hiring Manager</p>
                  </div>
                </div>

                {/* Editable text area */}
                <div
                  ref={editorRef}
                  contentEditable
                  suppressContentEditableWarning
                  data-placeholder="Start writing your cover letter..."
                  className="editor-area"
                  style={{ minHeight: '320px', padding: '24px 24px 246px' }}
                  onInput={e => setContent(e.currentTarget.innerText)}
                  dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }}
                />

                {/* Toolbar */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px', background: '#FFFFFF', borderTop: '1px solid #E2E8F0',
                }}>
                  {/* Formatting buttons */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <button className="toolbar-btn" style={{ fontWeight: 700 }} onClick={() => execCmd('bold')}>B</button>
                    <button className="toolbar-btn" style={{ fontStyle: 'italic' }} onClick={() => execCmd('italic')}>I</button>
                    <button className="toolbar-btn" onClick={() => execCmd('insertUnorderedList')}>≡</button>
                    <button className="toolbar-btn" onClick={() => {
                      const url = prompt('Enter URL:');
                      if (url) execCmd('createLink', url);
                    }}>🔗</button>
                    {/* Divider */}
                    <div style={{ width: 1, height: 24, background: '#E2E8F0', margin: '0 4px' }} />
                    {/* AI sparkle */}
                    <button className="toolbar-btn" title="AI Assist">✨</button>
                  </div>

                  {/* Right actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button className="btn-clear" onClick={() => {
                      if (editorRef.current) editorRef.current.innerHTML = '';
                      setContent('');
                    }}>Clear All</button>
                    <button className="btn-save">Save Draft</button>
                  </div>
                </div>
              </div>
            ) : (
              /* UPLOAD FILE TAB */
              <div style={{ margin: '0 24px' }}>
                <div
                  className={`drop-zone${dragOver ? ' dragover' : ''}`}
                  style={{ padding: '60px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={e => { e.preventDefault(); setDragOver(false); }}
                  onClick={() => document.getElementById('cover-upload').click()}
                >
                  <input id="cover-upload" type="file" accept=".pdf,.docx" style={{ display: 'none' }} />
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%', background: '#F1F5F9',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
                  }}>📄</div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>Upload your cover letter</p>
                    <p style={{ fontSize: '14px', color: '#64748B' }}>Drag & drop or click to browse — PDF or DOCX, max 5MB</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* BOTTOM ACTION ROW */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '32px 16px 0',
          }}>
            <button className="btn-back">
              <span>←</span> Back
            </button>
            <button className="btn-primary">
              Next Step: Review <span>→</span>
            </button>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #E2E8F0', padding: '40px 0', display: 'flex', justifyContent: 'center' }}>
        <p style={{ fontSize: '14px', color: '#94A3B8' }}>© 2024 CareerFlow Editor. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CoverLetterEditor;