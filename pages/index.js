import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import { getNovelBySlug, getChaptersByNovel, getWritingStyles } from "../lib/supabase";
import { useReadingProgress } from "../lib/useReadingProgress";

const SLUG = "the-senior-observer";

export async function getStaticProps() {
  try {
    const novel = await getNovelBySlug(SLUG);
    if (!novel) return { props: { novel: null, chapters: [], styles: [] }, revalidate: 60 };
    const [chapters, styles] = await Promise.all([
      getChaptersByNovel(novel.id),
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

  return (
    <>
      <Head>
        <title>{novel.title} — by {novel.author}</title>
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

          <div className="relative max-w-6xl mx-auto px-4 py-14 md:py-24">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">
              {/* Book cover */}
              <div className="shrink-0 relative group">
                <div
                  className="w-56 md:w-64 aspect-[3/4] rounded-xl shadow-2xl flex flex-col items-center justify-between p-6 transition-transform group-hover:scale-[1.02]"
                  style={{ background: `linear-gradient(160deg, ${novel.cover_color}ee, ${novel.cover_color}cc 50%, ${novel.cover_color}aa)` }}
                >
                  <span className="text-white/70 text-[10px] uppercase tracking-[0.3em]">
                    {novel.tagline || "a novel"}
                  </span>
                  <span className="text-white text-lg md:text-xl font-bold text-center leading-tight">
                    {novel.title}
                  </span>
                  {novel.author && (
                    <span className="text-white/70 text-xs">{novel.author}</span>
                  )}
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-black/40 blur-xl rounded-full" />
              </div>

              {/* Book details */}
              <div className="flex-1 min-w-0 text-center lg:text-left">
                <h1 className="text-3xl md:text-5xl font-bold text-primary leading-[1.1]">
                  {novel.title}
                </h1>
                {novel.author && (
                  <p className="text-secondary text-base mt-3">
                    by <span className="text-primary font-medium">{novel.author}</span>
                  </p>
                )}

                {/* Tags */}
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

                {/* Synopsis */}
                {novel.description && (
                  <p className="text-secondary text-base md:text-lg mt-6 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    {novel.description}
                  </p>
                )}

                {/* CTA */}
                <div className="flex items-center justify-center lg:justify-start gap-3 mt-8">
                  {continueChapter && (
                    <Link
                      href={`/${continueChapter}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20"
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

                {/* Stats */}
                <div className="flex items-center justify-center lg:justify-start gap-6 mt-8 text-sm">
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
                  <div className="w-px h-10 bg-border" />
                  <div>
                    <span className="block text-xl font-bold text-accent">Free</span>
                    <span className="text-[11px] text-muted uppercase tracking-wider">Forever</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Features */}
        <section id="ai-features" className="py-14 md:py-20 px-4 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs tracking-[0.25em] uppercase text-accent mb-3 font-semibold">
                What Makes This Novel Different
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-primary max-w-2xl mx-auto leading-snug">
                Not just a book — an <span className="text-accent">evolving</span>,<br />
                interactive reading experience
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="group relative rounded-2xl bg-surface border border-border p-6 hover:border-accent/40 transition-colors overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-accent/5 group-hover:bg-accent/10 transition-colors" />
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-primary mb-2">Choose Your Style</h3>
                  <p className="text-sm text-secondary leading-relaxed">
                    Read every chapter in Literary, Concise, or Cinematic voice.
                    The story adapts to how <em>you</em> prefer to read.
                  </p>
                  {styles.length > 0 && (
                    <div className="flex items-center gap-1.5 mt-4 flex-wrap">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent">Original</span>
                      {styles.map((s) => (
                        <span key={s.style_key} className="text-[10px] px-2 py-0.5 rounded-full bg-surface-alt text-secondary">
                          {s.label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="group relative rounded-2xl bg-surface border border-border p-6 hover:border-accent/40 transition-colors overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-blue/5 group-hover:bg-blue/10 transition-colors" />
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-blue/10 text-blue flex items-center justify-center mb-4">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-primary mb-2">AI-Evolved Prose</h3>
                  <p className="text-sm text-secondary leading-relaxed">
                    Written with human plot, refined by AI across multiple passes.
                    Each iteration sharper, richer, more alive — quality compounds.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-[11px]">
                    <span className="text-muted">Iterations:</span>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className={`w-1.5 h-5 rounded-sm ${i <= 4 ? "bg-accent" : "bg-border"}`} />
                      ))}
                    </div>
                    <span className="text-accent font-semibold">v4</span>
                  </div>
                </div>
              </div>

              <div className="group relative rounded-2xl bg-surface border border-border p-6 hover:border-accent/40 transition-colors overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-rose/5 group-hover:bg-rose/10 transition-colors" />
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-rose/10 text-rose flex items-center justify-center mb-4">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-primary mb-2">Audit Mode</h3>
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
          </div>
        </section>

        {/* Chapter List */}
        <section id="chapters" className="py-10 md:py-14 px-4 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-primary">
                {chapters.length} Chapters
              </h2>
            </div>

            <div className="bg-surface rounded-xl border border-border overflow-hidden">
              {chapters.length > 0 ? (
                <div className="divide-y divide-border">
                  {chapters.map((ch) => {
                    const read = isRead(novel.slug, ch.chapter_number);
                    const isContinue = ch.chapter_number === lastRead;
                    return (
                      <Link
                        key={ch.id}
                        href={`/${ch.chapter_number}`}
                        className="group flex items-center gap-4 px-5 py-3.5 hover:bg-surface-alt transition-colors"
                      >
                        <span className="text-xs font-mono text-muted w-8 shrink-0">
                          {String(ch.chapter_number).padStart(2, "0")}
                        </span>
                        <span className="flex-1 text-sm text-primary group-hover:text-accent transition-colors">
                          {ch.title}
                        </span>
                        <div className="flex items-center gap-2 shrink-0">
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
                  First chapters coming soon.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        {continueChapter && (
          <section className="py-14 md:py-20 px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">
                Ready to begin?
              </h2>
              <p className="text-secondary text-sm mt-3 max-w-md mx-auto leading-relaxed">
                Dive in — free, always. Your progress is saved automatically.
              </p>
              <Link
                href={`/${continueChapter}`}
                className="inline-flex items-center gap-2 mt-6 px-8 py-3 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20"
              >
                {lastRead ? "Continue Reading" : "Open the Book"}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </section>
        )}
      </Layout>
    </>
  );
}
