import { notFound } from "next/navigation";
import { db } from "@/db";
import { notes, tasks } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import AppBackground from "@/components/AppBackground";
import NoteEditor, { type NoteEditorInitial } from "@/components/NoteEditor";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { ensureSchema } from "@/db";

export default async function EditNotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) notFound();
  await ensureSchema();

  const [note] = await db.select().from(notes).where(eq(notes.id, id));
  if (!note) notFound();

  const noteTasks = await db
    .select()
    .from(tasks)
    .where(eq(tasks.noteId, id))
    .orderBy(asc(tasks.position));

  const initial: NoteEditorInitial = {
    id: note.id,
    title: note.title,
    body: note.body,
    tasks: noteTasks.map((t) => ({ id: t.id, text: t.text, done: t.done })),
  };

  return (
    <AppBackground>
      <NoteEditor initial={initial} />
    </AppBackground>
  );
}
