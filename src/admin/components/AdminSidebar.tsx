import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Image, 
  Smartphone, 
  Briefcase, 
  Layers, 
  Info, 
  MessageSquare, 
  FolderOpen, 
  Settings, 
  LogOut, 
  ExternalLink,
  Shield,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AdminSidebarProps {
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onCloseMobile }) => {
  const { logout, currentUser } = useAuth();

  const navItems = [
    { label: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Hero Banners', path: '/admin/banners', icon: Image },
    { label: 'Applications', path: '/admin/applications', icon: Smartphone },
    { label: 'Projects / Portfolio', path: '/admin/projects', icon: Briefcase },
    { label: 'Services', path: '/admin/services', icon: Layers },
    { label: 'About Company', path: '/admin/about', icon: Info },
    { label: 'Messages', path: '/admin/messages', icon: MessageSquare },
    { label: 'Media Library', path: '/admin/media', icon: FolderOpen },
    { label: 'General & SEO', path: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-full border-r border-slate-800 shrink-0">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <Link to="/admin/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
            <Shield className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base text-white tracking-tight leading-tight">
              NS Control Hub
            </span>
            <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">
              Admin CMS
            </span>
          </div>
        </Link>

        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="p-1 rounded-lg text-slate-400 hover:text-white lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 px-4 overflow-y-auto flex flex-col gap-1">
        <div className="px-3 pb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          Content & Management
        </div>

        {navItems.map((item) => {
          const IconComp = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`
              }
            >
              <IconComp className="w-4 h-4" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Footer / Account */}
      <div className="p-4 border-t border-slate-800 flex flex-col gap-2">
        <Link
          to="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 px-2">
          <div className="flex flex-col truncate pr-2">
            <span className="text-[11px] font-bold text-white truncate">
              {currentUser?.email || 'Admin User'}
            </span>
            <span className="text-[9px] text-emerald-400 font-medium">Online</span>
          </div>

          <button
            onClick={() => logout()}
            title="Sign Out"
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
