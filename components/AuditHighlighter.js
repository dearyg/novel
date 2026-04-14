import { useState } from "react";
import AUDIT_TERMS from "../lib/auditTerms";

function Tooltip({ children, text }) {
  const [show, setShow] = useState(false);

  return (
    <span
      className="relative inline cursor-help border-b border-dashed border-highlight text-highlight font-medium"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 rounded-lg border border-border bg-surface p-3 text-xs text-secondary shadow-xl z-50 leading-relaxed pointer-events-none">
          <span className="font-semibold text-primary block mb-1">{children}</span>
          {text}
        </span>
      )}
    </span>
  );
}

export function highlightTerms(text) {
  const parts = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    let earliest = null;
    let earliestIndex = Infinity;

    for (const { term, tip } of AUDIT_TERMS) {
      const idx = remaining.toLowerCase().indexOf(term.toLowerCase());
      if (idx !== -1 && idx < earliestIndex) {
        earliest = { term, tip, index: idx, matchedText: remaining.slice(idx, idx + term.length) };
        earliestIndex = idx;
      }
    }

    if (!earliest) {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }

    if (earliest.index > 0) {
      parts.push(<span key={key++}>{remaining.slice(0, earliest.index)}</span>);
    }

    parts.push(
      <Tooltip key={key++} text={earliest.tip}>
        {earliest.matchedText}
      </Tooltip>
    );

    remaining = remaining.slice(earliest.index + earliest.term.length);
  }

  return parts;
}

export function AuditToggle({ enabled, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border text-xs text-secondary hover:text-primary transition-colors"
      title="Highlight technical terms with tooltips"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <span>Audit</span>
      <span className={`inline-block w-2 h-2 rounded-full ${enabled ? "bg-accent" : "bg-muted"}`} />
    </button>
  );
}
