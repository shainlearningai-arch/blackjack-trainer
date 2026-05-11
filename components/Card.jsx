'use client';

const RED_SUITS = ['♥', '♦'];

const PIP_LAYOUTS = {
  '2': [
    [50, 22, false],
    [50, 78, true],
  ],
  '3': [
    [50, 16, false],
    [50, 50, false],
    [50, 84, true],
  ],
  '4': [
    [27, 22, false], [73, 22, false],
    [27, 78, true],  [73, 78, true],
  ],
  '5': [
    [27, 16, false], [73, 16, false],
    [50, 50, false],
    [27, 84, true],  [73, 84, true],
  ],
  '6': [
    [27, 15, false], [73, 15, false],
    [27, 50, false], [73, 50, false],
    [27, 85, true],  [73, 85, true],
  ],
  '7': [
    [27, 12, false], [73, 12, false],
    [50, 33, false],
    [27, 54, false], [73, 54, false],
    [27, 85, true],  [73, 85, true],
  ],
  '8': [
    [27, 9,  false], [73, 9,  false],
    [50, 28, false],
    [27, 50, false], [73, 50, false],
    [50, 72, true],
    [27, 91, true],  [73, 91, true],
  ],
  '9': [
    [27, 10, false], [73, 10, false],
    [27, 30, false], [73, 30, false],
    [50, 50, false],
    [27, 70, true],  [73, 70, true],
    [27, 90, true],  [73, 90, true],
  ],
  '10': [
    [27, 9,  false], [73, 9,  false],
    [50, 26, false],
    [27, 42, false], [73, 42, false],
    [27, 58, true],  [73, 58, true],
    [50, 74, true],
    [27, 91, true],  [73, 91, true],
  ],
};

function pipFontSize(rank) {
  if (rank === '10') return '11px';
  if (rank === '9')  return '11px';
  if (rank === '8')  return '12px';
  if (rank === '7')  return '13px';
  if (rank === '6')  return '14px';
  return '15px';
}

export default function Card({ card, dealIndex = 0, noAnimate = false }) {
  if (!card) return null;

  const animClass = noAnimate ? '' : (card.justRevealed ? 'card-flip' : 'card-deal');
  const animStyle = noAnimate || card.justRevealed ? {} : { animationDelay: `${dealIndex * 130}ms` };

  if (card.faceDown) {
    return (
      <div
        className={`${animClass} rounded-xl border-2 border-gray-500 bg-gradient-to-br from-blue-800 to-blue-600 flex items-center justify-center shadow-xl select-none`}
        style={{ ...animStyle, width: '84px', height: '126px' }}
      >
        <div
          className="rounded-lg border-2 border-blue-400/30 flex items-center justify-center"
          style={{ width: '63px', height: '97px' }}
        >
          <svg width="28" height="28" viewBox="0 0 32 32" className="opacity-40">
            <path d="M16 2 L20 12 L30 12 L22 19 L25 29 L16 23 L7 29 L10 19 L2 12 L12 12 Z" fill="#93c5fd" />
          </svg>
        </div>
      </div>
    );
  }

  const isRed = RED_SUITS.includes(card.suit);
  const color = isRed ? '#dc2626' : '#111827';
  const isFace = ['J', 'Q', 'K'].includes(card.rank);
  const isAce = card.rank === 'A';
  const pips = PIP_LAYOUTS[card.rank];

  return (
    <div
      className={`${animClass} rounded-xl border border-gray-300 bg-white shadow-xl select-none relative overflow-hidden`}
      style={{ ...animStyle, width: '84px', height: '126px' }}
    >
      <div
        className="absolute pointer-events-none"
        style={{ top: '4px', right: '4px', bottom: '4px', left: '4px', border: `1px solid ${color}22`, borderRadius: '8px' }}
      />

      {/* Top-left corner */}
      <div className="absolute top-1.5 left-2 flex flex-col items-center" style={{ color, lineHeight: 1 }}>
        <span style={{ fontSize: '14px', fontWeight: 900, lineHeight: 1 }}>{card.rank}</span>
        <span style={{ fontSize: '12px', lineHeight: 1, marginTop: '1px' }}>{card.suit}</span>
      </div>

      {/* Bottom-right corner */}
      <div className="absolute bottom-1.5 right-2 flex flex-col items-center rotate-180" style={{ color, lineHeight: 1 }}>
        <span style={{ fontSize: '14px', fontWeight: 900, lineHeight: 1 }}>{card.rank}</span>
        <span style={{ fontSize: '12px', lineHeight: 1, marginTop: '1px' }}>{card.suit}</span>
      </div>

      {isAce && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span style={{ fontSize: '46px', color, lineHeight: 1 }}>{card.suit}</span>
        </div>
      )}

      {isFace && (
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ gap: '2px' }}>
          <span style={{ fontSize: '44px', fontWeight: 900, color, lineHeight: 1 }}>{card.rank}</span>
          <span style={{ fontSize: '20px', color, lineHeight: 1 }}>{card.suit}</span>
        </div>
      )}

      {/* Pip area: top:28px to bottom:28px = 70px tall */}
      {pips && (
        <div className="absolute" style={{ top: '28px', bottom: '28px', left: '3px', right: '3px' }}>
          {pips.map(([left, top, flipped], i) => (
            <span
              key={i}
              className="absolute"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                transform: `translate(-50%, -50%)${flipped ? ' rotate(180deg)' : ''}`,
                fontSize: pipFontSize(card.rank),
                lineHeight: 1,
                color,
                userSelect: 'none',
              }}
            >
              {card.suit}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
