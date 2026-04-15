import Head from "next/head";
import Link from "next/link";
import Layout from "../../../components/Layout";
import { getAllNovelSlugs, getNovelBySlug, getChaptersByNovel, getWritingStyles } from "../../../lib/supabase";
import { useReadingProgress } from "../../../lib/useReadingProgress";

export async function getStaticPaths() {
  try {
    const slugs = await getAllNovelSlugs();
    return {
      paths: slugs.map((slug) => ({ params: { slug } })),
      fallback: "blocking",
    };
  } catch {
    return { paths: [], fallback: "blocking" };
  }
}

export async function getStaticProps({ params }) {
  try {
    const novel = await getNovelBySlug(params.slug);
    if (!novel) return { notFound: true };
    const [chapters, styles] = await Promise.all([
      getChaptersByNovel(novel.id),
      getWritingStyles(),
    ]);
    return { props: { novel, chapters, styles }, revalidate: 60 };
  } catch {
    return { notFound: true };
  }
}

export default function NovelPage({ novel, chapters, styles }) {
  const { getLastRead, isRead } = useReadingProgress();
  const lastRead = getLastRead(novel.slug);
  const continueChapter = lastRead || (chapters.length > 0 ? chapters[0].chapter_number : null);
  const readCount = chapters.filter((ch) => isRead(novel.slug, ch.chapter_number)).length;

  return (
    <>
      <Head>
        <title>{novel.title} — NovelForge</title>
        <meta name="description" content={novel.description || novel.title} />
      </Head>

      <Layout>
        {/* Book header — cover + info side by side */}
        <section className="bg-surface border-b border-border">
          <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
            <Link href="/" className="inline-flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors mb-6">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
              Back to Library
            </Link>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Book cover */}
              <div className="shrink-0 flex justify-center md:justify-start">
                <div
                  className="w-44 h-64 rounded-lg shadow-2xl flex flex-col items-center justify-end p-4"
                  style={{ background: `linear-gradient(160deg, ${novel.cover_color}cc, ${novel.cover_color})` }}
                >
                  <span className="text-white text-xs font-bold text-center leading-tight">
                    {novel.title}
                  </span>
                  {novel.author && (
                    <span className="text-white/60 text-[10px] mt-1">{novel.author}</span>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl md:text-3xl font-bold text-primary leading-tight">
                  {novel.title}
                </h1>
                {novel.author && (
                  <p className="text-secondary text-sm mt-1.5">by <span className="text-primary font-medium">{novel.author}</span></p>
                )}

                {/* Tags */}
                <div className="flex items-center gap-2 mt-4 flex-wrap">
                  {novel.genre && (
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-accent/10 text-accent font-medium">
                      {novel.genre}
                    </span>
                  )}
                  <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${
                    novel.status === "ongoing"
                      ? "bg-orange/10 text-orange"
                      : "bg-green/10 text-green"
                  }`}>
                    {novel.status === "ongoing" ? "Ongoing" : "Completed"}
                  </span>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-blue/10 text-blue font-medium">
                    AI-Enhanced
                  </span>
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-5 mt-5 text-sm">
                  <div className="text-center">
                    <span className="block text-lg font-bold text-primary">{chapters.length}</span>
                    <span className="text-[11px] text-muted">Chapters</span>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div className="text-center">
                    <span className="block text-lg font-bold text-primary">{styles.length + 1}</span>
                    <span className="text-[11px] text-muted">Styles</span>
                  </div>
                  {readCount > 0 && (
                    <>
                      <div className="w-px h-8 bg-border" />
                      <div className="text-center">
                        <span className="block text-lg font-bold text-accent">{readCount}/{chapters.length}</span>
                        <span className="text-[11px] text-muted">Read</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Description */}
                {novel.description && (
                  <div className="mt-5">
                    <h2 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Synopsis</h2>
                    <p className="text-sm text-secondary leading-relaxed">
                      {novel.description}
                    </p>
                  </div>
                )}

                {/* CTA */}
                <div className="flex items-center gap-3 mt-6">
                  {continueChapter && (
                    <Link
                      href={`/novel/${novel.slug}/${continueChapter}`}
                      className="px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors"
                    >
                      {lastRead ? "Continue Reading" : "Start Reading"}
                    </Link>
                  )}
                </div>

                {/* Available styles */}
                {styles.length > 0 && (
                  <div className="mt-5">
                    <p className="text-[11px] text-muted mb-2">Available reading styles</p>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2.5 py-1 rounded-full text-[11px] border border-accent/40 text-accent bg-accent/5">Original</span>
                      {styles.map((s) => (
                        <span key={s.style_key} className="px-2.5 py-1 rounded-full text-[11px] border border-border text-secondary">{s.label}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Chapter List */}
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
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
                        href={`/novel/${novel.slug}/${ch.chapter_number}`}
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
      </Layout>
    </>
  );
}
