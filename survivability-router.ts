import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { validationResults, vulnerabilities, hardeningRecommendations } from "@db/schema";

export const survivabilityRouter = createRouter({
  getValidationResults: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(validationResults);
  }),

  getVulnerabilities: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(vulnerabilities);
  }),

  getHardeningRecommendations: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(hardeningRecommendations);
  }),

  getFinalScore: publicQuery.query(() => {
    return { score: 87, grade: "EXCELLENT", maxScore: 100 };
  }),
});
