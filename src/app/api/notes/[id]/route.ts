import { NextRequest, NextResponse } from "next/server";
import { db, ensureSchema } from "@/db";
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

type TagInput = {
  icon: string;
  label: string;
  position: string;
};

type NoteInput = {
  title: string;
  body?: string;
  tasks?: TaskInput[];
  tag1?: TagInput | null;
  tag2?: TagInput | null;
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
  await ensureSchema();
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
  await ensureSchema();
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
      tag1Icon: data.tag1?.icon ?? null,
      tag1Label: data.tag1?.label ?? null,
      tag1Position: data.tag1?.position ?? null,
      tag2Icon: data.tag2?.icon ?? null,
      tag2Label: data.tag2?.label ?? null,
      tag2Position: data.tag2?.position ?? null,
      updatedAt: new Date(),
    })
    .where(eq(notes.id, id));

  // Replace tasks
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
  await ensureSchema();
  await db.delete(notes).where(eq(notes.id, id));
  return NextResponse.json({ ok: true });
}
