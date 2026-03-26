import { Shield } from 'lucide-react';


export default function StoryboardModal({ asset, onRequestAccess }) {
  return (
    <div className="modal-type-body">
      <section className="mb-4">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Coupled KPIs / filters
        </h3>
        <div className="mb-2 text-sm">
          <span className="text-slate-500">KPIs: </span>
          {(asset.coupledKpis || []).join(', ') || '—'}
        </div>
        <div className="text-sm">
          <span className="text-slate-500">Filters: </span>
          {(asset.coupledFilters || []).join(', ') || '—'}
        </div>
      </section>

      <section className="mb-4">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Applicable affiliates
        </h3>
        <div className="flex flex-wrap gap-2">
          {(asset.applicableAffiliates || []).map((a) => (
            <span
              key={a}
              className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-3 py-0.5 text-xs text-neutral-900"
            >
              {a}
            </span>
          ))}
        </div>
      </section>

      <section className="modal-primary-action-section">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          onClick={onRequestAccess}
        >
          <Shield className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
          Request access
        </button>
      </section>
    </div>
  );
}
