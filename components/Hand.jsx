'use client';
import Card from './Card';
import { handTotal, isBust, isBlackjack } from '@/lib/blackjack';

export default function Hand({ hand, label, active = false }) {
  if (!hand || hand.length === 0) return null;

  const total = handTotal(hand);
  const bust = isBust(hand);
  const bj = isBlackjack(hand);

  return (
    <div className={`flex flex-col items-center gap-3 transition-all ${active ? 'ring-2 ring-yellow-400 ring-offset-4 ring-offset-green-900 rounded-2xl p-3' : 'p-3'} ${bj ? 'bj-hand-glow' : ''}`}>
      {label && (
        <div className="text-gray-300 text-xs font-semibold uppercase tracking-widest">{label}</div>
      )}
      <div className="flex gap-2 flex-wrap justify-center">
        {hand.map((card, i) => (
          <Card key={card.id ?? `${i}-${card.rank}-${card.suit}`} card={card} dealIndex={i} />
        ))}
      </div>
      <div className={`text-base font-bold px-3 py-0.5 rounded-full
        ${bust ? 'bg-red-900/60 text-red-300' : bj ? 'bg-yellow-900/60 text-yellow-300' : 'bg-black/30 text-white'}`}>
        {bj ? '⚡ Blackjack' : bust ? `Bust · ${total}` : total}
      </div>
    </div>
  );
}
