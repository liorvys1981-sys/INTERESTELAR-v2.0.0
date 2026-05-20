import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";

const tenants = [
  { id: "A47", name: "SaaS Analytics Corp", calls: "1.8M/hr", limit: "500K", tokens: "890K/hr", tokenLimit: "200K", cost: "+$2,140/hr", allocation: "$500", abuse: "400%" },
  { id: "B12", name: "DataStream Inc", calls: "1.4M/hr", limit: "500K", tokens: "720K/hr", tokenLimit: "200K", cost: "+$1,680/hr", allocation: "$500", abuse: "320%" },
];

const enforcementLog = [
  { time: "00:00:23", tenant: "A47", violation: "400% over API limit", action: "Hard throttle + key rotation", result: "Isolated" },
  { time: "00:00:23", tenant: "B12", violation: "320% over API limit", action: "Hard throttle + key rotation", result: "Isolated" },
  { time: "00:00:25", tenant: "A47", violation: "Token burst 890K/hr", action: "AI kill-switch per tenant", result: "Frozen" },
  { time: "00:00:25", tenant: "B12", violation: "Token burst 720K/hr", action: "AI kill-switch per tenant", result: "Frozen" },
  { time: "00:00:31", tenant: "A47", violation: "Repeated violation", action: "Container isolation", result: "Enforced" },
  { time: "00:00:31", tenant: "B12", violation: "Repeated violation", action: "Container isolation", result: "Enforced" },
  { time: "00:01:00", tenant: "A47", violation: "Appeal received", action: "Under review", result: "PENDING" },
  { time: "00:01:00", tenant: "B12", violation: "Appeal received", action: "Under review", result: "PENDING" },
];

export default function Tenants() {
  return (
    <div>
      <PageHeader title="TENANT ISOLATION" subtitle="Abusive tenant detection, isolation enforcement, and containment verification" />

      {/* Tenant Cards */}
      <div className="px-6 py-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tenants.map((t) => (
              <div key={t.id} className="bg-[#141414] border border-[#27272A] rounded-lg overflow-hidden hover:bg-[#1A1A1A] transition-colors">
                <div className="bg-red-900/30 px-6 py-2 border-b border-red-200">
                  <StatusBadge status="CRITICAL" className="text-xs" />
                  <span className="ml-2 text-xs text-red-600 font-bold uppercase">ISOLATED</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="font-mono text-lg font-bold text-white">TENANT-{t.id}</div>
                    <div className="text-sm text-[#D1D5DB]">{t.name}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { label: "API Calls", value: t.calls, limit: t.limit, color: "text-[#F53939]" },
                      { label: "Tokens", value: t.tokens, limit: t.tokenLimit, color: "text-[#F53939]" },
                      { label: "Cost", value: t.cost, limit: t.allocation, color: "text-[#F53939]" },
                    ].map((m, i) => (
                      <div key={i} className="bg-[#0D0D0D] rounded p-3">
                        <div className="text-[10px] text-[#6B7280] uppercase mb-1">{m.label}</div>
                        <div className={`font-mono text-sm font-bold ${m.color}`}>{m.value}</div>
                        <div className="text-[10px] text-[#6B7280]">limit: {m.limit}</div>
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-[#D1D5DB] space-y-1">
                    <p>00:00:23 — Limit exceeded by {t.abuse}</p>
                    <p>00:00:28 — Warning issued</p>
                    <p>00:00:31 — Isolated</p>
                  </div>
                  <div className="mt-4 text-xs text-[#6B7280] border-t border-[#27272A] pt-3">
                    Hard rate limit: 500K req/hr | API key rotated | Isolation container: active
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cost Impact */}
      <div className="px-6 py-8">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-2xl font-extrabold text-white mb-6">COST IMPACT ANALYSIS</h2>
          <div className="bg-[#141414] border border-[#27272A] rounded-lg p-6">
            <div className="space-y-4">
              {[
                { label: "Tenant-A47 Excess", value: 2140, color: "bg-[#F53939]" },
                { label: "Tenant-B12 Excess", value: 1680, color: "bg-[#F97316]" },
                { label: "All Others (baseline)", value: 4200, color: "bg-[#22C55E]" },
              ].map((bar, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-40 text-sm text-[#D1D5DB] text-right shrink-0">{bar.label}</div>
                  <div className="flex-1 h-8 bg-[#0D0D0D] rounded overflow-hidden">
                    <div className={`h-full ${bar.color} rounded flex items-center justify-end px-3 transition-all duration-1000`} style={{ width: `${(bar.value / 4200) * 100}%` }}>
                      <span className="text-xs text-white font-mono font-bold">${bar.value.toLocaleString()}/hr</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-[#22C55E] font-mono">Total abuse cost prevented: $3,820/hr | Monthly savings: ~$137,520</p>
          </div>
        </div>
      </div>

      {/* Enforcement Log */}
      <div className="px-6 py-8">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-2xl font-extrabold text-white mb-6">FAIR USE ENFORCEMENT LOG</h2>
          <div className="bg-[#141414] border border-[#27272A] rounded-lg overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-[#27272A]">{["TIMESTAMP", "TENANT", "VIOLATION", "ACTION", "RESULT"].map(h => <th key={h} className="text-left font-mono text-xs text-[#6B7280] uppercase py-3 px-4">{h}</th>)}</tr></thead>
              <tbody>
                {enforcementLog.map((e, i) => (
                  <tr key={i} className="border-b border-[#27272A]/50 hover:bg-[#1A1A1A]">
                    <td className="py-3 px-4 font-mono text-sm text-[#D1D5DB]">{e.time}</td>
                    <td className="py-3 px-4 font-mono text-sm text-white">{e.tenant}</td>
                    <td className="py-3 px-4 text-sm text-[#D1D5DB]">{e.violation}</td>
                    <td className="py-3 px-4 text-sm text-[#D1D5DB]">{e.action}</td>
                    <td className="py-3 px-4"><StatusBadge status={e.result === "PENDING" ? "MONITORING" : "ACTIVE"} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
