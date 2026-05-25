import { useEffect, useState, useCallback, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import CodeFooter from "../components/CodeFooter";
import StyleSelector from "../components/StyleSelector";
import { AuditToggle, highlightTerms } from "../components/AuditHighlighter";
import ReaderSettings from "../components/ReaderSettings";
import HeroImage from "../components/HeroImage";
import ChapterComments from "../components/ChapterComments";
import ChoicePrompt from "../components/ChoicePrompt";
import EndingPicker from "../components/EndingPicker";
import SomaticBleed from "../components/animations/SomaticBleed";
import { CHOICE_CHAPTERS } from "../lib/choices";
import {
  getNovelBySlug,
  getChaptersByNovel,
  getChapter,
  getAdjacentChapters,
  SUPPORTED_LANGUAGES,
  LENGTH_VARIANTS,
} from "../lib/supabase";
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

function useRestyle(chapterId, settings, activeStyle, language) {
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
  }, [chapterId, settings.ai_theme, settings.ai_length, activeStyle, language]);

  return { data, loading, error };
}

const SLUG = "the-senior-observer";

export async function getStaticPaths() {
  try {
    const novel = await getNovelBySlug(SLUG);
    if (!novel) return { paths: [], fallback: "blocking" };
    const chapters = await getChaptersByNovel(novel.id, "en");
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
    // Fetch every DB variant we may serve: language toggles + length variants.
    const codes = Array.from(
      new Set([
        ...SUPPORTED_LANGUAGES.map((l) => l.code),
        ...Object.values(LENGTH_VARIANTS).flatMap((v) => Object.values(v.langCodes)),
      ])
    );
    const [chapters, adjs] = await Promise.all([
      Promise.all(codes.map((c) => getChapter(novel.id, chapterNumber, c))),
      Promise.all(codes.map((c) => getAdjacentChapters(novel.id, chapterNumber, c))),
    ]);
    const chapterByLang = Object.fromEntries(codes.map((c, i) => [c, chapters[i]]));
    const adjByLang = Object.fromEntries(codes.map((c, i) => [c, adjs[i]]));
    if (!Object.values(chapterByLang).some(Boolean)) return { notFound: true };
    return {
      props: {
        novel,
        chapterByLang,
        adjByLang,
        chapterNumber,
      },
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

function LanguageToggle({ language, setLanguage, available }) {
  return (
    <div className="inline-flex rounded-lg border border-border overflow-hidden text-xs">
      {SUPPORTED_LANGUAGES.map((opt) => {
        const has = available[opt.code];
        const active = language === opt.code;
        return (
          <button
            key={opt.code}
            onClick={() => has && setLanguage(opt.code)}
            disabled={!has}
            className={[
              "px-3 py-1.5 transition-colors",
              active ? "bg-accent text-white" : "bg-transparent text-secondary hover:text-primary",
              !has ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
            ].join(" ")}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function ChapterVideo({ number }) {
  const ch = String(number).padStart(2, "0");
  const [error, setError] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    // Belt-and-suspenders muted setup: iOS Safari + React occasionally drop
    // the `muted` attribute, which makes autoplay get rejected.
    el.muted = true;
    el.defaultMuted = true;
    el.setAttribute("muted", "");
    el.setAttribute("playsinline", "");

    const tryPlay = () => {
      const p = el.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => setNeedsTap(true));
      }
    };
    tryPlay();
    // Some mobile browsers only resolve play() after metadata loads.
    el.addEventListener("loadedmetadata", tryPlay);
    return () => el.removeEventListener("loadedmetadata", tryPlay);
  }, [ch]);

  function manualPlay() {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    el.play().then(() => setNeedsTap(false)).catch(() => {});
  }

  if (error) return null;
  return (
    <div className="relative mt-2 mb-4 rounded-xl overflow-hidden bg-black ring-1 ring-border/40 shadow-lg">
      <video
        ref={videoRef}
        key={ch}
        src={`/videos/ch${ch}.mp4`}
        poster={`/videos/ch${ch}.jpg`}
        autoPlay
        muted
        defaultMuted
        loop
        playsInline
        preload="auto"
        onError={() => setError(true)}
        className="w-full h-auto block aspect-video object-cover"
      />
      {needsTap && (
        <button
          type="button"
          onClick={manualPlay}
          aria-label="Play video"
          className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
        >
          <span className="w-14 h-14 rounded-full bg-white/90 text-black flex items-center justify-center shadow-lg">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="6,4 20,12 6,20" /></svg>
          </span>
        </button>
      )}
    </div>
  );
}

function ChapterNav({ prev, next }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 md:py-4">
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

export default function ChapterPage({ novel, chapterByLang, adjByLang, chapterNumber }) {
  const [auditMode, setAuditMode] = useState(false);
  const [styleOverride, setStyleOverride] = useState(null);
  const [activeStyleKey, setActiveStyleKey] = useState("original");
  const available = Object.fromEntries(
    SUPPORTED_LANGUAGES.map((l) => [l.code, !!chapterByLang[l.code]])
  );
  const [language, setLanguageState] = useState(() => {
    const first = SUPPORTED_LANGUAGES.find((l) => available[l.code]);
    return first ? first.code : "en";
  });
  const { markRead } = useReadingProgress();
  const { variables, interpolate, requestLocation, locationRequested, settings, updateSetting } = useReaderVariables(novel.variables || {});

  // Hydrate user language preference from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("novel.lang");
    if (saved && available[saved]) setLanguageState(saved);
  }, [chapterNumber]); // eslint-disable-line react-hooks/exhaustive-deps

  const setLanguage = useCallback((lang) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") window.localStorage.setItem("novel.lang", lang);
  }, []);

  // Resolve the actual DB language code from (UI language) + (reading length).
  const lengthVariant = LENGTH_VARIANTS[settings.reading_length] || LENGTH_VARIANTS.standard;
  const resolvedCode = lengthVariant.langCodes[language] || language;
  const chapter =
    chapterByLang[resolvedCode] || chapterByLang[language] || chapterByLang.en || chapterByLang.zh;
  const adj =
    (adjByLang[resolvedCode] && (adjByLang[resolvedCode].prev || adjByLang[resolvedCode].next) && adjByLang[resolvedCode]) ||
    (adjByLang[language] && (adjByLang[language].prev || adjByLang[language].next) && adjByLang[language]) ||
    adjByLang.en ||
    adjByLang.zh ||
    { prev: null, next: null };
  const restyle = useRestyle(chapter?.id, settings, activeStyleKey, language);

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
        <article className="py-3 md:py-10 px-4">
          <div className="max-w-[70ch] mx-auto">
            <ChapterNav prev={adj.prev} next={adj.next} />

            <div className="mt-3 mb-4 md:mt-6 md:mb-8 border-b border-border pb-4 md:pb-6">
              <p className="text-[11px] tracking-wider uppercase text-muted mb-1.5">
                {novel.title}
              </p>
              <h1 className="text-xl md:text-2xl font-bold text-primary amber-flicker">
                {language === "zh" ? "第" : "Chapter "}{chapter.chapter_number}{language === "zh" ? "章: " : ": "}{chapter.title}
              </h1>

              <div className="flex items-center justify-between gap-3 mt-3 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  <LanguageToggle language={language} setLanguage={setLanguage} available={available} />
                </div>
                <div className="flex items-center gap-2">
                  <ReaderSettings
                    variables={variables}
                    settings={settings}
                    updateSetting={updateSetting}
                    locationRequested={locationRequested}
                    requestLocation={requestLocation}
                    autoOpen={false}
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

            <ChapterVideo number={chapter.chapter_number} />

            <div className={`prose-content space-y-5 text-[17px] leading-[1.9] text-body ${language === "zh" ? "prose-zh" : ""}`}>
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

                const hasDialogue = /[""“”]/.test(para);
                const isAmberMention = /amber|580\s*nm|scorched sage|琥珀|焦艾草/i.test(para);

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

            {CHOICE_CHAPTERS.includes(chapter.chapter_number) && (
              <ChoicePrompt chapterNumber={chapter.chapter_number} />
            )}

            {chapter.chapter_number === 20 && <EndingPicker />}

            {chapter.chapter_number === 20 && (
              <div className="mt-12 rounded-xl border border-accent/40 bg-accent/[0.06] p-6 text-center">
                <div className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">
                  Aion v5 — Compile Complete
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Generate your partition log
                </h3>
                <p className="text-sm text-secondary mb-5 max-w-md mx-auto leading-relaxed">
                  Six choices made. The system rendered six paths.
                  Read your alignment between Singleton and Sandbox — and share it.
                </p>
                <Link
                  href="/receipt"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent/15 border border-accent/50 text-sm font-medium text-accent hover:bg-accent/25 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="15" y2="17" />
                  </svg>
                  View receipt
                </Link>
              </div>
            )}

            <ChapterComments
              novelId={novel.id}
              chapterNumber={chapter.chapter_number}
              language={language}
            />

            <div className="mt-12 border-t border-border">
              <ChapterNav prev={adj.prev} next={adj.next} />
              {!adj.next && (
                <p className="text-center text-xs text-muted py-4 italic">
                  {language === "zh"
                    ? "你已经读到最后一章。"
                    : "You've reached the latest chapter. Check back for updates."}
                </p>
              )}
            </div>
          </div>
        </article>
      </Layout>
    </>
  );
}
