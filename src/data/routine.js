export const routineDays = [
  {
    id: "monday",
    dayIndex: 1,
    shortName: "Seg",
    dayName: "Segunda",
    stage: "Lavagem + Finalização",
    statusLabel: "Dia de lavagem",
    products: ["Shampoo", "Condicionador", "Creme"],
    howTo:
      "Lavar, condicionar, aplicar pouco creme no cabelo bem molhado e amassar de baixo para cima.",
    time: "15-25 min",
    observation: "Usar menos creme se pesar.",
    icon: "droplets",
    tags: ["lavagem", "finalização"]
  },
  {
    id: "tuesday",
    dayIndex: 2,
    shortName: "Ter",
    dayName: "Terça",
    stage: "Day After / Refresh leve",
    statusLabel: "Refresh leve",
    products: ["Água", "Pouquinho de creme, se necessário"],
    howTo:
      "Reativar as ondas apenas se o cabelo precisar. Evitar excesso de produto.",
    time: "3-7 min",
    observation: "Não pentear o cabelo seco.",
    icon: "spray",
    tags: ["refresh"]
  },
  {
    id: "wednesday",
    dayIndex: 3,
    shortName: "Qua",
    dayName: "Quarta",
    stage: "Revitalização",
    statusLabel: "Revitalização",
    products: ["Água", "Um pouco de creme"],
    howTo:
      "Umedecer levemente, reaplicar pouco produto e amassar para reativar as ondas.",
    time: "3-7 min",
    observation: "Aplicar só onde perdeu forma.",
    icon: "waves",
    tags: ["refresh", "revitalização"]
  },
  {
    id: "thursday",
    dayIndex: 4,
    shortName: "Qui",
    dayName: "Quinta",
    stage: "Day After / Refresh leve",
    statusLabel: "Refresh leve",
    products: ["Água", "Pouquinho de creme, se necessário"],
    howTo:
      "Reativar as ondas apenas se o cabelo precisar. Evitar excesso de produto.",
    time: "3-5 min",
    observation: "Preservar o formato e mexer pouco.",
    icon: "cloud",
    tags: ["refresh"]
  },
  {
    id: "friday",
    dayIndex: 5,
    shortName: "Sex",
    dayName: "Sexta",
    stage: "Tratamento + Finalização",
    statusLabel: "Dia de máscara",
    products: ["Shampoo", "Máscara", "Condicionador", "Creme"],
    howTo:
      "Lavar, aplicar a máscara por 5 a 10 minutos, enxaguar, usar condicionador para selar e finalizar com o creme.",
    time: "25-35 min",
    observation: "Dia principal de tratamento da semana.",
    icon: "sparkles",
    tags: ["lavagem", "máscara", "finalização"]
  },
  {
    id: "saturday",
    dayIndex: 6,
    shortName: "Sáb",
    dayName: "Sábado",
    stage: "Day After / Refresh leve",
    statusLabel: "Refresh leve",
    products: ["Água", "Pouquinho de creme, se necessário"],
    howTo:
      "Reativar as ondas apenas se o cabelo precisar. Evitar excesso de produto.",
    time: "2-5 min",
    observation: "Ajustar pontas com pouca água.",
    icon: "wind",
    tags: ["refresh"]
  },
  {
    id: "sunday",
    dayIndex: 0,
    shortName: "Dom",
    dayName: "Domingo",
    stage: "Day After / Descanso",
    statusLabel: "Descanso",
    products: ["Pouco creme ou óleo nas pontas, opcional"],
    howTo:
      "Ajustar o frizz, preservar o formato e evitar excesso de produto.",
    time: "0-5 min",
    observation: "Deixar o cabelo respirar.",
    icon: "moon",
    tags: ["descanso"]
  }
];

export const routineHighlights = [
  "2 a 3 lavagens por semana",
  "Máscara 1 vez por semana",
  "Pouca quantidade de creme",
  "Cabelo bem molhado antes da finalização"
];
