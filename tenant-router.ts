import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { tenants, tenantEnforcementLog } from "@db/schema";
import { eq } from "drizzle-orm";

export const tenantRouter = createRouter({
  getAllTenants: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(tenants);
  }),

  getTenantById: publicQuery
    .input(z.object({ tenantId: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const results = await db.select().from(tenants).where(eq(tenants.tenantId, input.tenantId));
      return results[0] ?? null;
    }),

  getEnforcementLog: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(tenantEnforcementLog).orderBy(tenantEnforcementLog.timestamp);
  }),
});
