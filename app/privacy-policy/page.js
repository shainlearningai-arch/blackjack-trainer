export const metadata = {
  title: "Privacy Policy — Blackjack Trainer",
  description: "Privacy policy for Blackjack Trainer.",
};

export default function PrivacyPolicy() {
  const updated = "May 11, 2025";
  return (
    <div className="min-h-screen bg-gray-950 text-gray-300">
      <div className="max-w-2xl mx-auto px-6 py-16 space-y-8">

        <div>
          <h1 className="text-3xl font-black text-white mb-2">Privacy Policy</h1>
          <p className="text-gray-500 text-sm">Last updated: {updated}</p>
        </div>

        <p>
          Blackjack Trainer ("we", "our", or "us") operates this website as a free educational tool.
          This page explains what data we collect and how we use it.
        </p>

        <section className="space-y-3">
          <h2 className="text-white font-bold text-lg">Information We Collect</h2>
          <p>
            We do not collect any personally identifiable information. No account or registration
            is required to use this site. All game state (bankroll, stats, bet) exists only in your
            browser and is never transmitted to any server.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-white font-bold text-lg">Cookies &amp; Advertising</h2>
          <p>
            This site uses Google AdSense to display advertisements. Google AdSense may use cookies
            and similar tracking technologies to serve ads based on your prior visits to this site
            and other sites on the internet. You can opt out of personalized advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 underline"
            >
              Google&apos;s Ads Settings
            </a>.
          </p>
          <p>
            We may also use anonymous analytics tools (such as Google Analytics) to understand how
            visitors use the site. This data is aggregated and does not identify individual users.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-white font-bold text-lg">Third-Party Links</h2>
          <p>
            This site does not contain links to third-party sites beyond those necessary for
            advertising and analytics.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-white font-bold text-lg">Children&apos;s Privacy</h2>
          <p>
            This site is intended for users who are of legal age to gamble in their jurisdiction.
            We do not knowingly collect any information from children under 13.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-white font-bold text-lg">Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. Changes will be posted on this page with
            an updated date.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-white font-bold text-lg">Contact</h2>
          <p>
            Questions about this privacy policy? Email us at{" "}
            <span className="text-yellow-400">shainlearningai@gmail.com</span>.
          </p>
        </section>

        <div className="pt-8 border-t border-gray-800">
          <a href="/" className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold">
            ← Back to Trainer
          </a>
        </div>

      </div>
    </div>
  );
}
