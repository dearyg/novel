import { useEffect, useState, useCallback, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import CodeFooter from "../components/CodeFooter";
import StyleSelector from "../components/StyleSelector";
import { AuditToggle, highlightTerms } from "../components/AuditHighlighter";
import ReaderSettings from "../components/ReaderSettings";
import HeroImage from "../components/HeroImage";
import SomaticBleed from "../components/animations/SomaticBleed";
import { getNovelBySlug, getChaptersByNovel, getChapter, getAdjacentChapters } from "../lib/supabase";
import { useReadingProgress } from "../lib/useReadingProgress";
import { useReaderVariables } from "../lib/useReaderVariables";

function ProseReveal({ children, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`prose-reveal ${visible ? "visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

function useRestyle(chapterId, settings, activeStyle) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  useEffect(() => {
    const theme = settings.ai_theme;
    if (!theme) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    const length = settings.ai_length || "standard";
    const style = activeStyle || "original";

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    fetch("/api/restyle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chapterId, theme, length, style }),
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Restyle failed");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [chapterId, settings.ai_theme, settings.ai_length, activeStyle]);

  return { data, loading, error };
}

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
  const [activeStyleKey, setActiveStyleKey] = useState("original");
  const { markRead } = useReadingProgress();
  const { variables, interpolate, requestLocation, locationRequested, settings, updateSetting } = useReaderVariables(novel.variables || {});

  const restyle = useRestyle(chapter?.id, settings, activeStyleKey);

  useEffect(() => {
    if (chapter) markRead(novel.slug, chapter.chapter_number);
  }, [novel.slug, chapter, markRead]);

  useEffect(() => {
    setStyleOverride(null);
    setActiveStyleKey("original");
  }, [chapter?.id]);

  const handleStyleChange = useCallback((data, styleKey) => {
    setStyleOverride(data);
    setActiveStyleKey(styleKey || "original");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!chapter) return null;

  const aiContent = restyle.data && !restyle.loading ? restyle.data : null;
  const rawContent = aiContent?.content || styleOverride?.content || chapter.content;
  const rawCodeFooter = aiContent?.code_footer ?? styleOverride?.code_footer ?? chapter.code_footer;
  const displayContent = interpolate(rawContent);
  const displayCodeFooter = interpolate(rawCodeFooter);
  const paragraphs = displayContent.split("\n\n");

  return (
    <>
      <Head>
        <title>{chapter.title} — {novel.title}</title>
      </Head>

      <ScrollProgress />
      <SomaticBleed />

      <Layout>
        <article className="py-6 md:py-10 px-4">
          <div className="max-w-[70ch] mx-auto">
            <ChapterNav prev={prev} next={next} />

            <div className="mt-6 mb-8 border-b border-border pb-6">
              <p className="text-[11px] tracking-wider uppercase text-muted mb-1.5">
                {novel.title}
              </p>
              <h1 className="text-xl md:text-2xl font-bold text-primary amber-flicker">
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

            <HeroImage
              chapterNumber={chapter.chapter_number}
              theme={settings.ai_theme}
              defaultSrc={`/images/chapters/ch${chapter.chapter_number}.webp`}
            />

            {restyle.loading && (
              <div className="flex items-center gap-3 px-4 py-3 mb-6 rounded-lg bg-accent/5 border border-accent/20">
                <div className="w-4 h-4 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                <span className="text-xs text-accent">Restyling chapter with AI...</span>
              </div>
            )}
            {restyle.error && (
              <div className="flex items-center gap-3 px-4 py-3 mb-6 rounded-lg bg-rose/5 border border-rose/20">
                <span className="text-xs text-rose">Restyle failed. Showing original.</span>
              </div>
            )}

            <div className="prose-content space-y-5 text-[17px] leading-[1.9] text-body">
              {paragraphs.map((para, i) => {
                if (!para.trim()) return null;

                const isInlineCode = para.startsWith("`") && para.endsWith("`");
                if (isInlineCode) {
                  return (
                    <ProseReveal key={i}>
                      <p>
                        <code className="text-accent text-sm bg-surface-alt px-1.5 py-0.5 rounded font-mono">
                          {para.slice(1, -1)}
                        </code>
                      </p>
                    </ProseReveal>
                  );
                }

                const hasDialogue = /[""\u201C\u201D]/.test(para);
                const isAmberMention = /amber|580\s*nm|scorched sage/i.test(para);

                return (
                  <ProseReveal key={i}>
                    <p className={`${hasDialogue ? "text-body-emphasis" : ""} ${isAmberMention ? "amber-flicker" : ""}`} style={isAmberMention ? { "--flicker-delay": `${i * 0.3}s` } : undefined}>
                      {auditMode ? highlightTerms(para) : para}
                    </p>
                  </ProseReveal>
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
