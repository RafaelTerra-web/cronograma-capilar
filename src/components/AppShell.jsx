import BottomNav from "./BottomNav.jsx";
import Header from "./Header.jsx";

export default function AppShell({
  activeTab,
  children,
  navItems,
  onNavigate,
  subtitle,
  title,
  weeklyProgress
}) {
  return (
    <div className="min-h-dvh px-0 text-[#183525] sm:px-4">
      <div className="app-frame relative mx-auto min-h-dvh w-full max-w-[430px] overflow-hidden shadow-2xl shadow-[#315f39]/15">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-[#dcefc7]/80 via-[#f5faec]/48 to-transparent" />
        <Header subtitle={subtitle} title={title} weeklyProgress={weeklyProgress} />
        <main className="relative z-10 px-4 pb-[calc(7.2rem+env(safe-area-inset-bottom))] pt-3">
          {children}
        </main>
        <BottomNav activeTab={activeTab} items={navItems} onNavigate={onNavigate} />
      </div>
    </div>
  );
}
