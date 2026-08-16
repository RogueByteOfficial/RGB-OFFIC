import React, { useState, useEffect } from 'react';
import { 
  FolderOpen, 
  Upload, 
  Trash2, 
  Copy, 
  Check, 
  ExternalLink, 
  Image as ImageIcon, 
  Search, 
  FileText, 
  HardDrive
} from 'lucide-react';
import { getMediaItems, saveMediaItem, deleteMediaItem } from '../../services/firestore';
import { uploadImage } from '../../services/storage';
import { MediaItem } from '../../types';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Toast } from '../../components/ui/Toast';

export const AdminMedia: React.FC = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Manual URL Add Modal
  const [manualModalOpen, setManualModalOpen] = useState(false);
  const [manualName, setManualName] = useState('');
  const [manualUrl, setManualUrl] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getMediaItems();
      setMedia(data);
    } catch (e) {
      console.error(e);
      setToast({ message: 'Failed to fetch media assets', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setUploading(true);
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const uploadedUrl = await uploadImage(file, 'general');
        await saveMediaItem({
          name: file.name,
          url: uploadedUrl,
          size: file.size,
          type: file.type || 'image/jpeg',
        });
      }
      setToast({ message: `${files.length} file(s) uploaded successfully!`, type: 'success' });
      await loadData();
    } catch (err) {
      console.error(err);
      setToast({ message: 'Upload failed', type: 'error' });
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleAddManual = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualUrl.trim()) return;

    try {
      await saveMediaItem({
        name: manualName.trim() || 'External Media',
        url: manualUrl.trim(),
        size: 0,
        type: 'image/jpeg',
      });
      setToast({ message: 'Media reference added!', type: 'success' });
      setManualModalOpen(false);
      setManualName('');
      setManualUrl('');
      await loadData();
    } catch (e) {
      setToast({ message: 'Failed to add media', type: 'error' });
    }
  };

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setToast({ message: 'URL copied to clipboard!', type: 'success' });
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await deleteMediaItem(deleteConfirmId);
      setToast({ message: 'Media item deleted', type: 'success' });
      setDeleteConfirmId(null);
      await loadData();
    } catch (e) {
      setToast({ message: 'Failed to delete media', type: 'error' });
    }
  };

  const filteredMedia = media.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <FolderOpen className="w-5 h-5 text-blue-500" />
            <span>Media & Asset Storage</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Store and manage company brand imagery, banner backgrounds, application screenshots, and marketing assets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setManualModalOpen(true)}
            className="px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition"
          >
            Add by URL
          </button>

          <label className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/30 transition flex items-center gap-2 cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>{uploading ? 'Uploading...' : 'Upload Files'}</span>
            <input
              type="file"
              multiple
              accept="image/*"
              disabled={uploading}
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search media files by name..."
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          />
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="text-center py-16 text-slate-400 text-sm">Loading media assets...</div>
      ) : filteredMedia.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-500 flex items-center justify-center mx-auto">
            <ImageIcon className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">No Media Uploaded</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Upload images from your computer or link external media assets to use across your pages.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              {/* Media Thumbnail */}
              <div className="relative aspect-square bg-slate-950 overflow-hidden">
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Overlay Quick Actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                  <button
                    onClick={() => handleCopy(item.id, item.url)}
                    className="p-2 rounded-xl bg-white/90 text-slate-900 hover:bg-white transition"
                    title="Copy direct URL"
                  >
                    {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white/90 text-slate-900 hover:bg-white transition"
                    title="Open full size"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setDeleteConfirmId(item.id)}
                    className="p-2 rounded-xl bg-rose-600 text-white hover:bg-rose-700 transition"
                    title="Delete media"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Item Info */}
              <div className="p-3">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate" title={item.name}>
                  {item.name}
                </p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                  <span>{item.size ? `${(item.size / 1024).toFixed(0)} KB` : 'Direct Link'}</span>
                  <span>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Manual Link Modal */}
      <Modal
        isOpen={manualModalOpen}
        onClose={() => setManualModalOpen(false)}
        title="Add Media by URL"
        size="md"
      >
        <form onSubmit={handleAddManual} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Asset Name
            </label>
            <input
              type="text"
              required
              value={manualName}
              onChange={(e) => setManualName(e.target.value)}
              placeholder="e.g. Hero Banner 2025"
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Direct Image URL
            </label>
            <input
              type="url"
              required
              value={manualUrl}
              onChange={(e) => setManualUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setManualModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold"
            >
              Save Media
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteConfirmId}
        title="Delete Media Asset"
        message="Are you sure you want to delete this media file?"
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
};
