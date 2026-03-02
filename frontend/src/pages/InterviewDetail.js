import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { interviewAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';

const DetailRow = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-1 py-2 border-b last:border-0">
    <span className="text-sm text-gray-500 sm:w-40 shrink-0">{label}</span>
    <span className="text-sm font-medium text-gray-900">{value || '-'}</span>
  </div>
);

const InterviewDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isRecruiter } = useAuth();
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelModal, setCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await interviewAPI.getById(id);
        setInterview(res.data.data);
      } catch (err) {
        toast.error('Interview not found');
        navigate('/interviews');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleSendReminder = async () => {
    try {
      await interviewAPI.sendReminder(id);
      toast.success('Reminder sent to candidate!');
    } catch (err) {
      toast.error('Failed to send reminder');
    }
  };

  const handleCancel = async () => {
    try {
      await interviewAPI.cancel(id, { cancelReason });
      toast.success('Interview cancelled');
      setInterview(prev => ({ ...prev, status: 'cancelled', cancelReason }));
      setCancelModal(false);
    } catch (err) {
      toast.error('Failed to cancel interview');
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="spinner"></div></div>;
  if (!interview) return null;

  const statusColors = { scheduled: 'bg-blue-100 text-blue-800', completed: 'bg-green-100 text-green-800', cancelled: 'bg-red-100 text-red-800', rescheduled: 'bg-yellow-100 text-yellow-800', no_show: 'bg-gray-100 text-gray-800' };
  const resultColors = { selected: '🎉', rejected: '❌', hold: '⏳', pending: '⏰', no_show: '🚫' };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-700">← Back</button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{interview.jobTitle}</h1>
          <p className="text-gray-500">{interview.companyName}</p>
        </div>
        <span className={`badge px-3 py-1 text-sm font-medium rounded-full ${statusColors[interview.status]}`}>
          {interview.status?.replace('_', ' ').toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Interview Details */}
          <div className="card">
            <h2 className="font-semibold text-gray-900 mb-3">📅 Interview Details</h2>
            <DetailRow label="Date" value={format(new Date(interview.scheduledDate), 'EEEE, dd MMMM yyyy')} />
            <DetailRow label="Time" value={`${interview.scheduledTime} (${interview.duration} minutes)`} />
            <DetailRow label="Round" value={interview.interviewRound?.replace('_', ' ').toUpperCase()} />
            <DetailRow label="Mode" value={
              <span className={`badge-${interview.mode}`}>{interview.mode}</span>
            } />
            {interview.mode === 'online' ? (
              <>
                <DetailRow label="Platform" value={interview.meetingPlatform?.replace('_', ' ')} />
                <DetailRow label="Meeting Link" value={
                  <a href={interview.meetingLink} target="_blank" rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline truncate max-w-xs block">
                    {interview.meetingLink}
                  </a>
                } />
              </>
            ) : (
              <>
                <DetailRow label="Address" value={interview.location?.address} />
                <DetailRow label="City" value={`${interview.location?.city}, ${interview.location?.state} - ${interview.location?.pincode}`} />
              </>
            )}
            {interview.notes && <DetailRow label="Notes" value={interview.notes} />}
          </div>

          {/* Candidate Info */}
          <div className="card">
            <h2 className="font-semibold text-gray-900 mb-3">👤 Candidate</h2>
            <DetailRow label="Name" value={interview.candidate.name} />
            <DetailRow label="Email" value={interview.candidate.email} />
            <DetailRow label="Phone" value={interview.candidate.phone} />
            <DetailRow label="Application ID" value={interview.applicationId} />
          </div>

          {/* Interviewers */}
          {interview.interviewers?.length > 0 && (
            <div className="card">
              <h2 className="font-semibold text-gray-900 mb-3">👥 Interview Panel</h2>
              {interview.interviewers.map((p, idx) => (
                <div key={idx} className="py-2 border-b last:border-0">
                  <p className="text-sm font-medium text-gray-900">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.designation} • {p.email}</p>
                </div>
              ))}
            </div>
          )}

          {/* FR-20: Feedback */}
          {interview.feedback?.result && interview.feedback.result !== 'pending' && (
            <div className="card border-l-4 border-l-indigo-500">
              <h2 className="font-semibold text-gray-900 mb-3">📝 Interview Feedback (FR-20)</h2>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{resultColors[interview.feedback.result]}</span>
                <div>
                  <p className="font-bold text-lg text-gray-900 capitalize">{interview.feedback.result.replace('_', ' ')}</p>
                  <p className="text-xs text-gray-500">Recorded by {interview.feedback.recordedBy?.name}</p>
                </div>
              </div>
              
              {interview.feedback.rating && (
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    ['Overall Rating', interview.feedback.rating],
                    ['Technical Skills', interview.feedback.technicalSkills],
                    ['Communication', interview.feedback.communicationSkills],
                    ['Problem Solving', interview.feedback.problemSolving],
                    ['Cultural Fit', interview.feedback.culturalFit]
                  ].filter(([, v]) => v).map(([label, val]) => (
                    <div key={label} className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">{label}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {[1,2,3,4,5].map(s => (
                          <span key={s} className={`text-lg ${s <= val ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                        ))}
                        <span className="text-sm font-medium text-gray-700 ml-1">{val}/5</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {interview.feedback.comments && (
                <div className="bg-gray-50 rounded-lg p-3 mb-2">
                  <p className="text-xs font-medium text-gray-500 mb-1">Comments</p>
                  <p className="text-sm text-gray-700">{interview.feedback.comments}</p>
                </div>
              )}
              {interview.feedback.strengths && (
                <div className="bg-green-50 rounded-lg p-3 mb-2">
                  <p className="text-xs font-medium text-green-700 mb-1">Strengths</p>
                  <p className="text-sm text-gray-700">{interview.feedback.strengths}</p>
                </div>
              )}
              {interview.feedback.areasOfImprovement && (
                <div className="bg-orange-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-orange-700 mb-1">Areas for Improvement</p>
                  <p className="text-sm text-gray-700">{interview.feedback.areasOfImprovement}</p>
                </div>
              )}
              {typeof interview.feedback.recommendedForNextRound === 'boolean' && (
                <p className="text-sm text-gray-600 mt-3">
                  Recommended for next round: <strong>{interview.feedback.recommendedForNextRound ? 'Yes ✅' : 'No ❌'}</strong>
                </p>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Recruiter */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-2">Recruiter</h3>
            <p className="text-sm font-medium text-gray-900">{interview.recruiter.name}</p>
            <p className="text-xs text-gray-500">{interview.recruiter.email}</p>
          </div>

          {/* Notifications */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-3">📧 Notifications (FR-19)</h3>
            {[
              { label: 'Invitation', sent: interview.notifications?.invitationSent, sentAt: interview.notifications?.invitationSentAt },
              { label: '24h Reminder', sent: interview.notifications?.reminder24hSent, sentAt: interview.notifications?.reminder24hSentAt },
              { label: '1h Reminder', sent: interview.notifications?.reminder1hSent, sentAt: interview.notifications?.reminder1hSentAt }
            ].map(({ label, sent, sentAt }) => (
              <div key={label} className="flex justify-between items-center py-1.5 border-b last:border-0">
                <span className="text-xs text-gray-600">{label}</span>
                <span className={`text-xs font-medium ${sent ? 'text-green-600' : 'text-gray-400'}`}>
                  {sent ? `✅ ${sentAt ? format(new Date(sentAt), 'dd/MM HH:mm') : 'Sent'}` : 'Pending'}
                </span>
              </div>
            ))}
          </div>

          {/* Actions */}
          {isRecruiter && interview.status === 'scheduled' && (
            <div className="card space-y-2">
              <h3 className="font-semibold text-gray-900 mb-3">Actions</h3>
              <Link to={`/interviews/${id}/feedback`} className="btn-success w-full text-center block text-sm">
                📝 Record Feedback
              </Link>
              <button onClick={handleSendReminder} className="btn-secondary w-full text-sm">
                📧 Send Reminder
              </button>
              <Link to={`/schedule`} state={{ reschedule: interview }}
                className="btn-secondary w-full text-center block text-sm">
                🔄 Reschedule
              </Link>
              <button onClick={() => setCancelModal(true)} className="btn-danger w-full text-sm">
                ✕ Cancel Interview
              </button>
            </div>
          )}
          {isRecruiter && interview.status === 'completed' && !interview.feedback?.result && (
            <Link to={`/interviews/${id}/feedback`} className="btn-primary w-full text-center block text-sm">
              📝 Record Feedback
            </Link>
          )}
        </div>
      </div>

      {/* Cancel Modal */}
      {cancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="font-semibold text-gray-900 text-lg mb-2">Cancel Interview</h3>
            <p className="text-gray-500 text-sm mb-4">Please provide a reason for cancellation.</p>
            <textarea className="form-input h-24 resize-none mb-4" placeholder="Reason for cancellation..."
              value={cancelReason} onChange={e => setCancelReason(e.target.value)} />
            <div className="flex gap-3">
              <button onClick={() => setCancelModal(false)} className="btn-secondary flex-1">Keep Interview</button>
              <button onClick={handleCancel} className="btn-danger flex-1">Cancel Interview</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewDetail;
