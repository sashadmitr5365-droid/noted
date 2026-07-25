import { drizzle as drizzleNode } from "drizzle-orm/node-postgres";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-serverless";
import { neonConfig } from "@neondatabase/serverless";
import { Pool } from "pg";
import ws from "ws";
import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

// Detect a Neon / serverless connection string
const isServerless =
  process.env.VERCEL === "1" ||
  /neon\.tech|-pooler\./i.test(databaseUrl);

// Configure WebSocket for Neon in Node.js environments
if (isServerless && typeof globalThis.WebSocket === "undefined") {
  neonConfig.webSocketConstructor = ws as unknown as typeof WebSocket;
}

type DrizzleDb =
  | ReturnType<typeof drizzleNode<typeof schema>>
  | ReturnType<typeof drizzleNeon<typeof schema>>;

let _db: DrizzleDb;

if (isServerless) {
  // Serverless / Neon path
  _db = drizzleNeon({ connection: databaseUrl, schema });
} else {
  // Local dev with a regular Postgres
  const globalForDb = globalThis as typeof globalThis & {
    __notedPool?: Pool;
  };
  const pool =
    globalForDb.__notedPool ??
    new Pool({
      connectionString: databaseUrl,
      ssl: /sslmode=require|ssl=true/i.test(databaseUrl)
        ? { rejectUnauthorized: false }
        : undefined,
    });
  if (process.env.NODE_ENV !== "production") {
    globalForDb.__notedPool = pool;
  }
  _db = drizzleNode(pool, { schema });
}

export const db = _db;
export { schema };
