import { useState } from 'react';
import { useSiteContent } from '../../src/context/SiteContentContext';

export default function AdminEditHome() {
  const { home, updateHome } = useSiteContent();
  const [form, setForm] = useState({
    hero_title: home.hero_title ?? '',
    hero_subtitle: home.hero_subtitle ?? '',
    cta_primary_text: home.cta_primary_text ?? '',
    cta_primary_href: home.cta_primary_href ?? '',
    cta_secondary_text: home.cta_secondary_text ?? '',
    cta_secondary_href: home.cta_secondary_href ?? '',
    profile_image_url: home.profile_image_url ?? '',
    profile_image_hover_url: home.profile_image_hover_url ?? '',
    profile_alt: home.profile_alt ?? '',
    about_text: home.about_text ?? '',
    tech_stack: JSON.stringify(home.tech_stack ?? [], null, 2),
    stats: JSON.stringify(home.stats ?? [], null, 2),
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSave = async (e) => {
    e.preventDefault();
    let tech_stack, stats;
    try {
      tech_stack = JSON.parse(form.tech_stack);
      stats = JSON.parse(form.stats);
      if (!Array.isArray(tech_stack) || !Array.isArray(stats)) throw new Error('Must be arrays');
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Invalid JSON' });
      return;
    }
    const err = await updateHome({
      hero_title: form.hero_title,
      hero_subtitle: form.hero_subtitle,
      cta_primary_text: form.cta_primary_text,
      cta_primary_href: form.cta_primary_href,
      cta_secondary_text: form.cta_secondary_text,
      cta_secondary_href: form.cta_secondary_href,
      profile_image_url: form.profile_image_url,
      profile_image_hover_url: form.profile_image_hover_url,
      profile_alt: form.profile_alt,
      about_text: form.about_text,
      tech_stack,
      stats,
    });
    setMessage(err ? { type: 'error', text: err.message } : { type: 'success', text: 'Saved.' });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Home Page</h1>
      <form onSubmit={handleSave} className="space-y-4 max-w-xl">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Hero title</label>
          <input value={form.hero_title} onChange={(e) => setForm((f) => ({ ...f, hero_title: e.target.value }))} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Hero subtitle</label>
          <input value={form.hero_subtitle} onChange={(e) => setForm((f) => ({ ...f, hero_subtitle: e.target.value }))} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">CTA primary text</label>
            <input value={form.cta_primary_text} onChange={(e) => setForm((f) => ({ ...f, cta_primary_text: e.target.value }))} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">CTA primary href</label>
            <input value={form.cta_primary_href} onChange={(e) => setForm((f) => ({ ...f, cta_primary_href: e.target.value }))} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">CTA secondary text</label>
            <input value={form.cta_secondary_text} onChange={(e) => setForm((f) => ({ ...f, cta_secondary_text: e.target.value }))} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">CTA secondary href</label>
            <input value={form.cta_secondary_href} onChange={(e) => setForm((f) => ({ ...f, cta_secondary_href: e.target.value }))} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Profile image URL</label>
            <input value={form.profile_image_url} onChange={(e) => setForm((f) => ({ ...f, profile_image_url: e.target.value }))} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Profile image hover URL</label>
            <input value={form.profile_image_hover_url} onChange={(e) => setForm((f) => ({ ...f, profile_image_hover_url: e.target.value }))} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Profile alt text</label>
          <input value={form.profile_alt} onChange={(e) => setForm((f) => ({ ...f, profile_alt: e.target.value }))} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">About text</label>
          <textarea value={form.about_text} onChange={(e) => setForm((f) => ({ ...f, about_text: e.target.value }))} rows={3} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Tech stack (JSON array)</label>
          <textarea value={form.tech_stack} onChange={(e) => setForm((f) => ({ ...f, tech_stack: e.target.value }))} rows={4} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none font-mono text-sm" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Stats (JSON array of value/label objects)</label>
          <textarea value={form.stats} onChange={(e) => setForm((f) => ({ ...f, stats: e.target.value }))} rows={5} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none font-mono text-sm" />
        </div>
        {message.text && <p className={message.type === 'error' ? 'text-red-400' : 'text-green-400'}>{message.text}</p>}
        <button type="submit" className="px-6 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 font-semibold">Save</button>
      </form>
    </div>
  );
}
