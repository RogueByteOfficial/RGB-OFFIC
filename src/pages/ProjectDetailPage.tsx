import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink, Github, Calendar, User, Sparkles, Layers } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Project } from '../types';
import { getProjectById } from '../services/firestore';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const { isRtl, localize, t } = useLanguage();

  useEffect(() => {
    if (id) {
      getProjectById(id).then((data) => {
        setProject(data);
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

  if (!project) {
    return (
      <div className="pt-32 pb-20 text-center min-h-screen">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Project Not Found</h2>
        <Link to="/projects" className="mt-4 inline-block text-blue-600 underline">
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{t('projects.heading')}</span>
          </Link>
        </div>

        {/* Hero Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl mb-12">
          {project.category && (
            <span className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-lg border border-blue-200 dark:border-blue-800 mb-4">
              {localize(project.category)}
            </span>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
            {localize(project.title)}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400 pb-6 border-b border-slate-100 dark:border-slate-800">
            {project.clientName && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-500" />
                <span>{project.clientName}</span>
              </div>
            )}
            {project.date && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span>{project.date}</span>
              </div>
            )}
          </div>

          <div className="mt-8 rounded-2xl overflow-hidden bg-slate-900 aspect-video shadow-lg mb-8">
            <img
              src={project.coverImageUrl}
              alt={localize(project.title)}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {t('about.story')}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed whitespace-pre-line">
              {localize(project.description)}
            </p>

            {/* Technologies */}
            <div className="pt-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-500" />
                <span>{t('apps.technologies')}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-xs font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 rounded-xl"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition flex items-center gap-2 shadow-md"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{t('projects.livePreview')}</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition flex items-center gap-2 shadow-md"
                >
                  <Github className="w-4 h-4" />
                  <span>{t('projects.github')}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {t('apps.screenshots')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {project.gallery.map((img, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800 aspect-video shadow-md"
                >
                  <img
                    src={img}
                    alt={`Gallery ${i + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
