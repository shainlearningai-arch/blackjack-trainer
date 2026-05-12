// Hi-Lo card counting system
// +1: 2, 3, 4, 5, 6  (low cards help dealer, bad for player)
// 0:  7, 8, 9         (neutral)
// -1: 10, J, Q, K, A  (high cards help player)

export function hiLoValue(rank) {
  if (['2', '3', '4', '5', '6'].includes(rank)) return 1;
  if (['7', '8', '9'].includes(rank)) return 0;
  return -1; // 10, J, Q, K, A
}

export function trueCount(runningCount, decksRemaining) {
  if (decksRemaining <= 0) return 0;
  return Math.round((runningCount / decksRemaining) * 10) / 10;
}

export function countLabel(tc) {
  if (tc >= 3) return { label: 'Hot', color: 'text-green-400', bg: 'bg-green-900/40' };
  if (tc >= 1) return { label: 'Warm', color: 'text-yellow-400', bg: 'bg-yellow-900/40' };
  if (tc >= -1) return { label: 'Neutral', color: 'text-gray-300', bg: 'bg-gray-800/40' };
  if (tc >= -3) return { label: 'Cool', color: 'text-blue-400', bg: 'bg-blue-900/40' };
  return { label: 'Cold', color: 'text-red-400', bg: 'bg-red-900/40' };
}

export function bettingAdvice(tc) {
  if (tc >= 4) return { multiplier: 4, label: 'Bet 4× — deck is very player-favorable' };
  if (tc >= 3) return { multiplier: 3, label: 'Bet 3× — strong player edge' };
  if (tc >= 2) return { multiplier: 2, label: 'Bet 2× — slight player edge' };
  if (tc >= 1) return { multiplier: 1.5, label: 'Bet 1.5× — marginally favorable' };
  return { multiplier: 1, label: 'Bet minimum — deck is neutral or negative' };
}

// Player edge estimate: base house edge ~0.5%, each TC point = ~0.5% swing.
// Breakeven at TC +1; positive edge above that.
export function playerEdge(tc) {
  return Math.round((tc - 1) * 0.5 * 10) / 10;
}

// Cards seen since shoe start (for display/quiz)
export function cardCountingHint(rank) {
  const v = hiLoValue(rank);
  if (v === 1) return { value: '+1', explanation: `${rank} is a low card (+1). Low cards favor the dealer, so a rising count means fewer low cards remain — good for you.` };
  if (v === 0) return { value: '0', explanation: `${rank} is a neutral card (0). It doesn't shift the count.` };
  return { value: '-1', explanation: `${rank} is a high card (-1). High cards favor the player; as they're dealt, the count drops.` };
}
