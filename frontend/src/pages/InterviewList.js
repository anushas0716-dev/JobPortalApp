import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { interviewAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';

const InterviewList = () => {
  const { isRecruiter } = useAuth();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: '', mode: '' });
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  const fetchInterviews = async (page = 1) => {
    setLoading(true);
    try {
      const params = { page, limit: 10, ...filters };
      const res = await interviewAPI.getAll(params);
      setInterviews(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchInterviews(); }, [filters]);

  const statusOptions = ['', 'scheduled', 'rescheduled', 'completed', 'cancelled', 'no_show'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Interviews</h1>
          <p className="text-gray-500 text-sm mt-0.5">{pagination.total} total interviews</p>
        </div>
        {isRecruiter && (
          <Link to="/schedule" className="btn-primary whitespace-nowrap">+ Schedule Interview</Link>
        )}
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="form-label">Status</label>
            <select className="form-select w-40" value={filters.status}
              onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}>
              {statusOptions.map(s => (
                <option key={s} value={s}>{s === '' ? 'All Status' : s.replace('_', ' ').toUpperCase()}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">Mode</label>
            <select className="form-select w-36" value={filters.mode}
              onChange={e => setFilters(f => ({ ...f, mode: e.target.value }))}>
              <option value="">All Modes</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>
          <div className="flex items-end">
            <button onClick={() => setFilters({ status: '', mode: '' })}
              className="btn-secondary text-sm py-2">Clear Filters</button>
          </div>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-20"><div className="spinner"></div></div>
      ) : interviews.length === 0 ? (
        <div className="card text-center py-16">
          <p className="text-5xl mb-4">📋</p>
          <p className="text-gray-500 text-lg">No interviews found</p>
          {isRecruiter && <Link to="/schedule" className="btn-primary inline-block mt-4">Schedule First Interview</Link>}
        </div>
      ) : (
        <div className="card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Candidate</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Position</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date & Time</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Mode</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Round</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Result</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {interviews.map(interview => (
                  <tr key={interview._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900 text-sm">{interview.candidate.name}</p>
                      <p className="text-xs text-gray-500">{interview.candidate.email}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-gray-900">{interview.jobTitle}</p>
                      <p className="text-xs text-gray-500">{interview.companyName}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-gray-900">{format(new Date(interview.scheduledDate), 'dd MMM yyyy')}</p>
                      <p className="text-xs text-gray-500">{interview.scheduledTime} ({interview.duration}m)</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`badge-${interview.mode}`}>{interview.mode}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-gray-600 capitalize">{interview.interviewRound?.replace('_', ' ')}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`badge-${interview.status}`}>{interview.status?.replace('_', ' ')}</span>
                    </td>
                    <td className="px-4 py-3">
                      {interview.feedback?.result && interview.feedback.result !== 'pending' && (
                        <span className={`badge-${interview.feedback.result}`}>{interview.feedback.result}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Link to={`/interviews/${interview._id}`}
                        className="text-indigo-600 text-sm hover:underline whitespace-nowrap">View →</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex justify-center gap-2 p-4 border-t">
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => fetchInterviews(p)}
                  className={`w-8 h-8 rounded text-sm font-medium ${p === pagination.page ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InterviewList;
