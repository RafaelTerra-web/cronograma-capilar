import type { Food } from '../types';

export const foods: Food[] = [
  { name: 'Peito de frango', group: 'proteins' },
  { name: 'Ovo', group: 'proteins' },
  { name: 'Queijo', group: 'proteins' },
  { name: 'Presunto', group: 'proteins', note: 'Usar com moderacao por ser processado.' },
  { name: 'Feijao', group: 'proteins', note: 'Apoio proteico, nao proteina principal.' },
  { name: 'Arroz', group: 'carbs' },
  { name: 'Batata inglesa', group: 'carbs' },
  { name: 'Pao', group: 'carbs' },
  { name: 'Farofa', group: 'carbs', note: 'Calorica, usar em pequena quantidade.' },
  { name: 'Batata palha', group: 'carbs', note: 'Usar pouco, porque sobe calorias rapido.' },
  { name: 'Banana ou fruta opcional', group: 'carbs', note: 'Opcional, se ela aceitar.' },
  { name: 'Azeite opcional', group: 'fats' },
  { name: 'Queijo', group: 'fats' },
  { name: 'Ovo', group: 'fats' },
];
