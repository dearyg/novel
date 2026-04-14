export default function CodeFooter({ code }) {
  if (!code) return null;

  return (
    <div className="mt-12 rounded-lg border border-border bg-surface overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-surface-alt">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 text-[11px] text-muted font-mono">runtime.js</span>
      </div>
      <pre className="p-5 overflow-x-auto text-[13px] leading-relaxed font-mono">
        <code>
          {code.split("\n").map((line, i) => {
            const trimmed = line.trimStart();
            const isComment = trimmed.startsWith("//");
            const isKeyword = /^(const|let|var|function|if|else|return|import|export)\b/.test(trimmed);
            const isString = /['"`]/.test(trimmed) && !isComment;

            let colorClass = "text-primary";
            if (isComment) colorClass = "text-muted italic";
            else if (isKeyword) colorClass = "text-accent";
            else if (isString) colorClass = "text-highlight";

            return (
              <div key={i} className="flex">
                <span className="w-7 text-right mr-4 text-muted/50 select-none shrink-0 text-[11px]">
                  {i + 1}
                </span>
                <span className={colorClass}>{line || " "}</span>
              </div>
            );
          })}
        </code>
      </pre>
    </div>
  );
}
