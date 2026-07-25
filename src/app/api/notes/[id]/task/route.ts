import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { tasks } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// PATCH /api/notes/:id/task — toggle a single task's done state
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idStr } = await params;
  const noteId = Number(idStr);
  if (!Number.isFinite(noteId)) {
    return NextResponse.json({ error: "Invalid note id" }, { status: 400 });
  }

  const { taskId, done } = (await req.json()) as {
    taskId: number;
    done: boolean;
  };
  if (!Number.isFinite(taskId)) {
    return NextResponse.json({ error: "Invalid task id" }, { status: 400 });
  }

  await db
    .update(tasks)
    .set({ done: !!done })
    .where(eq(tasks.id, taskId));

  const noteTasks = await db
    .select()
    .from(tasks)
    .where(eq(tasks.noteId, noteId))
    .orderBy(asc(tasks.position));

  return NextResponse.json({ tasks: noteTasks });
}
