'use client';

const RESULT_CONFIG = {
  win:       { label: 'You Win!',        color: 'text-emerald-400', bg: 'bg-emerald-950/40 border-emerald-700' },
  lose:      { label: 'Dealer Wins',     color: 'text-red-400',     bg: 'bg-red-950/40 border-red-700' },
  push:      { label: 'Push',            color: 'text-yellow-300',  bg: 'bg-yellow-950/40 border-yellow-700' },
  blackjack: { label: 'Blackjack — 3:2', color: 'text-yellow-300',  bg: 'bg-yellow-950/40 border-yellow-700' },
  bust:      { label: 'Bust',            color: 'text-red-400',     bg: 'bg-red-950/40 border-red-700' },
  surrender: { label: 'Surrendered',     color: 'text-blue-300',    bg: 'bg-blue-950/40 border-blue-700' },
};

export default function FeedbackPanel({ result, lastMistakes = [], insuranceMistake, insuranceTook, insuranceResult, stats }) {
  const cfg = result ? RESULT_CONFIG[result] : null;
  const hasMistake = lastMistakes.length > 0 || insuranceMistake;
  const allPerfect = !hasMistake && result && result !== 'blackjack';
  const accuracy = stats?.hands > 0
    ? Math.round((stats.correct / (stats.correct + stats.mistakes || 1)) * 100)
    : null;

  return (
    <div className="space-y-2">

      {/* Stats bar */}
      {stats && (
        <div className="bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 flex items-center gap-3">
          <div className="flex items-center gap-3 flex-1 text-sm">
            <div>
              <span className="text-white font-bold">{stats.hands}</span>
              <span className="text-gray-500 text-xs ml-1">hands</span>
            </div>
            <div>
              <span className="text-emerald-400 font-bold">{stats.correct}</span>
              <span className="text-gray-500 text-xs ml-1">correct</span>
            </div>
            <div>
              <span className="text-red-400 font-bold">{stats.mistakes}</span>
              <span className="text-gray-500 text-xs ml-1">errors</span>
            </div>
          </div>
          {accuracy !== null && (
            <div className="flex flex-col items-end gap-0.5 min-w-[48px]">
              <span className={`text-sm font-bold ${accuracy >= 90 ? 'text-emerald-400' : accuracy >= 70 ? 'text-yellow-400' : 'text-red-400'}`}>
                {accuracy}%
              </span>
              <div className="w-12 bg-gray-800 rounded-full h-1">
                <div className="bg-emerald-500 h-1 rounded-full transition-all" style={{ width: `${accuracy}%` }} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Hand result */}
      {cfg && (
        <div className={`border rounded-xl px-3 py-2 ${cfg.bg}`}>
          <div className={`text-base font-bold ${cfg.color}`}>{cfg.label}</div>
        </div>
      )}

      {/* Insurance result */}
      {insuranceResult !== null && insuranceResult !== undefined && (
        <div className={`border rounded-xl px-3 py-2 text-sm flex items-center gap-2
          ${insuranceResult === 'win' ? 'bg-emerald-950/40 border-emerald-700' : 'bg-gray-800/60 border-gray-700'}`}>
          <span>{insuranceResult === 'win' ? '✓' : '✗'}</span>
          <div>
            <span className={`font-semibold text-xs ${insuranceResult === 'win' ? 'text-emerald-400' : 'text-gray-400'}`}>
              Insurance {insuranceResult === 'win' ? 'won 2:1' : 'lost'}
            </span>
            <span className="text-gray-500 text-xs ml-2">
              ({insuranceTook ? 'taken' : 'declined'})
            </span>
          </div>
        </div>
      )}

      {/* Insurance declined */}
      {insuranceTook === false && insuranceResult === null && result && (
        <div className="border rounded-xl px-3 py-2 text-xs bg-gray-800/40 border-gray-700 text-gray-400">
          Insurance declined
        </div>
      )}

      {/* Insurance mistake */}
      {insuranceMistake && (
        <div className="bg-orange-950/40 border border-orange-700 rounded-xl p-3 space-y-1.5">
          <div className="text-orange-300 font-bold text-xs uppercase tracking-wider">Insurance Mistake</div>
          <div className="flex gap-4 text-xs">
            <div><span className="text-gray-400">You: </span><span className="text-red-400 font-bold">{insuranceMistake.took ? 'Took' : 'Declined'}</span></div>
            <div><span className="text-gray-400">Correct: </span><span className="text-green-400 font-bold">{insuranceMistake.shouldHave ? 'Take' : 'Decline'}</span></div>
          </div>
          <div className="text-gray-300 text-xs leading-relaxed bg-gray-900/50 rounded-lg px-2 py-1.5">
            {insuranceMistake.explanation}
          </div>
        </div>
      )}

      {/* Play mistakes */}
      {lastMistakes.length > 0 && (
        <div className="bg-red-950/40 border border-red-700 rounded-xl p-3 space-y-2">
          <div className="text-red-300 font-bold text-xs uppercase tracking-wider">Strategy Mistake</div>
          {lastMistakes.map((m, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex gap-4 text-xs">
                <div><span className="text-gray-400">You: </span><span className="text-red-400 font-bold">{m.actionLabel}</span></div>
                <div><span className="text-gray-400">Correct: </span><span className="text-green-400 font-bold">{m.correctLabel}</span></div>
              </div>
              <div className="text-gray-300 text-xs leading-relaxed bg-gray-900/50 rounded-lg px-2 py-1.5">
                {m.explanation}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Perfect play */}
      {allPerfect && (
        <div className="bg-green-950/30 border border-green-800 rounded-xl px-3 py-2">
          <div className="text-green-400 text-xs font-semibold">Perfect play this hand</div>
        </div>
      )}

    </div>
  );
}
