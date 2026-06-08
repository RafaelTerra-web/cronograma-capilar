import type { Exercise, ExerciseLog, Goals, Meal, ProgressEntry } from '../types';
import { compareWeeklyWeight } from './calculations';

function maxRepFromRange(range: string) {
  const matches = range.match(/\d+/g);
  if (!matches?.length) {
    return null;
  }

  return Number(matches[matches.length - 1]);
}

export function getExerciseFeedback(exercise: Exercise, log?: ExerciseLog) {
  if (!log?.done) {
    return 'Execucao primeiro, carga depois.';
  }

  const maxRep = maxRepFromRange(exercise.reps);
  const reportedReps = Number(log.reps);
  const rir = Number(log.rir);

  if (maxRep && reportedReps >= maxRep && rir >= 1 && rir <= 2) {
    return exercise.progressionType === 'large'
      ? 'Boa. Da para tentar subir +2 a 5 kg na proxima.'
      : 'Boa. Da para tentar subir 1 placa ou o menor incremento.';
  }

  if (rir === 0) {
    return 'Carga ficou pesada. Mantem ou reduz um pouco para preservar execucao.';
  }

  return 'Mantem a carga ate bater todas as series.';
}

export function getDietSuggestions(meals: Meal[], goals: Goals, progressEntries: ProgressEntry[]) {
  const totalCalories = meals.reduce((total, meal) => total + meal.calories, 0);
  const totalProtein = meals.reduce((total, meal) => total + meal.protein, 0);
  const comparison = compareWeeklyWeight(progressEntries);
  const suggestions: string[] = [];

  if (totalProtein < goals.protein) {
    suggestions.push('Proteina baixa: reforcar frango, ovo ou queijo.');
  }

  if (totalCalories > goals.calories) {
    suggestions.push('Calorias altas: reduzir farofa, batata palha, queijo ou um pouco do arroz.');
  }

  if (comparison.previous && comparison.percent <= -0.8) {
    suggestions.push('Peso caiu rapido: se treino piorar, subir um pouco as calorias.');
  }

  if (comparison.previous && comparison.percent >= -0.1) {
    suggestions.push('Peso quase nao caiu: se repetir por 2 semanas, reduzir 100 a 150 kcal ou aumentar cardio leve.');
  }

  suggestions.push('Treino fraco: colocar mais carboidrato antes do treino pode ajudar.');
  suggestions.push('Fome alta: trocar parte por batata inglesa e dividir melhor as refeicoes.');

  return suggestions;
}
