import { Lock, PieChart } from 'lucide-react';
import { TYPE_BADGE_CLASSES, TYPE_LABELS, TYPE_TOOLTIPS } from '../data/assets';

export default function AssetCard({
  asset,
  onOpen,

  onUseInLayout,
  loading,
  isKpiTab,
}) {
  if (loading) {
    return (

      <div className="asset-card-ref h-full rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center p-3 md:p-4">
          <div
            className="asset-card-icon-box placeholder-glow shrink-0 overflow-hidden md:mr-4 mr-3"
            aria-hidden
          >
            <span
              className="block h-16 w-16 animate-pulse rounded-lg bg-slate-200"
              style={{ minWidth: 64, minHeight: 64 }}
            />
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <span className="mb-2 block h-4 w-[58%] animate-pulse rounded bg-slate-200" />
            <span className="mb-1 block h-3 w-full animate-pulse rounded bg-slate-200" />
            <span className="mb-1 block h-3 w-[92%] animate-pulse rounded bg-slate-200" />
            <span className="mt-2 block h-3 w-[28%] animate-pulse rounded bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }

  const typeKey = asset.type;
  const badgeClass = TYPE_BADGE_CLASSES[typeKey] || 'bg-slate-100 text-slate-800';
  const typeLabel = TYPE_LABELS[typeKey] || typeKey;
  const tooltip = TYPE_TOOLTIPS[typeKey] || '';
  const showKpiLayoutCta = isKpiTab && asset.type === 'kpi' && !asset.isRestricted;
  const chartKind = (asset.chartType || 'line').toLowerCase();

  return (
    <div
      className="asset-card-ref flex h-full min-h-0 overflow-hidden rounded-lg bg-white shadow-sm"
      title={tooltip}
    >
      <button
        type="button"
        className="asset-card-interactive flex min-w-0 flex-1 items-stretch border-0 bg-white p-0 text-left"
        onClick={() => onOpen(asset)}
      >
        <div className="flex w-full items-center p-3 md:p-4">
          <div className="asset-card-icon-box relative mr-3 shrink-0 md:mr-4" aria-hidden>
            {asset.isRestricted ? (
              <Lock
                className="absolute right-0.5 top-0.5 z-[1] h-4 w-4 text-amber-600"
                strokeWidth={2}
                aria-label="Restricted"
              />
            ) : null}
            <PieChart className="asset-card-pie-icon h-7 w-7" strokeWidth={1.75} />
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <span
              className={`mb-1 inline-flex w-fit max-w-full rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${badgeClass}`}
            >
              {typeLabel}
            </span>
            <h3 className="mb-1 text-base font-bold text-neutral-900">{asset.title}</h3>
            {isKpiTab && asset.type === 'kpi' ? (
              <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-slate-500">
                Chart: {chartKind}
              </p>
            ) : null}
            <p className="text-truncate-multiline mb-2 text-sm text-slate-600 md:mb-2">
              {asset.description}
            </p>
            <time className="mt-auto text-sm text-slate-500" dateTime={asset.date}>
              {asset.date}
            </time>
          </div>
        </div>
      </button>
      {showKpiLayoutCta ? (
        <div className="flex w-[7.5rem] shrink-0 flex-col justify-center border-l border-slate-200 bg-slate-50/90 px-2 py-2">
          <button
            type="button"
            className="rounded-lg border border-slate-200 bg-white px-2 py-2 text-center text-xs font-semibold text-neutral-800 shadow-sm hover:bg-slate-50"
            onClick={(e) => {
              e.stopPropagation();
              onUseInLayout?.(asset);
            }}
          >
            Use in Layout

          </button>
        </div>
      ) : 
      null}
    </div>
  );
}
