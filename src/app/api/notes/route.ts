import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { notes, tasks, NewTask } from "@/db/schema";
import { desc, eq, asc } from "drizzle-orm";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type TaskInput = {
  id?: number;
  text: string;
  done?: boolean;
  position?: number;
};

type NoteInput = {
  title: string;
  body?: string;
  tasks?: TaskInput[];
};

export async function GET() {
  const allNotes = await db
    .select()
    .from(notes)
    .orderBy(desc(notes.updatedAt));

  const allTasks = await db
    .select()
    .from(tasks)
    .orderBy(asc(tasks.position));

  const result = allNotes.map((n) => ({
    ...n,
    tasks: allTasks.filter((t) => t.noteId === n.id),
  }));

  return NextResponse.json({ notes: result });
}

export async function POST(req: NextRequest) {
  const data = (await req.json()) as NoteInput;
  if (!data.title || !data.title.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const [created] = await db
    .insert(notes)
    .values({
      title: data.title.trim(),
      body: (data.body ?? "").trim(),
    })
    .returning();

  if (data.tasks && data.tasks.length > 0) {
    const values: NewTask[] = data.tasks
      .filter((t) => t.text && t.text.trim().length > 0)
      .map((t, i) => ({
        noteId: created.id,
        text: t.text.trim(),
        done: !!t.done,
        position: t.position ?? i,
      }));

    if (values.length > 0) {
      await db.insert(tasks).values(values);
    }
  }

  return NextResponse.json({ note: { ...created, tasks: data.tasks ?? [] } });
}
