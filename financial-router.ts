import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { financialMetrics, reserveForecast, burnRateData } from "@db/schema";
import { asc } from "drizzle-orm";

export const financialRouter = createRouter({
  getAllMetrics: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(financialMetrics);
  }),

  getReserveForecast: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(reserveForecast).orderBy(asc(reserveForecast.hour));
  }),

  getBurnRateData: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(burnRateData).orderBy(asc(burnRateData.minute));
  }),
});
