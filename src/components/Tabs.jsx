import { TAB_KEYS } from '../data/assets';

const ITEMS = [
  { key: TAB_KEYS.FEATURED, label: 'Featured' },
  { key: TAB_KEYS.KPI, label: 'KPI' },
  { key: TAB_KEYS.LAYOUTS, label: 'Layouts' },
  { key: TAB_KEYS.STORYBOARDS, label: 'Storyboards' },
];

export default function Tabs({ active, onChange }) {
  return (
    <nav
      className="library-tabs-track mx-auto mb-4 flex w-full max-w-[645px] flex-wrap justify-between gap-1 rounded-xl bg-slate-100 p-1 sm:p-2"
      aria-label="Asset categories"
    >
      {ITEMS.map(({ key, label }) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            type="button"
            className={`min-w-0 flex-1 rounded-lg px-1 py-2 text-center text-sm transition-[color,box-shadow,background-color] sm:px-3 sm:py-2 ${
              isActive
                ? 'bg-white font-bold text-neutral-900 shadow-[0_1px_3px_rgba(15,23,42,0.12)]'
                : 'bg-transparent font-normal text-slate-600 hover:text-slate-800'
            }`}
            onClick={() => onChange(key)}
            aria-current={isActive ? 'page' : undefined}
          >
            {label}
          </button>
        );
      })}
    </nav>
  );
}
