import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, ArrowLeft, Sparkles, MessageSquare } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Service } from '../types';
import { getServices } from '../services/firestore';
import { IconRenderer } from '../components/ui/IconRenderer';

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const { isRtl, localize, t } = useLanguage();

  useEffect(() => {
    getServices(true).then(setServices);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-28 pb-20 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('nav.services')}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('services.heading')}
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            {t('services.subheading')}
          </p>
        </div>

        {/* Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105 transition-all">
                  <IconRenderer name={service.icon} className="w-7 h-7" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {localize(service.title)}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {localize(service.description)}
                </p>

                {/* Features Checklist */}
                {service.features && service.features.length > 0 && (
                  <ul className="flex flex-col gap-2.5 mb-8 border-t border-slate-100 dark:border-slate-800 pt-5">
                    {service.features.map((feat, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        <div className="p-0.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span>{localize(feat)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  to="/contact"
                  className="w-full py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-200 text-xs font-bold transition flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t('contact.send')}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
