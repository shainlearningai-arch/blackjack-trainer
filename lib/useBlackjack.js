'use client';
import { useReducer, useCallback } from 'react';
import { buildShoe, handTotal, isBust, isBlackjack, dealerShouldHit, decksRemaining } from './blackjack';
import { getBasicStrategyAction, ACTION_LABELS, explainAction, getInsuranceAdvice, explainInsuranceMistake } from './basicStrategy';
import { hiLoValue, trueCount } from './cardCounting';

const NUM_DECKS = 6;
const RESHUFFLE_THRESHOLD = 52;

function initialState() {
  return {
    shoe: buildShoe(NUM_DECKS),
    runningCount: 0,
    // phases: betting | insurance | player | dealer | over
    phase: 'betting',
    playerHands: [[]],
    activeHandIndex: 0,
    dealerHand: [],
    bet: 10,
    bankroll: 1000,
    lastMistakes: [],
    lastCardCountHints: [],
    result: null,
    stats: { hands: 0, correct: 0, mistakes: 0 },
    canDouble: false,
    canSurrender: false,
    canSplit: false,
    splitFromAces: false,
    // insurance state
    playerHadBlackjack: false,
    insuranceTook: false,
    insuranceResult: null,   // 'win' | 'lose' | null
    insuranceMistake: null,  // { took, shouldHave, explanation } | null
  };
}

function normRank(r) {
  return ['J', 'Q', 'K'].includes(r) ? '10' : r;
}

function reducer(state, action) {
  switch (action.type) {

    case 'SET_BET': {
      const bet = Math.max(5, Math.min(500, Math.min(action.bet, state.bankroll)));
      return { ...state, bet };
    }

    case 'DEAL': {
      let shoe = state.shoe.length < RESHUFFLE_THRESHOLD ? buildShoe(NUM_DECKS) : [...state.shoe];
      let rc = state.shoe.length < RESHUFFLE_THRESHOLD ? 0 : state.runningCount;
      const hints = [];

      const dealOne = (faceDown = false) => {
        const card = { ...shoe[0], faceDown };
        shoe = shoe.slice(1);
        if (!faceDown) {
          rc += hiLoValue(card.rank);
          hints.push(card);
        }
        return card;
      };

      const p1 = dealOne();
      const d1 = dealOne();
      const p2 = dealOne();
      const d2 = dealOne(true); // hole card

      const playerHand = [p1, p2];
      const dealerHand = [d1, d2];
      const playerBJ = isBlackjack(playerHand);
      const bankroll = state.bankroll - state.bet;

      // Dealer shows Ace → insurance phase before any BJ resolution
      if (d1.rank === 'A') {
        return {
          ...state,
          shoe, runningCount: rc,
          phase: 'insurance',
          playerHands: [playerHand],
          activeHandIndex: 0,
          dealerHand,
          bankroll,
          result: null,
          lastMistakes: [],
          lastCardCountHints: hints,
          canDouble: false,
          canSurrender: false,
          canSplit: false,
          splitFromAces: false,
          playerHadBlackjack: playerBJ,
          insuranceTook: false,
          insuranceResult: null,
          insuranceMistake: null,
          stats: { ...state.stats, hands: state.stats.hands + 1 },
        };
      }

      // Non-Ace upcard: resolve BJ immediately
      const dealerBJ = isBlackjack([d1, { ...d2, faceDown: false }]);
      let phase = 'player';
      let result = null;
      let bk = bankroll;

      if (playerBJ && dealerBJ) { phase = 'over'; result = 'push'; bk += state.bet; }
      else if (playerBJ)        { phase = 'over'; result = 'blackjack'; bk += Math.floor(state.bet * 2.5); }
      else if (dealerBJ)        { phase = 'over'; result = 'lose'; }

      const canDouble   = phase === 'player' && bk >= state.bet;
      const canSurrender = phase === 'player';
      const canSplit    = phase === 'player' && normRank(p1.rank) === normRank(p2.rank) && bk >= state.bet;

      return {
        ...state,
        shoe, runningCount: rc,
        phase,
        playerHands: [playerHand],
        activeHandIndex: 0,
        dealerHand,
        bankroll: bk,
        result,
        lastMistakes: [],
        lastCardCountHints: hints,
        canDouble, canSurrender, canSplit,
        splitFromAces: false,
        playerHadBlackjack: false,
        insuranceTook: false,
        insuranceResult: null,
        insuranceMistake: null,
        stats: { ...state.stats, hands: state.stats.hands + 1 },
      };
    }

    case 'INSURANCE_ACTION': {
      const { take } = action;
      const insuranceBet = Math.floor(state.bet / 2);

      // Peek at hole card (not counted yet — we only count when revealed)
      const holeCardVisible = { ...state.dealerHand[1], faceDown: false };
      const dealerHasBJ = isBlackjack([state.dealerHand[0], holeCardVisible]);

      // Compute strategy advice at this moment
      const tc = trueCount(state.runningCount, decksRemaining(state.shoe));
      const shouldTake = getInsuranceAdvice(tc);
      const mistakeExplanation = explainInsuranceMistake(take, tc);
      const insuranceMistake = take !== shouldTake
        ? { took: take, shouldHave: shouldTake, explanation: mistakeExplanation }
        : null;

      let bankroll = state.bankroll;
      if (take) bankroll -= insuranceBet;

      // ── Dealer has blackjack ──────────────────────────────────────────────
      if (dealerHasBJ) {
        // Reveal hand and count hole card now
        const rc = state.runningCount + hiLoValue(holeCardVisible.rank);
        const revealedHand = state.dealerHand.map(c => ({ ...c, faceDown: false }));

        if (take) bankroll += insuranceBet * 3; // 2:1 payout on insurance

        let result;
        if (state.playerHadBlackjack) {
          bankroll += state.bet; // push on main hand
          result = 'push';
        } else {
          result = 'lose'; // main bet already deducted at deal time
        }

        return {
          ...state,
          runningCount: rc,
          dealerHand: revealedHand,
          bankroll,
          phase: 'over',
          result,
          insuranceTook: take,
          insuranceResult: take ? 'win' : null,
          insuranceMistake,
        };
      }

      // ── Dealer does NOT have blackjack ────────────────────────────────────
      const insuranceResult = take ? 'lose' : null;
      // Hole card stays hidden — we'll count it when DEALER_PLAY reveals it

      // Player had blackjack and dealer doesn't → player wins 3:2, game over
      if (state.playerHadBlackjack) {
        const rc = state.runningCount + hiLoValue(holeCardVisible.rank);
        const revealedHand = state.dealerHand.map(c => ({ ...c, faceDown: false }));
        bankroll += Math.floor(state.bet * 2.5);
        return {
          ...state,
          runningCount: rc,
          dealerHand: revealedHand,
          bankroll,
          phase: 'over',
          result: 'blackjack',
          insuranceTook: take,
          insuranceResult,
          insuranceMistake,
        };
      }

      // Normal play continues
      const playerHand = state.playerHands[0];
      const [pc1, pc2] = playerHand;
      const canDouble   = bankroll >= state.bet;
      const canSplit    = normRank(pc1.rank) === normRank(pc2.rank) && bankroll >= state.bet;

      return {
        ...state,
        bankroll,
        phase: 'player',
        canDouble,
        canSurrender: true,
        canSplit,
        insuranceTook: take,
        insuranceResult,
        insuranceMistake,
      };
    }

    case 'PLAYER_ACTION': {
      const { move } = action;
      const playerHand = state.playerHands[state.activeHandIndex];
      const dealerUpcard = state.dealerHand[0];

      const correct = getBasicStrategyAction(
        playerHand, dealerUpcard,
        state.canDouble, state.canSurrender, state.canSplit
      );

      const isCorrect = move === correct;
      const mistakes = isCorrect ? [] : [{
        action: move,
        correct,
        correctLabel: ACTION_LABELS[correct],
        actionLabel: ACTION_LABELS[move],
        explanation: explainAction(correct, playerHand, dealerUpcard),
      }];

      const newStats = isCorrect
        ? { ...state.stats, correct: state.stats.correct + 1 }
        : { ...state.stats, mistakes: state.stats.mistakes + 1 };

      if (move === 'R') {
        return {
          ...state,
          phase: 'over',
          result: 'surrender',
          bankroll: state.bankroll + Math.floor(state.bet / 2),
          lastMistakes: mistakes,
          stats: newStats,
        };
      }

      if (move === 'D') {
        let shoe = [...state.shoe];
        const card = { ...shoe[0] };
        shoe = shoe.slice(1);
        const rc = state.runningCount + hiLoValue(card.rank);
        const newHand = [...playerHand, card];
        const hints = [card];
        const bankroll = state.bankroll - state.bet;
        const newHands = state.playerHands.map((h, i) => i === state.activeHandIndex ? newHand : h);
        const nextPhase = isBust(newHand) ? 'over' : 'dealer';
        return {
          ...state, shoe, runningCount: rc, playerHands: newHands, bankroll,
          phase: nextPhase,
          result: isBust(newHand) ? 'bust' : null,
          lastMistakes: mistakes, lastCardCountHints: hints, stats: newStats,
        };
      }

      if (move === 'P') {
        const [c1, c2] = playerHand;
        let shoe = [...state.shoe];
        const newC1 = { ...shoe[0] }; shoe = shoe.slice(1);
        const newC2 = { ...shoe[0] }; shoe = shoe.slice(1);
        const rc = state.runningCount + hiLoValue(newC1.rank) + hiLoValue(newC2.rank);
        const hints = [newC1, newC2];
        const hand1 = [c1, newC1];
        const hand2 = [c2, newC2];
        const newHands = [
          ...state.playerHands.slice(0, state.activeHandIndex),
          hand1, hand2,
          ...state.playerHands.slice(state.activeHandIndex + 1),
        ];
        const bankroll = state.bankroll - state.bet;
        return {
          ...state, shoe, runningCount: rc, playerHands: newHands, bankroll,
          canDouble: bankroll >= state.bet, canSurrender: false, canSplit: false,
          splitFromAces: c1.rank === 'A',
          lastMistakes: mistakes, lastCardCountHints: hints, stats: newStats,
        };
      }

      if (move === 'S') {
        const nextIndex = state.activeHandIndex + 1;
        if (nextIndex < state.playerHands.length) {
          return { ...state, activeHandIndex: nextIndex, canDouble: state.bankroll >= state.bet, canSurrender: false, canSplit: false, lastMistakes: mistakes, stats: newStats };
        }
        return { ...state, phase: 'dealer', lastMistakes: mistakes, stats: newStats };
      }

      // Hit
      let shoe = [...state.shoe];
      const card = { ...shoe[0] };
      shoe = shoe.slice(1);
      const rc = state.runningCount + hiLoValue(card.rank);
      const newHand = [...playerHand, card];
      const hints = [...state.lastCardCountHints, card];
      const newHands = state.playerHands.map((h, i) => i === state.activeHandIndex ? newHand : h);

      if (isBust(newHand) || state.splitFromAces || handTotal(newHand) === 21) {
        const nextIndex = state.activeHandIndex + 1;
        if (nextIndex < state.playerHands.length && !state.splitFromAces) {
          return { ...state, shoe, runningCount: rc, playerHands: newHands, activeHandIndex: nextIndex, canDouble: false, canSurrender: false, canSplit: false, lastMistakes: mistakes, lastCardCountHints: hints, stats: newStats };
        }
        // If every hand is busted, skip dealer play entirely — the house wins automatically
        if (newHands.every(h => isBust(h))) {
          return { ...state, shoe, runningCount: rc, playerHands: newHands, phase: 'over', result: 'bust', lastMistakes: mistakes, lastCardCountHints: hints, stats: newStats };
        }
        return { ...state, shoe, runningCount: rc, playerHands: newHands, phase: 'dealer', lastMistakes: mistakes, lastCardCountHints: hints, stats: newStats };
      }

      return {
        ...state, shoe, runningCount: rc, playerHands: newHands,
        canDouble: false, canSurrender: false, canSplit: false,
        lastMistakes: mistakes, lastCardCountHints: hints, stats: newStats,
      };
    }

    case 'DEALER_PLAY': {
      let hand = [...state.dealerHand];
      let shoe = [...state.shoe];
      let rc = state.runningCount;

      if (hand.some(c => c.faceDown)) {
        // One step: reveal the hole card and count it
        hand = hand.map(c => c.faceDown ? { ...c, faceDown: false } : c);
        rc += hiLoValue(state.dealerHand.find(c => c.faceDown).rank);
      } else {
        // One step: draw a single card
        const card = { ...shoe[0] };
        shoe = shoe.slice(1);
        rc += hiLoValue(card.rank);
        hand = [...hand, card];
      }

      // If dealer still needs to hit, stay in 'dealer' — the effect will fire again
      if (dealerShouldHit(hand)) {
        return { ...state, shoe, runningCount: rc, dealerHand: hand, phase: 'dealer' };
      }

      // Dealer is done — settle all hands
      const dealerTotal = handTotal(hand);
      const dealerBusted = isBust(hand);
      let bankroll = state.bankroll;

      const results = state.playerHands.map(ph => {
        if (isBust(ph)) return 'bust';
        if (dealerBusted) return 'win';
        const pt = handTotal(ph);
        if (pt > dealerTotal) return 'win';
        if (pt < dealerTotal) return 'lose';
        return 'push';
      });

      results.forEach(r => {
        if (r === 'win') bankroll += state.bet * 2;
        if (r === 'push') bankroll += state.bet;
      });

      const overallResult = results.length === 1 ? results[0]
        : results.some(r => r === 'win') ? 'win'
        : results.every(r => r === 'push') ? 'push'
        : 'lose';

      return { ...state, shoe, runningCount: rc, dealerHand: hand, phase: 'over', result: overallResult, bankroll };
    }

    case 'REVEAL_HOLE': {
      // Count any hole cards that are about to be revealed
      const newRc = state.runningCount + state.dealerHand
        .filter(c => c.faceDown)
        .reduce((sum, c) => sum + hiLoValue(c.rank), 0);
      const hand = state.dealerHand.map(c =>
        c.faceDown ? { ...c, faceDown: false, justRevealed: true } : c
      );
      return { ...state, dealerHand: hand, runningCount: newRc };
    }

    case 'RESET':
      return { ...initialState(), stats: state.stats, bankroll: state.bankroll, runningCount: state.runningCount, shoe: state.shoe };

    default:
      return state;
  }
}

export function useBlackjack() {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);

  const setBet         = useCallback(bet  => dispatch({ type: 'SET_BET', bet }), []);
  const deal           = useCallback(()   => dispatch({ type: 'DEAL' }), []);
  const playerAction   = useCallback(move => dispatch({ type: 'PLAYER_ACTION', move }), []);
  const dealerPlay     = useCallback(()   => dispatch({ type: 'DEALER_PLAY' }), []);
  const reset          = useCallback(()   => dispatch({ type: 'RESET' }), []);
  const insuranceAction = useCallback(take => dispatch({ type: 'INSURANCE_ACTION', take }), []);
  const revealHole      = useCallback(()   => dispatch({ type: 'REVEAL_HOLE' }), []);

  const tc = trueCount(state.runningCount, decksRemaining(state.shoe));

  return { ...state, trueCount: tc, setBet, deal, playerAction, dealerPlay, reset, insuranceAction, revealHole };
}
