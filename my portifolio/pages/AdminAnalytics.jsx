import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../src/supabaseClient';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState([]);
  const [stats, setStats] = useState({ total: 0, today: 0, pages: {} });
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchAnalytics();
  }, []);

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) navigate('/admin/login');
  }

  async function fetchAnalytics() {
    const { data } = await supabase
      .from('site_analytics')
      .select('*')
      .order('visited_at', { ascending: false })
      .limit(1000);

    if (data) {
      setAnalytics(data);
      calculateStats(data);
    }
  }

  function calculateStats(data) {
    const today = new Date().toDateString();
    const todayVisits = data.filter(v => new Date(v.visited_at).toDateString() === today).length;
    
    const pages = {};
    data.forEach(v => {
      pages[v.page_path] = (pages[v.page_path] || 0) + 1;
    });

    setStats({ total: data.length, today: todayVisits, pages });
  }

  function getChartData() {
    const last7Days = {};
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      last7Days[dateStr] = 0;
    }

    analytics.forEach(v => {
      const date = new Date(v.visited_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      if (last7Days.hasOwnProperty(date)) {
        last7Days[date]++;
      }
    });

    return Object.entries(last7Days).map(([date, visits]) => ({ date, visits }));
  }

  function getPageData() {
    return Object.entries(stats.pages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([page, views]) => ({ page, views }));
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/admin/login');
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="bg-zinc-900 border-b border-zinc-800 px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">Analytics Dashboard</h1>
        <div className="flex flex-wrap gap-2 sm:gap-4">
          <button onClick={() => navigate('/admin/dashboard')} className="px-4 sm:px-6 py-2 bg-zinc-800 rounded-full hover:bg-zinc-700 text-sm sm:text-base">
            Dashboard
          </button>
          <button onClick={() => navigate('/admin/messages')} className="px-4 sm:px-6 py-2 bg-zinc-800 rounded-full hover:bg-zinc-700 text-sm sm:text-base">
            Messages
          </button>
          <button onClick={handleLogout} className="px-4 sm:px-6 py-2 bg-red-600 rounded-full hover:bg-red-700 text-sm sm:text-base">
            Logout
          </button>
        </div>
      </nav>

      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-zinc-900 rounded-xl p-4 sm:p-6">
            <div className="text-3xl sm:text-4xl font-bold text-yellow-500 mb-2">{stats.total}</div>
            <div className="text-gray-400 text-sm sm:text-base">Total Visits</div>
          </div>
          <div className="bg-zinc-900 rounded-xl p-4 sm:p-6">
            <div className="text-3xl sm:text-4xl font-bold text-yellow-500 mb-2">{stats.today}</div>
            <div className="text-gray-400 text-sm sm:text-base">Today's Visits</div>
          </div>
          <div className="bg-zinc-900 rounded-xl p-4 sm:p-6">
            <div className="text-3xl sm:text-4xl font-bold text-yellow-500 mb-2">{Object.keys(stats.pages).length}</div>
            <div className="text-gray-400 text-sm sm:text-base">Pages Tracked</div>
          </div>
        </div>

        {/* Visits Chart */}
        <div className="bg-zinc-900 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Visits (Last 7 Days)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={getChartData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" stroke="#888" tick={{ fontSize: 12 }} />
              <YAxis stroke="#888" tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #333' }}
                labelStyle={{ color: '#fff' }}
              />
              <Line type="monotone" dataKey="visits" stroke="#eab308" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Pages */}
        <div className="bg-zinc-900 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Top Pages</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={getPageData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="page" stroke="#888" tick={{ fontSize: 12 }} />
              <YAxis stroke="#888" tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #333' }}
                labelStyle={{ color: '#fff' }}
              />
              <Bar dataKey="views" fill="#eab308" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Visits */}
        <div className="bg-zinc-900 rounded-xl p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Recent Visits</h2>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-3 px-4 text-sm sm:text-base">Page</th>
                  <th className="text-left py-3 px-4 text-sm sm:text-base">Time</th>
                  <th className="text-left py-3 px-4 text-sm sm:text-base">Referrer</th>
                </tr>
              </thead>
              <tbody>
                {analytics.slice(0, 20).map((visit) => (
                  <tr key={visit.id} className="border-b border-zinc-800 hover:bg-zinc-800">
                    <td className="py-3 px-4 text-sm">{visit.page_path}</td>
                    <td className="py-3 px-4 text-gray-400 text-xs sm:text-sm">
                      {new Date(visit.visited_at).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-gray-400 text-xs sm:text-sm truncate max-w-xs">
                      {visit.referrer || 'Direct'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
