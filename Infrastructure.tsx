import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";

const statusPanels = [
  { component: "PostgreSQL Cluster", metric: "Lag: 0.8s", value: "0.8s", baseline: "2s", status: "RECOVERED", details: "Primary: us-east-1b | Replica: us-east-1d | Replication: Sync" },
  { component: "Redis Cluster", metric: "Memory: 62%", value: "62%", baseline: "70%", status: "RECOVERED", details: "Nodes: 6/6 healthy | Eviction: 0 keys/s | Hit Rate: 94%" },
  { component: "Event Queue", metric: "Backlog: 847K", value: "847K", baseline: "0", status: "RECOVERING", details: "Processing: 45.2K evt/s | Ingestion: 42.1K evt/s | ETA: 18 min" },
  { component: "Compute Infrastructure", metric: "$8,420/day", value: "$8,420", baseline: "$6,200", status: "STABILIZED", details: "Instances: 34 (optimized) | Auto-scale: Capped 2x" },
];

const recoveryLog = [
  { time: "00:00:28", component: "PostgreSQL", action: "Promote Replica", before: "120s lag", after: "0.3s lag", status: "RECOVERED" },
  { time: "00:00:26", component: "Redis", action: "Emergency Scale", before: "97% mem", after: "58% mem", status: "RECOVERED" },
  { time: "00:00:35", component: "EC2", action: "Terminate Excess", before: "81 instances", after: "34 instances", status: "STABILIZED" },
  { time: "00:00:42", component: "Queue", action: "Priority分流", before: "5.2M backlog", after: "3.1M backlog", status: "RECOVERING" },
  { time: "00:01:05", component: "Redis", action: "Add Nodes", before: "3 nodes", after: "6 nodes", status: "RECOVERED" },
  { time: "00:01:22", component: "Queue", action: "Scale Workers", before: "12 workers", after: "48 workers", status: "RECOVERING" },
  { time: "00:01:45", component: "PostgreSQL", action: "New Replica", before: "N/A", after: "us-east-1d", status: "ACTIVE" },
  { time: "00:02:10", component: "CDN", action: "Cache Warming", before: "Cold", after: "87% hit", status: "RECOVERED" },
];

export default function Infrastructure() {
  return (
    <div>
      <PageHeader title="INFRASTRUCTURE RECOVERY" subtitle="Real-time infrastructure health during the Black Swan Cascade" />

      {/* Status Grid */}
      <div className="px-6 py-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {statusPanels.map((panel, i) => (
              <div key={i} className="bg-[#141414] border border-[#27272A] rounded-lg p-6 hover:bg-[#1A1A1A] transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">{panel.component}</h3>
                  <StatusBadge status={panel.status} />
                </div>
                <div className="text-3xl font-mono font-medium text-[#22C55E] mb-2">{panel.metric}</div>
                <div className="h-12 bg-[#0D0D0D] rounded mb-3 flex items-end px-2 gap-0.5 overflow-hidden">
                  {Array.from({ length: 20 }).map((_, j) => {
                    const h = Math.max(10, 60 - j * 2 + Math.random() * 20);
                    return <div key={j} className="flex-1 bg-[#22C55E]/60 rounded-t" style={{ height: `${h}%` }} />;
                  })}
                </div>
                <p className="text-xs text-[#6B7280]">{panel.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recovery Log */}
      <div className="px-6 py-8">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-2xl font-extrabold text-white mb-6">INFRASTRUCTURE RECOVERY LOG</h2>
          <div className="bg-[#141414] border border-[#27272A] rounded-lg overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#27272A]">
                  {["TIMESTAMP", "COMPONENT", "ACTION", "BEFORE", "AFTER", "STATUS"].map((h) => (
                    <th key={h} className="text-left font-mono text-xs text-[#6B7280] uppercase tracking-wider py-3 px-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recoveryLog.map((entry, i) => (
                  <tr key={i} className="border-b border-[#27272A]/50 hover:bg-[#1A1A1A] transition-colors">
                    <td className="py-3 px-4 font-mono text-sm text-[#D1D5DB]">{entry.time}</td>
                    <td className="py-3 px-4 text-sm text-white">{entry.component}</td>
                    <td className="py-3 px-4 text-sm text-[#D1D5DB]">{entry.action}</td>
                    <td className="py-3 px-4 font-mono text-sm text-[#F53939]">{entry.before}</td>
                    <td className="py-3 px-4 font-mono text-sm text-[#22C55E]">{entry.after}</td>
                    <td className="py-3 px-4"><StatusBadge status={entry.status} /></td>
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
