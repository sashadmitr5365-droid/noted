import AppBackground from "@/components/AppBackground";
import NoteEditor from "@/components/NoteEditor";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default function NewNotePage() {
  return (
    <AppBackground>
      <NoteEditor initial={{ title: "", body: "", tasks: [] }} />
    </AppBackground>
  );
}
