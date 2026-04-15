import Link from "next/link";
import { useReadingProgress } from "../lib/useReadingProgress";

export default function ChapterList({ chapters, novelSlug }) {
  const { isRead, getLastRead } = useReadingProgress();
  const lastRead = getLastRead(novelSlug);

  return (
    <div className="space-y-2">
      {chapters.map((ch) => {
        const read = isRead(novelSlug, ch.chapter_number);
        const isContinue = ch.chapter_number === lastRead;

        return (
          <Link
            key={ch.id}
            href={`/novel/${novelSlug}/${ch.chapter_number}`}
            className="group flex items-center gap-4 px-4 py-3 rounded-lg border border-transparent hover:border-border hover:bg-surface-alt transition-all"
          >
            <span className="text-xs font-mono text-muted w-8 shrink-0">
              {String(ch.chapter_number).padStart(2, "0")}
            </span>
            <span className="flex-1 text-sm text-primary group-hover:text-accent transition-colors">
              {ch.title}
            </span>
            <span className="flex items-center gap-2">
              {isContinue && (
                <span className="text-[10px] uppercase tracking-wider text-accent font-semibold px-2 py-0.5 rounded bg-accent/10">
                  Continue
                </span>
              )}
              {read && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
