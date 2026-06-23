export const metadata = {
  title: 'How to Play Blackjack — Rules, Card Values & Beginner Guide',
  description:
    'Learn how to play blackjack from scratch. Covers the objective, card values, how a round works, when to hit or stand, and the rules beginners get wrong most often.',
  keywords: [
    'how to play blackjack',
    'blackjack rules',
    'blackjack for beginners',
    'blackjack card values',
    'blackjack objective',
    'how does blackjack work',
    'blackjack hand values',
    'learn blackjack',
    'blackjack hitting standing rules',
  ],
  alternates: { canonical: '/how-to-play-blackjack' },
  openGraph: {
    title: 'How to Play Blackjack — Rules, Card Values & Beginner Guide',
    description: 'Everything a beginner needs to know about blackjack — the objective, card values, how a round works, and the rules most beginners get wrong.',
    url: 'https://blackjackgto.com/how-to-play-blackjack',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'How to Play Blackjack — Rules, Card Values & Beginner Guide',
      description: 'A complete beginner guide to blackjack covering the objective, card values, how a round works, and common rules.',
      url: 'https://blackjackgto.com/how-to-play-blackjack',
      author: { '@type': 'Organization', name: 'Blackjack GTO', url: 'https://blackjackgto.com' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the objective of blackjack?',
          acceptedAnswer: { '@type': 'Answer', text: 'The objective is to beat the dealer by having a hand value closer to 21 without going over. You are not playing against other players — only the dealer.' },
        },
        {
          '@type': 'Question',
          name: 'What are card values in blackjack?',
          acceptedAnswer: { '@type': 'Answer', text: 'Number cards (2–10) are worth their face value. Face cards (Jack, Queen, King) are each worth 10. Aces are worth either 1 or 11, whichever helps your hand most.' },
        },
        {
          '@type': 'Question',
          name: 'What does "bust" mean in blackjack?',
          acceptedAnswer: { '@type': 'Answer', text: 'Busting means your hand total exceeds 21. If you bust, you lose your bet immediately regardless of what the dealer does.' },
        },
        {
          '@type': 'Question',
          name: 'What is a blackjack?',
          acceptedAnswer: { '@type': 'Answer', text: 'A blackjack (also called a natural) is when your first two cards are an Ace and any 10-value card. It pays 3:2 at most casinos — meaning a $10 bet returns $15 profit.' },
        },
        {
          '@type': 'Question',
          name: 'Should you always hit on 16?',
          acceptedAnswer: { '@type': 'Answer', text: 'Not always. If the dealer shows a 2, 3, 4, 5, or 6 (bust cards), you should stand on 16 because the dealer is likely to bust. If the dealer shows 7 or higher, you should hit (or surrender if allowed).' },
        },
      ],
    },
  ],
};

export default function HowToPlayBlackjack() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-2xl mx-auto px-4 py-10">

        <h1 className="text-2xl font-bold text-white mb-2">How to Play Blackjack</h1>
        <p className="text-gray-400 text-sm mb-10">The complete beginner guide — rules, card values, and how a round works</p>

        {/* Objective */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-white mb-3">The objective</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-3">
            Beat the dealer by getting a hand total closer to <strong className="text-white">21</strong> without going over.
            That&apos;s it. You are not competing against other players at the table — only the dealer.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            If your total exceeds 21, you <strong className="text-white">bust</strong> and lose your bet immediately.
            If the dealer busts, you win. If both you and the dealer finish without busting, whoever is closer to 21 wins.
            A tie is called a <strong className="text-white">push</strong> — your bet is returned.
          </p>
        </section>

        {/* Card values */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-white mb-3">Card values</h2>
          <div className="rounded-xl border border-gray-800 overflow-hidden mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-800 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="px-4 py-3 text-left">Card</th>
                  <th className="px-4 py-3 text-left">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr className="bg-gray-900">
                  <td className="px-4 py-3 text-gray-200">2 through 10</td>
                  <td className="px-4 py-3 text-gray-400">Face value (2 = 2, 7 = 7, etc.)</td>
                </tr>
                <tr className="bg-gray-900">
                  <td className="px-4 py-3 text-gray-200">Jack, Queen, King</td>
                  <td className="px-4 py-3 text-gray-400">10 each</td>
                </tr>
                <tr className="bg-gray-900">
                  <td className="px-4 py-3 text-gray-200 font-semibold">Ace</td>
                  <td className="px-4 py-3 text-gray-400">1 <em>or</em> 11 — whichever helps you more</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            An Ace automatically counts as 11 unless that would bust you, in which case it counts as 1.
            A hand with an Ace counted as 11 is called a <strong className="text-white">soft hand</strong>.
            A hand where the Ace must count as 1 (or a hand with no Ace) is called a <strong className="text-white">hard hand</strong>.
          </p>
        </section>

        {/* How a round works */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-white mb-3">How a round works</h2>
          <div className="space-y-3">
            {[
              { step: '1', title: 'Place your bet', body: 'Before any cards are dealt, you bet. Minimum and maximum bet limits are posted at each table.' },
              { step: '2', title: 'Cards are dealt', body: 'You receive two cards face-up. The dealer receives one card face-up and one face-down (the "hole card").' },
              { step: '3', title: 'Check for blackjack', body: 'If either you or the dealer has an Ace and a 10-value card, that\'s a blackjack. A player blackjack pays 3:2. If the dealer has blackjack, all players lose (unless they also have blackjack — that\'s a push).' },
              { step: '4', title: 'You act on your hand', body: 'Starting with your hand, you choose to hit (take another card), stand (keep your total), double down, split pairs, or surrender. You act before the dealer.' },
              { step: '5', title: 'Dealer plays', body: 'After all players have acted, the dealer reveals their hole card. The dealer must hit on 16 or less, and stand on 17 or more — no choices involved.' },
              { step: '6', title: 'Winner is determined', body: 'Whoever is closer to 21 wins. Ties push. Busts lose immediately regardless of what the other party does.' },
            ].map(({ step, title, body }) => (
              <div key={step} className="flex gap-4 bg-gray-900 border border-gray-800 rounded-xl px-4 py-3">
                <div className="text-xs font-mono text-gray-600 pt-0.5 shrink-0 w-4">{step}</div>
                <div>
                  <div className="text-sm font-semibold text-gray-200 mb-0.5">{title}</div>
                  <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Player options */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-white mb-3">Your options on each hand</h2>
          <div className="space-y-3 text-sm">
            {[
              { action: 'Hit', color: 'bg-blue-800 text-blue-100', desc: 'Take another card. You can hit as many times as you want until you stand or bust.' },
              { action: 'Stand', color: 'bg-gray-600 text-gray-100', desc: 'Keep your current total and end your turn. The dealer then plays.' },
              { action: 'Double Down', color: 'bg-yellow-700 text-yellow-100', desc: 'Double your bet and receive exactly one more card. Only available on your first two cards.' },
              { action: 'Split', color: 'bg-purple-800 text-purple-100', desc: 'If your first two cards are a pair, you can split them into two separate hands, each with its own bet.' },
              { action: 'Surrender', color: 'bg-red-900 text-red-100', desc: 'Fold your hand and get half your bet back. Only available on your first two cards before any other action. Not all casinos offer it.' },
            ].map(({ action, color, desc }) => (
              <div key={action} className="flex gap-3 items-start">
                <span className={`${color} font-bold text-xs px-2 py-1 rounded shrink-0 mt-0.5`}>{action}</span>
                <p className="text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Common mistakes */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-white mb-3">Rules beginners get wrong</h2>
          <div className="space-y-4 text-sm text-gray-400">
            <div>
              <p className="text-gray-200 font-semibold mb-1">The goal is not to get to 21</p>
              <p className="leading-relaxed">Many beginners try to get as close to 21 as possible on every hand. The actual goal is to beat the dealer — sometimes that means standing on 13 if the dealer is likely to bust.</p>
            </div>
            <div>
              <p className="text-gray-200 font-semibold mb-1">The dealer doesn&apos;t have a choice</p>
              <p className="leading-relaxed">The dealer must follow fixed rules: hit on 16 or below, stand on 17 or above. There is no strategy involved for the dealer. This is why you can use their up card to predict what they&apos;re likely to do.</p>
            </div>
            <div>
              <p className="text-gray-200 font-semibold mb-1">6:5 blackjack pays less than 3:2</p>
              <p className="leading-relaxed">Many tables (especially single-deck games) pay 6:5 on blackjack instead of 3:2. On a $10 bet, 3:2 pays $15 profit; 6:5 pays only $12. Always find a 3:2 table — the difference adds over 1% to the house edge.</p>
            </div>
            <div>
              <p className="text-gray-200 font-semibold mb-1">Insurance is a bad bet</p>
              <p className="leading-relaxed">When the dealer shows an Ace, they offer "insurance" — a side bet that pays 2:1 if the dealer has blackjack. The math doesn&apos;t work out in your favor. Basic strategy says decline insurance every time.</p>
            </div>
          </div>
        </section>

        {/* Next steps */}
        <section className="border-t border-gray-800 pt-10">
          <h2 className="text-lg font-bold text-white mb-4">Ready to go deeper?</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <a href="/" className="block bg-blue-700 hover:bg-blue-600 rounded-xl p-4 transition-colors">
              <div className="font-bold text-sm text-white mb-1">Practice Trainer</div>
              <div className="text-blue-200 text-xs">Real-time feedback on every decision</div>
            </a>
            <a href="/blackjack-strategy-chart" className="block bg-gray-800 hover:bg-gray-700 rounded-xl p-4 transition-colors">
              <div className="font-bold text-sm text-white mb-1">Strategy Charts</div>
              <div className="text-gray-400 text-xs">The correct play for every hand</div>
            </a>
            <a href="/how-to-memorize-blackjack-strategy" className="block bg-gray-800 hover:bg-gray-700 rounded-xl p-4 transition-colors">
              <div className="font-bold text-sm text-white mb-1">Memorize Strategy</div>
              <div className="text-gray-400 text-xs">Learn the patterns, not 250 cells</div>
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-14 border-t border-gray-800 pt-10">
          <h2 className="text-lg font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6 text-sm">
            {[
              { q: 'What is the objective of blackjack?', a: 'Beat the dealer by getting a hand total closer to 21 without going over. You are not playing against other players — only the dealer.' },
              { q: 'What are card values in blackjack?', a: 'Number cards (2–10) are worth their face value. Face cards (Jack, Queen, King) are each worth 10. Aces are worth either 1 or 11, whichever helps your hand most.' },
              { q: 'What does "bust" mean in blackjack?', a: 'Busting means your hand total exceeds 21. If you bust, you lose your bet immediately regardless of what the dealer does.' },
              { q: 'What is a blackjack?', a: 'A blackjack (also called a natural) is when your first two cards are an Ace and any 10-value card. It pays 3:2 at most casinos — a $10 bet returns $15 profit.' },
              { q: 'Should you always hit on 16?', a: 'Not always. If the dealer shows a 2–6 (bust cards), stand on 16 — the dealer is likely to bust. If the dealer shows 7 or higher, hit or surrender if allowed.' },
            ].map(({ q, a }) => (
              <div key={q}>
                <h3 className="font-semibold text-gray-200 mb-1">{q}</h3>
                <p className="text-gray-400 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
