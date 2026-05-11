'use client';
import { useState } from 'react';

const DC = ['2','3','4','5','6','7','8','9','10','A'];

const COLOR = {
  H:  'bg-blue-700 text-blue-100',
  S:  'bg-gray-600 text-gray-100',
  D:  'bg-yellow-600 text-yellow-100',
  Ds: 'bg-yellow-700 text-yellow-100',
  P:  'bg-purple-700 text-purple-100',
  Ph: 'bg-purple-800 text-purple-200',
  Pd: 'bg-purple-600 text-purple-100',
  Ps: 'bg-purple-900 text-purple-200',
  R:  'bg-red-800 text-red-100',
  Rs: 'bg-red-900 text-red-200',
};

const LABEL = { H:'H', S:'S', D:'D', Ds:'D*', P:'P', Ph:'P*', Pd:'P†', Ps:'P‡', R:'R', Rs:'R*' };

const HARD_ROWS = [
  ['8', 'H','H','H','H','H','H','H','H','H','H'],
  ['9', 'H','D','D','D','D','H','H','H','H','H'],
  ['10','D','D','D','D','D','D','D','D','H','H'],
  ['11','D','D','D','D','D','D','D','D','D','H'],
  ['12','H','H','S','S','S','H','H','H','H','H'],
  ['13','S','S','S','S','S','H','H','H','H','H'],
  ['14','S','S','S','S','S','H','H','H','H','H'],
  ['15','S','S','S','S','S','H','H','H','R','H'],
  ['16','S','S','S','S','S','H','H','R','R','R'],
  ['17','S','S','S','S','S','S','S','S','S','S'],
];

const SOFT_ROWS = [
  ['A-2','H','H','H','D','D','H','H','H','H','H'],
  ['A-3','H','H','H','D','D','H','H','H','H','H'],
  ['A-4','H','H','D','D','D','H','H','H','H','H'],
  ['A-5','H','H','D','D','D','H','H','H','H','H'],
  ['A-6','H','D','D','D','D','H','H','H','H','H'],
  ['A-7','Ds','Ds','Ds','Ds','Ds','S','S','H','H','H'],
  ['A-8','S','S','S','S','Ds','S','S','S','S','S'],
  ['A-9','S','S','S','S','S','S','S','S','S','S'],
];

const PAIR_ROWS = [
  ['A-A','P','P','P','P','P','P','P','P','P','P'],
  ['2-2','Ph','Ph','P','P','P','P','H','H','H','H'],
  ['3-3','Ph','Ph','P','P','P','P','H','H','H','H'],
  ['4-4','H','H','H','Ph','Ph','H','H','H','H','H'],
  ['5-5','D','D','D','D','D','D','D','D','H','H'],
  ['6-6','Ph','P','P','P','P','H','H','H','H','H'],
  ['7-7','P','P','P','P','P','P','H','H','H','H'],
  ['8-8','P','P','P','P','P','P','P','P','P','P'],
  ['9-9','P','P','P','P','P','S','P','P','S','S'],
  ['10-10','S','S','S','S','S','S','S','S','S','S'],
];

function Table({ rows, title }) {
  return (
    <div>
      <div className="text-gray-300 font-semibold text-xs mb-2">{title}</div>
      <div className="overflow-x-auto">
        <table className="text-xs border-collapse">
          <thead>
            <tr>
              <th className="bg-gray-800 text-gray-400 px-2 py-1 border border-gray-700 w-12">Hand</th>
              {DC.map(d => (
                <th key={d} className="bg-gray-800 text-gray-400 px-2 py-1 border border-gray-700 w-10">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([hand, ...actions]) => (
              <tr key={hand}>
                <td className="bg-gray-800 text-gray-200 px-2 py-1 border border-gray-700 font-semibold">{hand}</td>
                {actions.map((a, i) => (
                  <td key={i} className={`px-2 py-1 border border-gray-900 text-center font-bold ${COLOR[a] || 'bg-gray-700 text-gray-300'}`}>
                    {LABEL[a] || a}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function BasicStrategyChart() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <span className="text-white font-bold text-sm">Basic Strategy Chart</span>
        <span className="text-gray-400 text-lg">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="p-4 border-t border-gray-700 space-y-6">
          <Table rows={HARD_ROWS} title="Hard Totals" />
          <Table rows={SOFT_ROWS} title="Soft Totals (Ace + X)" />
          <Table rows={PAIR_ROWS} title="Pairs" />
          <div className="text-xs text-gray-500 space-y-1">
            <div><span className={`inline-block px-1 ${COLOR.H}`}>H</span> Hit &nbsp;
              <span className={`inline-block px-1 ${COLOR.S}`}>S</span> Stand &nbsp;
              <span className={`inline-block px-1 ${COLOR.D}`}>D</span> Double (else Hit) &nbsp;
              <span className={`inline-block px-1 ${COLOR.Ds}`}>D*</span> Double (else Stand)
            </div>
            <div><span className={`inline-block px-1 ${COLOR.P}`}>P</span> Split &nbsp;
              <span className={`inline-block px-1 ${COLOR.Ph}`}>P*</span> Split (else Hit) &nbsp;
              <span className={`inline-block px-1 ${COLOR.R}`}>R</span> Surrender (else Hit)
            </div>
            <div>6-deck, dealer stands soft 17, late surrender allowed</div>
          </div>
        </div>
      )}
    </div>
  );
}
