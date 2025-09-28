import { drizzle } from "drizzle-orm/node-postgres";
// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";
// const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(process.env.DATABASE_URL!, { schema });
