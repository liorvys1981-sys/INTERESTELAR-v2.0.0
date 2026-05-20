interface PageHeaderProps {
  title: string;
  subtitle: string;
  breadcrumb?: string;
}

export default function PageHeader({ title, subtitle, breadcrumb }: PageHeaderProps) {
  return (
    <div className="pt-24 pb-10 px-6 bg-white border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto">
        {breadcrumb && (
          <p className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-3">{breadcrumb}</p>
        )}
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-3">
          {title}
        </h1>
        <p className="text-base text-slate-500 max-w-2xl">{subtitle}</p>
      </div>
    </div>
  );
}
