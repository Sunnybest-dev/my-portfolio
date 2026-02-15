import { useState } from 'react';
import { useSiteContent } from '../../src/context/SiteContentContext';

export default function AdminEditContact() {
  const { contact, updateContact } = useSiteContent();
  const [form, setForm] = useState({
    subtitle: contact.subtitle ?? '',
    title: contact.title ?? '',
    intro_text: contact.intro_text ?? '',
    form_heading: contact.form_heading ?? '',
    submit_button_text: contact.submit_button_text ?? '',
    contact_cards: JSON.stringify(contact.contact_cards ?? [], null, 2),
    follow_heading: contact.follow_heading ?? '',
    social_links: JSON.stringify(contact.social_links ?? [], null, 2),
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSave = async (e) => {
    e.preventDefault();
    let contact_cards, social_links;
    try {
      contact_cards = JSON.parse(form.contact_cards);
      social_links = JSON.parse(form.social_links);
      if (!Array.isArray(contact_cards) || !Array.isArray(social_links)) throw new Error('Must be arrays');
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Invalid JSON' });
      return;
    }
    const err = await updateContact({
      subtitle: form.subtitle,
      title: form.title,
      intro_text: form.intro_text,
      form_heading: form.form_heading,
      submit_button_text: form.submit_button_text,
      contact_cards,
      follow_heading: form.follow_heading,
      social_links,
    });
    setMessage(err ? { type: 'error', text: err.message } : { type: 'success', text: 'Saved.' });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Contact Page</h1>
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
        <div>
          <label className="block text-sm text-gray-400 mb-2">Intro text</label>
          <textarea value={form.intro_text} onChange={(e) => setForm((f) => ({ ...f, intro_text: e.target.value }))} rows={2} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Form heading</label>
          <input value={form.form_heading} onChange={(e) => setForm((f) => ({ ...f, form_heading: e.target.value }))} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Submit button text</label>
          <input value={form.submit_button_text} onChange={(e) => setForm((f) => ({ ...f, submit_button_text: e.target.value }))} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Contact cards (JSON: emoji, title, value)</label>
          <textarea value={form.contact_cards} onChange={(e) => setForm((f) => ({ ...f, contact_cards: e.target.value }))} rows={8} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none font-mono text-sm" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Follow heading</label>
          <input value={form.follow_heading} onChange={(e) => setForm((f) => ({ ...f, follow_heading: e.target.value }))} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Social links (JSON: label, url)</label>
          <textarea value={form.social_links} onChange={(e) => setForm((f) => ({ ...f, social_links: e.target.value }))} rows={6} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none font-mono text-sm" />
        </div>
        {message.text && <p className={message.type === 'error' ? 'text-red-400' : 'text-green-400'}>{message.text}</p>}
        <button type="submit" className="px-6 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 font-semibold">Save</button>
      </form>
    </div>
  );
}
