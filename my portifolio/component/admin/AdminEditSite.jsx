import { useState } from 'react';
import { useSiteContent } from '../../src/context/SiteContentContext';

export default function AdminEditSite() {
  const { siteSettings, updateSiteSettings } = useSiteContent();
  const [logoText, setLogoText] = useState(siteSettings.logo_text ?? '');
  const [preloaderText, setPreloaderText] = useState(siteSettings.preloader_text ?? '');
  const [navLinksJson, setNavLinksJson] = useState(JSON.stringify(siteSettings.nav_links ?? [], null, 2));
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSave = async (e) => {
    e.preventDefault();
    let nav_links = siteSettings.nav_links;
    try {
      nav_links = JSON.parse(navLinksJson);
      if (!Array.isArray(nav_links)) throw new Error('Must be an array');
    } catch (err) {
      setMessage({ type: 'error', text: 'Nav links: invalid JSON (use array of { "label": "...", "path": "..." })' });
      return;
    }
    const err = await updateSiteSettings({ logo_text: logoText, preloader_text: preloaderText, nav_links });
    setMessage(err ? { type: 'error', text: err.message } : { type: 'success', text: 'Saved.' });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Site & Navigation</h1>
      <form onSubmit={handleSave} className="space-y-4 max-w-xl">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Logo text (navbar)</label>
          <input
            value={logoText}
            onChange={(e) => setLogoText(e.target.value)}
            className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Preloader text</label>
          <input
            value={preloaderText}
            onChange={(e) => setPreloaderText(e.target.value)}
            className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Nav links (JSON array)</label>
          <textarea
            value={navLinksJson}
            onChange={(e) => setNavLinksJson(e.target.value)}
            rows={8}
            className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">e.g. [{"{"}"label":"Home","path":"/"{"}"},{"{"}"label":"About","path":"/about"{"}"}]</p>
        </div>
        {message.text && (
          <p className={message.type === 'error' ? 'text-red-400' : 'text-green-400'}>{message.text}</p>
        )}
        <button type="submit" className="px-6 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 font-semibold">
          Save
        </button>
      </form>
    </div>
  );
}
