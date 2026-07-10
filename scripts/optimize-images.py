#!/usr/bin/env python3
"""Optimize referenced images to WebP (transparency preserved).

Speaker photos -> max 1000px, q82
Logos / graphics -> max 900px, q85

Run: python3 scripts/optimize-images.py
"""
import os
from PIL import Image

PUBLIC = os.path.join(os.path.dirname(__file__), "..", "public")

PHOTOS = [
    "AK", "Brissia Benavente", "Carlos H. Fernandez Mazzi", "CN", "CO",
    "Edwin Saavedra", "EA", "FA", "GG", "JC", "JCR", "JE", "Kumblai Gomez",
    "JPV", "Mario Patiño", "MFJ", "MI", "PT",
]

GRAPHICS = [
    "TETHER", "BITGO", "meru", "BCP", "ITURRI", "RAIN",
    "ticket-lpz", "ticket-scz", "CES MERU logo ok", "networking2",
    "sponsors3", "Alianza",
]

# (source filename, max dimension, quality)
JOBS = (
    [(f"{n}.png", 1000, 82) for n in PHOTOS]
    + [(f"{n}.png", 900, 85) for n in GRAPHICS]
    + [("Speakers.jpeg", 900, 85)]
)


def convert(src, maxd, quality):
    path = os.path.join(PUBLIC, src)
    if not os.path.exists(path):
        print(f"  SKIP (missing): {src}")
        return
    im = Image.open(path).convert("RGBA")
    w, h = im.size
    scale = min(1.0, maxd / max(w, h))
    if scale < 1:
        im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
    base = os.path.splitext(src)[0]
    out = os.path.join(PUBLIC, f"{base}.webp")
    im.save(out, format="WEBP", quality=quality, method=6)
    before = os.path.getsize(path) // 1024
    after = os.path.getsize(out) // 1024
    print(f"  {src}: {before}KB -> {base}.webp {after}KB")


def main():
    print("Optimizing images to WebP...")
    for src, maxd, q in JOBS:
        convert(src, maxd, q)
    print("Done.")


if __name__ == "__main__":
    main()
