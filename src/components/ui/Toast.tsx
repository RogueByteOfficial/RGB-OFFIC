import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-5 right-5 left-5 md:left-auto z-50 flex flex-col gap-2 max-w-md pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border backdrop-blur-md text-sm font-medium ${
                toast.type === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200 bg-white/90 dark:bg-slate-900/90'
                  : toast.type === 'error'
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-200 bg-white/90 dark:bg-slate-900/90'
                  : 'bg-blue-500/10 border-blue-500/30 text-blue-900 dark:text-blue-200 bg-white/90 dark:bg-slate-900/90'
              }`}
            >
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-blue-500 shrink-0" />}
              <span className="flex-1">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};

// Standalone Toast component for component-level usage
export interface StandaloneToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
}

export const Toast: React.FC<StandaloneToastProps> = ({ message, type = 'info', onClose }) => {
  return (
    <div className="fixed bottom-5 right-5 left-5 md:left-auto z-50 max-w-md">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border backdrop-blur-md text-sm font-medium ${
          type === 'success'
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200 bg-white dark:bg-slate-900'
            : type === 'error'
            ? 'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-200 bg-white dark:bg-slate-900'
            : 'bg-blue-500/10 border-blue-500/30 text-blue-900 dark:text-blue-200 bg-white dark:bg-slate-900'
        }`}
      >
        {type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
        {type === 'error' && <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />}
        {type === 'info' && <Info className="w-5 h-5 text-blue-500 shrink-0" />}
        <span className="flex-1">{message}</span>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-slate-500"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
};
