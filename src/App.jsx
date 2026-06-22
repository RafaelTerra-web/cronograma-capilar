import { MotionConfig, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import AppShell from "./components/AppShell.jsx";
import WhatsNewOnboarding from "./components/WhatsNewOnboarding.jsx";
import { navItems } from "./data/navigation.js";
import useMonthlyChecklist from "./hooks/useMonthlyChecklist.js";
import useRoutineConfig from "./hooks/useRoutineConfig.js";
import useWeeklyRoutine from "./hooks/useWeeklyRoutine.js";
import ChecklistPage from "./pages/ChecklistPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import RoutinePage from "./pages/RoutinePage.jsx";
import TipsPage from "./pages/TipsPage.jsx";
import TutorialPage from "./pages/TutorialPage.jsx";

const pageMap = {
  home: HomePage,
  routine: RoutinePage,
  products: ProductsPage,
  tutorial: TutorialPage,
  checklist: ChecklistPage,
  tips: TipsPage
};

const validTabs = new Set(navItems.map((item) => item.id));

function getInitialTab() {
  if (typeof window === "undefined") {
    return "home";
  }

  const hash = window.location.hash.replace("#", "");
  return validTabs.has(hash) ? hash : "home";
}

export default function App() {
  const [activeTab, setActiveTab] = useState(getInitialTab);
  const routine = useRoutineConfig();
  const weekly = useWeeklyRoutine(routine.days);
  const monthly = useMonthlyChecklist();

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (validTabs.has(hash)) {
        setActiveTab(hash);
      }
    };

    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const navigate = (tabId) => {
    if (!validTabs.has(tabId)) {
      return;
    }

    setActiveTab(tabId);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${tabId}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const activeMeta = useMemo(
    () => navItems.find((item) => item.id === activeTab) ?? navItems[0],
    [activeTab]
  );

  const Page = pageMap[activeTab] ?? HomePage;

  return (
    <MotionConfig reducedMotion="user">
      <WhatsNewOnboarding />
      <AppShell
        activeTab={activeTab}
        navItems={navItems}
        onNavigate={navigate}
        subtitle={activeMeta.subtitle}
        title={activeMeta.title}
        weeklyProgress={weekly.percent}
      >
        <motion.div
          key={activeTab}
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 14 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <Page monthly={monthly} navigate={navigate} routine={routine} weekly={weekly} />
        </motion.div>
      </AppShell>
    </MotionConfig>
  );
}
