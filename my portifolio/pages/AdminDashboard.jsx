import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../src/supabaseClient';
import AdminEditSEO from '../component/admin/AdminEditSEO';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchContent();
  }, [activeTab]);

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) navigate('/admin/login');
  }

  async function fetchContent() {
    setLoading(true);
    
    // Skip fetching for SEO tab as it has its own component
    if (activeTab === 'seo') {
      setLoading(false);
      return;
    }
    
    const tables = {
      home: 'home_content',
      about: 'about_content',
      projects: 'projects_content',
      contact: 'contact_content',
      navbar: 'navbar_content',
      resume: 'resume_content'
    };
    
    const { data } = await supabase.from(tables[activeTab]).select('*').single();
    setContent(data || {});
    setLoading(false);
  }

  async function handleSave() {
    setSaving(true);
    const tables = {
      home: 'home_content',
      about: 'about_content',
      projects: 'projects_content',
      contact: 'contact_content',
      navbar: 'navbar_content',
      resume: 'resume_content'
    };
    
    await supabase.from(tables[activeTab]).update(content).eq('id', content.id);
    setSaving(false);
    localStorage.setItem('content_updated', Date.now().toString());
    alert('Saved successfully!');
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/admin/login');
  }

  function updateField(field, value) {
    setContent({ ...content, [field]: value });
  }

  function addArrayItem(field, defaultItem) {
    const current = Array.isArray(content[field]) ? content[field] : [];
    setContent({ ...content, [field]: [...current, defaultItem] });
  }

  function removeArrayItem(field, index) {
    const current = Array.isArray(content[field]) ? content[field] : [];
    setContent({ ...content, [field]: current.filter((_, i) => i !== index) });
  }

  function updateArrayItem(field, index, value) {
    const current = Array.isArray(content[field]) ? content[field] : [];
    const updated = [...current];
    updated[index] = value;
    setContent({ ...content, [field]: updated });
  }

  if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="bg-zinc-900 border-b border-zinc-800 px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex flex-wrap gap-2 sm:gap-4">
          <button onClick={() => navigate('/admin/messages')} className="px-4 sm:px-6 py-2 bg-zinc-800 rounded-full hover:bg-zinc-700 text-sm sm:text-base">
            Messages
          </button>
          <button onClick={() => navigate('/admin/analytics')} className="px-4 sm:px-6 py-2 bg-zinc-800 rounded-full hover:bg-zinc-700 text-sm sm:text-base">
            Analytics
          </button>
          <button onClick={handleLogout} className="px-4 sm:px-6 py-2 bg-red-600 rounded-full hover:bg-red-700 text-sm sm:text-base">
            Logout
          </button>
        </div>
      </nav>

      <div className="flex flex-col lg:flex-row">
        <aside className="w-full lg:w-64 bg-zinc-900 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-zinc-800">
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible">
          {['home', 'about', 'projects', 'contact', 'navbar', 'resume', 'seo'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap lg:w-full text-left px-4 py-3 rounded-xl capitalize ${
                activeTab === tab ? 'bg-yellow-600' : 'hover:bg-zinc-800'
              }`}
            >
              {tab === 'seo' ? 'SEO & Domain' : tab}
            </button>
          ))}
          </div>
        </aside>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {activeTab === 'seo' ? (
            <AdminEditSEO />
          ) : (
          <div className="max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 capitalize">{activeTab} Content</h2>
            
            <div className="space-y-6">
              {Object.keys(content).filter(key => !['id', 'updated_at'].includes(key)).map(key => {
                const value = content[key];
                
                // Handle arrays with special UI
                if (Array.isArray(value)) {
                  // Tech Stack
                  if (key === 'tech_stack') {
                    return (
                      <div key={key} className="bg-zinc-900 rounded-xl p-6">
                        <label className="block text-sm text-gray-400 mb-4">Tech Stack</label>
                        {value.map((tech, i) => (
                          <div key={i} className="flex gap-2 mb-2">
                            <input
                              value={tech}
                              onChange={(e) => updateArrayItem(key, i, e.target.value)}
                              className="flex-1 p-3 bg-black rounded-xl border border-zinc-800 outline-none"
                            />
                            <button onClick={() => removeArrayItem(key, i)} className="px-4 bg-red-600 rounded-xl">×</button>
                          </div>
                        ))}
                        <button onClick={() => addArrayItem(key, '')} className="mt-2 px-4 py-2 bg-green-600 rounded-xl text-sm">
                          + Add Tech
                        </button>
                      </div>
                    );
                  }
                  
                  // Stats
                  if (key === 'stats') {
                    return (
                      <div key={key} className="bg-zinc-900 rounded-xl p-4 sm:p-6">
                        <label className="block text-sm text-gray-400 mb-4">Stats</label>
                        {value.map((stat, i) => (
                          <div key={i} className="flex flex-col sm:flex-row gap-2 mb-3 p-3 bg-black rounded-xl">
                            <input
                              placeholder="Value (e.g., 50+)"
                              value={stat.value || ''}
                              onChange={(e) => updateArrayItem(key, i, { ...stat, value: e.target.value })}
                              className="flex-1 p-3 bg-zinc-900 rounded-xl border border-zinc-800 outline-none"
                            />
                            <input
                              placeholder="Label (e.g., Projects)"
                              value={stat.label || ''}
                              onChange={(e) => updateArrayItem(key, i, { ...stat, label: e.target.value })}
                              className="flex-1 p-3 bg-zinc-900 rounded-xl border border-zinc-800 outline-none"
                            />
                            <button onClick={() => removeArrayItem(key, i)} className="px-4 py-2 sm:py-0 bg-red-600 rounded-xl">×</button>
                          </div>
                        ))}
                        <button onClick={() => addArrayItem(key, { value: '', label: '' })} className="mt-2 px-4 py-2 bg-green-600 rounded-xl text-sm w-full sm:w-auto">
                          + Add Stat
                        </button>
                      </div>
                    );
                  }

                  // Nav Links
                  if (key === 'nav_links') {
                    return (
                      <div key={key} className="bg-zinc-900 rounded-xl p-6">
                        <label className="block text-sm text-gray-400 mb-4">Navigation Links</label>
                        {value.map((link, i) => (
                          <div key={i} className="flex gap-2 mb-3 p-3 bg-black rounded-xl">
                            <input
                              placeholder="Label"
                              value={link.label || ''}
                              onChange={(e) => updateArrayItem(key, i, { ...link, label: e.target.value })}
                              className="flex-1 p-3 bg-zinc-900 rounded-xl border border-zinc-800 outline-none"
                            />
                            <input
                              placeholder="Path"
                              value={link.path || ''}
                              onChange={(e) => updateArrayItem(key, i, { ...link, path: e.target.value })}
                              className="flex-1 p-3 bg-zinc-900 rounded-xl border border-zinc-800 outline-none"
                            />
                            <button onClick={() => removeArrayItem(key, i)} className="px-4 bg-red-600 rounded-xl">×</button>
                          </div>
                        ))}
                        <button onClick={() => addArrayItem(key, { label: '', path: '' })} className="mt-2 px-4 py-2 bg-green-600 rounded-xl text-sm">
                          + Add Link
                        </button>
                      </div>
                    );
                  }

                  // Experience Items / Social Platforms (simple strings)
                  if (key === 'experience_items' || key === 'social_platforms') {
                    return (
                      <div key={key} className="bg-zinc-900 rounded-xl p-6">
                        <label className="block text-sm text-gray-400 mb-4 capitalize">{key.replace(/_/g, ' ')}</label>
                        {value.map((item, i) => (
                          <div key={i} className="flex gap-2 mb-2">
                            <input
                              value={item}
                              onChange={(e) => updateArrayItem(key, i, e.target.value)}
                              className="flex-1 p-3 bg-black rounded-xl border border-zinc-800 outline-none"
                            />
                            <button onClick={() => removeArrayItem(key, i)} className="px-4 bg-red-600 rounded-xl">×</button>
                          </div>
                        ))}
                        <button onClick={() => addArrayItem(key, '')} className="mt-2 px-4 py-2 bg-green-600 rounded-xl text-sm">
                          + Add Item
                        </button>
                      </div>
                    );
                  }

                  // Contact Cards
                  if (key === 'contact_cards') {
                    return (
                      <div key={key} className="bg-zinc-900 rounded-xl p-6">
                        <label className="block text-sm text-gray-400 mb-4">Contact Cards</label>
                        {value.map((card, i) => (
                          <div key={i} className="mb-3 p-3 bg-black rounded-xl">
                            <div className="flex gap-2 mb-2">
                              <input
                                placeholder="Emoji"
                                value={card.emoji || ''}
                                onChange={(e) => updateArrayItem(key, i, { ...card, emoji: e.target.value })}
                                className="w-20 p-3 bg-zinc-900 rounded-xl border border-zinc-800 outline-none"
                              />
                              <input
                                placeholder="Title"
                                value={card.title || ''}
                                onChange={(e) => updateArrayItem(key, i, { ...card, title: e.target.value })}
                                className="flex-1 p-3 bg-zinc-900 rounded-xl border border-zinc-800 outline-none"
                              />
                            </div>
                            <div className="flex gap-2">
                              <input
                                placeholder="Value"
                                value={card.value || ''}
                                onChange={(e) => updateArrayItem(key, i, { ...card, value: e.target.value })}
                                className="flex-1 p-3 bg-zinc-900 rounded-xl border border-zinc-800 outline-none"
                              />
                              <button onClick={() => removeArrayItem(key, i)} className="px-4 bg-red-600 rounded-xl">×</button>
                            </div>
                          </div>
                        ))}
                        <button onClick={() => addArrayItem(key, { emoji: '', title: '', value: '' })} className="mt-2 px-4 py-2 bg-green-600 rounded-xl text-sm">
                          + Add Card
                        </button>
                      </div>
                    );
                  }

                  // Social Links
                  if (key === 'social_links') {
                    return (
                      <div key={key} className="bg-zinc-900 rounded-xl p-6">
                        <label className="block text-sm text-gray-400 mb-4">Social Links</label>
                        {value.map((link, i) => (
                          <div key={i} className="flex gap-2 mb-3 p-3 bg-black rounded-xl">
                            <input
                              placeholder="Label"
                              value={link.label || ''}
                              onChange={(e) => updateArrayItem(key, i, { ...link, label: e.target.value })}
                              className="flex-1 p-3 bg-zinc-900 rounded-xl border border-zinc-800 outline-none"
                            />
                            <input
                              placeholder="URL"
                              value={link.url || ''}
                              onChange={(e) => updateArrayItem(key, i, { ...link, url: e.target.value })}
                              className="flex-1 p-3 bg-zinc-900 rounded-xl border border-zinc-800 outline-none"
                            />
                            <button onClick={() => removeArrayItem(key, i)} className="px-4 bg-red-600 rounded-xl">×</button>
                          </div>
                        ))}
                        <button onClick={() => addArrayItem(key, { label: '', url: '' })} className="mt-2 px-4 py-2 bg-green-600 rounded-xl text-sm">
                          + Add Link
                        </button>
                      </div>
                    );
                  }

                  // Projects
                  if (key === 'projects') {
                    return (
                      <div key={key} className="bg-zinc-900 rounded-xl p-6">
                        <label className="block text-sm text-gray-400 mb-4">Projects</label>
                        {value.map((project, i) => (
                          <div key={i} className="mb-4 p-4 bg-black rounded-xl border border-zinc-800">
                            <div className="grid grid-cols-2 gap-3 mb-3">
                              <input
                                placeholder="ID"
                                type="number"
                                value={project.id || ''}
                                onChange={(e) => updateArrayItem(key, i, { ...project, id: parseInt(e.target.value) || 0 })}
                                className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 outline-none"
                              />
                              <input
                                placeholder="Color (e.g., from-blue-500 to-purple-600)"
                                value={project.color || ''}
                                onChange={(e) => updateArrayItem(key, i, { ...project, color: e.target.value })}
                                className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 outline-none"
                              />
                            </div>
                            <input
                              placeholder="Title"
                              value={project.title || ''}
                              onChange={(e) => updateArrayItem(key, i, { ...project, title: e.target.value })}
                              className="w-full p-3 mb-3 bg-zinc-900 rounded-xl border border-zinc-800 outline-none"
                            />
                            <textarea
                              placeholder="Description"
                              value={project.description || ''}
                              onChange={(e) => updateArrayItem(key, i, { ...project, description: e.target.value })}
                              className="w-full p-3 mb-3 bg-zinc-900 rounded-xl border border-zinc-800 outline-none"
                              rows={2}
                            />
                            <input
                              placeholder="Tech (comma-separated: React, Node.js, MongoDB)"
                              value={Array.isArray(project.tech) ? project.tech.join(', ') : ''}
                              onChange={(e) => updateArrayItem(key, i, { ...project, tech: e.target.value.split(',').map(t => t.trim()) })}
                              className="w-full p-3 mb-3 bg-zinc-900 rounded-xl border border-zinc-800 outline-none"
                            />
                            <button onClick={() => removeArrayItem(key, i)} className="w-full py-2 bg-red-600 rounded-xl text-sm">Remove Project</button>
                          </div>
                        ))}
                        <button onClick={() => addArrayItem(key, { id: value.length + 1, title: '', description: '', tech: [], color: 'from-blue-500 to-purple-600' })} className="mt-2 px-4 py-2 bg-green-600 rounded-xl text-sm">
                          + Add Project
                        </button>
                      </div>
                    );
                  }

                  // Service Cards
                  if (key === 'service_cards') {
                    return (
                      <div key={key} className="bg-zinc-900 rounded-xl p-6">
                        <label className="block text-sm text-gray-400 mb-4">Service Cards</label>
                        {value.map((card, i) => (
                          <div key={i} className="mb-3 p-3 bg-black rounded-xl">
                            <div className="flex gap-2 mb-2">
                              <input
                                placeholder="Emoji"
                                value={card.emoji || ''}
                                onChange={(e) => updateArrayItem(key, i, { ...card, emoji: e.target.value })}
                                className="w-20 p-3 bg-zinc-900 rounded-xl border border-zinc-800 outline-none"
                              />
                              <input
                                placeholder="Title"
                                value={card.title || ''}
                                onChange={(e) => updateArrayItem(key, i, { ...card, title: e.target.value })}
                                className="flex-1 p-3 bg-zinc-900 rounded-xl border border-zinc-800 outline-none"
                              />
                            </div>
                            <div className="flex gap-2">
                              <textarea
                                placeholder="Description"
                                value={card.description || ''}
                                onChange={(e) => updateArrayItem(key, i, { ...card, description: e.target.value })}
                                className="flex-1 p-3 bg-zinc-900 rounded-xl border border-zinc-800 outline-none"
                                rows={2}
                              />
                              <button onClick={() => removeArrayItem(key, i)} className="px-4 bg-red-600 rounded-xl">×</button>
                            </div>
                          </div>
                        ))}
                        <button onClick={() => addArrayItem(key, { emoji: '', title: '', description: '' })} className="mt-2 px-4 py-2 bg-green-600 rounded-xl text-sm">
                          + Add Card
                        </button>
                      </div>
                    );
                  }

                  // Skills Sections
                  if (key === 'skills_sections') {
                    return (
                      <div key={key} className="bg-zinc-900 rounded-xl p-6">
                        <label className="block text-sm text-gray-400 mb-4">Skills Sections</label>
                        {value.map((section, i) => (
                          <div key={i} className="mb-4 p-4 bg-black rounded-xl border border-zinc-800">
                            <div className="grid grid-cols-2 gap-3 mb-3">
                              <input
                                placeholder="Title"
                                value={section.title || ''}
                                onChange={(e) => updateArrayItem(key, i, { ...section, title: e.target.value })}
                                className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 outline-none"
                              />
                              <input
                                placeholder="Color (e.g., text-pink-500)"
                                value={section.color || ''}
                                onChange={(e) => updateArrayItem(key, i, { ...section, color: e.target.value })}
                                className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 outline-none"
                              />
                            </div>
                            <input
                              placeholder="Skills (comma-separated: HTML, CSS, JavaScript)"
                              value={Array.isArray(section.skills) ? section.skills.join(', ') : ''}
                              onChange={(e) => updateArrayItem(key, i, { ...section, skills: e.target.value.split(',').map(s => s.trim()) })}
                              className="w-full p-3 mb-3 bg-zinc-900 rounded-xl border border-zinc-800 outline-none"
                            />
                            <button onClick={() => removeArrayItem(key, i)} className="w-full py-2 bg-red-600 rounded-xl text-sm">Remove Section</button>
                          </div>
                        ))}
                        <button onClick={() => addArrayItem(key, { title: '', color: 'text-pink-500', skills: [] })} className="mt-2 px-4 py-2 bg-green-600 rounded-xl text-sm">
                          + Add Section
                        </button>
                      </div>
                    );
                  }

                  // Work History
                  if (key === 'work_history') {
                    return (
                      <div key={key} className="bg-zinc-900 rounded-xl p-6">
                        <label className="block text-sm text-gray-400 mb-4">Work History</label>
                        {value.map((job, i) => (
                          <div key={i} className="mb-4 p-4 bg-black rounded-xl border border-zinc-800">
                            <input
                              placeholder="Company"
                              value={job.company || ''}
                              onChange={(e) => updateArrayItem(key, i, { ...job, company: e.target.value })}
                              className="w-full p-3 mb-3 bg-zinc-900 rounded-xl border border-zinc-800 outline-none"
                            />
                            <input
                              placeholder="Position"
                              value={job.position || ''}
                              onChange={(e) => updateArrayItem(key, i, { ...job, position: e.target.value })}
                              className="w-full p-3 mb-3 bg-zinc-900 rounded-xl border border-zinc-800 outline-none"
                            />
                            <input
                              placeholder="Duration (e.g., 2022 - Present)"
                              value={job.duration || ''}
                              onChange={(e) => updateArrayItem(key, i, { ...job, duration: e.target.value })}
                              className="w-full p-3 mb-3 bg-zinc-900 rounded-xl border border-zinc-800 outline-none"
                            />
                            <textarea
                              placeholder="Description"
                              value={job.description || ''}
                              onChange={(e) => updateArrayItem(key, i, { ...job, description: e.target.value })}
                              className="w-full p-3 mb-3 bg-zinc-900 rounded-xl border border-zinc-800 outline-none"
                              rows={2}
                            />
                            <input
                              placeholder="Achievements (comma-separated)"
                              value={Array.isArray(job.achievements) ? job.achievements.join(', ') : ''}
                              onChange={(e) => updateArrayItem(key, i, { ...job, achievements: e.target.value.split(',').map(a => a.trim()) })}
                              className="w-full p-3 mb-3 bg-zinc-900 rounded-xl border border-zinc-800 outline-none"
                            />
                            <button onClick={() => removeArrayItem(key, i)} className="w-full py-2 bg-red-600 rounded-xl text-sm">Remove Job</button>
                          </div>
                        ))}
                        <button onClick={() => addArrayItem(key, { company: '', position: '', duration: '', description: '', achievements: [] })} className="mt-2 px-4 py-2 bg-green-600 rounded-xl text-sm">
                          + Add Job
                        </button>
                      </div>
                    );
                  }

                  // Education
                  if (key === 'education') {
                    return (
                      <div key={key} className="bg-zinc-900 rounded-xl p-6">
                        <label className="block text-sm text-gray-400 mb-4">Education</label>
                        {value.map((edu, i) => (
                          <div key={i} className="mb-4 p-4 bg-black rounded-xl border border-zinc-800">
                            <input
                              placeholder="Institution"
                              value={edu.institution || ''}
                              onChange={(e) => updateArrayItem(key, i, { ...edu, institution: e.target.value })}
                              className="w-full p-3 mb-3 bg-zinc-900 rounded-xl border border-zinc-800 outline-none"
                            />
                            <input
                              placeholder="Degree"
                              value={edu.degree || ''}
                              onChange={(e) => updateArrayItem(key, i, { ...edu, degree: e.target.value })}
                              className="w-full p-3 mb-3 bg-zinc-900 rounded-xl border border-zinc-800 outline-none"
                            />
                            <div className="grid grid-cols-2 gap-3 mb-3">
                              <input
                                placeholder="Year (e.g., 2018 - 2022)"
                                value={edu.year || ''}
                                onChange={(e) => updateArrayItem(key, i, { ...edu, year: e.target.value })}
                                className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 outline-none"
                              />
                              <input
                                placeholder="GPA (optional)"
                                value={edu.gpa || ''}
                                onChange={(e) => updateArrayItem(key, i, { ...edu, gpa: e.target.value })}
                                className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 outline-none"
                              />
                            </div>
                            <button onClick={() => removeArrayItem(key, i)} className="w-full py-2 bg-red-600 rounded-xl text-sm">Remove Education</button>
                          </div>
                        ))}
                        <button onClick={() => addArrayItem(key, { institution: '', degree: '', year: '', gpa: '' })} className="mt-2 px-4 py-2 bg-green-600 rounded-xl text-sm">
                          + Add Education
                        </button>
                      </div>
                    );
                  }

                  // Certifications
                  if (key === 'certifications') {
                    return (
                      <div key={key} className="bg-zinc-900 rounded-xl p-6">
                        <label className="block text-sm text-gray-400 mb-4">Certifications</label>
                        {value.map((cert, i) => (
                          <div key={i} className="mb-4 p-4 bg-black rounded-xl border border-zinc-800">
                            <input
                              placeholder="Certification Name"
                              value={cert.name || ''}
                              onChange={(e) => updateArrayItem(key, i, { ...cert, name: e.target.value })}
                              className="w-full p-3 mb-3 bg-zinc-900 rounded-xl border border-zinc-800 outline-none"
                            />
                            <input
                              placeholder="Issuer"
                              value={cert.issuer || ''}
                              onChange={(e) => updateArrayItem(key, i, { ...cert, issuer: e.target.value })}
                              className="w-full p-3 mb-3 bg-zinc-900 rounded-xl border border-zinc-800 outline-none"
                            />
                            <div className="grid grid-cols-2 gap-3 mb-3">
                              <input
                                placeholder="Year"
                                value={cert.year || ''}
                                onChange={(e) => updateArrayItem(key, i, { ...cert, year: e.target.value })}
                                className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 outline-none"
                              />
                              <input
                                placeholder="Credential URL (optional)"
                                value={cert.credential_url || ''}
                                onChange={(e) => updateArrayItem(key, i, { ...cert, credential_url: e.target.value })}
                                className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 outline-none"
                              />
                            </div>
                            <button onClick={() => removeArrayItem(key, i)} className="w-full py-2 bg-red-600 rounded-xl text-sm">Remove Certification</button>
                          </div>
                        ))}
                        <button onClick={() => addArrayItem(key, { name: '', issuer: '', year: '', credential_url: '' })} className="mt-2 px-4 py-2 bg-green-600 rounded-xl text-sm">
                          + Add Certification
                        </button>
                      </div>
                    );
                  }
                  
                  // Default: JSON textarea for complex arrays
                  return (
                    <div key={key}>
                      <label className="block text-sm text-gray-400 mb-2 capitalize">{key.replace(/_/g, ' ')}</label>
                      <textarea
                        value={JSON.stringify(value, null, 2)}
                        onChange={(e) => {
                          try {
                            updateField(key, JSON.parse(e.target.value));
                          } catch {}
                        }}
                        className="w-full p-4 bg-zinc-900 rounded-xl border border-zinc-800 outline-none font-mono text-sm"
                        rows={10}
                      />
                    </div>
                  );
                }
                
                // Handle image fields (profile_image_url, profile_image_hover_url, profile_image)
                if (key.includes('image') || key.includes('photo')) {
                  return (
                    <div key={key} className="bg-zinc-900 rounded-xl p-6">
                      <label className="block text-sm text-gray-400 mb-2 capitalize">{key.replace(/_/g, ' ')}</label>
                      
                      {/* Current Image Preview */}
                      {value && (
                        <div className="mb-4">
                          <img src={value} alt="Preview" className="w-32 h-32 object-cover rounded-xl border-2 border-yellow-600" />
                        </div>
                      )}
                      
                      {/* URL Input */}
                      <input
                        type="text"
                        value={value || ''}
                        onChange={(e) => updateField(key, e.target.value)}
                        placeholder="Enter image URL or upload file below"
                        className="w-full p-4 bg-black rounded-xl border border-zinc-800 outline-none mb-3"
                      />
                      
                      {/* File Upload */}
                      <div className="flex gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            
                            const fileExt = file.name.split('.').pop();
                            const fileName = `${Math.random()}.${fileExt}`;
                            const filePath = `${fileName}`;
                            
                            const { error: uploadError } = await supabase.storage
                              .from('portfolio-images')
                              .upload(filePath, file);
                            
                            if (uploadError) {
                              alert('Upload failed: ' + uploadError.message);
                              return;
                            }
                            
                            const { data } = supabase.storage
                              .from('portfolio-images')
                              .getPublicUrl(filePath);
                            
                            updateField(key, data.publicUrl);
                          }}
                          className="flex-1 p-3 bg-black rounded-xl border border-zinc-800 outline-none text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-600 file:text-white hover:file:bg-yellow-700"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Upload an image or paste a URL above</p>
                    </div>
                  );
                }
                
                // Handle regular text fields
                return (
                  <div key={key}>
                    <label className="block text-sm text-gray-400 mb-2 capitalize">{key.replace(/_/g, ' ')}</label>
                    <input
                      type="text"
                      value={value || ''}
                      onChange={(e) => updateField(key, e.target.value)}
                      className="w-full p-4 bg-zinc-900 rounded-xl border border-zinc-800 outline-none"
                    />
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="mt-8 px-10 py-4 rounded-full bg-yellow-600 hover:bg-yellow-700 transition font-semibold disabled:opacity-50 w-full sm:w-auto"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
          )}
        </main>
      </div>
    </div>
  );
}
