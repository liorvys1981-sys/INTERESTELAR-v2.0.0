import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { governanceRules, autonomousDecisions } from "@db/schema";

export const governanceRouter = createRouter({
  getFirewallRules: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(governanceRules);
  }),

  getDecisionLog: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(autonomousDecisions).orderBy(autonomousDecisions.timestamp);
  }),
});
