export const metadata = {
  title: 'Blackjack Basic Strategy Chart — Hard Totals, Soft Totals & Pairs',
  description:
    'Free printable blackjack basic strategy charts for 6-deck games. Covers hard totals, soft totals (ace hands), and pair splitting — color-coded for easy memorization.',
  keywords: [
    'blackjack basic strategy chart',
    'blackjack strategy chart',
    'blackjack hard totals chart',
    'blackjack soft totals chart',
    'blackjack pair splitting chart',
    'when to hit in blackjack',
    'when to stand in blackjack',
    'when to double down blackjack',
    'when to split blackjack',
    'blackjack surrender chart',
    'printable blackjack strategy',
    'blackjack cheat sheet',
  ],
  alternates: { canonical: '/blackjack-strategy-chart' },
  openGraph: {
    title: 'Blackjack Basic Strategy Chart — Hard Totals, Soft Totals & Pairs',
    description:
      'Color-coded blackjack strategy charts for 6-deck games. Hard totals, soft totals, and pair splitting — free to save or print.',
    url: 'https://blackjackgto.com/blackjack-strategy-chart',
    images: [
      {
        url: 'https://blackjackgto.com/blackjack-basic-strategy-chart.png',
        width: 1048,
        height: 2212,
        alt: 'Complete blackjack basic strategy chart — hard totals, soft totals, and pairs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blackjack Basic Strategy Chart',
    description: 'Color-coded charts for hard totals, soft totals, and pair splitting. Free to save.',
    images: ['https://blackjackgto.com/blackjack-basic-strategy-chart.png'],
  },
};

const BASE = 'https://blackjackgto.com';

const charts = [
  {
    png: '/blackjack-hard-totals-strategy-chart.png',
    svg: '/blackjack-hard-totals-strategy-chart.svg',
    alt: 'Blackjack hard totals basic strategy chart — 6 deck, dealer stands on soft 17',
    width: 1048,
    height: 904,
    heading: 'Hard Totals',
    id: 'hard-totals',
    desc: 'A hard hand has no ace, or an ace that must count as 1. The most important rules: double on 10 or 11 against most dealer cards, stand on 17+, and surrender 16 vs. 9/10/Ace before hitting.',
  },
  {
    png: '/blackjack-soft-totals-strategy-chart.png',
    svg: '/blackjack-soft-totals-strategy-chart.svg',
    alt: 'Blackjack soft totals strategy chart — ace hands, when to double with an ace in blackjack',
    width: 1048,
    height: 792,
    heading: 'Soft Totals (Ace + X)',
    id: 'soft-totals',
    desc: 'A soft hand contains an ace counted as 11. Always double A-7 vs. 2–6; stand on soft 18+ and hit soft 17 or lower when the dealer shows 7 or higher.',
  },
  {
    png: '/blackjack-pair-splitting-chart.png',
    svg: '/blackjack-pair-splitting-chart.svg',
    alt: 'Blackjack pairs splitting strategy chart — when to split pairs, 6 deck rules',
    width: 1048,
    height: 904,
    heading: 'Pair Splitting',
    id: 'pairs',
    desc: 'Always split aces and 8s. Never split 10s or 5s. Split 9s against dealer 2–6 and 8–9 but stand vs. 7, 10, or Ace. P* cells mean split only if re-splitting is allowed.',
  },
  {
    png: '/blackjack-basic-strategy-chart.png',
    svg: '/blackjack-basic-strategy-chart.svg',
    alt: 'Complete blackjack basic strategy chart — all hard totals, soft totals, and pairs in one printable chart',
    width: 1048,
    height: 2212,
    heading: 'Complete Strategy Chart',
    id: 'complete',
    desc: 'All three tables in one image — save or print this for a full reference. Memorizing this chart cuts the house edge to roughly 0.5%, the lowest of any standard casino game.',
  },
];

const faqItems = [
  {
    q: 'What is blackjack basic strategy?',
    a: 'Basic strategy is the mathematically correct action (hit, stand, double, split, or surrender) for every possible combination of your hand and the dealer\'s up card. Following it perfectly reduces the house edge to around 0.5% in a 6-deck game.',
  },
  {
    q: 'Is this chart for 6-deck blackjack?',
    a: 'Yes. These charts are optimized for 6-deck shoes where the dealer stands on soft 17 and late surrender is available — the most common rules in Las Vegas and online casinos.',
  },
  {
    q: 'When should you surrender in blackjack?',
    a: 'Surrender 16 vs. dealer 9, 10, or Ace, and surrender 15 vs. dealer 10. These are the only surrender plays in the basic strategy for 6-deck soft-17 rules.',
  },
  {
    q: 'Should you always split Aces and 8s?',
    a: 'Yes — always split aces and 8s regardless of the dealer\'s card. Splitting aces gives you two strong starting hands; splitting 8s turns a terrible 16 into two hands starting at 8.',
  },
  {
    q: 'When should you double down in blackjack?',
    a: 'Double down on hard 11 against any dealer card except Ace, on hard 10 against dealer 2–9, and on hard 9 against dealer 3–6. For soft hands, double A-7 vs. dealer 2–6 and A-2 through A-6 against the dealer\'s weaker cards.',
  },
  {
    q: 'Does basic strategy guarantee winning?',
    a: 'No — basic strategy minimizes the house edge but doesn\'t eliminate it. It tells you the play with the highest expected value given the information available. You will still lose sessions; basic strategy just makes those losses as small as possible over time.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${BASE}/blackjack-strategy-chart`,
      url: `${BASE}/blackjack-strategy-chart`,
      name: 'Blackjack Basic Strategy Chart — Hard Totals, Soft Totals & Pairs',
      description:
        'Free color-coded blackjack basic strategy charts for 6-deck games covering hard totals, soft totals, and pair splitting.',
      isPartOf: { '@id': BASE },
      about: { '@type': 'Thing', name: 'Blackjack basic strategy' },
    },
    ...charts.map(({ png, alt, width, height, heading }) => ({
      '@type': 'ImageObject',
      contentUrl: `${BASE}${png}`,
      url: `${BASE}/blackjack-strategy-chart`,
      name: heading + ' — Blackjack Basic Strategy Chart',
      description: alt,
      width,
      height,
      encodingFormat: 'image/png',
      license: `${BASE}/privacy-policy`,
      creator: { '@type': 'Organization', name: 'Blackjack GTO', url: BASE },
    })),
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ],
};

export default function BlackjackStrategyChartPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-2xl mx-auto px-4 py-10">

        <h1 className="text-2xl font-bold text-white mb-2">
          Blackjack Basic Strategy Charts
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          6-deck · Dealer stands on soft 17 · Late surrender allowed
        </p>

        <p className="text-gray-300 text-sm mb-10 leading-relaxed">
          Basic strategy is the mathematically correct play for every hand in blackjack.
          Follow these three charts and the house edge drops to around 0.5% — lower than
          any other table game. Each chart covers a specific hand type.
        </p>

        <nav className="flex flex-wrap gap-3 mb-10" aria-label="Jump to chart">
          {charts.map(({ id, heading }) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-full transition-colors"
            >
              {heading}
            </a>
          ))}
        </nav>

        <div className="space-y-14">
          {charts.map(({ png, svg, alt, width, height, heading, id, desc }) => (
            <section key={id} id={id}>
              <h2 className="text-lg font-bold text-white mb-3">{heading}</h2>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">{desc}</p>
              <a href={svg} target="_blank" rel="noopener noreferrer" title={`Download SVG: ${heading}`}>
                <img
                  src={png}
                  alt={alt}
                  width={width}
                  height={height}
                  className="rounded-xl w-full h-auto border border-gray-800 hover:border-gray-600 transition-colors"
                  loading="lazy"
                />
              </a>
              <p className="text-xs text-gray-600 mt-2 text-center">
                Right-click to save · click to download SVG
              </p>
            </section>
          ))}
        </div>

        <section className="mt-14 border-t border-gray-800 pt-10">
          <h2 className="text-lg font-bold text-white mb-4">Color Key</h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {[
              { color: 'bg-blue-800',   label: 'H',  name: 'Hit' },
              { color: 'bg-gray-600',   label: 'S',  name: 'Stand' },
              { color: 'bg-yellow-700', label: 'D',  name: 'Double (else Hit)' },
              { color: 'bg-yellow-900', label: 'D*', name: 'Double (else Stand)' },
              { color: 'bg-purple-800', label: 'P',  name: 'Split' },
              { color: 'bg-purple-900', label: 'P*', name: 'Split (else Hit)' },
              { color: 'bg-red-900',    label: 'R',  name: 'Surrender (else Hit)' },
            ].map(({ color, label, name }) => (
              <div key={label} className="flex items-center gap-2">
                <span className={`${color} text-white font-bold text-xs px-2 py-0.5 rounded w-9 text-center`}>
                  {label}
                </span>
                <span className="text-gray-400">{name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 border-t border-gray-800 pt-10">
          <h2 className="text-lg font-bold text-white mb-3">Practice the Strategy</h2>
          <p className="text-gray-400 text-sm mb-4 leading-relaxed">
            Seeing the chart is one thing — drilling it until it&apos;s automatic is another.
            The free trainer on this site deals hands and tells you instantly if your decision
            matches basic strategy, so you can build the reflex before you sit at a table.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/"
              className="inline-block bg-blue-700 hover:bg-blue-600 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors"
            >
              Open the Trainer →
            </a>
            <a
              href="/how-to-count-cards"
              className="inline-block bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold text-sm px-5 py-2.5 rounded-lg transition-colors"
            >
              Learn Card Counting →
            </a>
          </div>
        </section>

        <section className="mt-14 border-t border-gray-800 pt-10">
          <h2 className="text-lg font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqItems.map(({ q, a }) => (
              <div key={q}>
                <h3 className="text-sm font-semibold text-gray-200 mb-1">{q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
