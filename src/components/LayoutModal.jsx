import { Columns2 } from 'lucide-react';
export default function LayoutModal({ asset, onPreviewLayout }) {
  return (
    <div className="modal-type-body">
      <section className="mb-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Amount of pages
            </h3>
            <p className="mb-0 font-semibold text-neutral-900">{asset.pages ?? '—'}</p>
          </div>
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              KPIs being used
            </h3>
            <ul className="mb-0 list-disc pl-5 text-sm text-neutral-800">
              {(asset.kpisUsed || []).map((k) => (
                <li key={k}>{k}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="modal-primary-action-section">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          onClick={onPreviewLayout}
        >
          <Columns2 className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
          Preview layouts
        </button>
        <div
          className="layout-preview-placeholder mt-3 rounded-xl border border-slate-300/40 bg-slate-500/10"
          style={{ minHeight: '220px' }}
          aria-hidden
        />
      </section>
    </div>
  );
}
