export const SUITS = ['♠', '♥', '♦', '♣'];
export const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

let _nextCardId = 0;

export function buildShoe(numDecks = 6) {
  const shoe = [];
  for (let d = 0; d < numDecks; d++) {
    for (const suit of SUITS) {
      for (const rank of RANKS) {
        shoe.push({ rank, suit, faceDown: false, id: _nextCardId++ });
      }
    }
  }
  return shuffle(shoe);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function cardValue(rank) {
  if (['J', 'Q', 'K'].includes(rank)) return 10;
  if (rank === 'A') return 11;
  return parseInt(rank, 10);
}

export function handTotal(hand) {
  let total = 0;
  let aces = 0;
  for (const card of hand) {
    if (card.faceDown) continue;
    const v = cardValue(card.rank);
    total += v;
    if (card.rank === 'A') aces++;
  }
  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }
  return total;
}

export function isSoft(hand) {
  let total = 0;
  let aces = 0;
  for (const card of hand) {
    if (card.faceDown) continue;
    total += cardValue(card.rank);
    if (card.rank === 'A') aces++;
  }
  // Soft if we can count an ace as 11 without busting
  return aces > 0 && total <= 21 && total - 10 <= 11;
}

export function isPair(hand) {
  const visible = hand.filter(c => !c.faceDown);
  if (visible.length !== 2) return false;
  const normalize = r => (['J', 'Q', 'K', '10'].includes(r) ? '10' : r);
  return normalize(visible[0].rank) === normalize(visible[1].rank);
}

export function isBust(hand) {
  return handTotal(hand) > 21;
}

export function isBlackjack(hand) {
  if (hand.length !== 2) return false;
  const total = handTotal(hand);
  return total === 21;
}

export function dealerShouldHit(hand) {
  const total = handTotal(hand);
  if (total < 17) return true;
  // Dealer hits soft 17
  if (total === 17 && isSoft(hand)) return true;
  return false;
}

export function decksRemaining(shoe) {
  return shoe.length / 52;
}
