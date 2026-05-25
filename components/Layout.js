import Link from "next/link";
import { useTheme } from "../lib/useTheme";

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Layout({ children }) {
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-14">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <span className="flex items-baseline gap-1.5">
              <span className="text-sm font-bold text-primary">The Singleton</span>
              <span className="text-[10px] text-muted hidden sm:inline">Life of an SDE</span>
            </span>
          </Link>

          <nav className="hidden sm:flex items-center gap-6 text-sm text-secondary">
            <Link href="/#chapters" className="hover:text-primary transition-colors">Chapters</Link>
            <Link href="/#ai-features" className="hover:text-primary transition-colors">AI Features</Link>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="https://buymeacoffee.com/dearyg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/40 text-[12px] font-semibold text-amber-300 hover:text-amber-200 transition-colors shadow-sm"
              aria-label="Buy me a coffee"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M5 8h14a1 1 0 0 1 1 1v1a4 4 0 0 1-4 4h-.18A4 4 0 0 1 12 17a4 4 0 0 1-3.82-3H8a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1zm14 1v1a3 3 0 0 1-2.13 2.87A4 4 0 0 0 17 12V9zM7 19h10a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2z" />
              </svg>
              <span className="hidden sm:inline">Buy me a coffee</span>
              <span className="sm:hidden">☕</span>
            </a>
            <button
              onClick={toggle}
              className="p-2 rounded-lg text-secondary hover:text-primary hover:bg-surface-alt transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-surface py-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-accent/20 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              &copy; {new Date().getFullYear()} Homer
            </div>
            <span className="hidden sm:inline text-border">|</span>
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <span className="hidden sm:inline text-border">|</span>
            <a
              href="https://buymeacoffee.com/dearyg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-accent/10 hover:bg-accent/20 text-accent transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M5 8h14a1 1 0 0 1 1 1v1a4 4 0 0 1-4 4h-.18A4 4 0 0 1 12 17a4 4 0 0 1-3.82-3H8a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1zm14 1v1a3 3 0 0 1-2.13 2.87A4 4 0 0 0 17 12V9zM7 19h10a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2z" />
              </svg>
              Buy me a coffee
            </a>
          </div>
          <p className="hidden sm:block">A techno-existential thriller. AI-enhanced reading experience.</p>
        </div>
      </footer>
    </div>
  );
}
