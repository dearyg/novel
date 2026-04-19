import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy — The Senior Observer</title>
      </Head>

      <Layout>
        <article className="py-10 md:py-16 px-4">
          <div className="max-w-[65ch] mx-auto">
            <Link href="/" className="inline-flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors mb-8">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
              Back
            </Link>

            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-8">Privacy Policy</h1>

            <div className="space-y-6 text-sm text-secondary leading-relaxed">
              <p className="text-muted text-xs">Last updated: April 2026</p>

              <section>
                <h2 className="text-base font-semibold text-primary mb-2">What we collect</h2>
                <p>
                  This site collects minimal data to deliver its features:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1.5">
                  <li>
                    <strong className="text-primary">Reading progress</strong> — stored locally in your browser (localStorage). Never sent to any server.
                  </li>
                  <li>
                    <strong className="text-primary">Approximate location</strong> — your city is inferred via IP address using a third-party service (ipapi.co) to personalize story elements. This lookup is cached locally for 24 hours and is not stored on our servers.
                  </li>
                  <li>
                    <strong className="text-primary">Hosting analytics</strong> — our hosting provider (Vercel) may collect standard web analytics (page views, country-level geography). No personal identifiers are tracked.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-base font-semibold text-primary mb-2">What we don't collect</h2>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>No accounts, emails, or passwords</li>
                  <li>No cookies (beyond what the hosting provider sets)</li>
                  <li>No advertising trackers</li>
                  <li>No data sold to third parties</li>
                </ul>
              </section>

              <section>
                <h2 className="text-base font-semibold text-primary mb-2">Third-party services</h2>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li><strong className="text-primary">Supabase</strong> — hosts our novel content database</li>
                  <li><strong className="text-primary">ipapi.co</strong> — IP-based city lookup for story localization</li>
                  <li><strong className="text-primary">Vercel</strong> — website hosting</li>
                </ul>
              </section>

              <section>
                <h2 className="text-base font-semibold text-primary mb-2">Your control</h2>
                <p>
                  Clear your browser's localStorage to reset all reading progress and location data. You can also use a VPN or ad-blocker to prevent the IP geolocation lookup — the story will simply use default locations.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-primary mb-2">Contact</h2>
                <p>
                  Questions? Reach us at <span className="text-primary">alayido.me@gmail.com</span>.
                </p>
              </section>
            </div>
          </div>
        </article>
      </Layout>
    </>
  );
}
