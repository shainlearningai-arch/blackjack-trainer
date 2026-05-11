import { handTotal, isSoft } from './blackjack';

// Complete 6-deck, S17 basic strategy
// D=Double (else Hit), Ds=Double (else Stand), P=Split, Ph=Split (else Hit),
// Pd=Split (else Double), Ps=Split (else Stand), R=Surrender (else Hit), Rs=Surrender (else Stand)

const HARD = {
  5:  { 2:'H',3:'H',4:'H',5:'H',6:'H',7:'H',8:'H',9:'H',10:'H',A:'H' },
  6:  { 2:'H',3:'H',4:'H',5:'H',6:'H',7:'H',8:'H',9:'H',10:'H',A:'H' },
  7:  { 2:'H',3:'H',4:'H',5:'H',6:'H',7:'H',8:'H',9:'H',10:'H',A:'H' },
  8:  { 2:'H',3:'H',4:'H',5:'H',6:'H',7:'H',8:'H',9:'H',10:'H',A:'H' },
  9:  { 2:'H',3:'D',4:'D',5:'D',6:'D',7:'H',8:'H',9:'H',10:'H',A:'H' },
  10: { 2:'D',3:'D',4:'D',5:'D',6:'D',7:'D',8:'D',9:'D',10:'H',A:'H' },
  11: { 2:'D',3:'D',4:'D',5:'D',6:'D',7:'D',8:'D',9:'D',10:'D',A:'H' },
  12: { 2:'H',3:'H',4:'S',5:'S',6:'S',7:'H',8:'H',9:'H',10:'H',A:'H' },
  13: { 2:'S',3:'S',4:'S',5:'S',6:'S',7:'H',8:'H',9:'H',10:'H',A:'H' },
  14: { 2:'S',3:'S',4:'S',5:'S',6:'S',7:'H',8:'H',9:'H',10:'H',A:'H' },
  15: { 2:'S',3:'S',4:'S',5:'S',6:'S',7:'H',8:'H',9:'H',10:'R',A:'H' },
  16: { 2:'S',3:'S',4:'S',5:'S',6:'S',7:'H',8:'H',9:'R',10:'R',A:'R' },
  17: { 2:'S',3:'S',4:'S',5:'S',6:'S',7:'S',8:'S',9:'S',10:'S',A:'S' },
};

const SOFT = {
  13: { 2:'H',3:'H',4:'H',5:'D',6:'D',7:'H',8:'H',9:'H',10:'H',A:'H' },
  14: { 2:'H',3:'H',4:'H',5:'D',6:'D',7:'H',8:'H',9:'H',10:'H',A:'H' },
  15: { 2:'H',3:'H',4:'D',5:'D',6:'D',7:'H',8:'H',9:'H',10:'H',A:'H' },
  16: { 2:'H',3:'H',4:'D',5:'D',6:'D',7:'H',8:'H',9:'H',10:'H',A:'H' },
  17: { 2:'H',3:'D',4:'D',5:'D',6:'D',7:'H',8:'H',9:'H',10:'H',A:'H' },
  18: { 2:'Ds',3:'Ds',4:'Ds',5:'Ds',6:'Ds',7:'S',8:'S',9:'H',10:'H',A:'H' },
  19: { 2:'S',3:'S',4:'S',5:'S',6:'Ds',7:'S',8:'S',9:'S',10:'S',A:'S' },
  20: { 2:'S',3:'S',4:'S',5:'S',6:'S',7:'S',8:'S',9:'S',10:'S',A:'S' },
};

const PAIRS = {
  A:  { 2:'P',3:'P',4:'P',5:'P',6:'P',7:'P',8:'P',9:'P',10:'P',A:'P' },
  2:  { 2:'Ph',3:'Ph',4:'P',5:'P',6:'P',7:'P',8:'H',9:'H',10:'H',A:'H' },
  3:  { 2:'Ph',3:'Ph',4:'P',5:'P',6:'P',7:'P',8:'H',9:'H',10:'H',A:'H' },
  4:  { 2:'H',3:'H',4:'H',5:'Ph',6:'Ph',7:'H',8:'H',9:'H',10:'H',A:'H' },
  5:  { 2:'D',3:'D',4:'D',5:'D',6:'D',7:'D',8:'D',9:'D',10:'H',A:'H' },
  6:  { 2:'Ph',3:'P',4:'P',5:'P',6:'P',7:'H',8:'H',9:'H',10:'H',A:'H' },
  7:  { 2:'P',3:'P',4:'P',5:'P',6:'P',7:'P',8:'H',9:'H',10:'H',A:'H' },
  8:  { 2:'P',3:'P',4:'P',5:'P',6:'P',7:'P',8:'P',9:'P',10:'P',A:'P' },
  9:  { 2:'P',3:'P',4:'P',5:'P',6:'P',7:'S',8:'P',9:'P',10:'S',A:'S' },
  10: { 2:'S',3:'S',4:'S',5:'S',6:'S',7:'S',8:'S',9:'S',10:'S',A:'S' },
};

function normDC(rank) {
  return ['J','Q','K'].includes(rank) ? '10' : rank;
}

function normPlayerRank(rank) {
  return ['J','Q','K'].includes(rank) ? '10' : rank;
}

function resolveAction(code, canDouble, canSurrender, canSplit) {
  switch (code) {
    case 'H': return 'H';
    case 'S': return 'S';
    case 'D': return canDouble ? 'D' : 'H';
    case 'Ds': return canDouble ? 'D' : 'S';
    case 'P': return canSplit ? 'P' : 'H';
    case 'Ph': return canSplit ? 'P' : 'H';
    case 'Pd': return canSplit ? 'P' : (canDouble ? 'D' : 'H');
    case 'Ps': return canSplit ? 'P' : 'S';
    case 'R': return canSurrender ? 'R' : 'H';
    case 'Rs': return canSurrender ? 'R' : 'S';
    default: return 'H';
  }
}

export function getBasicStrategyAction(playerHand, dealerUpcard, canDouble = true, canSurrender = true, canSplit = true) {
  const dc = normDC(dealerUpcard.rank);
  const visible = playerHand.filter(c => !c.faceDown);

  if (canSplit && visible.length === 2) {
    const r1 = normPlayerRank(visible[0].rank);
    const r2 = normPlayerRank(visible[1].rank);
    if (r1 === r2 && PAIRS[r1]) {
      return resolveAction(PAIRS[r1][dc], canDouble, canSurrender, canSplit);
    }
  }

  const total = handTotal(playerHand);
  const soft = isSoft(playerHand);

  if (soft && SOFT[total]) {
    return resolveAction(SOFT[total][dc], canDouble, canSurrender, canSplit);
  }

  const clampedTotal = Math.min(Math.max(total, 5), 17);
  const row = HARD[clampedTotal] || HARD[17];
  return resolveAction(row[dc], canDouble, canSurrender, canSplit);
}

export const ACTION_LABELS = { H: 'Hit', S: 'Stand', D: 'Double Down', P: 'Split', R: 'Surrender' };

export function explainAction(action, playerHand, dealerUpcard) {
  const total = handTotal(playerHand);
  const dc = normDC(dealerUpcard.rank);
  const soft = isSoft(playerHand);
  const pairCard = (() => {
    const v = playerHand.filter(c => !c.faceDown);
    if (v.length === 2 && normPlayerRank(v[0].rank) === normPlayerRank(v[1].rank)) return normPlayerRank(v[0].rank);
    return null;
  })();

  if (action === 'P') {
    if (pairCard === 'A') return 'Always split Aces. Each Ace is a powerful starting card. Starting two hands at 11 is far better than hitting soft 12.';
    if (pairCard === '8') return 'Always split 8s. Hard 16 is the worst hand in blackjack. Two hands starting at 8 give you two chances to improve.';
    if (pairCard === '9') return `Split 9s vs dealer ${dc}. Your 18 looks good but isn't great — splitting gives you two hands likely to beat a dealer showing ${dc}.`;
    return `Splitting here gives you two hands in a favorable position vs dealer ${dc}, improving your expected value over playing the pair as one hand.`;
  }
  if (action === 'D') {
    if (total === 11) return 'Hard 11 is the strongest doubling hand. You have a high probability of drawing a 10-value card for 21. Always double here unless the dealer shows an Ace.';
    if (total === 10) return `Hard 10 vs dealer ${dc} is a strong double. You're likely to hit 20, and the dealer's upcard is weak enough to justify the extra bet.`;
    if (soft) return `Soft ${total} vs dealer ${dc} is a doubling opportunity. You can't bust on one card, and your total is likely to improve substantially.`;
    return `Doubling on ${total} vs dealer ${dc} is correct. You're in a mathematically favorable position to win a larger pot.`;
  }
  if (action === 'S') {
    if (total >= 12 && total <= 16 && ['2','3','4','5','6'].includes(dc)) return `Standing hard ${total} vs dealer ${dc} is correct. The dealer is showing a weak card and must hit — they'll bust often (roughly 40% of the time with 5 or 6 up). Don't risk busting yourself.`;
    if (total >= 17) return `Hard ${total} is strong enough to stand. Hitting risks busting, and you already beat or tie most dealer outcomes.`;
    if (soft && total >= 18) return `Soft ${total} is a solid hand. Standing here locks in a good total without risking a worse outcome.`;
    return `Standing is correct here. Your hand is strong relative to dealer ${dc} — let the dealer take the risk.`;
  }
  if (action === 'H') {
    if (total <= 11) return `With ${total} you can never bust by hitting — always hit until you have at least 12.`;
    if (total === 12 && ['2','3','7','8','9','10','A'].includes(dc)) return `Hard 12 vs dealer ${dc} is a tough spot, but hitting is correct. The dealer is too strong for you to rely on their busting.`;
    if (soft) return `Soft ${total} vs dealer ${dc}: hit to try to improve. You can't bust on one card from a soft hand.`;
    return `Hitting hard ${total} vs dealer ${dc} is correct. The dealer's upcard is strong, and you need to improve your hand rather than hoping the dealer busts.`;
  }
  if (action === 'R') {
    return `Surrendering hard ${total} vs dealer ${dc} returns half your bet. Your win probability here is below 25% — surrendering is mathematically the least costly option. It's not giving up; it's smart bankroll management.`;
  }
  return '';
}

// ── Count context for mistakes ───────────────────────────────────────────────
export function countContext(playerHand, dealerUpcard, trueCount) {
  const total = handTotal(playerHand);
  const dc = normDC(dealerUpcard.rank);
  const tc = Math.round(trueCount * 10) / 10;
  const tcStr = tc > 0 ? `+${tc}` : `${tc}`;

  const deckFeel = tc >= 4  ? 'heavily 10-rich'
    : tc >= 2               ? '10-rich'
    : tc >= 1               ? 'slightly positive'
    : tc <= -3              ? 'heavily low-card rich'
    : tc <= -1              ? 'negative (low cards dominant)'
    :                         'neutral';

  let msg = `True count was ${tcStr} — ${deckFeel} shoe.`;

  // Illustrious 18 / Fab 4 deviations worth calling out
  if (total === 16 && dc === '10' && tc >= 0) {
    msg += ' Important: at TC ≥ 0, standing 16 vs 10 is the correct count play (Illustrious 18). A neutral or positive shoe means more 10s — the dealer is more likely to bust, so standing beats surrendering or hitting.';
  } else if (total === 15 && dc === '10' && tc >= 4) {
    msg += ' At TC ≥ +4 the shoe is so 10-rich that standing 15 vs 10 becomes correct — you want to avoid busting into the dealer\'s likely strong hand.';
  } else if (total === 12 && dc === '3' && tc >= 2) {
    msg += ' At TC ≥ +2, standing 12 vs 3 is the correct count deviation — a positive shoe makes the dealer more likely to bust.';
  } else if (total === 12 && dc === '2' && tc >= 3) {
    msg += ' At TC ≥ +3, standing 12 vs 2 is a valid count deviation.';
  } else if (total === 10 && dc === '10' && tc >= 4) {
    msg += ' At TC ≥ +4, doubling 10 vs 10 has positive expected value — the 10-rich shoe means you\'re likely to land a 20.';
  } else if (total === 11 && dc === 'A' && tc >= 1) {
    msg += ' At TC ≥ +1, doubling 11 vs Ace is the count-based correct play — worth knowing for the future.';
  } else if (tc >= 3) {
    msg += ' With a count this high, be more aggressive in general — the shoe is loaded with 10s and Aces that favour the player.';
  } else if (tc <= -2) {
    msg += ' With a negative count like this, play conservatively — low cards favour the dealer and your expected value is reduced.';
  } else {
    msg += ' At a neutral count, basic strategy is fully optimal — no count-based deviations apply to this situation.';
  }

  return msg;
}

// ── Insurance ────────────────────────────────────────────────────────────────
// Hi-Lo index: take insurance when true count ≥ +3
// Below that, house edge on insurance is ~−7.7% (6-deck)
const INSURANCE_TC_THRESHOLD = 3;

export function getInsuranceAdvice(trueCount) {
  return trueCount >= INSURANCE_TC_THRESHOLD;
}

export function explainInsuranceAdvice(trueCount) {
  const tc = trueCount.toFixed(1);
  if (trueCount >= INSURANCE_TC_THRESHOLD) {
    return `True count is +${tc} — the shoe is rich enough in 10-value cards that insurance has positive expected value. The Hi-Lo index play is to take insurance at true count ≥ +3.`;
  }
  if (trueCount >= 1) {
    return `True count is +${tc}. Slightly positive, but insurance only becomes profitable at +3 or above. Decline.`;
  }
  return `Basic strategy: always decline insurance. The house edge on insurance is −7.7% in a 6-deck game, and at count ${tc} the shoe is not 10-rich. Declining is correct.`;
}

export function explainInsuranceMistake(took, trueCount) {
  const shouldHave = getInsuranceAdvice(trueCount);
  const tc = trueCount.toFixed(1);
  if (took && !shouldHave) {
    return `You took insurance (true count ${tc}) but basic strategy says decline. Insurance only has positive EV at true count ≥ +3. Below that, the house takes roughly 7–8 cents per dollar you bet on it.`;
  }
  if (!took && shouldHave) {
    return `You declined insurance but the true count was +${tc} — above the +3 threshold. With a shoe this rich in 10s, insurance has positive expected value and taking it was the correct count-based play.`;
  }
  return '';
}
