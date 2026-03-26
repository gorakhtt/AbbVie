import { useCallback, useEffect, useMemo, useState } from 'react';
import { ASSETS, MORE_ASSETS, TAB_KEYS } from '../data/assets';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Tabs from '../components/Tabs';
import AssetGrid from '../components/AssetGrid';
import BaseModal from '../components/BaseModal';

const RECENT_KEY = 'data-library-recent-searches';
const FAV_KEY = 'data-library-favorites';
const MAX_RECENT = 8;

function loadRecent() {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveRecent(list) {
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(list));
  } catch {
    /* ignore quota */
  }
}

function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAV_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function matchesQuery(asset, q) {
  if (!q.trim()) return true;
  const s = q.trim().toLowerCase();
  const inTags = (asset.tags || []).some((t) => t.toLowerCase().includes(s));
  return (
    asset.title.toLowerCase().includes(s) ||
    asset.description.toLowerCase().includes(s) ||
    inTags
  );
}

function filterByTab(list, tab) {
  if (tab === TAB_KEYS.FEATURED) return list;
  if (tab === TAB_KEYS.KPI) return list.filter((a) => a.type === 'kpi');
  if (tab === TAB_KEYS.LAYOUTS) return list.filter((a) => a.type === 'layout');
  if (tab === TAB_KEYS.DATA_VIZ) return list.filter((a) => a.type === 'dataviz');
  if (tab === TAB_KEYS.STORYBOARDS) return list.filter((a) => a.type === 'storyboard');
  return list;
}

/**
 * Main dashboard: Library → filtered view, Featured/Trending, expanded catalog, modals.
 */
export default function Library({ showToast }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(TAB_KEYS.FEATURED);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [favorites, setFavorites] = useState(loadFavorites);
  const [recentSearches, setRecentSearches] = useState(loadRecent);
  const [extraLoaded, setExtraLoaded] = useState(0);
  const [loadingCards, setLoadingCards] = useState(true);

  /** KPIs chosen for a future dashboard layout (JTBD: build my layout). */
  const [layoutItems, setLayoutItems] = useState([]);
  /** Saved insight notes per KPI id (JTBD: capture & annotate insights). */
  const [insights, setInsights] = useState({});
  /** Access requests for restricted assets (JTBD: request access + reason). */
  const [requestedAccess, setRequestedAccess] = useState([]);
  const [accessRequestAsset, setAccessRequestAsset] = useState(null);
  const [accessReasonDraft, setAccessReasonDraft] = useState('');
  /** KPI modal: local insight draft while deep-diving (synced from insights on open). */
  const [kpiInsightDraft, setKpiInsightDraft] = useState('');

  useEffect(() => {
    const t = window.setTimeout(() => setLoadingCards(false), 900);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
    } catch {
      /* ignore */
    }
  }, [favorites]);

  useEffect(() => {
    document.title = searchQuery.trim() ? `Library · Search` : 'Data Library';
  }, [searchQuery]);

  /** Base catalog only (Featured / Trending grids). */
  const filteredBaseAssets = useMemo(() => {
    const tabbed = filterByTab(ASSETS, activeTab);
    return tabbed.filter((a) => matchesQuery(a, searchQuery));
  }, [activeTab, searchQuery]);

  /** Expanded asset section: “Show more” loads from MORE_ASSETS only (flowchart). */
  const filteredExpandedAssets = useMemo(() => {
    const slice = MORE_ASSETS.slice(0, extraLoaded);
    return filterByTab(slice, activeTab).filter((a) => matchesQuery(a, searchQuery));
  }, [extraLoaded, activeTab, searchQuery]);

  const featuredList = useMemo(
    () => filteredBaseAssets.filter((a) => a.category === 'featured'),
    [filteredBaseAssets],
  );

  const trendingList = useMemo(
    () => filteredBaseAssets.filter((a) => a.category === 'trending'),
    [filteredBaseAssets],
  );

  const totalVisible =
    filteredBaseAssets.length + filteredExpandedAssets.length;

  const commitSearch = useCallback((q) => {
    if (!q) return;
    setRecentSearches((prev) => {
      const next = [q, ...prev.filter((x) => x !== q)].slice(0, MAX_RECENT);
      saveRecent(next);
      return next;
    });
  }, []);

  const clearSearch = useCallback(() => setSearchQuery(''), []);

  const removeRecentSearch = useCallback((q) => {
    setRecentSearches((prev) => {
      const next = prev.filter((x) => x !== q);
      saveRecent(next);
      return next;
    });
  }, []);

  const focusSearchInput = useCallback(() => {
    const el = document.querySelector('.library-search-input');
    el?.focus?.();
  }, []);

  const toggleFavorite = useCallback(() => {
    if (!selectedAsset) return;
    setFavorites((prev) =>
      prev.includes(selectedAsset.id)
        ? prev.filter((id) => id !== selectedAsset.id)
        : [...prev, selectedAsset.id],
    );
  }, [selectedAsset]);

  const copyLink = useCallback(
    (asset) => {
      const url = `${window.location.origin}${window.location.pathname}#asset=${asset.id}`;
      const fallback = () => {
        const ta = document.createElement('textarea');
        ta.value = url;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      };
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(url).then(
          () => showToast('Link copied to clipboard'),
          () => {
            fallback();
            showToast('Link copied to clipboard');
          },
        );
      } else {
        fallback();
        showToast('Link copied to clipboard');
      }
    },
    [showToast],
  );

  const noResults =
    !loadingCards && totalVisible === 0 && searchQuery.trim().length > 0;

  const isFilteredView = Boolean(searchQuery.trim());
  const showExpandedFooter =
    !loadingCards &&
    (extraLoaded >= MORE_ASSETS.length || filteredExpandedAssets.length > 0);

  const openAssetModal = useCallback(
    (asset) => {
      if (asset?.isRestricted) {
        setAccessRequestAsset(asset);
        setAccessReasonDraft('');
        return;
      }
      setSelectedAsset(asset);
      setModalType(asset?.type ?? null);
      if (asset?.type === 'kpi') {
        setKpiInsightDraft(insights[asset.id] ?? '');
      }
    },
    [insights],
  );

  const closeAssetModal = useCallback(() => {
    setSelectedAsset(null);
    setModalType(null);
  }, []);

  /** Add KPI to layout builder list (idempotent by asset id). */
  const addKpiToLayout = useCallback(
    (asset) => {
      if (asset?.type !== 'kpi' || asset?.isRestricted) return;
      setLayoutItems((prev) =>
        prev.some((a) => a.id === asset.id) ? prev : [...prev, asset],
      );
      showToast(`“${asset.title}” added to your layout.`);
    },
    [showToast],
  );

  const saveKpiInsight = useCallback(() => {
    if (!selectedAsset || selectedAsset.type !== 'kpi') return;
    const text = kpiInsightDraft.trim();
    setInsights((prev) => ({ ...prev, [selectedAsset.id]: text }));
    setKpiInsightDraft(text);
    showToast(text ? 'Insight saved.' : 'Insight cleared.');
  }, [selectedAsset, kpiInsightDraft, showToast]);

  const submitAccessRequest = useCallback(() => {
    if (!accessRequestAsset) return;
    const reason = accessReasonDraft.trim();
    setRequestedAccess((prev) => [
      ...prev,
      {
        assetId: accessRequestAsset.id,
        title: accessRequestAsset.title,
        reason,
        requestedAt: Date.now(),
      },
    ]);
    showToast(`Access requested for “${accessRequestAsset.title}”.`);
    setAccessRequestAsset(null);
    setAccessReasonDraft('');
  }, [accessRequestAsset, accessReasonDraft, showToast]);

  const closeAccessModal = useCallback(() => {
    setAccessRequestAsset(null);
    setAccessReasonDraft('');
  }, []);

  return (
    <div className="library-page min-h-screen py-4 md:py-5">
      <div className="library-shell mx-auto w-full px-3 py-4 md:px-5 md:py-5">
        <Header onRequest={() => showToast('Request submitted — we will follow up shortly.')} />

        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          recentSearches={recentSearches}
          onPickRecent={(q) => {
            setSearchQuery(q);
            commitSearch(q);
          }}
          onRemoveRecent={removeRecentSearch}
          onCommitSearch={commitSearch}
        />

        <Tabs active={activeTab} onChange={setActiveTab} />

        {/* State summary (JTBD): layout picks + access requests — screen-reader + keeps state referenced. */}
        <p className="sr-only" aria-live="polite">
          {layoutItems.length} KPI{layoutItems.length === 1 ? '' : 's'} in your layout.
          {requestedAccess.length} access request{requestedAccess.length === 1 ? '' : 's'} recorded.
        </p>

        {/* Filtered view (search → filtered catalog) */}
        {isFilteredView && !loadingCards && !noResults ? (
          <div
            className="filtered-view-strip mb-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
            role="status"
          >
            <span>
              <strong>Filtered view</strong>
              <span className="ml-1 text-slate-600">
                · {totalVisible} asset{totalVisible === 1 ? '' : 's'} match “{searchQuery.trim()}”
              </span>
            </span>
            <button
              type="button"
              className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-sm text-neutral-800 hover:bg-slate-50"
              onClick={clearSearch}
            >
              Clear search
            </button>
          </div>
        ) : null}

        {noResults ? (
          <div className="mb-4 py-12 text-center">
            <p className="mb-2 text-slate-600">No assets match your search.</p>
            <button
              type="button"
              className="cursor-pointer border-0 bg-transparent text-sm text-blue-600 underline hover:text-blue-800"
              onClick={clearSearch}
            >
              Not seeing? Try search
            </button>
          </div>
        ) : (
          <>
            <AssetGrid
              title="Featured"
              subtitle="Curated top picks from this week"
              assets={featuredList}
              onOpenAsset={openAssetModal}
              onUseInLayout={addKpiToLayout}
              activeTab={activeTab}
              loading={loadingCards}
              emptyHint={
                !loadingCards && featuredList.length === 0
                  ? 'No featured items in this view.'
                  : undefined
              }
            />
            <AssetGrid
              title="Trending"
              subtitle="Most popular by community"
              assets={trendingList}
              onOpenAsset={openAssetModal}
              onUseInLayout={addKpiToLayout}
              activeTab={activeTab}
              loading={loadingCards}
              emptyHint={
                !loadingCards && trendingList.length === 0
                  ? 'No trending items in this view.'
                  : undefined
              }
            />
          </>
        )}

        {/* Expanded asset section: additional assets + footer CTA */}
        <section className="expanded-assets mt-2 border-t border-slate-200 pt-4">
          <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="mb-1 text-lg font-bold">Expanded catalog</h2>
              <p className="mb-0 text-sm text-slate-600">
                Show more of the library — additional assets load here.
              </p>
            </div>
            <button
              type="button"
              className="whitespace-nowrap rounded-lg border border-neutral-800 bg-white px-3 py-1.5 text-sm text-neutral-900 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={extraLoaded >= MORE_ASSETS.length}
              onClick={() =>
                setExtraLoaded((n) => Math.min(n + 2, MORE_ASSETS.length))
              }
            >
              Show more assets
            </button>
          </div>

          {extraLoaded > 0 && !loadingCards ? (
            <AssetGrid
              title="Additional assets"
              subtitle="Loaded via expanded section"
              assets={filteredExpandedAssets}
              onOpenAsset={openAssetModal}
              onUseInLayout={addKpiToLayout}
              activeTab={activeTab}
              loading={false}
              emptyHint={
                filteredExpandedAssets.length === 0
                  ? 'No additional items in this tab or search. Try another filter or clear search.'
                  : undefined
              }
            />
          ) : null}

          {showExpandedFooter ? (
            <footer className="expanded-assets-footer mt-4 border-t border-slate-100 pt-2">
              <p className="mb-0 text-sm text-slate-600">
                Not seeing what you need?{' '}
                <button
                  type="button"
                  className="inline cursor-pointer border-0 bg-transparent p-0 align-baseline text-sm text-blue-600 underline hover:text-blue-800"
                  onClick={() => {
                    focusSearchInput();
                  }}
                >
                  Try search
                </button>
              </p>
            </footer>
          ) : null}
        </section>
      </div>

      {selectedAsset ? (
        <BaseModal
          asset={selectedAsset}
          modalType={modalType}
          onClose={closeAssetModal}
          isFavorite={favorites.includes(selectedAsset.id)}
          onToggleFavorite={toggleFavorite}
          onCopyLink={copyLink}
          onRequestAccess={(asset) =>
            showToast(`Access request sent for “${asset.title}”.`)
          }
          onInteractChart={(asset) =>
            showToast(`Opening chart workspace for “${asset.title}” (demo).`)
          }
          onPreviewLayout={(asset) =>
            showToast(`Opening layout preview for “${asset.title}” (demo).`)
          }
          kpiInsightDraft={kpiInsightDraft}
          onKpiInsightChange={setKpiInsightDraft}
          onSaveKpiInsight={saveKpiInsight}
        />
      ) : null}

      {accessRequestAsset ? (
        <accessRequestModal
          asset={accessRequestAsset}
          reason={accessReasonDraft}
          onReasonChange={setAccessReasonDraft}
          onSubmit={submitAccessRequest}
          onClose={closeAccessModal}
        />
      ) : null}
    </div>
  );
}
