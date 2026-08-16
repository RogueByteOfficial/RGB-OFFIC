import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Briefcase, 
  Star, 
  ExternalLink, 
  X, 
  Github, 
  Calendar, 
  UserCheck, 
  Sparkles,
  Tag
} from 'lucide-react';
import { getProjects, saveProject, deleteProject } from '../../services/firestore';
import { Project, ProjectStatus, LocalizedString } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Toast } from '../../components/ui/Toast';
import { ImageUpload } from '../../components/ui/ImageUpload';

const emptyProject: Omit<Project, 'id'> = {
  title: { ar: '', en: '' },
  category: { ar: '', en: '' },
  description: { ar: '', en: '' },
  clientName: '',
  coverImageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  gallery: [],
  technologies: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
  projectUrl: '',
  githubUrl: '',
  date: new Date().getFullYear().toString(),
  status: 'completed',
  isFeatured: true,
  order: 1,
};

export const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Chip helpers
  const [techInput, setTechInput] = useState('');
  const [galleryInput, setGalleryInput] = useState('');

  const { localize } = useLanguage();

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(data);
    } catch (e) {
      console.error(e);
      setToast({ message: 'Failed to fetch projects', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCreate = () => {
    setEditingProject({ ...emptyProject, order: projects.length + 1 });
    setTechInput('');
    setGalleryInput('');
    setModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject({ ...project });
    setTechInput('');
    setGalleryInput('');
    setModalOpen(true);
  };

  const handleToggleFeatured = async (project: Project) => {
    try {
      const updated = { ...project, isFeatured: !project.isFeatured };
      await saveProject(updated);
      setProjects(projects.map((p) => (p.id === project.id ? updated : p)));
      setToast({ message: 'Featured status updated!', type: 'success' });
    } catch (e) {
      setToast({ message: 'Failed to update featured', type: 'error' });
    }
  };

  const handleAddTech = () => {
    if (!techInput.trim() || !editingProject) return;
    const current = editingProject.technologies || [];
    if (!current.includes(techInput.trim())) {
      setEditingProject({ ...editingProject, technologies: [...current, techInput.trim()] });
    }
    setTechInput('');
  };

  const handleRemoveTech = (tech: string) => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      technologies: (editingProject.technologies || []).filter((t) => t !== tech),
    });
  };

  const handleAddGalleryImage = (url: string) => {
    if (!url || !editingProject) return;
    setEditingProject({
      ...editingProject,
      gallery: [...(editingProject.gallery || []), url],
    });
    setGalleryInput('');
  };

  const handleRemoveGalleryImage = (index: number) => {
    if (!editingProject) return;
    const updated = [...(editingProject.gallery || [])];
    updated.splice(index, 1);
    setEditingProject({ ...editingProject, gallery: updated });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (!editingProject.title?.en || !editingProject.title?.ar) {
      setToast({ message: 'Project title is required in Arabic & English', type: 'error' });
      return;
    }

    try {
      setSaving(true);
      await saveProject(editingProject);
      setToast({ message: 'Project saved successfully!', type: 'success' });
      setModalOpen(false);
      setEditingProject(null);
      await loadData();
    } catch (e) {
      console.error(e);
      setToast({ message: 'Failed to save project', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await deleteProject(deleteConfirmId);
      setToast({ message: 'Project deleted successfully', type: 'success' });
      setDeleteConfirmId(null);
      await loadData();
    } catch (e) {
      setToast({ message: 'Failed to delete project', type: 'error' });
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Briefcase className="w-5 h-5 text-emerald-500" />
            <span>Projects & Portfolio</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Showcase enterprise systems, web portals, cloud migrations, and completed client client deliverables.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/30 transition flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects List */}
      {loading ? (
        <div className="text-center py-16 text-slate-400 text-sm">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center mx-auto">
            <Briefcase className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">No Projects Added Yet</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Add completed client work, enterprise platforms, and open-source contributions.
          </p>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
          >
            Create First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 transition-all overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Media Preview */}
                <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                  <img
                    src={project.coverImageUrl}
                    alt={localize(project.title)}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                        project.status === 'completed'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-600 text-white'
                      }`}
                    >
                      {project.status}
                    </span>
                    {project.category && (
                      <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium border border-white/10">
                        {localize(project.category)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleToggleFeatured(project)}
                    className={`absolute top-3 right-3 p-1.5 rounded-lg backdrop-blur-md transition ${
                      project.isFeatured
                        ? 'bg-amber-500 text-white'
                        : 'bg-black/60 text-slate-300 hover:text-amber-400'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${project.isFeatured ? 'fill-current' : ''}`} />
                  </button>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-black text-base truncate">
                      {localize(project.title)}
                    </h3>
                    {project.clientName && (
                      <span className="text-[11px] text-emerald-400 font-medium">
                        Client: {project.clientName}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {localize(project.description)}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {project.technologies?.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-medium"
                      >
                        {t}
                      </span>
                    ))}
                    {(project.technologies?.length || 0) > 3 && (
                      <span className="px-1.5 py-0.5 text-slate-400 text-[10px]">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">
                  Year: {project.date || '—'}
                </span>

                <div className="flex items-center gap-1.5">
                  {project.projectUrl && (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-400 hover:text-blue-500 rounded-lg transition"
                      title="Live Preview"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => handleOpenEdit(project)}
                    className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-lg transition"
                    title="Edit"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(project.id)}
                    className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProject?.id ? 'Edit Portfolio Project' : 'Add Portfolio Project'}
        size="xl"
      >
        <form onSubmit={handleSave} className="space-y-6 max-h-[75vh] overflow-y-auto pr-1">
          {/* Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Client / Company Name
              </label>
              <input
                type="text"
                value={editingProject?.clientName || ''}
                onChange={(e) => setEditingProject((prev) => prev ? { ...prev, clientName: e.target.value } : null)}
                placeholder="e.g. Apex Health Corp"
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Completion Year / Date
              </label>
              <input
                type="text"
                value={editingProject?.date || ''}
                onChange={(e) => setEditingProject((prev) => prev ? { ...prev, date: e.target.value } : null)}
                placeholder="e.g. 2025"
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Project Status
              </label>
              <select
                value={editingProject?.status || 'completed'}
                onChange={(e) => setEditingProject((prev) => prev ? { ...prev, status: e.target.value as ProjectStatus } : null)}
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              >
                <option value="completed">Completed / Delivered</option>
                <option value="ongoing">Ongoing / Under Maintenance</option>
              </select>
            </div>
          </div>

          {/* Titles in Arabic & English */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Project Title (Arabic) *
              </label>
              <input
                type="text"
                dir="rtl"
                required
                value={editingProject?.title?.ar || ''}
                onChange={(e) =>
                  setEditingProject((prev) =>
                    prev ? { ...prev, title: { ...prev.title!, ar: e.target.value } } : null
                  )
                }
                placeholder="عنوان المشروع بالعربية"
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Project Title (English) *
              </label>
              <input
                type="text"
                required
                value={editingProject?.title?.en || ''}
                onChange={(e) =>
                  setEditingProject((prev) =>
                    prev ? { ...prev, title: { ...prev.title!, en: e.target.value } } : null
                  )
                }
                placeholder="Project Title in English"
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>
          </div>

          {/* Categories AR/EN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Category (Arabic)
              </label>
              <input
                type="text"
                dir="rtl"
                value={editingProject?.category?.ar || ''}
                onChange={(e) =>
                  setEditingProject((prev) =>
                    prev ? { ...prev, category: { ar: e.target.value, en: prev.category?.en || '' } } : null
                  )
                }
                placeholder="مثال: الحوسبة السحابية والمؤسسات"
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Category (English)
              </label>
              <input
                type="text"
                value={editingProject?.category?.en || ''}
                onChange={(e) =>
                  setEditingProject((prev) =>
                    prev ? { ...prev, category: { en: e.target.value, ar: prev.category?.ar || '' } } : null
                  )
                }
                placeholder="e.g. Cloud Infrastructure"
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>
          </div>

          {/* Descriptions AR/EN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Description (Arabic)
              </label>
              <textarea
                dir="rtl"
                rows={3}
                value={editingProject?.description?.ar || ''}
                onChange={(e) =>
                  setEditingProject((prev) =>
                    prev ? { ...prev, description: { ...prev.description!, ar: e.target.value } } : null
                  )
                }
                placeholder="تفاصيل المشروع باللغة العربية..."
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Description (English)
              </label>
              <textarea
                rows={3}
                value={editingProject?.description?.en || ''}
                onChange={(e) =>
                  setEditingProject((prev) =>
                    prev ? { ...prev, description: { ...prev.description!, en: e.target.value } } : null
                  )
                }
                placeholder="Detailed project summary in English..."
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <ImageUpload
              label="Project Main Cover Image"
              value={editingProject?.coverImageUrl || ''}
              onChange={(url) => setEditingProject((prev) => prev ? { ...prev, coverImageUrl: url } : null)}
              folder="projects"
              aspect="video"
            />
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Live URL / Case Study Link
              </label>
              <input
                type="text"
                value={editingProject?.projectUrl || ''}
                onChange={(e) => setEditingProject((prev) => prev ? { ...prev, projectUrl: e.target.value } : null)}
                placeholder="https://..."
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                GitHub Repository URL
              </label>
              <input
                type="text"
                value={editingProject?.githubUrl || ''}
                onChange={(e) => setEditingProject((prev) => prev ? { ...prev, githubUrl: e.target.value } : null)}
                placeholder="https://github.com/..."
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Technologies Used
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTech();
                  }
                }}
                placeholder="e.g. Next.js, Docker, Kubernetes"
                className="flex-1 px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
              <button
                type="button"
                onClick={handleAddTech}
                className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {editingProject?.technologies?.map((tech, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold"
                >
                  <span>{tech}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(tech)}
                    className="hover:text-rose-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={editingProject?.isFeatured ?? true}
                onChange={(e) => setEditingProject((prev) => prev ? { ...prev, isFeatured: e.target.checked } : null)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Highlight on Homepage as Featured Work</span>
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/30 transition"
            >
              {saving ? 'Saving...' : 'Save Project'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteConfirmId}
        title="Delete Project"
        message="Are you sure you want to permanently delete this project record?"
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
};
