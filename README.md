# Volley Driven Development (PoC)

This repository is a Proof of Concept (PoC) showcasing how to apply BDD (Behavior‑Driven Development) and TDD (Test‑Driven Development) while building a modern React + TypeScript front‑end.

The app is a simple volleyball scoreboard. Business rules live in pure domain functions, and UI state is managed with Zustand.

## Live Demo

- Production: <https://volley-driven-development.vercel.app/>

## Tech Stack

- React 19, TypeScript 5, Vite 7
- Zustand for state management
- Vitest + Testing Library for TDD (unit and component tests)
- Cucumber.js for BDD (features and step definitions)
- Tailwind (plugin) and utility components

## Folder Structure (summary)

- `src/domain/`: pure business rules (immutable, testable)
- `src/stores/`: Zustand stores delegating logic to the domain layer
- `src/components/`: UI components
- `tests/unit/`: unit and component tests (Vitest + RTL)
- `tests/features/` and `tests/step-definitions/`: BDD specs (Cucumber.js)
- `tests/vitest.setup.ts`: resets Zustand stores between tests

## Scripts

- `pnpm dev`: development server
- `pnpm build`: production build
- `pnpm preview`: preview built app
- `pnpm lint` / `pnpm lint:fix`: linting
- `pnpm test`: unit/component test suite (Vitest)
- `pnpm test:coverage`: coverage (Vitest)
- `pnpm test:ui`: Vitest UI runner
- `pnpm test:bdd`: BDD scenarios (Cucumber.js)

## Getting Started

1. Requirements: Node 20+, pnpm
2. Install deps: `pnpm install`
3. Start dev server: `pnpm dev`
4. Run tests:
   - TDD (unit/component): `pnpm test`
   - BDD: `pnpm test:bdd`

## BDD/TDD Approach

- TDD: start with domain tests (`src/domain`), then stores (`src/stores`), then components (`src/components`).
- BDD: high‑level behavioral scenarios validating user flows via UI interactions.

## State & Domain

- Stores in `src/stores` use selectors to minimize re‑renders and delegate rules to `src/domain`.
- Examples:
  - Scoreboard: `addPointWithSetLogic` applies set rules (25+ points and ≥2‑point lead).
  - Team setup: name validation (non‑empty, distinct), with friendly error messages.

## Quality & Conventions

- Lint/format: `pnpm lint`, `pnpm format:check`, `pnpm format:write`
- Local CI helpers: `pnpm ci:quality`, `pnpm ci:test`

## Limitations

This is a learning PoC. It is not production‑hardened (accessibility, i18n, performance, and CI/CD may require further work).

## License

[MIT](./LICENSE)
