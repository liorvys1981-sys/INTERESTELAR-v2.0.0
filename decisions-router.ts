import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { autonomousDecisions } from "@db/schema";
import { eq } from "drizzle-orm";

export const decisionsRouter = createRouter({
  getAllDecisions: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(autonomousDecisions).orderBy(autonomousDecisions.timestamp);
  }),

  getDecisionsBySeverity: publicQuery
    .input(z.object({ severity: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      return db.select().from(autonomousDecisions)
        .where(eq(autonomousDecisions.severity, input.severity as "CRITICAL" | "WARNING" | "CAUTION" | "INFO"));
    }),
});
