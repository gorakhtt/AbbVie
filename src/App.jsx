import { useCallback, useState } from 'react';
import { X } from 'lucide-react';
import Library from './pages/Library';
import './App.css';


export default function App() {
  const [toast, setToast] = useState({ open: false, message: '' });

  const showToast = useCallback((message) => {
    setToast({ open: true, message });
    window.setTimeout(() => setToast((t) => ({ ...t, open: false })), 2800);
  }, []);

  return (
    <>
      <Library showToast={showToast} />
      <div
        className="pointer-events-none fixed bottom-0 right-0 z-[2000] p-3"
        aria-live="polite"
      >
        <div
          className={`pointer-events-auto flex max-w-sm items-stretch overflow-hidden rounded-lg bg-neutral-900 text-white shadow-lg transition-opacity duration-200 ${
            toast.open ? 'opacity-100' : 'opacity-0'
          }`}
          role="status"
          aria-atomic="true"
        >
          <div className="flex flex-1 items-center px-3 py-2 text-sm">{toast.message}</div>
          <button
            type="button"
            className="flex shrink-0 items-center justify-center border-l border-white/15 px-3 text-white/90 hover:bg-white/10"
            aria-label="Close"
            onClick={() => setToast((t) => ({ ...t, open: false }))}
          >
            <X className="h-4 w-4" strokeWidth={2} aria-hidden />
          </button>
        </div>
      </div>
    </>
  );
}
