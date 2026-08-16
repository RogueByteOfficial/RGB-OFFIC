import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Award, Users, CheckCircle, Clock } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { AboutInfo } from '../../types';
import { getAbout } from '../../services/firestore';

export const AboutPreviewSection: React.FC = () => {
  const [about, setAbout] = useState<AboutInfo | null>(null);
  const { isRtl, localize, t } = useLanguage();

  useEffect(() => {
    getAbout().then(setAbout);
  }, []);

  if (!about) return null;

  const stats = [
    { label: t('about.yearsExp'), value: `${about.experienceYears}+`, icon: Clock },
    { label: t('about.projectsDone'), value: `${about.completedProjects}+`, icon: CheckCircle },
    { label: t('about.happyClients'), value: `${about.satisfiedClients}+`, icon: Users },
    { label: t('about.expertTeam'), value: `${about.expertTeam}+`, icon: Award },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden transition-colors">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(37,99,235,0.15),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text and Bio */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold self-start">
              <span>{localize(about.companyName)}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {localize(about.tagline)}
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              {localize(about.bio)}
            </p>

            {/* Quick Vision Quote */}
            <div className="p-4 rounded-xl bg-slate-800/80 border-l-4 border-blue-500 text-sm text-slate-300 italic">
              "{localize(about.vision)}"
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md transition inline-flex items-center gap-2"
              >
                <span>{t('nav.about')}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
            </div>
          </div>

          {/* Stats Bento Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            {stats.map((stat, i) => {
              const IconComp = stat.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm flex flex-col gap-3 hover:border-blue-500/40 transition group"
                >
                  <div className="p-3 w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-3xl font-black text-white tracking-tight">
                      {stat.value}
                    </span>
                    <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
