# React TDD & BDD Showcase: Volleyball Scoreboard

## Abstract

This project serves as a comprehensive case study and reference implementation for applying **Test-Driven Development (TDD)** and **Behavior-Driven Development (BDD)** methodologies within a modern React application.

The core objective is to demonstrate how to decouple business logic from UI concerns using **Clean Architecture** principles, ensuring that the domain rules are testable, maintainable, and independent of the view layer. The chosen domain for this case study is a Volleyball Scoreboard, offering sufficient complexity (set logic, tie-breaks, victory conditions) to validate the architectural approach.

## Architectural Overview

The application follows a layered architecture to enforce separation of concerns:

1.  **Domain Layer** (`src/domain`):
    -   Contains pure TypeScript functions representing business rules.
    -   Framework-agnostic and side-effect free.
    -   Tested extensively via Unit Tests.

2.  **Application Layer** (`src/stores`):
    -   Manages application state using **Zustand**.
    -   Acts as the glue between the UI and Domain layers.
    -   Handles state transitions by delegating logic to the Domain layer.

3.  **Presentation Layer** (`src/components`):
    -   React components responsible solely for rendering UI and triggering actions.
    -   Minimizes logic within components to enhance testability.

## Methodologies Applied

### Behavior-Driven Development (BDD)

We utilize **Cucumber.js** to define high-level requirements in Gherkin syntax (`.feature` files). This ensures that the software behavior aligns with business requirements before implementation begins.

-   **Specs**: Located in `tests/features/`.
-   **Execution**: Scenarios drive the implementation of the UI and integration flows.

### Test-Driven Development (TDD)

The development lifecycle follows the "Red-Green-Refactor" cycle:

1.  **Unit Tests**: Written for Domain functions using **Vitest**.
2.  **Component Tests**: Written for React components using **React Testing Library**.
3.  **Refactoring**: Continuous code improvement while maintaining test green state.

## Tech Stack

-   **Runtime**: Node.js 20+
-   **Framework**: React 19, Vite 7
-   **Language**: TypeScript 5
-   **State Management**: Zustand
-   **Testing**:
    -   Vitest (Unit/Component)
    -   Cucumber.js (BDD/E2E)
    -   React Testing Library
-   **Styling**: Tailwind CSS 4

## Project Structure

```text
├── src/
│   ├── domain/       # Pure business logic
│   ├── stores/       # State management (Zustand)
│   ├── components/   # React UI components
│   └── main.tsx      # Entry point
├── tests/
│   ├── unit/         # Unit and Component tests
│   ├── features/     # Gherkin feature files (BDD)
│   └── steps/        # Cucumber step definitions
└── package.json
```

## Getting Started

### Prerequisites

-   Node.js 20 or higher
-   pnpm (recommended)

### Installation

```bash
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

### Testing

This project emphasizes quality assurance through multiple testing layers:

-   **Run Unit & Component Tests (TDD)**:
    ```bash
    pnpm test
    ```

-   **Run BDD Scenarios**:
    ```bash
    pnpm test:bdd
    ```

-   **Run All CI Checks**:
    ```bash
    pnpm ci:all
    ```

## Quality Assurance

Code quality is enforced via strict linting and formatting rules:

-   **Linting**: `pnpm lint` (ESLint)
-   **Formatting**: `pnpm format:check` (Prettier)

## License

This project is open-source and available under the [MIT License](./LICENSE).
