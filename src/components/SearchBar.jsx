import { useEffect, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({
  value,
  onChange,
  recentSearches,
  onPickRecent,
  onRemoveRecent,
  onCommitSearch,
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  return (
    <div className="search-bar-wrap relative mx-auto mb-3" ref={wrapRef}>
      <div className="library-search flex overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
        <span
          className="library-search-icon flex shrink-0 items-center justify-center border-0 bg-white text-slate-500"
          aria-hidden
        >
          <Search className="h-4 w-4" strokeWidth={1.75} />
        </span>
        <input
          type="search"
          className="library-search-input min-w-0 flex-1 border-0 bg-transparent py-3 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-0"
          placeholder="Type to search..."
          aria-label="Search assets"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && value.trim()) {
              e.preventDefault();
              onCommitSearch?.(value.trim());
              setOpen(false);
            }
          }}
        />
      </div>

      {open && recentSearches.length > 0 ? (
        <div className="recent-searches-dropdown absolute left-0 right-0 top-full z-30 mt-1 rounded-xl border border-slate-200 bg-white py-2 shadow-md">
          <div className="px-1 py-0">
            <div className="mb-1 px-2 text-xs font-medium uppercase tracking-wide text-slate-500">
              Recent searche
            </div>
            <ul className="m-0 list-none p-0">
              {recentSearches.map((q) => (
                <li key={q} className="recent-search-row flex items-center gap-1">
                  <button
                    type="button"
                    className="recent-search-pick flex flex-1 cursor-pointer rounded-lg border-0 bg-transparent py-2 pl-2 pr-1 text-left text-sm text-neutral-900 hover:bg-slate-50"
                    onClick={() => {
                      onPickRecent(q);
                      setOpen(false);
                    }}
                  >
                    {q}
                  </button>
                  <button
                    type="button"
                    className="recent-search-remove flex shrink-0 cursor-pointer rounded-lg border-0 bg-transparent p-2 text-slate-500 hover:bg-slate-100"
                    aria-label={`Remove “${q}” from recent searches`}
                    title="Remove from recent"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onRemoveRecent?.(q);
                    }}
                  >
                    <X className="h-4 w-4" strokeWidth={2} aria-hidden />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : 
      
      null}
    </div>
  );
}
