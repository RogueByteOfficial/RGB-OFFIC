import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowLeft, 
  LayoutGrid, 
  Smartphone, 
  Globe, 
  Apple, 
  ExternalLink,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Application } from '../../types';
import { getApplications } from '../../services/firestore';

export const ApplicationsSection: React.FC = () => {
  const [apps, setApps] = useState<Application[]>([]);
  const { isRtl, localize, t } = useLanguage();

  useEffect(() => {
    getApplications(true).then((data) => {
      // Prioritize featured and active apps
      const featured = data.filter((a) => a.isFeatured);
      setApps(featured.length ? featured.slice(0, 4) : data.slice(0, 4));
    });
  }, []);

  if (!apps.length) return null;

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-200/60 dark:border-slate-800/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Blue Accent Bar (as shown in image) */}
        <div className="flex flex-col items-center text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('apps.heading')}
          </h2>
          <div className="w-12 h-1 bg-blue-600 rounded-full mt-3 mb-4" />
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-base leading-relaxed">
            {t('apps.subheading')}
          </p>
        </div>

        {/* Applications Grid (4 horizontal cards matching screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {apps.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group"
            >
              <div>
                {/* App Header: Icon + Title */}
                <div className="flex items-start gap-4 mb-4">
                  {/* App Icon Container */}
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                    {app.logoUrl ? (
                      <img
                        src={app.logoUrl}
                        alt={localize(app.name)}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                        {localize(app.name).charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* Title & Version */}
                  <div className="flex flex-col">
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {localize(app.name)}
                    </h3>
                    <span className="text-xs text-slate-400 font-medium">
                      v{app.version || '1.0.0'}
                    </span>
                  </div>
                </div>

                {/* Short Description */}
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 mb-6">
                  {localize(app.shortDesc)}
                </p>
              </div>

              {/* Card Footer: Platform Icons + View Details Link */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                {/* Platform Icons (iOS, Android, Web) */}
                <div className="flex items-center gap-2 text-slate-400">
                  {app.appStoreUrl && (
                    <span title="iOS App Store" className="hover:text-slate-700 dark:hover:text-slate-200 transition">
                      <Apple className="w-4 h-4" />
                    </span>
                  )}
                  {app.googlePlayUrl && (
                    <span title="Google Play Store" className="hover:text-slate-700 dark:hover:text-slate-200 transition">
                      <Smartphone className="w-4 h-4" />
                    </span>
                  )}
                  {app.websiteUrl && (
                    <span title="Web Platform" className="hover:text-slate-700 dark:hover:text-slate-200 transition">
                      <Globe className="w-4 h-4" />
                    </span>
                  )}
                </div>

                {/* View Details Link (as in screenshot: blue text with arrow) */}
                <Link
                  to={`/applications/${app.id}`}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1.5 transition"
                >
                  <span>{t('apps.viewDetails')}</span>
                  {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Applications Center Button (as in screenshot) */}
        <div className="mt-12 flex justify-center">
          <Link
            to="/applications"
            className="px-8 py-3.5 rounded-2xl text-sm font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 shadow-sm hover:shadow-md transition-all flex items-center gap-2.5"
          >
            <LayoutGrid className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{t('apps.viewAll')}</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
