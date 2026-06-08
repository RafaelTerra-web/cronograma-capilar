import { useMemo, useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { defaultGoals, defaultMeals, defaultProfile } from './data/dietPlan';
import { getTodayPlan } from './data/workoutPlan';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Diet } from './pages/Diet';
import { Progress } from './pages/Progress';
import { Settings } from './pages/Settings';
import { Today } from './pages/Today';
import { Workout } from './pages/Workout';
import type { AppData, AppTab, DailyChecks, ExerciseLog, Goals, Meal, Profile, ProgressEntry } from './types';
import { calculateDynamicGoals, calculateMealPlan } from './utils/dietCalculator';

const STORAGE_KEY = 'ana-fit-planner:data:v2';

function getDateKey(date = new Date()) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

function createDailyChecks(meals: Meal[]): DailyChecks {
  return {
    trainingDone: false,
    cardioDone: false,
    waterDone: false,
    stepsDone: false,
    meals: Object.fromEntries(meals.map((meal) => [meal.id, false])),
  };
}

function createInitialData(): AppData {
  return {
    profile: defaultProfile,
    goals: defaultGoals,
    meals: defaultMeals,
    dailyChecks: {
      [getDateKey()]: createDailyChecks(defaultMeals),
    },
    exerciseLogs: {},
    progressEntries: [],
  };
}

function normalizeDailyChecks(checks: DailyChecks | undefined, meals: Meal[]): DailyChecks {
  const mealChecks = Object.fromEntries(meals.map((meal) => [meal.id, Boolean(checks?.meals?.[meal.id])]));

  return {
    trainingDone: Boolean(checks?.trainingDone),
    cardioDone: Boolean(checks?.cardioDone),
    waterDone: Boolean(checks?.waterDone),
    stepsDone: Boolean(checks?.stepsDone),
    meals: mealChecks,
  };
}

function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('today');
  const [data, setData] = useLocalStorage<AppData>(STORAGE_KEY, createInitialData);
  const dateKey = getDateKey();
  const todayPlan = useMemo(() => getTodayPlan(), []);
  const todayChecks = normalizeDailyChecks(data.dailyChecks[dateKey], data.meals);

  const updateTodayChecks = (updater: (checks: DailyChecks) => DailyChecks) => {
    setData((current) => {
      const currentChecks = normalizeDailyChecks(current.dailyChecks[dateKey], current.meals);

      return {
        ...current,
        dailyChecks: {
          ...current.dailyChecks,
          [dateKey]: updater(currentChecks),
        },
      };
    });
  };

  const toggleCheck = (key: keyof Omit<DailyChecks, 'meals'>) => {
    updateTodayChecks((checks) => ({ ...checks, [key]: !checks[key] }));
  };

  const toggleMeal = (mealId: string) => {
    updateTodayChecks((checks) => ({
      ...checks,
      meals: {
        ...checks.meals,
        [mealId]: !checks.meals[mealId],
      },
    }));
  };

  const updateExerciseLog = (exerciseId: string, log: ExerciseLog) => {
    setData((current) => ({
      ...current,
      exerciseLogs: {
        ...current.exerciseLogs,
        [exerciseId]: log,
      },
    }));
  };

  const updateGoals = (goals: Partial<Goals>) => {
    setData((current) => ({
      ...current,
      goals: {
        ...current.goals,
        ...goals,
      },
      meals: calculateMealPlan(current.profile, { ...current.goals, ...goals }),
    }));
  };

  const updateProfile = (profile: Partial<Profile>) => {
    setData((current) => {
      const nextProfile = {
        ...current.profile,
        ...profile,
        theme: 'dark' as const,
      };
      const nextGoals = calculateDynamicGoals(nextProfile);

      return {
        ...current,
        profile: nextProfile,
        goals: nextGoals,
        meals: calculateMealPlan(nextProfile, nextGoals),
      };
    });
  };

  const addProgress = (entry: ProgressEntry) => {
    setData((current) => ({
      ...current,
      profile: {
        ...current.profile,
        weightKg: entry.weightKg || current.profile.weightKg,
      },
      progressEntries: [...current.progressEntries.filter((item) => item.id !== entry.id), entry].sort((first, second) =>
        first.date.localeCompare(second.date)
      ),
    }));
  };

  const resetData = () => {
    const confirmed = window.confirm('Reiniciar todos os dados locais do Ana Fit Planner?');
    if (confirmed) {
      setData(createInitialData());
      setActiveTab('today');
    }
  };

  return (
    <main className="app-page" data-theme={data.profile.theme}>
      <div className="mx-auto max-w-md">
        {activeTab === 'today' ? (
          <Today
            data={data}
            onSelectTab={setActiveTab}
          />
        ) : null}
        {activeTab === 'workout' ? (
          <Workout
            data={data}
            todayChecks={todayChecks}
            todayPlan={todayPlan}
            onExerciseLogChange={updateExerciseLog}
            onToggleCheck={toggleCheck}
          />
        ) : null}
        {activeTab === 'diet' ? (
          <Diet data={data} todayChecks={todayChecks} onToggleMeal={toggleMeal} />
        ) : null}
        {activeTab === 'progress' ? <Progress data={data} onAddProgress={addProgress} /> : null}
        {activeTab === 'settings' ? (
          <Settings data={data} onProfileChange={updateProfile} onGoalsChange={updateGoals} onResetData={resetData} />
        ) : null}
      </div>
      {activeTab !== 'today' ? <BottomNav activeTab={activeTab} onChange={setActiveTab} /> : null}
    </main>
  );
}

export default App;
