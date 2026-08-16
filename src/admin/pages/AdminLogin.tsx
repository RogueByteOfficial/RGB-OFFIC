import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useToast } from '../../components/ui/Toast';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, authError, clearError, currentUser } = useAuth();
  const { isRtl } = useLanguage();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // If already logged in, redirect to dashboard
  React.useEffect(() => {
    if (currentUser) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter both email and password', 'error');
      return;
    }

    setLoading(true);
    clearError();
    try {
      await login(email, password);
      showToast('Welcome to ROGUE BYTE Control Center', 'success');
      navigate('/admin/dashboard');
    } catch (err: any) {
      showToast(err.message || 'Authentication failed. Please verify your credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Brand */}
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-xl shadow-blue-500/25 mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            ROGUE BYTE Control Center
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            Authorized administrator access only
          </p>
        </div>

        {/* Login Card */}
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
          <div className="bg-slate-900/90 backdrop-blur-xl py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-slate-800">
            {authError && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs leading-relaxed">
                {authError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute top-1/2 -translate-y-1/2 left-3 rtl:left-auto rtl:right-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@roguebyte.io"
                    className="w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2.5 text-sm bg-slate-800/90 text-white border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute top-1/2 -translate-y-1/2 left-3 rtl:left-auto rtl:right-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 rtl:pl-3 rtl:pr-9 pr-10 py-2.5 text-sm bg-slate-800/90 text-white border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 -translate-y-1/2 right-3 rtl:right-auto rtl:left-3 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:from-blue-700 active:to-indigo-700 shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-800 flex items-center justify-center text-xs text-slate-400">
              <Link to="/" className="hover:text-blue-400 transition flex items-center gap-1.5">
                <span>Return to Public Website</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
