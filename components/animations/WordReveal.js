import { useEffect, useRef, useState } from "react";

export default function WordReveal({ text, className = "", delay = 0, stagger = 60 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <span ref={ref} className={`word-reveal ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            animationDelay: visible ? `${delay + i * stagger}ms` : "0ms",
            animationPlayState: visible ? "running" : "paused",
          }}
        >
          {word}{i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}
