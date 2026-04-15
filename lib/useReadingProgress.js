import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "novel_reading_progress";

function getProgress() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function useReadingProgress() {
  const [progress, setProgress] = useState({});

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const markRead = useCallback((novelSlug, chapterNumber) => {
    setProgress((prev) => {
      const novelProgress = prev[novelSlug] || {};
      const next = {
        ...prev,
        [novelSlug]: {
          ...novelProgress,
          [chapterNumber]: { read: true, lastRead: Date.now() },
        },
      };
      saveProgress(next);
      return next;
    });
  }, []);

  const getLastRead = useCallback(
    (novelSlug) => {
      const novelProgress = progress[novelSlug];
      if (!novelProgress) return null;
      const entries = Object.entries(novelProgress);
      if (entries.length === 0) return null;
      const sorted = entries.sort((a, b) => (b[1].lastRead || 0) - (a[1].lastRead || 0));
      return Number(sorted[0][0]);
    },
    [progress]
  );

  const isRead = useCallback(
    (novelSlug, chapterNumber) => !!progress[novelSlug]?.[chapterNumber]?.read,
    [progress]
  );

  return { markRead, getLastRead, isRead };
}
