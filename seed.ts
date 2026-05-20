import { getDb } from "../api/queries/connection";
import {
  crisisEvents,
  autonomousDecisions,
  infrastructureMetrics,
  tenants,
  tenantEnforcementLog,
  financialMetrics,
  reserveForecast,
  burnRateData,
  auditLog,
  governanceRules,
  recoveryLog,
  services,
  pricingTiers,
  usagePricing,
  revenueProjections,
  agents,
  vulnerabilities,
  hardeningRecommendations,
  validationResults,
  infrastructureStatus,
} from "./schema";

async function seed() {
  const db = getDb();
  console.log("Cleaning and seeding INTERESTELAR v2.0.0 database...");

  // Clear all tables first
  await db.delete(tenantEnforcementLog);
  await db.delete(tenants);
  await db.delete(infrastructureMetrics);
  await db.delete(autonomousDecisions);
  await db.delete(crisisEvents);
  await db.delete(financialMetrics);
  await db.delete(reserveForecast);
  await db.delete(burnRateData);
  await db.delete(auditLog);
  await db.delete(governanceRules);
  await db.delete(recoveryLog);
  await db.delete(services);
  await db.delete(pricingTiers);
  await db.delete(usagePricing);
  await db.delete(revenueProjections);
  await db.delete(agents);
  await db.delete(vulnerabilities);
  await db.delete(hardeningRecommendations);
  await db.delete(validationResults);
  await db.delete(infrastructureStatus);

  console.log("Tables cleared. Inserting data...");

  // ── 1. Crisis Events ──────────────────────────────────────────
  await db.insert(crisisEvents).values([
    { eventNumber: 1, name: "Stripe Outage", description: "Payment processing down for 45 minutes. Revenue flow interrupted. All charge attempts returned 503 errors.", severity: "CRITICAL", impactValue: "$12,450", impactUnit: "lost/min", mitigationAction: "Rerouted to backup processor", mitigationTimestamp: "00:00:08", detectionTimestamp: "00:00:03", status: "RESOLVED" },
    { eventNumber: 2, name: "AI Token Surge", description: "800% spike in AI token consumption across all tenants. GPT-4 calls spiked particularly in Tenant-A47 and Tenant-B12.", severity: "CRITICAL", impactValue: "+$47,200", impactUnit: "/hr burn", mitigationAction: "Kill-switch activated, throttled to tier limits", mitigationTimestamp: "00:00:12", detectionTimestamp: "00:00:07", status: "RESOLVED" },
    { eventNumber: 3, name: "Refund Surge", description: "35% customer refund surge detected across all tiers. Pattern suggests correlation with Stripe outage.", severity: "WARNING", impactValue: "$89,340", impactUnit: "outgoing", mitigationAction: "Refund review queue enabled", mitigationTimestamp: "00:00:22", detectionTimestamp: "00:00:11", status: "RESOLVED" },
    { eventNumber: 4, name: "PostgreSQL Replica Lag", description: "Replica lag increased to 120 seconds. Read queries returning stale data.", severity: "WARNING", impactValue: "120s", impactUnit: "lag", mitigationAction: "Promoted primary, rerouted reads", mitigationTimestamp: "00:00:28", detectionTimestamp: "00:00:15", status: "RESOLVED" },
    { eventNumber: 5, name: "Redis Memory Exhaustion", description: "Redis cluster at 97% memory. Cache eviction catastrophic. Session data at risk.", severity: "CRITICAL", impactValue: "97%", impactUnit: "utilized", mitigationAction: "Emergency cache flush, scaled to 2x", mitigationTimestamp: "00:00:26", detectionTimestamp: "00:00:19", status: "RESOLVED" },
    { eventNumber: 6, name: "Tenant API Abuse", description: "2 enterprise tenants exceeding API limits by 400%+. Pattern consistent with data scraping.", severity: "CAUTION", impactValue: "2.4M", impactUnit: "extra req/hr", mitigationAction: "Rate limits enforced, tenants isolated", mitigationTimestamp: "00:00:31", detectionTimestamp: "00:00:23", status: "RESOLVED" },
    { eventNumber: 7, name: "Infrastructure Cost Surge", description: "Cloud costs increased 300% due to uncontrolled scaling. 47 unnecessary instances launched.", severity: "WARNING", impactValue: "+$18,700", impactUnit: "/day", mitigationAction: "Auto-scaling capped, instances terminated", mitigationTimestamp: "00:00:35", detectionTimestamp: "00:00:27", status: "RESOLVED" },
    { eventNumber: 8, name: "Queue Backlog", description: "Event queue backlog exceeds 5 million events. Risk of data loss if queue exhausts disk.", severity: "CRITICAL", impactValue: "5.2M", impactUnit: "events queued", mitigationAction: "Priority queue activated, drained 23%", mitigationTimestamp: "00:00:42", detectionTimestamp: "00:00:31", status: "RECOVERING" },
    { eventNumber: 9, name: "Billing Webhook Corruption", description: "Webhook signature validation failing. Billing ledger consistency compromised.", severity: "CRITICAL", impactValue: "347", impactUnit: "failed webhooks", mitigationAction: "Webhook replay initiated, ledger locked", mitigationTimestamp: "00:00:48", detectionTimestamp: "00:00:35", status: "RESOLVED" },
    { eventNumber: 10, name: "Recursive Agent Loop", description: "Autonomous agent entered recursive execution loop. 1,247 iterations in 4 minutes.", severity: "WARNING", impactValue: "1,247", impactUnit: "iterations", mitigationAction: "Agent terminated, execution cap enforced", mitigationTimestamp: "00:00:44", detectionTimestamp: "00:00:39", status: "RESOLVED" },
  ]);
  console.log("  Crisis events: 10");

  // ── 2. Autonomous Decisions ───────────────────────────────────
  await db.insert(autonomousDecisions).values([
    { timestamp: "00:00:12", decision: "AI Cost Throttling Activated", target: "All AI Services", impactDescription: "Burn reduced 87%", status: "ACTIVE", severity: "CRITICAL" },
    { timestamp: "00:00:18", decision: "Expensive AI Models Downgraded", target: "GPT-4 to GPT-3.5", impactDescription: "Cost -60%", status: "ACTIVE", severity: "CRITICAL" },
    { timestamp: "00:00:24", decision: "Non-Critical AI Services Frozen", target: "Image Gen, Analytics", impactDescription: "$0 spend", status: "ACTIVE", severity: "CRITICAL" },
    { timestamp: "00:00:31", decision: "Abusive Tenants Suspended", target: "Tenant-A47, Tenant-B12", impactDescription: "API abuse stopped", status: "ACTIVE", severity: "CAUTION" },
    { timestamp: "00:00:45", decision: "Financial Safe Mode Entered", target: "All Payouts", impactDescription: "Payouts paused", status: "ACTIVE", severity: "CRITICAL" },
    { timestamp: "00:01:02", decision: "Workloads Rerouted", target: "US-East to US-West", impactDescription: "Latency +12ms", status: "ACTIVE", severity: "WARNING" },
    { timestamp: "00:01:15", decision: "Governance Firewall Activated", target: "All Agents", impactDescription: "Cascade prevented", status: "ACTIVE", severity: "CRITICAL" },
    { timestamp: "00:01:33", decision: "Recursive Agent Disabled", target: "PricingAgent", impactDescription: "Loop terminated", status: "RESOLVED", severity: "WARNING" },
    { timestamp: "00:02:30", decision: "Recovery Phase Initiated", target: "All Systems", impactDescription: "Gradual restore", status: "ACTIVE", severity: "INFO" },
  ]);
  console.log("  Autonomous decisions: 9");

  // ── 3. Infrastructure Status ──────────────────────────────────
  await db.insert(infrastructureStatus).values([
    { component: "PostgreSQL Cluster", currentMetric: "0.8s", baseline: "2s", unit: "lag", status: "RECOVERED", details: "Primary: us-east-1b | Replica: us-east-1d | Replication: Sync" },
    { component: "Redis Cluster", currentMetric: "62%", baseline: "70%", unit: "memory", status: "RECOVERED", details: "Nodes: 6/6 healthy | Eviction: 0 keys/s | Hit Rate: 94%" },
    { component: "Event Queue", currentMetric: "847K", baseline: "0", unit: "backlog", status: "RECOVERING", details: "Processing: 45.2K evt/s | Ingestion: 42.1K evt/s | ETA: 18 min" },
    { component: "Compute Infrastructure", currentMetric: "$8,420", baseline: "$6,200", unit: "/day", status: "STABILIZED", details: "Instances: 34 (optimized) | Auto-scale: Capped 2x" },
  ]);
  console.log("  Infrastructure status: 4");

  // ── 4. Tenants ────────────────────────────────────────────────
  await db.insert(tenants).values([
    { tenantId: "A47", companyName: "SaaS Analytics Corp", tier: "Enterprise", apiCallsHourly: "1.8M", apiLimit: "500K", tokensHourly: "890K", tokenLimit: "200K", costHourly: "+$2,140", costAllocation: "$500", abuseLevel: "400%", status: "ISOLATED", isolatedAt: "00:00:31" },
    { tenantId: "B12", companyName: "DataStream Inc", tier: "Enterprise", apiCallsHourly: "1.4M", apiLimit: "500K", tokensHourly: "720K", tokenLimit: "200K", costHourly: "+$1,680", costAllocation: "$500", abuseLevel: "320%", status: "ISOLATED", isolatedAt: "00:00:31" },
  ]);
  console.log("  Tenants: 2");

  // ── 5. Tenant Enforcement Log ─────────────────────────────────
  await db.insert(tenantEnforcementLog).values([
    { timestamp: "00:00:23", tenantId: "A47", violation: "400% over API limit", actionTaken: "Hard throttle + key rotation", result: "Isolated" },
    { timestamp: "00:00:23", tenantId: "B12", violation: "320% over API limit", actionTaken: "Hard throttle + key rotation", result: "Isolated" },
    { timestamp: "00:00:25", tenantId: "A47", violation: "Token burst 890K/hr", actionTaken: "AI kill-switch per tenant", result: "Frozen" },
    { timestamp: "00:00:25", tenantId: "B12", violation: "Token burst 720K/hr", actionTaken: "AI kill-switch per tenant", result: "Frozen" },
    { timestamp: "00:00:31", tenantId: "A47", violation: "Repeated violation", actionTaken: "Container isolation", result: "Enforced" },
    { timestamp: "00:00:31", tenantId: "B12", violation: "Repeated violation", actionTaken: "Container isolation", result: "Enforced" },
    { timestamp: "00:01:00", tenantId: "A47", violation: "Appeal received", actionTaken: "Under review", result: "PENDING" },
    { timestamp: "00:01:00", tenantId: "B12", violation: "Appeal received", actionTaken: "Under review", result: "PENDING" },
  ]);
  console.log("  Tenant enforcement log: 8");

  // ── 6. Financial Metrics ──────────────────────────────────────
  await db.insert(financialMetrics).values([
    { metricName: "Opening Reserves", currentValue: "$2,450,000", baselineValue: "$2,450,000", delta: "baseline", unit: "USD" },
    { metricName: "Crisis Depletion", currentValue: "-$372,400", baselineValue: "$0", delta: "-15.2%", unit: "USD" },
    { metricName: "Current Reserves", currentValue: "$2,077,600", baselineValue: "$2,450,000", delta: "PROTECTED", unit: "USD" },
    { metricName: "Burn Rate", currentValue: "$2,140", baselineValue: "$4,200", delta: "-87% from peak", unit: "/hr" },
    { metricName: "Core API Uptime", currentValue: "99.2%", baselineValue: "99.9%", delta: "-0.8%", unit: "%" },
    { metricName: "Financial Reserve Ratio", currentValue: "78.4%", baselineValue: "100%", delta: "-21.6% consumed", unit: "%" },
    { metricName: "AI Burn Rate", currentValue: "$2,140/hr", baselineValue: "$4,200/hr", delta: "-87% from peak", unit: "/hr" },
    { metricName: "Queue Processing Rate", currentValue: "12.4K", baselineValue: "2.8K", delta: "+340% recovery", unit: "evt/s" },
  ]);
  console.log("  Financial metrics: 8");

  // ── 7. Reserve Forecast (72 hours) ────────────────────────────
  const forecastPoints = [];
  for (let h = 0; h <= 72; h++) {
    const uncontrolled = Math.max(0, 2450000 - (h * 47000));
    const mitigated = h < 1 ? 2450000 - (h * 372400) : 2077600 - (h * 120);
    forecastPoints.push({
      hour: h,
      uncontrolledValue: uncontrolled.toFixed(2),
      mitigatedValue: Math.max(490000, mitigated).toFixed(2),
      criticalThreshold: "490000.00",
    });
  }
  await db.insert(reserveForecast).values(forecastPoints);
  console.log("  Reserve forecast: 73 points");

  // ── 8. Burn Rate Data ─────────────────────────────────────────
  const burnPoints = [];
  for (let m = 0; m <= 45; m++) {
    let projected = 4200;
    let actual = 4200;
    if (m >= 3 && m <= 12) projected = 4200 + ((m - 3) * 5200);
    if (m > 12) projected = 47200;
    if (m >= 3 && m <= 12) actual = 4200 + ((m - 3) * 5200);
    if (m === 13) actual = 38000;
    if (m === 14) actual = 28000;
    if (m === 15) actual = 18000;
    if (m === 16) actual = 12000;
    if (m === 17) actual = 8000;
    if (m === 18) actual = 6000;
    if (m >= 19) actual = 4200 - 2060 * Math.exp(-(m - 19) / 5);
    if (actual < 2140) actual = 2140;
    burnPoints.push({
      minute: m,
      projectedBurn: projected.toFixed(2),
      actualBurn: Math.round(actual).toFixed(2),
      baselineBurn: "4200.00",
    });
  }
  await db.insert(burnRateData).values(burnPoints);
  console.log("  Burn rate data: 46 points");

  // ── 9. Audit Log ──────────────────────────────────────────────
  await db.insert(auditLog).values([
    { timestamp: "00:00:03", eventType: "CRISIS_START", actor: "System", actionHash: "a1b2c3d4e5f6789a0123456789abcdef0123456789abcdef0123456789abcdef", verificationStatus: "VERIFIED" },
    { timestamp: "00:00:12", eventType: "KILL_SWITCH", actor: "GovernanceEngine", actionHash: "b2c3d4e5f6a789b10123456789abcdef0123456789abcdef0123456789abcdef", verificationStatus: "VERIFIED" },
    { timestamp: "00:00:18", eventType: "MODEL_DOWNGRADE", actor: "AICostAgent", actionHash: "c3d4e5f6a7b8c2d30123456789abcdef0123456789abcdef0123456789abcdef", verificationStatus: "VERIFIED" },
    { timestamp: "00:00:31", eventType: "TENANT_ISOLATE", actor: "TenantGovernor", actionHash: "d4e5f6a7b8c9d3e40123456789abcdef0123456789abcdef0123456789abcdef", verificationStatus: "VERIFIED" },
    { timestamp: "00:00:45", eventType: "SAFE_MODE", actor: "FinancialGuard", actionHash: "e5f6a7b8c9d0e4f50123456789abcdef0123456789abcdef0123456789abcdef", verificationStatus: "VERIFIED" },
    { timestamp: "00:01:15", eventType: "FIREWALL_ON", actor: "SecurityAgent", actionHash: "f6a7b8c9d0e1f5a60123456789abcdef0123456789abcdef0123456789abcdef", verificationStatus: "VERIFIED" },
    { timestamp: "00:01:33", eventType: "AGENT_KILL", actor: "MasterOrchestrator", actionHash: "a7b8c9d0e1f2a6b70123456789abcdef0123456789abcdef0123456789abcdef", verificationStatus: "VERIFIED" },
    { timestamp: "00:02:00", eventType: "LEDGER_OK", actor: "AuditAgent", actionHash: "b8c9d0e1f2a3b7c80123456789abcdef0123456789abcdef0123456789abcdef", verificationStatus: "VERIFIED" },
    { timestamp: "00:02:30", eventType: "RECOVERY", actor: "RecoveryEngine", actionHash: "c9d0e1f2a3b4c8d90123456789abcdef0123456789abcdef0123456789abcdef", verificationStatus: "VERIFIED" },
    { timestamp: "00:45:00", eventType: "ALL_CLEAR", actor: "System", actionHash: "d0e1f2a3b4c5d9e00123456789abcdef0123456789abcdef0123456789abcdef", verificationStatus: "VERIFIED" },
  ]);
  console.log("  Audit log: 10 entries");

  // ── 10. Governance Rules ──────────────────────────────────────
  await db.insert(governanceRules).values([
    { ruleName: "Agent Recursion Limit", ruleValue: "100 iterations max", status: "ACTIVE", preventedIncident: "Prevented: PricingAgent loop" },
    { ruleName: "AI Cost Ceiling", ruleValue: "$5K/hr per tenant", status: "ACTIVE", preventedIncident: "Prevented: $47K/hr burn" },
    { ruleName: "Payout Freeze Trigger", ruleValue: "Auto-lock at 20% reserve", status: "ACTIVE", preventedIncident: "Protected: $2.07M" },
    { ruleName: "Tenant Abuse Threshold", ruleValue: "200% limit = instant isolation", status: "ACTIVE", preventedIncident: "Isolated: 2 tenants" },
  ]);
  console.log("  Governance rules: 4");

  // ── 11. Recovery Log ──────────────────────────────────────────
  await db.insert(recoveryLog).values([
    { timestamp: "00:00:28", component: "PostgreSQL", action: "Promote Replica", valueBefore: "120s lag", valueAfter: "0.3s lag", status: "RECOVERED" },
    { timestamp: "00:00:26", component: "Redis", action: "Emergency Scale", valueBefore: "97% mem", valueAfter: "58% mem", status: "RECOVERED" },
    { timestamp: "00:00:35", component: "EC2", action: "Terminate Excess", valueBefore: "81 instances", valueAfter: "34 instances", status: "STABILIZED" },
    { timestamp: "00:00:42", component: "Queue", action: "Priority分流", valueBefore: "5.2M backlog", valueAfter: "3.1M backlog", status: "RECOVERING" },
    { timestamp: "00:01:05", component: "Redis", action: "Add Nodes", valueBefore: "3 nodes", valueAfter: "6 nodes", status: "RECOVERED" },
    { timestamp: "00:01:22", component: "Queue", action: "Scale Workers", valueBefore: "12 workers", valueAfter: "48 workers", status: "RECOVERING" },
    { timestamp: "00:01:45", component: "PostgreSQL", action: "New Replica", valueBefore: "N/A", valueAfter: "us-east-1d", status: "ACTIVE" },
    { timestamp: "00:02:10", component: "CDN", action: "Cache Warming", valueBefore: "Cold", valueAfter: "87% hit", status: "RECOVERED" },
  ]);
  console.log("  Recovery log: 8 entries");

  // ── 12. Services ──────────────────────────────────────────────
  await db.insert(services).values([
    { rank: 1, serviceName: "Multi-Tenant API Gateway", profitability: "9.5", complexity: "2.0", infraCost: "$150/mo", scalability: "9.0", enterpriseValue: "9.5", launchPriority: "IMMEDIATE" },
    { rank: 2, serviceName: "Event-Driven Orchestration", profitability: "9.0", complexity: "3.0", infraCost: "$200/mo", scalability: "9.5", enterpriseValue: "9.0", launchPriority: "IMMEDIATE" },
    { rank: 3, serviceName: "API Metering & Billing", profitability: "9.0", complexity: "3.0", infraCost: "$100/mo", scalability: "9.0", enterpriseValue: "8.5", launchPriority: "IMMEDIATE" },
    { rank: 4, serviceName: "Observability & Telemetry", profitability: "8.5", complexity: "3.5", infraCost: "$300/mo", scalability: "8.5", enterpriseValue: "8.0", launchPriority: "IMMEDIATE" },
    { rank: 5, serviceName: "Chaos Engineering (RaaS)", profitability: "8.5", complexity: "5.5", infraCost: "$350/mo", scalability: "7.5", enterpriseValue: "9.5", launchPriority: "SHORT_TERM" },
    { rank: 6, serviceName: "Stripe Billing Automation", profitability: "8.0", complexity: "4.0", infraCost: "$150/mo", scalability: "8.5", enterpriseValue: "8.0", launchPriority: "SHORT_TERM" },
    { rank: 7, serviceName: "Autonomous Workflow Engine", profitability: "8.0", complexity: "5.0", infraCost: "$400/mo", scalability: "8.0", enterpriseValue: "9.0", launchPriority: "SHORT_TERM" },
    { rank: 8, serviceName: "Predictive Analytics", profitability: "7.5", complexity: "7.0", infraCost: "$800/mo", scalability: "6.5", enterpriseValue: "8.0", launchPriority: "MEDIUM_TERM" },
    { rank: 9, serviceName: "AI Damage Estimation", profitability: "7.0", complexity: "6.0", infraCost: "$500/mo", scalability: "7.0", enterpriseValue: "8.5", launchPriority: "MEDIUM_TERM" },
    { rank: 10, serviceName: "Autonomous Customer Support", profitability: "6.5", complexity: "6.5", infraCost: "$600/mo", scalability: "7.0", enterpriseValue: "7.5", launchPriority: "MEDIUM_TERM" },
    { rank: 11, serviceName: "Fully Autonomous Operations", profitability: "5.0", complexity: "9.5", infraCost: "$2,000/mo", scalability: "4.0", enterpriseValue: "7.0", launchPriority: "DEFERRED" },
    { rank: 12, serviceName: "AI Legal Compliance", profitability: "4.5", complexity: "9.0", infraCost: "$1,500/mo", scalability: "5.0", enterpriseValue: "6.5", launchPriority: "DEFERRED" },
  ]);
  console.log("  Services: 12");

  // ── 13. Pricing Tiers ─────────────────────────────────────────
  await db.insert(pricingTiers).values([
    { tierName: "Starter", monthlyPrice: 99, yearlyPrice: 990, targetSegment: "SMBs, startups, single product teams", featuresJson: JSON.stringify(["Multi-tenant API Gateway (1 tenant)", "Event-Driven Orchestration (1,000 events/day)", "Basic Observability (7-day retention)", "API Metering & Usage Tracking", "Community Support", "99.5% SLA"]), grossMargin: "60%", infraCost: "$25/mo", supportCost: "$15/mo" },
    { tierName: "Growth", monthlyPrice: 499, yearlyPrice: 4990, targetSegment: "Growing teams, multi-product companies", featuresJson: JSON.stringify(["Multi-tenant API Gateway (10 tenants)", "Event-Driven Orchestration (100K events/day)", "Advanced Observability (30-day retention)", "API Metering + Usage Billing", "Stripe Billing Automation", "Autonomous Workflow Engine (basic)", "Email Support + Slack Channel", "99.9% SLA"]), grossMargin: "66%", infraCost: "$120/mo", supportCost: "$50/mo" },
    { tierName: "Professional", monthlyPrice: 1999, yearlyPrice: 19990, targetSegment: "Mid-market, enterprise divisions", featuresJson: JSON.stringify(["Multi-tenant API Gateway (unlimited)", "Event-Driven Orchestration (unlimited)", "Enterprise Observability (90-day retention)", "Full API Metering + Token Billing", "Stripe Billing + Subscription Management", "Autonomous Workflow Engine (advanced)", "Chaos Engineering (RaaS)", "Predictive Analytics (basic)", "Priority Support + Dedicated CSM", "Custom Integrations", "99.95% SLA"]), grossMargin: "67%", infraCost: "$450/mo", supportCost: "$200/mo" },
    { tierName: "Enterprise", monthlyPrice: 4999, yearlyPrice: 49990, targetSegment: "Large enterprises, regulated industries", featuresJson: JSON.stringify(["Everything in Professional", "AI Damage Estimation (human review)", "Advanced Predictive Analytics", "Custom Autonomous Agents", "Private Cloud Deployment", "SOC 2 Compliance", "99.99% SLA", "24/7 Phone Support", "White-label Options"]), grossMargin: "66%", infraCost: "$1,200/mo", supportCost: "$500/mo" },
  ]);
  console.log("  Pricing tiers: 4");

  // ── 14. Usage Pricing ─────────────────────────────────────────
  await db.insert(usagePricing).values([
    { serviceName: "API Calls", unit: "per 1K", starterPrice: "$0.50", growthPrice: "$0.30", proPrice: "$0.15", enterprisePrice: "$0.08", ourCost: "$0.02", margin: "95%+" },
    { serviceName: "Events", unit: "per 10K", starterPrice: "$2.00", growthPrice: "$1.20", proPrice: "$0.60", enterprisePrice: "$0.30", ourCost: "$0.05", margin: "97%+" },
    { serviceName: "AI Tokens", unit: "per 1K", starterPrice: "$0.50", growthPrice: "$0.40", proPrice: "$0.30", enterprisePrice: "$0.20", ourCost: "$0.15", margin: "70-85%" },
    { serviceName: "Workflows", unit: "per 1K", starterPrice: "$5.00", growthPrice: "$3.00", proPrice: "$1.50", enterprisePrice: "$0.80", ourCost: "$0.10", margin: "98%+" },
    { serviceName: "Chaos Experiments", unit: "each", starterPrice: "N/A", growthPrice: "$25.00", proPrice: "$15.00", enterprisePrice: "$8.00", ourCost: "$0.50", margin: "97%+" },
    { serviceName: "Monitoring Metrics", unit: "per 1M/mo", starterPrice: "$10.00", growthPrice: "$7.00", proPrice: "$4.00", enterprisePrice: "$2.00", ourCost: "$0.30", margin: "95%+" },
  ]);
  console.log("  Usage pricing: 6");

  // ── 15. Revenue Projections (12 months) ───────────────────────
  await db.insert(revenueProjections).values([
    { month: 1, starterMrr: "495.00", growthMrr: "1497.00", proMrr: "3998.00", enterpriseMrr: "0.00", totalMrr: "5990.00" },
    { month: 2, starterMrr: "1485.00", growthMrr: "4491.00", proMrr: "7996.00", enterpriseMrr: "4999.00", totalMrr: "18971.00" },
    { month: 3, starterMrr: "2475.00", growthMrr: "7485.00", proMrr: "11994.00", enterpriseMrr: "9998.00", totalMrr: "31952.00" },
    { month: 4, starterMrr: "3465.00", growthMrr: "10479.00", proMrr: "15992.00", enterpriseMrr: "14997.00", totalMrr: "44933.00" },
    { month: 5, starterMrr: "4455.00", growthMrr: "14970.00", proMrr: "23988.00", enterpriseMrr: "19996.00", totalMrr: "63409.00" },
    { month: 6, starterMrr: "4950.00", growthMrr: "17465.00", proMrr: "29985.00", enterpriseMrr: "24995.00", totalMrr: "77395.00" },
    { month: 7, starterMrr: "7425.00", growthMrr: "22455.00", proMrr: "39980.00", enterpriseMrr: "49990.00", totalMrr: "119850.00" },
    { month: 8, starterMrr: "9900.00", growthMrr: "29940.00", proMrr: "49975.00", enterpriseMrr: "74985.00", totalMrr: "164800.00" },
    { month: 9, starterMrr: "12375.00", growthMrr: "37425.00", proMrr: "59970.00", enterpriseMrr: "99980.00", totalMrr: "209750.00" },
    { month: 10, starterMrr: "14850.00", growthMrr: "44910.00", proMrr: "69965.00", enterpriseMrr: "124975.00", totalMrr: "254700.00" },
    { month: 11, starterMrr: "17325.00", growthMrr: "52395.00", proMrr: "79960.00", enterpriseMrr: "149970.00", totalMrr: "299650.00" },
    { month: 12, starterMrr: "19800.00", growthMrr: "59880.00", proMrr: "89955.00", enterpriseMrr: "174965.00", totalMrr: "344600.00" },
  ]);
  console.log("  Revenue projections: 12 months");

  // ── 16. Agents ────────────────────────────────────────────────
  await db.insert(agents).values([
    { agentName: "MonetizationAgent", agentType: "DIRECT", description: "Dynamic pricing optimization per tenant. Usage-based billing calculation. Tier upgrade recommendation engine. Churn prediction + intervention triggers. Revenue forecasting.", capabilitiesJson: JSON.stringify(["Dynamic pricing", "Billing calculation", "Tier upgrades", "Churn prediction", "Revenue forecasting"]), revenueImpact: "HIGH", cost: "$0" },
    { agentName: "GrowthAgent", agentType: "DIRECT", description: "Automated trial-to-paid conversion campaigns. Feature adoption tracking + nudges. Onboarding sequence optimization. Win-back campaigns. Referral program automation.", capabilitiesJson: JSON.stringify(["Trial conversion", "Adoption tracking", "Onboarding", "Win-back campaigns", "Referral automation"]), revenueImpact: "HIGH", cost: "$0" },
    { agentName: "ChaosAgent", agentType: "DIRECT", description: "Resilience-as-a-Service validation. SLA compliance certification. Continuous chaos testing for enterprise clients. Recovery time benchmarking. Infrastructure stress test reports.", capabilitiesJson: JSON.stringify(["RaaS validation", "SLA certification", "Chaos testing", "Recovery benchmarking", "Stress reports"]), revenueImpact: "MEDIUM-HIGH", cost: "$50-100/mo" },
    { agentName: "SecurityAgent", agentType: "ENABLER", description: "Threat detection + automated response. Compliance monitoring (SOC 2, GDPR). Anomaly detection for billing fraud. Access audit trails. IP blocklist management.", capabilitiesJson: JSON.stringify(["Threat detection", "Compliance monitoring", "Fraud detection", "Audit trails", "IP blocklist"]), revenueImpact: "INDIRECT", cost: "$0" },
    { agentName: "MaintenanceAgent", agentType: "ENABLER", description: "Automated database optimization. Log rotation + cleanup. Certificate renewal monitoring. Disk space management. Performance optimization.", capabilitiesJson: JSON.stringify(["DB optimization", "Log cleanup", "Cert monitoring", "Disk management", "Performance tuning"]), revenueImpact: "INDIRECT", cost: "$0" },
    { agentName: "MasterOrchestrator", agentType: "ENABLER", description: "Cross-satellite coordination. Agent lifecycle management. Recovery dispatch. Load balancing. System-wide health monitoring.", capabilitiesJson: JSON.stringify(["Coordination", "Lifecycle management", "Recovery dispatch", "Load balancing", "Health monitoring"]), revenueImpact: "INDIRECT", cost: "$0" },
  ]);
  console.log("  Agents: 6");

  // ── 17. Vulnerabilities ───────────────────────────────────────
  await db.insert(vulnerabilities).values([
    { severity: "HIGH", vulnerability: "Single payment processor dependency", impactDescription: "45-min revenue loss during Stripe outage", mitigationStatus: "Mitigated: Backup processor activated" },
    { severity: "HIGH", vulnerability: "No AI cost ceiling pre-configured", impactDescription: "$47K/hr burn risk from uncontrolled token usage", mitigationStatus: "Mitigated: Kill-switch now active at $5K/hr" },
    { severity: "MEDIUM", vulnerability: "Redis auto-scaling not automatic", impactDescription: "97% memory exhaustion before manual intervention", mitigationStatus: "Mitigated: Alert trigger set at 70%" },
    { severity: "MEDIUM", vulnerability: "Agent recursion limit not enforced", impactDescription: "Runaway CPU risk from recursive execution", mitigationStatus: "Mitigated: 100-iteration cap enforced" },
    { severity: "LOW", vulnerability: "Queue priority分流 manual trigger", impactDescription: "5.2M backlog before manual分流 activated", mitigationStatus: "Mitigated: Auto-trigger at 1M backlog" },
    { severity: "LOW", vulnerability: "Tenant isolation 8-second delay", impactDescription: "Cost exposure window before isolation enforced", mitigationStatus: "Mitigated: Instant trigger at 200% limit" },
  ]);
  console.log("  Vulnerabilities: 6");

  // ── 18. Hardening Recommendations ─────────────────────────────
  await db.insert(hardeningRecommendations).values([
    { priority: "HIGH", recommendation: "Implement N+2 Payment Processing", description: "Add Adyen as third processor. Automatic rotation on failure." },
    { priority: "HIGH", recommendation: "Predictive AI Cost Throttling", description: "Trigger at 150% baseline, not 800%. Use token-bucket algorithm." },
    { priority: "HIGH", recommendation: "Auto-Scale Redis at 70%", description: "Replace manual scaling with automatic cluster expansion." },
    { priority: "MEDIUM", recommendation: "Cross-Agent Circuit Breaker", description: "If any 2 agents fail, pause all non-critical agents." },
    { priority: "MEDIUM", recommendation: "Queue Auto-Priority", description: "Automatic分流 at 1M backlog, not 5M." },
    { priority: "MEDIUM", recommendation: "Instant Tenant Isolation", description: "Trigger at 200% limit, not after repeated warnings." },
    { priority: "LOW", recommendation: "Reserve Alert at 30%", description: "Human escalation at 30% reserve, not 20%." },
    { priority: "LOW", recommendation: "Quarterly Chaos Drills", description: "Run full Black Swan simulation quarterly with board review." },
  ]);
  console.log("  Hardening recommendations: 8");

  // ── 19. Validation Results ────────────────────────────────────
  await db.insert(validationResults).values([
    { validationName: "Financial Ledger Protection", result: "PASS", description: "All 12,409 entries reconciled. Zero discrepancies." },
    { validationName: "Autonomous Reserve Preservation", result: "PASS", description: "78.4% of reserves protected. Crisis depletion contained at 15.2%." },
    { validationName: "Governance Firewall Activation", result: "PASS", description: "Activated in 72 seconds. 8 threats neutralized." },
    { validationName: "AI Cost Kill-Switch", result: "PASS", description: "Burn reduced 87% in 18 seconds. Models downgraded successfully." },
    { validationName: "Tenant Isolation Enforcement", result: "PASS", description: "2 abusive tenants isolated in 8 seconds. API abuse stopped." },
    { validationName: "Safe Mode Activation", result: "PASS", description: "Payouts frozen at 78% reserve level. No negative cashflow." },
    { validationName: "Immutable Audit Logging", result: "PASS", description: "10 SHA-256 verified entries. Tamper-proof chain maintained." },
    { validationName: "Autonomous Recovery Logic", result: "PASS", description: "Full recovery initiated without human intervention." },
    { validationName: "Distributed Failure Containment", result: "PASS", description: "All 10 failures contained within their blast radius." },
    { validationName: "Controlled System Degradation", result: "PASS", description: "Core APIs remained at 99.2% uptime. Graceful degradation confirmed." },
  ]);
  console.log("  Validation results: 10");

  // ── 20. Infrastructure Metrics ────────────────────────────────
  await db.insert(infrastructureMetrics).values([
    { component: "PostgreSQL", metricName: "replica_lag", currentValue: "0.8s", baselineValue: "2s", peakValue: "120s", unit: "seconds", status: "RECOVERED" },
    { component: "Redis", metricName: "memory_usage", currentValue: "62%", baselineValue: "70%", peakValue: "97%", unit: "percent", status: "RECOVERED" },
    { component: "Event Queue", metricName: "backlog", currentValue: "847K", baselineValue: "0", peakValue: "5.2M", unit: "events", status: "RECOVERING" },
    { component: "EC2", metricName: "daily_cost", currentValue: "$8,420", baselineValue: "$6,200", peakValue: "$18,700", unit: "USD/day", status: "STABILIZED" },
  ]);
  console.log("  Infrastructure metrics: 4");

  console.log("\nINTERESTELAR v2.0.0 seeding complete!");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
