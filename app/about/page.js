export const metadata = {
  title: "About — Blackjack Trainer",
  description: "Learn how to use the Blackjack Trainer to master basic strategy and Hi-Lo card counting.",
};

export default function About() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-300">
      <div className="max-w-2xl mx-auto px-6 py-16 space-y-10">

        <div>
          <h1 className="text-3xl font-black text-white mb-3">About Blackjack Trainer</h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            A free, no-nonsense tool for learning blackjack basic strategy and Hi-Lo card counting —
            without risking real money.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-white font-bold text-xl">What is this?</h2>
          <p className="leading-relaxed">
            Blackjack Trainer simulates a standard 6-deck blackjack game with Las Vegas rules
            (dealer stands on soft 17, late surrender allowed). Every decision you make is checked
            against mathematically correct basic strategy, and mistakes are explained in plain English
            so you understand <em>why</em> the correct play is correct.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-white font-bold text-xl">How to use it</h2>
          <ul className="space-y-2 list-disc list-inside text-gray-400">
            <li>Set your bet on the right panel, then press <kbd className="bg-gray-800 border border-gray-700 rounded px-1.5 py-0.5 text-xs text-white">Space</kbd> or click Deal</li>
            <li>Use keyboard shortcuts: <kbd className="bg-gray-800 border border-gray-700 rounded px-1.5 py-0.5 text-xs text-white">H</kbd> Hit, <kbd className="bg-gray-800 border border-gray-700 rounded px-1.5 py-0.5 text-xs text-white">S</kbd> Stand, <kbd className="bg-gray-800 border border-gray-700 rounded px-1.5 py-0.5 text-xs text-white">D</kbd> Double, <kbd className="bg-gray-800 border border-gray-700 rounded px-1.5 py-0.5 text-xs text-white">P</kbd> Split, <kbd className="bg-gray-800 border border-gray-700 rounded px-1.5 py-0.5 text-xs text-white">R</kbd> Surrender</li>
            <li>Review your mistake explanations in the right panel after each hand</li>
            <li>Toggle the running/true count display to practice counting without a crutch</li>
            <li>The basic strategy chart at the bottom right is always available as a reference</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-white font-bold text-xl">Card counting — Hi-Lo</h2>
          <p className="leading-relaxed">
            The trainer uses the Hi-Lo counting system, the most widely taught method. Cards 2–6
            count as <span className="text-green-400 font-bold">+1</span>, 7–9 as{" "}
            <span className="text-gray-400 font-bold">0</span>, and 10–Ace as{" "}
            <span className="text-red-400 font-bold">−1</span>. The true count adjusts for decks
            remaining, and tells you when to raise or lower your bet.
          </p>
          <p className="leading-relaxed">
            Use the <strong className="text-white">Show / Hide</strong> toggle on the count panel to
            practice calling the count yourself before checking your answer.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-white font-bold text-xl">Rules in use</h2>
          <ul className="space-y-1 list-disc list-inside text-gray-400">
            <li>6 decks, reshuffled when ~1 deck remains</li>
            <li>Dealer stands on soft 17</li>
            <li>Blackjack pays 3:2</li>
            <li>Late surrender allowed</li>
            <li>Double down on any two cards</li>
            <li>Split up to 4 hands (one card only on split aces)</li>
            <li>Insurance offered when dealer shows Ace</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-white font-bold text-xl">Is this gambling?</h2>
          <p className="leading-relaxed">
            No. There is no real money involved. The bankroll is fictional and resets whenever you
            want. This is a pure strategy training tool — the same kind used by professional players
            to drill decision-making until it becomes instinct.
          </p>
        </section>

        <div className="pt-8 border-t border-gray-800 flex items-center justify-between">
          <a href="/" className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold">
            ← Back to Trainer
          </a>
          <a href="/privacy-policy" className="text-gray-500 hover:text-gray-400 text-sm">
            Privacy Policy
          </a>
        </div>

      </div>
    </div>
  );
}
