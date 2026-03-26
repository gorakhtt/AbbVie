import { BarChart3, Gauge, LineChart, PieChart } from 'lucide-react';

export default function KpiModal({
  asset,
  insightDraft = '',
  onInsightChange,
  onSaveInsight,
}) {
  const chartKind = (asset.chartType || 'line').toLowerCase();

  return (
    <div className="modal-type-body">
      <section className="mb-4" aria-labelledby="kpi-chart-placeholder-heading">
        <h3
          id="kpi-chart-placeholder-heading"
          className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500"
        >
          Chart preview
        </h3>
        <div
          className="flex min-h-[140px] select-none flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-600"
          role="img"
          aria-label={`Placeholder for ${chartKind} chart`}
        >
          <span className="font-medium text-neutral-700">{chartKind} chart</span>
          <span className="mt-1 text-xs text-slate-500">Placeholder — connect your viz engine here</span>
        </div>
      </section>

      <section className="mb-4">
        <h3 className="mb-3 text-base font-bold text-neutral-900">Business Questions</h3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {(asset.businessQuestions || []).map((q) => (
            <div key={q.id}>
              <div className="h-full rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <h4 className="mb-2 text-base font-semibold text-neutral-900">{q.title}</h4>
                <p className="mb-0 text-sm text-slate-600">{q.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>


      <section className="mb-4" aria-labelledby="kpi-insight-heading">
        <h3 id="kpi-insight-heading" className="mb-2 text-base font-bold text-neutral-900">
          Insight
        </h3>
        <textarea
          rows={4}
          className="mb-3 w-full resize-y rounded-lg border border-slate-200 px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Capture notes or annotations to share…"
          value={insightDraft}
          onChange={(e) => onInsightChange?.(e.target.value)}
        />
        <button
          type="button"
          className="w-full rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-semibold text-neutral-900 hover:bg-slate-50"
          onClick={() => onSaveInsight?.()}
        >
          Save Insight
        </button>
      </section>

      <section className="mb-4">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Metric IDs
        </h3>
        <div className="flex flex-wrap gap-2">
          {(asset.metricIds || []).map((id) => (
            <span
              key={id}
              className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-3 py-0.5 text-xs text-neutral-900"
            >
              {id}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-4">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Calculation
        </h3>
        <p className="mb-0 text-sm text-neutral-800">{asset.calculation || '—'}</p>
      </section>

      <section className="mb-4">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Visuals available
        </h3>
        <p className="mb-2 text-sm text-slate-600">{asset.visualsAvailable || '—'}</p>
        <div
          className="modal-visual-icons flex flex-wrap gap-3 text-blue-600"
          aria-hidden
        >
          <LineChart className="h-8 w-8" strokeWidth={1.75} title="Trend" />
          <BarChart3 className="h-8 w-8" strokeWidth={1.75} title="Bar" />
          <PieChart className="h-8 w-8" strokeWidth={1.75} fill="currentColor" title="Distribution" />
          <Gauge className="h-8 w-8" strokeWidth={1.75} title="KPI" />
        </div>
      </section>

      <section className="mb-4">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Affiliate applicability
        </h3>
        <p className="mb-0 text-sm text-neutral-800">{asset.affiliateApplicability || '—'}</p>
        {asset.affiliates?.length ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {asset.affiliates.map((a) => (
              <span
                key={a}
                className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-900"
              >
                {a}
                
              </span>
            ))}
          </div>
        ) : null}
      </section>
    </div>

  );
}
