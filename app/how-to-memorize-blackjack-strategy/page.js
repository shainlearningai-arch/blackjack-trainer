export const metadata = {
  title: 'How to Memorize Blackjack Basic Strategy — Step-by-Step Guide',
  description:
    'Learn how to memorize blackjack basic strategy fast. A step-by-step method covering hard totals, soft totals, and pairs — with drills, patterns, and tips that actually work.',
  keywords: [
    'how to memorize blackjack strategy',
    'memorize basic strategy blackjack',
    'learn blackjack basic strategy',
    'blackjack strategy tips',
    'blackjack strategy patterns',
    'how to learn blackjack',
    'basic strategy memorization',
    'blackjack for beginners',
  ],
  alternates: { canonical: '/how-to-memorize-blackjack-strategy' },
  openGraph: {
    title: 'How to Memorize Blackjack Basic Strategy — Step-by-Step Guide',
    description: 'A step-by-step method for memorizing blackjack basic strategy fast — patterns, drills, and tips that actually work.',
    url: 'https://blackjackgto.com/how-to-memorize-blackjack-strategy',
  },
};

const steps = [
  {
    num: '01',
    title: 'Start with hard totals only',
    body: `Most beginners try to memorize everything at once and give up. Don't. Hard totals cover the majority of hands you'll actually see at the table, so they give you the most bang for your time.

Focus on three rules first — they cover roughly 70% of decisions:
• Hard 17 or higher: always stand
• Hard 11 or less: never stand (except hit on soft hands — but ignore that for now)
• Hard 12–16 vs dealer 7+: always hit`,
  },
  {
    num: '02',
    title: 'Learn the dealer bust zone',
    body: `The most important concept in basic strategy is the dealer bust zone: when the dealer shows a 2, 3, 4, 5, or 6 upcard, they are statistically likely to bust. This single insight explains most of the "weird" strategy decisions.

When the dealer shows 4, 5, or 6 (the weakest cards), you stand on more hands and double down more aggressively — because you don't need to improve your hand, you just need to survive.

When the dealer shows 7 through Ace, they're strong. You need to hit harder to try to beat them.

Once you internalize the bust zone, the hard totals chart starts to make sense instead of feeling like arbitrary rules.`,
  },
  {
    num: '03',
    title: 'Memorize the doubles',
    body: `Doubling correctly is where most recreational players leave money on the table. The rules are simple once you see the pattern:

• Double on 11 vs everything except dealer Ace
• Double on 10 vs dealer 2–9
• Double on 9 vs dealer 3–6

Notice the pattern: the stronger your hand, the wider range of dealer cards you double against. And you always stop doubling when the dealer shows a strong card (7+).`,
  },
  {
    num: '04',
    title: 'Memorize the always/never splits',
    body: `Before memorizing situational splits, lock in the two absolutes:

Always split: Aces and 8s — no exceptions, regardless of what the dealer shows.
Never split: 10s and 5s — no exceptions either.

Rationale: Splitting Aces gives you two hands starting at 11. Splitting 8s turns a terrible 16 into two hands starting at 8.
Never split 10s because 20 already wins. Never split 5s because 10 is a great starting point to double from.

Everything else (2s, 3s, 4s, 6s, 7s, 9s) is situational and can come later.`,
  },
  {
    num: '05',
    title: 'Add soft totals last',
    body: `Soft hands (ace + another card) trip people up because the ace can count as 1 or 11. But the rules are actually simple once you frame them right:

• Soft 19–20 (A-8, A-9): always stand — you already have a great hand
• Soft 18 (A-7): stand vs dealer 2–6, hit vs 9–Ace, double vs 3–6
• Soft 17 or less (A-2 through A-6): never stand — you can't bust, so always hit or double

The key insight: you can't bust a soft hand by hitting once (the ace just drops to 1). So on soft 17 or less, you always take a card — the only question is whether to double.`,
  },
  {
    num: '06',
    title: 'Drill with a real trainer — not flashcards',
    body: `Reading the chart is not the same as knowing the chart. You need to build the reflex so the right move comes automatically, without thinking.

The fastest way to do that is a live trainer that deals hands and tells you immediately when you're wrong. Flashcards teach you to recognize a situation; a trainer teaches you to react to it under realistic conditions.

Aim for 100 hands per session. After 3–4 sessions with zero mistakes, you've got it.`,
  },
];

const faqs = [
  {
    q: 'How long does it take to memorize blackjack basic strategy?',
    a: 'Most people can memorize the core rules (hard totals, always/never splits) in 2–3 focused hours. Full memorization including soft totals and situational splits typically takes 10–15 hours of practice across multiple sessions. Using a live trainer dramatically speeds this up compared to reading a chart.',
  },
  {
    q: 'Do I need to memorize the whole chart to play correctly?',
    a: 'No. Learning hard totals and the always/never splits alone eliminates most costly mistakes. The remaining decisions (soft totals, situational splits) add marginal improvement. Start with the 70% that matters most and add the rest over time.',
  },
  {
    q: 'Is it legal to use a strategy card at the casino?',
    a: 'Yes — in virtually all casinos. Basic strategy cards are sold in casino gift shops. Casinos allow them because even perfect basic strategy still gives the house a 0.5% edge. You are allowed to look at the card while you play.',
  },
  {
    q: 'What is the fastest way to memorize the chart?',
    a: 'Learn the patterns, not the individual cells. The dealer bust zone (2–6) explains most standing decisions. The doubling pattern (stronger hand = wider range) explains the doubles. Once you see the logic, the chart becomes a small set of rules instead of 250 individual memorized cells.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'HowTo',
      name: 'How to Memorize Blackjack Basic Strategy',
      description: 'A step-by-step method for memorizing blackjack basic strategy, covering hard totals, soft totals, and pair splitting.',
      step: steps.map(({ num, title, body }) => ({
        '@type': 'HowToStep',
        position: parseInt(num),
        name: title,
        text: body.replace(/\n/g, ' ').trim(),
      })),
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ],
};

export default function HowToMemorizePage() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-2xl mx-auto px-4 py-10">

        <h1 className="text-2xl font-bold text-white mb-2">
          How to Memorize Blackjack Basic Strategy
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          A step-by-step method — learn patterns, not 250 individual cells
        </p>

        <p className="text-gray-300 text-sm mb-10 leading-relaxed">
          Most people try to memorize the strategy chart by brute force and give up within an hour.
          The faster approach is to learn the handful of <strong className="text-white">patterns behind the chart</strong> — once you understand why the strategy works, the decisions become obvious instead of arbitrary.
        </p>

        <div className="space-y-10">
          {steps.map(({ num, title, body }) => (
            <section key={num} className="border-l-2 border-gray-700 pl-5">
              <div className="text-xs font-mono text-gray-600 mb-1">STEP {num}</div>
              <h2 className="text-base font-bold text-white mb-3">{title}</h2>
              <div className="space-y-3">
                {body.split('\n\n').map((para, i) => (
                  <p key={i} className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-14 border border-gray-800 rounded-xl p-6 bg-gray-900">
          <h2 className="text-base font-bold text-white mb-2">The cheat sheet while you learn</h2>
          <p className="text-gray-400 text-sm mb-4 leading-relaxed">
            You don't need to have the whole chart memorized before you sit down. Pull up the
            strategy chart on your phone or print it — casinos allow it. Use it as a reference while
            you drill until the moves become automatic.
          </p>
          <a
            href="/blackjack-strategy-chart"
            className="inline-block bg-gray-800 hover:bg-gray-700 text-white font-bold text-sm px-4 py-2 rounded-lg transition-colors"
          >
            View Strategy Charts →
          </a>
        </section>

        <section className="mt-10 border border-blue-900 rounded-xl p-6 bg-blue-950/30">
          <h2 className="text-base font-bold text-white mb-2">Practice with a live trainer</h2>
          <p className="text-gray-400 text-sm mb-4 leading-relaxed">
            Reading the chart is step one. Step two is drilling until the right move
            comes automatically. The free trainer deals real hands and gives you instant feedback —
            the fastest way to go from knowing the chart to owning it.
          </p>
          <a
            href="/"
            className="inline-block bg-blue-700 hover:bg-blue-600 text-white font-bold text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Open the Trainer →
          </a>
        </section>

        <section className="mt-14 border-t border-gray-800 pt-10">
          <h2 className="text-lg font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map(({ q, a }) => (
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
