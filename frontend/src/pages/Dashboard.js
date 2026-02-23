import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { interviewAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';

const StatCard = ({ title, value, icon, color }) => (
  <div className="card flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${color}`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const { user, isRecruiter } = useAuth();
  const [stats, setStats] = useState({ statusStats: [], resultStats: [], modeStats: [] });
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, listRes] = await Promise.all([
          interviewAPI.getStats(),
          interviewAPI.getAll({ status: 'scheduled', limit: 5 })
        ]);
        setStats(statsRes.data.data);
        setUpcoming(listRes.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getCount = (arr, key) => arr.find(s => s._id === key)?.count || 0;
  const totalInterviews = stats.statusStats.reduce((a, b) => a + b.count, 0);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="spinner"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Welcome Banner */}
      <div className="gradient-header rounded-2xl p-8 mb-8 text-white">
        <h1 className="text-2xl font-bold">Welcome back, {user?.name}! 👋</h1>
        <p className="text-indigo-200 mt-1 capitalize">Role: {user?.role}</p>
        {isRecruiter && (
          <Link to="/schedule" className="mt-4 inline-block bg-white text-indigo-700 px-5 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors text-sm">
            + Schedule New Interview
          </Link>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Interviews" value={totalInterviews} icon="📊" color="bg-indigo-50" />
        <StatCard title="Scheduled" value={getCount(stats.statusStats, 'scheduled')} icon="📅" color="bg-blue-50" />
        <StatCard title="Completed" value={getCount(stats.statusStats, 'completed')} icon="✅" color="bg-green-50" />
        <StatCard title="Selected" value={getCount(stats.resultStats, 'selected')} icon="🎉" color="bg-yellow-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Interviews */}
        <div className="lg:col-span-2 card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-900 text-lg">Upcoming Interviews</h2>
            <Link to="/interviews" className="text-indigo-600 text-sm hover:underline">View all →</Link>
          </div>
          {upcoming.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p className="text-4xl mb-2">📅</p>
              <p>No upcoming interviews</p>
              {isRecruiter && <Link to="/schedule" className="text-indigo-600 text-sm mt-2 inline-block hover:underline">Schedule one now</Link>}
            </div>
          ) : (
            <div className="space-y-3">
              {upcoming.map(interview => (
                <Link key={interview._id} to={`/interviews/${interview._id}`}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 transition-colors">
                  <div className="text-center min-w-12">
                    <p className="text-xl font-bold text-indigo-600">{format(new Date(interview.scheduledDate), 'dd')}</p>
                    <p className="text-xs text-gray-500">{format(new Date(interview.scheduledDate), 'MMM')}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{interview.jobTitle}</p>
                    <p className="text-sm text-gray-500 truncate">{interview.candidate.name} • {interview.scheduledTime}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`badge-${interview.mode}`}>{interview.mode}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="card">
          <h2 className="font-semibold text-gray-900 text-lg mb-4">Mode Breakdown</h2>
          <div className="space-y-3">
            {stats.modeStats.map(s => (
              <div key={s._id} className="flex justify-between items-center">
                <span className={`badge-${s._id}`}>{s._id}</span>
                <span className="font-semibold text-gray-900">{s.count}</span>
              </div>
            ))}
            {stats.modeStats.length === 0 && <p className="text-gray-400 text-sm text-center py-4">No data yet</p>}
          </div>

          <hr className="my-4" />
          
          <h2 className="font-semibold text-gray-900 mb-4">Results</h2>
          <div className="space-y-3">
            {[
              { key: 'selected', label: 'Selected', icon: '✅' },
              { key: 'rejected', label: 'Rejected', icon: '❌' },
              { key: 'hold', label: 'On Hold', icon: '⏳' }
            ].map(({ key, label, icon }) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{icon} {label}</span>
                <span className="font-semibold text-gray-900">{getCount(stats.resultStats, key)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
