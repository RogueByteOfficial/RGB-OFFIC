import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Layers, 
  Eye, 
  EyeOff, 
  X,
  Sparkles,
  Smartphone,
  Globe,
  Shield,
  Cloud,
  Database,
  Cpu,
  Brain,
  Code,
  Zap,
  Server,
  Lock,
  Bot,
  Activity,
  Terminal
} from 'lucide-react';
import { getServices, saveService, deleteService } from '../../services/firestore';
import { Service, LocalizedString } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Toast } from '../../components/ui/Toast';
import { IconRenderer } from '../../components/ui/IconRenderer';

const availableIcons = [
  'Smartphone',
  'Globe',
  'Shield',
  'Cloud',
  'Database',
  'Cpu',
  'Brain',
  'Layers',
  'Code',
  'Zap',
  'Server',
  'Lock',
  'Bot',
  'Activity',
  'Terminal'
];

const emptyService: Omit<Service, 'id'> = {
  title: { ar: '', en: '' },
  description: { ar: '', en: '' },
  icon: 'Layers',
  order: 1,
  isActive: true,
  features: [],
};

export const AdminServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const [featureAr, setFeatureAr] = useState('');
  const [featureEn, setFeatureEn] = useState('');

  const { localize } = useLanguage();

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getServices();
      setServices(data);
    } catch (e) {
      console.error(e);
      setToast({ message: 'Failed to fetch services', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCreate = () => {
    setEditingService({ ...emptyService, order: services.length + 1 });
    setFeatureAr('');
    setFeatureEn('');
    setModalOpen(true);
  };

  const handleOpenEdit = (service: Service) => {
    setEditingService({ ...service });
    setFeatureAr('');
    setFeatureEn('');
    setModalOpen(true);
  };

  const handleToggleActive = async (service: Service) => {
    try {
      const updated = { ...service, isActive: !service.isActive };
      await saveService(updated);
      setServices(services.map((s) => (s.id === service.id ? updated : s)));
      setToast({ message: 'Service status updated', type: 'success' });
    } catch (e) {
      setToast({ message: 'Failed to update service', type: 'error' });
    }
  };

  const handleAddFeature = () => {
    if (!featureAr.trim() && !featureEn.trim()) return;
    if (!editingService) return;
    const newFeature: LocalizedString = {
      ar: featureAr.trim() || featureEn.trim(),
      en: featureEn.trim() || featureAr.trim(),
    };
    setEditingService({
      ...editingService,
      features: [...(editingService.features || []), newFeature],
    });
    setFeatureAr('');
    setFeatureEn('');
  };

  const handleRemoveFeature = (index: number) => {
    if (!editingService) return;
    const updated = [...(editingService.features || [])];
    updated.splice(index, 1);
    setEditingService({ ...editingService, features: updated });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    if (!editingService.title?.en || !editingService.title?.ar) {
      setToast({ message: 'Service title is required in Arabic & English', type: 'error' });
      return;
    }

    try {
      setSaving(true);
      await saveService(editingService);
      setToast({ message: 'Service saved successfully!', type: 'success' });
      setModalOpen(false);
      setEditingService(null);
      await loadData();
    } catch (e) {
      console.error(e);
      setToast({ message: 'Failed to save service', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await deleteService(deleteConfirmId);
      setToast({ message: 'Service deleted successfully', type: 'success' });
      setDeleteConfirmId(null);
      await loadData();
    } catch (e) {
      setToast({ message: 'Failed to delete service', type: 'error' });
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
            <Layers className="w-5 h-5 text-amber-500" />
            <span>Company Services & Solutions</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage your service offerings, capabilities, feature breakdowns, and vector icon markers.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-600/30 transition flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services List */}
      {loading ? (
        <div className="text-center py-16 text-slate-400 text-sm">Loading services...</div>
      ) : services.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center mx-auto">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">No Services Added Yet</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Define your core tech services such as Mobile App Development, Enterprise Cloud Systems, and AI Integrations.
          </p>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold"
          >
            Create First Service
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div
              key={svc.id}
              className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all overflow-hidden shadow-sm flex flex-col justify-between ${
                svc.isActive
                  ? 'border-slate-200 dark:border-slate-800'
                  : 'border-slate-200/50 dark:border-slate-800/40 opacity-70'
              }`}
            >
              <div className="p-6 space-y-4">
                {/* Header Icon & Status */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
                    <IconRenderer icon={svc.icon} className="w-6 h-6" />
                  </div>

                  <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold">
                    Order #{svc.order || 0}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {localize(svc.title)}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 mt-1.5 leading-relaxed">
                    {localize(svc.description)}
                  </p>
                </div>

                {/* Features List Preview */}
                {svc.features && svc.features.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Included Capabilities:
                    </span>
                    <ul className="space-y-1">
                      {svc.features.slice(0, 3).map((f, idx) => (
                        <li key={idx} className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5 truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                          <span className="truncate">{localize(f)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => handleToggleActive(svc)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                    svc.isActive
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {svc.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{svc.isActive ? 'Active' : 'Hidden'}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(svc)}
                    className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-lg transition"
                    title="Edit Service"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(svc.id)}
                    className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition"
                    title="Delete Service"
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
        title={editingService?.id ? 'Edit Service' : 'Add New Service'}
        size="lg"
      >
        <form onSubmit={handleSave} className="space-y-6 max-h-[75vh] overflow-y-auto pr-1">
          {/* Order & Active */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Display Order
              </label>
              <input
                type="number"
                value={editingService?.order || 1}
                onChange={(e) =>
                  setEditingService((prev) => prev ? { ...prev, order: parseInt(e.target.value) || 1 } : null)
                }
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>

            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={editingService?.isActive ?? true}
                  onChange={(e) =>
                    setEditingService((prev) => prev ? { ...prev, isActive: e.target.checked } : null)
                  }
                  className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                />
                <span>Active & Published</span>
              </label>
            </div>
          </div>

          {/* Icon Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              Select Vector Icon
            </label>
            <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
              {availableIcons.map((ic) => {
                const isSelected = editingService?.icon === ic;
                return (
                  <button
                    key={ic}
                    type="button"
                    onClick={() => setEditingService((prev) => prev ? { ...prev, icon: ic } : null)}
                    className={`p-3 rounded-xl flex flex-col items-center justify-center gap-1 transition ${
                      isSelected
                        ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30 ring-2 ring-amber-500 ring-offset-2 dark:ring-offset-slate-900'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <IconRenderer icon={ic} className="w-5 h-5" />
                    <span className="text-[9px] font-medium truncate max-w-full">{ic}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Titles AR / EN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Service Title (Arabic) *
              </label>
              <input
                type="text"
                dir="rtl"
                required
                value={editingService?.title?.ar || ''}
                onChange={(e) =>
                  setEditingService((prev) =>
                    prev ? { ...prev, title: { ...prev.title!, ar: e.target.value } } : null
                  )
                }
                placeholder="عنوان الخدمة بالعربية"
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Service Title (English) *
              </label>
              <input
                type="text"
                required
                value={editingService?.title?.en || ''}
                onChange={(e) =>
                  setEditingService((prev) =>
                    prev ? { ...prev, title: { ...prev.title!, en: e.target.value } } : null
                  )
                }
                placeholder="Service Title in English"
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>
          </div>

          {/* Descriptions AR / EN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Description (Arabic)
              </label>
              <textarea
                dir="rtl"
                rows={3}
                value={editingService?.description?.ar || ''}
                onChange={(e) =>
                  setEditingService((prev) =>
                    prev ? { ...prev, description: { ...prev.description!, ar: e.target.value } } : null
                  )
                }
                placeholder="وصف تفصيلي للخدمة بالعربية..."
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Description (English)
              </label>
              <textarea
                rows={3}
                value={editingService?.description?.en || ''}
                onChange={(e) =>
                  setEditingService((prev) =>
                    prev ? { ...prev, description: { ...prev.description!, en: e.target.value } } : null
                  )
                }
                placeholder="Detailed service description in English..."
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>
          </div>

          {/* Features Bullets List */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Service Capabilities & Sub-features
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                dir="rtl"
                value={featureAr}
                onChange={(e) => setFeatureAr(e.target.value)}
                placeholder="إضافة ميزة بالعربية..."
                className="px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
              <input
                type="text"
                value={featureEn}
                onChange={(e) => setFeatureEn(e.target.value)}
                placeholder="Add sub-feature (EN)..."
                className="px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>

            <button
              type="button"
              onClick={handleAddFeature}
              className="px-3 py-1.5 bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-xl text-xs font-bold border border-amber-200 dark:border-amber-800 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Capability Bullet</span>
            </button>

            <div className="space-y-1.5 pt-2">
              {editingService?.features?.map((f, idx) => (
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
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-600/30 transition"
            >
              {saving ? 'Saving...' : 'Save Service'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteConfirmId}
        title="Delete Service"
        message="Are you sure you want to delete this service?"
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
};
