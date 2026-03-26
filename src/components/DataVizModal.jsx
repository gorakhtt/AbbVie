import { CirclePlay } from 'lucide-react';

export default function DataVizModal({ asset, onInteractChart }) {
  return (
    <div className="modal-type-body">
      <section className="mb-4">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Applicable KPI favorite
        </h3>
        <ul className="mb-0 list-disc pl-5 text-sm text-neutral-800">
          {(asset.kpiFavorites || []).map((k) => (
            <li key={k}>{k}</li>
          ))}
        </ul>
      </section>

      <section className="mb-4">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Asset info contexts
        </h3>
        <p className="mb-0 text-sm text-slate-600">{asset.assetContext || '—'}</p>
      </section>

      <section className="modal-primary-action-section">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          onClick={onInteractChart}
        >
          <CirclePlay className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
          Interact with Chart
        </button>
        <div
          className="chart-interactive-placeholder mt-3 flex select-none items-center justify-center rounded-xl border border-slate-200 text-sm text-slate-600"
          role="img"
          aria-label="Chart preview area"
        >
          Drag to zoom Hover to values
        </div>
      </section>
    </div>
  );
}
