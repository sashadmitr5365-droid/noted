import { notFound } from "next/navigation";
import { db } from "@/db";
import { notes, tasks } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import NoteView, { type NoteViewInitial } from "@/components/NoteView";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { ensureSchema } from "@/db";

export default async function ViewNotePage({
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

  const initial: NoteViewInitial = {
    id: note.id,
    title: note.title,
    body: note.body,
    createdAt: note.createdAt.toISOString(),
    updatedAt: note.updatedAt.toISOString(),
    tasks: noteTasks.map((t) => ({ id: t.id, text: t.text, done: t.done })),
  };

  return <NoteView initial={initial} />;
}
