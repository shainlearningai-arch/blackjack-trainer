'use client';
import { useState } from 'react';
import { countLabel, bettingAdvice, cardCountingHint } from '@/lib/cardCounting';

export default function CountDisplay({ runningCount, trueCount, lastCardCountHints = [], decksLeft }) {
  const [showCounts, setShowCounts] = useState(false);
  const { label, color, bg } = countLabel(trueCount);
  const advice = bettingAdvice(trueCount);

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-3 space-y-2.5">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-bold text-sm uppercase tracking-wider">Card Counting — Hi-Lo</h3>
        <button
          onClick={() => setShowCounts(v => !v)}
          className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
            showCounts
              ? 'bg-emerald-900 border-emerald-600 text-emerald-300 hover:bg-emerald-800'
              : 'bg-gray-800 border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
          }`}
          title={showCounts ? 'Hide counts (practice mode)' : 'Reveal counts'}
        >
          {showCounts ? 'Hide' : 'Show'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gray-800 rounded-lg p-2 text-center">
          <div className="text-gray-400 text-xs mb-1">Running Count</div>
          {showCounts ? (
            <div className={`text-2xl font-bold ${runningCount > 0 ? 'text-green-400' : runningCount < 0 ? 'text-red-400' : 'text-gray-300'}`}>
              {runningCount > 0 ? '+' : ''}{runningCount}
            </div>
          ) : (
            <div className="text-2xl font-bold text-gray-600 tracking-widest">—</div>
          )}
        </div>
        <div className="bg-gray-800 rounded-lg p-2 text-center">
          <div className="text-gray-400 text-xs mb-1">True Count</div>
          {showCounts ? (
            <div className={`text-2xl font-bold ${trueCount > 0 ? 'text-green-400' : trueCount < 0 ? 'text-red-400' : 'text-gray-300'}`}>
              {trueCount > 0 ? '+' : ''}{trueCount}
            </div>
          ) : (
            <div className="text-2xl font-bold text-gray-600 tracking-widest">—</div>
          )}
        </div>
        <div className={`${bg} rounded-lg p-3 text-center border border-gray-700`}>
          <div className="text-gray-400 text-xs mb-1">Deck Temp</div>
          <div className={`text-lg font-bold ${showCounts ? color : 'text-gray-600'}`}>
            {showCounts ? label : '—'}
          </div>
        </div>
      </div>

      {showCounts && (
        <div className="bg-gray-800 rounded-lg px-2.5 py-1.5 text-xs text-gray-300">
          <span className="text-yellow-300 font-semibold">Bet advice:</span> {advice.label}
        </div>
      )}

      {lastCardCountHints.length > 0 && (
        <div>
          <div className="text-gray-400 text-xs mb-2">Cards dealt this hand:</div>
          <div className="flex flex-wrap gap-2">
            {lastCardCountHints.map((card, i) => {
              const hint = cardCountingHint(card.rank);
              const valColor = hint.value === '+1' ? 'text-green-400' : hint.value === '-1' ? 'text-red-400' : 'text-gray-400';
              return (
                <div key={i} className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs flex items-center gap-1">
                  <span className="text-white font-bold">{card.rank}{card.suit}</span>
                  {showCounts && <span className={`font-bold ${valColor}`}>{hint.value}</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="text-xs text-gray-500 border-t border-gray-700 pt-2 space-y-1">
        <div className="font-semibold text-gray-400">Hi-Lo cheat sheet:</div>
        <div className="flex gap-4">
          <span><span className="text-green-400 font-bold">+1</span> → 2 3 4 5 6</span>
          <span><span className="text-gray-400">0</span> → 7 8 9</span>
          <span><span className="text-red-400 font-bold">-1</span> → 10 J Q K A</span>
        </div>
        <div className="text-gray-500">True Count = Running Count ÷ Decks remaining ({decksLeft?.toFixed(1)} left)</div>
      </div>
    </div>
  );
}
