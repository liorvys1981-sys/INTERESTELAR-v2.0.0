import { useState } from "react";
import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { languages, isRTL } from "@/i18n";

const navItems = [
  { label: "commandCenter", path: "/" },
  { label: "incidents", path: "/incidents" },
  { label: "stressTests", path: "/stress-tests" },
  { label: "agents", path: "/agents" },
  { label: "financialDefense", path: "/financial-defense" },
  { label: "infrastructure", path: "/infrastructure" },
  { label: "tenants", path: "/tenants" },
  { label: "governance", path: "/governance" },
  { label: "offices", path: "/monetization" },
  { label: "survivability", path: "/survivability" },
  { label: "admin", path: "/admin" },
];

export default function NavigationBar() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const currentLang = i18n.language;
  const rtl = isRTL(currentLang);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm" dir="ltr">
      <div className="max-w-[1400px] mx-auto px-4 h-full flex items-center justify-between gap-2">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <span className="text-slate-900 font-extrabold text-sm tracking-tight hidden sm:block">INTERESTELAR</span>
        </Link>

        <div className="hidden 2xl:flex items-center gap-0.5 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors duration-200 whitespace-nowrap rounded-md ${
                  isActive ? "text-blue-600 bg-blue-50" : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                }`}
              >
                {t(`nav.${item.label}`)}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <div className="relative">
            <button onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-xs font-bold text-slate-600">
              <span>{languages.find(l => l.code === currentLang)?.flag || "EN"}</span>
              <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {langOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                <div className="absolute right-0 top-12 z-50 bg-white border border-slate-200 rounded-xl shadow-lg py-2 min-w-[160px]">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { i18n.changeLanguage(lang.code); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors flex items-center gap-3 ${
                        currentLang === lang.code ? "text-blue-600 font-bold bg-blue-50" : "text-slate-700"
                      }`}
                    >
                      <span className="font-mono text-xs">{lang.flag}</span>
                      <span>{lang.name}</span>
                      {currentLang === lang.code && (
                        <svg className="w-4 h-4 ml-auto text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button className="2xl:hidden text-slate-700 p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="2xl:hidden fixed inset-0 top-16 bg-white z-40 p-6 border-t border-slate-200 overflow-y-auto">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}
                  className={`text-sm font-bold uppercase tracking-wider px-4 py-3 rounded-lg ${
                    isActive ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:bg-slate-50"
                  }`}>
                  {t(`nav.${item.label}`)}
                </Link>
              );
            })}
          </div>
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-3 font-bold">Language / Idioma / 语言</p>
            <div className="grid grid-cols-5 gap-2">
              {languages.map((lang) => (
                <button key={lang.code}
                  onClick={() => { i18n.changeLanguage(lang.code); setMobileOpen(false); }}
                  className={`px-3 py-2 rounded-lg text-xs font-bold border transition-colors ${
                    currentLang === lang.code
                      ? "border-blue-300 bg-blue-50 text-blue-600"
                      : "border-slate-200 text-slate-500 hover:bg-slate-50"
                  }`}>
                  {lang.flag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
