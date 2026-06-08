import { useMemo } from "react";
import { monthlyChecklistItems } from "../data/checklist.js";
import { getMonthKey, getMonthLabel } from "../utils/dates.js";
import useLocalStorage from "./useLocalStorage.js";

export default function useMonthlyChecklist() {
  const monthKey = useMemo(() => getMonthKey(), []);
  const monthLabel = useMemo(() => getMonthLabel(), []);
  const [checkedItems, setCheckedItems] = useLocalStorage(`juba:checklist:${monthKey}`, {});

  const completedCount = monthlyChecklistItems.filter((item) => checkedItems[item.id]).length;
  const percent = Math.round((completedCount / monthlyChecklistItems.length) * 100);

  const toggleItem = (itemId) => {
    setCheckedItems((current) => ({
      ...current,
      [itemId]: !current[itemId]
    }));
  };

  const resetChecklist = () => {
    setCheckedItems({});
  };

  return {
    checkedItems,
    completedCount,
    items: monthlyChecklistItems,
    monthKey,
    monthLabel,
    percent,
    resetChecklist,
    toggleItem,
    total: monthlyChecklistItems.length
  };
}
