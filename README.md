# Star Wars Explorer

Simple Star Wars explorer. Show characters page and single character page.

## Tech Stack

- **Vite** + **React** + **TypeScript**
- **@tanstack/react-router**
- **@tanstack/react-query**
- **Tailwind CSS** + **Shadcn/UI**
- **ESLint 9** + **Prettier**
- **Playwright**

## Start

```bash
pnpm i
pnpm dev            # http://localhost:5173
```

### Build and preview

```bash
pnpm build
pnpm preview        # http://localhost:5173
```

### Lint

```bash
pnpm lint           # падение при ошибках
```

### E2E

```bash
pnpm exec playwright install --with-deps
pnpm exec playwright test
```

## Env

Create `.env`:

```env
VITE_API_URL=https://swapi.dev/api
```

## Repo struct

```
src/
  entities/        # domain (person, api options)
  features/        # user actions (search, pagination).
  app/             # app setup (route, query)
  shared/          # utils, hooks, types
  config/          # env config
e2e/
  mocks.ts         # Mocks
  *.spec.ts        # e2e-tests
```

## CI/CD (GitHub Actions + Pages)

Simple CI/CD:

ESLint → e2e → build → deploy
