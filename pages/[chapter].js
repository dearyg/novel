import { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import CodeFooter from "../components/CodeFooter";
import StyleSelector from "../components/StyleSelector";
import { AuditToggle, highlightTerms } from "../components/AuditHighlighter";
import ReaderSettings from "../components/ReaderSettings";
import { getNovelBySlug, getChaptersByNovel, getChapter, getAdjacentChapters } from "../lib/supabase";
import { useReadingProgress } from "../lib/useReadingProgress";
import { useReaderVariables } from "../lib/useReaderVariables";

const SLUG = "the-senior-observer";

export async function getStaticPaths() {
  try {
    const novel = await getNovelBySlug(SLUG);
    if (!novel) return { paths: [], fallback: "blocking" };
    const chapters = await getChaptersByNovel(novel.id);
    return {
      paths: chapters.map((ch) => ({ params: { chapter: String(ch.chapter_number) } })),
      fallback: "blocking",
    };
  } catch {
    return { paths: [], fallback: "blocking" };
  }
}

export async function getStaticProps({ params }) {
  try {
    const novel = await getNovelBySlug(SLUG);
    if (!novel) return { notFound: true };
    const chapterNumber = Number(params.chapter);
    const [chapter, adjacent] = await Promise.all([
      getChapter(novel.id, chapterNumber),
      getAdjacentChapters(novel.id, chapterNumber),
    ]);
    if (!chapter) return { notFound: true };
    return {
      props: { novel, chapter, prev: adjacent.prev, next: adjacent.next },
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
    <div className="fixed top-14 left-0 right-0 z-30 h-0.5 bg-transparent">
      <div className="h-full bg-accent transition-[width] duration-150" style={{ width: `${progress}%` }} />
    </div>
  );
}

function ChapterNav({ prev, next }) {
  return (
    <div className="flex items-center justify-between gap-3 py-4">
      {prev ? (
        <Link
          href={`/${prev.chapter_number}`}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-secondary hover:text-primary hover:border-accent/30 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          <span className="hidden sm:inline">Prev</span>
        </Link>
      ) : <div />}

      <Link
        href="/"
        className="px-4 py-2 rounded-lg border border-border text-xs text-muted hover:text-primary hover:border-accent/30 transition-colors"
      >
        Contents
      </Link>

      {next ? (
        <Link
          href={`/${next.chapter_number}`}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-secondary hover:text-primary hover:border-accent/30 transition-colors"
        >
          <span className="hidden sm:inline">Next</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        </Link>
      ) : <div />}
    </div>
  );
}

export default function ChapterPage({ novel, chapter, prev, next }) {
  const [auditMode, setAuditMode] = useState(false);
  const [styleOverride, setStyleOverride] = useState(null);
  const { markRead } = useReadingProgress();
  const { variables, interpolate, requestLocation, locationRequested, settings, updateSetting } = useReaderVariables(novel.variables || {});

  useEffect(() => {
    if (chapter) markRead(novel.slug, chapter.chapter_number);
  }, [novel.slug, chapter, markRead]);

  useEffect(() => {
    setStyleOverride(null);
  }, [chapter?.id]);

  const handleStyleChange = useCallback((data) => {
    setStyleOverride(data);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!chapter) return null;

  const rawContent = styleOverride?.content || chapter.content;
  const rawCodeFooter = styleOverride?.code_footer ?? chapter.code_footer;
  const displayContent = interpolate(rawContent);
  const displayCodeFooter = interpolate(rawCodeFooter);
  const paragraphs = displayContent.split("\n\n");

  return (
    <>
      <Head>
        <title>{chapter.title} — {novel.title}</title>
      </Head>

      <ScrollProgress />

      <Layout>
        <article className="py-6 md:py-10 px-4">
          <div className="max-w-[70ch] mx-auto">
            <ChapterNav prev={prev} next={next} />

            <div className="mt-6 mb-8 border-b border-border pb-6">
              <p className="text-[11px] tracking-wider uppercase text-muted mb-1.5">
                {novel.title}
              </p>
              <h1 className="text-xl md:text-2xl font-bold text-primary">
                Chapter {chapter.chapter_number}: {chapter.title}
              </h1>

              <div className="flex items-center justify-between gap-3 mt-4 flex-wrap">
                <StyleSelector chapterId={chapter.id} onStyleChange={handleStyleChange} />
                <div className="flex items-center gap-2">
                  <ReaderSettings
                    variables={variables}
                    settings={settings}
                    updateSetting={updateSetting}
                    locationRequested={locationRequested}
                    requestLocation={requestLocation}
                    autoOpen={!locationRequested}
                  />
                  <AuditToggle enabled={auditMode} onToggle={() => setAuditMode((m) => !m)} />
                </div>
              </div>

              {variables.user_location && (
                <div className="mt-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-accent/5 border border-accent/20 text-[11px] text-accent">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  Localized: reading as if Kael is in {variables.user_location}, near {variables.user_landmark}
                </div>
              )}
            </div>

            <div className="prose-content space-y-5 text-[17px] leading-[1.9] text-body">
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

            <CodeFooter code={displayCodeFooter} />

            <div className="mt-12 border-t border-border">
              <ChapterNav prev={prev} next={next} />
              {!next && (
                <p className="text-center text-xs text-muted py-4 italic">
                  You've reached the latest chapter. Check back for updates.
                </p>
              )}
            </div>
          </div>
        </article>
      </Layout>
    </>
  );
}
