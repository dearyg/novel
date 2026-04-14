import { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import CodeFooter from "../../components/CodeFooter";
import StyleSelector from "../../components/StyleSelector";
import { AuditToggle, highlightTerms } from "../../components/AuditHighlighter";
import { getChapters, getChapter, getAdjacentChapters, getNovelMeta } from "../../lib/supabase";
import { useReadingProgress } from "../../lib/useReadingProgress";

export async function getStaticPaths() {
  try {
    const chapters = await getChapters();
    const paths = chapters.map((ch) => ({
      params: { id: String(ch.chapter_number) },
    }));
    return { paths, fallback: "blocking" };
  } catch {
    return { paths: [], fallback: "blocking" };
  }
}

export async function getStaticProps({ params }) {
  try {
    const chapterNumber = Number(params.id);
    const [meta, chapter, adjacent] = await Promise.all([
      getNovelMeta(),
      getChapter(chapterNumber),
      getAdjacentChapters(chapterNumber),
    ]);
    if (!chapter) return { notFound: true };
    return {
      props: { meta, chapter, prev: adjacent.prev, next: adjacent.next },
      revalidate: 60,
    };
  } catch {
    return { notFound: true };
  }
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min((scrolled / total) * 100, 100) : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-transparent">
      <div
        className="h-full bg-accent transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default function ChapterPage({ meta, chapter, prev, next }) {
  const [auditMode, setAuditMode] = useState(false);
  const [styleOverride, setStyleOverride] = useState(null);
  const { markRead } = useReadingProgress();

  useEffect(() => {
    if (chapter) markRead(chapter.chapter_number);
  }, [chapter, markRead]);

  // Reset style override when navigating to a new chapter
  useEffect(() => {
    setStyleOverride(null);
  }, [chapter?.chapter_number]);

  const handleStyleChange = useCallback((data) => {
    setStyleOverride(data);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!chapter) return null;

  const displayContent = styleOverride?.content || chapter.content;
  const displayCodeFooter = styleOverride?.code_footer ?? chapter.code_footer;
  const paragraphs = displayContent.split("\n\n");

  return (
    <>
      <Head>
        <title>{chapter.title} — {meta.title}</title>
      </Head>

      <ScrollProgress />

      <Layout novelTitle={meta.title}>
        <article className="py-12 md:py-20 px-5">
          <div className="max-w-[70ch] mx-auto">
            {/* Chapter header */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs tracking-[0.25em] uppercase text-muted mb-2">
                    Chapter {String(chapter.chapter_number).padStart(2, "0")}
                  </p>
                  <h1 className="text-2xl md:text-3xl font-bold text-primary">
                    {chapter.title}
                  </h1>
                </div>
                <AuditToggle
                  enabled={auditMode}
                  onToggle={() => setAuditMode((m) => !m)}
                />
              </div>

              {/* Style selector */}
              <StyleSelector
                chapterNumber={chapter.chapter_number}
                onStyleChange={handleStyleChange}
              />
            </div>

            {/* Prose */}
            <div className="prose-content space-y-5 text-[17px] leading-[1.9] text-body mt-10">
              {paragraphs.map((para, i) => {
                if (!para.trim()) return null;

                const isInlineCode = para.startsWith("`") && para.endsWith("`");
                if (isInlineCode) {
                  return (
                    <p key={i}>
                      <code className="text-accent text-sm bg-surface-alt px-1.5 py-0.5 rounded font-mono">
                        {para.slice(1, -1)}
                      </code>
                    </p>
                  );
                }

                const hasDialogue = /[""\u201C\u201D]/.test(para);

                return (
                  <p key={i} className={hasDialogue ? "text-body-emphasis" : ""}>
                    {auditMode ? highlightTerms(para) : para}
                  </p>
                );
              })}
            </div>

            {/* Code footer */}
            <CodeFooter code={displayCodeFooter} />

            {/* Navigation */}
            <nav className="mt-16 pt-8 border-t border-border flex items-center justify-between gap-4">
              {prev ? (
                <Link
                  href={`/chapter/${prev.chapter_number}`}
                  className="group flex flex-col items-start text-sm"
                >
                  <span className="text-[10px] uppercase tracking-wider text-muted mb-1">Previous</span>
                  <span className="text-secondary group-hover:text-accent transition-colors">
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  href={`/chapter/${next.chapter_number}`}
                  className="group flex flex-col items-end text-sm text-right"
                >
                  <span className="text-[10px] uppercase tracking-wider text-muted mb-1">Next</span>
                  <span className="text-secondary group-hover:text-accent transition-colors">
                    {next.title}
                  </span>
                </Link>
              ) : (
                <div className="text-xs text-muted italic">You're caught up.</div>
              )}
            </nav>
          </div>
        </article>
      </Layout>
    </>
  );
}
