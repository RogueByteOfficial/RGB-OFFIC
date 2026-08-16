import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  EyeOff, 
  ExternalLink, 
  Image as ImageIcon, 
  ArrowUpDown, 
  Check, 
  Sparkles,
  Layers
} from 'lucide-react';
import { getBanners, saveBanner, deleteBanner } from '../../services/firestore';
import { Banner, LocalizedString } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Toast } from '../../components/ui/Toast';
import { ImageUpload } from '../../components/ui/ImageUpload';

const emptyLocalizedString: LocalizedString = { ar: '', en: '' };

const emptyBanner: Omit<Banner, 'id'> = {
  title: { ar: '', en: '' },
  subtitle: { ar: '', en: '' },
  description: { ar: '', en: '' },
  badge: { ar: '', en: '' },
  buttonText: { ar: 'اكتشف المزيد', en: 'Explore More' },
  buttonLink: '/applications',
  secondaryButtonText: { ar: 'تواصل معنا', en: 'Contact Us' },
  secondaryButtonLink: '/contact',
  imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80',
  order: 1,
  isActive: true,
};

export const AdminBanners: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Partial<Banner> | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const { localize } = useLanguage();

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getBanners();
      setBanners(data);
    } catch (e) {
      console.error(e);
      setToast({ message: 'Failed to fetch banners', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCreate = () => {
    setEditingBanner({ ...emptyBanner, order: banners.length + 1 });
    setModalOpen(true);
  };

  const handleOpenEdit = (banner: Banner) => {
    setEditingBanner({ ...banner });
    setModalOpen(true);
  };

  const handleToggleActive = async (banner: Banner) => {
    try {
      const updated = { ...banner, isActive: !banner.isActive };
      await saveBanner(updated);
      setBanners(banners.map((b) => (b.id === banner.id ? updated : b)));
      setToast({ message: `Banner status updated!`, type: 'success' });
    } catch (e) {
      setToast({ message: 'Failed to update status', type: 'error' });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBanner) return;

    if (!editingBanner.title?.en || !editingBanner.title?.ar) {
      setToast({ message: 'Please provide titles in both Arabic and English', type: 'error' });
      return;
    }

    try {
      setSaving(true);
      await saveBanner(editingBanner);
      setToast({ message: 'Banner saved successfully!', type: 'success' });
      setModalOpen(false);
      setEditingBanner(null);
      await loadData();
    } catch (e) {
      console.error(e);
      setToast({ message: 'Error saving banner', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await deleteBanner(deleteConfirmId);
      setToast({ message: 'Banner deleted successfully', type: 'success' });
      setDeleteConfirmId(null);
      await loadData();
    } catch (e) {
      setToast({ message: 'Failed to delete banner', type: 'error' });
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
            <ImageIcon className="w-5 h-5 text-blue-500" />
            <span>Hero Slider & Banners</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage the top interactive slider on your homepage with bilingual copy, CTA links, and visual backgrounds.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/30 transition flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Banner</span>
        </button>
      </div>

      {/* List / Cards */}
      {loading ? (
        <div className="text-center py-16 text-slate-400 text-sm">Loading banners...</div>
      ) : banners.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-500 flex items-center justify-center mx-auto">
            <ImageIcon className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">No Hero Banners Found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Add hero banners to showcase your brand vision, latest flagship application, or primary technology services.
          </p>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
          >
            Create First Banner
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all overflow-hidden shadow-sm flex flex-col justify-between ${
                banner.isActive
                  ? 'border-slate-200 dark:border-slate-800'
                  : 'border-slate-200/50 dark:border-slate-800/40 opacity-70'
              }`}
            >
              {/* Preview banner media */}
              <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                <img
                  src={banner.imageUrl}
                  alt={localize(banner.title)}
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                {/* Badges / Order */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[10px] font-bold border border-white/10">
                    Order: #{banner.order}
                  </span>
                  {banner.badge && (
                    <span className="px-2.5 py-1 rounded-lg bg-blue-600/90 text-white text-[10px] font-bold">
                      {localize(banner.badge)}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-xs font-semibold text-blue-400">
                    {banner.subtitle ? localize(banner.subtitle) : ''}
                  </div>
                  <h3 className="text-base font-black truncate">
                    {localize(banner.title)}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {localize(banner.description)}
                </p>

                <div className="flex flex-wrap gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Primary CTA:
                  </span>
                  <span className="truncate max-w-[150px]">{localize(banner.buttonText)} ({banner.buttonLink})</span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => handleToggleActive(banner)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                    banner.isActive
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500 border border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {banner.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{banner.isActive ? 'Active' : 'Disabled'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(banner)}
                    className="p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-xl transition"
                    title="Edit Banner"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(banner.id)}
                    className="p-2 text-slate-600 dark:text-slate-300 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition"
                    title="Delete Banner"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Create Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingBanner?.id ? 'Edit Hero Banner' : 'Create New Hero Banner'}
        size="lg"
      >
        <form onSubmit={handleSave} className="space-y-6">
          {/* Order & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Display Order
              </label>
              <input
                type="number"
                value={editingBanner?.order || 1}
                onChange={(e) =>
                  setEditingBanner((prev) => prev ? { ...prev, order: parseInt(e.target.value) || 1 } : null)
                }
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center pt-6">
              <label className="relative flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={editingBanner?.isActive ?? true}
                  onChange={(e) =>
                    setEditingBanner((prev) => prev ? { ...prev, isActive: e.target.checked } : null)
                  }
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Active & Visible on Homepage</span>
              </label>
            </div>
          </div>

          {/* Titles in Arabic & English */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Title (Arabic) *
              </label>
              <input
                type="text"
                dir="rtl"
                required
                value={editingBanner?.title?.ar || ''}
                onChange={(e) =>
                  setEditingBanner((prev) =>
                    prev ? { ...prev, title: { ...prev.title!, ar: e.target.value } } : null
                  )
                }
                placeholder="مثال: نبني حلولاً برمجية ذكية للمستقبل"
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Title (English) *
              </label>
              <input
                type="text"
                required
                value={editingBanner?.title?.en || ''}
                onChange={(e) =>
                  setEditingBanner((prev) =>
                    prev ? { ...prev, title: { ...prev.title!, en: e.target.value } } : null
                  )
                }
                placeholder="e.g. Building Intelligent Software Solutions"
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Subtitles AR/EN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Subtitle / Eyebrow (Arabic)
              </label>
              <input
                type="text"
                dir="rtl"
                value={editingBanner?.subtitle?.ar || ''}
                onChange={(e) =>
                  setEditingBanner((prev) =>
                    prev ? { ...prev, subtitle: { ar: e.target.value, en: prev.subtitle?.en || '' } } : null
                  )
                }
                placeholder="مثال: ريادة في التكنولوجيا والابتكار"
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Subtitle / Eyebrow (English)
              </label>
              <input
                type="text"
                value={editingBanner?.subtitle?.en || ''}
                onChange={(e) =>
                  setEditingBanner((prev) =>
                    prev ? { ...prev, subtitle: { en: e.target.value, ar: prev.subtitle?.ar || '' } } : null
                  )
                }
                placeholder="e.g. Pioneering Enterprise Technology"
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
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
                value={editingBanner?.description?.ar || ''}
                onChange={(e) =>
                  setEditingBanner((prev) =>
                    prev ? { ...prev, description: { ...prev.description!, ar: e.target.value } } : null
                  )
                }
                placeholder="وصف تفصيلي للشريحة..."
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Description (English)
              </label>
              <textarea
                rows={3}
                value={editingBanner?.description?.en || ''}
                onChange={(e) =>
                  setEditingBanner((prev) =>
                    prev ? { ...prev, description: { ...prev.description!, en: e.target.value } } : null
                  )
                }
                placeholder="Detailed banner description..."
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Badge & Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Primary Button Label (AR / EN)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  dir="rtl"
                  value={editingBanner?.buttonText?.ar || ''}
                  onChange={(e) =>
                    setEditingBanner((prev) =>
                      prev ? { ...prev, buttonText: { ...prev.buttonText!, ar: e.target.value } } : null
                    )
                  }
                  placeholder="نص الزر (عربي)"
                  className="px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
                <input
                  type="text"
                  value={editingBanner?.buttonText?.en || ''}
                  onChange={(e) =>
                    setEditingBanner((prev) =>
                      prev ? { ...prev, buttonText: { ...prev.buttonText!, en: e.target.value } } : null
                    )
                  }
                  placeholder="Button (EN)"
                  className="px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Primary Button Target Link
              </label>
              <input
                type="text"
                value={editingBanner?.buttonLink || ''}
                onChange={(e) =>
                  setEditingBanner((prev) => prev ? { ...prev, buttonLink: e.target.value } : null)
                }
                placeholder="/applications or https://..."
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>
          </div>

          {/* Image Upload / URL */}
          <div>
            <ImageUpload
              label="Banner Background / Hero Image"
              value={editingBanner?.imageUrl || ''}
              onChange={(url) =>
                setEditingBanner((prev) => prev ? { ...prev, imageUrl: url } : null)
              }
              folder="banners"
              aspect="video"
            />
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
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/30 transition flex items-center gap-2"
            >
              {saving ? 'Saving...' : 'Save Banner'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteConfirmId}
        title="Delete Banner"
        message="Are you sure you want to delete this hero banner? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
};
