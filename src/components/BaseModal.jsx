import { useEffect } from 'react';
import { Info, LayoutGrid, Link2, Star, X } from 'lucide-react';
import { TYPE_BADGE_CLASSES, TYPE_LABELS } from '../data/assets';

import KpiModal from './KpiModal';
import DataVizModal from './DataVizModal';
import LayoutModal from './LayoutModal';
import StoryboardModal from './StoryboardModal';

export default function BaseModal({
  asset,
  modalType,
  onClose,
  isFavorite,
  onToggleFavorite,
  onCopyLink,
  onRequestAccess,
  onInteractChart,
  onPreviewLayout,
  kpiInsightDraft,
  onKpiInsightChange,
  onSaveKpiInsight,
}) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!asset) return null;

  const kind = modalType || asset.type;
  const typeLabel = TYPE_LABELS[kind] || kind;
  const headerBadgeClass =
    TYPE_BADGE_CLASSES[kind] || 'bg-blue-600/10 text-blue-700';

  const renderTypeBody = () => {
    switch (kind) {
      case 'kpi':
        return (
          <KpiModal
            asset={asset}
            insightDraft={kpiInsightDraft}
            onInsightChange={onKpiInsightChange}
            onSaveInsight={onSaveKpiInsight}
          />
        );
      case 'dataviz':
        return (
          <DataVizModal
            asset={asset}
            onInteractChart={() => onInteractChart?.(asset)}
          />
        );
      case 'layout':
        return (
          <LayoutModal asset={asset} onPreviewLayout={() => onPreviewLayout?.(asset)} />
        );
      case 'storyboard':
        return <StoryboardModal asset={asset} onRequestAccess={() => onRequestAccess?.(asset)} />;
      default:
        return null;
    }
  };

  return (
    <div className="modal-root" role="dialog" aria-modal="true" aria-labelledby="asset-modal-title">
      <button
        type="button"
        className="modal-backdrop block h-full min-h-screen w-full cursor-pointer border-0 p-0"
        aria-label="Close modal"
        onClick={onClose}
      />
      <div className="modal-panel overflow-hidden rounded-2xl border-0 bg-white shadow-xl">
        <div className="relative p-4 md:p-5">
          <div className="absolute right-0 top-0 flex gap-2 p-3">
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              aria-label="Copy link"
              onClick={() => onCopyLink?.(asset)}
            >
              <Link2 className="h-4 w-4" strokeWidth={2} aria-hidden />
            </button>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              aria-label="Close"
              onClick={onClose}
            >
              <X className="h-4 w-4" strokeWidth={2} aria-hidden />
            </button>
          </div>

          <div className="mb-4 pt-2 text-center">
            <div
              className="modal-hero-icon mx-auto mb-3 flex items-center justify-center rounded-lg border border-slate-200 bg-slate-100"
              aria-hidden
            >
              <LayoutGrid className="h-7 w-7 text-slate-500" strokeWidth={1.75} />
            </div>
            <h2
              id="asset-modal-title"
              className="mb-2 flex flex-wrap items-center justify-center gap-2 text-2xl font-bold"
            >
              {asset.title}
              <span
                className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-semibold ${headerBadgeClass}`}
              >
                {typeLabel}
              </span>
            </h2>
            <p className="mb-0 text-slate-600">{asset.subtitle || asset.description}</p>
          </div>

          <section className="mb-3" aria-labelledby="modal-desc-heading">
            <h3
              id="modal-desc-heading"
              className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              Description
            </h3>
            <p className="mb-0 text-sm text-slate-600">{asset.description}</p>
          </section>

          <div className="mb-4 flex flex-wrap gap-2">
            {(asset.tags || []).map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-3 py-0.5 text-xs text-slate-600"
              >
                #{t}
              </span>
            ))}
          </div>

          <div className="mb-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 text-center lg:grid-cols-4">
            <div className="flex min-h-[72px] flex-col justify-center bg-white p-3">
              <div className="mb-1 flex items-center justify-center gap-1 text-xs text-slate-500">
                Used
                <Info className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
              </div>
              <div className="font-semibold text-neutral-900">
                {asset.usedCount?.toLocaleString?.() ?? '—'}
              </div>
            </div>
            <div className="flex min-h-[72px] flex-col justify-center bg-white p-3">
              <div className="mb-1 text-xs text-slate-500">Type</div>
              <div className="font-semibold text-neutral-900">{asset.scopeType || typeLabel}</div>
            </div>
            <div className="flex min-h-[72px] flex-col justify-center bg-white p-3">
              <div className="mb-1 flex items-center justify-center gap-1 text-xs text-slate-500">
                Pages
                <Info className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
              </div>
              <div className="font-semibold text-neutral-900">{asset.pages ?? '—'}</div>
            </div>
            <div className="flex min-h-[72px] flex-col justify-center bg-white p-3">
              <div className="mb-1 text-xs text-slate-500">Last Updated</div>
              <div className="font-semibold text-neutral-900">{asset.lastUpdated || asset.date}</div>
            </div>
          </div>

          {renderTypeBody()}

          <button
            type="button"
            className={`favorite-btn mt-4 flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold ${
              isFavorite
                ? 'bg-amber-400 text-neutral-900 hover:bg-amber-500'
                : 'bg-neutral-900 text-white hover:bg-neutral-800'
            }`}
            onClick={onToggleFavorite}
            aria-pressed={isFavorite}
          >
            <Star
              className="h-5 w-5 shrink-0"
              strokeWidth={2}
              fill={isFavorite ? 'currentColor' : 'none'}
              aria-hidden
            />
            Favorite Item
            
          </button>
        </div>
      </div>
    </div>
  );
}
