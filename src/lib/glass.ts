import type { CSSProperties } from "react";

/**
 * Three distinct glass card materials. Each one is a real, recognized
 * material in modern glass / UI design — not just a "tint" of the same
 * frosted glass.
 *
 *  - FROSTED  — diffuse, soft, scatters light. Baseline.
 *  - CLEAR    — truly transparent (less opacity), sharp edge specular
 *               highlights, visible refraction/bend along the rim.
 *               This is what Apple Vision Pro calls "glass".
 *  - SMOKE    — confidently tinted, like premium automotive sun-glass.
 *               Dark graphite/charcoal, not a warm peach.
 */

export type GlassStyle = "frosted" | "clear" | "smoke";

export function glassStyles(
  style: GlassStyle,
  radius: number
): {
  article: CSSProperties;
  stroke: CSSProperties;
  topHairline: CSSProperties;
  /** Optional refractive shimmer on the rim for "clear" */
  rimShimmer?: CSSProperties;
  glass: GlassStyle;
} {
  const r = `${Math.max(8, radius)}px`;

  // ─── FROSTED: diffuse, matte. ───────────────────────────────────────
  if (style === "frosted") {
    return {
      article: {
        borderRadius: r,
        background: "rgba(255,255,255,0.045)",
        WebkitBackdropFilter: "blur(24px) saturate(140%)",
        backdropFilter: "blur(24px) saturate(140%)",
        boxShadow:
          "0 8px 32px -12px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.05)",
      },
      stroke: {
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
      },
      topHairline: {
        background:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.20), transparent)",
      },
      glass: style,
    };
  }

  // ─── CLEAR: truly transparent, sharp speculars, visible refraction. ─
  // Low opacity (you actually see through it), higher blur for the
  // "looking through a lens" feel, intense rim highlight on top and
  // a subtle inner glow that simulates light bending along the edge.
  if (style === "clear") {
    return {
      article: {
        borderRadius: r,
        background: "rgba(255,255,255,0.022)",
        WebkitBackdropFilter: "blur(32px) saturate(180%)",
        backdropFilter: "blur(32px) saturate(180%)",
        boxShadow:
          "0 8px 32px -10px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(255,255,255,0.10)",
      },
      stroke: {
        boxShadow:
          "inset 0 0 0 1px rgba(255,255,255,0.10), inset 0 1px 0 rgba(255,255,255,0.18)",
      },
      topHairline: {
        background:
          "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.55) 50%, transparent 90%)",
        height: "1px",
      },
      // A second, fainter highlight just below the top — simulates the
      // light bending twice as it passes through a thick glass edge.
      rimShimmer: {
        background:
          "linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.18) 50%, transparent 75%)",
        top: "1.5px",
        height: "0.5px",
      },
      glass: style,
    };
  }

  // ─── SMOKE: confident dark tint, like tinted auto glass. ───────────
  // Distinctly dark, cool graphite. NOT warm peach. This is the
  // "premium product" look — think B&O, Apple Pro Display XDR bezel.
  return {
    article: {
      borderRadius: r,
      background: "rgba(20,24,32,0.45)",
      WebkitBackdropFilter: "blur(28px) saturate(120%)",
      backdropFilter: "blur(28px) saturate(120%)",
      boxShadow:
        "0 10px 36px -10px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.10)",
    },
    stroke: {
      boxShadow:
        "inset 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.12)",
    },
    topHairline: {
      background:
        "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
    },
    glass: style,
  };
}

/**
 * Badge — same material as the card, scaled for a small pill.
 */
export function badgeGlass(style: GlassStyle): CSSProperties {
  if (style === "clear") {
    return {
      WebkitBackdropFilter: "blur(14px) saturate(160%)",
      backdropFilter: "blur(14px) saturate(160%)",
      background: "rgba(255,255,255,0.04)",
      boxShadow:
        "inset 0 0 0 1px rgba(255,255,255,0.16), inset 0 1px 0 rgba(255,255,255,0.22)",
    };
  }
  if (style === "smoke") {
    return {
      WebkitBackdropFilter: "blur(14px) saturate(120%)",
      backdropFilter: "blur(14px) saturate(120%)",
      background: "rgba(20,24,32,0.40)",
      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.10)",
    };
  }
  return {
    WebkitBackdropFilter: "blur(14px) saturate(140%)",
    backdropFilter: "blur(14px) saturate(140%)",
    background: "rgba(255,255,255,0.08)",
    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.15)",
  };
}

export const GLASS_STYLES: {
  id: GlassStyle;
  label: string;
  description: string;
}[] = [
  { id: "frosted", label: "Матовое", description: "Классическое рассеивающее стекло" },
  { id: "clear", label: "Прозрачное", description: "Чёткие края, яркие блики" },
  { id: "smoke", label: "Дымчатое", description: "Тёмный графитовый тинт" },
];
