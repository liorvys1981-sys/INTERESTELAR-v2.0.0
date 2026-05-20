import { Routes, Route } from "react-router";
import NavigationBar from "./components/NavigationBar";
import GlobalFooter from "./components/GlobalFooter";
import CommandCenter from "./pages/CommandCenter";
import Incidents from "./pages/Incidents";
import StressTests from "./pages/StressTests";
import Agents from "./pages/Agents";
import FinancialDefense from "./pages/FinancialDefense";
import Infrastructure from "./pages/Infrastructure";
import Tenants from "./pages/Tenants";
import Governance from "./pages/Governance";
import Monetization from "./pages/Monetization";
import Survivability from "./pages/Survivability";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

/* Layout for regular pages */
function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavigationBar />
      <main className="flex-1">{children}</main>
      <GlobalFooter />
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col">
      <Routes>
        {/* Admin route - no nav/footer */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        {/* Public routes with nav/footer */}
        <Route path="/" element={<PublicLayout><CommandCenter /></PublicLayout>} />
        <Route path="/incidents" element={<PublicLayout><Incidents /></PublicLayout>} />
        <Route path="/stress-tests" element={<PublicLayout><StressTests /></PublicLayout>} />
        <Route path="/agents" element={<PublicLayout><Agents /></PublicLayout>} />
        <Route path="/financial-defense" element={<PublicLayout><FinancialDefense /></PublicLayout>} />
        <Route path="/infrastructure" element={<PublicLayout><Infrastructure /></PublicLayout>} />
        <Route path="/tenants" element={<PublicLayout><Tenants /></PublicLayout>} />
        <Route path="/governance" element={<PublicLayout><Governance /></PublicLayout>} />
        <Route path="/monetization" element={<PublicLayout><Monetization /></PublicLayout>} />
        <Route path="/survivability" element={<PublicLayout><Survivability /></PublicLayout>} />
        <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
      </Routes>
    </div>
  );
}
