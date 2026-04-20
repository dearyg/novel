import { useMemo } from "react";

export default function AmbientParticles({ count = 12 }) {
  const dots = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${10 + Math.random() * 80}%`,
      bottom: `${Math.random() * 40}%`,
      duration: `${3 + Math.random() * 4}s`,
      delay: `${Math.random() * 6}s`,
      size: `${2 + Math.random() * 3}px`,
    })), [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {dots.map((d) => (
        <div
          key={d.id}
          className="ambient-dot"
          style={{
            left: d.left,
            bottom: d.bottom,
            width: d.size,
            height: d.size,
            "--float-duration": d.duration,
            "--float-delay": d.delay,
          }}
        />
      ))}
    </div>
  );
}
