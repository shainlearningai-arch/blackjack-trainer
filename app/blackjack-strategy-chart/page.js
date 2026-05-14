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
    images: [{ url: '/blackjack-basic-strategy-chart.svg', width: 524, alt: 'Blackjack Basic Strategy Chart' }],
  },
};

const charts = [
  {
    src: '/blackjack-hard-totals-strategy-chart.svg',
    alt: 'Blackjack hard totals basic strategy chart — 6 deck, dealer stands on soft 17',
    heading: 'Hard Totals',
    id: 'hard-totals',
    body: (
      <>
        A <strong>hard hand</strong> has no ace, or an ace that must count as 1.
        The most important numbers: <strong>double on 10 or 11</strong> against most dealer cards,
        stand on 17+, and surrender 16 vs. 9/10/Ace before hitting.
      </>
    ),
  },
  {
    src: '/blackjack-soft-totals-strategy-chart.svg',
    alt: 'Blackjack soft totals strategy chart — ace hands, when to double with an ace',
    heading: 'Soft Totals (Ace + X)',
    id: 'soft-totals',
    body: (
      <>
        A <strong>soft hand</strong> contains an ace counted as 11.
        The key rule: <strong>always double A-7 vs. 2–6</strong>; otherwise stand on soft 18+ and
        hit soft 17 or lower when the dealer shows 7 or higher.
      </>
    ),
  },
  {
    src: '/blackjack-pair-splitting-chart.svg',
    alt: 'Blackjack pairs splitting strategy chart — when to split pairs, 6 deck rules',
    heading: 'Pair Splitting',
    id: 'pairs',
    body: (
      <>
        <strong>Always split aces and 8s.</strong> Never split 10s or 5s.
        Split 9s against dealer 2–6 and 8–9, but stand vs. 7, 10, or Ace.
        P* cells mean split only if the casino allows re-splitting after the initial split.
      </>
    ),
  },
  {
    src: '/blackjack-basic-strategy-chart.svg',
    alt: 'Complete blackjack basic strategy chart — all hard totals, soft totals, and pairs in one chart',
    heading: 'Complete Strategy Chart',
    id: 'complete',
    body: (
      <>
        All three tables in one image — save or print this for a full reference.
        Memorizing this chart cuts the house edge to roughly <strong>0.5%</strong>,
        the lowest of any standard casino game.
      </>
    ),
  },
];

export default function BlackjackStrategyChartPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-2xl mx-auto px-4 py-10">

        <h1 className="text-2xl font-bold text-white mb-2">
          Blackjack Basic Strategy Charts
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          6-deck · Dealer stands on soft 17 · Late surrender allowed
        </p>

        <p className="text-gray-300 text-sm mb-10 leading-relaxed">
          Basic strategy is the mathematically correct play for every hand in blackjack.
          Follow these three charts and the house edge drops to around 0.5% — lower than any other
          table game. Each chart targets a specific hand type: hard totals, soft totals, and pairs.
        </p>

        <nav className="flex flex-wrap gap-3 mb-10">
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
          {charts.map(({ src, alt, heading, id, body }) => (
            <section key={id} id={id}>
              <h2 className="text-lg font-bold text-white mb-3">{heading}</h2>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">{body}</p>
              <a href={src} target="_blank" rel="noopener noreferrer" title={`View full-size: ${alt}`}>
                <img
                  src={src}
                  alt={alt}
                  width={524}
                  height={440}
                  className="rounded-xl w-full h-auto border border-gray-800 hover:border-gray-600 transition-colors"
                  loading="lazy"
                />
              </a>
              <p className="text-xs text-gray-600 mt-2 text-center">
                Click the chart to open full size · right-click to save
              </p>
            </section>
          ))}
        </div>

        <section className="mt-14 border-t border-gray-800 pt-10">
          <h2 className="text-lg font-bold text-white mb-4">Color Key</h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {[
              { color: 'bg-blue-800', label: 'H', name: 'Hit' },
              { color: 'bg-gray-600', label: 'S', name: 'Stand' },
              { color: 'bg-yellow-700', label: 'D', name: 'Double (else Hit)' },
              { color: 'bg-yellow-900', label: 'D*', name: 'Double (else Stand)' },
              { color: 'bg-purple-800', label: 'P', name: 'Split' },
              { color: 'bg-purple-900', label: 'P*', name: 'Split (else Hit)' },
              { color: 'bg-red-900', label: 'R', name: 'Surrender (else Hit)' },
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
          <a
            href="/"
            className="inline-block bg-blue-700 hover:bg-blue-600 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            Open the Trainer →
          </a>
        </section>

        <section className="mt-14 border-t border-gray-800 pt-10">
          <h2 className="text-lg font-bold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-200 mb-1">
                What is blackjack basic strategy?
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Basic strategy is a set of rules that tells you the statistically best action
                (hit, stand, double, split, or surrender) for every possible combination of your
                hand and the dealer&apos;s up card. Following it perfectly reduces the house edge to
                around 0.5% in a 6-deck game.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-200 mb-1">
                Is this chart for 6-deck blackjack?
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Yes. These charts are optimized for 6-deck shoes where the dealer stands on soft 17
                and late surrender is available — the most common rules in Las Vegas and online casinos.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-200 mb-1">
                When should you surrender in blackjack?
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Surrender 16 vs. dealer 9, 10, or Ace, and surrender 15 vs. dealer 10. These are the
                only surrender plays in the basic strategy for 6-deck soft-17 rules.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-200 mb-1">
                Should you always split Aces and 8s?
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Yes — always split aces and 8s regardless of the dealer&apos;s card. Splitting aces
                gives you two strong starting hands; splitting 8s turns a terrible 16 into two winnable
                hands starting at 8.
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
