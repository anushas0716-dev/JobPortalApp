import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { interviewAPI } from '../services/api';

const StarRating = ({ label, value, onChange }) => (
  <div>
    <label className="form-label">{label}</label>
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button key={star} type="button" onClick={() => onChange(star)}
          className={`text-2xl transition-colors ${star <= value ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-200'}`}>
          ★
        </button>
      ))}
      {value > 0 && <span className="text-sm text-gray-500 self-center ml-1">{value}/5</span>}
    </div>
  </div>
);

const RecordFeedback = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    result: 'selected',
    rating: 0,
    technicalSkills: 0,
    communicationSkills: 0,
    problemSolving: 0,
    culturalFit: 0,
    comments: '',
    strengths: '',
    areasOfImprovement: '',
    recommendedForNextRound: true
  });

  useEffect(() => {
    interviewAPI.getById(id).then(res => setInterview(res.data.data)).catch(() => navigate('/interviews'));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.result) {
      toast.error('Please select an interview result');
      return;
    }
    setLoading(true);
    try {
      await interviewAPI.recordFeedback(id, form);
      toast.success('Feedback recorded! Result notification sent to candidate.');
      navigate(`/interviews/${id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to record feedback');
    } finally {
      setLoading(false);
    }
  };

  const resultOptions = [
    { value: 'selected', label: '🎉 Selected', color: 'border-green-500 bg-green-50 text-green-800' },
    { value: 'rejected', label: '❌ Rejected', color: 'border-red-400 bg-red-50 text-red-800' },
    { value: 'hold', label: '⏳ On Hold', color: 'border-yellow-400 bg-yellow-50 text-yellow-800' },
    { value: 'no_show', label: '🚫 No Show', color: 'border-gray-400 bg-gray-50 text-gray-700' }
  ];

  if (!interview) return <div className="flex justify-center py-20"><div className="spinner"></div></div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-700">← Back</button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Record Interview Feedback</h1>
          <p className="text-gray-500 text-sm">{interview.candidate.name} • {interview.jobTitle}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Result Selection */}
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">Interview Result *</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {resultOptions.map(opt => (
              <button key={opt.value} type="button"
                onClick={() => setForm(f => ({ ...f, result: opt.value }))}
                className={`py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all ${
                  form.result === opt.value ? opt.color + ' border-2' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Ratings */}
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">Performance Ratings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StarRating label="Overall Rating" value={form.rating}
              onChange={v => setForm(f => ({ ...f, rating: v }))} />
            <StarRating label="Technical Skills" value={form.technicalSkills}
              onChange={v => setForm(f => ({ ...f, technicalSkills: v }))} />
            <StarRating label="Communication Skills" value={form.communicationSkills}
              onChange={v => setForm(f => ({ ...f, communicationSkills: v }))} />
            <StarRating label="Problem Solving" value={form.problemSolving}
              onChange={v => setForm(f => ({ ...f, problemSolving: v }))} />
            <StarRating label="Cultural Fit" value={form.culturalFit}
              onChange={v => setForm(f => ({ ...f, culturalFit: v }))} />
          </div>
        </div>

        {/* Comments */}
        <div className="card space-y-4">
          <h2 className="font-semibold text-gray-900">Detailed Feedback</h2>
          <div>
            <label className="form-label">Overall Comments</label>
            <textarea className="form-input h-24 resize-none" placeholder="Write your overall assessment..."
              value={form.comments} onChange={e => setForm(f => ({ ...f, comments: e.target.value }))} />
          </div>
          <div>
            <label className="form-label">Strengths</label>
            <textarea className="form-input h-20 resize-none" placeholder="What were the candidate's strengths?"
              value={form.strengths} onChange={e => setForm(f => ({ ...f, strengths: e.target.value }))} />
          </div>
          <div>
            <label className="form-label">Areas for Improvement</label>
            <textarea className="form-input h-20 resize-none" placeholder="What areas can the candidate improve?"
              value={form.areasOfImprovement} onChange={e => setForm(f => ({ ...f, areasOfImprovement: e.target.value }))} />
          </div>
        </div>

        {/* Recommendation */}
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">Recommendation</h2>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="recommend" checked={form.recommendedForNextRound === true}
                onChange={() => setForm(f => ({ ...f, recommendedForNextRound: true }))} className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-gray-700">✅ Recommend for Next Round</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="recommend" checked={form.recommendedForNextRound === false}
                onChange={() => setForm(f => ({ ...f, recommendedForNextRound: false }))} className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-gray-700">❌ Do Not Recommend</span>
            </label>
          </div>
        </div>

        {/* Email Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-blue-800 text-sm">
            <strong>📧 Auto Notification:</strong> Upon saving, the candidate will automatically receive an email with the interview result.
          </p>
        </div>

        <div className="flex gap-3">
          <button type="button" onClick={() => navigate(-1)} className="btn-secondary">Cancel</button>
          <button type="submit" className="btn-primary flex-1" disabled={loading}>
            {loading ? 'Saving...' : '💾 Save Feedback & Notify Candidate'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecordFeedback;
