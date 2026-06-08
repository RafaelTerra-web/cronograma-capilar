import type { Goals, Meal, Profile } from '../types';

export const defaultProfile: Profile = {
  name: 'Ana',
  heightCm: 165,
  weightKg: 62,
  trainingDays: 4,
  cardioDays: 3,
  preferredFoods: [
    'Peito de frango',
    'Arroz',
    'Feijao',
    'Farofa',
    'Batata inglesa',
    'Batata palha',
    'Pao com queijo',
    'Presunto',
  ],
  avoidedFoods: ['Verduras', 'Legumes', 'Saladas'],
  theme: 'rose',
};

export const defaultGoals: Goals = {
  calories: 1700,
  protein: 120,
  fat: 50,
  waterLiters: 2,
};

export const defaultMeals: Meal[] = [
  {
    id: 'cafe',
    title: 'Cafe da manha',
    time: 'Manha',
    calories: 330,
    protein: 17,
    items: ['1 pao frances ou 2 fatias de pao de forma', '1 fatia de queijo', '1 fatia de presunto moderado', 'Cafe, se ela tomar'],
    note: 'Se faltar proteina no dia, adicionar ovo ou reforcar frango em outra refeicao.',
  },
  {
    id: 'almoco',
    title: 'Almoco',
    time: 'Meio do dia',
    calories: 560,
    protein: 45,
    items: ['120 a 150 g de peito de frango', '100 a 130 g de arroz cozido', '80 a 100 g de feijao', '10 a 15 g de farofa'],
    note: 'Batata inglesa pode trocar parte do arroz quando quiser variar.',
  },
  {
    id: 'lanche',
    title: 'Lanche',
    time: 'Tarde',
    calories: 330,
    protein: 20,
    items: ['Pao com queijo', 'Ovo com pao', 'Frango desfiado com pao', 'Queijo com pao ajustando a quantidade'],
    note: 'Escolher a opcao que encaixar melhor na fome e na meta do dia.',
  },
  {
    id: 'jantar',
    title: 'Jantar',
    time: 'Noite',
    calories: 470,
    protein: 40,
    items: ['120 a 150 g de peito de frango', '100 a 150 g de batata inglesa ou 100 g de arroz cozido', '80 g de feijao', 'Pouca farofa ou sem farofa'],
    note: 'Evitar batata palha em grande quantidade.',
  },
];

export const cuttingRules = [
  'Perder gordura sem derrubar demais a performance do treino.',
  'Manter deficit moderado, sem cortar carboidrato de forma agressiva.',
  'Proteina alta todos os dias.',
  'Avaliar peso pela media semanal, nao por um dia isolado.',
  'Se o peso cair rapido demais e o treino piorar, subir um pouco as calorias.',
  'Se o peso nao cair por 2 semanas, reduzir 100 a 150 kcal ou aumentar cardio leve.',
];
