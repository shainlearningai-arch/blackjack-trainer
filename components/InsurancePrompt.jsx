'use client';
import { getInsuranceAdvice, explainInsuranceAdvice } from '@/lib/basicStrategy';

function KbdBadge({ k }) {
  return (
    <span className="absolute top-1.5 right-1.5 font-mono font-bold leading-none px-1 py-px rounded"
      style={{ fontSize: '9px', background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }}>
      {k}
    </span>
  );
}

export default function InsurancePrompt({ bet, trueCount, onDecision, playerHasBJ }) {
  const insuranceBet = Math.floor(bet / 2);
  const shouldTake = getInsuranceAdvice(trueCount);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-orange-950/60 border border-orange-700">
        <div>
          <div className="text-orange-300 font-bold text-sm">Dealer shows Ace</div>
          <div className="text-orange-400/70 text-xs">
            {playerHasBJ ? 'Even money or risk a push?' : `Insurance costs $${insuranceBet}`}
          </div>
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-lg ${shouldTake ? 'bg-green-900/60 text-green-300 border border-green-700' : 'bg-gray-700/60 text-gray-400 border border-gray-600'}`}>
          {shouldTake ? '✓ Take' : '✗ Decline'}
        </span>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500 px-1">
        <span>True count:
          <span className={`font-bold ml-1 ${trueCount >= 3 ? 'text-green-400' : trueCount > 0 ? 'text-yellow-400' : 'text-gray-400'}`}>
            {trueCount > 0 ? '+' : ''}{trueCount.toFixed(1)}
          </span>
        </span>
        <span className="text-gray-600">·</span>
        <span>Take at <span className="text-gray-400">+3.0</span></span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onDecision(true)}
          className="relative py-2.5 px-2 rounded-xl border border-green-700 bg-green-900/40 hover:bg-green-800/60 active:scale-95 transition-all text-center"
        >
          <KbdBadge k="Y" />
          <div className="text-white font-bold text-sm">{playerHasBJ ? 'Even Money' : 'Take Insurance'}</div>
          <div className="text-green-400 text-xs font-semibold">${insuranceBet}</div>
        </button>
        <button
          onClick={() => onDecision(false)}
          className="relative py-2.5 px-2 rounded-xl border border-gray-600 bg-gray-800/60 hover:bg-gray-700/60 active:scale-95 transition-all text-center"
        >
          <KbdBadge k="N" />
          <div className="text-white font-bold text-sm">Decline</div>
          <div className="text-gray-400 text-xs">no side bet</div>
        </button>
      </div>
    </div>
  );
}
