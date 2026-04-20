import { useEffect, useState } from "react";

export default function SomaticBleed({ active = true, interval = 25000 }) {
  const [bleeding, setBleeding] = useState(false);

  useEffect(() => {
    if (!active) return;
    const trigger = () => {
      setBleeding(true);
      setTimeout(() => setBleeding(false), 2500);
    };
    const timer = setInterval(trigger, interval);
    const initial = setTimeout(trigger, 3000);
    return () => { clearInterval(timer); clearTimeout(initial); };
  }, [active, interval]);

  if (!bleeding) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50" aria-hidden="true">
      {/* Amber 580nm flash */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(220, 160, 30, 0.08) 0%, transparent 70%)",
          animation: "somatic-pulse 2.5s ease-in-out forwards",
        }}
      />
      {/* Scan line */}
      <div
        className="absolute left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(220, 160, 30, 0.6), transparent)",
          boxShadow: "0 0 20px 4px rgba(220, 160, 30, 0.3)",
          animation: "somatic-scan 2.5s ease-in-out forwards",
        }}
      />
    </div>
  );
}
