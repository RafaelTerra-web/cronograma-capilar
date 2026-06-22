# Rotina Capilar da Princesa

Web app mobile-first para acompanhar um cronograma capilar com o kit Widi Care Ondulando a Juba + máscara. O projeto foi pensado para iPhone 13 Pro Max, com navegação fixa inferior, cartões objetivos, progresso semanal e checklist mensal salvo no navegador.

## Stack

- React + Vite
- Tailwind CSS
- Lucide React
- Framer Motion
- PWA básico com manifest e service worker
- Configuração pronta para Netlify

## Como rodar localmente

```bash
npm install
npm run dev
```

Depois abra a URL informada pelo Vite no navegador.

## Build e preview

```bash
npm run build
npm run preview
```

O build final fica em `dist/`.

## Deploy na Netlify

O arquivo `netlify.toml` já define:

- Build command: `npm run build`
- Publish directory: `dist`
- Redirect SPA para `index.html`
- Cache longo para assets gerados

Para publicar:

1. Suba o projeto para um repositório no GitHub.
2. Na Netlify, escolha **Add new site > Import an existing project**.
3. Conecte o GitHub e selecione o repositório.
4. Confirme `npm run build` e `dist`.
5. Publique.

## GitHub

```bash
git init
git add .
git commit -m "Initial hair routine app"
git branch -M main
git remote add origin <url-do-repositorio>
git push -u origin main
```

## Estrutura

```text
src/
  components/  Componentes reutilizáveis da interface
  data/        Rotina semanal, produtos, tutorial, dicas e observações
  hooks/       Persistência em localStorage
  pages/       Telas do app
  utils/       Datas e ícones
  App.jsx
  main.jsx
  index.css
```

## Funcionalidades

- Tela Hoje com rotina do dia, imagem visual e progresso semanal.
- Rotina semanal editável por tipo de cuidado, com persistência no navegador.
- Introdução visual das novidades exibida uma vez por versão.
- Rotina semanal com status pendente/feito e marcação por data real.
- Calendário mensal visual mostrando os dias da rotina já marcados.
- Produtos do kit com frequência, quantidade, resultado e observações.
- Tutorial de finalização em 9 passos.
- Checklist mensal salvo por mês no `localStorage`.
- Dicas rápidas e observações carinhosas chamando ela de princesa.
- Layout centralizado no desktop e otimizado para iOS com safe areas.
- Ícones PWA e Apple Touch Icon derivados da nova identidade visual.

## Próximos passos possíveis

- Adicionar ícones PNG maiores para instalação PWA em iOS.
- Criar lembretes locais com notificações, caso o navegador permita.
- Adicionar tema alternativo ou foto real do kit, se houver permissão de uso.
