import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { auditLog } from "@db/schema";
import { asc } from "drizzle-orm";

export const auditRouter = createRouter({
  getAllAuditLogs: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(auditLog).orderBy(asc(auditLog.timestamp));
  }),
});
