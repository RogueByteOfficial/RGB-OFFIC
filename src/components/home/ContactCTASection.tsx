import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MessageSquare, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const ContactCTASection: React.FC = () => {
  const { isRtl, t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-blue-50/40 dark:from-slate-950 dark:to-slate-900 border-t border-slate-200/60 dark:border-slate-800/60 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl shadow-blue-500/20 relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="p-3 bg-white/15 rounded-2xl backdrop-blur-sm">
              <Sparkles className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white max-w-2xl leading-tight">
              {t('contact.heading')}
            </h2>

            <p className="text-blue-100 text-base sm:text-lg max-w-xl leading-relaxed">
              {t('contact.subheading')}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                to="/contact"
                className="px-8 py-4 bg-white hover:bg-slate-100 active:bg-slate-200 text-blue-700 font-extrabold rounded-2xl shadow-lg transition-all flex items-center gap-2 group"
              >
                <span>{t('contact.send')}</span>
                {isRtl ? (
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
