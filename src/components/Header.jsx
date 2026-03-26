import { Globe } from 'lucide-react';

export default function Header({ onRequest }) {
  return (
    <header className="library-header relative mb-4 pb-2 text-center">
      <button
        type="button"
        className="library-request-btn absolute right-0 top-0 inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-neutral-800"
        onClick={onRequest}
        aria-label="Request access or asset"
      >
        <Globe className="h-4 w-4 shrink-0" aria-hidden />
        Requests
      </button>
      <h1 className="library-title mb-2 font-bold">Library</h1>
      <p className="library-subtitle mx-auto mb-0 text-slate-600">
        Browse for assets needed to report and present analysis.
      </p>
    </header>
  );
}
