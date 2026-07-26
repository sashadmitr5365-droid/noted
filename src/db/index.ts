import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

export type DB = NodePgDatabase<typeof schema>;

let _db: DB | null = null;
let _pool: Pool | null = null;

/**
 * Lazily create the database pool and Drizzle instance.
 * This is important for Vercel: env vars aren't available during the
 * "Collecting page data" step of `next build`, so we must defer the
 * connection until the request is actually served.
 */
function getDb(): DB {
  if (_db) return _db;

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required");
  }

  const isLocal =
    databaseUrl.includes("127.0.0.1") ||
    databaseUrl.includes("localhost");

  const globalForDb = globalThis as typeof globalThis & {
    __notedPool?: Pool;
  };

  _pool =
    globalForDb.__notedPool ??
    new Pool({
      connectionString: databaseUrl,
      ssl: isLocal ? false : { rejectUnauthorized: false },
    });

  if (process.env.NODE_ENV !== "production") {
    globalForDb.__notedPool = _pool;
  }

  _db = drizzle(_pool, { schema });
  return _db;
}

/**
 * Proxy that lazily resolves the DB instance. Use it like a normal `db`:
 *   import { db } from "@/db";
 *   await db.select().from(notes)
 */
export const db = new Proxy({} as DB, {
  get(_target, prop) {
    return Reflect.get(getDb() as object, prop);
  },
}) as DB;

export { schema };
