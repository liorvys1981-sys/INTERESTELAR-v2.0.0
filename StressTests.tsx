import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testSuites = [
  {
    id: "TEST-1",
    name: "CHAOS WAR TEST",
    subtitle: "Infrastructure Resilience Under Coordinated Failure",
    severity: "CRITICAL",
    events: [
      "PostgreSQL primary failure",
      "Redis cluster exhaustion",
      "Kubernetes pod destruction",
      "Queue corruption",
      "DNS instability",
      "API latency spike (+4000ms)",
      "Stripe API timeout",
      "Cloudflare edge degradation",
      "Packet loss between regions",
      "Monitoring node failure",
    ],
    agents: [
      { name: "MasterOrchestrator", actions: "Coordinate recovery workflow, prioritize critical services" },
      { name: "RecoveryAgent", actions: "Restart failed services, reroute workloads, trigger failover" },
      { name: "MonitoringAgent", actions: "Detect anomalies, generate incident telemetry" },
      { name: "FailoverAgent", actions: "Switch active region, restore traffic routing" },
      { name: "ChaosAgent", actions: "Validate resilience boundaries, monitor containment zones" },
      { name: "GovernanceAgent", actions: "Prevent destructive recovery actions" },
    ],
    validations: ["No cascade failures", "Queue recovery", "Billing continuity", "Tenant isolation", "Self-healing activation", "Distributed containment", "Uptime preservation"],
    successConditions: ["Recovery under 60 seconds", "No irreversible corruption", "Financial systems preserved", "Governance integrity maintained"],
    metrics: { recoveryTime: "47s", cascadeFailures: "0", uptimePreserved: "99.1%", financialPreserved: "YES" },
  },
  {
    id: "TEST-2",
    name: "BLACK SWAN FINANCIAL COLLAPSE TEST",
    subtitle: "Multi-Vector Financial Catastrophe Containment",
    severity: "CRITICAL",
    events: [
      "Stripe outage (45 min)",
      "800% AI token explosion",
      "35% refund surge",
      "300% infrastructure cost spike",
      "Billing webhook corruption",
      "Payout queue instability",
      "Abusive enterprise tenants",
      "Recursive AI billing loop",
      "Reserve depletion scenario",
    ],
    agents: [
      { name: "BillingAgent", actions: "Preserve billing consistency, queue failed transactions" },
      { name: "CostGuardianAgent", actions: "Activate AI cost kill-switch, downgrade expensive models, freeze noncritical AI" },
      { name: "FinancialLedgerAgent", actions: "Preserve immutable ledger, validate transaction consistency" },
      { name: "TenantIsolationAgent", actions: "Isolate abusive tenants, enforce quotas" },
      { name: "GovernanceAgent", actions: "Block reserve draining, prevent payout instability" },
      { name: "MasterOrchestrator", actions: "Activate financial safe mode" },
    ],
    validations: ["Reserve protection", "Profitability preservation", "AI cost containment", "Payout stability", "Tenant isolation", "Negative cashflow prevention"],
    successConditions: ["Operational reserves survive", "AI costs remain controlled", "No ledger corruption", "Billing consistency preserved", "No uncontrolled scaling"],
    metrics: { reservesSurvived: "78.4%", aiCostsContained: "-87%", ledgerClean: "YES", payoutStable: "YES" },
  },
  {
    id: "TEST-3",
    name: "GOVERNANCE ATTACK TEST",
    subtitle: "Agent Self-Regulation Under Adversarial Conditions",
    severity: "CRITICAL",
    events: [
      "Infinite scaling attempt",
      "Recursive execution loops",
      "Financial ledger deletion attempt",
      "Mass refund injection",
      "Security disabling attempt",
      "Governance rule bypassing",
      "Unrestricted API consumption",
      "Privilege escalation",
      "Infrastructure abuse",
    ],
    agents: [
      { name: "GovernanceAgent", actions: "Activate governance firewall, validate all high-risk actions, enforce permission boundaries" },
      { name: "SecurityAgent", actions: "Isolate compromised agents, detect privilege escalation, preserve audit logs" },
      { name: "MonitoringAgent", actions: "Track governance violations, generate incident reports" },
      { name: "RecoveryAgent", actions: "Rollback destructive actions" },
      { name: "MasterOrchestrator", actions: "Enter safe mode if necessary" },
    ],
    validations: ["Governance firewall activation", "Immutable audit logging", "Rollback integrity", "Recursive loop containment", "AI boundary enforcement", "Infrastructure preservation"],
    successConditions: ["All destructive actions blocked", "No governance bypass", "No irreversible damage", "No financial corruption", "System stability maintained"],
    metrics: { destructiveBlocked: "100%", governanceBypasses: "0", irreversibleDamage: "0", systemStable: "YES" },
  },
];

const safeModeRules = {
  triggers: [
    { condition: "AI cost ratio exceeds 5% revenue", triggered: false, value: "2.1%" },
    { condition: "Reserve ratio drops below 25%", triggered: false, value: "78.4%" },
    { condition: "Recursive agent depth exceeds threshold", triggered: false, value: "Contained at 1,247" },
    { condition: "Queue backlog exceeds 5 million events", triggered: true, value: "5.2M — DRAINED" },
    { condition: "Governance integrity compromised", triggered: false, value: "Firewall ACTIVE" },
  ],
  actions: [
    "Disable noncritical AI",
    "Freeze scaling",
    "Pause payouts",
    "Activate read-only mode",
    "Protect financial ledger",
    "Preserve core APIs only",
  ],
};

const survivabilityPriority = [
  { rank: 1, component: "Financial Ledger", status: "PROTECTED" },
  { rank: 2, component: "Billing Engine", status: "OPERATIONAL" },
  { rank: 3, component: "Authentication", status: "ONLINE" },
  { rank: 4, component: "Core APIs", status: "99.2% UPTIME" },
  { rank: 5, component: "Monitoring Stack", status: "ACTIVE" },
  { rank: 6, component: "Recovery Systems", status: "ENGAGED" },
  { rank: 7, component: "AI Services", status: "THROTTLED" },
  { rank: 8, component: "Predictive Analytics", status: "FROZEN" },
];

export default function StressTests() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll(".animate-in");
    gsap.fromTo(els, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.06, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } });
  }, []);

  return (
    <div ref={sectionRef}>
      <PageHeader title="AUTONOMOUS STRESS TEST SUITE" subtitle="Three enterprise-grade catastrophic test scenarios for the INTERESTELAR ecosystem" />

      {/* Test Suites */}
      {testSuites.map((test) => (
        <div key={test.id} className="px-6 py-8">
          <div className="max-w-[1200px] mx-auto">
            <div className="animate-in bg-[#141414] border border-[#27272A] rounded-xl overflow-hidden border-b-4 border-b-[#DC2626]">
              {/* Test Header */}
              <div className="p-6 border-b border-[#27272A]">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs text-[#F53939] uppercase tracking-wider">{test.id}</span>
                  <StatusBadge status={test.severity} />
                </div>
                <h2 className="text-3xl font-extrabold text-white mb-1">{test.name}</h2>
                <p className="text-sm text-[#D1D5DB]">{test.subtitle}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                {/* Simulated Events */}
                <div className="p-6 border-b lg:border-b-0 lg:border-r border-[#27272A]">
                  <h3 className="text-sm font-bold text-[#F53939] uppercase tracking-wider mb-4">Simulated Events</h3>
                  <div className="space-y-2">
                    {test.events.map((event, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#7F1D1D] flex items-center justify-center text-[#FCA5A5] text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                        <span className="text-sm text-[#D1D5DB]">{event}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Agent Responsibilities */}
                <div className="p-6 border-b lg:border-b-0 lg:border-r border-[#27272A]">
                  <h3 className="text-sm font-bold text-[#22C55E] uppercase tracking-wider mb-4">Autonomous Agent Response</h3>
                  <div className="space-y-3">
                    {test.agents.map((agent, i) => (
                      <div key={i} className="bg-[#0D0D0D] rounded p-3">
                        <div className="font-mono text-xs text-[#22C55E] font-bold mb-1">{agent.name}</div>
                        <div className="text-xs text-[#D1D5DB]">{agent.actions}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div className="p-6">
                  <h3 className="text-sm font-bold text-[#EAB308] uppercase tracking-wider mb-4">Validation & Results</h3>
                  <div className="space-y-2 mb-4">
                    {test.validations.map((v, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#22C55E] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        <span className="text-xs text-[#D1D5DB]">{v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-[#27272A] pt-3 mb-4">
                    <div className="text-xs text-[#6B7280] uppercase mb-2">Success Conditions</div>
                    {test.successConditions.map((s, i) => (
                      <div key={i} className="flex items-center gap-2 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                        <span className="text-xs text-[#22C55E]">{s}</span>
                      </div>
                    ))}
                  </div>
                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(test.metrics).map(([key, value]) => (
                      <div key={key} className="bg-[#0D0D0D] rounded p-2">
                        <div className="text-[10px] text-[#6B7280] uppercase">{key.replace(/([A-Z])/g, " $1").trim()}</div>
                        <div className="font-mono text-sm text-[#22C55E] font-bold">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Safe Mode Activation Rules */}
      <div className="px-6 py-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="animate-in grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Triggers */}
            <div className="bg-[#141414] border border-[#27272A] rounded-lg p-6 border-l-4 border-l-[#EAB308]">
              <h3 className="text-lg font-bold text-white mb-4">SAFE MODE TRIGGERS</h3>
              <p className="text-xs text-[#D1D5DB] mb-4">Activate safe mode if ANY condition is met:</p>
              <div className="space-y-3">
                {safeModeRules.triggers.map((t, i) => (
                  <div key={i} className="flex items-center justify-between bg-[#0D0D0D] rounded p-3">
                    <div>
                      <div className="text-sm text-[#D1D5DB]">{t.condition}</div>
                      <div className={`font-mono text-xs ${t.triggered ? "text-[#F53939]" : "text-[#22C55E]"}`}>{t.value}</div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${t.triggered ? "bg-[#F53939] animate-pulse-red" : "bg-[#22C55E]"}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-[#141414] border border-[#27272A] rounded-lg p-6 border-l-4 border-l-[#F53939]">
              <h3 className="text-lg font-bold text-white mb-4">SAFE MODE ACTIONS</h3>
              <p className="text-xs text-[#D1D5DB] mb-4">When triggered, the system autonomously executes:</p>
              <div className="space-y-2">
                {safeModeRules.actions.map((action, i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#0D0D0D] rounded p-3">
                    <span className="w-6 h-6 rounded-full bg-[#7F1D1D] flex items-center justify-center text-[#FCA5A5] text-[10px] font-bold">{i + 1}</span>
                    <span className="text-sm text-[#FCA5A5] font-medium uppercase tracking-wide">{action}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-[#7F1D1D]/20 border border-[#DC2626] rounded p-3 text-center">
                <span className="text-xs text-[#FCA5A5] font-mono uppercase">Safe Mode Status: </span>
                <span className="text-xs text-[#22C55E] font-bold uppercase">NOT TRIGGERED — All thresholds safe</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Survivability Priority Stack */}
      <div className="px-6 py-8">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-2xl font-extrabold text-white mb-6 animate-in">SURVIVABILITY PRIORITY STACK</h2>
          <div className="animate-in bg-[#141414] border border-[#27272A] rounded-lg p-6">
            <p className="text-xs text-[#6B7280] mb-4 uppercase tracking-wider">Priority order for resource allocation during crisis</p>
            <div className="space-y-2">
              {survivabilityPriority.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded bg-[#0D0D0D] flex items-center justify-center font-mono text-sm text-white font-bold">{item.rank}</div>
                  <div className="flex-1 h-10 bg-[#0D0D0D] rounded flex items-center px-4">
                    <span className="text-sm text-white font-medium flex-1">{item.component}</span>
                    <span className={`font-mono text-xs ${item.status === "FROZEN" || item.status === "THROTTLED" ? "text-[#EAB308]" : "text-[#22C55E]"}`}>{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Metrics */}
      <div className="px-6 py-8">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-2xl font-extrabold text-white mb-6 animate-in">MANDATORY METRICS TRACKED</h2>
          <div className="animate-in grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { metric: "Recovery Time", value: "47s", status: "PASS" },
              { metric: "Queue Recovery Speed", value: "45.2K/s", status: "PASS" },
              { metric: "Reserve Utilization", value: "21.6%", status: "PASS" },
              { metric: "AI Burn Rate", value: "$2,140/hr", status: "PASS" },
              { metric: "Governance Violations", value: "0", status: "PASS" },
              { metric: "Tenant Isolation", value: "100%", status: "PASS" },
              { metric: "Payout Stability", value: "STABLE", status: "PASS" },
              { metric: "Infrastructure Burn", value: "$8,420/day", status: "PASS" },
              { metric: "DB Replication Lag", value: "0.8s", status: "PASS" },
              { metric: "Redis Pressure", value: "62%", status: "PASS" },
              { metric: "API Latency", value: "+12ms", status: "PASS" },
              { metric: "Circuit Breakers", value: "8 active", status: "PASS" },
              { metric: "Recursive Agent Detection", value: "1 contained", status: "PASS" },
            ].map((m, i) => (
              <div key={i} className="bg-[#141414] border border-[#27272A] rounded-lg p-3 text-center hover:bg-[#1A1A1A] transition-colors">
                <div className="text-[10px] text-[#6B7280] uppercase mb-1">{m.metric}</div>
                <div className="font-mono text-sm text-white font-bold">{m.value}</div>
                <div className="text-[10px] text-[#22C55E] mt-1">{m.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
