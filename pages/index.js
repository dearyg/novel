import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import ChapterList from "../components/ChapterList";
import { getNovelMeta, getChapters, getWritingStyles } from "../lib/supabase";
import { useReadingProgress } from "../lib/useReadingProgress";

export async function getStaticProps() {
  try {
    const [meta, chapters, styles] = await Promise.all([
      getNovelMeta(),
      getChapters(),
      getWritingStyles(),
    ]);
    return { props: { meta, chapters, styles }, revalidate: 60 };
  } catch {
    return {
      props: {
        meta: { title: "Novel", tagline: "", description: "" },
        chapters: [],
        styles: [],
      },
      revalidate: 60,
    };
  }
}

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "AI-Evolved Writing",
    desc: "Writers provide the plot and story beats. AI refines the prose across multiple passes — each iteration sharper, richer, more alive.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    title: "Choose Your Style",
    desc: "Read any chapter in different writing styles — literary, concise, cinematic, and more. Same story, different voice. You pick.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: "Audit Mode",
    desc: "Toggle on technical annotations. Hover over highlighted terms to see their real-world CS definitions mapped to the story.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "Code Epilogues",
    desc: "Every chapter ends with a syntax-highlighted code block — the story's themes expressed as executable metaphor.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "Reading Progress",
    desc: "Your progress is tracked locally. Pick up where you left off — no account needed.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Open & Free",
    desc: "Built with Next.js and Supabase. Fully open, free to read, and deployed on the edge via Vercel.",
  },
];

export default function Home({ meta, chapters, styles }) {
  const { getLastRead } = useReadingProgress();
  const lastRead = getLastRead();
  const continueChapter = lastRead || (chapters.length > 0 ? chapters[0].chapter_number : null);

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.tagline || meta.title} />
      </Head>

      <Layout novelTitle={meta.title}>
        {/* Hero */}
        <section className="py-24 md:py-36 px-5">
          <div className="max-w-2xl mx-auto text-center">
            {meta.tagline && (
              <p className="text-xs tracking-[0.25em] uppercase text-accent mb-6 font-medium">
                {meta.tagline}
              </p>
            )}
            <h1 className="text-3xl md:text-5xl font-bold text-primary leading-tight">
              {meta.title}
            </h1>
            {meta.author && (
              <p className="text-secondary text-sm mt-4">by {meta.author}</p>
            )}
            {meta.description && (
              <p className="text-secondary text-sm mt-6 max-w-lg mx-auto leading-relaxed">
                {meta.description}
              </p>
            )}

            <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
              {continueChapter && (
                <Link
                  href={`/chapter/${continueChapter}`}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  {lastRead ? "Continue Reading" : "Start Reading"}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              )}
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-border text-sm text-secondary hover:text-primary hover:border-primary/30 transition-colors"
              >
                How it works
              </a>
            </div>

            {/* Stats bar */}
            <div className="mt-14 flex items-center justify-center gap-8 text-xs text-muted">
              <div>
                <span className="block text-lg font-semibold text-primary">{chapters.length}</span>
                Chapters
              </div>
              <div className="w-px h-8 bg-border" />
              <div>
                <span className="block text-lg font-semibold text-primary">{styles.length + 1}</span>
                Styles
              </div>
              <div className="w-px h-8 bg-border" />
              <div>
                <span className="block text-lg font-semibold text-accent">AI</span>
                Powered
              </div>
            </div>
          </div>
        </section>

        {/* How It Works — feature showcase */}
        <section id="features" className="py-20 px-5 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.25em] uppercase text-accent mb-3 font-medium">
                Platform Features
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-primary">
                AI + Human Creativity
              </h2>
              <p className="text-secondary text-sm mt-4 max-w-md mx-auto leading-relaxed">
                Writers focus on plot and characters. AI handles the craft of prose — and readers choose how they want to experience it.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((f, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-surface p-6 hover:border-accent/30 transition-colors"
                >
                  <div className="text-accent mb-4">{f.icon}</div>
                  <h3 className="text-sm font-semibold text-primary mb-2">{f.title}</h3>
                  <p className="text-xs text-secondary leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Style Preview */}
        {styles.length > 0 && (
          <section className="py-20 px-5 border-t border-border">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-xs tracking-[0.25em] uppercase text-accent mb-3 font-medium">
                  Writing Styles
                </p>
                <h2 className="text-2xl font-bold text-primary">
                  One Story, Multiple Voices
                </h2>
                <p className="text-secondary text-sm mt-3">
                  Switch styles on any chapter to find the voice that resonates with you.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {styles.map((s) => (
                  <div
                    key={s.style_key}
                    className="rounded-lg border border-border bg-surface p-5 text-center"
                  >
                    <h3 className="text-sm font-semibold text-primary mb-1">{s.label}</h3>
                    <p className="text-xs text-muted leading-relaxed">{s.description}</p>
                  </div>
                ))}
                <div className="rounded-lg border border-dashed border-border bg-surface-alt/50 p-5 text-center flex flex-col items-center justify-center">
                  <h3 className="text-sm font-semibold text-muted mb-1">+ Original</h3>
                  <p className="text-xs text-muted leading-relaxed">The default author voice</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Chapter List */}
        <section className="py-20 px-5 border-t border-border">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs tracking-[0.25em] uppercase text-accent mb-3 font-medium">
                Chapters
              </p>
              <h2 className="text-2xl font-bold text-primary">
                Table of Contents
              </h2>
            </div>
            {chapters.length > 0 ? (
              <ChapterList chapters={chapters} />
            ) : (
              <p className="text-secondary text-sm text-center">No chapters published yet.</p>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
}
