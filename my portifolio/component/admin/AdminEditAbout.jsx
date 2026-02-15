import { useState } from 'react';
import { useSiteContent } from '../../src/context/SiteContentContext';

export default function AdminEditAbout() {
  const { about, updateAbout } = useSiteContent();
  const [form, setForm] = useState({
    subtitle: about.subtitle ?? '',
    title: about.title ?? '',
    experience_number: about.experience_number ?? '',
    experience_label: about.experience_label ?? '',
    bullet1: about.bullet1 ?? '',
    bullet2: about.bullet2 ?? '',
    bullet3: about.bullet3 ?? '',
    section_heading: about.section_heading ?? '',
    paragraph1: about.paragraph1 ?? '',
    paragraph2: about.paragraph2 ?? '',
    skills_heading: about.skills_heading ?? '',
    focus_areas: JSON.stringify(about.focus_areas ?? [], null, 2),
    skills: JSON.stringify(about.skills ?? [], null, 2),
    connect_heading: about.connect_heading ?? '',
    connect_links: JSON.stringify(about.connect_links ?? [], null, 2),
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSave = async (e) => {
    e.preventDefault();
    let focus_areas, skills, connect_links;
    try {
      focus_areas = JSON.parse(form.focus_areas);
      skills = JSON.parse(form.skills);
      connect_links = JSON.parse(form.connect_links);
      if (!Array.isArray(focus_areas) || !Array.isArray(skills) || !Array.isArray(connect_links)) throw new Error('Must be arrays');
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Invalid JSON in focus_areas, skills, or connect_links' });
      return;
    }
    const err = await updateAbout({
      subtitle: form.subtitle,
      title: form.title,
      experience_number: form.experience_number,
      experience_label: form.experience_label,
      bullet1: form.bullet1,
      bullet2: form.bullet2,
      bullet3: form.bullet3,
      section_heading: form.section_heading,
      paragraph1: form.paragraph1,
      paragraph2: form.paragraph2,
      skills_heading: form.skills_heading,
      focus_areas,
      skills,
      connect_heading: form.connect_heading,
      connect_links,
    });
    setMessage(err ? { type: 'error', text: err.message } : { type: 'success', text: 'Saved.' });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">About Page</h1>
      <form onSubmit={handleSave} className="space-y-4 max-w-xl">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Subtitle</label>
            <input value={form.subtitle} onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Title</label>
            <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Experience number</label>
            <input value={form.experience_number} onChange={(e) => setForm((f) => ({ ...f, experience_number: e.target.value }))} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Experience label</label>
            <input value={form.experience_label} onChange={(e) => setForm((f) => ({ ...f, experience_label: e.target.value }))} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Bullets (3 lines)</label>
          <div className="space-y-2">
            <input value={form.bullet1} onChange={(e) => setForm((f) => ({ ...f, bullet1: e.target.value }))} placeholder="Bullet 1" className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" />
            <input value={form.bullet2} onChange={(e) => setForm((f) => ({ ...f, bullet2: e.target.value }))} placeholder="Bullet 2" className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" />
            <input value={form.bullet3} onChange={(e) => setForm((f) => ({ ...f, bullet3: e.target.value }))} placeholder="Bullet 3" className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Section heading</label>
          <input value={form.section_heading} onChange={(e) => setForm((f) => ({ ...f, section_heading: e.target.value }))} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Paragraph 1</label>
          <textarea value={form.paragraph1} onChange={(e) => setForm((f) => ({ ...f, paragraph1: e.target.value }))} rows={3} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Paragraph 2</label>
          <textarea value={form.paragraph2} onChange={(e) => setForm((f) => ({ ...f, paragraph2: e.target.value }))} rows={3} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Skills section heading</label>
          <input value={form.skills_heading} onChange={(e) => setForm((f) => ({ ...f, skills_heading: e.target.value }))} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Focus areas (JSON)</label>
          <textarea value={form.focus_areas} onChange={(e) => setForm((f) => ({ ...f, focus_areas: e.target.value }))} rows={6} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none font-mono text-sm" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Skills (JSON)</label>
          <textarea value={form.skills} onChange={(e) => setForm((f) => ({ ...f, skills: e.target.value }))} rows={8} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none font-mono text-sm" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Connect heading</label>
          <input value={form.connect_heading} onChange={(e) => setForm((f) => ({ ...f, connect_heading: e.target.value }))} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Connect links (JSON)</label>
          <textarea value={form.connect_links} onChange={(e) => setForm((f) => ({ ...f, connect_links: e.target.value }))} rows={6} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none font-mono text-sm" />
        </div>
        {message.text && <p className={message.type === 'error' ? 'text-red-400' : 'text-green-400'}>{message.text}</p>}
        <button type="submit" className="px-6 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 font-semibold">Save</button>
      </form>
    </div>
  );
}
