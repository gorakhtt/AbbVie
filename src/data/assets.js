/**
 * Utility: Generate reusable business questions
 */
const generateQuestions = (prefix = 'Question') => {
  return Array.from({ length: 4 }, (_, index) => {
    const number = index + 1;
    return {
      id: `${prefix}-${number}`,
      title: `${prefix} ${number}`,
      description: 'Short description of the item goes nicely here.',
    };
  });
};

/**
 * Core Asset Data
 */
export const ASSETS = [
  {
    id: 'kpi-1',
    title: 'Revenue',
    type: 'kpi',
    category: 'featured',

    description: 'Short description of the item goes nicely here.',
    subtitle: 'Descriptive name of the KPI',

    metadata: {
      createdOn: '06/27/2024',
      lastUpdated: '07/23/2024',
      usageCount: 2485,
      scope: 'Universal',
      pages: 1,
    },

    tags: ['ecommerce', 'coverage', 'stakeholders'],
    affiliates: ['India', 'US', 'EU'],

    businessQuestions: generateQuestions('KPI'),

    metrics: {
      ids: ['M-1042', 'M-8891', 'M-2201'],
      calculation:
        'SUM(revenue) / COUNT(DISTINCT orders) over trailing 30 days.',
    },

    visualization: {
      primaryChart: 'line',
      available:
        'Line trend, bar by region, sparkline in executive summary.',
    },

    applicability:
      'Applies to all retail affiliates; excluded for wholesale-only.',
  },

  {
    id: 'layout-1',
    title: 'INTES',
    type: 'layout',
    category: 'featured',

    description: 'Short description of the item goes nicely here.',
    subtitle: 'Descriptive name of the Layout',

    metadata: {
      createdOn: '06/27/2024',
      lastUpdated: '07/23/2024',
      usageCount: 2485,
      scope: 'Universal',
      pages: 6,
    },

    tags: ['comms', 'coverage', 'stakeholders'],
    affiliates: ['US', 'EU'],

    businessQuestions: generateQuestions('Layout'),

    kpisUsed: ['Revenue trend', 'Conversion funnel', 'CAC vs LTV'],
  },

  {
    id: 'viz-1',
    title: 'North Star Dashboard',
    type: 'dataviz',
    category: 'featured',

    description: 'Executive overview of product health',
    subtitle: 'Executive overview of product health',

    metadata: {
      createdOn: '06/20/2024',
      lastUpdated: '07/01/2024',
      usageCount: 1820,
      scope: 'Universal',
      pages: 1,
    },

    tags: ['growth', 'retention', 'product'],
    businessQuestions: generateQuestions('Viz'),

    kpiFavorites: ['WAU', 'Activation rate', 'NPS'],

    visualization: {
      primaryChart: 'bar',
    },

    context:
      'Curated for quarterly business reviews. Filters apply globally.',

    isRestricted: true,
  },

  {
    id: 'story-1',
    title: 'QBR Storyboard',
    type: 'storyboard',
    category: 'featured',

    description: 'Board-ready storyline for revenue and pipeline',
    subtitle: 'Board-ready storyline for revenue and pipeline',

    metadata: {
      createdOn: '06/15/2024',
      lastUpdated: '06/28/2024',
      usageCount: 940,
      scope: 'Layout',
      pages: 12,
    },

    tags: ['executive', 'quarterly', 'narrative'],
    affiliates: ['India', 'US'],

    businessQuestions: generateQuestions('Story'),

    linkedKpis: ['Pipeline coverage', 'Win rate', 'Avg deal size'],
    filters: ['Region', 'Segment', 'Fiscal quarter'],
    applicableAffiliates: [
      'NA Retail',
      'EU Enterprise',
      'APAC Digital',
    ],
  },
];

/**
 * Additional Assets (Lazy Load / Pagination)
 */
export const MORE_ASSETS = [
  {
    id: 'kpi-extra-1',
    title: 'Gross Margin',
    type: 'kpi',

    description: 'Margin after COGS for selected product lines.',
    subtitle: 'Trailing twelve months margin',

    metadata: {
      createdOn: '05/01/2024',
      lastUpdated: '05/22/2024',
      usageCount: 756,
      scope: 'KPI',
      pages: 1,
    },

    tags: ['finance', 'margin'],
    businessQuestions: generateQuestions('KPI-X'),

    metrics: {
      ids: ['M-8800'],
      calculation: '(Revenue - COGS) / Revenue.',
    },

    visualization: {
      primaryChart: 'line',
      available: 'Trend line, breakdown by SKU family.',
    },

    applicability: 'Finance affiliates only.',
  },
];

/**
 * UI Constants
 */
export const TAB_KEYS = {
  FEATURED: 'featured',
  KPI: 'kpi',
  LAYOUTS: 'layouts',
  DATA_VIZ: 'dataviz',
  STORYBOARDS: 'storyboards',
};

export const TYPE_CONFIG = {
  kpi: {
    label: 'KPI',
    badgeClass: 'bg-blue-100 text-blue-800',
    tooltip: 'Metric data',
  },
  layout: {
    label: 'Layout',
    badgeClass: 'bg-green-100 text-green-800',
    tooltip: 'Dashboard view',
  },
  storyboard: {
    label: 'Storyboard',
    badgeClass: 'bg-purple-100 text-purple-800',
    tooltip: 'Presentation view',
  },
  dataviz: {
    label: 'Data Visualization',
    badgeClass: 'bg-orange-100 text-orange-800',
    tooltip: 'Chart visualization',
  },
};