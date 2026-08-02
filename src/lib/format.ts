// Compatibility re-exports. The actual implementation lives in `editor.ts`.
export {
  type InlineSegment,
  type DocBlock,
  type Doc,
  type Pos,
  emptyDoc,
  plainTextToDoc,
  docToPlainText,
  renderDocToHTML,
} from "./editor";
