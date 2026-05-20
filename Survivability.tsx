import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";

const dimensionScores = [
  { name: "Survivability", score: 87, color: "from-emerald-500 to-emerald-600", bg: "bg-emerald-50" },
  { name: "Governance Maturity", score: 94, color: "from-blue-500 to-blue-600", bg: "bg-blue-50" },
  { name: "Financial Resilience", score: 82, color: "from-emerald-500 to-emerald-600", bg: "bg-emerald-50" },
  { name: "Autonomous Recovery", score: 91, color: "from-violet-500 to-violet-600", bg: "bg-violet-50" },
  { name: "AI Containment", score: 88, color: "from-red-500 to-red-600", bg: "bg-red-50" },
  { name: "Infrastructure Stability", score: 79, color: "from-amber-500 to-amber-600", bg: "bg-amber-50" },
  { name: "Production Readiness", score: 85, color: "from-emerald-500 to-emerald-600", bg: "bg-emerald-50" },
];

const validations = [
  { name: "Financial Ledger Protection", result: "PASS", desc: "All 12,409 entries reconciled. Zero discrepancies." },
  { name: "Autonomous Reserve Preservation", result: "PASS", desc: "78.4% of reserves protected. Crisis depletion contained at 15.2%." },
  { name: "Governance Firewall Activation", result: "PASS", desc: "Activated in 72 seconds. 8 threats neutralized." },
  { name: "AI Cost Kill-Switch", result: "PASS", desc: "Burn reduced 87% in 18 seconds. Models downgraded successfully." },
  { name: "Tenant Isolation Enforcement", result: "PASS", desc: "2 abusive tenants isolated in 8 seconds. API abuse stopped." },
  { name: "Safe Mode Activation", result: "PASS", desc: "Payouts frozen at 78% reserve level. No negative cashflow." },
  { name: "Immutable Audit Logging", result: "PASS", desc: "10 SHA-256 verified entries. Tamper-proof chain maintained." },
  { name: "Autonomous Recovery Logic", result: "PASS", desc: "Full recovery initiated without human intervention." },
  { name: "Distributed Failure Containment", result: "PASS", desc: "All 10 failures contained within their blast radius." },
  { name: "Controlled System Degradation", result: "PASS", desc: "Core APIs remained at 99.2% uptime. Graceful degradation confirmed." },
];

const certifications = [
  { name: "Enterprise Certification", status: "CERTIFIED", icon: "M9 12l2 2 4-4" },
  { name: "SOC 2 Type II", status: "COMPLIANT", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
  { name: "Chaos Engineering", status: "VALIDATED", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { name: "Financial Governance", status: "AUDITED", icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" },
];

const vulnerabilities = [
  { severity: "HIGH", vuln: "Single payment processor dependency", impact: "45-min revenue loss", mitigation: "Backup processor" },
  { severity: "HIGH", vuln: "No AI cost ceiling pre-configured", impact: "$47K/hr burn risk", mitigation: "Kill-switch active" },
  { severity: "MEDIUM", vuln: "Redis auto-scaling not automatic", impact: "97% memory exhaustion", mitigation: "Alert at 70%" },
  { severity: "MEDIUM", vuln: "Agent recursion limit not enforced", impact: "Runaway CPU risk", mitigation: "100-iteration cap" },
  { severity: "LOW", vuln: "Queue priority manual trigger", impact: "5.2M backlog", mitigation: "Auto-trigger at 1M" },
  { severity: "LOW", vuln: "Tenant isolation 8-second delay", impact: "Cost exposure", mitigation: "Instant at 200%" },
];

const recommendations = [
  { priority: "HIGH", text: "Implement N+2 Payment Processing", desc: "Add Adyen as third processor. Automatic rotation on failure." },
  { priority: "HIGH", text: "Predictive AI Cost Throttling", desc: "Trigger at 150% baseline, not 800%. Use token-bucket algorithm." },
  { priority: "HIGH", text: "Auto-Scale Redis at 70%", desc: "Replace manual scaling with automatic cluster expansion." },
  { priority: "MEDIUM", text: "Cross-Agent Circuit Breaker", desc: "If any 2 agents fail, pause all non-critical agents." },
  { priority: "MEDIUM", text: "Queue Auto-Priority", desc: "Automatic分流 at 1M backlog, not 5M." },
  { priority: "MEDIUM", text: "Instant Tenant Isolation", desc: "Trigger at 200% limit, not after repeated warnings." },
  { priority: "LOW", text: "Reserve Alert at 30%", desc: "Human escalation at 30% reserve, not 20%." },
  { priority: "LOW", text: "Quarterly Chaos Drills", desc: "Run full Black Swan simulation quarterly with board review." },
];

export default function Survivability() {
  const [score, setScore] = useState(0);
  const [animated, setAnimated] = useState(false);
  const scoreRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!scoreRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let current = 0;
        const interval = setInterval(() => {
          current += 1;
          setScore(current);
          if (current >= 87) {
            clearInterval(interval);
            setTimeout(() => setAnimated(true), 300);
          }
        }, 28);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(scoreRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <PageHeader title={t("survivability.title")} subtitle={t("survivability.subtitle")} />

      {/* Final Score */}
      <div className="px-6 py-16" ref={scoreRef}>
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="font-mono text-xs text-slate-400 uppercase tracking-[0.15em] mb-4">{t("survivability.finalScore")}</p>
          <div className="text-8xl md:text-9xl font-extrabold bg-gradient-to-br from-emerald-500 to-emerald-700 bg-clip-text text-transparent mb-2">{score}<span className="text-4xl text-slate-300">/100</span></div>
          <div className="text-3xl font-extrabold text-emerald-600 mb-4">{t("common.excellent")}</div>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {["Financial Reserves: SURVIVED", "Billing Integrity: INTACT", "Core APIs: ONLINE", "Zero Cascades: CONFIRMED"].map((badge, i) => (
              <span key={i} className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">{badge}</span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {certifications.map((cert, i) => (
              <div key={i} className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2 shadow-sm">
                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={cert.icon} /></svg>
                <span className="text-xs text-slate-600">{cert.name}</span>
                <StatusBadge status={cert.status} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dimension Scores */}
      <div className="px-6 py-8">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Multi-Dimensional Scoring</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dimensionScores.map((dim, i) => (
              <div key={i} className={`${dim.bg} border border-slate-200 rounded-xl p-5 hover:shadow-md transition-all`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-slate-900">{dim.name}</span>
                  <span className="font-mono text-2xl font-extrabold bg-gradient-to-r {dim.color} bg-clip-text text-transparent">{animated ? dim.score : 0}</span>
                </div>
                <div className="h-2.5 bg-white rounded-full overflow-hidden mb-1 border border-slate-100">
                  <div className={`h-full rounded-full bg-gradient-to-r ${dim.color} transition-all duration-1000`} style={{ width: animated ? `${dim.score}%` : "0%" }} />
                </div>
                <div className="font-mono text-xs text-slate-400">{dim.score}/100</div>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-xl p-6 text-center">
            <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">{t("survivability.composite")}</div>
            <div className="text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">{animated ? Math.round(dimensionScores.reduce((a, d) => a + d.score, 0) / dimensionScores.length) : 0}<span className="text-xl text-slate-400">/100</span></div>
          </div>
        </div>
      </div>

      {/* Validations */}
      <div className="px-6 py-8">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">{t("survivability.validations")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {validations.map((v, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 flex items-start gap-4 hover:shadow-sm transition-all">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-200">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1"><span className="text-sm font-bold text-slate-900">{v.name}</span><StatusBadge status={v.result} /></div>
                  <p className="text-xs text-slate-500">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vulnerabilities */}
      <div className="px-6 py-8">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">{t("survivability.vulnerabilities")}</h2>
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead><tr className="border-b border-slate-200">
                {["SEVERITY", "VULNERABILITY", "IMPACT", "MITIGATION"].map(h => <th key={h} className="text-left font-mono text-[11px] text-slate-400 uppercase tracking-wider py-3 px-4">{h}</th>)}
              </tr></thead>
              <tbody>
                {vulnerabilities.map((v, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4"><StatusBadge status={v.severity} /></td>
                    <td className="py-3 px-4 text-sm text-slate-900 font-medium">{v.vuln}</td>
                    <td className="py-3 px-4 text-sm text-red-600">{v.impact}</td>
                    <td className="py-3 px-4 text-xs text-emerald-600">{v.mitigation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Hardening */}
      <div className="px-6 py-8">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">{t("survivability.hardening")}</h2>
          <div className="space-y-3">
            {recommendations.map((r, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 flex items-start gap-4 hover:shadow-sm transition-all">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-sm shrink-0">{i + 1}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1"><span className="text-sm font-bold text-slate-900">{r.text}</span><StatusBadge status={r.priority} /></div>
                  <p className="text-xs text-slate-500">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final Verdict */}
      <div className="px-6 py-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">{t("survivability.finalVerdict")}</h2>
            <p className="text-lg text-emerald-700 font-bold mb-4">{t("survivability.passed")}</p>
            <p className="text-sm text-slate-600 mb-6 max-w-2xl mx-auto">The ecosystem demonstrated autonomous financial survivability, preserved operational continuity, and maintained governance integrity under 10 simultaneous catastrophic events across 3 test suites.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 max-w-lg mx-auto">
              {dimensionScores.slice(0, 4).map((dim, i) => (
                <div key={i} className="bg-white rounded-lg p-3 text-center shadow-sm">
                  <div className="text-[10px] text-slate-400 mb-1">{dim.name}</div>
                  <div className="font-mono text-xl font-extrabold text-emerald-600">{dim.score}</div>
                </div>
              ))}
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-md">{t("survivability.downloadReport")}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
