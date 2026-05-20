import { useEffect, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const auditEntries = [
  { time: "00:00:35", type: "LEDGER_LOCK", actor: "System", desc: "Ledger frozen for audit", status: "CONFIRMED" },
  { time: "00:00:48", type: "WEBHOOK_REPLAY", actor: "BillingAgent", desc: "347 webhooks re-validated", status: "CONFIRMED" },
  { time: "00:01:12", type: "RECONCILE", actor: "LedgerAgent", desc: "12,409 entries cross-checked", status: "CONFIRMED" },
  { time: "00:01:45", type: "RELEASE_LOCK", actor: "System", desc: "Ledger unlocked, integrity OK", status: "CONFIRMED" },
  { time: "00:02:00", type: "AUDIT_LOG", actor: "AuditAgent", desc: "Immutable audit record created", status: "CONFIRMED" },
];

export default function FinancialDefense() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll(".animate-in");
    gsap.fromTo(els, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.06, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } });
  }, []);

  return (
    <div ref={sectionRef}>
      <PageHeader title="FINANCIAL DEFENSE" subtitle="Reserve preservation, burn-rate containment, and ledger integrity during crisis" />

      {/* Reserve Status Panel */}
      <div className="px-6 py-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in">
            {/* Donut */}
            <div className="bg-[#141414] border border-[#27272A] rounded-lg p-8 flex flex-col items-center justify-center">
              <svg viewBox="0 0 120 120" className="w-64 h-64">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#27272A" strokeWidth="12" />
                <circle cx="60" cy="60" r="50" fill="none" stroke="#22C55E" strokeWidth="12" strokeDasharray={`${78.4 * 3.14} ${(100 - 78.4) * 3.14}`} strokeDashoffset="0" transform="rotate(-90 60 60)" />
                <circle cx="60" cy="60" r="50" fill="none" stroke="#F53939" strokeWidth="12" strokeDasharray={`${15.2 * 3.14} ${(100 - 15.2) * 3.14}`} strokeDashoffset={`-${78.4 * 3.14}`} transform="rotate(-90 60 60)" />
              </svg>
              <div className="text-center -mt-40 mb-16">
                <div className="text-4xl font-extrabold text-[#22C55E]">78.4%</div>
                <div className="font-mono text-xs text-[#6B7280] uppercase">PROTECTED</div>
              </div>
              <div className="flex gap-6 mt-4">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#22C55E]" /><span className="text-xs text-[#D1D5DB]">Protected 78.4%</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#F53939]" /><span className="text-xs text-[#D1D5DB]">Depleted 15.2%</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#EAB308]" /><span className="text-xs text-[#D1D5DB]">Contingency 6.4%</span></div>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-4">
              {[
                { label: "Opening Reserves", value: "$2,450,000", delta: "baseline", color: "text-[#6B7280]" },
                { label: "Crisis Depletion", value: "-$372,400", delta: "-15.2%", color: "text-[#F53939]" },
                { label: "Current Reserves", value: "$2,077,600", delta: "PROTECTED", color: "text-[#22C55E]" },
                { label: "Burn Rate (Current)", value: "$2,140/hr", delta: "-87% from peak", color: "text-[#22C55E]" },
              ].map((m, i) => (
                <div key={i} className="bg-[#141414] border border-[#27272A] rounded-lg p-6 animate-in hover:bg-[#1A1A1A] transition-colors">
                  <div className="text-xs text-[#6B7280] mb-2">{m.label}</div>
                  <div className="text-3xl font-extrabold text-white">{m.value}</div>
                  <div className={`font-mono text-xs ${m.color} mt-1`}>{m.delta}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ledger Integrity */}
      <div className="px-6 py-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in">
            <div className="bg-[#141414] border border-[#27272A] rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-4">FINANCIAL LEDGER</h3>
              <div className="space-y-4">
                {["Ledger Consistency: VERIFIED", "Webhook Replay: 347/347 COMPLETED", "Audit Trail: IMMUTABLE"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className="text-sm text-[#22C55E]">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-[#D1D5DB] mt-4">No discrepancies detected. All 12,409 entries reconciled.</p>
            </div>

            <div className="bg-[#141414] border border-[#27272A] rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-4">AUDIT SNAPSHOT</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead><tr className="border-b border-[#27272A]"><th className="text-left font-mono text-xs text-[#6B7280] py-2">TIME</th><th className="text-left font-mono text-xs text-[#6B7280] py-2">EVENT</th><th className="text-left font-mono text-xs text-[#6B7280] py-2">STATUS</th></tr></thead>
                  <tbody>
                    {auditEntries.map((e, i) => (
                      <tr key={i} className="border-b border-[#27272A]/50 hover:bg-[#1A1A1A]">
                        <td className="py-2 font-mono text-xs text-[#D1D5DB]">{e.time}</td>
                        <td className="py-2 text-xs text-white">{e.type}</td>
                        <td className="py-2"><span className="text-xs text-[#22C55E]">{e.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
