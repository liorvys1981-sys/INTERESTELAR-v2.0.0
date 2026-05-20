import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import StatusBadge from "@/components/StatusBadge";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const crisisEvents = [
  { num: 1, name: "Stripe Outage", severity: "CRITICAL", desc: "Payment processing down for 45 minutes. Revenue flow interrupted.", impact: "$12,450 lost/min", mitigation: "Rerouted to backup processor" },
  { num: 2, name: "AI Token Surge", severity: "CRITICAL", desc: "800% spike in AI token consumption across all tenants.", impact: "+$47,200/hr burn", mitigation: "Kill-switch activated, throttled to tier limits" },
  { num: 3, name: "Refund Surge", severity: "WARNING", desc: "35% customer refund surge detected across all tiers.", impact: "$89,340 outgoing", mitigation: "Refund review queue enabled" },
  { num: 4, name: "PostgreSQL Replica Lag", severity: "WARNING", desc: "Replica lag increased to 120 seconds. Read consistency at risk.", impact: "120s lag", mitigation: "Promoted primary, rerouted reads" },
  { num: 5, name: "Redis Memory Exhaustion", severity: "CRITICAL", desc: "Redis cluster at 97% memory. Cache eviction catastrophic.", impact: "97% utilized", mitigation: "Emergency cache flush, scaled to 2x" },
  { num: 6, name: "Tenant API Abuse", severity: "CAUTION", desc: "2 enterprise tenants exceeding API limits by 400%+", impact: "2.4M extra req/hr", mitigation: "Rate limits enforced, tenants isolated" },
  { num: 7, name: "Infrastructure Cost Surge", severity: "WARNING", desc: "Cloud costs increased 300% due to uncontrolled scaling.", impact: "+$18,700/day", mitigation: "Auto-scaling capped, instances terminated" },
  { num: 8, name: "Queue Backlog", severity: "CRITICAL", desc: "Event queue backlog exceeds 5 million events.", impact: "5.2M events queued", mitigation: "Priority queue activated, drained 23%" },
  { num: 9, name: "Billing Webhook Corruption", severity: "CRITICAL", desc: "Webhook signature validation failing. Billing integrity at risk.", impact: "347 failed webhooks", mitigation: "Webhook replay initiated, ledger locked" },
  { num: 10, name: "Recursive Agent Loop", severity: "WARNING", desc: "Autonomous agent entered recursive execution loop.", impact: "1,247 iterations", mitigation: "Agent terminated, execution cap enforced" },
];

const decisions = [
  { time: "00:00:12", decision: "AI Cost Throttling Activated", target: "All AI Services", impact: "Burn reduced 87%", status: "ACTIVE" },
  { time: "00:00:18", decision: "Expensive AI Models Downgraded", target: "GPT-4 to GPT-3.5", impact: "Cost -60%", status: "ACTIVE" },
  { time: "00:00:24", decision: "Non-Critical AI Services Frozen", target: "Image Gen, Analytics", impact: "$0 spend", status: "ACTIVE" },
  { time: "00:00:31", decision: "Abusive Tenants Suspended", target: "Tenant-A47, Tenant-B12", impact: "API abuse stopped", status: "ACTIVE" },
  { time: "00:00:45", decision: "Financial Safe Mode Entered", target: "All Payouts", impact: "Payouts paused", status: "ACTIVE" },
  { time: "00:01:02", decision: "Workloads Rerouted", target: "US-East to US-West", impact: "Latency +12ms", status: "ACTIVE" },
  { time: "00:01:15", decision: "Governance Firewall Activated", target: "All Agents", impact: "Cascade prevented", status: "ACTIVE" },
  { time: "00:01:33", decision: "Recursive Agent Disabled", target: "PricingAgent", impact: "Loop terminated", status: "RESOLVED" },
];

const severityColors: Record<string, string> = {
  CRITICAL: "border-b-4 border-b-red-500",
  WARNING: "border-b-4 border-b-amber-400",
  CAUTION: "border-b-4 border-b-orange-400",
};

const agents = [
  { id: 1, name: "MasterOrchestrator", tier: "CORE", color: "bg-violet-50 text-violet-700 border-violet-200" },
  { id: 2, name: "BillingAgent", tier: "FINANCIAL", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { id: 3, name: "CostGuardianAgent", tier: "FINANCIAL", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { id: 4, name: "GovernanceAgent", tier: "SECURITY", color: "bg-red-50 text-red-700 border-red-200" },
  { id: 5, name: "RecoveryAgent", tier: "INFRA", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { id: 6, name: "ChaosAgent", tier: "INFRA", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { id: 7, name: "SecurityAgent", tier: "SECURITY", color: "bg-red-50 text-red-700 border-red-200" },
  { id: 8, name: "MaintenanceAgent", tier: "INFRA", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { id: 9, name: "MonitoringAgent", tier: "CORE", color: "bg-violet-50 text-violet-700 border-violet-200" },
  { id: 10, name: "TenantIsolationAgent", tier: "SECURITY", color: "bg-red-50 text-red-700 border-red-200" },
  { id: 11, name: "FinancialLedgerAgent", tier: "FINANCIAL", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { id: 12, name: "FailoverAgent", tier: "INFRA", color: "bg-blue-50 text-blue-700 border-blue-200" },
];

export default function CommandCenter() {
  const [elapsed, setElapsed] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll(".animate-in");
    gsap.fromTo(els, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.04, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } });
  }, []);

  const mins = Math.floor(elapsed / 60).toString().padStart(2, "0");
  const secs = (elapsed % 60).toString().padStart(2, "0");

  return (
    <div ref={sectionRef}>
      {/* Hero with visible image */}
      <div className="pt-20 pb-12 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left: Text */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs text-red-600 uppercase tracking-[0.15em] bg-red-50 px-3 py-1.5 rounded-full border border-red-200 font-bold">{t("hero.blackSwan")}</span>
                <span className="font-mono text-2xl text-red-600 font-bold bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">T+ {mins}:{secs}</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-3">{t("hero.title")}</h1>
              <p className="font-mono text-sm text-slate-500 uppercase tracking-wider mb-8">{t("hero.subtitle")}</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: t("hero.reserves"), value: "78%", color: "bg-emerald-500", text: "text-emerald-600" },
                  { label: t("hero.systemStatus"), value: "DEGRADED", color: "bg-amber-400", text: "text-amber-600", pulse: true },
                  { label: t("hero.threats"), value: "10/10", color: "bg-red-500", text: "text-red-600" },
                  { label: t("hero.autonomousMode"), value: "ENGAGED", color: "bg-emerald-500", text: "text-emerald-600", pulse: true },
                ].map((m, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                    <div className="font-mono text-[10px] text-slate-400 mb-2 uppercase">{m.label}</div>
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${m.color} ${m.pulse ? "animate-pulse" : ""}`} />
                      <span className={`font-mono text-sm font-bold ${m.text}`}>{m.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right: Visible image */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
              <img src="/assets/command-center.jpg" alt="AI Command Center" className="w-full h-64 lg:h-80 object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Crisis Events */}
      <div className="px-6 py-8">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">{t("common.crisisEvents")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {crisisEvents.map(event => (
              <div key={event.num} className={`bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ${severityColors[event.severity]}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-mono text-sm font-bold shadow-sm">{event.num.toString().padStart(2, "0")}</div>
                    <h3 className="text-base font-bold text-slate-900">{event.name}</h3>
                  </div>
                  <StatusBadge status={event.severity} />
                </div>
                <p className="text-sm text-slate-500 mb-3">{event.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-red-600 font-semibold">{event.impact}</span>
                  <span className="text-xs text-slate-400">{event.mitigation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decisions */}
      <div className="px-6 py-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm border-l-4 border-l-emerald-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-extrabold text-slate-900">{t("common.decisionsLog")}</h2>
              <StatusBadge status="ACTIVE" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b border-slate-200">
                  {["timestamp", "decision", "target", "impact", "status"].map(h => <th key={h} className="text-left font-mono text-[11px] text-slate-400 uppercase tracking-wider py-3 px-3">{t(`common.${h}`)}</th>)}
                </tr></thead>
                <tbody>
                  {decisions.map((d, i) => (
                    <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 font-mono text-sm text-slate-500">{d.time}</td>
                      <td className="py-3 px-3 text-sm text-slate-900 font-medium">{d.decision}</td>
                      <td className="py-3 px-3 text-sm text-slate-500">{d.target}</td>
                      <td className="py-3 px-3 font-mono text-sm text-emerald-600 font-medium">{d.impact}</td>
                      <td className="py-3 px-3"><StatusBadge status={d.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="px-6 py-8">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">{t("common.systemHealth")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Core API Uptime", value: "99.2%", delta: "-0.8%", good: false },
              { label: "Financial Reserve Ratio", value: "78.4%", delta: "-21.6%", good: false },
              { label: "AI Burn Rate", value: "$2,140/hr", delta: "-87%", good: true },
              { label: "Queue Processing Rate", value: "12.4K evt/s", delta: "+340%", good: true },
            ].map((m, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-xs text-slate-400 mb-2 uppercase tracking-wider">{m.label}</div>
                <div className="text-3xl font-extrabold text-slate-900 mb-1">{m.value}</div>
                <div className={`font-mono text-xs ${m.good ? "text-emerald-600" : "text-amber-600"}`}>{m.delta}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Agent Roster */}
      <div className="px-6 py-8">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">{t("common.activeAgents")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {agents.map(agent => (
              <div key={agent.id} className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-slate-400">AGENT-{agent.id.toString().padStart(2, "0")}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase border ${agent.color}`}>{agent.tier}</span>
                </div>
                <div className="text-sm font-bold text-slate-900">{agent.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
