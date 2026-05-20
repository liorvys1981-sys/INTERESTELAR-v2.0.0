import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { infrastructureMetrics, infrastructureStatus, recoveryLog } from "@db/schema";
import { eq } from "drizzle-orm";

export const infrastructureRouter = createRouter({
  getAllMetrics: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(infrastructureMetrics);
  }),

  getStatusByComponent: publicQuery
    .input(z.object({ component: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      return db.select().from(infrastructureStatus)
        .where(eq(infrastructureStatus.component, input.component));
    }),

  getAllStatus: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(infrastructureStatus);
  }),

  getRecoveryLog: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(recoveryLog).orderBy(recoveryLog.timestamp);
  }),
});
