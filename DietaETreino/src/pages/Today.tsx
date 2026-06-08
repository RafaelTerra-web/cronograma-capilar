import { ArrowRight, Droplets, Dumbbell, Flame, HeartPulse, Scale, Utensils } from 'lucide-react';
import type { AppData, AppTab, DailyChecks, WeekPlanItem } from '../types';
import { calculateBmi } from '../utils/calculations';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { StatCard } from '../components/StatCard';

type TodayProps = {
  data: AppData;
  todayChecks: DailyChecks;
  todayPlan: WeekPlanItem;
  onSelectTab: (tab: AppTab) => void;
  onToggleCheck: (key: keyof Omit<DailyChecks, 'meals'>) => void;
  onToggleMeal: (mealId: string) => void;
};

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'long',
  day: '2-digit',
  month: 'long',
});

export function Today({ data, todayChecks, todayPlan, onSelectTab, onToggleCheck, onToggleMeal }: TodayProps) {
  const totalMealCalories = data.meals.reduce((total, meal) => total + meal.calories, 0);
  const totalMealProtein = data.meals.reduce((total, meal) => total + meal.protein, 0);
  const mealsDone = data.meals.filter((meal) => todayChecks.meals[meal.id]).length;
  const plannedTasks =
    data.meals.length + 2 + (todayPlan.workoutId ? 1 : 0) + (todayPlan.cardio ? 1 : 0);
  const doneTasks =
    mealsDone +
    Number(todayChecks.waterDone) +
    Number(todayChecks.stepsDone) +
    Number(todayPlan.workoutId ? todayChecks.trainingDone : false) +
    Number(todayPlan.cardio ? todayChecks.cardioDone : false);
  const completion = Math.round((doneTasks / plannedTasks) * 100);
  const bmi = calculateBmi(data.profile.weightKg, data.profile.heightCm);

  return (
    <div className="space-y-5">
      <header className="pt-2">
        <p className="text-sm font-semibold capitalize text-rose-700">{dateFormatter.format(new Date())}</p>
        <h1 className="page-title mt-1">Hoje, {data.profile.name}</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">Meta simples para manter dieta, treino e cardio no caminho certo.</p>
      </header>

      <section className="grid grid-cols-2 gap-3" aria-label="Escolha principal">
        <button
          type="button"
          data-testid="go-workout"
          className="min-h-36 rounded-lg bg-rose-700 p-4 text-left text-white shadow-soft transition active:scale-[0.98]"
          onClick={() => onSelectTab('workout')}
        >
          <Dumbbell size={26} aria-hidden="true" />
          <span className="mt-5 block text-xl font-extrabold">Treino</span>
          <span className="mt-1 flex items-center gap-1 text-sm font-semibold text-rose-50">
            Acessar <ArrowRight size={16} aria-hidden="true" />
          </span>
        </button>
        <button
          type="button"
          data-testid="go-diet"
          className="min-h-36 rounded-lg bg-teal-700 p-4 text-left text-white shadow-soft transition active:scale-[0.98]"
          onClick={() => onSelectTab('diet')}
        >
          <Utensils size={26} aria-hidden="true" />
          <span className="mt-5 block text-xl font-extrabold">Dieta</span>
          <span className="mt-1 flex items-center gap-1 text-sm font-semibold text-teal-50">
            Acessar <ArrowRight size={16} aria-hidden="true" />
          </span>
        </button>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={Scale} label="Peso" value={`${data.profile.weightKg} kg`} helper={`IMC ${bmi}`} tone="rose" />
        <StatCard icon={Flame} label="Calorias" value={`${data.goals.calories} kcal`} helper={`Plano: ${totalMealCalories} kcal`} tone="amber" />
        <StatCard icon={HeartPulse} label="Proteina" value={`${data.goals.protein} g`} helper={`Plano: ${totalMealProtein} g`} tone="teal" />
        <StatCard icon={Droplets} label="Agua" value={`${data.goals.waterLiters} L`} helper="Meta do dia" tone="teal" />
      </div>

      <Card>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="section-title">Meta de hoje</h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              {todayPlan.title}
              {todayPlan.cardio ? ` · Cardio: ${todayPlan.cardio}` : ''}
            </p>
          </div>
          <span className="rounded-lg bg-amber-50 px-3 py-1 text-sm font-bold text-amber-700">{completion}%</span>
        </div>
        <div className="mt-4">
          <ProgressBar value={completion} label="Progresso do dia" tone="rose" />
        </div>
        <div className="mt-4 grid gap-2">
          {todayPlan.workoutId ? (
            <button
              type="button"
              className={todayChecks.trainingDone ? 'primary-button bg-teal-700' : 'secondary-button'}
              onClick={() => onToggleCheck('trainingDone')}
            >
              <Dumbbell size={18} aria-hidden="true" />
              {todayChecks.trainingDone ? 'Treino concluido' : 'Marcar treino'}
            </button>
          ) : null}
          {todayPlan.cardio ? (
            <button
              type="button"
              className={todayChecks.cardioDone ? 'primary-button bg-teal-700' : 'secondary-button'}
              onClick={() => onToggleCheck('cardioDone')}
            >
              <HeartPulse size={18} aria-hidden="true" />
              {todayChecks.cardioDone ? 'Cardio concluido' : 'Marcar cardio'}
            </button>
          ) : null}
        </div>
      </Card>

      <Card>
        <h2 className="section-title">Checklist</h2>
        <div className="mt-4 space-y-3">
          {data.meals.map((meal) => (
            <label className="flex min-h-12 items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3" key={meal.id}>
              <input
                className="h-5 w-5 accent-rose-700"
                type="checkbox"
                checked={Boolean(todayChecks.meals[meal.id])}
                onChange={() => onToggleMeal(meal.id)}
              />
              <span className="text-sm font-semibold text-slate-700">{meal.title}</span>
            </label>
          ))}
          <label className="flex min-h-12 items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3">
            <input
              className="h-5 w-5 accent-teal-700"
              type="checkbox"
              checked={todayChecks.waterDone}
              onChange={() => onToggleCheck('waterDone')}
            />
            <span className="text-sm font-semibold text-slate-700">Agua: {data.goals.waterLiters} L</span>
          </label>
          <label className="flex min-h-12 items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3">
            <input
              className="h-5 w-5 accent-teal-700"
              type="checkbox"
              checked={todayChecks.stepsDone}
              onChange={() => onToggleCheck('stepsDone')}
            />
            <span className="text-sm font-semibold text-slate-700">Passos ou descanso ativo</span>
          </label>
        </div>
      </Card>

      <Card className="bg-slate-950 text-white">
        <p className="text-sm font-semibold text-rose-100">Foco no processo</p>
        <p className="mt-2 text-lg font-bold leading-snug">Voce concluiu mais um bloco quando marca uma tarefa. Um dia bem feito de cada vez.</p>
      </Card>
    </div>
  );
}
