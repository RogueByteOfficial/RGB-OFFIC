import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Smartphone, 
  Star, 
  ExternalLink, 
  Eye, 
  EyeOff, 
  Layers, 
  X,
  Sparkles,
  Github,
  Globe,
  Tag
} from 'lucide-react';
import { getApplications, saveApplication, deleteApplication } from '../../services/firestore';
import { Application, ApplicationStatus, LocalizedString } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Toast } from '../../components/ui/Toast';
import { ImageUpload } from '../../components/ui/ImageUpload';

const emptyApp: Omit<Application, 'id'> = {
  name: { ar: '', en: '' },
  shortDesc: { ar: '', en: '' },
  fullDesc: { ar: '', en: '' },
  logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80',
  coverImageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80',
  screenshots: [],
  features: [],
  technologies: ['Flutter', 'Firebase', 'TypeScript', 'Node.js'],
  version: '1.0.0',
  releaseDate: new Date().toISOString().split('T')[0],
  status: 'live',
  googlePlayUrl: '',
  appStoreUrl: '',
  websiteUrl: '',
  githubUrl: '',
  order: 1,
  isFeatured: true,
  isActive: true,
};

export const AdminApplications: React.FC = () => {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<Partial<Application> | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Helper inputs
  const [techInput, setTechInput] = useState('');
  const [featureAr, setFeatureAr] = useState('');
  const [featureEn, setFeatureEn] = useState('');
  const [screenshotInput, setScreenshotInput] = useState('');

  const { localize } = useLanguage();

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getApplications();
      setApps(data);
    } catch (e) {
      console.error(e);
      setToast({ message: 'Failed to fetch applications', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCreate = () => {
    setEditingApp({ ...emptyApp, order: apps.length + 1 });
    setTechInput('');
    setFeatureAr('');
    setFeatureEn('');
    setScreenshotInput('');
    setModalOpen(true);
  };

  const handleOpenEdit = (app: Application) => {
    setEditingApp({ ...app });
    setTechInput('');
    setFeatureAr('');
    setFeatureEn('');
    setScreenshotInput('');
    setModalOpen(true);
  };

  const handleToggleActive = async (app: Application) => {
    try {
      const updated = { ...app, isActive: !app.isActive };
      await saveApplication(updated);
      setApps(apps.map((a) => (a.id === app.id ? updated : a)));
      setToast({ message: 'Status updated!', type: 'success' });
    } catch (e) {
      setToast({ message: 'Failed to update status', type: 'error' });
    }
  };

  const handleToggleFeatured = async (app: Application) => {
    try {
      const updated = { ...app, isFeatured: !app.isFeatured };
      await saveApplication(updated);
      setApps(apps.map((a) => (a.id === app.id ? updated : a)));
      setToast({ message: 'Featured status updated!', type: 'success' });
    } catch (e) {
      setToast({ message: 'Failed to update featured', type: 'error' });
    }
  };

  const handleAddTech = () => {
    if (!techInput.trim() || !editingApp) return;
    const current = editingApp.technologies || [];
    if (!current.includes(techInput.trim())) {
      setEditingApp({ ...editingApp, technologies: [...current, techInput.trim()] });
    }
    setTechInput('');
  };

  const handleRemoveTech = (tech: string) => {
    if (!editingApp) return;
    setEditingApp({
      ...editingApp,
      technologies: (editingApp.technologies || []).filter((t) => t !== tech),
    });
  };

  const handleAddFeature = () => {
    if (!featureAr.trim() && !featureEn.trim()) return;
    if (!editingApp) return;
    const newFeature: LocalizedString = {
      ar: featureAr.trim() || featureEn.trim(),
      en: featureEn.trim() || featureAr.trim(),
    };
    setEditingApp({
      ...editingApp,
      features: [...(editingApp.features || []), newFeature],
    });
    setFeatureAr('');
    setFeatureEn('');
  };

  const handleRemoveFeature = (index: number) => {
    if (!editingApp) return;
    const updated = [...(editingApp.features || [])];
    updated.splice(index, 1);
    setEditingApp({ ...editingApp, features: updated });
  };

  const handleAddScreenshot = (url: string) => {
    if (!url || !editingApp) return;
    setEditingApp({
      ...editingApp,
      screenshots: [...(editingApp.screenshots || []), url],
    });
    setScreenshotInput('');
  };

  const handleRemoveScreenshot = (index: number) => {
    if (!editingApp) return;
    const updated = [...(editingApp.screenshots || [])];
    updated.splice(index, 1);
    setEditingApp({ ...editingApp, screenshots: updated });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingApp) return;

    if (!editingApp.name?.en || !editingApp.name?.ar) {
      setToast({ message: 'Application name is required in Arabic & English', type: 'error' });
      return;
    }

    try {
      setSaving(true);
      await saveApplication(editingApp);
      setToast({ message: 'Application saved successfully!', type: 'success' });
      setModalOpen(false);
      setEditingApp(null);
      await loadData();
    } catch (e) {
      console.error(e);
      setToast({ message: 'Failed to save application', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await deleteApplication(deleteConfirmId);
      setToast({ message: 'Application deleted successfully', type: 'success' });
      setDeleteConfirmId(null);
      await loadData();
    } catch (e) {
      setToast({ message: 'Failed to delete application', type: 'error' });
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
            <Smartphone className="w-5 h-5 text-blue-500" />
            <span>Applications & Products</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage your flagship mobile and web applications, version releases, store download links, and screenshot galleries.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/30 transition flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Application</span>
        </button>
      </div>

      {/* App Cards List */}
      {loading ? (
        <div className="text-center py-16 text-slate-400 text-sm">Loading applications...</div>
      ) : apps.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-500 flex items-center justify-center mx-auto">
            <Smartphone className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">No Applications Found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Publish your mobile apps, SaaS platforms, and enterprise tools to showcase on the website.
          </p>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
          >
            Create First Application
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
            <div
              key={app.id}
              className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all overflow-hidden shadow-sm flex flex-col justify-between ${
                app.isActive
                  ? 'border-slate-200 dark:border-slate-800'
                  : 'border-slate-200/50 dark:border-slate-800/40 opacity-70'
              }`}
            >
              <div>
                {/* Header Cover & Logo */}
                <div className="relative h-32 w-full bg-slate-950 overflow-hidden">
                  <img
                    src={app.coverImageUrl}
                    alt={localize(app.name)}
                    className="w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Status / Featured */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                        app.status === 'live'
                          ? 'bg-emerald-500/90 text-white'
                          : app.status === 'beta'
                          ? 'bg-amber-500/90 text-white'
                          : 'bg-indigo-500/90 text-white'
                      }`}
                    >
                      {app.status.replace('_', ' ')}
                    </span>
                    {app.isFeatured && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-500/90 text-white text-[10px] font-bold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>

                  <div className="absolute -bottom-4 right-4 w-12 h-12 rounded-xl bg-white dark:bg-slate-800 p-1 shadow-lg border border-slate-200 dark:border-slate-700">
                    <img
                      src={app.logoUrl}
                      alt={localize(app.name)}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 pt-6 space-y-3">
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                      {localize(app.name)}
                    </h3>
                    <span className="text-[11px] text-blue-500 font-semibold">
                      v{app.version} • {app.releaseDate}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {localize(app.shortDesc)}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {app.technologies?.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-medium"
                      >
                        {t}
                      </span>
                    ))}
                    {(app.technologies?.length || 0) > 3 && (
                      <span className="px-1.5 py-0.5 text-slate-400 text-[10px]">
                        +{app.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleActive(app)}
                    title={app.isActive ? 'Hide Application' : 'Publish Application'}
                    className={`p-1.5 rounded-lg text-xs font-bold transition ${
                      app.isActive
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {app.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => handleToggleFeatured(app)}
                    title={app.isFeatured ? 'Unmark Featured' : 'Mark as Featured'}
                    className={`p-1.5 rounded-lg text-xs transition ${
                      app.isFeatured
                        ? 'bg-amber-500/10 text-amber-500'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400 hover:text-amber-500'
                    }`}
                  >
                    <Star className={`w-4 h-4 ${app.isFeatured ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(app)}
                    className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-lg transition"
                    title="Edit"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(app.id)}
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
        title={editingApp?.id ? 'Edit Application' : 'Create Application'}
        size="xl"
      >
        <form onSubmit={handleSave} className="space-y-6 max-h-[75vh] overflow-y-auto pr-1">
          {/* General Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Release Version
              </label>
              <input
                type="text"
                value={editingApp?.version || ''}
                onChange={(e) => setEditingApp((prev) => prev ? { ...prev, version: e.target.value } : null)}
                placeholder="e.g. 1.2.0"
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Release Date
              </label>
              <input
                type="date"
                value={editingApp?.releaseDate || ''}
                onChange={(e) => setEditingApp((prev) => prev ? { ...prev, releaseDate: e.target.value } : null)}
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Deployment Status
              </label>
              <select
                value={editingApp?.status || 'live'}
                onChange={(e) => setEditingApp((prev) => prev ? { ...prev, status: e.target.value as ApplicationStatus } : null)}
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              >
                <option value="live">Live / In Production</option>
                <option value="beta">Beta Testing</option>
                <option value="in_development">In Development</option>
              </select>
            </div>
          </div>

          {/* Names in Arabic & English */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Application Name (Arabic) *
              </label>
              <input
                type="text"
                dir="rtl"
                required
                value={editingApp?.name?.ar || ''}
                onChange={(e) =>
                  setEditingApp((prev) =>
                    prev ? { ...prev, name: { ...prev.name!, ar: e.target.value } } : null
                  )
                }
                placeholder="اسم التطبيق بالعربية"
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Application Name (English) *
              </label>
              <input
                type="text"
                required
                value={editingApp?.name?.en || ''}
                onChange={(e) =>
                  setEditingApp((prev) =>
                    prev ? { ...prev, name: { ...prev.name!, en: e.target.value } } : null
                  )
                }
                placeholder="Application Name in English"
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>
          </div>

          {/* Short Descriptions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Short Description (Arabic)
              </label>
              <textarea
                dir="rtl"
                rows={2}
                value={editingApp?.shortDesc?.ar || ''}
                onChange={(e) =>
                  setEditingApp((prev) =>
                    prev ? { ...prev, shortDesc: { ...prev.shortDesc!, ar: e.target.value } } : null
                  )
                }
                placeholder="نبذة موجزة للبطاقات..."
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Short Description (English)
              </label>
              <textarea
                rows={2}
                value={editingApp?.shortDesc?.en || ''}
                onChange={(e) =>
                  setEditingApp((prev) =>
                    prev ? { ...prev, shortDesc: { ...prev.shortDesc!, en: e.target.value } } : null
                  )
                }
                placeholder="Short card summary..."
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>
          </div>

          {/* Full Descriptions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Full Description (Arabic)
              </label>
              <textarea
                dir="rtl"
                rows={4}
                value={editingApp?.fullDesc?.ar || ''}
                onChange={(e) =>
                  setEditingApp((prev) =>
                    prev ? { ...prev, fullDesc: { ...prev.fullDesc!, ar: e.target.value } } : null
                  )
                }
                placeholder="الشرح والتفاصيل الكاملة لصفحة التطبيق..."
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Full Description (English)
              </label>
              <textarea
                rows={4}
                value={editingApp?.fullDesc?.en || ''}
                onChange={(e) =>
                  setEditingApp((prev) =>
                    prev ? { ...prev, fullDesc: { ...prev.fullDesc!, en: e.target.value } } : null
                  )
                }
                placeholder="Complete application breakdown for details page..."
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>
          </div>

          {/* Images: Logo & Cover */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ImageUpload
              label="App Icon / Logo"
              value={editingApp?.logoUrl || ''}
              onChange={(url) => setEditingApp((prev) => prev ? { ...prev, logoUrl: url } : null)}
              folder="applications"
              aspect="square"
            />
            <ImageUpload
              label="Cover Hero Banner"
              value={editingApp?.coverImageUrl || ''}
              onChange={(url) => setEditingApp((prev) => prev ? { ...prev, coverImageUrl: url } : null)}
              folder="applications"
              aspect="video"
            />
          </div>

          {/* Store & Download Links */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Store & Download Links
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={editingApp?.googlePlayUrl || ''}
                onChange={(e) => setEditingApp((prev) => prev ? { ...prev, googlePlayUrl: e.target.value } : null)}
                placeholder="Google Play Store URL"
                className="px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
              <input
                type="text"
                value={editingApp?.appStoreUrl || ''}
                onChange={(e) => setEditingApp((prev) => prev ? { ...prev, appStoreUrl: e.target.value } : null)}
                placeholder="Apple App Store URL"
                className="px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
              <input
                type="text"
                value={editingApp?.websiteUrl || ''}
                onChange={(e) => setEditingApp((prev) => prev ? { ...prev, websiteUrl: e.target.value } : null)}
                placeholder="Web Application / Demo URL"
                className="px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
              <input
                type="text"
                value={editingApp?.githubUrl || ''}
                onChange={(e) => setEditingApp((prev) => prev ? { ...prev, githubUrl: e.target.value } : null)}
                placeholder="GitHub Repository URL"
                className="px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Tech Stack & Libraries
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
                placeholder="e.g. Flutter, React Native, Firebase, GraphQL"
                className="flex-1 px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
              <button
                type="button"
                onClick={handleAddTech}
                className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold"
              >
                Add Tech
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {editingApp?.technologies?.map((tech, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 text-xs font-semibold"
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

          {/* Features List (AR & EN) */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Key Features & Capabilities (AR & EN)
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                dir="rtl"
                value={featureAr}
                onChange={(e) => setFeatureAr(e.target.value)}
                placeholder="ميزة جديدة بالعربية..."
                className="px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
              <input
                type="text"
                value={featureEn}
                onChange={(e) => setFeatureEn(e.target.value)}
                placeholder="Feature in English..."
                className="px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>

            <button
              type="button"
              onClick={handleAddFeature}
              className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-xl text-xs font-bold border border-blue-200 dark:border-blue-800 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Feature Bullet</span>
            </button>

            {/* Render added features */}
            <div className="space-y-1.5 pt-2">
              {editingApp?.features?.map((f, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs"
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{f.en}</span>
                    <span className="text-[11px] text-slate-500" dir="rtl">{f.ar}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="p-1 text-slate-400 hover:text-rose-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Screenshot Gallery */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              App Screenshots Gallery
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={screenshotInput}
                onChange={(e) => setScreenshotInput(e.target.value)}
                placeholder="Paste Screenshot Image URL"
                className="flex-1 px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
              <button
                type="button"
                onClick={() => handleAddScreenshot(screenshotInput.trim())}
                className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold"
              >
                Add Image
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {editingApp?.screenshots?.map((url, idx) => (
                <div key={idx} className="relative group rounded-xl overflow-hidden aspect-[9/16] bg-slate-950 border border-slate-200 dark:border-slate-700">
                  <img src={url} alt={`Screenshot ${idx}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveScreenshot(idx)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 text-white hover:bg-rose-600 transition"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={editingApp?.isActive ?? true}
                onChange={(e) => setEditingApp((prev) => prev ? { ...prev, isActive: e.target.checked } : null)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Published & Visible</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={editingApp?.isFeatured ?? false}
                onChange={(e) => setEditingApp((prev) => prev ? { ...prev, isFeatured: e.target.checked } : null)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Mark as Flagship / Featured</span>
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
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/30 transition"
            >
              {saving ? 'Saving...' : 'Save Application'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteConfirmId}
        title="Delete Application"
        message="Are you sure you want to permanently delete this application?"
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
};
