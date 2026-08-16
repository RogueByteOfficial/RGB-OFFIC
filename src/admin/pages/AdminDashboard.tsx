import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  Briefcase, 
  Layers, 
  MessageSquare, 
  Image as ImageIcon, 
  Eye, 
  Plus, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  Database,
  RefreshCw,
  TrendingUp,
  Settings,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { 
  getApplications, 
  getProjects, 
  getServices, 
  getBanners, 
  getMessages, 
  seedDatabase,
  getSettings
} from '../../services/firestore';
import { Application, Project, Service, Banner, ContactMessage, GeneralSettings } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { Toast } from '../../components/ui/Toast';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';

export const AdminDashboard: React.FC = () => {
  const [apps, setApps] = useState<Application[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [settings, setSettings] = useState<GeneralSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [confirmSeedOpen, setConfirmSeedOpen] = useState(false);

  const { localize, language } = useLanguage();

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [appsData, projsData, svcsData, bansData, msgsData, setsData] = await Promise.all([
        getApplications(),
        getProjects(),
        getServices(),
        getBanners(),
        getMessages(),
        getSettings()
      ]);
      setApps(appsData);
      setProjects(projsData);
      setServices(svcsData);
      setBanners(bansData);
      setMessages(msgsData);
      setSettings(setsData);
    } catch (e) {
      console.error('Error loading dashboard stats:', e);
      setToast({ message: 'Failed to load stats', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleSeedDatabase = async () => {
    try {
      setSeeding(true);
      await seedDatabase(true);
      setToast({ message: 'Database initialized with full sample data!', type: 'success' });
      await loadAllData();
    } catch (e) {
      setToast({ message: 'Failed to initialize database', type: 'error' });
    } finally {
      setSeeding(false);
      setConfirmSeedOpen(false);
    }
  };

  const unreadMessagesCount = messages.filter((m) => !m.isRead).length;

  const statCards = [
    {
      title: 'Applications',
      count: apps.length,
      sub: `${apps.filter((a) => a.isActive).length} Active • ${apps.filter((a) => a.isFeatured).length} Featured`,
      icon: Smartphone,
      color: 'from-blue-600 to-indigo-600',
      bgColor: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      link: '/admin/applications'
    },
    {
      title: 'Projects & Portfolio',
      count: projects.length,
      sub: `${projects.filter((p) => p.status === 'completed').length} Completed`,
      icon: Briefcase,
      color: 'from-emerald-600 to-teal-600',
      bgColor: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
      link: '/admin/projects'
    },
    {
      title: 'Services',
      count: services.length,
      sub: `${services.filter((s) => s.isActive).length} Published`,
      icon: Layers,
      color: 'from-amber-600 to-orange-600',
      bgColor: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
      link: '/admin/services'
    },
    {
      title: 'Messages',
      count: messages.length,
      sub: `${unreadMessagesCount} Unread inquiry`,
      icon: MessageSquare,
      color: 'from-purple-600 to-pink-600',
      bgColor: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
      link: '/admin/messages',
      badge: unreadMessagesCount > 0 ? `${unreadMessagesCount} New` : undefined
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Real-time System Synchronized</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Welcome back to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300">{settings?.companyName ? localize(settings.companyName) : 'ROGUE BYTE LLC'} Control Center</span>
            </h1>
            <p className="text-slate-400 text-sm max-w-xl">
              Control and manage all public content, applications, projects portfolio, hero banners, client inquiries, and SEO configurations in real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setConfirmSeedOpen(true)}
              disabled={seeding}
              className="px-4 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-2"
            >
              <Database className={`w-4 h-4 text-indigo-400 ${seeding ? 'animate-spin' : ''}`} />
              <span>{seeding ? 'Seeding Data...' : 'Seed / Reset Demo Data'}</span>
            </button>

            <Link
              to="/"
              target="_blank"
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30 transition flex items-center gap-2"
            >
              <span>View Public Site</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((stat, idx) => {
          const IconComp = stat.icon;
          return (
            <Link
              key={idx}
              to={stat.link}
              className="group bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-500/40 transition-all flex flex-col justify-between relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-xl border ${stat.bgColor}`}>
                  <IconComp className="w-5 h-5" />
                </div>
                {stat.badge && (
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold animate-pulse">
                    {stat.badge}
                  </span>
                )}
              </div>

              <div className="mt-4 space-y-1">
                <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {loading ? '...' : stat.count}
                </div>
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {stat.title}
                </div>
                <div className="text-[11px] text-slate-400 dark:text-slate-500">
                  {stat.sub}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
                <span>Manage</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Launchpad */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span>Quick Create</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            <Link
              to="/admin/applications"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200/60 dark:border-slate-700/60 transition group"
            >
              <div className="flex items-center gap-3">
                <Smartphone className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-bold">Add New Application</span>
              </div>
              <Plus className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
            </Link>

            <Link
              to="/admin/projects"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200/60 dark:border-slate-700/60 transition group"
            >
              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold">Add Portfolio Project</span>
              </div>
              <Plus className="w-4 h-4 text-slate-400 group-hover:text-emerald-500" />
            </Link>

            <Link
              to="/admin/banners"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200/60 dark:border-slate-700/60 transition group"
            >
              <div className="flex items-center gap-3">
                <ImageIcon className="w-4 h-4 text-indigo-500" />
                <span className="text-xs font-bold">Create Hero Banner</span>
              </div>
              <Plus className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
            </Link>

            <Link
              to="/admin/services"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 border border-slate-200/60 dark:border-slate-700/60 transition group"
            >
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold">Add Company Service</span>
              </div>
              <Plus className="w-4 h-4 text-slate-400 group-hover:text-amber-500" />
            </Link>

            <Link
              to="/admin/settings"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 transition group"
            >
              <div className="flex items-center gap-3">
                <Settings className="w-4 h-4 text-slate-500" />
                <span className="text-xs font-bold">SEO & Contact Settings</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>
        </div>

        {/* Recent Inquiries / Messages */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-purple-500" />
              <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                Recent Client Messages
              </h2>
            </div>
            <Link
              to="/admin/messages"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>View All ({messages.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {messages.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs">
              No contact messages received yet. All new inquiries from the public contact form will appear here.
            </div>
          ) : (
            <div className="space-y-2.5">
              {messages.slice(0, 4).map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3.5 rounded-xl border transition flex items-start justify-between gap-4 ${
                    !msg.isRead
                      ? 'bg-purple-50/60 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900/50'
                      : 'bg-slate-50/50 dark:bg-slate-800/30 border-slate-200/50 dark:border-slate-800'
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900 dark:text-white truncate">
                        {msg.name}
                      </span>
                      {!msg.isRead && (
                        <span className="px-1.5 py-0.5 rounded bg-purple-500 text-white text-[9px] font-bold">
                          NEW
                        </span>
                      )}
                      <span className="text-[11px] text-slate-400">
                        {msg.email}
                      </span>
                    </div>
                    <div className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">
                      {msg.subject || 'Inquiry'}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {msg.message}
                    </div>
                  </div>

                  <Link
                    to="/admin/messages"
                    className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 transition shrink-0"
                  >
                    Open
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Seed Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmSeedOpen}
        title="Reset / Seed Database"
        message="Are you sure you want to re-seed the Firestore database? This will populate all collections with official enterprise portfolio and apps demo data."
        confirmText="Confirm & Seed Data"
        cancelText="Cancel"
        onConfirm={handleSeedDatabase}
        onCancel={() => setConfirmSeedOpen(false)}
      />
    </div>
  );
};
