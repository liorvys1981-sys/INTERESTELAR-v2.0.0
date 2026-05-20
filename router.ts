import { authRouter } from "./auth-router";
import { createRouter, publicQuery } from "./middleware";
import { crisisRouter } from "./crisis-router";
import { decisionsRouter } from "./decisions-router";
import { infrastructureRouter } from "./infrastructure-router";
import { tenantRouter } from "./tenant-router";
import { financialRouter } from "./financial-router";
import { auditRouter } from "./audit-router";
import { governanceRouter } from "./governance-router";
import { monetizationRouter } from "./monetization-router";
import { survivabilityRouter } from "./survivability-router";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  crisis: crisisRouter,
  decisions: decisionsRouter,
  infrastructure: infrastructureRouter,
  tenant: tenantRouter,
  financial: financialRouter,
  audit: auditRouter,
  governance: governanceRouter,
  monetization: monetizationRouter,
  survivability: survivabilityRouter,
});

export type AppRouter = typeof appRouter;
