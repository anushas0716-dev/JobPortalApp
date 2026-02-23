import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { interviewAPI } from '../services/api';

const ScheduleInterview = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('online');
  const [form, setForm] = useState({
    applicationId: '',
    jobId: '',
    jobTitle: '',
    companyName: '',
    candidate: { id: '', name: '', email: '', phone: '' },
    scheduledDate: '',
    scheduledTime: '',
    duration: 60,
    mode: 'online',
    meetingLink: '',
    meetingPlatform: 'zoom',
    location: { address: '', city: '', state: '', pincode: '' },
    interviewRound: 'screening',
    interviewers: [{ name: '', email: '', designation: '' }],
    notes: ''
  });

  const update = (path, value) => {
    setForm(prev => {
      const updated = { ...prev };
      const keys = path.split('.');
      let obj = updated;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const addInterviewer = () => {
    setForm(prev => ({ ...prev, interviewers: [...prev.interviewers, { name: '', email: '', designation: '' }] }));
  };

  const removeInterviewer = (idx) => {
    setForm(prev => ({ ...prev, interviewers: prev.interviewers.filter((_, i) => i !== idx) }));
  };

  const updateInterviewer = (idx, field, value) => {
    setForm(prev => {
      const interviewers = [...prev.interviewers];
      interviewers[idx] = { ...interviewers[idx], [field]: value };
      return { ...prev, interviewers };
    });
  };

  const handleModeChange = (m) => {
    setMode(m);
    setForm(prev => ({ ...prev, mode: m }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, mode };
      await interviewAPI.schedule(payload);
      toast.success('Interview scheduled! Invitation email sent to candidate.');
      navigate('/interviews');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to schedule interview');
    } finally {
      setLoading(false);
    }
  };

  const Section = ({ title, children }) => (
    <div className="card mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">{title}</h2>
      {children}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-700">← Back</button>
        <h1 className="text-2xl font-bold text-gray-900">Schedule Interview</h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Job Details */}
        <Section title="📋 Job & Application Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Application ID *</label>
              <input className="form-input" placeholder="APP-001" value={form.applicationId}
                onChange={e => update('applicationId', e.target.value)} required />
            </div>
            <div>
              <label className="form-label">Job ID *</label>
              <input className="form-input" placeholder="JOB-001" value={form.jobId}
                onChange={e => update('jobId', e.target.value)} required />
            </div>
            <div>
              <label className="form-label">Job Title *</label>
              <input className="form-input" placeholder="Senior Developer" value={form.jobTitle}
                onChange={e => update('jobTitle', e.target.value)} required />
            </div>
            <div>
              <label className="form-label">Company Name *</label>
              <input className="form-input" placeholder="Tech Corp" value={form.companyName}
                onChange={e => update('companyName', e.target.value)} required />
            </div>
          </div>
        </Section>

        {/* Candidate Details */}
        <Section title="👤 Candidate Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Candidate ID *</label>
              <input className="form-input" placeholder="CAND-001" value={form.candidate.id}
                onChange={e => update('candidate.id', e.target.value)} required />
            </div>
            <div>
              <label className="form-label">Candidate Name *</label>
              <input className="form-input" placeholder="John Doe" value={form.candidate.name}
                onChange={e => update('candidate.name', e.target.value)} required />
            </div>
            <div>
              <label className="form-label">Candidate Email *</label>
              <input type="email" className="form-input" placeholder="john@example.com" value={form.candidate.email}
                onChange={e => update('candidate.email', e.target.value)} required />
            </div>
            <div>
              <label className="form-label">Candidate Phone</label>
              <input className="form-input" placeholder="9876543210" value={form.candidate.phone}
                onChange={e => update('candidate.phone', e.target.value)} />
            </div>
          </div>
        </Section>

        {/* FR-18: Schedule Details */}
        <Section title="📅 Interview Schedule (FR-18)">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="form-label">Date *</label>
              <input type="date" className="form-input" value={form.scheduledDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={e => update('scheduledDate', e.target.value)} required />
            </div>
            <div>
              <label className="form-label">Time *</label>
              <input type="time" className="form-input" value={form.scheduledTime}
                onChange={e => update('scheduledTime', e.target.value)} required />
            </div>
            <div>
              <label className="form-label">Duration (minutes)</label>
              <select className="form-select" value={form.duration} onChange={e => update('duration', parseInt(e.target.value))}>
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>60 minutes</option>
                <option value={90}>90 minutes</option>
                <option value={120}>2 hours</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="form-label">Interview Round</label>
              <select className="form-select" value={form.interviewRound} onChange={e => update('interviewRound', e.target.value)}>
                <option value="screening">Screening</option>
                <option value="technical_1">Technical Round 1</option>
                <option value="technical_2">Technical Round 2</option>
                <option value="hr">HR Round</option>
                <option value="managerial">Managerial Round</option>
                <option value="final">Final Round</option>
              </select>
            </div>
            <div>
              <label className="form-label">Interview Mode *</label>
              <div className="flex gap-2">
                <button type="button"
                  onClick={() => handleModeChange('online')}
                  className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors ${mode === 'online' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}>
                  💻 Online
                </button>
                <button type="button"
                  onClick={() => handleModeChange('offline')}
                  className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors ${mode === 'offline' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}>
                  🏢 Offline
                </button>
              </div>
            </div>
          </div>

          {/* Mode-specific fields */}
          {mode === 'online' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-purple-50 rounded-xl">
              <div>
                <label className="form-label">Meeting Platform</label>
                <select className="form-select" value={form.meetingPlatform} onChange={e => update('meetingPlatform', e.target.value)}>
                  <option value="zoom">Zoom</option>
                  <option value="google_meet">Google Meet</option>
                  <option value="microsoft_teams">Microsoft Teams</option>
                  <option value="skype">Skype</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="form-label">Meeting Link *</label>
                <input className="form-input" placeholder="https://zoom.us/j/..." value={form.meetingLink}
                  onChange={e => update('meetingLink', e.target.value)} required={mode === 'online'} />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-orange-50 rounded-xl">
              <div className="md:col-span-2">
                <label className="form-label">Address *</label>
                <input className="form-input" placeholder="123 Main Street, Floor 3" value={form.location.address}
                  onChange={e => update('location.address', e.target.value)} required={mode === 'offline'} />
              </div>
              <div>
                <label className="form-label">City</label>
                <input className="form-input" placeholder="Mumbai" value={form.location.city}
                  onChange={e => update('location.city', e.target.value)} />
              </div>
              <div>
                <label className="form-label">State</label>
                <input className="form-input" placeholder="Maharashtra" value={form.location.state}
                  onChange={e => update('location.state', e.target.value)} />
              </div>
              <div>
                <label className="form-label">PIN Code</label>
                <input className="form-input" placeholder="400001" value={form.location.pincode}
                  onChange={e => update('location.pincode', e.target.value)} />
              </div>
            </div>
          )}
        </Section>

        {/* Interviewers */}
        <Section title="👥 Interview Panel">
          {form.interviewers.map((interviewer, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3 p-3 bg-gray-50 rounded-lg">
              <input className="form-input" placeholder="Name" value={interviewer.name}
                onChange={e => updateInterviewer(idx, 'name', e.target.value)} />
              <input type="email" className="form-input" placeholder="Email" value={interviewer.email}
                onChange={e => updateInterviewer(idx, 'email', e.target.value)} />
              <div className="flex gap-2">
                <input className="form-input" placeholder="Designation" value={interviewer.designation}
                  onChange={e => updateInterviewer(idx, 'designation', e.target.value)} />
                {idx > 0 && (
                  <button type="button" onClick={() => removeInterviewer(idx)}
                    className="text-red-500 hover:text-red-700 px-2">✕</button>
                )}
              </div>
            </div>
          ))}
          <button type="button" onClick={addInterviewer}
            className="text-indigo-600 text-sm hover:underline">+ Add Interviewer</button>
        </Section>

        {/* Notes */}
        <div className="card mb-6">
          <label className="form-label">Additional Notes</label>
          <textarea className="form-input h-24 resize-none" placeholder="Any special instructions or preparation tips..."
            value={form.notes} onChange={e => update('notes', e.target.value)} />
        </div>

        {/* Email Notice */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <p className="text-green-800 text-sm">
            <strong>📧 Automatic Notification:</strong> Upon scheduling, an invitation email will be automatically sent to the candidate. 
            Reminder emails will be sent 24 hours and 1 hour before the interview.
          </p>
        </div>

        <div className="flex gap-3">
          <button type="button" onClick={() => navigate(-1)} className="btn-secondary">Cancel</button>
          <button type="submit" className="btn-primary flex-1" disabled={loading}>
            {loading ? 'Scheduling...' : '📅 Schedule Interview & Send Invitation'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleInterview;
