'use client';
import { useState } from 'react';

const ACTIONS = [
  {
    move: 'H', key: 'H', label: 'Hit',       icon: '+1',  desc: 'take a card',
    bg: 'linear-gradient(155deg,#2563eb,#1e40af)',
    border: '#60a5fa', shadow: 'rgba(37,99,235,0.5)',
  },
  {
    move: 'S', key: 'S', label: 'Stand',     icon: '—',   desc: 'keep total',
    bg: 'linear-gradient(155deg,#4b5563,#374151)',
    border: '#9ca3af', shadow: 'rgba(75,85,99,0.45)',
  },
  {
    move: 'D', key: 'D', label: 'Double',    icon: '×2',  desc: 'double + 1 card',
    bg: 'linear-gradient(155deg,#d97706,#92400e)',
    border: '#fbbf24', shadow: 'rgba(217,119,6,0.55)',
  },
  {
    move: 'P', key: 'P', label: 'Split',     icon: '||',  desc: 'play two hands',
    bg: 'linear-gradient(155deg,#7c3aed,#5b21b6)',
    border: '#c4b5fd', shadow: 'rgba(124,58,237,0.5)',
  },
  {
    move: 'R', key: 'R', label: 'Surrender', icon: '½',   desc: 'half bet back',
    bg: 'linear-gradient(155deg,#374151,#111827)',
    border: '#6b7280', shadow: 'rgba(55,65,81,0.45)',
  },
];

export default function ActionButtons({ onAction, canDouble, canSurrender, canSplit, disabled }) {
  const [popping, setPopping] = useState(null);

  const enabled = {
    H: !disabled, S: !disabled,
    D: !disabled && canDouble,
    P: !disabled && canSplit,
    R: !disabled && canSurrender,
  };

  const handleClick = (move) => {
    if (!enabled[move]) return;
    setPopping(move);
    setTimeout(() => setPopping(null), 300);
    onAction(move);
  };

  return (
    <div className="flex gap-1.5 sm:gap-2.5 justify-center">
      {ACTIONS.map(({ move, key, label, icon, desc, bg, border, shadow }) => {
        const on = enabled[move];
        return (
          <button
            key={move}
            onClick={() => handleClick(move)}
            disabled={!on}
            className={`relative flex flex-col items-center justify-center rounded-2xl border-2 font-bold text-white select-none transition-transform duration-100
              ${popping === move ? 'btn-action-pop' : ''}
              ${on ? 'hover:-translate-y-0.5 active:translate-y-0.5' : 'cursor-not-allowed opacity-25'}`}
            style={{
              width: 'clamp(54px, 17vw, 78px)',
              paddingTop: '10px', paddingBottom: '10px', gap: '2px',
              background: on ? bg : '#1f2937',
              borderColor: on ? border : '#374151',
              boxShadow: on ? `0 6px 22px ${shadow}, 0 2px 6px rgba(0,0,0,0.45)` : 'none',
            }}
          >
            {/* Keyboard hint badge */}
            <span
              className="hidden sm:block absolute top-1.5 right-1.5 font-mono font-bold leading-none px-1 py-px rounded"
              style={{
                fontSize: '9px',
                background: 'rgba(0,0,0,0.35)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              {key}
            </span>
            <span style={{ fontSize: '18px', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em' }}>
              {icon}
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, lineHeight: 1 }}>{label}</span>
            {on && (
              <span className="hidden sm:block" style={{ fontSize: '10px', fontWeight: 400, opacity: 0.55, lineHeight: 1 }}>{desc}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
