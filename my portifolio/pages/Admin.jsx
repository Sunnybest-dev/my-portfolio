import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, hasSupabase } from '../src/lib/supabase';
import { useSiteContent } from '../src/context/SiteContentContext';
import AdminEditSite from '../component/admin/AdminEditSite';
import AdminEditHome from '../component/admin/AdminEditHome';
import AdminEditAbout from '../component/admin/AdminEditAbout';
import AdminEditProjects from '../component/admin/AdminEditProjects';
import AdminEditContact from '../component/admin/AdminEditContact';

const SECTIONS = [
  { id: 'site', label: 'Site & Nav' },
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function Admin() {
  const [section, setSection] = useState('site');
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();
  const content = useSiteContent();

  useEffect(() => {
    if (!hasSupabase()) {
      setAuthChecked(true);
      return;
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthChecked(true);
      if (!session) navigate('/admin/login', { replace: true });
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate('/admin/login', { replace: true });
    });
    return () => subscription?.unsubscribe();
  }, [navigate]);

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex">
      <aside className="w-56 border-r border-zinc-800 p-4 flex flex-col">
        <h2 className="font-bold text-lg mb-4">Admin</h2>
        <nav className="space-y-1">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              className={`block w-full text-left px-4 py-2 rounded-lg text-sm ${section === s.id ? 'bg-pink-600' : 'hover:bg-zinc-800'}`}
            >
              {s.label}
            </button>
          ))}
        </nav>
        <a href="/" className="mt-auto text-gray-400 hover:text-white text-sm">← View site</a>
        {hasSupabase() && (
          <button
            onClick={() => supabase.auth.signOut().then(() => navigate('/admin/login'))}
            className="mt-2 text-gray-400 hover:text-white text-sm"
          >
            Sign out
          </button>
        )}
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        {section === 'site' && <AdminEditSite />}
        {section === 'home' && <AdminEditHome />}
        {section === 'about' && <AdminEditAbout />}
        {section === 'projects' && <AdminEditProjects />}
        {section === 'contact' && <AdminEditContact />}
      </main>
    </div>
  );
}
