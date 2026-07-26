import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { notes, tasks, NewTask } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

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

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const [note] = await db.select().from(notes).where(eq(notes.id, id));
  if (!note) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const noteTasks = await db
    .select()
    .from(tasks)
    .where(eq(tasks.noteId, id))
    .orderBy(asc(tasks.position));

  return NextResponse.json({ note: { ...note, tasks: noteTasks } });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const data = (await req.json()) as NoteInput;
  if (!data.title || !data.title.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const [existing] = await db.select().from(notes).where(eq(notes.id, id));
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await db
    .update(notes)
    .set({
      title: data.title.trim(),
      body: (data.body ?? "").trim(),
      updatedAt: new Date(),
    })
    .where(eq(notes.id, id));

  // Replace tasks: delete old and re-insert
  await db.delete(tasks).where(eq(tasks.noteId, id));

  if (data.tasks && data.tasks.length > 0) {
    const values: NewTask[] = data.tasks
      .filter((t) => t.text && t.text.trim().length > 0)
      .map((t, i) => ({
        noteId: id,
        text: t.text.trim(),
        done: !!t.done,
        position: t.position ?? i,
      }));

    if (values.length > 0) {
      await db.insert(tasks).values(values);
    }
  }

  const [updated] = await db.select().from(notes).where(eq(notes.id, id));
  const noteTasks = await db
    .select()
    .from(tasks)
    .where(eq(tasks.noteId, id))
    .orderBy(asc(tasks.position));

  return NextResponse.json({ note: { ...updated, tasks: noteTasks } });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  await db.delete(notes).where(eq(notes.id, id));
  return NextResponse.json({ ok: true });
}
