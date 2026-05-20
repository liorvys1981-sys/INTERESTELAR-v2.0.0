const badgeStyles: Record<string, string> = {
  CRITICAL: "bg-red-50 text-red-700 border-red-200",
  WARNING: "bg-amber-50 text-amber-700 border-amber-200",
  CAUTION: "bg-orange-50 text-orange-700 border-orange-200",
  ACTIVE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  RESOLVED: "bg-blue-50 text-blue-700 border-blue-200",
  MONITORING: "bg-violet-50 text-violet-700 border-violet-200",
  PASS: "bg-emerald-50 text-emerald-700 border-emerald-200",
  FAIL: "bg-red-50 text-red-700 border-red-200",
  IMMEDIATE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  SHORT_TERM: "bg-amber-50 text-amber-700 border-amber-200",
  MEDIUM_TERM: "bg-orange-50 text-orange-700 border-orange-200",
  DEFERRED: "bg-red-50 text-red-700 border-red-200",
  HIGH: "bg-red-50 text-red-700 border-red-200",
  MEDIUM: "bg-amber-50 text-amber-700 border-amber-200",
  LOW: "bg-slate-100 text-slate-600 border-slate-200",
  VERIFIED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  INFO: "bg-blue-50 text-blue-700 border-blue-200",
  CERTIFIED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  COMPLIANT: "bg-blue-50 text-blue-700 border-blue-200",
  VALIDATED: "bg-violet-50 text-violet-700 border-violet-200",
  AUDITED: "bg-cyan-50 text-cyan-700 border-cyan-200",
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const style = badgeStyles[status] || badgeStyles.INFO;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide border ${style} ${className}`}>
      {status}
    </span>
  );
}
