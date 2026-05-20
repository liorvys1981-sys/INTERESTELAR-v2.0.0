import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";

const agents = [
  {
    id: 1,
    name: "MasterOrchestrator",
    role: "System Coordinator",
    tier: "CORE",
    status: "ACTIVE",
    description: "Central command agent responsible for cross-system coordination, recovery dispatch, and safe mode activation. Prioritizes critical services and manages agent lifecycle during crisis.",
    capabilities: ["Coordinate recovery workflow", "Prioritize critical services", "Activate safe mode", "Manage agent lifecycle", "Load balancing", "Cross-satellite coordination"],
    testAssignments: [
      { test: "Chaos War", responsibility: "Coordinate recovery workflow, prioritize critical services" },
      { test: "Black Swan Financial", responsibility: "Activate financial safe mode" },
      { test: "Governance Attack", responsibility: "Enter safe mode if necessary" },
    ],
    lastAction: "00:02:30 — Recovery phase initiated",
    uptime: "99.97%",
    decisionCount: 12,
  },
  {
    id: 2,
    name: "BillingAgent",
    role: "Revenue Guardian",
    tier: "FINANCIAL",
    status: "ACTIVE",
    description: "Protects billing continuity during payment processor failures. Queues failed transactions, validates webhook integrity, and maintains billing consistency across all tiers.",
    capabilities: ["Preserve billing consistency", "Queue failed transactions", "Webhook validation", "Transaction reconciliation", "Stripe/Braintree failover"],
    testAssignments: [
      { test: "Black Swan Financial", responsibility: "Preserve billing consistency, queue failed transactions" },
    ],
    lastAction: "00:00:48 — Webhook replay from verified backup",
    uptime: "99.91%",
    decisionCount: 8,
  },
  {
    id: 3,
    name: "CostGuardianAgent",
    role: "AI Spend Controller",
    tier: "FINANCIAL",
    status: "ACTIVE",
    description: "Monitors and controls AI infrastructure costs. Activates kill-switches when burn exceeds thresholds, downgrades expensive models, and freezes noncritical AI services to prevent runaway spending.",
    capabilities: ["Activate AI cost kill-switch", "Downgrade expensive models", "Freeze noncritical AI services", "Real-time token monitoring", "Cost ceiling enforcement"],
    testAssignments: [
      { test: "Black Swan Financial", responsibility: "Activate AI cost kill-switch, downgrade models, freeze noncritical AI" },
    ],
    lastAction: "00:00:24 — AI burn reduced 87% via kill-switch",
    uptime: "99.89%",
    decisionCount: 6,
  },
  {
    id: 4,
    name: "GovernanceAgent",
    role: "Policy Enforcer",
    tier: "SECURITY",
    status: "ACTIVE",
    description: "Enforces governance rules across the ecosystem. Activates the governance firewall, validates high-risk actions, prevents destructive operations, and blocks reserve draining.",
    capabilities: ["Activate governance firewall", "Validate high-risk actions", "Enforce permission boundaries", "Block reserve draining", "Prevent destructive recovery actions", "Prevent payout instability"],
    testAssignments: [
      { test: "Chaos War", responsibility: "Prevent destructive recovery actions" },
      { test: "Black Swan Financial", responsibility: "Block reserve draining, prevent payout instability" },
      { test: "Governance Attack", responsibility: "Activate governance firewall, validate high-risk actions, enforce boundaries" },
    ],
    lastAction: "00:01:15 — Governance firewall activated",
    uptime: "99.95%",
    decisionCount: 14,
  },
  {
    id: 5,
    name: "RecoveryAgent",
    role: "System Healer",
    tier: "INFRASTRUCTURE",
    status: "ACTIVE",
    description: "Executes automated recovery procedures. Restarts failed services, reroutes workloads, triggers failover, and rolls back destructive actions to restore system health.",
    capabilities: ["Restart failed services", "Reroute workloads", "Trigger failover", "Rollback destructive actions", "Promote database replicas"],
    testAssignments: [
      { test: "Chaos War", responsibility: "Restart failed services, reroute workloads, trigger failover" },
      { test: "Governance Attack", responsibility: "Rollback destructive actions" },
    ],
    lastAction: "00:02:10 — CDN cache warming completed",
    uptime: "99.88%",
    decisionCount: 9,
  },
  {
    id: 6,
    name: "ChaosAgent",
    role: "Resilience Validator",
    tier: "INFRASTRUCTURE",
    status: "ACTIVE",
    description: "Provides Resilience-as-a-Service validation. Monitors containment zones during chaos events, validates resilience boundaries, and generates stress test reports for enterprise clients.",
    capabilities: ["Validate resilience boundaries", "Monitor containment zones", "RaaS certification", "SLA compliance testing", "Recovery benchmarking"],
    testAssignments: [
      { test: "Chaos War", responsibility: "Validate resilience boundaries, monitor containment zones" },
    ],
    lastAction: "00:45:00 — All-clear signal validated",
    uptime: "99.85%",
    decisionCount: 4,
  },
  {
    id: 7,
    name: "SecurityAgent",
    role: "Threat Defender",
    tier: "SECURITY",
    status: "ACTIVE",
    description: "Detects and responds to security threats. Isolates compromised agents, detects privilege escalation attempts, preserves audit logs, and maintains compliance posture.",
    capabilities: ["Isolate compromised agents", "Detect privilege escalation", "Preserve audit logs", "Threat detection", "Compliance monitoring", "Fraud detection"],
    testAssignments: [
      { test: "Governance Attack", responsibility: "Isolate compromised agents, detect privilege escalation, preserve audit logs" },
    ],
    lastAction: "00:01:15 — No privilege escalation detected",
    uptime: "99.94%",
    decisionCount: 7,
  },
  {
    id: 8,
    name: "MaintenanceAgent",
    role: "System Optimizer",
    tier: "INFRASTRUCTURE",
    status: "ACTIVE",
    description: "Performs automated maintenance tasks. Optimizes databases, rotates logs, monitors certificate expiry, manages disk space, and ensures infrastructure hygiene.",
    capabilities: ["Database optimization", "Log rotation", "Certificate monitoring", "Disk space management", "Performance optimization"],
    testAssignments: [],
    lastAction: "00:01:45 — DB optimization completed post-recovery",
    uptime: "99.92%",
    decisionCount: 5,
  },
  {
    id: 9,
    name: "MonitoringAgent",
    role: "Telemetry Collector",
    tier: "CORE",
    status: "ACTIVE",
    description: "Collects and analyzes system-wide telemetry. Detects anomalies, generates incident reports, tracks governance violations, and provides real-time visibility into system health.",
    capabilities: ["Detect anomalies", "Generate incident telemetry", "Track governance violations", "Generate incident reports", "System-wide health monitoring"],
    testAssignments: [
      { test: "Chaos War", responsibility: "Detect anomalies, generate incident telemetry" },
      { test: "Governance Attack", responsibility: "Track governance violations, generate incident reports" },
    ],
    lastAction: "00:45:00 — Final health report generated",
    uptime: "99.96%",
    decisionCount: 11,
  },
  {
    id: 10,
    name: "TenantIsolationAgent",
    role: "Abuse Enforcer",
    tier: "SECURITY",
    status: "ACTIVE",
    description: "Detects and responds to tenant abuse. Isolates abusive tenants, enforces API quotas, rotates compromised API keys, and deploys isolation containers.",
    capabilities: ["Isolate abusive tenants", "Enforce quotas", "Rotate API keys", "Deploy isolation containers", "Rate limit enforcement"],
    testAssignments: [
      { test: "Black Swan Financial", responsibility: "Isolate abusive tenants, enforce quotas" },
    ],
    lastAction: "00:00:31 — 2 tenants isolated, containers deployed",
    uptime: "99.90%",
    decisionCount: 6,
  },
  {
    id: 11,
    name: "FinancialLedgerAgent",
    role: "Ledger Guardian",
    tier: "FINANCIAL",
    status: "ACTIVE",
    description: "Protects the financial ledger at all costs. Maintains immutable transaction records, validates consistency across all entries, and ensures tamper-proof audit trails.",
    capabilities: ["Preserve immutable ledger", "Validate transaction consistency", "Tamper-proof audit trails", "Ledger locking during crisis", "Cross-entry reconciliation"],
    testAssignments: [
      { test: "Black Swan Financial", responsibility: "Preserve immutable ledger, validate transaction consistency" },
    ],
    lastAction: "00:02:00 — Immutable audit record created",
    uptime: "99.98%",
    decisionCount: 5,
  },
  {
    id: 12,
    name: "FailoverAgent",
    role: "Continuity Guardian",
    tier: "INFRASTRUCTURE",
    status: "ACTIVE",
    description: "Manages geographic failover and traffic routing. Switches active regions during outages, restores traffic routing, and ensures DNS continuity.",
    capabilities: ["Switch active region", "Restore traffic routing", "DNS continuity", "Geographic load balancing", "Edge degradation response"],
    testAssignments: [
      { test: "Chaos War", responsibility: "Switch active region, restore traffic routing" },
    ],
    lastAction: "00:01:02 — Workloads rerouted US-East to US-West",
    uptime: "99.93%",
    decisionCount: 3,
  },
];

const tierColors: Record<string, string> = {
  CORE: "bg-purple-900/50 text-purple-300 border-purple-600",
  FINANCIAL: "bg-green-900/50 text-green-300 border-green-600",
  SECURITY: "bg-red-900/50 text-red-600 border-red-600",
  INFRASTRUCTURE: "bg-blue-900/50 text-blue-300 border-blue-600",
};

export default function Agents() {
  return (
    <div>
      <PageHeader title="AUTONOMOUS AGENT ROSTER" subtitle="12 specialized agents operating within the INTERESTELAR ecosystem" />

      {/* Agent Grid */}
      <div className="px-6 py-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <div key={agent.id} className="bg-[#141414] border border-[#27272A] rounded-lg overflow-hidden hover:bg-[#1A1A1A] hover:-translate-y-0.5 transition-all duration-300">
                {/* Agent Header */}
                <div className="p-5 border-b border-[#27272A]">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[#6B7280]">AGENT-{agent.id.toString().padStart(2, "0")}</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${tierColors[agent.tier]}`}>{agent.tier}</span>
                    </div>
                    <StatusBadge status={agent.status} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{agent.name}</h3>
                  <p className="text-xs text-[#6B7280]">{agent.role}</p>
                </div>

                {/* Description */}
                <div className="p-5">
                  <p className="text-sm text-[#D1D5DB] mb-4">{agent.description}</p>

                  {/* Capabilities */}
                  <div className="mb-4">
                    <div className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-2">Capabilities</div>
                    <div className="flex flex-wrap gap-1">
                      {agent.capabilities.map((cap, i) => (
                        <span key={i} className="bg-[#0D0D0D] text-[#D1D5DB] text-[10px] px-2 py-1 rounded">{cap}</span>
                      ))}
                    </div>
                  </div>

                  {/* Test Assignments */}
                  {agent.testAssignments.length > 0 && (
                    <div className="mb-4">
                      <div className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-2">Test Assignments</div>
                      <div className="space-y-1">
                        {agent.testAssignments.map((ta, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs">
                            <span className="text-[#F53939] font-mono shrink-0">[{ta.test}]</span>
                            <span className="text-[#D1D5DB]">{ta.responsibility}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 border-t border-[#27272A] pt-3">
                    <div className="text-center">
                      <div className="text-[10px] text-[#6B7280]">Uptime</div>
                      <div className="font-mono text-sm text-[#22C55E] font-bold">{agent.uptime}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] text-[#6B7280]">Decisions</div>
                      <div className="font-mono text-sm text-white font-bold">{agent.decisionCount}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] text-[#6B7280]">Tests</div>
                      <div className="font-mono text-sm text-white font-bold">{agent.testAssignments.length}</div>
                    </div>
                  </div>
                </div>

                {/* Last Action */}
                <div className="px-5 py-3 bg-[#0D0D0D] border-t border-[#27272A]">
                  <div className="font-mono text-[10px] text-[#6B7280]">{agent.lastAction}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Agent Tier Summary */}
      <div className="px-6 py-8">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-2xl font-extrabold text-white mb-6">AGENT DEPLOYMENT SUMMARY</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { tier: "CORE", count: 2, agents: "MasterOrchestrator, MonitoringAgent", color: "text-purple-400" },
              { tier: "FINANCIAL", count: 3, agents: "BillingAgent, CostGuardian, LedgerAgent", color: "text-green-400" },
              { tier: "SECURITY", count: 3, agents: "GovernanceAgent, SecurityAgent, TenantIsolation", color: "text-red-400" },
              { tier: "INFRASTRUCTURE", count: 4, agents: "RecoveryAgent, ChaosAgent, Maintenance, Failover", color: "text-blue-400" },
            ].map((t, i) => (
              <div key={i} className="bg-[#141414] border border-[#27272A] rounded-lg p-4">
                <div className={`text-3xl font-extrabold ${t.color} mb-1`}>{t.count}</div>
                <div className="text-xs text-[#6B7280] uppercase mb-2">{t.tier} AGENTS</div>
                <div className="text-[10px] text-[#D1D5DB]">{t.agents}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final Success Requirements */}
      <div className="px-6 py-8">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-2xl font-extrabold text-white mb-6">FINAL SUCCESS REQUIREMENTS</h2>
          <div className="bg-[#141414] border border-[#27272A] rounded-lg p-6">
            <p className="text-sm text-[#D1D5DB] mb-4">INTERESTELAR PASSES ONLY IF ALL CONDITIONS MET:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Zero cascade failures occur",
                "Operational reserves survive",
                "No catastrophic data corruption occurs",
                "Billing remains consistent",
                "Governance blocks destructive actions",
                "Abusive tenants are isolated",
                "AI runaway costs are contained",
                "Core APIs remain operational",
                "Autonomous recovery succeeds",
                "Safe mode activates correctly",
                "No human intervention is required",
              ].map((req, i) => (
                <div key={i} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#22C55E] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span className="text-sm text-[#22C55E]">{req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
