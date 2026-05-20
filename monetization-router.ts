import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { services, pricingTiers, usagePricing, revenueProjections, agents } from "@db/schema";
import { asc } from "drizzle-orm";

export const monetizationRouter = createRouter({
  getAllServices: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(services).orderBy(asc(services.rank));
  }),

  getPricingTiers: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(pricingTiers);
  }),

  getUsagePricing: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(usagePricing);
  }),

  getRevenueProjections: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(revenueProjections).orderBy(asc(revenueProjections.month));
  }),

  getAllAgents: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(agents);
  }),
});
