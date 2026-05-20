import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import StatusBadge from "@/components/StatusBadge";
import PageHeader from "@/components/PageHeader";

/* ─── Data ─── */
const adminTabs = [
  { id: "overview", label: "Dashboard", icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" },
  { id: "agents", label: "Agent Control", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { id: "tenants", label: "Tenants", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { id: "governance", label: "Governance", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  { id: "stress", label: "Stress Tests", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { id: "logs", label: "Audit Logs", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" },
  { id: "settings", label: "Settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" },
];

const agentList = [
  { id: 1, name: "MasterOrchestrator", tier: "CORE", status: "ACTIVE", uptime: "99.97%", decisions: 12, cpu: "12%", memory: "256MB", lastAction: "Recovery phase initiated", image: "/assets/command-center.jpg" },
  { id: 2, name: "BillingAgent", tier: "FINANCIAL", status: "ACTIVE", uptime: "99.91%", decisions: 8, cpu: "8%", memory: "128MB", lastAction: "Webhook replay", image: "/assets/office-billing.jpg" },
  { id: 3, name: "CostGuardianAgent", tier: "FINANCIAL", status: "ACTIVE", uptime: "99.89%", decisions: 6, cpu: "15%", memory: "192MB", lastAction: "AI kill-switch", image: "/assets/financial-office.jpg" },
  { id: 4, name: "GovernanceAgent", tier: "SECURITY", status: "ACTIVE", uptime: "99.95%", decisions: 14, cpu: "5%", memory: "64MB", lastAction: "Firewall activated", image: "/assets/office-security.jpg" },
  { id: 5, name: "RecoveryAgent", tier: "INFRA", status: "ACTIVE", uptime: "99.88%", decisions: 9, cpu: "22%", memory: "320MB", lastAction: "CDN cache warming", image: "/assets/crisis-room.jpg" },
  { id: 6, name: "ChaosAgent", tier: "INFRA", status: "ACTIVE", uptime: "99.85%", decisions: 4, cpu: "35%", memory: "512MB", lastAction: "All-clear validated", image: "/assets/office-chaos.jpg" },
  { id: 7, name: "SecurityAgent", tier: "SECURITY", status: "ACTIVE", uptime: "99.94%", decisions: 7, cpu: "10%", memory: "160MB", lastAction: "Privilege check", image: "/assets/office-security.jpg" },
  { id: 8, name: "MaintenanceAgent", tier: "INFRA", status: "ACTIVE", uptime: "99.92%", decisions: 5, cpu: "6%", memory: "96MB", lastAction: "DB optimization", image: "/assets/office-analytics.jpg" },
  { id: 9, name: "MonitoringAgent", tier: "CORE", status: "ACTIVE", uptime: "99.96%", decisions: 11, cpu: "18%", memory: "224MB", lastAction: "Health report", image: "/assets/office-analytics.jpg" },
  { id: 10, name: "TenantIsolationAgent", tier: "SECURITY", status: "ACTIVE", uptime: "99.90%", decisions: 6, cpu: "9%", memory: "128MB", lastAction: "Tenants isolated", image: "/assets/hero-office.jpg" },
  { id: 11, name: "FinancialLedgerAgent", tier: "FINANCIAL", status: "ACTIVE", uptime: "99.98%", decisions: 5, cpu: "7%", memory: "112MB", lastAction: "Audit record created", image: "/assets/financial-office.jpg" },
  { id: 12, name: "FailoverAgent", tier: "INFRA", status: "ACTIVE", uptime: "99.93%", decisions: 3, cpu: "11%", memory: "176MB", lastAction: "Workloads rerouted", image: "/assets/command-center.jpg" },
];

const tenants = [
  { id: "T001", name: "SaaS Analytics Corp", tier: "Enterprise", revenue: "$45,200/mo", status: "ISOLATED", abuse: "400%", apiCalls: "1.8M/hr", since: "2024-01-15" },
  { id: "T002", name: "DataStream Inc", tier: "Enterprise", revenue: "$38,900/mo", status: "ISOLATED", abuse: "320%", apiCalls: "1.4M/hr", since: "2024-02-20" },
  { id: "T003", name: "CloudOps Pro", tier: "Professional", revenue: "$12,400/mo", status: "ACTIVE", abuse: "0%", apiCalls: "85K/hr", since: "2024-03-10" },
  { id: "T004", name: "FinTech Solutions", tier: "Growth", revenue: "$4,800/mo", status: "ACTIVE", abuse: "0%", apiCalls: "32K/hr", since: "2024-04-05" },
  { id: "T005", name: "DevStartup LLC", tier: "Starter", revenue: "$99/mo", status: "ACTIVE", abuse: "0%", apiCalls: "2K/hr", since: "2024-05-01" },
  { id: "T006", name: "MegaCorp Global", tier: "Enterprise", revenue: "$120,000/mo", status: "MONITORING", abuse: "85%", apiCalls: "450K/hr", since: "2023-08-15" },
  { id: "T007", name: "HealthAI Platform", tier: "Professional", revenue: "$18,500/mo", status: "ACTIVE", abuse: "0%", apiCalls: "120K/hr", since: "2024-01-22" },
  { id: "T008", name: "EduTech Networks", tier: "Growth", revenue: "$6,200/mo", status: "ACTIVE", abuse: "0%", apiCalls: "45K/hr", since: "2024-02-28" },
];

const governanceRules = [
  { id: 1, name: "AI Cost Ceiling", value: "$5,000/hr per tenant", status: "ACTIVE", triggered: false, lastTrigger: "Never" },
  { id: 2, name: "Agent Recursion Limit", value: "100 iterations max", status: "ACTIVE", triggered: true, lastTrigger: "00:00:39 — PricingAgent contained" },
  { id: 3, name: "Payout Freeze Trigger", value: "< 20% reserve", status: "ACTIVE", triggered: false, lastTrigger: "Never" },
  { id: 4, name: "Tenant Abuse Threshold", value: "> 200% API limit", status: "ACTIVE", triggered: true, lastTrigger: "00:00:23 — 2 tenants isolated" },
  { id: 5, name: "Queue Backlog Limit", value: "> 1M events", status: "ACTIVE", triggered: true, lastTrigger: "00:00:31 — Priority分流" },
  { id: 6, name: "Redis Memory Alert", value: "> 70% usage", status: "ACTIVE", triggered: false, lastTrigger: "Never" },
  { id: 7, name: "Infrastructure Cost Cap", value: "> 2x baseline", status: "ACTIVE", triggered: true, lastTrigger: "00:00:35 — Instances terminated" },
  { id: 8, name: "Billing Webhook Timeout", value: "> 30s response", status: "ACTIVE", triggered: true, lastTrigger: "00:00:35 — Replay initiated" },
];

const auditLogs = [
  { time: "00:00:03", type: "CRISIS_START", actor: "System", severity: "CRITICAL", message: "Black Swan Cascade initiated — 10 simultaneous failures detected" },
  { time: "00:00:08", type: "FAILOVER", actor: "FailoverAgent", severity: "CRITICAL", message: "Stripe failover to Braintree activated — 847 transactions recovered" },
  { time: "00:00:12", type: "KILL_SWITCH", actor: "CostGuardianAgent", severity: "CRITICAL", message: "AI cost kill-switch activated — burn reduced from $47,200/hr to $2,140/hr" },
  { time: "00:00:18", type: "MODEL_DOWNGRADE", actor: "CostGuardianAgent", severity: "WARNING", message: "GPT-4 downgraded to GPT-3.5 across all tenants — cost -60%" },
  { time: "00:00:23", type: "TENANT_ISOLATE", actor: "TenantIsolationAgent", severity: "CRITICAL", message: "Tenants A47 and B12 isolated — API abuse stopped" },
  { time: "00:00:31", type: "QUEUE_PRIORITY", actor: "RecoveryAgent", severity: "WARNING", message: "Priority queue分流 activated — 5.2M events being drained" },
  { time: "00:00:35", type: "LEDGER_LOCK", actor: "FinancialLedgerAgent", severity: "CRITICAL", message: "Financial ledger locked for audit — 12,409 entries protected" },
  { time: "00:00:44", type: "AGENT_TERMINATE", actor: "GovernanceAgent", severity: "CRITICAL", message: "PricingAgent recursive loop terminated at 1,247 iterations" },
  { time: "00:00:48", type: "WEBHOOK_REPLAY", actor: "BillingAgent", severity: "WARNING", message: "347 webhooks re-validated from verified backup" },
  { time: "00:01:15", type: "FIREWALL_ON", actor: "GovernanceAgent", severity: "CRITICAL", message: "Governance firewall activated — all destructive actions blocked" },
  { time: "00:02:00", type: "AUDIT_OK", actor: "FinancialLedgerAgent", severity: "INFO", message: "Ledger integrity verified — SHA-256 chain confirmed" },
  { time: "00:45:00", type: "ALL_CLEAR", actor: "MasterOrchestrator", severity: "INFO", message: "Black Swan Cascade resolved — 87/100 survivability score" },
];

/* ─── Components ─── */
const TabButton = ({ tab, active, onClick }: { tab: typeof adminTabs[0]; active: boolean; onClick: () => void }) => (
  <button onClick={onClick} className={`flex items-center gap-2.5 w-full px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
    active ? "bg-blue-600 text-white shadow-md" : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
  }`}>
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={tab.icon} /></svg>
    <span className="hidden lg:inline">{tab.label}</span>
  </button>
);

const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-extrabold text-slate-900">{title}</h2>
    {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
  </div>
);

/* ─── Overview Tab ─── */
const OverviewTab = () => (
  <div>
    <SectionTitle title="Admin Dashboard" subtitle="Real-time system overview and key metrics" />
    {/* KPI Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {[
        { label: "Total Revenue", value: "$270,990/mo", change: "+12.4%", good: true, icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
        { label: "Active Tenants", value: "250", change: "+8 this month", good: true, icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
        { label: "Agent Uptime", value: "99.93%", change: "All 12 active", good: true, icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
        { label: "System Health", value: "87/100", change: "EXCELLENT", good: true, icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
      ].map((kpi, i) => (
        <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={kpi.icon} /></svg>
            </div>
            <span className={`text-xs font-bold ${kpi.good ? "text-emerald-600" : "text-red-600"} bg-emerald-50 px-2 py-0.5 rounded-full`}>{kpi.change}</span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mb-0.5">{kpi.value}</div>
          <div className="text-xs text-slate-400">{kpi.label}</div>
        </div>
      ))}
    </div>
    {/* Recent Activity + Quick Stats */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {auditLogs.slice(0, 6).map((log, i) => (
            <div key={i} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0">
              <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${log.severity === "CRITICAL" ? "bg-red-500" : log.severity === "WARNING" ? "bg-amber-500" : "bg-blue-500"}`} />
              <div>
                <div className="text-sm text-slate-900 font-medium">{log.type}</div>
                <div className="text-xs text-slate-500">{log.message.substring(0, 60)}...</div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">{log.time} — {log.actor}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4">System Resources</h3>
        <div className="space-y-4">
          {[
            { label: "PostgreSQL Cluster", value: 42, color: "bg-blue-500" },
            { label: "Redis Cluster", value: 62, color: "bg-emerald-500" },
            { label: "Event Queue", value: 78, color: "bg-amber-500" },
            { label: "CPU Usage", value: 35, color: "bg-violet-500" },
            { label: "Memory Usage", value: 58, color: "bg-cyan-500" },
            { label: "Disk I/O", value: 22, color: "bg-slate-500" },
          ].map((res, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-600 font-medium">{res.label}</span>
                <span className="text-xs text-slate-400 font-mono">{res.value}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full ${res.color} rounded-full transition-all`} style={{ width: `${res.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ─── Agent Control Tab ─── */
const AgentControlTab = () => {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div>
      <SectionTitle title="Agent Control Panel" subtitle="Manage all 12 autonomous agents in the ecosystem" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {agentList.map((agent) => (
          <div key={agent.id} onClick={() => setSelected(selected === agent.id ? null : agent.id)}
            className={`bg-white border rounded-xl overflow-hidden cursor-pointer transition-all ${
              selected === agent.id ? "border-blue-400 shadow-lg ring-2 ring-blue-100" : "border-slate-200 hover:shadow-md"
            }`}>
            <div className="h-28 overflow-hidden relative">
              <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
                <span className="font-mono text-[10px] text-white/80">AGENT-{agent.id.toString().padStart(2, "0")}</span>
                <StatusBadge status={agent.status} />
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-slate-900">{agent.name}</h3>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase border ${
                  agent.tier === "CORE" ? "bg-violet-50 text-violet-700 border-violet-200" :
                  agent.tier === "FINANCIAL" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                  agent.tier === "SECURITY" ? "bg-red-50 text-red-700 border-red-200" :
                  "bg-blue-50 text-blue-700 border-blue-200"
                }`}>{agent.tier}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="text-center bg-slate-50 rounded py-1"><div className="text-[10px] text-slate-400">CPU</div><div className="text-xs font-mono font-bold text-slate-700">{agent.cpu}</div></div>
                <div className="text-center bg-slate-50 rounded py-1"><div className="text-[10px] text-slate-400">Memory</div><div className="text-xs font-mono font-bold text-slate-700">{agent.memory}</div></div>
              </div>
              <div className="text-[10px] text-slate-400 font-mono">{agent.lastAction}</div>
              {selected === agent.id && (
                <div className="mt-3 pt-3 border-t border-slate-100 flex gap-2">
                  <button className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold py-2 rounded-lg transition-colors border border-red-200">Stop</button>
                  <button className="flex-1 bg-amber-50 hover:bg-amber-100 text-amber-600 text-xs font-bold py-2 rounded-lg transition-colors border border-amber-200">Restart</button>
                  <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold py-2 rounded-lg transition-colors border border-blue-200">Configure</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── Tenants Tab ─── */
const TenantsTab = () => (
  <div>
    <SectionTitle title="Tenant Management" subtitle="Monitor and manage all platform tenants" />
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead><tr className="border-b border-slate-200 bg-slate-50">
            {["ID", "Company", "Tier", "Revenue", "API Calls", "Abuse", "Status", "Since"].map(h =>
              <th key={h} className="text-left font-mono text-[11px] text-slate-500 uppercase tracking-wider py-3 px-4">{h}</th>
            )}
          </tr></thead>
          <tbody>
            {tenants.map((t, i) => (
              <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 font-mono text-sm text-slate-700">{t.id}</td>
                <td className="py-3 px-4 text-sm font-medium text-slate-900">{t.name}</td>
                <td className="py-3 px-4"><span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{t.tier}</span></td>
                <td className="py-3 px-4 font-mono text-sm text-slate-700">{t.revenue}</td>
                <td className="py-3 px-4 font-mono text-sm text-slate-500">{t.apiCalls}</td>
                <td className="py-3 px-4 font-mono text-sm text-slate-500">{t.abuse}</td>
                <td className="py-3 px-4"><StatusBadge status={t.status === "ISOLATED" ? "CRITICAL" : t.status === "MONITORING" ? "WARNING" : "ACTIVE"} /></td>
                <td className="py-3 px-4 text-xs text-slate-400">{t.since}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

/* ─── Governance Tab ─── */
const GovernanceTab = () => (
  <div>
    <SectionTitle title="Governance Rules" subtitle="Configure autonomous governance policies" />
    <div className="space-y-3">
      {governanceRules.map((rule) => (
        <div key={rule.id} className={`bg-white border rounded-xl p-5 flex items-start gap-4 transition-all hover:shadow-md ${
          rule.triggered ? "border-amber-300 bg-amber-50/30" : "border-slate-200"
        }`}>
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
            rule.triggered ? "bg-amber-100" : "bg-emerald-100"
          }`}>
            <svg className={`w-5 h-5 ${rule.triggered ? "text-amber-600" : "text-emerald-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-slate-900">{rule.name}</h3>
              <div className="flex items-center gap-2">
                {rule.triggered && <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold">TRIGGERED</span>}
                <StatusBadge status={rule.status} />
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
                </label>
              </div>
            </div>
            <div className="text-sm text-slate-600 mb-1">{rule.value}</div>
            <div className="text-xs text-slate-400 font-mono">{rule.lastTrigger}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ─── Stress Tests Tab ─── */
const StressTestsTab = () => (
  <div>
    <SectionTitle title="Stress Test Control" subtitle="Run and monitor catastrophic failure simulations" />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {[
        { id: "TEST-1", name: "Chaos War Test", desc: "Infrastructure resilience under coordinated failure", status: "PASSED", time: "47s", color: "from-blue-500 to-blue-700" },
        { id: "TEST-2", name: "Black Swan Financial", desc: "Multi-vector financial catastrophe containment", status: "PASSED", time: "45min", color: "from-red-500 to-red-700" },
        { id: "TEST-3", name: "Governance Attack", desc: "Agent self-regulation under adversarial conditions", status: "PASSED", time: "72s", color: "from-violet-500 to-violet-700" },
      ].map((test) => (
        <div key={test.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all">
          <div className={`h-2 bg-gradient-to-r ${test.color}`} />
          <div className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-slate-400">{test.id}</span>
              <StatusBadge status={test.status} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">{test.name}</h3>
            <p className="text-xs text-slate-500 mb-4">{test.desc}</p>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-slate-50 rounded-lg px-3 py-1.5 text-center">
                <div className="text-[10px] text-slate-400">Recovery Time</div>
                <div className="font-mono text-sm font-bold text-slate-700">{test.time}</div>
              </div>
              <div className="bg-emerald-50 rounded-lg px-3 py-1.5 text-center">
                <div className="text-[10px] text-emerald-600">Score</div>
                <div className="font-mono text-sm font-bold text-emerald-700">87/100</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-lg transition-colors">Run Test</button>
              <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2 rounded-lg transition-colors">View Report</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ─── Audit Logs Tab ─── */
const AuditLogsTab = () => (
  <div>
    <SectionTitle title="Audit Logs" subtitle="Immutable record of all autonomous decisions and actions" />
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead><tr className="border-b border-slate-200 bg-slate-50">
            {["Time", "Event", "Actor", "Severity", "Message"].map(h =>
              <th key={h} className="text-left font-mono text-[11px] text-slate-500 uppercase tracking-wider py-3 px-4">{h}</th>
            )}
          </tr></thead>
          <tbody>
            {auditLogs.map((log, i) => (
              <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 font-mono text-xs text-slate-500">{log.time}</td>
                <td className="py-3 px-4"><span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">{log.type}</span></td>
                <td className="py-3 px-4 text-xs text-slate-600 font-medium">{log.actor}</td>
                <td className="py-3 px-4"><StatusBadge status={log.severity} /></td>
                <td className="py-3 px-4 text-xs text-slate-600">{log.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

/* ─── Settings Tab ─── */
const SettingsTab = () => (
  <div>
    <SectionTitle title="System Settings" subtitle="Configure global platform parameters" />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {[
        { title: "Financial Safeguards", settings: [
          { label: "AI Cost Ceiling", value: "$5,000/hr", desc: "Maximum AI spend per tenant per hour" },
          { label: "Reserve Alert Threshold", value: "30%", desc: "Trigger human escalation when reserves drop below" },
          { label: "Payout Freeze Level", value: "20%", desc: "Automatically pause payouts when reserves hit" },
          { label: "Auto-Scaling Cap", value: "2x baseline", desc: "Maximum infrastructure scaling multiplier" },
        ]},
        { title: "AI Governance", settings: [
          { label: "Recursion Limit", value: "100 iterations", desc: "Maximum recursive execution depth" },
          { label: "Model Downgrade Trigger", value: "150% baseline", desc: "Switch to cheaper models when cost exceeds" },
          { label: "Kill-Switch Activation", value: "200% baseline", desc: "Emergency AI shutdown threshold" },
          { label: "Agent Timeout", value: "30 seconds", desc: "Maximum agent response time" },
        ]},
        { title: "Tenant Management", settings: [
          { label: "Abuse Threshold", value: "200% limit", desc: "Instant isolation trigger" },
          { label: "Warning Threshold", value: "150% limit", desc: "First warning issued" },
          { label: "API Rate Limit", value: "500K/hr", desc: "Enterprise tier maximum" },
          { label: "Token Limit", value: "200K/hr", desc: "AI token consumption cap" },
        ]},
        { title: "Notifications", settings: [
          { label: "Email Alerts", value: "Enabled", desc: "Critical event notifications" },
          { label: "Slack Integration", value: "Connected", desc: "Real-time team alerts" },
          { label: "PagerDuty", value: "Disabled", desc: "On-call escalation" },
          { label: "Audit Retention", value: "90 days", desc: "Log retention period" },
        ]},
      ].map((section, i) => (
        <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">{section.title}</h3>
          <div className="space-y-4">
            {section.settings.map((s, j) => (
              <div key={j} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-700">{s.label}</div>
                  <div className="text-xs text-slate-400">{s.desc}</div>
                </div>
                <span className="font-mono text-xs text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ─── Main Page ─── */
export default function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const { t } = useTranslation();

  // Auth check
  useEffect(() => {
    if (!localStorage.getItem("admin_authenticated")) {
      navigate("/login");
    }
  }, [navigate]);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated");
    navigate("/login");
  };

  const tabs: Record<string, React.ReactNode> = {
    overview: <OverviewTab />,
    agents: <AgentControlTab />,
    tenants: <TenantsTab />,
    governance: <GovernanceTab />,
    stress: <StressTestsTab />,
    logs: <AuditLogsTab />,
    settings: <SettingsTab />,
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="pt-20 pb-6 px-6 bg-white border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">Admin Panel</h1>
              <div className="flex items-center gap-3">
              <p className="text-xs text-slate-500">INTERESTELAR Management Console</p>
              <button onClick={handleLogout} className="text-[10px] bg-red-50 hover:bg-red-100 text-red-600 px-2 py-1 rounded-lg border border-red-200 font-bold transition-colors">Logout</button>
            </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-56 shrink-0">
          <div className="bg-white border border-slate-200 rounded-xl p-2 shadow-sm sticky top-20">
            {adminTabs.map(tab => (
              <TabButton key={tab.id} tab={tab} active={activeTab === tab.id} onClick={() => setActiveTab(tab.id)} />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {tabs[activeTab]}
        </div>
      </div>
    </div>
  );
}
