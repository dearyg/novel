/**
 * Minimal markdown renderer for blueprint and meta-doc viewing.
 * Handles: headings (h1-h4), paragraphs, code blocks (fenced),
 * blockquotes, lists (- and 1.), inline `code`, **bold**, *italic*,
 * [links](url), horizontal rules, simple pipe tables.
 *
 * Not a full MD parser — purpose-built for the project's docs.
 */

import { useMemo } from "react";

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function inlineFormat(text) {
  let out = escapeHtml(text);
  // inline code first (so subsequent regexes don't match inside it)
  out = out.replace(/`([^`]+)`/g, '<code class="text-accent text-[0.92em] bg-surface-alt px-1.5 py-0.5 rounded font-mono">$1</code>');
  // bold
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-primary">$1</strong>');
  // italic (avoid matching inside bold leftovers; simple version)
  out = out.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  out = out.replace(/(^|[^_])_([^_\n]+)_/g, '$1<em>$2</em>');
  // links
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-accent underline hover:text-accent-hover" target="_blank" rel="noopener noreferrer">$1</a>');
  return out;
}

function renderMarkdown(md) {
  const lines = (md || "").replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let i = 0;

  const flushParagraph = (buf) => {
    if (!buf.length) return;
    const joined = buf.join(" ").trim();
    if (joined) html.push(`<p class="leading-relaxed text-body my-3">${inlineFormat(joined)}</p>`);
    buf.length = 0;
  };

  while (i < lines.length) {
    const line = lines[i];

    // horizontal rule
    if (/^---+\s*$/.test(line)) {
      html.push('<hr class="my-6 border-border" />');
      i++;
      continue;
    }

    // headings
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      const level = h[1].length;
      const text = inlineFormat(h[2]);
      const sizes = ["", "text-2xl mt-8 mb-4 font-bold text-primary", "text-xl mt-7 mb-3 font-semibold text-primary", "text-base mt-6 mb-2 font-semibold text-primary uppercase tracking-wider", "text-sm mt-5 mb-2 font-semibold text-secondary", "text-xs mt-4 mb-2 font-semibold text-secondary", "text-xs mt-3 mb-2 font-semibold text-muted"];
      html.push(`<h${level} class="${sizes[level] || sizes[6]}">${text}</h${level}>`);
      i++;
      continue;
    }

    // fenced code block
    if (/^```/.test(line)) {
      const lang = line.replace(/^```/, "").trim();
      const buf = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) {
        buf.push(lines[i]);
        i++;
      }
      i++; // skip closing fence
      const code = escapeHtml(buf.join("\n"));
      html.push(`<pre class="my-4 p-4 rounded-lg bg-surface-alt border border-border overflow-x-auto text-[12.5px] font-mono leading-relaxed text-body"><code data-lang="${escapeHtml(lang)}">${code}</code></pre>`);
      continue;
    }

    // blockquote
    if (/^>\s?/.test(line)) {
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      const inner = buf.join(" ").trim();
      html.push(`<blockquote class="my-4 pl-4 border-l-2 border-accent/40 text-secondary italic">${inlineFormat(inner)}</blockquote>`);
      continue;
    }

    // unordered list
    if (/^[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, ""));
        i++;
      }
      html.push(`<ul class="my-3 ml-5 list-disc space-y-1 text-body">${items.map((it) => `<li>${inlineFormat(it)}</li>`).join("")}</ul>`);
      continue;
    }

    // ordered list
    if (/^\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ""));
        i++;
      }
      html.push(`<ol class="my-3 ml-5 list-decimal space-y-1 text-body">${items.map((it) => `<li>${inlineFormat(it)}</li>`).join("")}</ol>`);
      continue;
    }

    // pipe table (simple, requires header row + separator)
    if (/^\|.*\|\s*$/.test(line) && i + 1 < lines.length && /^\|[\s\-:|]+\|\s*$/.test(lines[i + 1])) {
      const headers = line.split("|").slice(1, -1).map((c) => c.trim());
      i += 2;
      const rows = [];
      while (i < lines.length && /^\|.*\|\s*$/.test(lines[i])) {
        rows.push(lines[i].split("|").slice(1, -1).map((c) => c.trim()));
        i++;
      }
      const head = `<tr>${headers.map((h) => `<th class="px-2 py-1.5 text-left text-[11px] uppercase tracking-wider text-muted border-b border-border">${inlineFormat(h)}</th>`).join("")}</tr>`;
      const body = rows.map((r) => `<tr>${r.map((c) => `<td class="px-2 py-1.5 align-top border-b border-border/40 text-[14px]">${inlineFormat(c)}</td>`).join("")}</tr>`).join("");
      html.push(`<div class="my-4 overflow-x-auto"><table class="min-w-full border-collapse text-sm"><thead>${head}</thead><tbody>${body}</tbody></table></div>`);
      continue;
    }

    // blank line — paragraph break
    if (/^\s*$/.test(line)) {
      i++;
      continue;
    }

    // accumulate paragraph until blank line / block-starting line
    const buf = [line];
    i++;
    while (i < lines.length) {
      const peek = lines[i];
      if (
        /^\s*$/.test(peek) ||
        /^#{1,6}\s/.test(peek) ||
        /^```/.test(peek) ||
        /^>\s?/.test(peek) ||
        /^[-*]\s+/.test(peek) ||
        /^\d+\.\s+/.test(peek) ||
        /^---+\s*$/.test(peek) ||
        /^\|.*\|\s*$/.test(peek)
      ) {
        break;
      }
      buf.push(peek);
      i++;
    }
    flushParagraph(buf);
  }

  return html.join("\n");
}

export default function MarkdownRenderer({ source, className = "" }) {
  const html = useMemo(() => renderMarkdown(source), [source]);
  return (
    <div
      className={`md-content ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
