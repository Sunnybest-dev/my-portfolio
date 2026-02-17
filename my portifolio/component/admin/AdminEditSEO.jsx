import { useState, useEffect } from 'react';
import { supabase } from '../../src/supabaseClient';

export default function AdminEditSEO() {
  const [seoSettings, setSeoSettings] = useState({
    site_name: 'Sunday Daniel Aniedeh Portfolio',
    domain_url: 'https://yourdomain.com',
    default_title: 'Sunday Daniel Aniedeh - Full Stack Developer',
    default_description: 'Professional portfolio of Sunday Daniel Aniedeh. Expert in React, Node.js, Django and modern web development.',
    default_keywords: 'Sunday Daniel Aniedeh, Full Stack Developer, React Developer, Node.js, Web Development',
    author_name: 'Sunday Daniel Aniedeh',
    og_image_url: '/og-image.jpg',
    twitter_handle: '@yourusername',
    google_analytics_id: '',
    google_site_verification: '',
    theme_color: '#000000'
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSEOSettings();
  }, []);

  const fetchSEOSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('seo_settings')
        .select('*')
        .single();
      
      if (error) {
        if (error.code === '42P01') {
          setMessage({ type: 'error', text: 'Table not found. Run add-seo-settings.sql in Supabase first.' });
        }
        console.log('SEO table not found, using defaults');
      } else if (data) {
        setSeoSettings(data);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      const { data: existing } = await supabase
        .from('seo_settings')
        .select('id')
        .single();

      let result;
      if (existing) {
        result = await supabase
          .from('seo_settings')
          .update(seoSettings)
          .eq('id', existing.id);
      } else {
        result = await supabase
          .from('seo_settings')
          .insert([seoSettings]);
      }

      if (result.error) throw result.error;
      setMessage({ type: 'success', text: 'SEO settings saved successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  const handleChange = (field, value) => {
    setSeoSettings(prev => ({ ...prev, [field]: value }));
  };

  if (loading) return <div className="text-gray-400">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">SEO & Domain Settings</h1>
      <p className="text-gray-400 text-sm mb-6">Configure your site's SEO metadata and domain settings for deployment</p>
      
      <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
        {/* Domain Settings */}
        <div className="bg-zinc-900 p-6 rounded-xl space-y-4">
          <h2 className="text-lg font-semibold text-yellow-500 mb-4">🌐 Domain & Site Info</h2>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">Site Name</label>
            <input
              value={seoSettings.site_name}
              onChange={(e) => handleChange('site_name', e.target.value)}
              className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-yellow-500 outline-none"
              placeholder="Your Portfolio Name"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Domain URL (Production)</label>
            <input
              value={seoSettings.domain_url}
              onChange={(e) => handleChange('domain_url', e.target.value)}
              className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-yellow-500 outline-none"
              placeholder="https://yourdomain.com"
            />
            <p className="text-xs text-gray-500 mt-1">Update this with your actual domain after deployment</p>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Author Name</label>
            <input
              value={seoSettings.author_name}
              onChange={(e) => handleChange('author_name', e.target.value)}
              className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-yellow-500 outline-none"
              placeholder="Your Full Name"
            />
          </div>
        </div>

        {/* SEO Meta Tags */}
        <div className="bg-zinc-900 p-6 rounded-xl space-y-4">
          <h2 className="text-lg font-semibold text-yellow-500 mb-4">🔍 SEO Meta Tags</h2>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">Default Page Title</label>
            <input
              value={seoSettings.default_title}
              onChange={(e) => handleChange('default_title', e.target.value)}
              className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-yellow-500 outline-none"
              placeholder="Your Name - Job Title"
            />
            <p className="text-xs text-gray-500 mt-1">Appears in browser tabs and search results</p>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Default Meta Description</label>
            <textarea
              value={seoSettings.default_description}
              onChange={(e) => handleChange('default_description', e.target.value)}
              rows={3}
              className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-yellow-500 outline-none"
              placeholder="Brief description of your portfolio (150-160 characters)"
            />
            <p className="text-xs text-gray-500 mt-1">Shown in search engine results</p>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Keywords (comma-separated)</label>
            <textarea
              value={seoSettings.default_keywords}
              onChange={(e) => handleChange('default_keywords', e.target.value)}
              rows={2}
              className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-yellow-500 outline-none"
              placeholder="keyword1, keyword2, keyword3"
            />
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-zinc-900 p-6 rounded-xl space-y-4">
          <h2 className="text-lg font-semibold text-yellow-500 mb-4">📱 Social Media</h2>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">Open Graph Image URL</label>
            <input
              value={seoSettings.og_image_url}
              onChange={(e) => handleChange('og_image_url', e.target.value)}
              className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-yellow-500 outline-none"
              placeholder="/og-image.jpg or https://..."
            />
            <p className="text-xs text-gray-500 mt-1">Image shown when sharing on social media (1200x630px recommended)</p>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Twitter Handle</label>
            <input
              value={seoSettings.twitter_handle}
              onChange={(e) => handleChange('twitter_handle', e.target.value)}
              className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-yellow-500 outline-none"
              placeholder="@yourusername"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Theme Color (for mobile browsers)</label>
            <input
              type="color"
              value={seoSettings.theme_color}
              onChange={(e) => handleChange('theme_color', e.target.value)}
              className="w-20 h-12 bg-zinc-800 border border-zinc-700 rounded-xl cursor-pointer"
            />
            <span className="ml-3 text-gray-400">{seoSettings.theme_color}</span>
          </div>
        </div>

        {/* Analytics & Verification */}
        <div className="bg-zinc-900 p-6 rounded-xl space-y-4">
          <h2 className="text-lg font-semibold text-yellow-500 mb-4">📊 Analytics & Verification</h2>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">Google Analytics ID (optional)</label>
            <input
              value={seoSettings.google_analytics_id}
              onChange={(e) => handleChange('google_analytics_id', e.target.value)}
              className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-yellow-500 outline-none"
              placeholder="G-XXXXXXXXXX or UA-XXXXXXXXX-X"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Google Site Verification Code (optional)</label>
            <input
              value={seoSettings.google_site_verification}
              onChange={(e) => handleChange('google_site_verification', e.target.value)}
              className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-yellow-500 outline-none"
              placeholder="verification_code_here"
            />
            <p className="text-xs text-gray-500 mt-1">From Google Search Console</p>
          </div>
        </div>

        {message.text && (
          <div className={`p-4 rounded-xl ${message.type === 'error' ? 'bg-red-900/20 text-red-400' : 'bg-green-900/20 text-green-400'}`}>
            {message.text}
          </div>
        )}

        <button 
          type="submit" 
          className="px-8 py-3 rounded-xl bg-yellow-600 hover:bg-yellow-700 font-semibold transition-colors"
        >
          Save SEO Settings
        </button>
      </form>
    </div>
  );
}
