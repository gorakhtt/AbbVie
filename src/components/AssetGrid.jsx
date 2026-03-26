import AssetCard from './AssetCard';
import { TAB_KEYS } from '../data/assets';

export default function AssetGrid({
  title,
  subtitle,
  assets,
  onOpenAsset,
  onUseInLayout,
  activeTab,
  loading,
  emptyHint,
}) {
  return (
    <section className="asset-grid-section mb-10">
      <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="mb-1 text-xl font-bold">{title}</h2>
          {subtitle ? <p className="mb-0 text-sm text-slate-600">{subtitle}</p> : null}
        </div>
      </div>

      {emptyHint && !loading && assets.length === 0 ? (
        <p className="py-4 italic text-slate-600">{emptyHint}</p>
      ) : null}

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {(loading ? Array.from({ length: 4 }) : assets).map((item, idx) => (
          <div key={loading ? `sk-${idx}` : item.id}>
            <AssetCard
              asset={item}
              onOpen={onOpenAsset}
              onUseInLayout={onUseInLayout}
              loading={loading}
              isKpiTab={activeTab === TAB_KEYS.KPI}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
