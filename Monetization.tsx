import { useTranslation } from "react-i18next";
import StatusBadge from "@/components/StatusBadge";
import PageHeader from "@/components/PageHeader";

const offices = [
  { key: "gateway", rank: 1, profit: 9.5, img: "/assets/office-gateway.jpg", color: "from-blue-500 to-blue-700", features: ["Multi-tenant routing", "Rate limiting", "Auth management", "99.99% uptime"] },
  { key: "orchestration", rank: 2, profit: 9.0, img: "/assets/hero-office.jpg", color: "from-violet-500 to-violet-700", features: ["Event-driven workflows", "1M+ events/day", "Custom triggers", "Real-time sync"] },
  { key: "billing", rank: 3, profit: 9.0, img: "/assets/office-billing.jpg", color: "from-emerald-500 to-emerald-700", features: ["Usage tracking", "Auto-invoicing", "Multi-currency", "Revenue analytics"] },
  { key: "observability", rank: 4, profit: 8.5, img: "/assets/office-analytics.jpg", color: "from-cyan-500 to-cyan-700", features: ["Real-time dashboards", "Alert management", "Log aggregation", "90-day retention"] },
  { key: "chaos", rank: 5, profit: 8.5, img: "/assets/office-chaos.jpg", color: "from-orange-500 to-orange-700", features: ["RaaS validation", "SLA certification", "Stress testing", "Recovery benchmarks"] },
  { key: "stripe", rank: 6, profit: 8.0, img: "/assets/financial-office.jpg", color: "from-indigo-500 to-indigo-700", features: ["Payment automation", "Subscription billing", "Webhook handling", "Failover support"] },
  { key: "workflow", rank: 7, profit: 8.0, img: "/assets/office-workflow.jpg", color: "from-pink-500 to-pink-700", features: ["Business automation", "Custom agents", "Process optimization", "Integration hub"] },
  { key: "analytics", rank: 8, profit: 7.5, img: "/assets/office-analytics.jpg", color: "from-teal-500 to-teal-700", features: ["Predictive models", "Trend analysis", "Custom reports", "Data export"] },
  { key: "aiEstimator", rank: 9, profit: 7.0, img: "/assets/office-security.jpg", color: "from-amber-500 to-amber-700", features: ["Cost estimation", "Risk assessment", "Impact analysis", "ROI forecasting"] },
  { key: "support", rank: 10, profit: 6.5, img: "/assets/hero-office.jpg", color: "from-sky-500 to-sky-700", features: ["Ticket automation", "Knowledge base", "Multi-channel", "24/7 coverage"] },
  { key: "operations", rank: 11, profit: 5.0, img: "/assets/command-center.jpg", color: "from-slate-500 to-slate-700", features: ["Full-stack automation", "Resource optimization", "Capacity planning", "Cost governance"] },
  { key: "legal", rank: 12, profit: 4.5, img: "/assets/crisis-room.jpg", color: "from-rose-500 to-rose-700", features: ["Compliance monitoring", "Policy enforcement", "Audit trails", "Risk alerts"] },
];

const tiers = [
  { name: "Starter", price: 99, target: "SMBs & Startups", margin: "60%", color: "border-slate-200", popular: false },
  { name: "Growth", price: 499, target: "Growing Teams", margin: "66%", color: "border-slate-200", popular: false },
  { name: "Professional", price: 1999, target: "Mid-Market", margin: "67%", color: "border-blue-300", popular: true },
  { name: "Enterprise", price: 4999, target: "Large Enterprise", margin: "66%", color: "border-slate-200", popular: false },
];

export default function Monetization() {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero with image */}
      <div className="relative pt-20 pb-10 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/assets/hero-office.jpg" alt="AI Offices" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/90 to-[#F8FAFC]" />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-3">{t("offices.title")}</h1>
          <p className="text-base text-slate-500 max-w-2xl mb-8">{t("offices.subtitle")}</p>
          <div className="flex items-center gap-4">
            <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full border border-blue-200 font-bold uppercase">12 Departments</span>
            <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-200 font-bold uppercase">Enterprise Team</span>
            <span className="text-xs bg-violet-50 text-violet-700 px-3 py-1.5 rounded-full border border-violet-200 font-bold uppercase">AI Powered</span>
          </div>
        </div>
      </div>

      {/* AI Offices Grid */}
      <div className="px-6 py-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {offices.map((office) => (
              <div key={office.key} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                {/* Image */}
                <div className="h-40 overflow-hidden relative">
                  <img src={office.img} alt={t(`offices.${office.key}`)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${office.color} opacity-30`} />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-white/80 bg-black/40 backdrop-blur px-2 py-1 rounded">RANK #{office.rank}</span>
                    <span className="font-mono text-sm text-white font-bold bg-black/40 backdrop-blur px-2 py-1 rounded">{office.profit}/10</span>
                  </div>
                </div>
                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{t(`offices.${office.key}`)}</h3>
                  <p className="text-xs text-slate-500 mb-3">{t(`offices.${office.key}Desc`)}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {office.features.map((f, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-medium">{f}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full bg-gradient-to-r ${office.color}`} style={{ width: `${office.profit * 10}%` }} />
                    </div>
                    <span className="font-mono text-xs text-slate-500">{office.profit}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="px-6 py-8 bg-white border-t border-slate-200">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6 text-center">Pricing Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier, i) => (
              <div key={i} className={`bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-all ${tier.popular ? "border-blue-300 shadow-md" : "border-slate-200"}`}>
                {tier.popular && <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center text-xs font-bold py-1.5">MOST POPULAR</div>}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900">{tier.name}</h3>
                  <p className="text-xs text-slate-500 mb-4">{tier.target}</p>
                  <div className="text-4xl font-extrabold text-slate-900 mb-1">${tier.price}<span className="text-lg text-slate-400">/mo</span></div>
                  <div className="text-xs text-slate-400 mb-4">Billed annually or monthly</div>
                  <div className="flex items-center gap-2 mb-4">
                    <StatusBadge status="ACTIVE" />
                    <span className="font-mono text-xs text-emerald-600 font-bold">{tier.margin} margin</span>
                  </div>
                  <button className={`w-full py-2.5 rounded-lg font-bold text-sm transition-colors ${
                    tier.popular ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}>Select Plan</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue */}
      <div className="px-6 py-8">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Revenue Projection</h2>
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-end gap-2 h-56 mb-4">
              {[5990, 18971, 31952, 44933, 63409, 77395, 119850, 164800, 209750, 254700, 299650, 344600].map((r, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-blue-500/80 rounded-t hover:bg-blue-600 transition-colors relative group" style={{ height: `${(r / 344600) * 100}%` }}>
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">${r.toLocaleString()}</div>
                  </div>
                  <span className="text-[9px] text-slate-400">M{i + 1}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[{ label: "Annual Revenue", value: "$3.25M", color: "text-blue-600" }, { label: "Gross Margin", value: "65%", color: "text-emerald-600" }, { label: "Break-even", value: "Month 4", color: "text-violet-600" }, { label: "Customers", value: "250", color: "text-slate-700" }].map((m, i) => (
                <div key={i} className="bg-slate-50 rounded-lg p-4 text-center">
                  <div className="text-xs text-slate-400 mb-1">{m.label}</div>
                  <div className={`text-xl font-extrabold ${m.color}`}>{m.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
