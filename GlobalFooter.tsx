export default function GlobalFooter() {
  return (
    <footer className="h-14 bg-white border-t border-slate-200 flex items-center px-6">
      <div className="max-w-[1200px] mx-auto w-full flex items-center justify-between">
        <span className="text-xs text-slate-400 font-mono">INTERESTELAR v2.0.0</span>
        <span className="text-xs text-slate-400 hidden sm:block">Autonomous Financial Governance Engine</span>
        <span className="text-xs font-mono flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-emerald-600 font-medium">All Systems Operational</span>
        </span>
      </div>
    </footer>
  );
}
