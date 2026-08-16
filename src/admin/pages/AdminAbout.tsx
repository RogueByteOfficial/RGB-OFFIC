import React, { useState, useEffect } from 'react';
import { 
  Info, 
  Save, 
  Plus, 
  Trash2, 
  Award, 
  Users, 
  CheckCircle2, 
  Clock, 
  Target, 
  Eye, 
  Sparkles,
  Zap,
  Shield,
  Heart,
  Lightbulb,
  Globe,
  Compass,
  TrendingUp,
  X
} from 'lucide-react';
import { getAbout, updateAbout } from '../../services/firestore';
import { AboutInfo, ValueItem } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { Toast } from '../../components/ui/Toast';
import { ImageUpload } from '../../components/ui/ImageUpload';
import { IconRenderer } from '../../components/ui/IconRenderer';

const availableValueIcons = ['Target', 'Sparkles', 'Shield', 'Zap', 'Lightbulb', 'Heart', 'Globe', 'Compass', 'Users'];

export const AdminAbout: React.FC = () => {
  const [about, setAbout] = useState<AboutInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // New value item form state
  const [valTitleAr, setValTitleAr] = useState('');
  const [valTitleEn, setValTitleEn] = useState('');
  const [valDescAr, setValDescAr] = useState('');
  const [valDescEn, setValDescEn] = useState('');
  const [valIcon, setValIcon] = useState('Sparkles');

  const { localize } = useLanguage();

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getAbout();
      setAbout(data);
    } catch (e) {
      console.error(e);
      setToast({ message: 'Failed to fetch about information', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddValue = () => {
    if (!valTitleAr.trim() && !valTitleEn.trim()) {
      setToast({ message: 'Value item title is required', type: 'error' });
      return;
    }
    if (!about) return;

    const newItem: ValueItem = {
      id: Date.now().toString(),
      title: { ar: valTitleAr.trim() || valTitleEn.trim(), en: valTitleEn.trim() || valTitleAr.trim() },
      desc: { ar: valDescAr.trim() || valDescEn.trim(), en: valDescEn.trim() || valDescAr.trim() },
      icon: valIcon,
    };

    setAbout({
      ...about,
      values: [...(about.values || []), newItem],
    });

    setValTitleAr('');
    setValTitleEn('');
    setValDescAr('');
    setValDescEn('');
    setValIcon('Sparkles');
  };

  const handleRemoveValue = (index: number) => {
    if (!about) return;
    const updated = [...(about.values || [])];
    updated.splice(index, 1);
    setAbout({ ...about, values: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!about) return;

    try {
      setSaving(true);
      await updateAbout(about);
      setToast({ message: 'About company profile updated successfully!', type: 'success' });
    } catch (e) {
      console.error(e);
      setToast({ message: 'Failed to update profile', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !about) {
    return (
      <div className="py-20 text-center text-slate-400 text-sm">
        Loading company information...
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
            <Info className="w-5 h-5 text-blue-500" />
            <span>About Company & Founder CMS</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Configure company story, founder biography, mission, vision, statistics counters, and core corporate values.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/30 transition flex items-center gap-2 shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving Changes...' : 'Save All Changes'}</span>
        </button>
      </div>

      {/* Statistical Counters */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-blue-500" />
          <span>Key Numerical Metrics & Counters</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Years Experience
            </label>
            <input
              type="number"
              value={about.experienceYears || 0}
              onChange={(e) => setAbout({ ...about, experienceYears: parseInt(e.target.value) || 0 })}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Completed Projects
            </label>
            <input
              type="number"
              value={about.completedProjects || 0}
              onChange={(e) => setAbout({ ...about, completedProjects: parseInt(e.target.value) || 0 })}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Satisfied Clients
            </label>
            <input
              type="number"
              value={about.satisfiedClients || 0}
              onChange={(e) => setAbout({ ...about, satisfiedClients: parseInt(e.target.value) || 0 })}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Expert Team Members
            </label>
            <input
              type="number"
              value={about.expertTeam || 0}
              onChange={(e) => setAbout({ ...about, expertTeam: parseInt(e.target.value) || 0 })}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>
        </div>
      </div>

      {/* Company Name & Tagline */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Company Name & Slogan
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Company Name (Arabic)
            </label>
            <input
              type="text"
              dir="rtl"
              value={about.companyName?.ar || ''}
              onChange={(e) => setAbout({ ...about, companyName: { ...about.companyName, ar: e.target.value } })}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Company Name (English)
            </label>
            <input
              type="text"
              value={about.companyName?.en || ''}
              onChange={(e) => setAbout({ ...about, companyName: { ...about.companyName, en: e.target.value } })}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Tagline / Headline (Arabic)
            </label>
            <input
              type="text"
              dir="rtl"
              value={about.tagline?.ar || ''}
              onChange={(e) => setAbout({ ...about, tagline: { ...about.tagline, ar: e.target.value } })}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Tagline / Headline (English)
            </label>
            <input
              type="text"
              value={about.tagline?.en || ''}
              onChange={(e) => setAbout({ ...about, tagline: { ...about.tagline, en: e.target.value } })}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <ImageUpload
          label="About Section Showcase Image"
          value={about.heroImageUrl || ''}
          onChange={(url) => setAbout({ ...about, heroImageUrl: url })}
          folder="about"
          aspect="video"
        />
      </div>

      {/* Bio & Story */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Company Bio & Journey
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Bio Summary (Arabic)
            </label>
            <textarea
              dir="rtl"
              rows={4}
              value={about.bio?.ar || ''}
              onChange={(e) => setAbout({ ...about, bio: { ...about.bio, ar: e.target.value } })}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Bio Summary (English)
            </label>
            <textarea
              rows={4}
              value={about.bio?.en || ''}
              onChange={(e) => setAbout({ ...about, bio: { ...about.bio, en: e.target.value } })}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Full Story & Origin (Arabic)
            </label>
            <textarea
              dir="rtl"
              rows={5}
              value={about.story?.ar || ''}
              onChange={(e) => setAbout({ ...about, story: { ...about.story, ar: e.target.value } })}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Full Story & Origin (English)
            </label>
            <textarea
              rows={5}
              value={about.story?.en || ''}
              onChange={(e) => setAbout({ ...about, story: { ...about.story, en: e.target.value } })}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Vision & Mission
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Vision (Arabic)
            </label>
            <textarea
              dir="rtl"
              rows={3}
              value={about.vision?.ar || ''}
              onChange={(e) => setAbout({ ...about, vision: { ...about.vision, ar: e.target.value } })}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Vision (English)
            </label>
            <textarea
              rows={3}
              value={about.vision?.en || ''}
              onChange={(e) => setAbout({ ...about, vision: { ...about.vision, en: e.target.value } })}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Mission (Arabic)
            </label>
            <textarea
              dir="rtl"
              rows={3}
              value={about.mission?.ar || ''}
              onChange={(e) => setAbout({ ...about, mission: { ...about.mission, ar: e.target.value } })}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Mission (English)
            </label>
            <textarea
              rows={3}
              value={about.mission?.en || ''}
              onChange={(e) => setAbout({ ...about, mission: { ...about.mission, en: e.target.value } })}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>
        </div>
      </div>

      {/* Corporate Values */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Core Values & Principles</span>
        </h2>

        {/* Existing values list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {about.values?.map((val, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500 flex items-center justify-center shrink-0">
                  <IconRenderer icon={val.icon} className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {val.title.en} <span className="text-slate-400 font-normal">({val.title.ar})</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {val.desc.en}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleRemoveValue(idx)}
                className="p-1.5 text-slate-400 hover:text-rose-500 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Add new value form */}
        <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-700/60 space-y-4">
          <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Add New Corporate Value
          </h3>

          <div className="flex flex-wrap gap-2">
            {availableValueIcons.map((ic) => (
              <button
                key={ic}
                type="button"
                onClick={() => setValIcon(ic)}
                className={`p-2 rounded-xl transition ${
                  valIcon === ic
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <IconRenderer icon={ic} className="w-4 h-4" />
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              dir="rtl"
              value={valTitleAr}
              onChange={(e) => setValTitleAr(e.target.value)}
              placeholder="عنوان القيمة (عربي)"
              className="px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
            <input
              type="text"
              value={valTitleEn}
              onChange={(e) => setValTitleEn(e.target.value)}
              placeholder="Value Title (English)"
              className="px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <textarea
              dir="rtl"
              rows={2}
              value={valDescAr}
              onChange={(e) => setValDescAr(e.target.value)}
              placeholder="شرح القيمة (عربي)..."
              className="px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
            <textarea
              rows={2}
              value={valDescEn}
              onChange={(e) => setValDescEn(e.target.value)}
              placeholder="Value Explanation (English)..."
              className="px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <button
            type="button"
            onClick={handleAddValue}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Value to List</span>
          </button>
        </div>
      </div>
    </form>
  );
};
