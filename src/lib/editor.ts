// Document model + editor actions for the rich-text editor.
// Each block stores an array of inline segments with formatting flags.
// No markdown markers — the text is always rendered as-is.

export type InlineSegment = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  strike?: boolean;
  underline?: boolean;
  highlight?: boolean;
  color?: string;
  href?: string;
  code?: boolean;
};

export type TextBlock =
  | { type: "p"; segments: InlineSegment[] }
  | { type: "h1"; segments: InlineSegment[] }
  | { type: "h2"; segments: InlineSegment[] }
  | { type: "h3"; segments: InlineSegment[] }
  | { type: "quote"; segments: InlineSegment[] }
  | { type: "ul"; segments: InlineSegment[] }
  | { type: "ol"; segments: InlineSegment[] }
  | { type: "task"; done: boolean; segments: InlineSegment[] };

export type DocBlock = TextBlock | { type: "code"; text: string } | { type: "divider" };

export type Doc = { blocks: DocBlock[] };

export type Pos = { block: number; offset: number };

export function emptyDoc(): Doc {
  return { blocks: [{ type: "p", segments: [{ text: "" }] }] };
}

export function plainTextToDoc(text: string): Doc {
  if (!text || !text.trim()) return emptyDoc();
  // Split on double-newline (paragraph break) first, then on single
  // newline (line break). Each block becomes a paragraph.
  const blocks: DocBlock[] = [];
  const paragraphs = text.split(/\n{2,}/);
  for (const para of paragraphs) {
    const lines = para.split(/\n/);
    for (const line of lines) {
      blocks.push({ type: "p" as const, segments: [{ text: line }] });
    }
  }
  return { blocks };
}

export function docToPlainText(doc: Doc): string {
  return doc.blocks
    .map((b) => {
      if (b.type === "divider") return "---";
      if (b.type === "code") return "```\n" + b.text + "\n```";
      return b.segments.map((s) => s.text).join("");
    })
    .join("\n");
}

// ===== Rendering for the view screen =====

export function renderDocToHTML(doc: Doc): string {
  const out: string[] = [];
  for (const b of doc.blocks) {
    if (b.type === "divider") {
      out.push('<hr class="md-divider" />');
    } else if (b.type === "code") {
      out.push(`<pre class="md-codeblock">${escapeHtml(b.text)}</pre>`);
    } else if (b.type === "ul") {
      out.push(`<ul class="md-ul"><li>${renderSegments(b.segments)}</li></ul>`);
    } else if (b.type === "ol") {
      out.push(`<ol class="md-ol"><li>${renderSegments(b.segments)}</li></ol>`);
    } else if (b.type === "task") {
      out.push(
        `<ul class="md-task"><li class="md-task-item ${
          b.done ? "checked" : ""
        }"><span class="md-task-box ${
          b.done ? "md-task-box-on" : ""
        }"></span><span>${renderSegments(b.segments)}</span></li></ul>`
      );
    } else if (b.type === "quote") {
      out.push(`<blockquote class="md-quote">${renderSegments(b.segments)}</blockquote>`);
    } else if (b.type === "h1") {
      out.push(`<h1 class="md-h1">${renderSegments(b.segments)}</h1>`);
    } else if (b.type === "h2") {
      out.push(`<h2 class="md-h2">${renderSegments(b.segments)}</h2>`);
    } else if (b.type === "h3") {
      out.push(`<h3 class="md-h3">${renderSegments(b.segments)}</h3>`);
    } else {
      out.push(`<p>${renderSegments(b.segments)}</p>`);
    }
  }
  return out.join("\n");
}

function renderSegments(segments: InlineSegment[]): string {
  return segments
    .map((s) => {
      let html = escapeHtml(s.text);
      if (s.code) html = `<code class="md-code">${html}</code>`;
      if (s.bold) html = `<strong class="md-bold">${html}</strong>`;
      if (s.italic) html = `<em class="md-italic">${html}</em>`;
      if (s.strike) html = `<s class="md-strike">${html}</s>`;
      if (s.underline) html = `<span class="md-underline">${html}</span>`;
      if (s.highlight) html = `<mark class="md-highlight">${html}</mark>`;
      if (s.color) html = `<span style="color:${s.color}">${html}</span>`;
      if (s.href) {
        html = `<a class="md-link" href="${escapeAttr(
          s.href
        )}" target="_blank" rel="noopener noreferrer">${html}</a>`;
      }
      return html;
    })
    .join("");
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function escapeAttr(s: string): string {
  return escapeHtml(s).replace(/"/g, "&quot;");
}

// ===== Helpers =====

function isText(b: DocBlock): b is TextBlock {
  return b.type !== "code" && b.type !== "divider";
}

function textLength(b: DocBlock): number {
  if (b.type === "code") return b.text.length;
  if (b.type === "divider") return 0;
  return b.segments.reduce((a, s) => a + s.text.length, 0);
}

function locate(
  b: TextBlock,
  offset: number
): { segIdx: number; inside: number } {
  let acc = 0;
  for (let i = 0; i < b.segments.length; i++) {
    const len = b.segments[i].text.length;
    if (offset <= acc + len) return { segIdx: i, inside: offset - acc };
    acc += len;
  }
  const last = b.segments.length - 1;
  return { segIdx: Math.max(0, last), inside: b.segments[last]?.text.length ?? 0 };
}

function splitSegment(
  seg: InlineSegment,
  inside: number
): { left: InlineSegment; right: InlineSegment } {
  return {
    left: { ...seg, text: seg.text.slice(0, inside) },
    right: { ...seg, text: seg.text.slice(inside) },
  };
}

function cloneDoc(doc: Doc): Doc {
  return {
    blocks: doc.blocks.map((b) => {
      if (b.type === "divider") return { type: "divider" };
      if (b.type === "code") return { type: "code", text: b.text };
      return {
        type: b.type,
        done: b.type === "task" ? b.done : undefined,
        segments: b.segments.map((s) => ({ ...s })),
      } as DocBlock;
    }),
  };
}

// ===== Editor actions =====

export function insertChar(doc: Doc, pos: Pos, ch: string): { doc: Doc; pos: Pos } {
  const d = cloneDoc(doc);
  const b = d.blocks[pos.block];
  if (!b) return { doc: d, pos };

  if (b.type === "divider") {
    d.blocks.splice(pos.block + 1, 0, {
      type: "p",
      segments: [{ text: ch }],
    });
    return { doc: d, pos: { block: pos.block + 1, offset: ch.length } };
  }

  if (b.type === "code") {
    if (ch === "\n") {
      b.text = b.text.slice(0, pos.offset) + "\n" + b.text.slice(pos.offset);
      return { doc: d, pos: { block: pos.block, offset: pos.offset + 1 } };
    }
    b.text = b.text.slice(0, pos.offset) + ch + b.text.slice(pos.offset);
    return { doc: d, pos: { block: pos.block, offset: pos.offset + ch.length } };
  }

  if (ch === "\n") {
    const { segIdx, inside } = locate(b, pos.offset);
    const seg = b.segments[segIdx];
    const { left, right } = splitSegment(seg, inside);
    const leftSegs = [...b.segments.slice(0, segIdx), left].filter(
      (s) => s.text.length > 0
    );
    const rightSegs = [right, ...b.segments.slice(segIdx + 1)].filter(
      (s) => s.text.length > 0
    );
    b.segments = leftSegs.length ? leftSegs : [{ text: "" }];
    d.blocks.splice(pos.block + 1, 0, {
      type: "p",
      segments: rightSegs.length ? rightSegs : [{ text: "" }],
    });
    return { doc: d, pos: { block: pos.block + 1, offset: 0 } };
  }

  const { segIdx, inside } = locate(b, pos.offset);
  const seg = b.segments[segIdx];
  const newText = seg.text.slice(0, inside) + ch + seg.text.slice(inside);
  b.segments[segIdx] = { ...seg, text: newText };
  return { doc: d, pos: { block: pos.block, offset: pos.offset + ch.length } };
}

export function backspace(doc: Doc, pos: Pos): { doc: Doc; pos: Pos } {
  const d = cloneDoc(doc);
  const b = d.blocks[pos.block];
  if (!b) return { doc: d, pos };

  if (b.type === "divider") {
    d.blocks.splice(pos.block, 1);
    return {
      doc: d,
      pos: { block: Math.max(0, pos.block - 1), offset: Number.MAX_SAFE_INTEGER },
    };
  }

  if (b.type === "code") {
    if (pos.offset === 0) return { doc: d, pos };
    b.text = b.text.slice(0, pos.offset - 1) + b.text.slice(pos.offset);
    return { doc: d, pos: { block: pos.block, offset: pos.offset - 1 } };
  }

  if (pos.offset > 0) {
    const { segIdx, inside } = locate(b, pos.offset);
    if (inside > 0) {
      const seg = b.segments[segIdx];
      b.segments[segIdx] = {
        ...seg,
        text: seg.text.slice(0, inside - 1) + seg.text.slice(inside),
      };
      return { doc: d, pos: { block: pos.block, offset: pos.offset - 1 } };
    }
    if (segIdx > 0) {
      const prev = b.segments[segIdx - 1];
      const cur = b.segments[segIdx];
      b.segments[segIdx - 1] = { ...prev, text: prev.text + cur.text };
      b.segments.splice(segIdx, 1);
      return { doc: d, pos: { block: pos.block, offset: pos.offset - 1 } };
    }
  }

  if (pos.block > 0) {
    const prev = d.blocks[pos.block - 1];
    if (prev.type === "divider") {
      d.blocks.splice(pos.block - 1, 1);
      return {
        doc: d,
        pos: { block: pos.block - 1, offset: Number.MAX_SAFE_INTEGER },
      };
    }
    if (isText(prev)) {
      const insertAt = textLength(prev);
      prev.segments = [...prev.segments, ...b.segments];
      d.blocks.splice(pos.block, 1);
      return { doc: d, pos: { block: pos.block - 1, offset: insertAt } };
    }
    if (prev.type === "code") {
      const insertAt = prev.text.length;
      prev.text += b.segments.map((s) => s.text).join("");
      d.blocks.splice(pos.block, 1);
      return { doc: d, pos: { block: pos.block - 1, offset: insertAt } };
    }
  }
  return { doc: d, pos };
}

export function toggleFlag(
  doc: Doc,
  pos: Pos,
  flag: "bold" | "italic" | "strike" | "underline" | "highlight" | "code"
): { doc: Doc; pos: Pos } {
  const d = cloneDoc(doc);
  const b = d.blocks[pos.block];
  if (!b || !isText(b)) return { doc: d, pos };

  const { segIdx, inside } = locate(b, pos.offset);
  const seg = b.segments[segIdx];
  if (!seg) return { doc: d, pos };

  const newFlag = !seg[flag];

  if (seg.text.length === 0 || inside === 0 || inside === seg.text.length) {
    b.segments[segIdx] = { ...seg, [flag]: newFlag };
    return { doc: d, pos };
  }

  const { left, right } = splitSegment(seg, inside);
  const middle: InlineSegment = { ...seg, [flag]: newFlag, text: "" };
  b.segments = [
    ...b.segments.slice(0, segIdx),
    left,
    middle,
    right,
    ...b.segments.slice(segIdx + 1),
  ];
  return { doc: d, pos: { block: pos.block, offset: pos.offset } };
}

export function applyColor(
  doc: Doc,
  pos: Pos,
  color: string
): { doc: Doc; pos: Pos } {
  const d = cloneDoc(doc);
  const b = d.blocks[pos.block];
  if (!b || !isText(b)) return { doc: d, pos };

  const { segIdx, inside } = locate(b, pos.offset);
  const seg = b.segments[segIdx];
  if (!seg) return { doc: d, pos };

  if (seg.text.length === 0 || inside === 0) {
    b.segments[segIdx] = { ...seg, color };
    return { doc: d, pos };
  }

  if (inside === seg.text.length) {
    if (segIdx + 1 < b.segments.length) {
      b.segments[segIdx + 1] = { ...b.segments[segIdx + 1], color };
    } else {
      b.segments.push({ text: "", color });
    }
    return { doc: d, pos: { block: pos.block, offset: pos.offset } };
  }

  const { left, right } = splitSegment(seg, inside);
  const middle: InlineSegment = { ...seg, color, text: "" };
  b.segments = [
    ...b.segments.slice(0, segIdx),
    left,
    middle,
    right,
    ...b.segments.slice(segIdx + 1),
  ];
  return { doc: d, pos: { block: pos.block, offset: pos.offset } };
}

export function setBlockType(
  doc: Doc,
  pos: Pos,
  type: "p" | "h1" | "h2" | "h3" | "quote"
): { doc: Doc; pos: Pos } {
  const d = cloneDoc(doc);
  const b = d.blocks[pos.block];
  if (!b) return { doc: d, pos };
  if (b.type === "code" || b.type === "divider") {
    const segs = b.type === "code" ? [{ text: b.text }] : [{ text: "" }];
    d.blocks[pos.block] = { type, segments: segs } as TextBlock;
    return { doc: d, pos: { block: pos.block, offset: segs[0].text.length } };
  }
  d.blocks[pos.block] = { type, segments: b.segments } as TextBlock;
  return { doc: d, pos };
}

export function setListType(
  doc: Doc,
  pos: Pos,
  type: "ul" | "ol" | "task"
): { doc: Doc; pos: Pos } {
  const d = cloneDoc(doc);
  const b = d.blocks[pos.block];
  if (!b) return { doc: d, pos };

  let segs;
  if (isText(b)) segs = b.segments;
  else if (b.type === "code") segs = [{ text: b.text }];
  else segs = [{ text: "" }];

  if (type === "task") {
    d.blocks[pos.block] = { type: "task", done: false, segments: segs };
  } else {
    d.blocks[pos.block] = { type, segments: segs } as TextBlock;
  }
  return { doc: d, pos: { block: pos.block, offset: textLength(d.blocks[pos.block]) } };
}

export function insertDivider(doc: Doc, pos: Pos): { doc: Doc; pos: Pos } {
  const d = cloneDoc(doc);
  d.blocks.splice(pos.block + 1, 0, { type: "divider" });
  d.blocks.splice(pos.block + 2, 0, { type: "p", segments: [{ text: "" }] });
  return { doc: d, pos: { block: pos.block + 2, offset: 0 } };
}

export function insertCodeBlock(doc: Doc, pos: Pos): { doc: Doc; pos: Pos } {
  const d = cloneDoc(doc);
  d.blocks.splice(pos.block + 1, 0, { type: "code", text: "" });
  d.blocks.splice(pos.block + 2, 0, { type: "p", segments: [{ text: "" }] });
  return { doc: d, pos: { block: pos.block + 1, offset: 0 } };
}

export function insertLink(
  doc: Doc,
  pos: Pos,
  url: string,
  text?: string
): { doc: Doc; pos: Pos } {
  const d = cloneDoc(doc);
  const b = d.blocks[pos.block];
  if (!b || !isText(b)) return { doc: d, pos };
  b.segments.unshift({ text: text || url, href: url });
  return { doc: d, pos: { block: pos.block, offset: 0 } };
}
