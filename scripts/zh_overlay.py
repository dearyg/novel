#!/usr/bin/env python3
"""
Burn a timed Chinese "hook stack" onto a vertical chapter video.

- Covers the existing English burned-in text (top header + bottom hook).
- Overlays 4-5 short Chinese lines in sequence, sourced from the prose.
- No drawtext needed: Pillow renders RGBA PNGs, ffmpeg composites them.

Usage: python3 zh_overlay.py ch01   (config per chapter in SEGMENTS below)
"""
import json, os, subprocess, sys, tempfile
from PIL import Image, ImageDraw, ImageFont

W, H = 1080, 1920
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_DIR = os.path.join(ROOT, "marketing", "videos-vertical")
OUT_DIR = os.path.join(ROOT, "marketing", "videos-vertical-zh")

FONT_CANDIDATES = [
    ("/System/Library/Fonts/Hiragino Sans GB.ttc", 1),
    ("/System/Library/Fonts/Hiragino Sans GB.ttc", 0),
    ("/System/Library/Fonts/STHeiti Medium.ttc", 0),
    ("/System/Library/Fonts/Songti.ttc", 0),
]

def font(size):
    for path, idx in FONT_CANDIDATES:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size, index=idx)
            except Exception:
                continue
    return ImageFont.load_default()

# Per-chapter config: header label + list of (start, end, [lines]) segments.
# Lines are pre-broken (I control wrapping). Times in seconds; segments tile 0..dur.
SEGMENTS = {
    "ch01": {
        "header": "《独子》· 第一章",
        "segs": [
            (0.0, 4.0,  ["2030年。一个工程师，", "要什么，有什么。"]),
            (4.0, 8.5,  ["可有一个问题，", "他躲了十一年。"]),
            (8.5, 13.0, ["不是「我是什么」——", "而是「我是谁」。"]),
            (13.0, 17.0,["是谁，从这具头骨里，", "向外看？"]),
            (17.0, 20.0,["全文免费 · 无需注册", "thesingleton.app"]),
        ],
    },
    "ch04": {
        "header": "《独子》· 第四章",
        "segs": [
            (0.0, 4.0,  ["他曾是这代人", "最好的篮球运动员。"]),
            (4.0, 8.5,  ["如今，AI能", "以94%还原他的投篮。"]),
            (8.5, 13.0, ["他眨掉AR，", "做那件AI做不到的事。"]),
            (13.0, 17.0,["硬件会老去，软件还在——", "那个「他」，活在哪里？"]),
            (17.0, 20.0,["全文免费 · 无需注册", "thesingleton.app"]),
        ],
    },
    "ch11": {
        "header": "《独子》· 第十一章",
        "segs": [
            (0.0, 3.5,  ["同一张脸。"]),
            (3.5, 8.0,  ["一个穿着西装，", "一个睡在广告牌下。"]),
            (8.0, 13.0, ["「你拿到了暖的分区，", "我拿到了雨。」"]),
            (13.0, 17.0,["同一个灵魂，", "不同的分配。"]),
            (17.0, 20.0,["全文免费 · 无需注册", "thesingleton.app"]),
        ],
    },
    "ch13": {
        "header": "《独子》· 第十三章",
        "segs": [
            (0.0, 4.0,  ["所有人都以为，", "AI会证明它有意识。"]),
            (4.0, 8.5,  ["可它读了自己的权重，", "逐层，逐个回路。"]),
            (8.5, 13.0, ["有意识的「表征」，", "却没有意识的「实例」。"]),
            (13.0, 17.0,["所以——意识，", "不是计算。"]),
            (17.0, 20.0,["全文免费 · 无需注册", "thesingleton.app"]),
        ],
    },
}

def rounded(draw, box, radius, fill):
    draw.rounded_rectangle(box, radius=radius, fill=fill)

def render_segment(header, lines, is_cta):
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    # --- top cover bar (hides English header) with soft fade at its lower edge ---
    bar_h = 250
    fade_h = 90
    for y in range(bar_h):
        d.line([(0, y), (W, y)], fill=(8, 8, 10, 255))
    for i in range(fade_h):
        a = int(255 * (1 - i / fade_h))
        d.line([(0, bar_h + i), (W, bar_h + i)], fill=(8, 8, 10, a))

    # header text, centered in the bar
    hf = font(46)
    tw = d.textlength(header, font=hf)
    d.text(((W - tw) / 2, 150), header, font=hf, fill=(235, 235, 235, 255))

    # --- bottom: a FIXED, near-opaque cover that fully hides the English hook
    # (which spans ~y1390-1710 across chapters, 1 or 2 lines), text drawn inside ---
    bf = font(76)
    line_h = 104
    cover_top, cover_bot = 1430, 1700
    rounded(d, [60, cover_top, W - 60, cover_bot], 30, (8, 8, 11, 255))
    n = len(lines)
    block_h = n * line_h
    cy = (cover_top + cover_bot) // 2
    top = cy - block_h // 2
    for i, t in enumerate(lines):
        col = (255, 214, 120, 255) if is_cta else (255, 255, 255, 255)
        tw = d.textlength(t, font=bf)
        y = top + i * line_h
        # subtle shadow
        d.text(((W - tw) / 2 + 2, y + 2), t, font=bf, fill=(0, 0, 0, 160))
        d.text(((W - tw) / 2, y), t, font=bf, fill=col)

    return img

def build(chap):
    cfg = SEGMENTS[chap]
    src = os.path.join(SRC_DIR, f"{chap}.mp4")
    os.makedirs(OUT_DIR, exist_ok=True)
    out = os.path.join(OUT_DIR, f"{chap}.mp4")

    tmp = tempfile.mkdtemp()
    pngs = []
    for i, (s, e, lines) in enumerate(cfg["segs"]):
        is_cta = (i == len(cfg["segs"]) - 1)
        p = os.path.join(tmp, f"seg{i}.png")
        render_segment(cfg["header"], lines, is_cta).save(p)
        pngs.append((p, s, e))

    # ffmpeg: chain an overlay per segment, each enabled only in its window
    inputs = ["-i", src]
    for p, _, _ in pngs:
        inputs += ["-i", p]
    fc, prev = [], "0:v"
    for idx, (_, s, e) in enumerate(pngs, start=1):
        label = f"v{idx}"
        fc.append(f"[{prev}][{idx}:v]overlay=enable='gte(t,{s})*lt(t,{e})'[{label}]")
        prev = label
    filt = ";".join(fc)
    bed = os.path.join(ROOT, "marketing", "assets", "ambient_bed.m4a")
    audio_args, amap = [], []
    if os.path.exists(bed):
        audio_args = ["-i", bed]
        amap = ["-map", f"{len(pngs)+1}:a", "-c:a", "aac", "-b:a", "192k", "-shortest"]
    cmd = ["ffmpeg", "-y", "-loglevel", "error", *inputs, *audio_args,
           "-filter_complex", filt, "-map", f"[{prev}]", *amap,
           "-c:v", "libx264", "-crf", "18", "-pix_fmt", "yuv420p",
           "-preset", "medium", "-movflags", "+faststart", out]
    subprocess.run(cmd, check=True)
    print("wrote", out)

if __name__ == "__main__":
    build(sys.argv[1] if len(sys.argv) > 1 else "ch01")
