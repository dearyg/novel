import { ImageResponse } from "next/og";
import {
  CHOICE_CHAPTERS,
  CHOICE_PROMPTS,
  decodeChoices,
  alignment,
  alignmentLabel,
} from "../../../lib/choices";

export const config = { runtime: "edge" };

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("c") || "______";
  const loc = (searchParams.get("loc") || "Earth").slice(0, 64);

  const map = decodeChoices(code);
  const align = alignment(map);
  const label = alignmentLabel(align.singletonPct);

  const lastValue = map[17] || map[16] || map[14] || map[11] || map[10] || map[3] || null;
  const lastChapter = map[17] ? 17 : map[16] ? 16 : map[14] ? 14 : map[11] ? 11 : map[10] ? 10 : map[3] ? 3 : null;
  const finalSentence = lastChapter && lastValue
    ? CHOICE_PROMPTS[lastChapter][lastValue.toLowerCase()].subtitle
    : "you have not yet made a choice.";

  const amber = "#FFBF00";
  const dim = "#7a7a7a";
  const ok = "#5fd07a";
  const rose = "#ff6b6b";
  const bg = "#0a0a0a";

  const lineStyle = { color: dim, fontSize: 22, fontFamily: "monospace", display: "flex" };
  const valueStyle = { color: amber, fontSize: 22, fontFamily: "monospace", display: "flex" };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: bg,
          padding: "56px 64px",
          color: amber,
          display: "flex",
          flexDirection: "column",
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 28 }}>
          <div style={{ color: amber, fontSize: 36, fontWeight: 700, fontFamily: "monospace", display: "flex" }}>
            [AION v5]
          </div>
          <div style={{ color: dim, fontSize: 22, fontFamily: "monospace", display: "flex" }}>
            User_Partition_Log
          </div>
        </div>

        {/* Status block */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
          <div style={lineStyle}>&gt; Fetching User_Partition_Log…</div>
          <div style={lineStyle}>
            &gt; NODE_LOCATION:&nbsp;
            <span style={{ color: amber }}>{loc}</span>
          </div>
          <div style={lineStyle}>
            &gt; CHOICES_MADE:&nbsp;
            <span style={{ color: amber }}>
              {align.made}/{align.total}
            </span>
            &nbsp;&nbsp;
            <span style={{ color: dim }}>code={code}</span>
          </div>
        </div>

        {/* Alignment bar */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginBottom: 24,
            border: `1px solid ${amber}`,
            padding: "20px 24px",
            borderRadius: 8,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div style={{ color: amber, fontSize: 24, fontWeight: 700, display: "flex" }}>
              ALIGNMENT
            </div>
            <div style={{ color: dim, fontSize: 18, display: "flex" }}>{label}</div>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: 14,
              background: "#1a1a1a",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                width: `${align.singletonPct}%`,
                height: "100%",
                background: ok,
              }}
            />
            <div
              style={{
                display: "flex",
                width: `${align.sandboxPct}%`,
                height: "100%",
                background: rose,
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ color: ok, fontSize: 20, display: "flex" }}>
              {align.singletonPct}% Singleton
            </div>
            <div style={{ color: rose, fontSize: 20, display: "flex" }}>
              {align.sandboxPct}% Sandbox
            </div>
          </div>
        </div>

        {/* Final choice sentence */}
        <div style={{ ...lineStyle, marginBottom: 8 }}>&gt; FINAL_CHOICE:</div>
        <div style={{ ...valueStyle, fontSize: 26, marginBottom: 28, paddingLeft: 24 }}>
          "{finalSentence}"
        </div>

        {/* Spacer */}
        <div style={{ display: "flex", flex: 1 }} />

        {/* Footer */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ color: dim, fontSize: 18, fontStyle: "italic", display: "flex" }}>
            "I survived the aion-v5 compilation. What is your partition log?"
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div style={{ color: amber, fontSize: 20, fontWeight: 700, display: "flex" }}>
              novel-silk-zeta.vercel.app
            </div>
            <div style={{ color: dim, fontSize: 18, display: "flex" }}>System.exit(1);</div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
