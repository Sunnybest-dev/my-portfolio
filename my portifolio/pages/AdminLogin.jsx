import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../src/supabaseClient';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      navigate('/admin/dashboard');
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-zinc-900 rounded-3xl p-10">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Login</h1>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded-xl p-4 mb-6 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-black rounded-xl border border-zinc-800 focus:border-yellow-600 outline-none"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-black rounded-xl border border-zinc-800 focus:border-yellow-600 outline-none"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-4 rounded-full bg-yellow-600 hover:bg-yellow-700 transition font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
