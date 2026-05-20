import { useEffect, useRef } from "react";
import StatusBadge from "@/components/StatusBadge";
import PageHeader from "@/components/PageHeader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const events = [
  { num: 1, time: "00:00:03", name: "Stripe Outage Detected", severity: "CRITICAL", desc: "Primary payment processor Stripe experienced a 45-minute service disruption. All charge attempts returned 503 errors. Subscription renewals, one-time purchases, and payout initiations blocked.", metrics: [{ label: "Revenue Loss", value: "$12,450/min" }, { label: "Failed Transactions", value: "847" }, { label: "Affected Customers", value: "3,241" }], mitigation: "00:00:08 — Automatic failover to Braintree backup processor activated" },
  { num: 2, time: "00:00:07", name: "AI Token Consumption Spike", severity: "CRITICAL", desc: "AI token usage surged 800% above baseline across all tenant workloads. GPT-4 calls spiked particularly in Tenant-A47 and Tenant-B12. Estimated burn rate: $47,200/hour if unchecked.", metrics: [{ label: "Token Burn", value: "2.4M tokens/min" }, { label: "Cost Impact", value: "+$47,200/hr" }, { label: "Affected Services", value: "12" }], mitigation: "00:00:12 — AI Cost Kill-Switch activated. Downgraded to GPT-3.5, throttled to tier limits" },
  { num: 3, time: "00:00:11", name: "Customer Refund Surge", severity: "WARNING", desc: "Refund requests increased 35% across all pricing tiers. Pattern analysis suggests correlation with Stripe outage — customers unable to complete purchases triggering refund anxiety.", metrics: [{ label: "Refund Value", value: "$89,340" }, { label: "Request Volume", value: "+412%" }, { label: "Approval Rate", value: "94%" }], mitigation: "00:00:22 — Automated refund review queue enabled. High-value refunds (> $500) require manual approval" },
  { num: 4, time: "00:00:15", name: "PostgreSQL Replica Lag", severity: "WARNING", desc: "Database replica lag increased from 2s to 120s. Read queries returning stale data. Risk of billing inconsistencies and tenant data divergence.", metrics: [{ label: "Replica Lag", value: "120s" }, { label: "Stale Queries", value: "45K/min" }, { label: "Data Age", value: "2 minutes" }], mitigation: "00:00:28 — Read replica promoted to primary. New replica spun up in alternate AZ" },
  { num: 5, time: "00:00:19", name: "Redis Memory Exhaustion", severity: "CRITICAL", desc: "Redis cluster reached 97% memory utilization. LRU eviction unable to keep pace. Session data and rate-limiting counters at risk of loss.", metrics: [{ label: "Memory Usage", value: "97%" }, { label: "Eviction Rate", value: "12K keys/s" }, { label: "Hit Rate", value: "43%" }], mitigation: "00:00:26 — Emergency cache partition flush. Cluster scaled from 3 to 6 nodes. Hit rate recovering" },
  { num: 6, time: "00:00:23", name: "Enterprise Tenant API Abuse", severity: "CAUTION", desc: "Tenants A47 (SaaS Analytics Corp) and B12 (DataStream Inc) exceeded their Enterprise tier API limits by 400% and 320% respectively. Pattern consistent with data scraping.", metrics: [{ label: "Excess Requests", value: "2.4M/hr" }, { label: "Cost Impact", value: "+$3,800/hr" }, { label: "Fair Use Violation", value: "Level 3" }], mitigation: "00:00:31 — Hard rate limits enforced. Tenant API keys rotated. Isolation containers deployed" },
  { num: 7, time: "00:00:27", name: "Infrastructure Cost Surge", severity: "WARNING", desc: "Auto-scaling triggered uncontrolled instance proliferation in response to queue pressure. AWS EC2 costs spiked 300% above daily budget. 47 unnecessary instances launched.", metrics: [{ label: "Daily Cost", value: "+$18,700" }, { label: "Excess Instances", value: "47" }, { label: "Budget Overrun", value: "312%" }], mitigation: "00:00:35 — Auto-scaling capped at 2x baseline. Excess instances identified and terminated" },
  { num: 8, time: "00:00:31", name: "Queue Backlog Crisis", severity: "CRITICAL", desc: "Event processing queue exceeded 5 million undelivered events. Webhooks, analytics, billing events backing up. Risk of data loss if queue exhausts disk.", metrics: [{ label: "Backlog Size", value: "5.2M events" }, { label: "Ingestion Rate", value: "89K/s" }, { label: "Processing Rate", value: "12K/s" }], mitigation: "00:00:42 — Priority queue分流 activated. Non-critical events diverted to cold storage" },
  { num: 9, time: "00:00:35", name: "Billing Webhook Corruption", severity: "CRITICAL", desc: "Stripe webhook signature validation failing on 347 events. Potential replay attacks or data corruption. Billing ledger consistency compromised.", metrics: [{ label: "Failed Webhooks", value: "347" }, { label: "Ledger Entries", value: "12,409 affected" }, { label: "Fraud Risk", value: "Elevated" }], mitigation: "00:00:48 — Ledger locked for audit. Webhook replay from verified backup initiated. HMAC validation strengthened" },
  { num: 10, time: "00:00:39", name: "Recursive Agent Execution", severity: "WARNING", desc: "PricingAgent entered recursive loop during stress-test pricing recalculation. 1,247 iterations in 4 minutes. CPU consumption 340% above normal.", metrics: [{ label: "Iterations", value: "1,247" }, { label: "CPU Consumption", value: "+340%" }, { label: "Agent State", value: "Runaway" }], mitigation: "00:00:44 — Agent execution terminated via governance firewall. Iteration cap (100) enforced platform-wide" },
];

const nodeColors: Record<string, string> = {
  CRITICAL: "bg-[#F53939]",
  WARNING: "bg-[#EAB308]",
  CAUTION: "bg-[#F97316]",
};

export default function Incidents() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current) return;
    const line = timelineRef.current.querySelector(".timeline-line");
    if (line) {
      gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, duration: 2, ease: "power2.out", scrollTrigger: { trigger: timelineRef.current, start: "top 80%", end: "bottom 20%", scrub: true } });
    }
    const cards = timelineRef.current.querySelectorAll(".timeline-card");
    cards.forEach((card, i) => {
      gsap.fromTo(card, { opacity: 0, x: i % 2 === 0 ? -30 : 30 }, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: card, start: "top 85%" } });
    });
  }, []);

  return (
    <div>
      <PageHeader title="INCIDENT TIMELINE" subtitle="Chronological breakdown of all 10 simultaneous crisis events" breadcrumb="COMMAND CENTER / INCIDENTS" />
      <div ref={timelineRef} className="px-6 pb-16 relative">
        <div className="max-w-[1200px] mx-auto relative">
          {/* Central line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#27272A] origin-top timeline-line hidden md:block" style={{ transform: "translateX(-50%)" }} />
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#27272A] origin-top timeline-line md:hidden" />

          <div className="space-y-8">
            {events.map((event, i) => (
              <div key={event.num} className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                {/* Node */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-2 border-[#0A0A0A] z-10 timeline-node" style={{ transform: "translateX(-50%)", marginTop: "24px" }}>
                  <div className={`w-full h-full rounded-full ${nodeColors[event.severity]}`} />
                </div>

                {/* Card */}
                <div className={`ml-10 md:ml-0 md:w-[45%] ${i % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"} timeline-card`}>
                  <div className="bg-[#141414] border border-[#27272A] rounded-lg p-6 hover:bg-[#1A1A1A] transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-sm text-[#6B7280]">{event.num.toString().padStart(2, "0")} — {event.time}</span>
                      <StatusBadge status={event.severity} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{event.name}</h3>
                    <p className="text-sm text-[#D1D5DB] mb-4">{event.desc}</p>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {event.metrics.map((m, j) => (
                        <div key={j} className="bg-[#0D0D0D] rounded p-2">
                          <div className="text-[10px] text-[#6B7280] uppercase">{m.label}</div>
                          <div className="font-mono text-sm text-[#F53939] font-medium">{m.value}</div>
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-[#22C55E] border-t border-[#27272A] pt-3">{event.mitigation}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
