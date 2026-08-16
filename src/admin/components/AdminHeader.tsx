import React from 'react';
import { Menu, Sun, Moon, Globe, ExternalLink, Shield } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';

interface AdminHeaderProps {
  onOpenMobileMenu: () => void;
  title?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onOpenMobileMenu, title }) => {
  const { isDark, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 flex items-center justify-between z-10">
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        {title && (
          <h1 className="text-lg font-black text-slate-900 dark:text-white tracking-tight hidden sm:block">
            {title}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* View Public Website */}
        <Link
          to="/"
          target="_blank"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 rounded-xl transition"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        {/* Language switch */}
        <button
          onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
          className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition"
        >
          <Globe className="w-3.5 h-3.5 text-blue-500" />
          <span>{language === 'ar' ? 'English' : 'العربية'}</span>
        </button>

        {/* Theme switch */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
