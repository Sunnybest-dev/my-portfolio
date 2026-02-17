import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../src/supabaseClient';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchMessages();
  }, []);

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) navigate('/admin/login');
  }

  async function fetchMessages() {
    const { data } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    setMessages(data || []);
    setLoading(false);
  }

  async function deleteMessage(id) {
    if (!confirm('Delete this message?')) return;
    await supabase.from('contact_messages').delete().eq('id', id);
    fetchMessages();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/admin/login');
  }

  if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="bg-zinc-900 border-b border-zinc-800 px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">Contact Messages</h1>
        <div className="flex flex-wrap gap-2 sm:gap-4">
          <button onClick={() => navigate('/admin/dashboard')} className="px-4 sm:px-6 py-2 bg-zinc-800 rounded-full hover:bg-zinc-700 text-sm sm:text-base">
            Dashboard
          </button>
          <button onClick={handleLogout} className="px-4 sm:px-6 py-2 bg-red-600 rounded-full hover:bg-red-700 text-sm sm:text-base">
            Logout
          </button>
        </div>
      </nav>

      <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold">Messages ({messages.length})</h2>
          <button onClick={fetchMessages} className="px-6 py-2 bg-yellow-600 rounded-full hover:bg-yellow-700 w-full sm:w-auto">
            Refresh
          </button>
        </div>

        {messages.length === 0 ? (
          <div className="bg-zinc-900 rounded-xl p-8 sm:p-12 text-center text-gray-400">
            No messages yet
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="bg-zinc-900 rounded-xl p-4 sm:p-6 border border-zinc-800">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-semibold">{msg.name}</h3>
                    <a href={`mailto:${msg.email}`} className="text-yellow-500 hover:underline text-sm sm:text-base break-all">
                      {msg.email}
                    </a>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center w-full sm:w-auto">
                    <span className="text-xs sm:text-sm text-gray-400">
                      {new Date(msg.created_at).toLocaleString()}
                    </span>
                    <button 
                      onClick={() => deleteMessage(msg.id)} 
                      className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 text-sm w-full sm:w-auto"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-300 whitespace-pre-wrap text-sm sm:text-base">{msg.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
