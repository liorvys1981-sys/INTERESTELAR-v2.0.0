import {
  mysqlTable,
  serial,
  varchar,
  text,
  timestamp,
  int,
  decimal,
  mysqlEnum,
} from "drizzle-orm/mysql-core";

// ── Auth (existing) ──────────────────────────────────────────────
export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ── 1. Crisis Events ─────────────────────────────────────────────
export const crisisEvents = mysqlTable("crisis_events", {
  id: serial("id").primaryKey(),
  eventNumber: int("event_number").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  severity: mysqlEnum("severity", ["CRITICAL", "WARNING", "CAUTION"]).notNull(),
  impactValue: varchar("impact_value", { length: 100 }).notNull(),
  impactUnit: varchar("impact_unit", { length: 100 }).notNull(),
  mitigationAction: text("mitigation_action").notNull(),
  mitigationTimestamp: varchar("mitigation_timestamp", { length: 20 }).notNull(),
  detectionTimestamp: varchar("detection_timestamp", { length: 20 }).notNull(),
  status: mysqlEnum("status", ["ACTIVE", "RECOVERING", "RESOLVED"]).default("ACTIVE").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type CrisisEvent = typeof crisisEvents.$inferSelect;

// ── 2. Autonomous Decisions ──────────────────────────────────────
export const autonomousDecisions = mysqlTable("autonomous_decisions", {
  id: serial("id").primaryKey(),
  timestamp: varchar("timestamp", { length: 20 }).notNull(),
  decision: varchar("decision", { length: 255 }).notNull(),
  target: varchar("target", { length: 255 }).notNull(),
  impactDescription: text("impact_description").notNull(),
  status: mysqlEnum("status", ["ACTIVE", "RESOLVED", "PENDING"]).notNull(),
  severity: mysqlEnum("severity", ["CRITICAL", "WARNING", "CAUTION", "INFO"]).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type AutonomousDecision = typeof autonomousDecisions.$inferSelect;

// ── 3. Infrastructure Metrics ────────────────────────────────────
export const infrastructureMetrics = mysqlTable("infrastructure_metrics", {
  id: serial("id").primaryKey(),
  component: varchar("component", { length: 100 }).notNull(),
  metricName: varchar("metric_name", { length: 100 }).notNull(),
  currentValue: varchar("current_value", { length: 100 }).notNull(),
  baselineValue: varchar("baseline_value", { length: 100 }).notNull(),
  peakValue: varchar("peak_value", { length: 100 }).notNull(),
  unit: varchar("unit", { length: 50 }).notNull(),
  status: mysqlEnum("status", ["RECOVERED", "RECOVERING", "STABILIZED", "CRITICAL", "WARNING"]).notNull(),
  details: text("details"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type InfrastructureMetric = typeof infrastructureMetrics.$inferSelect;

// ── 4. Tenants ───────────────────────────────────────────────────
export const tenants = mysqlTable("tenants", {
  id: serial("id").primaryKey(),
  tenantId: varchar("tenant_id", { length: 50 }).notNull().unique(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  tier: varchar("tier", { length: 50 }).notNull(),
  apiCallsHourly: varchar("api_calls_hourly", { length: 50 }).notNull(),
  apiLimit: varchar("api_limit", { length: 50 }).notNull(),
  tokensHourly: varchar("tokens_hourly", { length: 50 }).notNull(),
  tokenLimit: varchar("token_limit", { length: 50 }).notNull(),
  costHourly: varchar("cost_hourly", { length: 50 }).notNull(),
  costAllocation: varchar("cost_allocation", { length: 50 }).notNull(),
  abuseLevel: varchar("abuse_level", { length: 50 }).notNull(),
  status: mysqlEnum("status", ["ISOLATED", "ACTIVE", "PENDING", "SUSPENDED"]).notNull(),
  isolatedAt: varchar("isolated_at", { length: 20 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Tenant = typeof tenants.$inferSelect;

// ── 5. Tenant Enforcement Log ────────────────────────────────────
export const tenantEnforcementLog = mysqlTable("tenant_enforcement_log", {
  id: serial("id").primaryKey(),
  timestamp: varchar("timestamp", { length: 20 }).notNull(),
  tenantId: varchar("tenant_id", { length: 50 }).notNull(),
  violation: text("violation").notNull(),
  actionTaken: text("action_taken").notNull(),
  result: varchar("result", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type TenantEnforcementEntry = typeof tenantEnforcementLog.$inferSelect;

// ── 6. Financial Metrics ─────────────────────────────────────────
export const financialMetrics = mysqlTable("financial_metrics", {
  id: serial("id").primaryKey(),
  metricName: varchar("metric_name", { length: 100 }).notNull(),
  currentValue: varchar("current_value", { length: 100 }).notNull(),
  baselineValue: varchar("baseline_value", { length: 100 }).notNull(),
  delta: varchar("delta", { length: 100 }).notNull(),
  unit: varchar("unit", { length: 50 }).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type FinancialMetric = typeof financialMetrics.$inferSelect;

// ── 7. Reserve Forecast ──────────────────────────────────────────
export const reserveForecast = mysqlTable("reserve_forecast", {
  id: serial("id").primaryKey(),
  hour: int("hour").notNull(),
  uncontrolledValue: decimal("uncontrolled_value", { precision: 12, scale: 2 }).notNull(),
  mitigatedValue: decimal("mitigated_value", { precision: 12, scale: 2 }).notNull(),
  criticalThreshold: decimal("critical_threshold", { precision: 12, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ReserveForecastPoint = typeof reserveForecast.$inferSelect;

// ── 8. Burn Rate Data ────────────────────────────────────────────
export const burnRateData = mysqlTable("burn_rate_data", {
  id: serial("id").primaryKey(),
  minute: int("minute").notNull(),
  projectedBurn: decimal("projected_burn", { precision: 10, scale: 2 }).notNull(),
  actualBurn: decimal("actual_burn", { precision: 10, scale: 2 }).notNull(),
  baselineBurn: decimal("baseline_burn", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type BurnRatePoint = typeof burnRateData.$inferSelect;

// ── 9. Audit Log ─────────────────────────────────────────────────
export const auditLog = mysqlTable("audit_log", {
  id: serial("id").primaryKey(),
  timestamp: varchar("timestamp", { length: 20 }).notNull(),
  eventType: varchar("event_type", { length: 100 }).notNull(),
  actor: varchar("actor", { length: 100 }).notNull(),
  actionHash: varchar("action_hash", { length: 64 }).notNull(),
  verificationStatus: mysqlEnum("verification_status", ["VERIFIED", "PENDING", "FAILED"]).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type AuditLogEntry = typeof auditLog.$inferSelect;

// ── 10. Governance Rules ─────────────────────────────────────────
export const governanceRules = mysqlTable("governance_rules", {
  id: serial("id").primaryKey(),
  ruleName: varchar("rule_name", { length: 255 }).notNull(),
  ruleValue: varchar("rule_value", { length: 255 }).notNull(),
  status: mysqlEnum("status", ["ACTIVE", "INACTIVE", "TRIGGERED"]).notNull(),
  preventedIncident: text("prevented_incident"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type GovernanceRule = typeof governanceRules.$inferSelect;

// ── 11. Recovery Log ─────────────────────────────────────────────
export const recoveryLog = mysqlTable("recovery_log", {
  id: serial("id").primaryKey(),
  timestamp: varchar("timestamp", { length: 20 }).notNull(),
  component: varchar("component", { length: 100 }).notNull(),
  action: varchar("action", { length: 255 }).notNull(),
  valueBefore: varchar("value_before", { length: 100 }).notNull(),
  valueAfter: varchar("value_after", { length: 100 }).notNull(),
  status: mysqlEnum("status", ["RECOVERED", "RECOVERING", "STABILIZED", "ACTIVE", "PENDING"]).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type RecoveryLogEntry = typeof recoveryLog.$inferSelect;

// ── 12. Services ─────────────────────────────────────────────────
export const services = mysqlTable("services", {
  id: serial("id").primaryKey(),
  rank: int("rank").notNull(),
  serviceName: varchar("service_name", { length: 255 }).notNull(),
  profitability: decimal("profitability", { precision: 3, scale: 1 }).notNull(),
  complexity: decimal("complexity", { precision: 3, scale: 1 }).notNull(),
  infraCost: varchar("infra_cost", { length: 50 }).notNull(),
  scalability: decimal("scalability", { precision: 3, scale: 1 }).notNull(),
  enterpriseValue: decimal("enterprise_value", { precision: 3, scale: 1 }).notNull(),
  launchPriority: mysqlEnum("launch_priority", ["IMMEDIATE", "SHORT_TERM", "MEDIUM_TERM", "DEFERRED"]).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Service = typeof services.$inferSelect;

// ── 13. Pricing Tiers ────────────────────────────────────────────
export const pricingTiers = mysqlTable("pricing_tiers", {
  id: serial("id").primaryKey(),
  tierName: varchar("tier_name", { length: 100 }).notNull(),
  monthlyPrice: int("monthly_price").notNull(),
  yearlyPrice: int("yearly_price").notNull(),
  targetSegment: text("target_segment").notNull(),
  featuresJson: text("features_json").notNull(),
  grossMargin: varchar("gross_margin", { length: 20 }).notNull(),
  infraCost: varchar("infra_cost", { length: 50 }).notNull(),
  supportCost: varchar("support_cost", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type PricingTier = typeof pricingTiers.$inferSelect;

// ── 14. Usage Pricing ────────────────────────────────────────────
export const usagePricing = mysqlTable("usage_pricing", {
  id: serial("id").primaryKey(),
  serviceName: varchar("service_name", { length: 255 }).notNull(),
  unit: varchar("unit", { length: 100 }).notNull(),
  starterPrice: varchar("starter_price", { length: 50 }).notNull(),
  growthPrice: varchar("growth_price", { length: 50 }).notNull(),
  proPrice: varchar("pro_price", { length: 50 }).notNull(),
  enterprisePrice: varchar("enterprise_price", { length: 50 }).notNull(),
  ourCost: varchar("our_cost", { length: 50 }).notNull(),
  margin: varchar("margin", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type UsagePricingEntry = typeof usagePricing.$inferSelect;

// ── 15. Revenue Projections ──────────────────────────────────────
export const revenueProjections = mysqlTable("revenue_projections", {
  id: serial("id").primaryKey(),
  month: int("month").notNull(),
  starterMrr: decimal("starter_mrr", { precision: 10, scale: 2 }).notNull(),
  growthMrr: decimal("growth_mrr", { precision: 10, scale: 2 }).notNull(),
  proMrr: decimal("pro_mrr", { precision: 10, scale: 2 }).notNull(),
  enterpriseMrr: decimal("enterprise_mrr", { precision: 10, scale: 2 }).notNull(),
  totalMrr: decimal("total_mrr", { precision: 12, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type RevenueProjection = typeof revenueProjections.$inferSelect;

// ── 16. Agents ───────────────────────────────────────────────────
export const agents = mysqlTable("agents", {
  id: serial("id").primaryKey(),
  agentName: varchar("agent_name", { length: 255 }).notNull(),
  agentType: mysqlEnum("agent_type", ["DIRECT", "ENABLER"]).notNull(),
  description: text("description").notNull(),
  capabilitiesJson: text("capabilities_json"),
  revenueImpact: varchar("revenue_impact", { length: 100 }).notNull(),
  cost: varchar("cost", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Agent = typeof agents.$inferSelect;

// ── 17. Vulnerabilities ──────────────────────────────────────────
export const vulnerabilities = mysqlTable("vulnerabilities", {
  id: serial("id").primaryKey(),
  severity: mysqlEnum("severity", ["HIGH", "MEDIUM", "LOW"]).notNull(),
  vulnerability: varchar("vulnerability", { length: 255 }).notNull(),
  impactDescription: text("impact_description").notNull(),
  mitigationStatus: text("mitigation_status").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Vulnerability = typeof vulnerabilities.$inferSelect;

// ── 18. Hardening Recommendations ────────────────────────────────
export const hardeningRecommendations = mysqlTable("hardening_recommendations", {
  id: serial("id").primaryKey(),
  priority: mysqlEnum("priority", ["HIGH", "MEDIUM", "LOW"]).notNull(),
  recommendation: varchar("recommendation", { length: 255 }).notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type HardeningRecommendation = typeof hardeningRecommendations.$inferSelect;

// ── 19. Validation Results ───────────────────────────────────────
export const validationResults = mysqlTable("validation_results", {
  id: serial("id").primaryKey(),
  validationName: varchar("validation_name", { length: 255 }).notNull(),
  result: mysqlEnum("result", ["PASS", "FAIL"]).notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ValidationResult = typeof validationResults.$inferSelect;

// ── 20. Infrastructure Status (current snapshot) ─────────────────
export const infrastructureStatus = mysqlTable("infrastructure_status", {
  id: serial("id").primaryKey(),
  component: varchar("component", { length: 100 }).notNull(),
  currentMetric: varchar("current_metric", { length: 100 }).notNull(),
  baseline: varchar("baseline", { length: 100 }).notNull(),
  unit: varchar("unit", { length: 50 }).notNull(),
  status: mysqlEnum("status", ["RECOVERED", "RECOVERING", "STABILIZED", "CRITICAL", "WARNING"]).notNull(),
  details: text("details"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type InfrastructureStatus = typeof infrastructureStatus.$inferSelect;
