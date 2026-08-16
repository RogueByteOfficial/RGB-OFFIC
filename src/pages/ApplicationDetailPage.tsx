import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Apple, 
  Smartphone, 
  Globe, 
  Github, 
  Check, 
  Calendar, 
  Tag, 
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Application } from '../types';
import { getApplicationById } from '../services/firestore';

export const ApplicationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [app, setApp] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);
  const { isRtl, localize, t } = useLanguage();

  useEffect(() => {
    if (id) {
      getApplicationById(id).then((data) => {
        setApp(data);
        setLoading(false);
      });
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 text-center min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!app) {
    return (
      <div className="pt-32 pb-20 text-center min-h-screen">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Application Not Found</h2>
        <Link to="/applications" className="mt-4 inline-block text-blue-600 underline">
          Back to Applications
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/applications"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{t('apps.heading')}</span>
          </Link>
        </div>

        {/* Hero Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 justify-between">
            {/* Logo & Meta */}
            <div className="flex items-start sm:items-center gap-6">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden bg-slate-900 border-2 border-slate-800 flex items-center justify-center shrink-0 shadow-xl">
                {app.logoUrl ? (
                  <img
                    src={app.logoUrl}
                    alt={localize(app.name)}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-3xl">
                    {localize(app.name).charAt(0)}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                    {localize(app.name)}
                  </h1>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                    v{app.version}
                  </span>
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl">
                  {localize(app.shortDesc)}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span>{app.releaseDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-4 h-4 text-blue-500" />
                    <span>{t(`apps.status.${app.status}`)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Store Buttons */}
            <div className="flex flex-wrap sm:flex-col gap-3 w-full md:w-auto">
              {app.appStoreUrl && (
                <a
                  href={app.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center justify-center gap-2.5 shadow-md"
                >
                  <Apple className="w-5 h-5" />
                  <span>{t('apps.appStore')}</span>
                </a>
              )}
              {app.googlePlayUrl && (
                <a
                  href={app.googlePlayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center justify-center gap-2.5 shadow-md"
                >
                  <Smartphone className="w-5 h-5" />
                  <span>{t('apps.googlePlay')}</span>
                </a>
              )}
              {app.websiteUrl && (
                <a
                  href={app.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center justify-center gap-2.5 shadow-md"
                >
                  <Globe className="w-5 h-5" />
                  <span>{t('apps.webApp')}</span>
                </a>
              )}
              {app.githubUrl && (
                <a
                  href={app.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center justify-center gap-2.5 shadow-md"
                >
                  <Github className="w-5 h-5" />
                  <span>{t('apps.sourceCode')}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Two Columns: Full Description + Features */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
          {/* Main Description */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-4">
                {t('apps.heading')}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed whitespace-pre-line">
                {localize(app.fullDesc)}
              </p>
            </div>

            {/* Technologies */}
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-600" />
                <span>{t('apps.technologies')}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {app.technologies?.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-1.5 text-xs font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 rounded-xl"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm sticky top-28">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <span>{t('apps.features')}</span>
              </h3>

              <div className="flex flex-col gap-4">
                {app.features?.map((feat, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="p-1 bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 rounded-lg shrink-0 mt-0.5">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-snug">
                      {localize(feat)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Screenshots Section */}
        {app.screenshots && app.screenshots.length > 0 && (
          <div className="flex flex-col gap-6 mb-16">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {t('apps.screenshots')}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {app.screenshots.map((shot, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedScreenshot(shot)}
                  className="aspect-[9/16] sm:aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md cursor-pointer group hover:border-blue-500 transition"
                >
                  <img
                    src={shot}
                    alt={`Screenshot ${i + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Screenshot Lightbox Modal */}
      {selectedScreenshot && (
        <div
          onClick={() => setSelectedScreenshot(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <img
            src={selectedScreenshot}
            alt="Preview"
            referrerPolicy="no-referrer"
            className="max-h-[90vh] max-w-full rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
