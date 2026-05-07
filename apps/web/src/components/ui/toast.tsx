'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

type ToastKind = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  kind: ToastKind;
  title: string;
  body?: string;
}

interface ToastApi {
  show: (t: Omit<Toast, 'id'>) => void;
  success: (title: string, body?: string) => void;
  error: (title: string, body?: string) => void;
  info: (title: string, body?: string) => void;
}

const Ctx = createContext<ToastApi | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback((t: Omit<Toast, 'id'>) => {
    const id = Date.now() + Math.random();
    setToasts((all) => [...all, { ...t, id }]);
    setTimeout(() => setToasts((all) => all.filter((x) => x.id !== id)), 4500);
  }, []);

  const api: ToastApi = {
    show,
    success: (title, body) => show({ kind: 'success', title, body }),
    error: (title, body) => show({ kind: 'error', title, body }),
    info: (title, body) => show({ kind: 'info', title, body }),
  };

  return (
    <Ctx.Provider value={api}>
      {children}
      <div className="fixed bottom-4 inset-x-4 sm:bottom-6 sm:right-6 sm:left-auto sm:max-w-sm z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className={`pointer-events-auto rounded-2xl px-4 py-3 surface text-ink-50 border ${
                t.kind === 'success'
                  ? 'border-sage-500/40'
                  : t.kind === 'error'
                    ? 'border-red-500/40'
                    : 'border-wise-500/40'
              } flex items-start gap-3 shadow-2xl`}
            >
              <div className="shrink-0 pt-0.5">
                {t.kind === 'success' ? (
                  <CheckCircle2 size={16} className="text-sage-400" />
                ) : t.kind === 'error' ? (
                  <AlertCircle size={16} className="text-red-400" />
                ) : (
                  <Info size={16} className="text-wise-400" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium leading-snug">{t.title}</div>
                {t.body && (
                  <div className="text-xs text-ink-200 mt-0.5 leading-snug">{t.body}</div>
                )}
              </div>
              <button
                type="button"
                onClick={() => setToasts((all) => all.filter((x) => x.id !== t.id))}
                className="shrink-0 text-ink-200 hover:text-ink-50 transition"
                aria-label="Dismiss"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Ctx.Provider>
  );
}

export function useToast(): ToastApi {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useToast must be inside <ToastProvider>');
  return ctx;
}
