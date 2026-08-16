import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUp, 
  Shield, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Facebook, 
  Youtube, 
  Send 
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { GeneralSettings, Service } from '../../types';
import { getSettings, getServices } from '../../services/firestore';

export const Footer: React.FC = () => {
  const [settings, setSettings] = useState<GeneralSettings | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const { t, localize, isRtl } = useLanguage();

  useEffect(() => {
    getSettings().then(setSettings);
    getServices(true).then((data) => setServices(data.slice(0, 5)));
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();
  const brandName = settings?.companyName 
    ? localize(settings.companyName, 'NS GROUP')
    : 'NS GROUP';

  const socialLinks = settings?.social || {};

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-white leading-tight">
                  {brandName}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400">
                  Technologies
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {settings?.seo?.metaDescription
                ? localize(settings.seo.metaDescription)
                : 'Pioneering next-generation mobile applications, intelligent enterprise platforms, and digital solutions.'}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 mt-2">
              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-2.5 bg-slate-800 hover:bg-blue-600 hover:text-white rounded-xl text-slate-400 transition"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2.5 bg-slate-800 hover:bg-blue-600 hover:text-white rounded-xl text-slate-400 transition"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="p-2.5 bg-slate-800 hover:bg-blue-600 hover:text-white rounded-xl text-slate-400 transition"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-2.5 bg-slate-800 hover:bg-blue-600 hover:text-white rounded-xl text-slate-400 transition"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-2.5 bg-slate-800 hover:bg-blue-600 hover:text-white rounded-xl text-slate-400 transition"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="p-2.5 bg-slate-800 hover:bg-blue-600 hover:text-white rounded-xl text-slate-400 transition"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
              {socialLinks.telegram && (
                <a
                  href={socialLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="p-2.5 bg-slate-800 hover:bg-blue-600 hover:text-white rounded-xl text-slate-400 transition"
                >
                  <Send className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              {t('footer.quickLinks')}
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-blue-400 transition">{t('nav.home')}</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition">{t('nav.about')}</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-400 transition">{t('nav.services')}</Link>
              </li>
              <li>
                <Link to="/applications" className="hover:text-blue-400 transition">{t('nav.applications')}</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-blue-400 transition">{t('nav.projects')}</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition">{t('nav.contact')}</Link>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              {t('nav.services')}
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-slate-400">
              {services.map((svc) => (
                <li key={svc.id}>
                  <Link to="/services" className="hover:text-blue-400 transition">
                    {localize(svc.title)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              {t('contact.info')}
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-slate-400">
              {settings?.email && (
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                  <a href={`mailto:${settings.email}`} className="hover:text-white transition truncate">
                    {settings.email}
                  </a>
                </li>
              )}
              {settings?.phone && (
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                  <a href={`tel:${settings.phone}`} className="hover:text-white transition">
                    {settings.phone}
                  </a>
                </li>
              )}
              {settings?.address && (
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span className="text-xs leading-relaxed">
                    {localize(settings.address)}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {currentYear} {brandName}. {t('footer.rights')}</span>
            <span>•</span>
            <Link to="/admin/login" className="hover:text-slate-300 flex items-center gap-1">
              <Shield className="w-3 h-3" />
              <span>Admin</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <span>{t('footer.builtWith')}</span>
            <button
              onClick={scrollToTop}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
