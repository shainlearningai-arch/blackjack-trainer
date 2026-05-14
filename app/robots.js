export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: [
      'https://blackjackgto.com/sitemap.xml',
      'https://blackjackgto.com/image-sitemap.xml',
    ],
  };
}
