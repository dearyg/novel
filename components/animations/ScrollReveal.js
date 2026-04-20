import { useEffect, useRef, useState } from "react";

export default function ScrollReveal({ children, className = "", delay = 0, stagger = false }) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setRevealed(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const cls = stagger
    ? `stagger-children ${revealed ? "revealed" : ""} ${className}`
    : `reveal-on-scroll ${revealed ? "revealed" : ""} ${className}`;

  return (
    <div ref={ref} className={cls} style={delay && !stagger ? { animationDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}
