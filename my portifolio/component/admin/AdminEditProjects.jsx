import { useState } from 'react';
import { useSiteContent } from '../../src/context/SiteContentContext';

export default function AdminEditProjects() {
  const { projectsPage, projects, updateProjectsPage, addProject, updateProject, deleteProject } = useSiteContent();
  const [pageForm, setPageForm] = useState({
    subtitle: projectsPage.subtitle ?? '',
    title: projectsPage.title ?? '',
    intro_text: projectsPage.intro_text ?? '',
    cta_heading: projectsPage.cta_heading ?? '',
    cta_text: projectsPage.cta_text ?? '',
    cta_button_text: projectsPage.cta_button_text ?? '',
    cta_button_href: projectsPage.cta_button_href ?? '',
  });
  const [editingId, setEditingId] = useState(null);
  const [projectForm, setProjectForm] = useState({ title: '', description: '', tech: '[]', color: 'from-pink-600 to-purple-600', project_url: '#' });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSavePage = async (e) => {
    e.preventDefault();
    const err = await updateProjectsPage(pageForm);
    setMessage(err ? { type: 'error', text: err.message } : { type: 'success', text: 'Page content saved.' });
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    let tech = [];
    try {
      tech = JSON.parse(projectForm.tech);
    } catch (_) {}
    const err = await addProject({
      title: projectForm.title,
      description: projectForm.description,
      tech,
      color: projectForm.color,
      project_url: projectForm.project_url,
    });
    setMessage(err ? { type: 'error', text: err.message } : { type: 'success', text: 'Project added.' });
    if (!err) {
      setProjectForm({ title: '', description: '', tech: '[]', color: 'from-pink-600 to-purple-600', project_url: '#' });
    }
  };

  const handleUpdateProject = async (e, id) => {
    e.preventDefault();
    const p = (projects || []).find((x) => x.id === id);
    if (!p) return;
    let tech = p.tech;
    try {
      tech = JSON.parse(projectForm.tech);
    } catch (_) {}
    const err = await updateProject(id, {
      title: projectForm.title,
      description: projectForm.description,
      tech,
      color: projectForm.color,
      project_url: projectForm.project_url,
    });
    setMessage(err ? { type: 'error', text: err.message } : { type: 'success', text: 'Project updated.' });
    if (!err) setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    const err = await deleteProject(id);
    setMessage(err ? { type: 'error', text: err.message } : { type: 'success', text: 'Project deleted.' });
    setEditingId(null);
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setProjectForm({
      title: p.title,
      description: p.description,
      tech: JSON.stringify(p.tech ?? [], null, 2),
      color: p.color ?? 'from-pink-600 to-purple-600',
      project_url: p.project_url ?? '#',
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Projects</h1>
      {message.text && <p className={'mb-4 ' + (message.type === 'error' ? 'text-red-400' : 'text-green-400')}>{message.text}</p>}

      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4">Page content</h2>
        <form onSubmit={handleSavePage} className="space-y-4 max-w-xl">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Subtitle</label>
            <input value={pageForm.subtitle} onChange={(e) => setPageForm((f) => ({ ...f, subtitle: e.target.value }))} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Title</label>
            <input value={pageForm.title} onChange={(e) => setPageForm((f) => ({ ...f, title: e.target.value }))} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Intro text</label>
            <textarea value={pageForm.intro_text} onChange={(e) => setPageForm((f) => ({ ...f, intro_text: e.target.value }))} rows={2} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">CTA heading</label>
            <input value={pageForm.cta_heading} onChange={(e) => setPageForm((f) => ({ ...f, cta_heading: e.target.value }))} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">CTA text</label>
            <textarea value={pageForm.cta_text} onChange={(e) => setPageForm((f) => ({ ...f, cta_text: e.target.value }))} rows={2} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">CTA button text</label>
              <input value={pageForm.cta_button_text} onChange={(e) => setPageForm((f) => ({ ...f, cta_button_text: e.target.value }))} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">CTA button href</label>
              <input value={pageForm.cta_button_href} onChange={(e) => setPageForm((f) => ({ ...f, cta_button_href: e.target.value }))} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" />
            </div>
          </div>
          <button type="submit" className="px-6 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 font-semibold">Save page</button>
        </form>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4">Add project</h2>
        <form onSubmit={handleAddProject} className="space-y-4 max-w-xl">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Title</label>
            <input value={projectForm.title} onChange={(e) => setProjectForm((f) => ({ ...f, title: e.target.value }))} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" required />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Description</label>
            <textarea value={projectForm.description} onChange={(e) => setProjectForm((f) => ({ ...f, description: e.target.value }))} rows={2} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" required />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Tech (JSON array)</label>
            <textarea value={projectForm.tech} onChange={(e) => setProjectForm((f) => ({ ...f, tech: e.target.value }))} rows={2} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none font-mono text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Color (Tailwind gradient)</label>
              <input value={projectForm.color} onChange={(e) => setProjectForm((f) => ({ ...f, color: e.target.value }))} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" placeholder="from-pink-600 to-purple-600" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Project URL</label>
              <input value={projectForm.project_url} onChange={(e) => setProjectForm((f) => ({ ...f, project_url: e.target.value }))} className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:border-pink-500 outline-none" />
            </div>
          </div>
          <button type="submit" className="px-6 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 font-semibold">Add project</button>
        </form>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Existing projects</h2>
        <ul className="space-y-4 max-w-xl">
          {(projects || []).map((p) => (
            <li key={p.id} className="bg-zinc-800 rounded-xl p-4">
              {editingId === p.id ? (
                <form onSubmit={(e) => handleUpdateProject(e, p.id)} className="space-y-3">
                  <input value={projectForm.title} onChange={(e) => setProjectForm((f) => ({ ...f, title: e.target.value }))} className="w-full p-2 bg-zinc-900 rounded border border-zinc-700" placeholder="Title" />
                  <textarea value={projectForm.description} onChange={(e) => setProjectForm((f) => ({ ...f, description: e.target.value }))} rows={2} className="w-full p-2 bg-zinc-900 rounded border border-zinc-700" placeholder="Description" />
                  <input value={projectForm.tech} onChange={(e) => setProjectForm((f) => ({ ...f, tech: e.target.value }))} className="w-full p-2 bg-zinc-900 rounded border border-zinc-700 font-mono text-sm" placeholder="Tech JSON" />
                  <div className="flex gap-2">
                    <button type="submit" className="px-4 py-2 rounded bg-pink-600 text-sm">Save</button>
                    <button type="button" onClick={() => setEditingId(null)} className="px-4 py-2 rounded bg-zinc-700 text-sm">Cancel</button>
                    <button type="button" onClick={() => handleDelete(p.id)} className="px-4 py-2 rounded bg-red-900 text-sm">Delete</button>
                  </div>
                </form>
              ) : (
                <>
                  <p className="font-medium">{p.title}</p>
                  <p className="text-sm text-gray-400">{p.description}</p>
                  <button type="button" onClick={() => startEdit(p)} className="mt-2 text-pink-500 text-sm hover:underline">Edit</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
