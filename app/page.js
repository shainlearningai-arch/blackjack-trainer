'use client';
import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useBlackjack } from '@/lib/useBlackjack';
import { decksRemaining } from '@/lib/blackjack';
import Hand from '@/components/Hand';
import ActionButtons from '@/components/ActionButtons';
import Chip from '@/components/Chip';
import CountDisplay from '@/components/CountDisplay';
import FeedbackPanel from '@/components/FeedbackPanel';
import BasicStrategyChart from '@/components/BasicStrategyChart';
import InsurancePrompt from '@/components/InsurancePrompt';

function decompose(amount) {
  const denoms = [100, 50, 25, 10, 5];
  const chips = [];
  let rem = amount;
  for (const d of denoms) {
    while (rem >= d && chips.length < 6) {
      chips.push(d);
      rem -= d;
    }
  }
  return chips.length ? chips : [5];
}

// ── Chip row (left-to-right fold) ────────────────────────────────
function ChipRow({ chips, size = 40, entryClass = '', winClass = '', stagger = 75, baseDelay = 0 }) {
  const OVERLAP = Math.round(size * 0.28);
  const step = size - OVERLAP;
  const totalWidth = chips.length > 0 ? size + (chips.length - 1) * step : size;
  return (
    <div className="relative" style={{ width: totalWidth, height: size }}>
      {chips.map((val, i) => (
        <div
          key={i}
          className={`absolute ${entryClass}`}
          style={{ left: i * step, top: 0, zIndex: i, animationDelay: `${baseDelay + i * stagger}ms` }}
        >
          <Chip
            value={val}
            size={size}
            className={winClass}
            style={{ animationDelay: `${baseDelay + i * stagger}ms` }}
          />
        </div>
      ))}
    </div>
  );
}

function BetChips({ bet, result, chipPhase, betKey }) {
  const betChips = useMemo(() => decompose(bet), [bet]);
  const doubled     = chipPhase === 'doubled';
  const surrendered = chipPhase === 'surrendered';
  const isWin  = result === 'win' || result === 'blackjack';
  const isLose = result === 'lose' || result === 'bust';

  const payoutAmt = result === 'blackjack' ? Math.floor(bet * 1.5)
    : result === 'win' ? (doubled ? bet * 2 : bet) : 0;
  const payoutChips = useMemo(() => payoutAmt > 0 ? decompose(payoutAmt) : [], [payoutAmt]);

  return (
    <div className="flex flex-col items-center gap-1.5">
      {/* Bet stack — folds in on deal, shines on win, slides left on lose */}
      <div style={{ opacity: surrendered ? 0.28 : 1, transition: 'opacity 0.6s' }}>
        <ChipRow
          key={betKey}
          chips={doubled ? [...betChips, ...betChips] : betChips}
          size={40}
          entryClass={isLose ? 'chip-to-dealer' : 'chip-fold-in'}
          winClass={isWin ? 'chip-win-shine' : ''}
        />
      </div>

      {/* Payout chips sliding in from dealer */}
      {payoutChips.length > 0 && (
        <ChipRow
          chips={payoutChips}
          size={40}
          entryClass="chip-from-dealer"
          stagger={110}
          baseDelay={320}
        />
      )}

      <span className={`text-xs font-black tabular-nums ${
        surrendered ? 'text-gray-500' : isWin ? 'text-yellow-300' : isLose ? 'text-red-400/60' : 'text-yellow-400'
      }`}>
        {surrendered ? `$${bet} (½ back)` : isWin ? `+$${payoutAmt}` : isLose ? `-$${bet}` : `$${doubled ? bet * 2 : bet}`}
      </span>
    </div>
  );
}

// ── Blackjack celebration ─────────────────────────────────────────
function BlackjackCelebration({ bet }) {
  const particles = useMemo(() => {
    const count = 32;
    return Array.from({ length: count }, (_, i) => {
      const angle = ((360 / count) * i) * (Math.PI / 180);
      const tier  = i % 3;
      const dist  = [55, 95, 145][tier];
      const chars = ['★', '✦', '◆', '✸'];
      const colors = ['#fde047', '#fbbf24', '#f59e0b', '#fffbeb'];
      return { tx: Math.cos(angle) * dist, ty: Math.sin(angle) * dist, delay: tier * 90, size: [16, 13, 10][tier], color: colors[i % 4], char: chars[i % 4] };
    });
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none rounded-3xl overflow-hidden">
      <div className="absolute inset-0 bj-overlay-pulse" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(253,224,71,0.42) 0%, rgba(234,179,8,0.14) 52%, transparent 72%)' }} />
      {particles.map((p, i) => (
        <span key={i} className="bj-sparkle" style={{ top: '50%', left: '50%', '--tx': `${p.tx}px`, '--ty': `${p.ty}px`, animationDelay: `${p.delay}ms`, fontSize: `${p.size}px`, color: p.color, textShadow: `0 0 10px ${p.color}` }}>
          {p.char}
        </span>
      ))}
      <div className="text-center bj-text-slam">
        <div style={{ fontSize: 'clamp(48px, 7vw, 80px)', fontWeight: 900, background: 'linear-gradient(138deg, #fffbeb 0%, #fde047 18%, #f59e0b 48%, #fde047 76%, #fffbeb 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '-0.025em', lineHeight: 1, filter: 'drop-shadow(0 3px 28px rgba(251,191,36,0.95))' }}>
          BLACKJACK!
        </div>
        <div className="bj-payout-bounce font-black" style={{ fontSize: '22px', color: '#fde047', textShadow: '0 0 14px rgba(253,224,71,0.8)', marginTop: '8px' }}>
          +${Math.floor(bet * 1.5)}&nbsp;&nbsp;·&nbsp;&nbsp;3:2
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
export default function BlackjackTrainer() {
  const {
    shoe, runningCount, trueCount,
    phase, playerHands, activeHandIndex, dealerHand,
    bet, bankroll, result, lastMistakes, lastCardCountHints,
    stats, canDouble, canSurrender, canSplit,
    playerHadBlackjack, insuranceTook, insuranceResult, insuranceMistake,
    setBet, deal, playerAction, dealerPlay, reset, insuranceAction, revealHole,
  } = useBlackjack();

  const [betKey,    setBetKey]    = useState(0);
  const [chipPhase, setChipPhase] = useState('idle');
  const [flashKey,  setFlashKey]  = useState(null);
  const [betInput,  setBetInput]  = useState('10');

  const prevBet = useRef(bet);
  useEffect(() => {
    if (bet !== prevBet.current) {
      setBetInput(String(bet));
      prevBet.current = bet;
    }
  }, [bet]);

  useEffect(() => {
    setChipPhase('idle');
    setBetKey(k => k + 1);
  }, [stats.hands]);

  useEffect(() => {
    if (phase === 'over' && result && result !== 'push' && result !== 'surrender') {
      setFlashKey(`${stats.hands}-${result}`);
    }
  }, [phase, result, stats.hands]);

  const dealerVisibleCount = dealerHand.filter(c => !c.faceDown).length;
  useEffect(() => {
    if (phase === 'dealer') {
      const t = setTimeout(dealerPlay, 700);
      return () => clearTimeout(t);
    }
  }, [phase, dealerPlay, dealerVisibleCount]);

  // Auto-flip dealer hole card when game ends with it still face-down (dealer blackjack)
  const dealerHasHidden = dealerHand.some(c => c.faceDown);
  useEffect(() => {
    if (phase === 'over' && dealerHasHidden) {
      const t = setTimeout(revealHole, 1600);
      return () => clearTimeout(t);
    }
  }, [phase, dealerHasHidden, revealHole]);

  const MAX_BET = 500;
  const MIN_BET = 5;

  const handleSetBet = useCallback((amount) => {
    const clamped = Math.max(MIN_BET, Math.min(MAX_BET, Math.min(bankroll, amount)));
    setBet(clamped);
    setBetInput(String(clamped));
    setBetKey(k => k + 1);
  }, [setBet, bankroll]);

  const handleBetInput = (raw) => {
    setBetInput(raw);
    const val = parseInt(raw, 10);
    if (!isNaN(val) && val >= MIN_BET && val <= Math.min(MAX_BET, bankroll)) {
      setBet(val);
      setBetKey(k => k + 1);
    }
  };

  const handlePlayerAction = useCallback((move) => {
    if (move === 'D') setChipPhase('doubled');
    else if (move === 'R') setChipPhase('surrendered');
    playerAction(move);
  }, [playerAction]);

  // ── Keyboard shortcuts ───────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT') return;
      const k = e.key.toLowerCase();

      if (phase === 'player') {
        if (k === 'h') { e.preventDefault(); handlePlayerAction('H'); }
        if (k === 's') { e.preventDefault(); handlePlayerAction('S'); }
        if (k === 'd' && canDouble)    { e.preventDefault(); handlePlayerAction('D'); }
        if (k === 'p' && canSplit)     { e.preventDefault(); handlePlayerAction('P'); }
        if (k === 'r' && canSurrender) { e.preventDefault(); handlePlayerAction('R'); }
      }
      if ((phase === 'betting' || phase === 'over') && (k === ' ' || k === 'enter') && bankroll >= bet) {
        e.preventDefault();
        deal();
      }
      if (phase === 'insurance') {
        if (k === 'y') { e.preventDefault(); insuranceAction(true); }
        if (k === 'n') { e.preventDefault(); insuranceAction(false); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, canDouble, canSplit, canSurrender, handlePlayerAction, deal, insuranceAction, bankroll, bet]);

  const decksLeft      = decksRemaining(shoe);
  const cardsDealt     = dealerHand.length > 0;
  const playerHasCards = playerHands.some(h => h.length > 0);
  const isBJ = phase === 'over' && result === 'blackjack';

  return (
    <div className="h-screen overflow-hidden bg-gray-950 text-white">
      <div className="h-full max-w-6xl mx-auto p-3 flex flex-col lg:flex-row gap-3">

        {/* ── Left: Table ── */}
        <div className="flex-1 flex flex-col gap-2 min-h-0">

          {/* Topbar */}
          <div className="flex-none flex items-center justify-between px-4 py-2 rounded-xl bg-gray-900 border border-gray-800">
            <span className="font-bold tracking-tight text-sm">Blackjack Trainer</span>
            <div className="flex items-center gap-4 text-xs">
              <div>
                <span className="text-gray-500">Bankroll </span>
                <span className={`font-bold tabular-nums ${bankroll < 100 ? 'text-red-400' : 'text-emerald-400'}`}>${bankroll}</span>
              </div>
              <div>
                <span className="text-gray-500">Shoe </span>
                <span className="text-gray-300 font-semibold">{decksLeft.toFixed(1)}d</span>
              </div>
              <div>
                <span className="text-gray-500">Hands </span>
                <span className="text-gray-300 font-semibold">{stats.hands}</span>
              </div>
            </div>
          </div>

          {/* Table felt */}
          <div
            className="flex-1 min-h-0 relative rounded-3xl overflow-hidden border-2 border-green-900 shadow-2xl flex flex-col"
            style={{ background: 'radial-gradient(ellipse at 50% 30%, #14532d 0%, #052e16 100%)' }}
          >
            {/* Flash overlay */}
            {flashKey && (
              <div
                key={flashKey}
                className={`absolute inset-0 pointer-events-none z-20 ${result === 'blackjack' ? 'flash-bj' : result === 'win' ? 'flash-win' : 'flash-lose'}`}
                style={{
                  background:
                    result === 'blackjack'
                      ? 'radial-gradient(ellipse at 50% 50%, rgba(253,224,71,0.58) 0%, rgba(234,179,8,0.2) 55%, transparent 75%)'
                      : result === 'win'
                        ? 'radial-gradient(ellipse at 50% 50%, rgba(74,222,128,0.48) 0%, rgba(34,197,94,0.15) 55%, transparent 75%)'
                        : 'radial-gradient(ellipse at 50% 50%, rgba(239,68,68,0.48) 0%, rgba(185,28,28,0.15) 55%, transparent 75%)',
                }}
              />
            )}

            {isBJ && <BlackjackCelebration bet={bet} />}

            {/* Dealer zone */}
            <div className="flex-1 flex flex-col items-center justify-center py-3 px-4 border-b border-green-900/60">
              <div className="text-green-600 text-xs font-semibold uppercase tracking-widest mb-2">Dealer</div>
              {cardsDealt ? (
                <Hand hand={dealerHand} />
              ) : (
                <div className="flex gap-2 opacity-20">
                  {[0,1].map(i => <div key={i} className="rounded-xl border-2 border-green-700 bg-green-900/40" style={{ width:84, height:126 }} />)}
                </div>
              )}
              {phase === 'over' && result && !isBJ && (
                <FeltResult result={result} bet={bet} />
              )}
            </div>

            {/* Player zone */}
            <div className="flex-1 flex flex-col items-center justify-center py-3 px-4">
              <div className="text-green-600 text-xs font-semibold uppercase tracking-widest mb-2">You</div>
              {playerHasCards ? (
                <div className="flex flex-wrap gap-6 justify-center">
                  {playerHands.map((hand, i) => (
                    <Hand
                      key={i}
                      hand={hand}
                      active={i === activeHandIndex && phase === 'player'}
                      label={playerHands.length > 1 ? `Hand ${i + 1}` : undefined}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex gap-2 opacity-20">
                  {[0,1].map(i => <div key={i} className="rounded-xl border-2 border-green-700 bg-green-900/40" style={{ width:84, height:126 }} />)}
                </div>
              )}
              {bet > 0 && (
                <div className="mt-3">
                  <BetChips bet={bet} result={result} chipPhase={chipPhase} betKey={betKey} />
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex-none rounded-xl bg-gray-900 border border-gray-800 px-4 py-2.5">

            {/* Deal button */}
            {(phase === 'betting' || phase === 'over') && (
              <div className="space-y-2">
                <button
                  onClick={deal}
                  disabled={bankroll < bet}
                  className="relative w-full py-2.5 bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-black font-black rounded-xl text-lg transition-all shadow-lg shadow-yellow-900/30 disabled:opacity-40 disabled:cursor-not-allowed tracking-tight"
                >
                  {phase === 'over' ? '▶  Next Hand' : `▶  Deal  ·  $${bet}`}
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-black/15 border border-black/20 text-black/60">
                    Space
                  </span>
                </button>
                {bankroll <= 0 && (
                  <button onClick={reset} className="w-full py-2 bg-red-800 hover:bg-red-700 text-white rounded-xl font-bold text-sm border border-red-700">
                    Bust out — reset bankroll
                  </button>
                )}
              </div>
            )}

            {/* Player action */}
            {phase === 'player' && (
              <div className="space-y-2">
                {playerHands.length > 1 && (
                  <div className="text-center text-purple-400 font-semibold text-xs">
                    Hand {activeHandIndex + 1} of {playerHands.length}
                  </div>
                )}
                <ActionButtons
                  onAction={handlePlayerAction}
                  canDouble={canDouble}
                  canSurrender={canSurrender}
                  canSplit={canSplit}
                  disabled={false}
                />
                {canSurrender && (
                  <p className="text-center text-blue-400/60 text-xs">Late surrender available</p>
                )}
              </div>
            )}

            {/* Insurance */}
            {phase === 'insurance' && (
              <InsurancePrompt
                bet={bet}
                trueCount={trueCount}
                onDecision={insuranceAction}
                playerHasBJ={playerHadBlackjack}
              />
            )}

            {phase === 'dealer' && (
              <div className="flex items-center justify-center gap-2 py-1.5 text-gray-400">
                <span className="animate-pulse text-sm font-medium tracking-wide">Dealer playing…</span>
              </div>
            )}
          </div>
        </div>

        {/* ── Right: Info panels ── */}
        <div className="w-full lg:w-72 flex flex-col gap-2 min-h-0 overflow-y-auto">

          {/* Bet input */}
          <div className="flex-none bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-300 font-bold text-sm">Your Bet</span>
              <span className="text-gray-600 text-xs">
                Min <span className="text-yellow-600 font-semibold">$5</span>
                {' · '}
                Max <span className="text-yellow-600 font-semibold">$500</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSetBet(bet - 5)}
                disabled={bet <= MIN_BET || phase !== 'betting' && phase !== 'over'}
                className="w-9 h-10 rounded-lg bg-gray-800 border border-gray-700 text-white font-bold text-lg hover:bg-gray-700 active:scale-90 transition-all disabled:opacity-25 disabled:cursor-not-allowed flex-shrink-0"
              >−</button>
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xl select-none">$</span>
                <input
                  type="number"
                  value={betInput}
                  onChange={e => handleBetInput(e.target.value)}
                  onBlur={() => setBetInput(String(bet))}
                  min={MIN_BET}
                  max={Math.min(MAX_BET, bankroll)}
                  disabled={phase !== 'betting' && phase !== 'over'}
                  className="w-full h-10 pl-9 pr-3 rounded-lg bg-gray-800 border border-gray-600 text-white font-black text-xl text-right focus:outline-none focus:border-yellow-500 tabular-nums disabled:opacity-40"
                />
              </div>
              <button
                onClick={() => handleSetBet(bet + 5)}
                disabled={bet >= Math.min(MAX_BET, bankroll) || phase !== 'betting' && phase !== 'over'}
                className="w-9 h-10 rounded-lg bg-gray-800 border border-gray-700 text-white font-bold text-lg hover:bg-gray-700 active:scale-90 transition-all disabled:opacity-25 disabled:cursor-not-allowed flex-shrink-0"
              >+</button>
            </div>
          </div>

          <FeedbackPanel
            result={result}
            lastMistakes={lastMistakes}
            insuranceMistake={insuranceMistake}
            insuranceTook={insuranceTook}
            insuranceResult={insuranceResult}
            stats={stats}
          />
          <CountDisplay
            runningCount={runningCount}
            trueCount={trueCount}
            lastCardCountHints={lastCardCountHints}
            decksLeft={decksLeft}
          />
          <BasicStrategyChart />
        </div>

      </div>
    </div>
  );
}

// ── Result on the felt (near dealer hand) ────────────────────────
const FELT_META = {
  win:       { label: 'You Win!',    cls: 'text-emerald-200 bg-emerald-950/90 border-emerald-400', payout: b => `+$${b}` },
  push:      { label: 'Push',        cls: 'text-gray-200   bg-gray-800/90    border-gray-500',     payout: null },
  lose:      { label: 'Dealer Wins', cls: 'text-red-200    bg-red-950/90     border-red-500',      payout: b => `-$${b}` },
  bust:      { label: 'Bust!',       cls: 'text-red-200    bg-red-950/90     border-red-500',      payout: b => `-$${b}` },
  surrender: { label: 'Surrendered', cls: 'text-blue-200   bg-blue-950/90    border-blue-500',     payout: b => `+$${Math.floor(b/2)} back` },
};

function FeltResult({ result, bet }) {
  const m = FELT_META[result];
  if (!m) return null;
  return (
    <div className={`mt-3 flex items-center gap-2.5 px-5 py-2 rounded-2xl border-2 font-black text-xl win-amount-in ${m.cls}`}
      style={{ backdropFilter: 'blur(4px)' }}>
      <span>{m.label}</span>
      {m.payout && <span className="opacity-75 text-lg">{m.payout(bet)}</span>}
    </div>
  );
}

// ── Result banner ─────────────────────────────────────────────────
const RESULT_META = {
  win:       { emoji: '🏆', label: 'You Win!',    cls: 'text-emerald-300 bg-emerald-950/70 border-emerald-600', payout: b => `+$${b}` },
  blackjack: { emoji: '⚡', label: 'Blackjack!',  cls: 'text-yellow-200 bg-yellow-950/70 border-yellow-500',   payout: b => `+$${Math.floor(b*1.5)}` },
  push:      { emoji: '🤝', label: 'Push',         cls: 'text-gray-200  bg-gray-800/70   border-gray-500',      payout: null },
  lose:      { emoji: '💸', label: 'Dealer Wins',  cls: 'text-red-300   bg-red-950/70    border-red-700',       payout: b => `-$${b}` },
  bust:      { emoji: '💥', label: 'Bust!',        cls: 'text-red-300   bg-red-950/70    border-red-700',       payout: b => `-$${b}` },
  surrender: { emoji: '🏳️', label: 'Surrendered',  cls: 'text-blue-200  bg-blue-950/70   border-blue-600',      payout: b => `+$${Math.floor(b/2)} back` },
};

function ResultBanner({ result, bet }) {
  const meta = RESULT_META[result];
  if (!meta) return null;
  const amountStr = meta.payout ? meta.payout(bet) : null;
  const amountColor =
    result === 'win' || result === 'blackjack' ? 'text-yellow-300' :
    result === 'surrender'                      ? 'text-blue-300'   : 'text-red-300';
  return (
    <div className={`flex items-center justify-between px-4 py-2 rounded-xl border-2 ${meta.cls}`}>
      <div className="flex items-center gap-2">
        <span className="text-xl">{meta.emoji}</span>
        <span className="text-base font-black">{meta.label}</span>
      </div>
      {amountStr && (
        <span className={`text-xl font-black tabular-nums win-amount-in ${amountColor}`}>{amountStr}</span>
      )}
    </div>
  );
}
