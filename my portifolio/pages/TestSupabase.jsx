import { useState, useEffect } from 'react';
import { supabase } from '../src/supabaseClient';

export default function TestSupabase() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const { data, error } = await supabase
        .from('home_content')
        .select('*')
        .single();

      if (error) throw error;
      setData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateTitle() {
    const newTitle = prompt('Enter new title:');
    if (!newTitle) return;

    try {
      const { error } = await supabase
        .from('home_content')
        .update({ hero_title: newTitle })
        .eq('id', data.id);

      if (error) throw error;
      alert('Updated! Refresh to see changes.');
      fetchData();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  }

  if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Supabase Connection Test</h1>

        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded-xl p-4 mb-6">
            <strong>Error:</strong> {error}
          </div>
        )}

        {data && (
          <div className="bg-zinc-900 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Current Data:</h2>
            <pre className="bg-black p-4 rounded overflow-auto text-sm">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}

        <button
          onClick={updateTitle}
          className="px-8 py-4 bg-pink-600 rounded-full hover:bg-pink-700"
        >
          Update Hero Title
        </button>

        <button
          onClick={fetchData}
          className="ml-4 px-8 py-4 bg-blue-600 rounded-full hover:bg-blue-700"
        >
          Refresh Data
        </button>

        <a
          href="/"
          className="ml-4 inline-block px-8 py-4 bg-gray-600 rounded-full hover:bg-gray-700"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
