import { db } from "@/db";
import { notes, tasks } from "@/db/schema";
import { asc, desc } from "drizzle-orm";
import AppBackground from "@/components/AppBackground";
import NotesList from "@/components/NotesList";
import type { NoteListItem } from "@/components/NoteCard";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function HomePage() {
  const allNotes = await db
    .select()
    .from(notes)
    .orderBy(desc(notes.updatedAt));

  const allTasks = await db
    .select()
    .from(tasks)
    .orderBy(asc(tasks.position));

  const list: NoteListItem[] = allNotes.map((n) => ({
    id: n.id,
    title: n.title,
    body: n.body,
    createdAt: n.createdAt.toISOString(),
    updatedAt: n.updatedAt.toISOString(),
    tasks: allTasks
      .filter((t) => t.noteId === n.id)
      .map((t) => ({ id: t.id, text: t.text, done: t.done })),
  }));

  return (
    <AppBackground>
      <NotesList initialNotes={list} />
    </AppBackground>
  );
}
