import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Target, 
  Compass, 
  ShieldCheck, 
  Award, 
  Users, 
  Clock, 
  CheckCircle,
  Zap,
  HeartHandshake
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { AboutInfo } from '../types';
import { getAbout } from '../services/firestore';
import { IconRenderer } from '../components/ui/IconRenderer';

export const AboutPage: React.FC = () => {
  const [about, setAbout] = useState<AboutInfo | null>(null);
  const { localize, t } = useLanguage();

  useEffect(() => {
    getAbout().then(setAbout);
    window.scrollTo(0, 0);
  }, []);

  if (!about) return null;

  const stats = [
    { label: t('about.yearsExp'), value: `${about.experienceYears}+`, icon: Clock },
    { label: t('about.projectsDone'), value: `${about.completedProjects}+`, icon: CheckCircle },
    { label: t('about.happyClients'), value: `${about.satisfiedClients}+`, icon: Users },
    { label: t('about.expertTeam'), value: `${about.expertTeam}+`, icon: Award },
  ];

  return (
    <div className="pt-28 pb-20 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{localize(about.companyName)}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {t('about.heading')}
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            {localize(about.tagline)}
          </p>
        </div>

        {/* Bio & Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {t('about.story')}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              {localize(about.bio)}
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              {localize(about.story)}
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 aspect-video lg:aspect-square">
              <img
                src={about.heroImageUrl || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80'}
                alt="Our Team"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-8">
                <div className="text-white">
                  <h4 className="text-xl font-bold">{localize(about.companyName)}</h4>
                  <p className="text-xs text-blue-400 font-medium">Digital Innovation Engineers</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {stats.map((stat, i) => {
            const IconComp = stat.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center gap-2 hover:border-blue-500/40 transition"
              >
                <div className="p-3 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-xl">
                  <IconComp className="w-6 h-6" />
                </div>
                <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Vision */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl flex flex-col gap-4 relative overflow-hidden">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Compass className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-black tracking-tight">{t('about.vision')}</h3>
            <p className="text-blue-100 text-base leading-relaxed">
              {localize(about.vision)}
            </p>
          </div>

          {/* Mission */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-xl flex flex-col gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black tracking-tight">{t('about.mission')}</h3>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              {localize(about.mission)}
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="flex flex-col gap-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {t('about.values')}
            </h2>
            <div className="w-12 h-1 bg-blue-600 rounded-full mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.values?.map((val, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col gap-3 shadow-sm hover:shadow-md hover:border-blue-500/30 transition"
              >
                <div className="p-3 w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <IconRenderer name={val.icon || 'Sparkles'} className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  {localize(val.title)}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {localize(val.desc)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
