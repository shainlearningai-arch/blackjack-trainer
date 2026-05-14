const BASE = 'https://blackjackgto.com';

const images = [
  {
    page: `${BASE}/blackjack-strategy-chart`,
    entries: [
      {
        url: `${BASE}/blackjack-hard-totals-strategy-chart.png`,
        title: 'Blackjack Hard Totals Basic Strategy Chart — 6 Deck, Soft 17',
        caption: 'Color-coded blackjack hard totals strategy chart for 6-deck games where the dealer stands on soft 17.',
      },
      {
        url: `${BASE}/blackjack-soft-totals-strategy-chart.png`,
        title: 'Blackjack Soft Totals Strategy Chart — Ace Hands, 6 Deck',
        caption: 'When to hit, stand, or double with an ace in blackjack. 6-deck, dealer stands soft 17.',
      },
      {
        url: `${BASE}/blackjack-pair-splitting-chart.png`,
        title: 'Blackjack Pair Splitting Strategy Chart — When to Split Pairs',
        caption: 'Complete blackjack pair splitting chart showing when to split, hit, or double every pair.',
      },
      {
        url: `${BASE}/blackjack-basic-strategy-chart.png`,
        title: 'Complete Blackjack Basic Strategy Chart — Hard Totals, Soft Totals & Pairs',
        caption: 'Full blackjack basic strategy chart covering all hand types. 6-deck, dealer stands on soft 17, late surrender.',
      },
    ],
  },
  {
    page: `${BASE}/how-to-count-cards`,
    entries: [],
  },
];

export async function GET() {
  const urls = images
    .filter(({ entries }) => entries.length > 0)
    .map(({ page, entries }) => {
      const imgTags = entries
        .map(({ url, title, caption }) =>
          `    <image:image>
      <image:loc>${url}</image:loc>
      <image:title>${title}</image:title>
      <image:caption>${caption}</image:caption>
    </image:image>`
        )
        .join('\n');
      return `  <url>\n    <loc>${page}</loc>\n${imgTags}\n  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
