import { Beef, Info, Utensils } from 'lucide-react';
import { Card } from '../components/Card';
import { MealCard } from '../components/MealCard';
import { ProgressBar } from '../components/ProgressBar';
import { cuttingRules } from '../data/dietPlan';
import { foods } from '../data/foods';
import type { AppData, DailyChecks, Goals, Meal } from '../types';
import { getDietSuggestions } from '../utils/progressRules';

type DietProps = {
  data: AppData;
  todayChecks: DailyChecks;
  onGoalsChange: (goals: Partial<Goals>) => void;
  onMealChange: (meal: Meal) => void;
  onToggleMeal: (mealId: string) => void;
};

const foodLabels = {
  proteins: 'Proteinas',
  carbs: 'Carboidratos',
  fats: 'Gorduras',
};

export function Diet({ data, todayChecks, onGoalsChange, onMealChange, onToggleMeal }: DietProps) {
  const totalCalories = data.meals.reduce((total, meal) => total + meal.calories, 0);
  const totalProtein = data.meals.reduce((total, meal) => total + meal.protein, 0);
  const calorieProgress = Math.round((totalCalories / data.goals.calories) * 100);
  const proteinProgress = Math.round((totalProtein / data.goals.protein) * 100);
  const suggestions = getDietSuggestions(data.meals, data.goals, data.progressEntries);

  return (
    <div className="space-y-5">
      <header className="pt-2">
        <p className="text-sm font-semibold text-rose-700">Cutting leve e sustentavel</p>
        <h1 className="page-title mt-1">Dieta</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">Plano com alimentos que a Ana realmente come, sem basear a dieta em salada.</p>
      </header>

      <Card>
        <div className="flex items-center gap-2">
          <Utensils className="text-rose-700" size={20} aria-hidden="true" />
          <h2 className="section-title">Metas editaveis</h2>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <label className="space-y-1 text-sm font-medium text-slate-700">
            <span>Calorias</span>
            <input
              className="input"
              inputMode="numeric"
              value={data.goals.calories}
              onChange={(event) => onGoalsChange({ calories: Number(event.target.value) || 0 })}
            />
          </label>
          <label className="space-y-1 text-sm font-medium text-slate-700">
            <span>Proteina</span>
            <input
              className="input"
              inputMode="numeric"
              value={data.goals.protein}
              onChange={(event) => onGoalsChange({ protein: Number(event.target.value) || 0 })}
            />
          </label>
          <label className="space-y-1 text-sm font-medium text-slate-700">
            <span>Gorduras</span>
            <input
              className="input"
              inputMode="numeric"
              value={data.goals.fat}
              onChange={(event) => onGoalsChange({ fat: Number(event.target.value) || 0 })}
            />
          </label>
          <label className="space-y-1 text-sm font-medium text-slate-700">
            <span>Agua</span>
            <input
              className="input"
              inputMode="decimal"
              value={data.goals.waterLiters}
              onChange={(event) => onGoalsChange({ waterLiters: Number(event.target.value) || 0 })}
            />
          </label>
        </div>
        <div className="mt-4 space-y-4">
          <ProgressBar value={calorieProgress} label={`${totalCalories} kcal no plano`} tone="amber" />
          <ProgressBar value={proteinProgress} label={`${totalProtein} g de proteina`} tone="teal" />
        </div>
        <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm leading-relaxed text-slate-600">
          Essa e uma estimativa inicial. O ideal e ajustar a cada 2 semanas com base na media do peso, medidas, fome,
          treino e energia.
        </p>
      </Card>

      <section className="space-y-3">
        <h2 className="section-title">Refeicoes</h2>
        {data.meals.map((meal) => (
          <MealCard
            editable
            meal={meal}
            key={meal.id}
            done={Boolean(todayChecks.meals[meal.id])}
            onToggle={() => onToggleMeal(meal.id)}
            onChange={onMealChange}
          />
        ))}
      </section>

      <Card>
        <div className="flex items-center gap-2">
          <Info className="text-teal-700" size={20} aria-hidden="true" />
          <h2 className="section-title">Regras simples</h2>
        </div>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-700">
          {cuttingRules.map((rule) => (
            <li className="flex gap-2" key={rule}>
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" />
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <div className="flex items-center gap-2">
          <Beef className="text-rose-700" size={20} aria-hidden="true" />
          <h2 className="section-title">Alimentos base</h2>
        </div>
        <div className="mt-4 space-y-4">
          {(['proteins', 'carbs', 'fats'] as const).map((group) => (
            <div key={group}>
              <h3 className="text-sm font-bold text-slate-900">{foodLabels[group]}</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {foods
                  .filter((food) => food.group === group)
                  .map((food) => (
                    <span className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700" key={`${group}-${food.name}`}>
                      {food.name}
                      {food.note ? <span className="block pt-1 text-xs font-medium text-slate-500">{food.note}</span> : null}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="section-title">Sugestoes automaticas</h2>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-700">
          {suggestions.map((suggestion) => (
            <li className="flex gap-2" key={suggestion}>
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-600" />
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
