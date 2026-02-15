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
      <nav className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Contact Messages</h1>
        <div className="flex gap-4">
          <button onClick={() => navigate('/admin/dashboard')} className="px-6 py-2 bg-zinc-800 rounded-full hover:bg-zinc-700">
            Dashboard
          </button>
          <button onClick={handleLogout} className="px-6 py-2 bg-red-600 rounded-full hover:bg-red-700">
            Logout
          </button>
        </div>
      </nav>

      <div className="p-8 max-w-6xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold">Messages ({messages.length})</h2>
          <button onClick={fetchMessages} className="px-6 py-2 bg-yellow-600 rounded-full hover:bg-yellow-700">
            Refresh
          </button>
        </div>

        {messages.length === 0 ? (
          <div className="bg-zinc-900 rounded-xl p-12 text-center text-gray-400">
            No messages yet
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{msg.name}</h3>
                    <a href={`mailto:${msg.email}`} className="text-yellow-500 hover:underline">
                      {msg.email}
                    </a>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-sm text-gray-400">
                      {new Date(msg.created_at).toLocaleString()}
                    </span>
                    <button 
                      onClick={() => deleteMessage(msg.id)} 
                      className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-300 whitespace-pre-wrap">{msg.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
