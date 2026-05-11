'use client';
import Card from './Card';
import { handTotal, isBust, isBlackjack } from '@/lib/blackjack';

export default function Hand({ hand, label, active = false, isDealer = false }) {
  if (!hand || hand.length === 0) return null;

  const total = handTotal(hand);
  const bust = isBust(hand);
  const bj = isBlackjack(hand);

  const totalSizeClass = isDealer && !bust && !bj
    ? total >= 21 ? 'text-2xl'
    : total >= 19 ? 'text-xl'
    : total >= 17 ? 'text-lg'
    : total >= 14 ? 'text-base'
    : 'text-sm'
    : 'text-base';

  return (
    <div className={`flex flex-col items-center gap-3 transition-all ${active ? 'ring-2 ring-yellow-400 ring-offset-4 ring-offset-green-900 rounded-2xl p-3' : 'p-3'} ${bj ? 'bj-hand-glow' : ''}`}>
      {label && (
        <div className="text-gray-300 text-xs font-semibold uppercase tracking-widest">{label}</div>
      )}
      <div
        className={`flex gap-2 justify-center ${isDealer ? 'flex-nowrap dealer-hand-cards' : 'flex-wrap'}`}
        data-count={isDealer ? hand.length : undefined}
      >
        {hand.map((card, i) => (
          <Card key={card.id ?? `${i}-${card.rank}-${card.suit}`} card={card} dealIndex={i} />
        ))}
      </div>
      <div
        key={isDealer ? total : undefined}
        className={`${totalSizeClass} font-bold px-3 py-0.5 rounded-full transition-colors
          ${bust ? 'bg-red-900/60 text-red-300' : bj ? 'bg-yellow-900/60 text-yellow-300' : total >= 19 ? 'bg-green-900/60 text-green-200' : 'bg-black/30 text-white'}
          ${isDealer && !bust && !bj ? 'dealer-total-pop' : ''}`}
      >
        {bj ? '⚡ Blackjack' : bust ? `Bust · ${total}` : total}
      </div>
    </div>
  );
}
