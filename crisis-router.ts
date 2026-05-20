import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { crisisEvents } from "@db/schema";
import { eq } from "drizzle-orm";

export const crisisRouter = createRouter({
  getAllEvents: publicQuery
    .input(z.object({ severity: z.string().optional() }).optional())
    .query(async ({ input }) => {
      const db = getDb();
      if (input?.severity) {
        return db.select().from(crisisEvents)
          .where(eq(crisisEvents.severity, input.severity as "CRITICAL" | "WARNING" | "CAUTION"));
      }
      return db.select().from(crisisEvents).orderBy(crisisEvents.eventNumber);
    }),

  getEventById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const results = await db.select().from(crisisEvents).where(eq(crisisEvents.id, input.id));
      return results[0] ?? null;
    }),
});
