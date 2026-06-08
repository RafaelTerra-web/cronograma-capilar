import type { Goals, Meal, Profile } from '../types';

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function roundToNearest(value: number, step: number) {
  return Math.round(value / step) * step;
}

export function calculateDynamicGoals(profile: Profile): Goals {
  const weight = profile.weightKg || 62;
  const trainingDays = profile.trainingDays || 4;
  const cardioDays = profile.cardioDays || 3;
  const estimatedMaintenance = weight * 26 + trainingDays * 45 + cardioDays * 25;
  const calories = roundToNearest(clamp(estimatedMaintenance - 250, 1500, 1900), 25);
  const protein = roundToNearest(clamp(weight * 1.9, 105, 145), 5);
  const fat = roundToNearest(clamp(weight * 0.8, 45, 60), 5);
  const waterLiters = Number(clamp(weight * 0.035, 2, 3).toFixed(1));

  return { calories, protein, fat, waterLiters };
}

export function calculateMealPlan(profile: Profile, goals: Goals): Meal[] {
  const fallbackGoals = calculateDynamicGoals(profile);
  const calories = goals.calories || fallbackGoals.calories;
  const protein = goals.protein || fallbackGoals.protein;
  const chickenPortion = protein >= 125 ? '150 g' : protein >= 115 ? '130 a 150 g' : '120 a 130 g';
  const ricePortion = calories >= 1750 ? '120 a 140 g' : calories >= 1650 ? '100 a 130 g' : '80 a 110 g';
  const potatoPortion = calories >= 1750 ? '150 a 180 g' : calories >= 1650 ? '120 a 150 g' : '100 a 130 g';
  const breakfastProtein = protein >= 125 ? '1 ovo ou mais frango em outra refeicao' : 'reforcar frango em outra refeicao se precisar';
  const snackOption = protein >= 125 ? 'Frango desfiado com pao ou ovo com pao' : 'Pao com queijo ou ovo com pao';
  const breakfastCalories = Math.round(calories * 0.2);
  const lunchCalories = Math.round(calories * 0.35);
  const snackCalories = Math.round(calories * 0.2);
  const breakfastProteinTarget = Math.round(protein * 0.15);
  const lunchProtein = Math.round(protein * 0.4);
  const snackProtein = Math.round(protein * 0.2);

  return [
    {
      id: 'cafe',
      title: 'Cafe da manha',
      time: 'Manha',
      calories: breakfastCalories,
      protein: breakfastProteinTarget,
      items: ['Pao frances ou pao de forma', 'Queijo em porcao moderada', 'Presunto em quantidade moderada', breakfastProtein],
      note: 'A quantidade se ajusta pelas metas em Ajustes. Sem verdura forcada no plano principal.',
    },
    {
      id: 'almoco',
      title: 'Almoco',
      time: 'Meio do dia',
      calories: lunchCalories,
      protein: lunchProtein,
      items: [`${chickenPortion} de peito de frango`, `${ricePortion} de arroz cozido`, '80 a 100 g de feijao', '10 a 15 g de farofa'],
      note: 'Se as calorias baixarem, cortar primeiro farofa/batata palha antes de mexer na proteina.',
    },
    {
      id: 'lanche',
      title: 'Lanche',
      time: 'Tarde',
      calories: snackCalories,
      protein: snackProtein,
      items: [snackOption, 'Queijo com pao ajustando a quantidade', 'Banana opcional, se ela aceitar'],
      note: 'Em dia de treino fraco, concentrar mais carboidrato antes do treino.',
    },
    {
      id: 'jantar',
      title: 'Jantar',
      time: 'Noite',
      calories: calories - breakfastCalories - lunchCalories - snackCalories,
      protein: protein - breakfastProteinTarget - lunchProtein - snackProtein,
      items: [`${chickenPortion} de peito de frango`, `${potatoPortion} de batata inglesa ou ${ricePortion} de arroz`, 'Feijao em porcao moderada', 'Pouca farofa ou sem farofa'],
      note: 'Batata palha fica como detalhe, nao como base da refeicao.',
    },
  ];
}
