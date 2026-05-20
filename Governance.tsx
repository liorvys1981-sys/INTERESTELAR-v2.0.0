import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";

const firewallRules = [
  { name: "Agent Recursion Limit", value: "100 iterations max", status: "ACTIVE", prevented: "Prevented: PricingAgent loop" },
  { name: "AI Cost Ceiling", value: "$5K/hr per tenant", status: "ACTIVE", prevented: "Prevented: $47K/hr burn" },
  { name: "Payout Freeze Trigger", value: "Auto-lock at 20% reserve", status: "ACTIVE", prevented: "Protected: $2.07M" },
  { name: "Tenant Abuse Threshold", value: "200% limit = instant isolation", status: "ACTIVE", prevented: "Isolated: 2 tenants" },
];

const decisionLog = [
  { time: "00:00:03", severity: "CRITICAL", event: "Stripe Outage", action: "Auto-failover", actor: "AUTONOMOUS" },
  { time: "00:00:07", severity: "CRITICAL", event: "AI Token Surge", action: "Kill-switch", actor: "AUTONOMOUS" },
  { time: "00:00:11", severity: "WARNING", event: "Refund Surge", action: "Review queue", actor: "AUTONOMOUS" },
  { time: "00:00:15", severity: "WARNING", event: "DB Replica Lag", action: "Promote + respin", actor: "AUTONOMOUS" },
  { time: "00:00:19", severity: "CRITICAL", event: "Redis Exhaustion", action: "Emergency scale", actor: "AUTONOMOUS" },
  { time: "00:00:23", severity: "CAUTION", event: "Tenant Abuse", action: "Isolate", actor: "AUTONOMOUS" },
  { time: "00:00:27", severity: "WARNING", event: "Cost Surge", action: "Cap + terminate", actor: "AUTONOMOUS" },
  { time: "00:00:31", severity: "CRITICAL", event: "Queue Backlog", action: "Priority分流", actor: "AUTONOMOUS" },
  { time: "00:00:35", severity: "CRITICAL", event: "Webhook Corrupt", action: "Lock + replay", actor: "AUTONOMOUS" },
  { time: "00:00:39", severity: "WARNING", event: "Agent Recursion", action: "Terminate + cap", actor: "AUTONOMOUS" },
  { time: "00:02:30", severity: "INFO", event: "Recovery Phase", action: "Gradual restore", actor: "AUTONOMOUS" },
];

const auditEntries = [
  { time: "00:00:03", event: "CRISIS_START", actor: "System", hash: "a1b2c3d4e5f6789a", status: "VERIFIED" },
  { time: "00:00:12", event: "KILL_SWITCH", actor: "GovernanceEngine", hash: "b2c3d4e5f6a789b1", status: "VERIFIED" },
  { time: "00:00:18", event: "MODEL_DOWNGRADE", actor: "AICostAgent", hash: "c3d4e5f6a7b8c2d3", status: "VERIFIED" },
  { time: "00:00:31", event: "TENANT_ISOLATE", actor: "TenantGovernor", hash: "d4e5f6a7b8c9d3e4", status: "VERIFIED" },
  { time: "00:00:45", event: "SAFE_MODE", actor: "FinancialGuard", hash: "e5f6a7b8c9d0e4f5", status: "VERIFIED" },
  { time: "00:01:15", event: "FIREWALL_ON", actor: "SecurityAgent", hash: "f6a7b8c9d0e1f5a6", status: "VERIFIED" },
  { time: "00:01:33", event: "AGENT_KILL", actor: "MasterOrchestrator", hash: "a7b8c9d0e1f2a6b7", status: "VERIFIED" },
  { time: "00:02:00", event: "LEDGER_OK", actor: "AuditAgent", hash: "b8c9d0e1f2a3b7c8", status: "VERIFIED" },
  { time: "00:02:30", event: "RECOVERY", actor: "RecoveryEngine", hash: "c9d0e1f2a3b4c8d9", status: "VERIFIED" },
  { time: "00:45:00", event: "ALL_CLEAR", actor: "System", hash: "d0e1f2a3b4c5d9e0", status: "VERIFIED" },
];

export default function Governance() {
  return (
    <div>
      <PageHeader title="GOVERNANCE & AUDIT" subtitle="Autonomous decision framework, governance firewall, and immutable audit trail" />

      {/* Firewall Status */}
      <div className="px-6 py-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="bg-[#141414] border border-[#27272A] rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-extrabold text-white mb-4">GOVERNANCE FIREWALL</h2>
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-6 h-6 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              <span className="font-mono text-lg text-[#22C55E] font-medium">ACTIVE — 8 threats neutralized, 0 cascade failures</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {firewallRules.map((rule, i) => (
                <div key={i} className="bg-[#0D0D0D] border border-[#27272A] rounded-lg p-4 hover:bg-[#1A1A1A] transition-colors">
                  <div className="text-sm font-bold text-white mb-1">{rule.name}</div>
                  <div className="font-mono text-xs text-[#D1D5DB] mb-2">{rule.value}</div>
                  <StatusBadge status={rule.status} className="mb-2" />
                  <div className="text-xs text-[#22C55E]">{rule.prevented}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decision Log */}
      <div className="px-6 py-8">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-2xl font-extrabold text-white mb-6">DECISION LOG</h2>
          <div className="bg-[#141414] border border-[#27272A] rounded-lg overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-[#27272A]">{["TIMESTAMP", "SEVERITY", "EVENT", "ACTION", "ACTOR"].map(h => <th key={h} className="text-left font-mono text-xs text-[#6B7280] uppercase py-3 px-4">{h}</th>)}</tr></thead>
              <tbody>
                {decisionLog.map((d, i) => (
                  <tr key={i} className="border-b border-[#27272A]/50 hover:bg-[#1A1A1A]">
                    <td className="py-3 px-4 font-mono text-sm text-[#D1D5DB]">{d.time}</td>
                    <td className="py-3 px-4"><StatusBadge status={d.severity} /></td>
                    <td className="py-3 px-4 text-sm text-white">{d.event}</td>
                    <td className="py-3 px-4 text-sm text-[#D1D5DB]">{d.action}</td>
                    <td className="py-3 px-4 font-mono text-xs text-[#22C55E]">{d.actor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Audit Trail */}
      <div className="px-6 py-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-extrabold text-white">IMMUTABLE AUDIT LOG</h2>
            <svg className="w-5 h-5 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            <span className="text-xs text-[#22C55E] font-mono border border-[#22C55E] px-2 py-1 rounded">SHA-256 VERIFIED</span>
          </div>
          <div className="bg-[#141414] border border-[#27272A] rounded-lg overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-[#27272A]">{["TIMESTAMP", "EVENT", "ACTOR", "ACTION HASH", "VERIFICATION"].map(h => <th key={h} className="text-left font-mono text-xs text-[#6B7280] uppercase py-3 px-4">{h}</th>)}</tr></thead>
              <tbody>
                {auditEntries.map((e, i) => (
                  <tr key={i} className="border-b border-[#27272A]/50 hover:bg-[#1A1A1A]">
                    <td className="py-3 px-4 font-mono text-sm text-[#D1D5DB]">{e.time}</td>
                    <td className="py-3 px-4 text-sm text-white font-medium">{e.event}</td>
                    <td className="py-3 px-4 text-sm text-[#D1D5DB]">{e.actor}</td>
                    <td className="py-3 px-4 font-mono text-xs text-[#6B7280]">{e.hash}</td>
                    <td className="py-3 px-4"><StatusBadge status={e.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Human Escalation */}
      <div className="px-6 py-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#141414] border border-[#27272A] rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-4">HUMAN ESCALATION QUEUE</h3>
              <div className="text-[#22C55E] font-bold mb-3">NO ESCALATIONS REQUIRED</div>
              <p className="text-sm text-[#D1D5DB] mb-4">All 10 crisis events were autonomously mitigated within SLA. Human review is recommended for post-incident analysis.</p>
              <div className="space-y-2 text-xs text-[#6B7280]">
                <p>Reserve below 20%: Not triggered (78% remaining)</p>
                <p>Multiple cascade failures: Not triggered (0 cascades)</p>
                <p>Billing corruption unrecoverable: Not triggered</p>
                <p>Agent mass-recursion: Not triggered (single agent contained)</p>
              </div>
            </div>
            <div className="bg-[#141414] border border-[#27272A] rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-4">POST-INCIDENT RECOMMENDATIONS</h3>
              <ol className="space-y-3 text-sm text-[#D1D5DB] list-decimal list-inside">
                <li>Review Tenant-A47 and B12 contracts — potential Tier upgrade or termination</li>
                <li>Implement predictive AI cost alerting at 200% baseline (currently 400%)</li>
                <li>Add third payment processor for N+2 redundancy</li>
                <li>Consider Redis Cluster auto-scaling trigger at 70% (currently manual at 90%)</li>
                <li>Review agent recursion limits — consider dynamic limits based on CPU</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
