# Ana Fit Planner

PWA mobile-first para a Ana acompanhar dieta de cutting, treino com foco em gluteos, cardio e progresso corporal.

## Instalar

```bash
npm install
```

## Rodar localmente

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Deploy no Netlify

Crie um novo site apontando para esta pasta e use:

- Build command: `npm run build`
- Publish directory: `dist`

O arquivo `netlify.toml` ja deixa o app pronto para SPA.

## Arquivos principais

- `src/App.tsx`: estado principal, navegacao e persistencia local.
- `src/pages/Today.tsx`: tela inicial com escolha simples entre treino e dieta.
- `src/pages/Workout.tsx`: rotina semanal, exercicios e registro de carga/reps.
- `src/pages/Diet.tsx`: metas, refeicoes editaveis e sugestoes.
- `src/pages/Progress.tsx`: peso, medidas, cargas, fotos locais e graficos.
- `src/pages/Settings.tsx`: perfil, metas, alimentos e tema.
- `src/data/workoutPlan.ts`: plano semanal de treino.
- `src/data/dietPlan.ts`: perfil, metas e refeicoes iniciais.

## Editar treino e dieta

Para mudar treino, edite `src/data/workoutPlan.ts`.

Para mudar refeicoes, metas iniciais ou perfil da Ana, edite `src/data/dietPlan.ts`.

Os ajustes feitos dentro do app ficam salvos no `localStorage` do navegador.
