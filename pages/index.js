import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import NewsletterSignup from "../components/NewsletterSignup";
import CodeRain from "../components/animations/CodeRain";
import WordReveal from "../components/animations/WordReveal";
import ScrollReveal from "../components/animations/ScrollReveal";
import Typewriter from "../components/animations/Typewriter";
import AmbientParticles from "../components/animations/AmbientParticles";
import { getNovelBySlug, getChapterIndex, getWritingStyles } from "../lib/supabase";
import { useReadingProgress } from "../lib/useReadingProgress";

const SLUG = "the-senior-observer";
const AUTHOR = "Homer";

export async function getStaticProps() {
  try {
    const novel = await getNovelBySlug(SLUG);
    if (!novel) return { props: { novel: null, chapters: [], styles: [] }, revalidate: 60 };
    const [chapters, styles] = await Promise.all([
      getChapterIndex(novel.id),
      getWritingStyles(),
    ]);
    return { props: { novel, chapters, styles }, revalidate: 60 };
  } catch {
    return { props: { novel: null, chapters: [], styles: [] }, revalidate: 60 };
  }
}

export default function Home({ novel, chapters, styles }) {
  const { getLastRead, isRead } = useReadingProgress();

  if (!novel) {
    return (
      <Layout>
        <section className="py-20 text-center">
          <p className="text-secondary">Novel not available yet.</p>
        </section>
      </Layout>
    );
  }

  const lastRead = getLastRead(novel.slug);
  const continueChapter = lastRead || (chapters.length > 0 ? chapters[0].chapter_number : null);
  const readCount = chapters.filter((ch) => isRead(novel.slug, ch.chapter_number)).length;
  const zhCount = chapters.filter((ch) => ch.has_zh).length;

  return (
    <>
      <Head>
        <title>{`${novel.title} — by ${AUTHOR}`}</title>
        <meta name="description" content={novel.description || novel.title} />
      </Head>

      <Layout>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <div
            className="absolute inset-0 opacity-40 blur-3xl"
            style={{ background: `radial-gradient(circle at 30% 30%, ${novel.cover_color}, transparent 60%)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/30 to-bg" />
          <CodeRain count={25} />
          <AmbientParticles count={15} />

          <div className="relative max-w-6xl mx-auto px-4 py-14 md:py-24">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">
              {/* Book cover */}
              <ScrollReveal>
                <div className="shrink-0 relative group">
                  <img
                    src="/cover-hero.jpg"
                    alt={`${novel.title} — cover`}
                    width={1200}
                    height={1766}
                    className="block w-44 sm:w-52 md:w-64 h-auto rounded-xl shadow-2xl ring-1 ring-white/5 transition-transform group-hover:scale-[1.02]"
                  />
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-black/40 blur-xl rounded-full" />
                </div>
              </ScrollReveal>

              {/* Book details */}
              <div className="flex-1 min-w-0 text-center lg:text-left">
                <ScrollReveal delay={100}>
                  <h1 className="text-3xl md:text-5xl font-bold leading-[1.1] text-gradient-animate">
                    {novel.title}
                  </h1>
                  <p className="text-secondary text-sm md:text-base mt-2 italic">
                    Life of an SDE
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={200}>
                  <p className="text-secondary text-base mt-3">
                    by <span className="text-primary font-medium">{AUTHOR}</span>
                  </p>
                </ScrollReveal>

                {/* Tags */}
                <ScrollReveal delay={300}>
                  <div className="flex items-center justify-center lg:justify-start gap-2 mt-5 flex-wrap">
                    {novel.genre && (
                      <span className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-medium">
                        {novel.genre}
                      </span>
                    )}
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      novel.status === "ongoing"
                        ? "bg-orange/10 text-orange"
                        : "bg-green/10 text-green"
                    }`}>
                      {novel.status === "ongoing" ? "Ongoing" : "Completed"}
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-blue/10 text-blue font-medium">
                      AI-Enhanced
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-rose/10 text-rose font-medium">
                      {styles.length + 1} Reading Styles
                    </span>
                  </div>
                </ScrollReveal>

                {/* Synopsis - word reveal */}
                {novel.description && (
                  <div className="mt-6 max-w-2xl mx-auto lg:mx-0">
                    <WordReveal
                      text={novel.description}
                      className="text-secondary text-base md:text-lg leading-relaxed"
                      delay={400}
                      stagger={25}
                    />
                  </div>
                )}

                {/* CTA */}
                <ScrollReveal delay={800}>
                  <div className="flex items-center justify-center lg:justify-start gap-3 mt-8">
                    {continueChapter && (
                      <Link
                        href={`/${continueChapter}`}
                        className="btn-pulse inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20"
                      >
                        {lastRead ? "Continue Reading" : "Start Reading"}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                      </Link>
                    )}
                    <a
                      href="#chapters"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-sm font-medium text-secondary hover:text-primary hover:border-primary/30 transition-colors"
                    >
                      View Chapters
                    </a>
                  </div>
                </ScrollReveal>

                {/* Stats */}
                <ScrollReveal delay={1000}>
                  <div className="flex items-center justify-center lg:justify-start gap-x-5 gap-y-3 mt-8 text-sm flex-wrap">
                    <div>
                      <span className="block text-xl font-bold text-primary">{chapters.length}</span>
                      <span className="text-[11px] text-muted uppercase tracking-wider">Chapters</span>
                    </div>
                    <div className="w-px h-10 bg-border" />
                    <div>
                      <span className="block text-xl font-bold text-primary">{styles.length + 1}</span>
                      <span className="text-[11px] text-muted uppercase tracking-wider">Styles</span>
                    </div>
                    {readCount > 0 && (
                      <>
                        <div className="w-px h-10 bg-border" />
                        <div>
                          <span className="block text-xl font-bold text-accent">{readCount}/{chapters.length}</span>
                          <span className="text-[11px] text-muted uppercase tracking-wider">Read</span>
                        </div>
                      </>
                    )}
                    {zhCount > 0 && (
                      <>
                        <div className="w-px h-10 bg-border" />
                        <div>
                          <span className="block text-xl font-bold text-blue">{zhCount}</span>
                          <span className="text-[11px] text-muted uppercase tracking-wider">中文</span>
                        </div>
                      </>
                    )}
                    <div className="w-px h-10 bg-border" />
                    <div>
                      <span className="block text-xl font-bold text-accent">Free</span>
                      <span className="text-[11px] text-muted uppercase tracking-wider">Forever</span>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* AI Features */}
        <section id="ai-features" className="py-14 md:py-20 px-4 border-b border-border relative">
          <AmbientParticles count={8} />
          <div className="max-w-5xl mx-auto relative">
            <ScrollReveal>
              <div className="text-center mb-12">
                <p className="text-xs tracking-[0.25em] uppercase text-accent mb-3 font-semibold">
                  <Typewriter text="What Makes This Novel Different" speed={40} delay={200} />
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-primary max-w-2xl mx-auto leading-snug">
                  Not just a book — an <span className="text-gradient-animate">evolving</span>,<br />
                  interactive reading experience
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal stagger>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="card-glow group relative rounded-2xl bg-surface border border-border p-6 hover:border-accent/40 transition-colors overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-accent/5 group-hover:bg-accent/10 transition-colors" />
                  <div className="relative">
                    <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M5 8l6 6" /><path d="M4 14l6-6 2-3" /><path d="M2 5h12" /><path d="M7 2h1" /><path d="M22 22l-5-10-5 10" /><path d="M14 18h6" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold text-primary mb-2 text-glitch">Bilingual</h3>
                    <p className="text-sm text-secondary leading-relaxed">
                      Every chapter and every reference doc — written in both
                      English and 中文. Toggle on the page; the language sticks.
                    </p>
                    <div className="flex items-center gap-1.5 mt-4 flex-wrap">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent">English</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent">中文</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-alt text-muted">~330k + ~125k chars</span>
                    </div>
                  </div>
                </div>

                <div className="card-glow group relative rounded-2xl bg-surface border border-border p-6 hover:border-accent/40 transition-colors overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-blue/5 group-hover:bg-blue/10 transition-colors" />
                  <div className="relative">
                    <div className="w-11 h-11 rounded-xl bg-blue/10 text-blue flex items-center justify-center mb-4">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold text-primary mb-2 text-glitch">A Living Novel</h3>
                    <p className="text-sm text-secondary leading-relaxed">
                      Human plot, AI-refined prose across multiple passes — and it
                      doesn't stop. As AI models get better, the chapters get
                      revisited. The book you read next year won't be the book you
                      read today.
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[11px]">
                      <span className="text-muted">Iterations:</span>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className={`w-1.5 h-5 rounded-sm ${i <= 4 ? "bg-accent" : "bg-border"}`} />
                        ))}
                      </div>
                      <span className="text-accent font-semibold">v4 · ongoing</span>
                    </div>
                  </div>
                </div>

                <div className="card-glow group relative rounded-2xl bg-surface border border-border p-6 hover:border-accent/40 transition-colors overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-rose/5 group-hover:bg-rose/10 transition-colors" />
                  <div className="relative">
                    <div className="w-11 h-11 rounded-xl bg-rose/10 text-rose flex items-center justify-center mb-4">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold text-primary mb-2 text-glitch">Audit Mode</h3>
                    <p className="text-sm text-secondary leading-relaxed">
                      Toggle technical annotations. Hover highlighted terms to see
                      real CS definitions mapped into the story.
                    </p>
                    <div className="mt-4 text-[13px] font-serif leading-relaxed text-muted italic">
                      "...a <span className="not-italic bg-highlight/20 text-highlight px-0.5 border-b border-dashed border-highlight">Buffer Overflow</span> had written..."
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Chapter List */}
        <section id="chapters" className="py-10 md:py-14 px-4 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-primary">
                  {chapters.length} Chapters
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal stagger>
              <div className="bg-surface rounded-xl border border-border overflow-hidden">
                {chapters.length > 0 ? (
                  <div className="divide-y divide-border">
                    {chapters.map((ch) => {
                      const read = isRead(novel.slug, ch.chapter_number);
                      const isContinue = ch.chapter_number === lastRead;
                      const title = ch.title_en || ch.title_zh || `Chapter ${ch.chapter_number}`;
                      return (
                        <Link
                          key={ch.chapter_number}
                          href={`/${ch.chapter_number}`}
                          className="group flex items-center gap-4 px-5 py-3.5 hover:bg-surface-alt transition-colors"
                        >
                          <span className="text-xs font-mono text-muted w-8 shrink-0">
                            {String(ch.chapter_number).padStart(2, "0")}
                          </span>
                          <span className="flex-1 text-sm text-primary group-hover:text-accent transition-colors text-glitch">
                            {title}
                          </span>
                          <div className="flex items-center gap-2 shrink-0">
                            {ch.has_en && (
                              <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-accent/10 text-accent font-semibold">EN</span>
                            )}
                            {ch.has_zh && (
                              <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue/10 text-blue font-semibold">中</span>
                            )}
                            {isContinue && (
                              <span className="text-[10px] uppercase tracking-wider text-accent font-semibold px-2 py-0.5 rounded bg-accent/10">
                                Continue
                              </span>
                            )}
                            {read && (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                            {ch.created_at && (
                              <span className="text-[11px] text-muted hidden sm:inline">
                                {new Date(ch.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                              </span>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-12 text-center text-sm text-muted">
                    First chapters coming soon. Run <code className="text-accent">node scripts/seed-prose.mjs</code> to upload prose.
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-10 md:py-14 px-4 border-b border-border">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal>
              <NewsletterSignup source="homepage" />
            </ScrollReveal>
          </div>
        </section>

        {/* Support */}
        <section className="py-10 md:py-14 px-4 border-b border-border">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal>
              <div className="rounded-2xl border border-amber-400/40 bg-amber-400/[0.06] p-6 md:p-7 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                <div className="w-14 h-14 rounded-2xl bg-amber-400/20 flex items-center justify-center text-amber-300 shrink-0">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M5 8h14a1 1 0 0 1 1 1v1a4 4 0 0 1-4 4h-.18A4 4 0 0 1 12 17a4 4 0 0 1-3.82-3H8a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1zm14 1v1a3 3 0 0 1-2.13 2.87A4 4 0 0 0 17 12V9zM7 19h10a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-base md:text-lg font-semibold text-primary">
                    Free, always. Built on weekends.
                  </h3>
                  <p className="text-sm text-secondary mt-1 leading-relaxed">
                    No paywall, no ads, no email gate. The novel is finished — but it keeps
                    getting sharper as AI improves. If it earned an hour of your time, you can
                    buy me a coffee.
                  </p>
                </div>
                <a
                  href="https://buymeacoffee.com/dearyg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-sm font-semibold transition-colors shadow-lg shadow-amber-400/20 shrink-0"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M5 8h14a1 1 0 0 1 1 1v1a4 4 0 0 1-4 4h-.18A4 4 0 0 1 12 17a4 4 0 0 1-3.82-3H8a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1zm14 1v1a3 3 0 0 1-2.13 2.87A4 4 0 0 0 17 12V9zM7 19h10a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2z" />
                  </svg>
                  Buy me a coffee
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Final CTA */}
        {continueChapter && (
          <section className="py-14 md:py-20 px-4 relative">
            <AmbientParticles count={6} />
            <ScrollReveal>
              <div className="max-w-2xl mx-auto text-center relative">
                <h2 className="text-2xl md:text-3xl font-bold text-gradient-animate">
                  Ready to begin?
                </h2>
                <p className="text-secondary text-sm mt-3 max-w-md mx-auto leading-relaxed">
                  Dive in — free, always. Your progress is saved automatically.
                </p>
                <Link
                  href={`/${continueChapter}`}
                  className="btn-pulse inline-flex items-center gap-2 mt-6 px-8 py-3 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20"
                >
                  {lastRead ? "Continue Reading" : "Open the Book"}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </ScrollReveal>
          </section>
        )}
      </Layout>
    </>
  );
}
