export const ROUTINE_CONFIG_VERSION = 2;

export const careTypes = {
  wash: {
    id: "wash",
    label: "Lavagem",
    stage: "Lavagem + Finalização",
    statusLabel: "Dia de lavagem",
    products: ["Shampoo", "Condicionador", "Creme"],
    howTo:
      "Lave a raiz, condicione o comprimento e finalize com pouco creme no cabelo bem molhado.",
    time: "15-25 min",
    observation: "Amasse de baixo para cima e evite mexer enquanto seca.",
    icon: "droplets",
    tags: ["lavagem", "finalização"]
  },
  washExtraCream: {
    id: "washExtraCream",
    label: "Lavagem com mais creme",
    stage: "Lavagem + Finalização caprichada",
    statusLabel: "Lavagem com mais creme",
    products: ["Shampoo", "Condicionador", "Creme"],
    howTo:
      "Lave normalmente e finalize no cabelo bem molhado com um pouco mais de creme, distribuindo com cuidado.",
    time: "20-30 min",
    observation: "Use um pouco mais de creme, sem deixar acumular na raiz.",
    icon: "sparkles",
    tags: ["lavagem", "finalização", "mais creme"]
  },
  dayAfter: {
    id: "dayAfter",
    label: "Day after",
    stage: "Day After / Refresh leve",
    statusLabel: "Day after",
    products: ["Água", "Pouquinho de creme, se necessário"],
    howTo:
      "Observe as ondas, borrife água apenas onde precisar e use um tiquinho de creme para reativar a forma.",
    time: "3-7 min",
    observation: "Não penteie o cabelo seco e evite excesso de produto.",
    icon: "waves",
    tags: ["refresh", "day after"]
  },
  maskWash: {
    id: "maskWash",
    label: "Lavagem com máscara",
    stage: "Lavagem com máscara + Finalização",
    statusLabel: "Dia de máscara",
    products: ["Shampoo", "Máscara", "Condicionador", "Creme"],
    howTo:
      "Lave, aplique a máscara por 5 a 10 minutos, enxágue, condicione e finalize com creme.",
    time: "25-35 min",
    observation: "Este é o tratamento principal da semana.",
    icon: "bath",
    tags: ["lavagem", "máscara", "finalização"]
  }
};

export const careTypeOptions = Object.values(careTypes);

export const careGuides = {
  wash: {
    title: "Lavagem + finalização",
    summary: "Limpe a raiz e finalize com leveza para manter as ondas soltas.",
    time: careTypes.wash.time,
    steps: [
      "Molhe bem o cabelo antes do shampoo.",
      "Aplique shampoo principalmente na raiz e massageie com cuidado.",
      "Use condicionador no comprimento e nas pontas.",
      "Aplique pouco creme no cabelo bem molhado.",
      "Amasse de baixo para cima e deixe secar sem mexer."
    ]
  },
  washExtraCream: {
    title: "Lavagem com finalização caprichada",
    summary: "Hoje a finalização recebe um pouco mais de creme para reforçar a definição.",
    time: careTypes.washExtraCream.time,
    steps: [
      "Molhe bem o cabelo e lave a raiz com shampoo.",
      "Condicione o comprimento e desembarace com delicadeza.",
      "Mantenha o cabelo bem molhado para distribuir o produto.",
      "Aplique um pouco mais de creme, evitando a raiz.",
      "Amasse de baixo para cima e não mexa enquanto seca."
    ]
  },
  dayAfter: {
    title: "Day after / refresh leve",
    summary: "Reative somente as partes que perderam forma, sem pesar os fios.",
    time: careTypes.dayAfter.time,
    steps: [
      "Observe primeiro se o cabelo realmente precisa de ajuste.",
      "Borrife pouca água nas partes amassadas ou com frizz.",
      "Use um tiquinho de creme apenas se necessário.",
      "Amasse de baixo para cima para recuperar as ondas.",
      "Evite pentear seco ou adicionar produto em excesso."
    ]
  },
  maskWash: {
    title: "Lavagem com máscara",
    summary: "Faça o principal tratamento da semana e finalize com suavidade.",
    time: careTypes.maskWash.time,
    steps: [
      "Lave a raiz com shampoo e enxágue bem.",
      "Aplique a máscara no comprimento e nas pontas.",
      "Deixe agir por 5 a 10 minutos e enxágue.",
      "Use condicionador para selar e desembaraçar.",
      "Finalize com creme no cabelo bem molhado."
    ]
  }
};

const dayDefinitions = [
  { id: "monday", dayIndex: 1, shortName: "Seg", dayName: "Segunda" },
  { id: "tuesday", dayIndex: 2, shortName: "Ter", dayName: "Terça" },
  { id: "wednesday", dayIndex: 3, shortName: "Qua", dayName: "Quarta" },
  { id: "thursday", dayIndex: 4, shortName: "Qui", dayName: "Quinta" },
  { id: "friday", dayIndex: 5, shortName: "Sex", dayName: "Sexta" },
  { id: "saturday", dayIndex: 6, shortName: "Sáb", dayName: "Sábado" },
  { id: "sunday", dayIndex: 0, shortName: "Dom", dayName: "Domingo" }
];

export const defaultRoutineCareTypes = {
  monday: "dayAfter",
  tuesday: "wash",
  wednesday: "dayAfter",
  thursday: "wash",
  friday: "maskWash",
  saturday: "dayAfter",
  sunday: "washExtraCream"
};

export function normalizeRoutineConfig(value) {
  const savedDays = value && typeof value === "object" ? value.days : null;
  const days = Object.fromEntries(
    dayDefinitions.map((day) => {
      const savedType = savedDays?.[day.id];
      return [day.id, careTypes[savedType] ? savedType : defaultRoutineCareTypes[day.id]];
    })
  );

  return { version: ROUTINE_CONFIG_VERSION, days };
}

export function buildRoutineDays(config = defaultRoutineCareTypes) {
  return dayDefinitions.map((day) => {
    const careType = careTypes[config[day.id]] ? config[day.id] : defaultRoutineCareTypes[day.id];
    return { ...day, ...careTypes[careType], careType, id: day.id };
  });
}

export const routineDays = buildRoutineDays();

export const routineHighlights = [
  "4 lavagens por semana",
  "Máscara 1 vez por semana",
  "Day after entre as lavagens",
  "Mais creme na finalização de domingo"
];
