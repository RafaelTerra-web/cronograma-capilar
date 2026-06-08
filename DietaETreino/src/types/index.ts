export type AppTab = 'today' | 'workout' | 'diet' | 'progress' | 'settings';

export type ThemeName = 'rose' | 'teal' | 'plum';

export type Profile = {
  name: string;
  heightCm: number;
  weightKg: number;
  trainingDays: number;
  cardioDays: number;
  preferredFoods: string[];
  avoidedFoods: string[];
  theme: ThemeName;
};

export type Goals = {
  calories: number;
  protein: number;
  fat: number;
  waterLiters: number;
};

export type Meal = {
  id: string;
  title: string;
  time: string;
  items: string[];
  calories: number;
  protein: number;
  note: string;
};

export type FoodGroup = 'proteins' | 'carbs' | 'fats';

export type Food = {
  name: string;
  group: FoodGroup;
  note?: string;
};

export type Exercise = {
  id: string;
  name: string;
  sets: string;
  reps: string;
  rest: string;
  rir?: string;
  note?: string;
  progressionType: 'large' | 'isolation';
};

export type Workout = {
  id: string;
  title: string;
  shortTitle: string;
  focus: string;
  dayLabel: string;
  exercises: Exercise[];
  cardio?: string;
};

export type WeekPlanItem = {
  dayIndex: number;
  dayLabel: string;
  title: string;
  workoutId?: string;
  cardio?: string;
  rest?: string;
};

export type ExerciseLog = {
  weight: string;
  reps: string;
  setsDone: string;
  rir: string;
  note: string;
  done: boolean;
};

export type DailyChecks = {
  trainingDone: boolean;
  cardioDone: boolean;
  waterDone: boolean;
  stepsDone: boolean;
  meals: Record<string, boolean>;
};

export type ProgressEntry = {
  id: string;
  date: string;
  weightKg: number;
  waistCm: number;
  hipCm: number;
  hipThrustKg: number;
  bulgarianKg: number;
  rdlKg: number;
  trainingFrequency: number;
  cardioFrequency: number;
  photoDataUrl?: string;
};

export type AppData = {
  profile: Profile;
  goals: Goals;
  meals: Meal[];
  dailyChecks: Record<string, DailyChecks>;
  exerciseLogs: Record<string, ExerciseLog>;
  progressEntries: ProgressEntry[];
};
