'use client';
import { useId } from 'react';

const CHIP_STYLES = {
  5:   { base: '#6b1c1c', ticks: '#f8a0a0', text: '#ffe0e0' },
  10:  { base: '#1a2f52', ticks: '#7eb8f7', text: '#c8e4ff' },
  25:  { base: '#1a4a2a', ticks: '#7fd49a', text: '#c0f0d0' },
  50:  { base: '#6b2d12', ticks: '#f8b57a', text: '#ffd8b0' },
  100: { base: '#1c1917', ticks: '#d4d4d4', text: '#f5f5f5' },
};

export default function Chip({ value, size = 56, onClick, style = {}, className = '', disabled = false }) {
  const uid = useId();
  const cs = CHIP_STYLES[value] || { base: '#2d2d2d', ticks: '#888', text: '#ccc' };
  const r = size / 2;
  const cx = r;
  const cy = r;

  const NUM_TICKS = 8;
  const outerR = r * 0.95;
  const innerR = r * 0.78;
  const ticks = Array.from({ length: NUM_TICKS }, (_, i) => {
    const a1 = ((i * 360 / NUM_TICKS) - 90) * (Math.PI / 180);
    const a2 = (((i + 0.44) * 360 / NUM_TICKS) - 90) * (Math.PI / 180);
    const x1 = cx + outerR * Math.cos(a1), y1 = cy + outerR * Math.sin(a1);
    const x2 = cx + outerR * Math.cos(a2), y2 = cy + outerR * Math.sin(a2);
    const x3 = cx + innerR * Math.cos(a2), y3 = cy + innerR * Math.sin(a2);
    const x4 = cx + innerR * Math.cos(a1), y4 = cy + innerR * Math.sin(a1);
    return `M${x1.toFixed(2)},${y1.toFixed(2)} A${outerR},${outerR} 0 0,1 ${x2.toFixed(2)},${y2.toFixed(2)} L${x3.toFixed(2)},${y3.toFixed(2)} A${innerR},${innerR} 0 0,0 ${x4.toFixed(2)},${y4.toFixed(2)}Z`;
  });

  const fs = value >= 100 ? Math.round(size * 0.17) : Math.round(size * 0.20);
  const shineId = `cs-${uid}`;

  return (
    <div
      onClick={disabled ? undefined : onClick}
      role={onClick ? 'button' : undefined}
      className={`select-none ${onClick && !disabled ? 'chip-hoverable cursor-pointer' : ''} ${className}`}
      style={{ width: size, height: size, flexShrink: 0, display: 'inline-block', ...style }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block', opacity: disabled ? 0.28 : 1 }}>
        <defs>
          <radialGradient id={shineId} cx="34%" cy="26%" r="68%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="50%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.28)" />
          </radialGradient>
        </defs>

        {/* Drop shadow */}
        <circle cx={cx} cy={cy + size * 0.045} r={r * 0.93} fill="rgba(0,0,0,0.55)" />

        {/* Base */}
        <circle cx={cx} cy={cy} r={r * 0.96} fill={cs.base} />

        {/* Edge ticks */}
        {ticks.map((d, i) => (
          <path key={i} d={d} fill={i % 2 === 0 ? cs.ticks : cs.base} />
        ))}

        {/* Outer ring outline */}
        <circle cx={cx} cy={cy} r={r * 0.96} fill="none" stroke={cs.ticks} strokeWidth={size * 0.014} opacity={0.3} />

        {/* Inner ring */}
        <circle cx={cx} cy={cy} r={r * 0.70} fill="none" stroke={cs.ticks} strokeWidth={size * 0.022} opacity={0.45} />

        {/* Center disc */}
        <circle cx={cx} cy={cy} r={r * 0.65} fill={cs.base} />

        {/* Shine */}
        <circle cx={cx} cy={cy} r={r * 0.96} fill={`url(#${shineId})`} />

        {/* Value */}
        <text
          x={cx} y={cy}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={fs}
          fontWeight="900"
          fill={cs.text}
          letterSpacing="-0.03em"
          style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
        >
          ${value}
        </text>
      </svg>
    </div>
  );
}
