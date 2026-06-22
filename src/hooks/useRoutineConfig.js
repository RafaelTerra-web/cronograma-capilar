import { useCallback, useMemo } from "react";
import {
  buildRoutineDays,
  careTypes,
  defaultRoutineCareTypes,
  normalizeRoutineConfig
} from "../data/routine.js";
import useLocalStorage from "./useLocalStorage.js";

export const ROUTINE_STORAGE_KEY = "juba:routine-config:v2";

export default function useRoutineConfig() {
  const [storedConfig, setStoredConfig] = useLocalStorage(
    ROUTINE_STORAGE_KEY,
    normalizeRoutineConfig(null)
  );
  const config = useMemo(() => normalizeRoutineConfig(storedConfig), [storedConfig]);
  const days = useMemo(() => buildRoutineDays(config.days), [config.days]);
  const isCustomized = days.some(
    (day) => day.careType !== defaultRoutineCareTypes[day.id]
  );

  const setDayCareType = useCallback(
    (dayId, careType) => {
      if (!defaultRoutineCareTypes[dayId] || !careTypes[careType]) {
        return;
      }

      setStoredConfig({
        ...config,
        days: { ...config.days, [dayId]: careType }
      });
    },
    [config, setStoredConfig]
  );

  const resetRoutine = useCallback(() => {
    setStoredConfig(normalizeRoutineConfig(null));
  }, [setStoredConfig]);

  return {
    config,
    days,
    isCustomized,
    resetRoutine,
    setDayCareType,
    storageKey: ROUTINE_STORAGE_KEY
  };
}
