import { useMemo } from "react";

const TOKENS = [
  "if", "else", "return", "void", "null", "true", "false",
  "0x01", "0xFF", "{}", "[]", "=>", "&&", "||", "!=",
  "throw", "catch", "new", "this", "async", "await",
  "Observer", "Singleton", "Partition", "Cache", "Leak",
  "::merge", "fork()", ".next()", "yield", "break",
  "2", "3", "5", "7", "11", "13",
];

export default function CodeRain({ count = 20 }) {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      token: TOKENS[Math.floor(Math.random() * TOKENS.length)],
      left: `${Math.random() * 100}%`,
      duration: `${6 + Math.random() * 8}s`,
      delay: `${Math.random() * 10}s`,
      opacity: 0.08 + Math.random() * 0.15,
    })), [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="code-particle"
          style={{
            left: p.left,
            "--fall-duration": p.duration,
            "--fall-delay": p.delay,
            opacity: undefined,
            maxWidth: "none",
            filter: `brightness(${0.5 + Math.random() * 0.5})`,
          }}
        >
          {p.token}
        </span>
      ))}
    </div>
  );
}
