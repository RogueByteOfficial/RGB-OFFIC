import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Save, 
  Globe, 
  Share2, 
  Search, 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Send,
  Sparkles
} from 'lucide-react';
import { getSettings, updateSettings } from '../../services/firestore';
import { GeneralSettings } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { Toast } from '../../components/ui/Toast';
import { ImageUpload } from '../../components/ui/ImageUpload';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<GeneralSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const { localize } = useLanguage();

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getSettings();
      setSettings(data);
    } catch (e) {
      console.error(e);
      setToast({ message: 'Failed to fetch settings', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    try {
      setSaving(true);
      await updateSettings(settings);
      setToast({ message: 'Settings saved successfully!', type: 'success' });
    } catch (e) {
      console.error(e);
      setToast({ message: 'Failed to save settings', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="py-20 text-center text-slate-400 text-sm">
        Loading site settings...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-12">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header with Save Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm sticky top-0 z-20">
        <div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Settings className="w-5 h-5 text-blue-500" />
            <span>General, Contact & SEO Settings</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Configure site metadata, brand identity, global contact numbers, social media links, and SEO indexation tags.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/30 transition flex items-center gap-2 shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      {/* Brand Identity */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-500" />
          <span>Brand Identity & General Preferences</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Website Name (Arabic)
            </label>
            <input
              type="text"
              dir="rtl"
              value={settings.siteName?.ar || ''}
              onChange={(e) =>
                setSettings({ ...settings, siteName: { ...settings.siteName, ar: e.target.value } })
              }
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Website Name (English)
            </label>
            <input
              type="text"
              value={settings.siteName?.en || ''}
              onChange={(e) =>
                setSettings({ ...settings, siteName: { ...settings.siteName, en: e.target.value } })
              }
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Default System Language
            </label>
            <select
              value={settings.defaultLanguage || 'ar'}
              onChange={(e) =>
                setSettings({ ...settings, defaultLanguage: e.target.value as 'ar' | 'en' })
              }
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            >
              <option value="ar">العربية (Arabic - RTL)</option>
              <option value="en">English (LTR)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Default Theme Mode
            </label>
            <select
              value={settings.theme || 'dark'}
              onChange={(e) =>
                setSettings({ ...settings, theme: e.target.value as 'dark' | 'light' | 'system' })
              }
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            >
              <option value="dark">Dark Theme (Modern Enterprise)</option>
              <option value="light">Light Theme</option>
              <option value="system">Follow System</option>
            </select>
          </div>
        </div>
      </div>

      {/* Official Contact Info */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <Mail className="w-4 h-4 text-emerald-500" />
          <span>Official Contact & Channels</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Official Email
            </label>
            <input
              type="email"
              value={settings.email || ''}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              placeholder="contact@nstech.com"
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Primary Phone
            </label>
            <input
              type="text"
              value={settings.phone || ''}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              placeholder="+966 50 000 0000"
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              WhatsApp Direct Number
            </label>
            <input
              type="text"
              value={settings.whatsapp || ''}
              onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
              placeholder="+966500000000"
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Physical / Business Address (Arabic)
            </label>
            <input
              type="text"
              dir="rtl"
              value={settings.address?.ar || ''}
              onChange={(e) =>
                setSettings({ ...settings, address: { ...settings.address, ar: e.target.value } })
              }
              placeholder="الرياض، المملكة العربية السعودية"
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Physical / Business Address (English)
            </label>
            <input
              type="text"
              value={settings.address?.en || ''}
              onChange={(e) =>
                setSettings({ ...settings, address: { ...settings.address, en: e.target.value } })
              }
              placeholder="Riyadh, Kingdom of Saudi Arabia"
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <Share2 className="w-4 h-4 text-purple-500" />
          <span>Social Media & Public Channels</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </label>
            <input
              type="text"
              value={settings.social?.github || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  social: { ...settings.social, github: e.target.value }
                })
              }
              placeholder="https://github.com/..."
              className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5 text-blue-600" />
              <span>LinkedIn</span>
            </label>
            <input
              type="text"
              value={settings.social?.linkedin || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  social: { ...settings.social, linkedin: e.target.value }
                })
              }
              placeholder="https://linkedin.com/in/..."
              className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
              <Twitter className="w-3.5 h-3.5 text-sky-500" />
              <span>Twitter / X</span>
            </label>
            <input
              type="text"
              value={settings.social?.twitter || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  social: { ...settings.social, twitter: e.target.value }
                })
              }
              placeholder="https://x.com/..."
              className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
              <Instagram className="w-3.5 h-3.5 text-pink-500" />
              <span>Instagram</span>
            </label>
            <input
              type="text"
              value={settings.social?.instagram || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  social: { ...settings.social, instagram: e.target.value }
                })
              }
              placeholder="https://instagram.com/..."
              className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
              <Facebook className="w-3.5 h-3.5 text-blue-600" />
              <span>Facebook</span>
            </label>
            <input
              type="text"
              value={settings.social?.facebook || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  social: { ...settings.social, facebook: e.target.value }
                })
              }
              placeholder="https://facebook.com/..."
              className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
              <Youtube className="w-3.5 h-3.5 text-rose-600" />
              <span>YouTube</span>
            </label>
            <input
              type="text"
              value={settings.social?.youtube || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  social: { ...settings.social, youtube: e.target.value }
                })
              }
              placeholder="https://youtube.com/..."
              className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
              <Send className="w-3.5 h-3.5 text-sky-400" />
              <span>Telegram</span>
            </label>
            <input
              type="text"
              value={settings.social?.telegram || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  social: { ...settings.social, telegram: e.target.value }
                })
              }
              placeholder="https://t.me/..."
              className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span>WhatsApp Direct Link</span>
            </label>
            <input
              type="text"
              value={settings.social?.whatsapp || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  social: { ...settings.social, whatsapp: e.target.value }
                })
              }
              placeholder="https://wa.me/..."
              className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>
        </div>
      </div>

      {/* SEO & Meta Tags */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <Search className="w-4 h-4 text-amber-500" />
          <span>SEO Metadata & Google Indexing</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Meta Title (Arabic)
            </label>
            <input
              type="text"
              dir="rtl"
              value={settings.seo?.metaTitle?.ar || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  seo: {
                    ...settings.seo,
                    metaTitle: { ...settings.seo?.metaTitle, ar: e.target.value }
                  }
                })
              }
              placeholder="عنوان الموقع لمحركات البحث..."
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Meta Title (English)
            </label>
            <input
              type="text"
              value={settings.seo?.metaTitle?.en || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  seo: {
                    ...settings.seo,
                    metaTitle: { ...settings.seo?.metaTitle, en: e.target.value }
                  }
                })
              }
              placeholder="SEO Page Title for search engines..."
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Meta Description (Arabic)
            </label>
            <textarea
              dir="rtl"
              rows={3}
              value={settings.seo?.metaDescription?.ar || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  seo: {
                    ...settings.seo,
                    metaDescription: { ...settings.seo?.metaDescription, ar: e.target.value }
                  }
                })
              }
              placeholder="الوصف التعريفي في جوجل..."
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Meta Description (English)
            </label>
            <textarea
              rows={3}
              value={settings.seo?.metaDescription?.en || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  seo: {
                    ...settings.seo,
                    metaDescription: { ...settings.seo?.metaDescription, en: e.target.value }
                  }
                })
              }
              placeholder="Search engine meta description snippet..."
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Keywords (comma separated)
          </label>
          <input
            type="text"
            value={settings.seo?.keywords || ''}
            onChange={(e) =>
              setSettings({
                ...settings,
                seo: { ...settings.seo, keywords: e.target.value }
              })
            }
            placeholder="technology, software development, mobile apps, enterprise cloud, saas"
            className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          />
        </div>
      </div>
    </form>
  );
};
