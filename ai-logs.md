# AI-LOGS

## How AI was used in this project?

This file includes prompts sent to the AI and the AI's full responses, in chronological order with context of situation.

## Why AI was used in this project?

AI was used as a technical mentor and to support me in step-by-step implementation.

I used AI to discuss the project structure, design component and API, reviews, solve problems and describe technical decisions in a clearer way.

All AI work was reviewed and integrated manually. The final implementation decisions were made based on the project requirements, code behavior and my understanding of component architecture.

## Content

- [1. Project architecture setup](#1-project-architecture-setup)
  - [Prompt 1.1:](#prompt-11) setup AI giving the role, context and try to create an architecture idea
  - [Prompt 1.2:](#prompt-12) inform about my architecture, ask for config fles for Husky, eslint, prettier
  - [Prompt 1.3:](#prompt-13) ask about fix husky, prettier and eslint errors
- [2. Project server and API](#2-project-server-and-api)
  - [Prompt 2.1:](#prompt-21) ask about API designing ideas and recommendations
  - [Prompt 2.2:](#prompt-22) ask about how can I turn my designs into code
  - [Prompt 2.3:](#prompt-23) ask for help with items.service.ts
  - [Prompt 2.4:](#prompt-24) fix router
  - [Prompt 2.5:](#prompt-25) ask about next steps
  - [Prompt 2.6:](#prompt-26) ask about make husky more friendly, remove pre-push
- [3. Small frontend API service](#3-small-frontend-api-service)
  - [Prompt 3.1:](#prompt-31) ask about design and implement itemsApi.ts step by step
  - [Prompt 3.2:](#prompt-32) ask about env variable vs hardcoded API URL
  - [Prompt 3.3:](#prompt-33) ask about test App.tsx
- [4. Creating component](#4-creating-component)
  - [Prompt 4.1:](#prompt-41) ask about next steps after API service works - component implementation order
  - [Prompt 4.2:](#prompt-42) extract logic into useMultiSelectCombobox hook
  - [Prompt 4.3:](#prompt-43) ask about next steps
  - [Prompt 4.4:](#prompt-44) move into next steps: open/close state + keyboard navigation
  - [Prompt 4.5:](#prompt-45) ask about dynamic item creation
- [5. Code review](#5-code-review)
  - [Prompt 5.1:](#prompt-51) ask AI to review component class names, ARIA, accessibility
  - [Prompt 5.2:](#prompt-52) send component snippets for review
  - [Prompt 5.3:](#prompt-53) fix error handling - show create errors under component
- [6. Creating documentation](#6-documentation-stage)
  - [Prompt 6.1:](#prompt-61) ask how to describe project architecture in README
  - [Prompt 6.2:](#prompt-62) ask about professional documentation sections
  - [Prompt 6.3:](#prompt-63) ask about API-First aproach section
  - [Prompt 6.4:](#prompt-64) ask about generic data model, controlled component pattern, state management strategy sectiions
  - [Prompt 6.5:](#prompt-65) ask about keyboard interaction section
  - [Prompt 6.6:](#prompt-66) ask about Accessibility Strategy section
  - [Prompt 6.7:](#prompt-67) ask about Inline Autocomplete Behavior section
  - [Prompt 6.8:](#prompt-68) ask about Architecture Decisions section

### 1. Project architecture setup

**Context:** Before writing any code, I wanted to create clean, scalable monorepo structure. I try to follow coding best practices, so I want to add husky, prettier and eslint. I used it in other project and it's really helpfull with code cleaning.

#### Prompt 1.1:

```text
Multiselect combobox component with autocomplete.
Role: You are Senior Frontend Architect with knowledge about best practices in React, TypeScript and clean architecture. You are a mentor. Don't be fast, we will do everything step-by-step.
Context: I am building a Multi-Select Autocomplete Combobox component. I need to design full project architecture, add coding checks like husky, eslint, prettier. Keep in mind that this is a recruitment project, so the solution should look professional, but not over-engineered.

Technical requirements:
-Frontend: React (Vite), TypeScript, css or Tailwind CSS
-Backend: minimal express server using local JSON file as a mock dataset
-Strict rule: ZERO external UI/autocomplete libraries (no react-select, no Material-UI, no Vanilla, ...). Everything from scratch.
-Architecture role: I want a strict separation of concerns.
-API-first approach: it is important to create good props, callbacks and types

Functional requirements:
-Component should accept predefined list of items to choose from
-Component should allow creating new item dynamicalyy if there is no item on suggestion list
-Component should be generic - works also for addreses, users, categories, not only for tags
-Keys"up", "down" and "enter" should work while using navigation and pick result
-selected items should be visible within the component
-we can remove selected items from the list
-Quality: Solution must respect WAI-ARIA accessibility guideliness for a Combobox and TypeScript interfaces.

PROVIDE ONLY high-level architecture:
-separe /frontend and /api in clean folder structure,
-describe me your decisions step by step,
-don't create code without my permission,
-show me the way I should use your ideas in my project and how to do it

FIRST TASK:
Before writing any code, help me design the project properly.
1. create a short list of requirements.
2. propose an architecture idea for the project, including project folder structure, component structure, separation between UI, logic, types and hooks, place for demo data and documentation.
3. create implementation plan divided into clear stages for project.
4. suggest a clean setup for Husky, ESLint and Prettier, but do not implement it yet

```

**Full AI response:**

````text
Below is a **high-level project design only** — no code yet.

# 1. Short list of requirements

## Functional requirements

1. Component accepts a predefined list of selectable items.
2. Component supports autocomplete filtering.
3. User can create a new item if no matching suggestion exists.
4. Component is generic, so it can work with tags, users, addresses, categories, etc.
5. Keyboard support:

   * `ArrowDown` moves to next suggestion,
   * `ArrowUp` moves to previous suggestion,
   * `Enter` selects highlighted suggestion or creates a new item.
6. Selected items are displayed inside the component.
7. Selected items can be removed.
8. Component follows WAI-ARIA combobox accessibility rules.

## Technical requirements

1. React + Vite + TypeScript.
2. CSS or Tailwind CSS.
3. Minimal Express API.
4. Local JSON file as mock dataset.
5. No external UI/autocomplete libraries.
6. API-first component design: clean props, callbacks, types.
7. Clear separation of UI, state logic, types, hooks, services and documentation.
8. Professional setup with ESLint, Prettier, Husky, possibly lint-staged.

---

# 2. Architecture idea

The project should be split into two main parts:

project-root/
├── frontend/
├── api/
├── README.md
├── .gitignore
└── docs/

This is clean for recruitment because the reviewer immediately sees that the frontend and backend are separated.

# 2.1 Root folder

project-root/
├── frontend/
├── api/
├── docs/
│   ├── architecture.md
│   ├── component-api.md
│   ├── accessibility.md
│   └── decisions.md
├── README.md
└── .gitignore

## Why this is good

The root should explain the whole project, but not contain too much application logic.

The `docs/` folder is valuable for a recruitment project because it shows that you can explain your architecture, not only write code.

Suggested documentation:

| File               | Purpose                                                                   |
| ------------------ | ------------------------------------------------------------------------- |
| `architecture.md`  | explains frontend/api split and main design decisions                     |
| `component-api.md` | documents props, callbacks and generic types                              |
| `accessibility.md` | explains WAI-ARIA combobox behavior                                       |
| `decisions.md`     | short notes: why no external UI library, why custom hook, why generic API |

---

# 2.2 Frontend structure

Suggested structure:

frontend/
├── public/
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── components/
│   │   └── MultiSelectCombobox/
│   │       ├── MultiSelectCombobox.tsx
│   │       ├── MultiSelectCombobox.types.ts
│   │       ├── MultiSelectCombobox.styles.css
│   │       ├── components/
│   │       │   ├── SelectedItem.tsx
│   │       │   ├── SuggestionList.tsx
│   │       │   ├── SuggestionItem.tsx
│   │       │   └── ComboboxInput.tsx
│   │       ├── hooks/
│   │       │   ├── useComboboxState.ts
│   │       │   ├── useComboboxKeyboard.ts
│   │       │   └── useFilteredOptions.ts
│   │       └── utils/
│   │           ├── defaultFilter.ts
│   │           └── itemIdentity.ts
│   │
│   ├── features/
│   │   └── demo/
│   │       ├── DemoPage.tsx
│   │       ├── demoData.ts
│   │       └── examples/
│   │           ├── TagsExample.tsx
│   │           ├── UsersExample.tsx
│   │           └── AddressesExample.tsx
│   │
│   ├── services/
│   │   ├── apiClient.ts
│   │   └── itemsService.ts
│   │
│   ├── types/
│   │   └── common.ts
│   │
│   └── styles/
│       └── global.css
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md

---

# 2.3 Component structure

The core component should be isolated here:

```text
components/MultiSelectCombobox/
```

This is the most important part of the project.

The component should not know whether it displays tags, users, addresses or categories. It should only know that every item can be identified and displayed.

Conceptually, the component API should support:

```text
items
selectedItems
onChange
onCreateItem
getItemLabel
getItemValue
placeholder
disabled
loading
allowCreate
```

No implementation yet — just the design direction.

## Important architectural decision

Do not hardcode fields like:

```text
item.name
item.id
item.label
```

Instead, expose functions such as:

```text
getItemLabel
getItemValue
```

This makes the component generic.

For example:

| Data type | Label                  |
| --------- | ---------------------- |
| tag       | tag name               |
| user      | first name + last name |
| address   | city + street          |
| category  | category name          |

The combobox component should not care about the object shape.

---

# 2.4 Separation between UI and logic

The main component should mostly compose smaller parts.

Recommended separation:

| Part                           | Responsibility                                   |
| ------------------------------ | ------------------------------------------------ |
| `MultiSelectCombobox.tsx`      | public component, connects everything            |
| `MultiSelectCombobox.types.ts` | public TypeScript API                            |
| `useComboboxState.ts`          | open/close state, input value, highlighted index |
| `useComboboxKeyboard.ts`       | ArrowUp, ArrowDown, Enter, Escape behavior       |
| `useFilteredOptions.ts`        | filtering available options                      |
| `SelectedItem.tsx`             | visual chip/tag for selected item                |
| `SuggestionList.tsx`           | listbox wrapper                                  |
| `SuggestionItem.tsx`           | single option                                    |
| `ComboboxInput.tsx`            | input element with ARIA attributes               |
| `defaultFilter.ts`             | default filtering logic                          |
| `itemIdentity.ts`              | comparison logic using item value                |

This is clean architecture without being too complicated.

---

# 2.5 API/backend structure

The backend should be intentionally minimal.

```text
api/
├── src/
│   ├── data/
│   │   ├── tags.json
│   │   ├── users.json
│   │   └── addresses.json
│   │
│   ├── routes/
│   │   └── items.routes.ts
│   │
│   ├── controllers/
│   │   └── items.controller.ts
│   │
│   ├── services/
│   │   └── items.service.ts
│   │
│   ├── types/
│   │   └── item.types.ts
│   │
│   └── server.ts
│
├── package.json
└── README.md
```

## Backend idea

The API should not be the main star of the project. It only supports the frontend demo.

Suggested endpoints:

| Endpoint               | Purpose                               |
| ---------------------- | ------------------------------------- |
| `GET /items/tags`      | returns predefined tags               |
| `GET /items/users`     | returns users                         |
| `GET /items/addresses` | returns addresses                     |
| `POST /items/custom`   | mock endpoint for creating a new item |

The backend can read from local JSON files. No database is needed.

---

# 2.6 Demo data

You should show that the component is generic by preparing at least 3 examples:

```text
features/demo/examples/
├── TagsExample.tsx
├── UsersExample.tsx
└── AddressesExample.tsx
```

This is very important for recruitment.

The reviewer should immediately see:

1. It works for simple strings/tags.
2. It works for objects like users.
3. It works for more complex objects like addresses.

That proves the generic API design.

---

# 2.7 Accessibility decisions

The component should follow combobox/listbox semantics.

At high level, you will need:

| Element                     | Accessibility role                |
| --------------------------- | --------------------------------- |
| input wrapper/input         | combobox behavior                 |
| suggestions container       | listbox                           |
| suggestion item             | option                            |
| selected item remove button | accessible button                 |
| active suggestion           | controlled with highlighted index |

Important accessibility behavior:

1. Input should have a clear accessible label.
2. Suggestions should be connected to the input.
3. Highlighted option should be announced by screen readers.
4. Remove buttons should have labels like “Remove JavaScript”.
5. Keyboard navigation should work without mouse.
6. Escape should close the list.
7. Enter should select or create.
8. Focus should remain predictable after selecting/removing items.

---

# 3. Implementation plan divided into stages

## Stage 1 — Project setup

Goal: create clean base structure.

Tasks:

1. Create `frontend/` with Vite + React + TypeScript.
2. Create `api/` with minimal Express + TypeScript.
3. Add root `README.md`.
4. Add basic folder structure.
5. Decide CSS or Tailwind.

Recommendation: for this recruitment task, plain CSS modules or normal CSS may be enough. Tailwind is fine, but the component logic is more important than styling.

---

## Stage 2 — Component API design

Goal: design the component before implementation.

Tasks:

1. Define generic item type.
2. Define component props.
3. Define callback behavior:
   - `onChange`
   - `onCreateItem`
   - `onInputChange`, optional
   - `onOpenChange`, optional

4. Define how item identity works.
5. Define how item labels are displayed.
6. Write `docs/component-api.md`.

This stage is important because the task says: **API-first solution**.

---

## Stage 3 — Static UI

Goal: build the visual structure without advanced logic.

Tasks:

1. Input field.
2. Selected item chips.
3. Remove buttons.
4. Suggestion dropdown.
5. Empty state.
6. “Create new item” row.

At this stage keyboard logic can still be simple.

---

## Stage 4 — Core state logic

Goal: move logic out of UI.

Tasks:

1. Create hook for input value.
2. Create hook for open/closed state.
3. Create highlighted index state.
4. Create filtering logic.
5. Prevent already selected items from appearing again.
6. Handle selection and removal.

The UI should call logic, not contain too much logic itself.

---

## Stage 5 — Keyboard navigation

Goal: make it usable without mouse.

Tasks:

1. ArrowDown highlights next option.
2. ArrowUp highlights previous option.
3. Enter selects highlighted option.
4. Enter creates new item when no result exists.
5. Escape closes the dropdown.
6. Backspace optionally removes last selected item when input is empty.

This stage should be tested carefully.

---

## Stage 6 — Accessibility

Goal: make the component professional.

Tasks:

1. Add correct ARIA attributes.
2. Add accessible labels.
3. Add keyboard-only flow.
4. Add screen-reader-friendly remove buttons.
5. Make focus management predictable.
6. Document accessibility choices in `docs/accessibility.md`.

This is a strong recruitment point.

---

## Stage 7 — API integration

Goal: connect frontend with mock backend.

Tasks:

1. Create JSON files for tags, users and addresses.
2. Create simple Express routes.
3. Fetch data in demo examples.
4. Show loading state.
5. Show error state.
6. Keep component independent from API.

Important: the component should not fetch data by itself. The parent/demo page should fetch data and pass it into the component.

That keeps the component reusable.

---

## Stage 8 — Examples and documentation

Goal: make the project easy to review.

Tasks:

1. Add `TagsExample`.
2. Add `UsersExample`.
3. Add `AddressesExample`.
4. Add screenshots or short GIF later.
5. Write clear README:
   - how to install,
   - how to run frontend,
   - how to run API,
   - what the component supports,
   - what design decisions were made.

---

## Stage 9 — Quality checks

Goal: prepare project for recruitment.

Tasks:

1. Add ESLint.
2. Add Prettier.
3. Add Husky.
4. Add lint-staged.
5. Add scripts:
   - lint,
   - format,
   - format check,
   - typecheck.

6. Add optional simple tests later.

---

# 4. Clean setup idea for Husky, ESLint and Prettier

Do not mix their responsibilities.

## ESLint

ESLint should check code quality.

It should be responsible for:

1. React rules.
2. TypeScript rules.
3. Hooks rules.
4. Accessibility rules.
5. Unused variables.
6. Bad imports or bad patterns.

Possible useful ESLint areas:

```text
typescript
react
react-hooks
jsx-a11y
```

For this project, `jsx-a11y` is especially valuable because accessibility is part of the requirements.

---

## Prettier

Prettier should only format code.

It should be responsible for:

1. indentation,
2. semicolons,
3. quotes,
4. line width,
5. consistent formatting.

Prettier should not decide architecture or code quality.

---

## Husky

Husky should not format code by itself.

Husky should only run checks before Git actions.

Recommended idea:

```text
pre-commit:
  run lint-staged

pre-push:
  run typecheck
  run lint
```

This means:

| Tool        | Responsibility                      |
| ----------- | ----------------------------------- |
| ESLint      | code correctness and rules          |
| Prettier    | formatting                          |
| Husky       | runs checks at Git commit/push time |
| lint-staged | runs checks only on changed files   |

---

## Clean workflow

Recommended workflow:

1. During development:
   - you write code normally,
   - your editor formats on save using Prettier.

2. Before commit:
   - Husky runs lint-staged,
   - lint-staged formats staged files,
   - ESLint checks staged files.

3. Before push:
   - TypeScript typecheck runs,
   - full lint can run.

This looks professional and is not over-engineered.

---

# Recommended final architecture direction

Use this structure:

```text
project-root/
├── frontend/
│   └── src/
│       ├── app/
│       ├── components/
│       │   └── MultiSelectCombobox/
│       ├── features/
│       │   └── demo/
│       ├── services/
│       ├── types/
│       └── styles/
│
├── api/
│   └── src/
│       ├── data/
│       ├── routes/
│       ├── controllers/
│       ├── services/
│       ├── types/
│       └── server.ts
│
└── docs/
    ├── architecture.md
    ├── component-api.md
    ├── accessibility.md
    └── decisions.md
```

This gives you a clean, professional recruitment project: separated frontend/backend, generic component API, accessible UI, custom logic from scratch, and quality checks without unnecessary complexity.

````

#### Prompt 1.2:

```text
I decided to avoid overkilling on backend. backend is only a small mock API for local JSON dataset, I dont want to use a full routes/controllers/services structure. I changed it to a lighter structure with:
-data for local JSON file,
-routes for API endpoints,
-services for filtering/searching/creating logic,
-types for TypeScript types,
-server.ts for Express setup.

I also simplified the frontend for now and kept the default Vite structure.

Now I want to move to tooling setup. Configure Husky, ESLint, Prettier and lint-staged properly, but explain everything step by step.
-Husky should only run Git hooks,
-lint-staged should run commands only on staged files,
-Prettier should only format code,
-ESLint should check code quality, TypeScript and React rules.

Do not start implementing the combobox component yet. Tooling first. I have initialized the project and installed the basic tooling/dependencies using npm/npx.

```

**Full AI response:**

````text
Your backend simplification is a good decision. For this recruitment project, the backend should support the component, not dominate the architecture.

Now I would set up tooling **from the project root**, not separately inside `frontend` and `api`.

Target idea:

```txt
project-root/
├── frontend/
├── api/
├── .husky/
├── eslint.config.js
├── prettier.config.cjs
├── .prettierignore
├── lint-staged.config.cjs
└── package.json
```

ESLint currently uses the flat config approach, TypeScript ESLint has a dedicated flat-config quickstart, Prettier recommends local project installation/configuration, Husky uses Git hook files, and lint-staged is designed to run commands only on staged files. ([eslint.org][1])

---

# Step 1 — Decide responsibility of each tool

Use this mental model:

| Tool        | Responsibility                                               |
| ----------- | ------------------------------------------------------------ |
| Husky       | runs Git hooks only                                          |
| lint-staged | runs commands only on staged files                           |
| Prettier    | formats code                                                 |
| ESLint      | checks code quality, React, TypeScript, hooks, accessibility |
| TypeScript  | checks types globally                                        |

Important rule: **do not make ESLint responsible for formatting**. Use `eslint-config-prettier` only to disable ESLint rules that conflict with Prettier. ([GitHub][2])

Avoid this:

```txt
eslint-plugin-prettier
```

For your project, it is cleaner to keep Prettier and ESLint separate.

---

# Step 2 — Install/check dependencies

Since you said you already installed the basic tooling, just compare with this list.

At root level, you should have something close to:

```bash
npm install -D eslint @eslint/js typescript-eslint globals
npm install -D prettier eslint-config-prettier
npm install -D husky lint-staged
npm install -D eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-jsx-a11y
```

Why these packages:

| Package                       | Why                                  |
| ----------------------------- | ------------------------------------ |
| `eslint`                      | main linting engine                  |
| `@eslint/js`                  | recommended JS rules                 |
| `typescript-eslint`           | TypeScript-aware linting             |
| `globals`                     | browser/node globals                 |
| `prettier`                    | formatting                           |
| `eslint-config-prettier`      | disables ESLint formatting conflicts |
| `husky`                       | Git hooks                            |
| `lint-staged`                 | staged-file checks                   |
| `eslint-plugin-react`         | React-specific rules                 |
| `eslint-plugin-react-hooks`   | hook rules                           |
| `eslint-plugin-react-refresh` | useful for Vite React                |
| `eslint-plugin-jsx-a11y`      | accessibility rules                  |

---

# Step 3 — Root `package.json` scripts

In root `package.json`, add scripts like this:

```json
{
  "scripts": {
    "prepare": "husky",
    "lint": "eslint frontend api",
    "lint:fix": "eslint frontend api --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "npm run typecheck --prefix frontend && npm run typecheck --prefix api",
    "pre-commit": "lint-staged",
    "pre-push": "npm run typecheck && npm run lint"
  }
}
```

Explanation:

1. `prepare` installs Husky hooks after `npm install`.
2. `lint` checks both frontend and API.
3. `lint:fix` fixes safe ESLint issues.
4. `format` formats the whole repo.
5. `format:check` checks formatting without changing files.
6. `typecheck` checks frontend and API TypeScript projects.
7. `pre-commit` runs lint-staged.
8. `pre-push` runs slower full-project checks.

The important decision: **lint-staged runs before commit, full typecheck runs before push**.

This is better because TypeScript checking usually needs the whole project context, not only staged files.

---

# Step 4 — Add typecheck scripts inside `frontend` and `api`

In `frontend/package.json`:

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit"
  }
}
```

If your Vite project uses project references, you can use:

```json
{
  "scripts": {
    "typecheck": "tsc -b --noEmit"
  }
}
```

In `api/package.json`:

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit"
  }
}
```

Why?

The root script:

```bash
npm run typecheck
```

will call:

```bash
frontend -> tsc --noEmit
api -> tsc --noEmit
```

So the whole project gets checked without generating compiled files.

---

# Step 5 — Prettier config

Create in root:

```txt
prettier.config.cjs
```

Recommended simple config:

```js
module.exports = {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  tabWidth: 2,
};
```

This keeps formatting predictable and professional.

Also add:

```txt
.prettierignore
```

Example:

```txt
node_modules
dist
build
coverage
.vite
.env
package-lock.json
```

Explanation:

1. Do not format generated folders.
2. Do not format dependencies.
3. Do not touch lock files automatically.
4. Keep Prettier focused on source/config/docs files.

---

# Step 6 — ESLint flat config

Create in root:

```txt
eslint.config.js
```

Use this as the base idea:

```js
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/coverage/**', '**/.vite/**'],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['frontend/**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,

      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/prop-types': 'off',
    },
  },

  {
    files: ['api/**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2022,
      },
    },
  },

  prettier,
);
```

Important decisions here:

1. `frontend` gets browser globals and React rules.
2. `api` gets Node globals.
3. React accessibility rules are included because your component must respect WAI-ARIA.
4. `prettier` is last, so it disables conflicting formatting rules.
5. `react/prop-types` is off because TypeScript handles props typing.

---

# Step 7 — lint-staged config

Create in root:

```txt
lint-staged.config.cjs
```

Recommended config:

```js
module.exports = {
  '*.{ts,tsx,js,jsx}': ['eslint --fix', 'prettier --write'],
  '*.{json,css,md}': ['prettier --write'],
};
```

Explanation:

1. For TypeScript/JavaScript files:
   - ESLint fixes safe issues,
   - Prettier formats.

2. For JSON/CSS/Markdown:
   - only Prettier is needed.

3. lint-staged only touches staged files, so commits stay fast.

Do not put `tsc --noEmit` here.

Why?

Because `tsc` checks project-level type relationships. Running it against only staged files is unreliable. Keep it in `pre-push` or CI.

---

# Step 8 — Husky setup

Run once from root:

```bash
npx husky init
```

This should create:

```txt
.husky/pre-commit
```

Husky documentation recommends `husky init`, which creates a pre-commit hook and updates the `prepare` script. ([typicode.github.io][3])

Now edit `.husky/pre-commit` to:

```bash
npm run pre-commit
```

Then create:

```txt
.husky/pre-push
```

with:

```bash
npm run pre-push
```

Your hooks are now clean:

```txt
Husky
└── pre-commit -> npm run pre-commit -> lint-staged
└── pre-push   -> npm run pre-push   -> typecheck + lint
```

This satisfies your rule: **Husky only runs Git hooks**.

---

# Step 9 — Recommended workflow

During normal development:

```bash
npm run format
npm run lint
npm run typecheck
```

Before commit, automatically:

```txt
pre-commit:
  lint-staged
```

Before push, automatically:

```txt
pre-push:
  typecheck + full lint
```

So your workflow becomes:

```bash
git add .
git commit -m "chore: configure tooling"
git push
```

Expected behavior:

1. On commit:
   - only staged files are checked/formatted.

2. On push:
   - full TypeScript check runs.
   - full ESLint check runs.

---

# Step 10 — Test if everything works

After configuration, run:

```bash
npm run format:check
npm run lint
npm run typecheck
```

Then test Git hooks:

```bash
git add .
git commit -m "chore: setup project tooling"
```

If something fails, do not bypass hooks immediately. First check whether the error comes from:

| Error source | What to check                            |
| ------------ | ---------------------------------------- |
| ESLint       | `eslint.config.js`                       |
| Prettier     | `prettier.config.cjs`                    |
| TypeScript   | `tsconfig.json` in frontend/api          |
| Husky        | `.husky/pre-commit` or `.husky/pre-push` |
| lint-staged  | `lint-staged.config.cjs`                 |

---

# Final recommended tooling flow

Use this setup:

```txt
Prettier:
  formatting only

ESLint:
  TypeScript + React + Hooks + Accessibility rules

lint-staged:
  staged files only

Husky:
  pre-commit -> lint-staged
  pre-push -> typecheck + lint
```

This is professional, clean, and not over-engineered. It also matches your project well because the component will need strong TypeScript typing, keyboard behavior and accessibility checks later.

[1]: https://eslint.org/docs/latest/use/getting-started?utm_source=chatgpt.com 'Getting Started with ESLint'
[2]: https://github.com/prettier/eslint-config-prettier?utm_source=chatgpt.com 'eslint-config-prettier'
[3]: https://typicode.github.io/husky/get-started.html?utm_source=chatgpt.com 'Get started | Husky'

```

````

#### Prompt 1.3:

```text
First look at my .eslint.config.mjs in root:

import js from '@eslint/js';
import globals from 'globals';
import typescript from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
    {
        ignores: ['node_modules', 'dist', '.vite'],
    },

    {
        languageOptions: {
            ecmaVersion: 'latest',
            globals: globals.browser,
        },
    },
    eslintConfigPrettier,
    );

My package.json:
{
    "name": "multi-select-combobox-component",
    "version": "1.0.0",
    "private": true,
    "scripts": {
        "prepare": "husky",
        "lint": "eslint frontend api",
        "lint:fix": "eslint frontend api --fix",
        "format": "prettier --write .",
        "format:check": "prettier --check .",
        "typecheck": "npm run typecheck --prefix frontend && npm run typecheck --prefix api",
        "pre-commit": "lint-staged",
        "pre-push": "npm run typecheck && npm run lint"
    },
    "lint-staged": {
        "_.{ts,tsx,js,jsx}": [
            "eslint --fix",
            "prettier --write"
        ],
    "_.{json,css,md}": [
        "prettier --write"
        ]
    },
}

my .prettierrc:
{
    "singleQuote": true,
    "semi": true,
    "trailingComma": "all",
    "printWidth": 100,
    "tabWidth": 2
}

husky pre-commit:
npm test
npx lint-staged

What should I change to create stable tooling? Now my .md files are getting worse.
```

**Full AI response:**

````text
You are close, but right now your setup has a few unstable parts. I would fix it in this order.

# 1. Rename ESLint config file

Your file is named:

```txt
.eslint.config.mjs
```

Change it to:

```txt
eslint.config.mjs
```

ESLint expects the flat config file to be named `eslint.config.js`, `eslint.config.mjs`, `eslint.config.cjs`, etc., without the leading dot. ([eslint.org][1])

Use:

```bash
git mv .eslint.config.mjs eslint.config.mjs
```

---

# 2. Fix ESLint config

Your current config has these problems:

```js
import typescript from '@typescript-eslint/eslint-plugin';
```

but later you use:

```js
tseslint.config(...)
```

`tseslint` is not imported, so this config will fail.

You also imported:

```js
import prettier from 'eslint-config-prettier';
```

but later you use:

```js
eslintConfigPrettier;
```

That variable also does not exist.

Use this instead:

```js
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.vite/**', '**/coverage/**'],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['frontend/**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,

      'react/prop-types': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },

  {
    files: ['api/**/*.{ts,js}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2022,
      },
    },
  },

  prettier,
);
```

Main idea: frontend gets browser + React rules, API gets Node rules. The `typescript-eslint` package provides the flat config helper and recommended TypeScript config. ([typescript-eslint.io][2])

---

# 3. Fix root `package.json`

Your `lint-staged` patterns are wrong:

```json
"_.{ts,tsx,js,jsx}"
```

This should be:

```json
"*.{ts,tsx,js,jsx}"
```

Also remove the trailing comma after `lint-staged`, because JSON does not allow trailing commas.

Use this:

```json
{
  "name": "multi-select-combobox-component",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "prepare": "husky",
    "lint": "eslint \"frontend/**/*.{ts,tsx,js,jsx}\" \"api/**/*.{ts,js}\"",
    "lint:fix": "eslint \"frontend/**/*.{ts,tsx,js,jsx}\" \"api/**/*.{ts,js}\" --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "npm run typecheck --prefix frontend && npm run typecheck --prefix api",
    "pre-commit": "lint-staged",
    "pre-push": "npm run typecheck && npm run lint"
  },
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
    "*.{json,css}": ["prettier --write"]
  }
}
```

I removed `md` from `lint-staged` intentionally. Since your Markdown files are getting worse, do not auto-format them on every commit. `lint-staged` should run commands only against staged files matched by glob patterns, so the patterns need to be correct. ([GitHub][3])

---

# 4. Fix Prettier for Markdown

Your `.prettierrc` is mostly fine, but add this:

```json
{
  "singleQuote": true,
  "semi": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "proseWrap": "never"
}
```

`proseWrap: "never"` prevents Prettier from aggressively wrapping Markdown text. This should stop README/docs from becoming ugly when you run `npm run format`. Prettier documents `proseWrap` as the option controlling Markdown text wrapping. ([prettier.io][4])

Also add `.prettierignore` in root:

```txt
node_modules
dist
build
coverage
.vite

frontend/dist
api/dist

package-lock.json
```

Do not ignore all `.md` files yet. With `proseWrap: "never"` they should be safer.

---

# 5. Fix Husky pre-commit

Your current hook:

```bash
npm test
npx lint-staged
```

Change it to:

```bash
npm run pre-commit
```

Why?

1. You probably do not have tests yet, so `npm test` may fail.
2. Husky should only trigger the hook.
3. The actual logic should stay in `package.json`.
4. You do not need `npx lint-staged` because you already have `"pre-commit": "lint-staged"`.

So `.husky/pre-commit` should be:

```bash
npm run pre-commit
```

Create `.husky/pre-push`:

```bash
npm run pre-push
```

Husky’s role is just to run Git hook scripts; `husky init` creates the hook folder and updates the `prepare` script. ([typicode.github.io][5])

---

# 6. Final stable flow

After changes, your flow will be:

```txt
git commit
→ Husky pre-commit
→ npm run pre-commit
→ lint-staged
→ ESLint + Prettier only on staged code files
```

and:

```txt
git push
→ Husky pre-push
→ npm run typecheck
→ npm run lint
```

This gives you clean separation:

| Tool        | Responsibility                                 |
| ----------- | ---------------------------------------------- |
| Husky       | starts Git hooks                               |
| lint-staged | checks only staged files                       |
| Prettier    | formats code                                   |
| ESLint      | checks TypeScript, React, hooks, accessibility |
| TypeScript  | checks full project types                      |

---

# 7. Test it

Run in root:

```bash
npm run format:check
npm run lint
npm run typecheck
```

Then test hook:

```bash
git add .
git commit -m "chore: setup tooling"
```

If Markdown still changes badly after `npm run format`, then the next step would be to ignore selected docs, for example:

```txt
docs/**/*.md
```

in `.prettierignore`. But first try `proseWrap: "never"` and removing `md` from `lint-staged`.

[1]: https://eslint.org/docs/latest/use/configure/configuration-files?utm_source=chatgpt.com 'Configuration Files - ESLint - Pluggable JavaScript Linter'
[2]: https://typescript-eslint.io/packages/typescript-eslint?utm_source=chatgpt.com 'typescript-eslint'
[3]: https://github.com/lint-staged/lint-staged?utm_source=chatgpt.com 'lint-staged/lint-staged: 🚫💩 — Run tasks like formatters and ...'
[4]: https://prettier.io/docs/options?utm_source=chatgpt.com 'Options - Prettier'
[5]: https://typicode.github.io/husky/get-started.html?utm_source=chatgpt.com 'Get started | Husky'

```

````

### 2. Project Server and API

**Context:** I used AI to design and implement a small mock API. The goal was to keep the backend simple, typed and useful for demonstrating fetching, filtering and creating items.

#### Prompt 2.1:

```text
Now we will work with api and server. remember about API-first solution. Design of the API: props, callbacks will be evaluated.
```

**Full AI response:**

````text
Start with the **contract**, not with Express code.

Because the requirement says:

> API-first solution. Design of the API: props, callbacks will be evaluated.

This means the most important “API” is not only your backend HTTP API. It is mainly the **public API of your React component**: props, callbacks, generic types, and behavior.

So first you should define two contracts:

```txt
1. Component API contract
2. Mock backend API contract
```

Do this before writing server logic.

---

# Step 1 — Define what the component will receive

Your combobox should **not fetch data by itself**.

Bad direction:

```txt
MultiSelectCombobox fetches /items internally
```

Good direction:

```txt
Parent/demo page fetches data from API
Parent passes items to MultiSelectCombobox
MultiSelectCombobox stays reusable
```

So the future flow should be:

```txt
api JSON data
   ↓
frontend service fetches data
   ↓
demo page stores data
   ↓
MultiSelectCombobox receives data through props
```

This is important because the component must work for:

```txt
tags
users
addresses
categories
anything else
```

---

# Step 2 — Define the future component API

Before server implementation, write down what props the component will need.

Conceptually:

```txt
MultiSelectCombobox<TItem>
```

The component should be generic, so it should not assume that every item has `id`, `name`, or `label`.

The public API should include ideas like:

```txt
items
selectedItems
onChange
getItemLabel
getItemValue
onCreateItem
allowCreate
placeholder
disabled
loading
ariaLabel
```

Meaning:

| Prop            | Responsibility                       |
| --------------- | ------------------------------------ |
| `items`         | all available options                |
| `selectedItems` | currently selected options           |
| `onChange`      | returns updated selected items       |
| `getItemLabel`  | tells component how to display item  |
| `getItemValue`  | tells component how to identify item |
| `onCreateItem`  | creates item from user input         |
| `allowCreate`   | enables/disables dynamic creation    |
| `loading`       | allows parent to show loading state  |
| `ariaLabel`     | accessibility label                  |

This is what “API-first” means in this project.

---

# Step 3 — Define backend purpose

Your backend should stay small.

Its job is only:

```txt
return mock items
search/filter mock items
optionally create a new mock item
```

It should not know anything about React state, selected items, keyboard navigation, ARIA, or component behavior.

Good backend responsibilities:

```txt
GET items
filter items by query
create mock item
return JSON response
```

Bad backend responsibilities:

```txt
manage selected items
handle combobox state
know about highlighted index
know about keyboard behavior
```

---

# Step 4 — Choose simple backend endpoints

For a lightweight mock API, I would use:

```txt
GET /health
GET /items/:collection
GET /items/:collection?search=abc
POST /items/:collection
```

Example collections:

```txt
tags
users
addresses
categories
```

So later your frontend demo can call:

```txt
GET /items/tags
GET /items/users
GET /items/addresses
```

With search:

```txt
GET /items/tags?search=react
GET /items/users?search=anna
GET /items/addresses?search=warsaw
```

And create:

```txt
POST /items/tags
POST /items/users
POST /items/addresses
```

This is simple, but still professional.

---

# Step 5 — Decide JSON data shape

Since your component is generic, the backend can return different item shapes.

Example idea:

```txt
tags:
  id
  name

users:
  id
  firstName
  lastName
  email

addresses:
  id
  city
  street
  postalCode
```

This is actually good for recruitment, because it proves that your component does not depend on one fixed object shape.

Then in frontend examples you will map them like this conceptually:

```txt
TagsExample:
  getItemLabel = tag.name

UsersExample:
  getItemLabel = user.firstName + user.lastName

AddressesExample:
  getItemLabel = address.city + address.street
```

This proves generic design.

---

# Step 6 — Keep your current API folder structure

Your lighter backend structure is enough:

```txt
api/
├── data/
│   └── items.json
├── routes/
│   └── items.routes.ts
├── services/
│   └── items.service.ts
├── types/
│   └── item.types.ts
└── server.ts
```

Responsibilities:

| File                        | Responsibility                            |
| --------------------------- | ----------------------------------------- |
| `server.ts`                 | Express setup, middleware, route mounting |
| `routes/items.routes.ts`    | HTTP endpoints                            |
| `services/items.service.ts` | filtering/searching/creating logic        |
| `types/item.types.ts`       | TypeScript types                          |
| `data/items.json`           | mock dataset                              |

This is clean and not over-engineered.

---

# What you should do first now

Do this first:

## 1. Create short contract notes

Add or update:

```txt
docs/component-api.md
docs/mock-api.md
```

In `component-api.md`, describe future props and callbacks.

In `mock-api.md`, describe backend endpoints.

You do not need full implementation yet. Just define the design.

---

## 2. Decide the collections

For your demo, I recommend:

```txt
tags
users
addresses
```

Because they show that the component is generic.

---

## 3. Prepare the mock JSON dataset

Prepare local data with different structures:

```txt
tags: simple objects
users: person-like objects
addresses: location-like objects
```

This is better than using only tags, because the reviewer will immediately see that the combobox is reusable.

---

## 4. Then implement server in this order

After the contract is clear:

```txt
1. server.ts
2. item.types.ts
3. items.service.ts
4. items.routes.ts
5. test endpoints manually
```

Do not start the combobox yet.

---

# Recommended next action

Your next concrete task should be:

```txt
Define the mock API contract and dataset shape.
```

So before coding Express logic, write down:

```txt
GET /health
GET /items/:collection
GET /items/:collection?search=
POST /items/:collection
```

and decide what `tags`, `users`, and `addresses` look like in `items.json`.

That will make the backend simple and will support the future API-first component design.
````

#### Prompt 2.2:

```text
I created component-api.md and mock-api.md files. The component contract defines the public API of the generic MultiSelectCombobox. The mock API contract defines endpoints you suggested. I also prepared the initial dataset shape with three collections: tags, users and addresses. The goal is to prove that the component is generic and does not depend on one fixed object structure. What I should do now?
```

**Full AI response:**

````text

Good. Now you should implement the **mock API first**, but still only as support for the future component.

Your docs are correct: the component does not fetch data itself, and the backend only returns, filters and creates mock items.

# What to do now

## 1. Implement API types first

Start with:

```txt
api/types/item.types.ts
```

Define types for:

```txt
Tag
User
Address
CollectionName
MockDatabase
```

Why first? Because routes and services should use shared types, not random `any`.

---

## 2. Prepare `items.json`

Your dataset should follow the contract:

```txt
api/data/items.json
```

Structure:

```txt
{
  "tags": [],
  "users": [],
  "addresses": []
}
```

Each collection should have different shape, exactly like in your contract: `Tag`, `User`, `Address`.

---

## 3. Implement service logic

Then create logic in:

```txt
api/services/items.service.ts
```

It should handle:

```txt
getItems(collection)
searchItems(collection, search)
createItem(collection, payload)
```

Important: filtering should be generic enough for different item shapes. For now, simple approach:

```txt
convert object values to string
check if any value includes search phrase
```

Example logic idea:

```txt
User search "anna" can match firstName, lastName or email
Address search "warsaw" can match city or street
Tag search "react" can match name
```

---

## 4. Implement routes

Then:

```txt
api/routes/items.routes.ts
```

Routes according to your `mock-api.md`:

```txt
GET /items/:collection
POST /items/:collection
```

`GET /items/:collection?search=value` should be handled inside the same GET route.

---

## 5. Implement `server.ts`

Finally connect Express:

```txt
GET /health
/items routes
JSON middleware
CORS if frontend runs on another port
```

Do not add controllers. Your simplified structure is enough.

---

# Recommended order

Do exactly this:

```txt
1. item.types.ts
2. items.json
3. items.service.ts
4. items.routes.ts
5. server.ts
6. test in browser/Postman
```

Test endpoints:

```txt
GET http://localhost:5000/health
GET http://localhost:5000/items/tags
GET http://localhost:5000/items/tags?search=react
GET http://localhost:5000/items/users?search=anna
GET http://localhost:5000/items/addresses?search=warsaw
POST http://localhost:5000/items/tags
```

Next step: send me your current `api/` files, and I’ll help you implement them cleanly without touching the combobox yet.


````

#### Prompt 2.3

```text
I need help with items.service.ts. This is my item.types.ts file:

// This file defines TypeScript types for items in the mock data collections.

export type Tag = {
    id: string;
    name: string;
};

export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
};

export type Address = {
    id: string;
    city: string;
    street: string;
    postalCode: string;
};

export type CollectionName = 'tags' | 'users' | 'addresses';

export type CollectionItemMap = {
    tags: Tag;
    users: User;
    addresses: Address;
};

export type MockData = {
    [K in CollectionName]: CollectionItemMap[K][];
};

export type MockItem = Tag | User | Address;
```

**AI Full response:**

````text

Your `item.types.ts` is good. Now `items.service.ts` should be small and focused: validate collection, return items, search items, create items.

Use this version:

```ts
import data from '../data/items.json' with { type: 'json' };
import type { CollectionItemMap, CollectionName, MockData } from '../types/item.types';

const mockData = data as MockData;

export function isCollectionName(value: string): value is CollectionName {
  return value === 'tags' || value === 'users' || value === 'addresses';
}

export function getItems<K extends CollectionName>(collection: K): CollectionItemMap[K][] {
  return mockData[collection];
}

export function searchItems<K extends CollectionName>(
  collection: K,
  search: string,
): CollectionItemMap[K][] {
  const normalizedSearch = search.trim().toLowerCase();

  if (!normalizedSearch) {
    return getItems(collection);
  }

  return getItems(collection).filter((item) => {
    return Object.values(item).some((value) =>
      String(value).toLowerCase().includes(normalizedSearch),
    );
  });
}

export function createItem<K extends CollectionName>(
  collection: K,
  item: CollectionItemMap[K],
): CollectionItemMap[K] {
  mockData[collection].push(item);

  return item;
}
```

Important: this creates the item only **in memory**. After server restart, the JSON file goes back to original state. That is fine for a mock API.

If your TypeScript complains about:

```ts
import data from '../data/items.json' with { type: 'json' };
```

replace it with:

```ts
import data from '../data/items.json';
```

and make sure `api/tsconfig.json` has:

```json
"resolveJsonModule": true,
"esModuleInterop": true
```

Next file should be `items.routes.ts`, because routes will use `isCollectionName`, `searchItems`, `getItems`, and `createItem`.


````

#### Prompt 2.4

```text
Is my router ok?
```

**Full AI response:**

````text
Yes, your router is **mostly OK** and fits the lightweight mock API idea.

I would only improve 3 things.

# 1. Current version is acceptable

This part is good:

```ts
if (!isCollectionName(collection)) {
  return res.status(404).json({
    message: `Collection "${collection}" does not exist.`,
  });
}
```

Good because you validate `req.params.collection` before passing it into typed service functions.

This is also good:

```ts
const items = search ? searchItems(collection, search) : getItems(collection);
```

It keeps search logic outside the route.

---

# 2. Small issue: `req.body` is unvalidated

This line works:

```ts
const newItem = createItem(collection, req.body);
```

but TypeScript cannot truly know that `req.body` has correct shape.

For a mock API, this is acceptable, but for recruitment I would at least mention that this is intentionally lightweight.

Better version later:

```ts
const newItem = createItem(collection, req.body);
```

is okay only if `createItem()` validates required fields.

So validation should live in:

```txt
items.service.ts
```

not in the router.

---

# 3. I would slightly clean `search`

Instead of:

```ts
const search = String(req.query.search ?? '');
```

use:

```ts
const search = typeof req.query.search === 'string' ? req.query.search : '';
```

Why? Because if someone sends:

```txt
?search=a&search=b
```

Express can give an array. Your current `String(...)` would turn it into something weird like:

```txt
a,b
```

Not critical, but cleaner.

---

# Recommended final router

```ts
import { Router } from 'express';

import { createItem, getItems, isCollectionName, searchItems } from '../services/items.service';

const router = Router();

router.get('/:collection', (req, res) => {
  const { collection } = req.params;
  const search = typeof req.query.search === 'string' ? req.query.search : '';

  if (!isCollectionName(collection)) {
    return res.status(404).json({
      message: `Collection "${collection}" does not exist.`,
    });
  }

  const items = search.trim() ? searchItems(collection, search) : getItems(collection);

  return res.json(items);
});

router.post('/:collection', (req, res) => {
  const { collection } = req.params;

  if (!isCollectionName(collection)) {
    return res.status(404).json({
      message: `Collection "${collection}" does not exist.`,
    });
  }

  try {
    const newItem = createItem(collection, req.body);

    return res.status(201).json(newItem);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : 'Invalid request body.',
    });
  }
});

export default router;
```

# What to do next

Now improve `createItem()` in `items.service.ts`, so it checks that:

```txt
tags need: id, name
users need: id, firstName, lastName, email
addresses need: id, city, street, postalCode
```

The router should stay thin. The service should protect the mock dataset.
````

#### Prompt 2.5:

```text
I tested everything in Postman and it works. What next? Should I add something new in server.ts?
```

**Full AI response:**

````text
Yes — add only **small production-like basics**, not more architecture.

Your `server.ts` should have:

```txt
1. express.json()
2. CORS
3. /health
4. /items router
5. fallback 404
6. central error handler
7. app.listen()
```

Recommended `server.ts` shape:

```ts
import cors from 'cors';
import express from 'express';

import itemsRouter from './routes/items.routes';

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/items', itemsRouter);

app.use((_req, res) => {
  res.status(404).json({
    message: 'Endpoint not found.',
  });
});

app.use(
  (
    error: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(error);

    res.status(500).json({
      message: 'Internal server error.',
    });
  },
);

app.listen(PORT, () => {
  console.log(`API server is running on http://localhost:${PORT}`);
});
```

Also install CORS if you don’t have it:

```bash
npm install cors
npm install -D @types/cors
```

Next after this: create a small frontend API service, e.g. `frontend/src/services/itemsApi.ts`, but still do **not** implement the combobox yet. It will be the bridge between mock API and future demo page.
````

#### Prompt 2.6:

```text
Before next steps, I want to remove husky or make it easier because now it shows errors with tsconfig.json while server runs properly.
```

**Full AI response:**

````text
I would **make Husky easier**, not remove it completely.

Your server can run while `typecheck` fails because `tsx` runs the app, but TypeScript checks the whole config. So Husky is exposing config problems, not server runtime problems.

Use this simpler setup:

# 1. Keep only pre-commit

Remove `.husky/pre-push`.

In `.husky/pre-commit`, keep only:

```bash
npm run lint-staged
```

or if your script is named `pre-commit`:

```bash
npm run pre-commit
```

# 2. Remove typecheck from Git hooks

In root `package.json`, remove this from hooks:

```json
"pre-push": "npm run typecheck && npm run lint"
```

Keep typecheck manual:

```json
"typecheck": "npm run typecheck --prefix frontend && npm run typecheck --prefix api"
```

# 3. Keep lint-staged light

In root `package.json`:

```json
"lint-staged": {
  "*.{ts,tsx,js,jsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{json,css}": [
    "prettier --write"
  ]
}
```

Do **not** run `tsc` in Husky for now.

# 4. Your workflow becomes

Before commit, automatic:

```txt
eslint --fix + prettier only on staged files
```

Manual when you want to check everything:

```bash
npm run lint
npm run typecheck
npm run format:check
```

This is still professional, but it will not block every commit because of temporary `tsconfig` issues.

If you want the simplest option: remove Husky entirely and just run `npm run lint` + `npm run typecheck` manually before pushing.
````

### 3. Small frontend API service

**Context:** I used AI to separate API communication from React components. This helped me create a small service layer responsible for fetching and creating items and keep the future combobox component reusable and independent from backend logic.

#### Prompt 3.1

```text
Now I want to move to the next stage: creating a small frontend API service.
Dont implement the combobox component yet.
The goal of this stage is to create a clean bridge between the mock backend API and the future demo page.

Please guide me step by step through designing and implementing this service.

The service should:
1. fetch items from the mock API,
2. support different collections: tags, users and addresses,
3. support optional search query,
4. support creating a new item,
5. use TypeScript types instead of any,
6. keep API logic outside React components,
7. be simple, but still professional.

Please also explain:
- what frontend types should be created,
- whether frontend should reuse similar types as backend or define its own types,
- how to handle API base URL, for example with Vite env variable,
- how to handle basic errors,
- whether to use fetch or axios and why,
- what functions should be exported from itemsApi.ts.

frontend dir includes:
-src: assets, services dirs and app.tsx, main.tsx, index.css, app.css
-index.html and config files

remember about our architecture.

```

**Full AI response:**

````text
Yes. Since your frontend currently has `src/services`, use that folder now:

```txt
frontend/src/
├─ services/
│  └─ itemsApi.ts
├─ types/
│  └─ item.types.ts
├─ App.tsx
├─ main.tsx
```

Do **not** create the combobox yet.

# 1. Create frontend types

Create:

```txt
frontend/src/types/item.types.ts
```

```ts
export type Tag = {
  id: string;
  name: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type Address = {
  id: string;
  city: string;
  street: string;
  postalCode: string;
};

export type CollectionName = 'tags' | 'users' | 'addresses';

export type CollectionItemMap = {
  tags: Tag;
  users: User;
  addresses: Address;
};

export type CollectionItem<TCollection extends CollectionName> =
  CollectionItemMap[TCollection];

export type CreateItemPayload<TCollection extends CollectionName> =
  CollectionItemMap[TCollection];
```

For now, keep `id` required because your backend currently validates `id`.

Should frontend reuse backend types? **No.** Keep separate frontend types. The shapes are similar, but frontend and backend should not depend on each other directly.

# 2. Add API base URL

Create:

```txt
frontend/.env
```

```env
VITE_API_BASE_URL=http://localhost:5000
```

Also create:

```txt
frontend/.env.example
```

```env
VITE_API_BASE_URL=http://localhost:5000
```

Vite exposes env variables only when they start with `VITE_`.

# 3. Update Vite env typing

In:

```txt
frontend/src/vite-env.d.ts
```

use:

```ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

# 4. Use `fetch`, not axios

Use native `fetch`.

Why:

```txt
- no extra dependency,
- enough for simple GET/POST,
- good for recruitment because it shows you understand browser APIs,
- axios would be unnecessary here.
```

# 5. Create frontend API service

Create:

```txt
frontend/src/services/itemsApi.ts
```

```ts
import type {
  CollectionItem,
  CollectionName,
  CreateItemPayload,
} from '../types/item.types';

type ApiErrorResponse = {
  message?: string;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function requestJson<TResponse>(
  endpoint: string,
  options?: RequestInit,
): Promise<TResponse> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const errorBody = (await response.json()) as ApiErrorResponse;

      if (errorBody.message) {
        message = errorBody.message;
      }
    } catch {
      // Keep default message if response body is not valid JSON.
    }

    throw new Error(message);
  }

  return response.json() as Promise<TResponse>;
}

export async function fetchItems<TCollection extends CollectionName>(
  collection: TCollection,
  search?: string,
): Promise<CollectionItem<TCollection>[]> {
  const params = new URLSearchParams();

  if (search?.trim()) {
    params.set('search', search.trim());
  }

  const queryString = params.toString();
  const endpoint = queryString
    ? `/items/${collection}?${queryString}`
    : `/items/${collection}`;

  return requestJson<CollectionItem<TCollection>[]>(endpoint);
}

export async function createItem<TCollection extends CollectionName>(
  collection: TCollection,
  item: CreateItemPayload<TCollection>,
): Promise<CollectionItem<TCollection>> {
  return requestJson<CollectionItem<TCollection>>(`/items/${collection}`, {
    method: 'POST',
    body: JSON.stringify(item),
  });
}
```

# 6. What should be exported?

Export only:

```ts
fetchItems
createItem
```

Keep this private:

```ts
requestJson
```

Why? React components should use domain-level functions, not low-level HTTP helpers.

# 7. How this will be used later

Later, the demo page can do:

```ts
const tags = await fetchItems('tags');

const filteredUsers = await fetchItems('users', 'anna');

const newTag = await createItem('tags', {
  id: 'tag-100',
  name: 'Accessibility',
});
```

This creates clean separation:

```txt
React component/demo page
↓
frontend/src/services/itemsApi.ts
↓
Express mock API
↓
local JSON dataset
```

# 8. Test this stage without combobox

For now, test it temporarily in `App.tsx` with a button or `useEffect`, only to verify service works. After testing, you can remove that temporary code.

Next proper stage after this: create a small `DemoPage` that fetches and displays raw tags/users/addresses. Still no combobox.

````

#### Prompt 3.2:

```text
why to use env if I have package.json and when i run it it starting api and frontend?
```

**Full AI response:**

````text
Because `package.json` starts the apps, but it does **not** tell frontend code what backend URL to call.

These are separate things:

```txt
package.json script
→ starts frontend and API

VITE_API_BASE_URL
→ tells browser frontend where API is
```

Example:

```json
"dev": "concurrently \"npm run dev --prefix api\" \"npm run dev --prefix frontend\""
```

This starts both servers, but inside `itemsApi.ts` you still need:

```ts
fetch('http://localhost:5000/items/tags')
```

Instead of hardcoding that, use:

```ts
fetch(`${import.meta.env.VITE_API_BASE_URL}/items/tags`)
```

# Why env is better

Because later URLs can change:

```txt
local:       http://localhost:5000
deployment: https://my-api.onrender.com
different port: http://localhost:3001
```

Then you change only:

```env
VITE_API_BASE_URL=http://localhost:5000
```

not every file with `fetch`.

# But for your project

You have two acceptable options.

## Option 1 — Professional

Use `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Best for recruitment.

## Option 2 — Simpler

Hardcode temporarily:

```ts
const API_BASE_URL = 'http://localhost:5000';
```

Acceptable for a small mock API, but less flexible.

My recommendation: use `.env`, because it is only one small file and looks more professional.

````

#### Prompt 3.3:

```text
Now let's test stage in App.tsx to verify if service works.
```

**Full AI response:**

````text
Good. This should be **temporary test code only**.

In `frontend/src/App.tsx`, replace current content with:

```tsx
import { useEffect, useState } from 'react';

import { createItem, fetchItems } from './services/itemsApi';
import type { Address, Tag, User } from './types/item.types';

import './App.css';

function App() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function loadData() {
      try {
        setError('');

        const [tagsData, usersData, addressesData] = await Promise.all([
          fetchItems('tags'),
          fetchItems('users'),
          fetchItems('addresses'),
        ]);

        setTags(tagsData);
        setUsers(usersData);
        setAddresses(addressesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong.');
      }
    }

    loadData();
  }, []);

  async function handleCreateTag() {
    try {
      setError('');

      const newTag = await createItem('tags', {
        id: `tag-${Date.now()}`,
        name: 'Accessibility',
      });

      setTags((currentTags) => [...currentTags, newTag]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create tag.');
    }
  }

  return (
    <main>
      <h1>API service test</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="button" onClick={handleCreateTag}>
        Create test tag
      </button>

      <section>
        <h2>Tags</h2>
        <pre>{JSON.stringify(tags, null, 2)}</pre>
      </section>

      <section>
        <h2>Users</h2>
        <pre>{JSON.stringify(users, null, 2)}</pre>
      </section>

      <section>
        <h2>Addresses</h2>
        <pre>{JSON.stringify(addresses, null, 2)}</pre>
      </section>
    </main>
  );
}

export default App;
```

Then run both apps:

```bash
npm run dev --prefix api
```

and in another terminal:

```bash
npm run dev --prefix frontend
```

Expected result:

```txt
- page loads tags, users and addresses
- button creates new tag
- new tag appears under Tags
```

If you get a CORS error, make sure `api/src/server.ts` has:

```ts
import cors from 'cors';

app.use(cors());
```

After test passes, we will remove this temporary test from `App.tsx` and create a cleaner demo structure.

````

### 4. Creating component

**Context:** I used AI as a mentor while implementing the main `MultiSelectCombobox` component step by step. The focus was on building the component in a structured way: first the public API, then state logic, keyboard support, dynamic item creation and UI behavior.

#### Prompt 4.1

It works. What with our component?

**Full AI response:**

````text
Great. Now we move to the component, but still **step by step**.

Next order:

```txt
1. Create component folder
2. Define component public types
3. Build static UI
4. Add state hook
5. Add filtering
6. Add keyboard navigation
7. Add create item
8. Add ARIA accessibility
9. Connect demo data
```

Do **not** start with logic. Start with API/types.

# 1. Create folder

```txt
frontend/src/components/ui/MultiSelectCombobox/
├─ MultiSelectCombobox.tsx
├─ MultiSelectCombobox.types.ts
├─ useMultiSelectCombobox.ts
└─ MultiSelectCombobox.css
```

# 2. First file: `MultiSelectCombobox.types.ts`

Create only this now:

```ts
export type MultiSelectComboboxProps<TItem> = {
  items: TItem[];
  selectedItems: TItem[];
  onChange: (selectedItems: TItem[]) => void;

  getItemLabel: (item: TItem) => string;
  getItemValue: (item: TItem) => string;

  onCreateItem?: (inputValue: string) => TItem | Promise<TItem>;

  placeholder?: string;
  ariaLabel: string;

  disabled?: boolean;
  loading?: boolean;
  maxSelected?: number;
};
```

This is your public component API. This is the most important part for recruitment.

# 3. Why this API is good

```txt
items
```

Available options.

```txt
selectedItems
```

Controlled state from parent.

```txt
onChange
```

Parent receives new selected list.

```txt
getItemLabel
```

Component knows how to display item.

```txt
getItemValue
```

Component knows how to compare items.

```txt
onCreateItem
```

Allows dynamic creation without hardcoding backend logic.

The component still does **not** know what a tag/user/address is.

# 4. Next after this

After you create `MultiSelectCombobox.types.ts`, we should create the **static component skeleton** in `MultiSelectCombobox.tsx`.

No filtering, no keyboard, no ARIA yet — only visual structure:

```txt
selected chips
input
suggestion list
create option row
remove buttons
```

Start with the types file first.

Create this folder:

```txt
frontend/src/components/ui/MultiSelectCombobox/
├─ MultiSelectCombobox.tsx
├─ MultiSelectCombobox.types.ts
└─ MultiSelectCombobox.css
```

# 1. `MultiSelectCombobox.types.ts`

```ts
export type MultiSelectComboboxProps<TItem> = {
  items: TItem[];
  selectedItems: TItem[];
  onChange: (selectedItems: TItem[]) => void;

  getItemLabel: (item: TItem) => string;
  getItemValue: (item: TItem) => string;

  onCreateItem?: (inputValue: string) => TItem | Promise<TItem>;

  placeholder?: string;
  ariaLabel: string;

  disabled?: boolean;
  loading?: boolean;
  maxSelected?: number;
};
```

# 2. `MultiSelectCombobox.tsx`

```tsx
import { useState } from 'react';

import type { MultiSelectComboboxProps } from './MultiSelectCombobox.types';

import './MultiSelectCombobox.css';

export function MultiSelectCombobox<TItem>({
  items,
  selectedItems,
  onChange,
  getItemLabel,
  getItemValue,
  placeholder = 'Search...',
  ariaLabel,
  disabled = false,
  loading = false,
  maxSelected,
}: MultiSelectComboboxProps<TItem>) {
  const [inputValue, setInputValue] = useState('');

  const selectedValues = new Set(selectedItems.map(getItemValue));

  const availableItems = items.filter((item) => !selectedValues.has(getItemValue(item)));

  const filteredItems = availableItems.filter((item) =>
    getItemLabel(item).toLowerCase().includes(inputValue.trim().toLowerCase()),
  );

  const canSelectMore = maxSelected === undefined || selectedItems.length < maxSelected;

  function handleSelectItem(item: TItem) {
    if (!canSelectMore) {
      return;
    }

    onChange([...selectedItems, item]);
    setInputValue('');
  }

  function handleRemoveItem(itemToRemove: TItem) {
    const valueToRemove = getItemValue(itemToRemove);

    onChange(selectedItems.filter((item) => getItemValue(item) !== valueToRemove));
  }

  return (
    <div className="multi-select-combobox">
      <div className="multi-select-combobox__control">
        {selectedItems.map((item) => (
          <span key={getItemValue(item)} className="multi-select-combobox__chip">
            {getItemLabel(item)}

            <button
              type="button"
              className="multi-select-combobox__remove-button"
              onClick={() => handleRemoveItem(item)}
              disabled={disabled}
              aria-label={`Remove ${getItemLabel(item)}`}
            >
              ×
            </button>
          </span>
        ))}

        <input
          className="multi-select-combobox__input"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder={placeholder}
          aria-label={ariaLabel}
          disabled={disabled || loading || !canSelectMore}
        />
      </div>

      {loading && <p className="multi-select-combobox__status">Loading...</p>}

      {!loading && inputValue && (
        <ul className="multi-select-combobox__list">
          {filteredItems.map((item) => (
            <li key={getItemValue(item)}>
              <button
                type="button"
                className="multi-select-combobox__option"
                onClick={() => handleSelectItem(item)}
                disabled={disabled || !canSelectMore}
              >
                {getItemLabel(item)}
              </button>
            </li>
          ))}

          {filteredItems.length === 0 && (
            <li className="multi-select-combobox__empty">No results found.</li>
          )}
        </ul>
      )}
    </div>
  );
}
```

# 3. `MultiSelectCombobox.css`

```css
.multi-select-combobox {
  width: 100%;
  max-width: 520px;
}

.multi-select-combobox__control {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  min-height: 44px;
  padding: 8px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
}

.multi-select-combobox__chip {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  padding: 4px 8px;
  border-radius: 999px;
  background: #e2e8f0;
  font-size: 14px;
}

.multi-select-combobox__remove-button {
  border: 0;
  background: transparent;
  cursor: pointer;
  font-size: 16px;
}

.multi-select-combobox__input {
  flex: 1;
  min-width: 120px;
  border: 0;
  outline: none;
  font-size: 14px;
}

.multi-select-combobox__status {
  margin-top: 8px;
  font-size: 14px;
}

.multi-select-combobox__list {
  margin: 6px 0 0;
  padding: 4px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  list-style: none;
}

.multi-select-combobox__option {
  width: 100%;
  padding: 8px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  text-align: left;
}

.multi-select-combobox__option:hover {
  background: #f1f5f9;
}

.multi-select-combobox__empty {
  padding: 8px;
  color: #64748b;
  font-size: 14px;
}
```

# 4. Temporary test in `App.tsx`

Use tags first:

```tsx
import { useEffect, useState } from 'react';

import { MultiSelectCombobox } from './components/ui/MultiSelectCombobox/MultiSelectCombobox';
import { fetchItems } from './services/itemsApi';
import type { Tag } from './types/item.types';

import './App.css';

function App() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  useEffect(() => {
    async function loadTags() {
      const data = await fetchItems('tags');
      setTags(data);
    }

    loadTags();
  }, []);

  return (
    <main>
      <h1>MultiSelectCombobox test</h1>

      <MultiSelectCombobox<Tag>
        items={tags}
        selectedItems={selectedTags}
        onChange={setSelectedTags}
        getItemLabel={(tag) => tag.name}
        getItemValue={(tag) => tag.id}
        placeholder="Search tags..."
        ariaLabel="Select tags"
      />

      <h2>Selected tags</h2>
      <pre>{JSON.stringify(selectedTags, null, 2)}</pre>
    </main>
  );
}

export default App;
```

Now test:

```bash
npm run dev --prefix api
npm run dev --prefix frontend
```

At this point the component should:

```txt
- display input,
- filter tags,
- select tag by mouse,
- show selected chips,
- remove selected chips.
```

Next stage: move filtering and selection logic into `useMultiSelectCombobox.ts`, then add keyboard navigation.

````

#### Prompt 4.2

I created frontend/src/components/MultiSelectCombobox/ ├─ MultiSelectCombobox.tsx ├─ MultiSelectCombobox.types.ts ├─ useMultiSelectCombobox.ts └─ MultiSelectCombobox.css and everything works.

**Full AI response:**

````text
Perfect. Now you have the foundation:

```txt
Backend
✓ types
✓ service
✓ routes
✓ server
✓ Postman tested

Frontend
✓ types
✓ itemsApi
✓ service tested
✓ component folder created
✓ component public API defined
```

Now we should do something very important architecturally:

# Next stage: move logic out of component

Right now I gave you a version where filtering, selecting and removing were inside:

```txt
MultiSelectCombobox.tsx
```

For a recruitment project, I would not leave it there.

The goal of:

```txt
useMultiSelectCombobox.ts
```

is to move business logic outside UI.

---

# Before writing code, define responsibilities

## MultiSelectCombobox.tsx

Should mainly:

```txt
render UI
render chips
render input
render list
bind events
```

No complex logic.

---

## useMultiSelectCombobox.ts

Should handle:

```txt
input value
filtered items
selected values
select item
remove item
canSelectMore
```

Later:

```txt
highlighted index
keyboard navigation
open/close state
```

---

# Proposed hook API

Something like:

```ts
const {
  inputValue,
  setInputValue,

  filteredItems,

  handleSelectItem,
  handleRemoveItem,

  canSelectMore,
} = useMultiSelectCombobox(...)
```

Notice:

```txt
Component does not know HOW filtering works.
Component only renders data.
```

That is a very strong architectural point during recruitment reviews.

---

# Then after the hook

We add:

## Stage 1

Move:

```txt
filtering
selection
removal
```

to hook.

## Stage 2

Add:

```txt
isOpen
open list
close list
```

## Stage 3

Add:

```txt
ArrowDown
ArrowUp
Enter
Escape
```

## Stage 4

Add:

```txt
ARIA combobox
ARIA listbox
ARIA option
aria-activedescendant
```

This is where the component becomes interview-worthy.

---

# My recommendation

Do **not** jump to keyboard navigation yet.

Next commit should only be:

```txt
feat: extract combobox state into custom hook
```

Move all current filtering/select/remove logic from `MultiSelectCombobox.tsx` into `useMultiSelectCombobox.ts`.

That will give you a clean separation between:

```txt
Presentation layer
↓
MultiSelectCombobox.tsx

State/business logic layer
↓
useMultiSelectCombobox.ts
```

Now extract only logic into the hook.

# 1. `useMultiSelectCombobox.ts`

Put this inside:

```ts
import { useState } from 'react';

type UseMultiSelectComboboxParams<TItem> = {
  items: TItem[];
  selectedItems: TItem[];
  onChange: (selectedItems: TItem[]) => void;
  getItemLabel: (item: TItem) => string;
  getItemValue: (item: TItem) => string;
  maxSelected?: number;
};

export function useMultiSelectCombobox<TItem>({
  items,
  selectedItems,
  onChange,
  getItemLabel,
  getItemValue,
  maxSelected,
}: UseMultiSelectComboboxParams<TItem>) {
  const [inputValue, setInputValue] = useState('');

  const selectedValues = new Set(selectedItems.map(getItemValue));

  const availableItems = items.filter((item) => !selectedValues.has(getItemValue(item)));

  const filteredItems = availableItems.filter((item) =>
    getItemLabel(item).toLowerCase().includes(inputValue.trim().toLowerCase()),
  );

  const canSelectMore = maxSelected === undefined || selectedItems.length < maxSelected;

  function handleSelectItem(item: TItem) {
    if (!canSelectMore) {
      return;
    }

    onChange([...selectedItems, item]);
    setInputValue('');
  }

  function handleRemoveItem(itemToRemove: TItem) {
    const valueToRemove = getItemValue(itemToRemove);

    onChange(selectedItems.filter((item) => getItemValue(item) !== valueToRemove));
  }

  return {
    inputValue,
    setInputValue,
    filteredItems,
    canSelectMore,
    handleSelectItem,
    handleRemoveItem,
  };
}
```

# 2. Update `MultiSelectCombobox.tsx`

Remove:

```ts
import { useState } from 'react';
```

Add:

```ts
import { useMultiSelectCombobox } from './useMultiSelectCombobox';
```

Then replace the logic part with:

```ts
const {
  inputValue,
  setInputValue,
  filteredItems,
  canSelectMore,
  handleSelectItem,
  handleRemoveItem,
} = useMultiSelectCombobox({
  items,
  selectedItems,
  onChange,
  getItemLabel,
  getItemValue,
  maxSelected,
});
```

Full updated file:

```tsx
import type { MultiSelectComboboxProps } from './MultiSelectCombobox.types';
import { useMultiSelectCombobox } from './useMultiSelectCombobox';

import './MultiSelectCombobox.css';

export function MultiSelectCombobox<TItem>({
  items,
  selectedItems,
  onChange,
  getItemLabel,
  getItemValue,
  placeholder = 'Search...',
  ariaLabel,
  disabled = false,
  loading = false,
  maxSelected,
}: MultiSelectComboboxProps<TItem>) {
  const {
    inputValue,
    setInputValue,
    filteredItems,
    canSelectMore,
    handleSelectItem,
    handleRemoveItem,
  } = useMultiSelectCombobox({
    items,
    selectedItems,
    onChange,
    getItemLabel,
    getItemValue,
    maxSelected,
  });

  return (
    <div className="multi-select-combobox">
      <div className="multi-select-combobox__control">
        {selectedItems.map((item) => (
          <span key={getItemValue(item)} className="multi-select-combobox__chip">
            {getItemLabel(item)}

            <button
              type="button"
              className="multi-select-combobox__remove-button"
              onClick={() => handleRemoveItem(item)}
              disabled={disabled}
              aria-label={`Remove ${getItemLabel(item)}`}
            >
              ×
            </button>
          </span>
        ))}

        <input
          className="multi-select-combobox__input"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder={placeholder}
          aria-label={ariaLabel}
          disabled={disabled || loading || !canSelectMore}
        />
      </div>

      {loading && <p className="multi-select-combobox__status">Loading...</p>}

      {!loading && inputValue && (
        <ul className="multi-select-combobox__list">
          {filteredItems.map((item) => (
            <li key={getItemValue(item)}>
              <button
                type="button"
                className="multi-select-combobox__option"
                onClick={() => handleSelectItem(item)}
                disabled={disabled || !canSelectMore}
              >
                {getItemLabel(item)}
              </button>
            </li>
          ))}

          {filteredItems.length === 0 && (
            <li className="multi-select-combobox__empty">No results found.</li>
          )}
        </ul>
      )}
    </div>
  );
}
```

# 3. Test

Run:

```bash
npm run dev --prefix frontend
```

Expected: visually nothing changes. That is good.

This refactor should only change architecture, not behavior.


````

#### Prompt 4.3

```text
I move it to useMultiSelectCombobox.ts and everything works. Tested with npm run dev, nothing change as wanted.
My guess is that we should now add:
open/close dropdown state,
keyboard navigation with ArrowUp, ArrowDown and Enter,
Escape to close the list,
ARIA attributes for accessibility,
later: dynamic item creation.

Let's move next step.

```

**Full AI response:**

````text
Yes, your order is correct.

Do it in this sequence:

```txt
1. open/close state
2. keyboard navigation
3. ARIA attributes
4. dynamic item creation
```

Do **not** add everything at once.

# Next stage: open/close + keyboard

Now update only the hook first.

## Hook should add

```txt
isOpen
highlightedIndex
openDropdown()
closeDropdown()
handleInputChange()
handleKeyDown()
```

Keyboard behavior:

```txt
ArrowDown → open dropdown and move highlight down
ArrowUp   → move highlight up
Enter     → select highlighted item
Escape    → close dropdown
```

Important: `MultiSelectCombobox.tsx` should only pass events to the hook.

Recommended next step

Update `useMultiSelectCombobox.ts` first. Then update JSX.

Do not add ARIA yet in the same step. First make keyboard behavior work visually. Then we will add accessibility attributes cleanly.

````

#### Prompt 4.4

```text
Let's move into next step.
```

**Full AI response:**

````text
Good. Now add **open/close state + keyboard navigation**.

# 1. Replace `useMultiSelectCombobox.ts`

```ts
import { useState } from 'react';

type UseMultiSelectComboboxParams<TItem> = {
  items: TItem[];
  selectedItems: TItem[];
  onChange: (selectedItems: TItem[]) => void;
  getItemLabel: (item: TItem) => string;
  getItemValue: (item: TItem) => string;
  maxSelected?: number;
};

export function useMultiSelectCombobox<TItem>({
  items,
  selectedItems,
  onChange,
  getItemLabel,
  getItemValue,
  maxSelected,
}: UseMultiSelectComboboxParams<TItem>) {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const selectedValues = new Set(selectedItems.map(getItemValue));

  const availableItems = items.filter((item) => !selectedValues.has(getItemValue(item)));

  const filteredItems = availableItems.filter((item) =>
    getItemLabel(item).toLowerCase().includes(inputValue.trim().toLowerCase()),
  );

  const canSelectMore = maxSelected === undefined || selectedItems.length < maxSelected;

  function openDropdown() {
    if (canSelectMore) {
      setIsOpen(true);
    }
  }

  function closeDropdown() {
    setIsOpen(false);
    setHighlightedIndex(0);
  }

  function handleInputChange(value: string) {
    setInputValue(value);
    setHighlightedIndex(0);

    if (value.trim()) {
      openDropdown();
    } else {
      closeDropdown();
    }
  }

  function handleSelectItem(item: TItem) {
    if (!canSelectMore) {
      return;
    }

    onChange([...selectedItems, item]);
    setInputValue('');
    closeDropdown();
  }

  function handleRemoveItem(itemToRemove: TItem) {
    const valueToRemove = getItemValue(itemToRemove);

    onChange(selectedItems.filter((item) => getItemValue(item) !== valueToRemove));
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();

      if (!isOpen) {
        openDropdown();
        return;
      }

      setHighlightedIndex((currentIndex) => {
        if (filteredItems.length === 0) {
          return 0;
        }

        return currentIndex === filteredItems.length - 1 ? 0 : currentIndex + 1;
      });
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();

      setHighlightedIndex((currentIndex) => {
        if (filteredItems.length === 0) {
          return 0;
        }

        return currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1;
      });
    }

    if (event.key === 'Enter') {
      event.preventDefault();

      const highlightedItem = filteredItems[highlightedIndex];

      if (highlightedItem) {
        handleSelectItem(highlightedItem);
      }
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      closeDropdown();
    }
  }

  return {
    inputValue,
    isOpen,
    highlightedIndex,
    filteredItems,
    canSelectMore,
    handleInputChange,
    handleKeyDown,
    handleSelectItem,
    handleRemoveItem,
    openDropdown,
    closeDropdown,
  };
}
```

# 2. Update `MultiSelectCombobox.tsx`

Change hook destructuring:

```ts
const {
  inputValue,
  isOpen,
  highlightedIndex,
  filteredItems,
  canSelectMore,
  handleInputChange,
  handleKeyDown,
  handleSelectItem,
  handleRemoveItem,
  openDropdown,
} = useMultiSelectCombobox({
  items,
  selectedItems,
  onChange,
  getItemLabel,
  getItemValue,
  maxSelected,
});
```

Change input:

```tsx
<input
  className="multi-select-combobox__input"
  value={inputValue}
  onChange={(event) => handleInputChange(event.target.value)}
  onFocus={openDropdown}
  onKeyDown={handleKeyDown}
  placeholder={placeholder}
  aria-label={ariaLabel}
  disabled={disabled || loading || !canSelectMore}
/>
```

Change dropdown condition:

```tsx
{!loading && isOpen && inputValue && (
```

Change option class:

```tsx
{
  filteredItems.map((item, index) => (
    <li key={getItemValue(item)}>
      <button
        type="button"
        className={
          index === highlightedIndex
            ? 'multi-select-combobox__option multi-select-combobox__option--highlighted'
            : 'multi-select-combobox__option'
        }
        onClick={() => handleSelectItem(item)}
        disabled={disabled || !canSelectMore}
      >
        {getItemLabel(item)}
      </button>
    </li>
  ));
}
```

# 3. Add CSS for highlighted option

```css
.multi-select-combobox__option--highlighted {
  background: #e2e8f0;
}
```

# 4. Test

Expected behavior:

```txt
typing opens dropdown
ArrowDown moves highlight down
ArrowUp moves highlight up
Enter selects highlighted item
Escape closes dropdown
mouse selection still works
remove button still works
```

If this works, next step is ARIA attributes.
````

#### Prompt 4.5

```text
I added aria-labels and aria attributes. Now dynamic item creation.
```

**Full AI response:**

````text
Good. Dynamic creation should go through the existing prop:

```ts
onCreateItem?: (inputValue: string) => TItem | Promise<TItem>;
```

The component should **not** call `createItem()` from `itemsApi.ts` directly. Parent handles API; component only calls callback.

# 1. Update hook params

In `useMultiSelectCombobox.ts`, add:

```ts
onCreateItem?: (inputValue: string) => TItem | Promise<TItem>;
```

and pass it into the hook.

# 2. Add creation state in hook

Add:

```ts
const [isCreating, setIsCreating] = useState(false);

const normalizedInputValue = inputValue.trim();

const canCreateItem =
  Boolean(onCreateItem) &&
  normalizedInputValue.length > 0 &&
  filteredItems.length === 0 &&
  canSelectMore;
```

# 3. Add handler in hook

```ts
async function handleCreateItem() {
  if (!onCreateItem || !canCreateItem) {
    return;
  }

  try {
    setIsCreating(true);

    const createdItem = await onCreateItem(normalizedInputValue);

    onChange([...selectedItems, createdItem]);
    setInputValue('');
    closeDropdown();
  } finally {
    setIsCreating(false);
  }
}
```

# 4. Update Enter key

In `handleKeyDown`, change Enter logic to:

```ts
if (event.key === 'Enter') {
  event.preventDefault();

  const highlightedItem = filteredItems[highlightedIndex];

  if (highlightedItem) {
    handleSelectItem(highlightedItem);
    return;
  }

  if (canCreateItem) {
    handleCreateItem();
  }
}
```

# 5. Return new values from hook

Return:

```ts
canCreateItem,
isCreating,
handleCreateItem,
```

# 6. Update component JSX

In `MultiSelectCombobox.tsx`, destructure:

```ts
canCreateItem,
isCreating,
handleCreateItem,
```

Then under mapped items add:

```tsx
{canCreateItem && (
  <li>
    <button
      type="button"
      className="multi-select-combobox__option"
      onClick={handleCreateItem}
      disabled={disabled || isCreating}
    >
      {isCreating ? 'Creating...' : `Create "${inputValue.trim()}"`}
    </button>
  </li>
)}
```

# 7. Pass `onCreateItem` to hook

In component props include:

```ts
onCreateItem,
```

Then hook call:

```ts
onCreateItem,
```

# 8. Test in `App.tsx`

Example for tags:

```tsx
<MultiSelectCombobox<Tag>
  items={tags}
  selectedItems={selectedTags}
  onChange={setSelectedTags}
  getItemLabel={(tag) => tag.name}
  getItemValue={(tag) => tag.id}
  placeholder="Search tags..."
  ariaLabel="Select tags"
  onCreateItem={async (inputValue) => {
    const newTag = await createItem('tags', {
      id: `tag-${Date.now()}`,
      name: inputValue,
    });

    setTags((currentTags) => [...currentTags, newTag]);

    return newTag;
  }}
/>
```

Expected:

```txt
type unknown tag
dropdown shows Create "..."
click it or press Enter
new item is created via API
item appears as selected chip
item is added to local items state
```

This keeps the architecture clean:

```txt
MultiSelectCombobox
→ calls onCreateItem(inputValue)

App/demo page
→ calls API createItem()

itemsApi.ts
→ talks to backend
```
````

### 5. Code review

**Context:** I used AI to review the component implementation and identify improvements in class naming, accessibility, ARIA attributes and error handling. This stage helped me improve code quality and make the component more reliable before final documentation.

#### Prompt 5.1

```text

I think I ended my project. Now let's do code review. I want to focus on my component:
-class names
-aria labels
-web accessibility standards

I don't want to send you full code. Ask me full questions in one answer and I will give you examples.

```

**Full AI response:**

````text
Great. Send me **small snippets**, not full project. I’ll review them as architecture/accessibility/code-quality review.

Please answer these questions:

## 1. Component structure and class names

1. What is the final folder structure of your component?
2. Paste the JSX structure of `MultiSelectCombobox.tsx`, especially:

   * root wrapper,
   * control/input area,
   * selected item chips,
   * dropdown list,
   * option item,
   * create item row,
   * empty state.
3. Paste your `MultiSelectCombobox.css` class names only, or the full CSS if it is not too long.
4. Are you using one naming convention consistently, for example BEM like:

```txt
multi-select-combobox
multi-select-combobox__control
multi-select-combobox__option
multi-select-combobox__option--highlighted
```

5. Do any class names still use old names like `autocomplete`, `tag`, `selected-tag`, or `dropdown`?

## 2. Public component API

Paste your final `MultiSelectCombobox.types.ts`.

I want to check:

1. Are props generic?
2. Is `onCreateItem` typed correctly?
3. Are `ariaLabel`, `loading`, `disabled`, `maxSelected` included?
4. Are there unnecessary props?
5. Is the component still independent from tags/users/addresses?

## 3. ARIA and accessibility

Paste the JSX for these elements:

1. `<input />`
2. `<ul />` suggestion list
3. `<li />` option item
4. remove chip `<button />`
5. create item `<button />`

I want to check whether you have:

```txt
role="combobox"
aria-expanded
aria-controls
aria-activedescendant
aria-autocomplete
role="listbox"
role="option"
aria-selected
aria-label for remove buttons
status messages for loading/no results
```

Also answer:

1. Is `aria-controls` always present or only when the list exists?
2. Is `aria-activedescendant` undefined when no item is highlighted?
3. Are option IDs stable and unique?
4. Does the create row also have an ID if it can be highlighted?
5. Is the input label understandable without visible text?

## 4. Keyboard behavior

Paste your `handleKeyDown` function.

I want to verify:

1. `ArrowDown` opens dropdown and moves highlight.
2. `ArrowUp` moves highlight.
3. `Enter` selects highlighted option.
4. `Enter` creates item when no option exists.
5. `Escape` closes dropdown.
6. Keyboard behavior does not break when `filteredItems.length === 0`.
7. Highlighted index cannot point to a non-existing item.

## 5. Focus and mouse behavior

Answer these:

1. Does the dropdown open on input focus?
2. Does it close on Escape?
3. Does it close after selecting an item?
4. Does it close after creating an item?
5. Does it close after clicking outside?
6. If you do not have click-outside yet, do you want to add it or keep it simple?
7. Can user remove selected items using only keyboard?

## 6. Dynamic item creation

Paste the part where you render:

```txt
Create "..."
```

and paste `handleCreateItem`.

I want to check:

1. Does it use the original trimmed input, not lowercase input?
2. Does it prevent duplicate creation?
3. Does it handle async `onCreateItem` safely?
4. Does it show `Creating...` state?
5. Does it disable create while creating?

## 7. Visual accessibility CSS

Paste CSS for:

1. input focus,
2. option hover,
3. highlighted option,
4. disabled state,
5. chip remove button.

I want to check whether keyboard users can see focus clearly. This is important.

Start by sending me these 4 snippets first:

```txt
1. MultiSelectCombobox.types.ts
2. MultiSelectCombobox.tsx
3. useMultiSelectCombobox.ts
4. MultiSelectCombobox.css
```

Then I’ll review class names, ARIA, accessibility and suggest exact improvements.
````

#### Prompt 5.2

```text

My component is in frontend/src/components/MultiSelectCombobox: ts, tsx and css files. I created examples to show how it works and in App.tsx use it like <TagsExample />.

CSS class names:
multi-select-combobox
multi-select-combobox__control
multi-select-combobox__chip
multi-select-combobox__remove-button
multi-select-combobox__status
multi-select-combobox__list
multi-select-combobox__option
multi-select-combobox__option:hover
multi-select-combobox__empty
multi-select-combobox__option--highlighted
multi-select-combobox__input-wrapper
multi-select-combobox__inline-suggestion
multi-select-combobox__inline-completion
multi-select-combobox__input

MultiSelectCombobox.types.ts:
export type MultiSelectComboboxProps<TItem> = {
  items: TItem[];
  selectedItems: TItem[];
  onChange: (selectedItems: TItem[]) => void;

  getItemLabel: (item: TItem) => string;
  getItemValue: (item: TItem) => string;

  onCreateItem?: (inputValue: string) => TItem | Promise<TItem>;

  placeholder?: string;
  ariaLabel: string;

  disabled?: boolean;
  loading?: boolean;
  maxSelected?: number;
};

ARIA and accessibility:
<input
            className="multi-select-combobox__input"
            value={inputValue}
            onChange={(event) => handleInputChange(event.target.value)}
            onFocus={openDropdown}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            aria-label={ariaLabel}
            disabled={disabled || loading || !canSelectMore}
            role="combobox"
            autoComplete="off"
            aria-autocomplete="both"
            aria-expanded={isOpen}
            aria-controls={isOpen ? listboxId : undefined}
            aria-activedescendant={activeOptionId}
          />

<ul
          id={listboxId}
          role="listbox"
          aria-label={`${ariaLabel} suggestions`}
          className="multi-select-combobox__list"
        >

        <li
                id={optionId}
                key={getItemValue(item)}
                role="option"
                aria-selected={index === highlightedIndex}
              >

<button
                  type="button"
                  className={
                    index === highlightedIndex
                      ? 'multi-select-combobox__option multi-select-combobox__option--highlighted'
                      : 'multi-select-combobox__option'
                  }
                  onClick={() => handleSelectItem(item)}
                  disabled={disabled || !canSelectMore}
                >
                  {getItemLabel(item)}
                </button>


{canCreateItem && (
            <li role="option" aria-selected={false}>
              <button
                type="button"
                className="multi-select-combobox__option"
                onClick={handleCreateItem}
                disabled={disabled || isCreating}
              >
                {isCreating ? 'Creating...' : `Create "${inputValue.trim()}"`}
              </button>
            </li>
          )}


Does the dropdown open on input focus? No.
Does it close on Escape? Double Esc.
Does it close after selecting an item? Yes.
Does it close after creating an item? Yes.
Does it close after clicking outside? No.
If you do not have click-outside yet, do you want to add it or keep it simple? Keep simple.
Can user remove selected items using only keyboard? Not only keyboard.

Visual CSS: I will improve it so don't look at CSS.

```

**Full AI response:**

````text

Good, this is already a solid base. My review:

# 1. Class names

Your class names are consistent and professional. They follow a BEM-like structure:

```txt
multi-select-combobox
multi-select-combobox__control
multi-select-combobox__chip
multi-select-combobox__remove-button
multi-select-combobox__list
multi-select-combobox__option
multi-select-combobox__option--highlighted
```

This is good.

I would only check these two:

```txt
multi-select-combobox__inline-suggestion
multi-select-combobox__inline-completion
```

Use them only if you really have inline autocomplete text. If you only show a dropdown list, these names may suggest functionality that does not fully exist.

# 2. Props API

Your `MultiSelectComboboxProps<TItem>` is good.

Strong points:

```ts
getItemLabel: (item: TItem) => string;
getItemValue: (item: TItem) => string;
```

This proves the component is generic.

Also good:

```ts
onCreateItem?: (inputValue: string) => TItem | Promise<TItem>;
```

This keeps API logic outside the component.

I would not add more props right now. This is clean and not over-engineered.

# 3. Main ARIA issue: nested button inside `role="option"`

This part is the biggest accessibility/code-review issue:

```tsx
<li role="option">
  <button>...</button>
</li>
```

For a combobox/listbox pattern, the listbox option itself should usually be the interactive option. You should avoid putting a separate button inside an element with `role="option"`.

Better direction:

```tsx
<li
  id={optionId}
  role="option"
  aria-selected={index === highlightedIndex}
  className={
    index === highlightedIndex
      ? 'multi-select-combobox__option multi-select-combobox__option--highlighted'
      : 'multi-select-combobox__option'
  }
  onMouseDown={(event) => event.preventDefault()}
  onClick={() => handleSelectItem(item)}
>
  {getItemLabel(item)}
</li>
```

Why `onMouseDown.preventDefault()`?

Because it prevents the input from losing focus before the click selection is handled.

Do the same for the create row.

# 4. `aria-autocomplete="both"` may be wrong

You currently have:

```tsx
aria-autocomplete="both"
```

Use `"both"` only if you actually show inline completion text, for example:

```txt
input: "jav"
inline suggestion: "aScript"
```

If you only show a dropdown list, use:

```tsx
aria-autocomplete="list"
```

So:

```tsx
aria-autocomplete="list"
```

is probably safer unless your inline suggestion is fully working.

# 5. Dropdown should open on focus

You said:

> Does the dropdown open on input focus? No.

But your input has:

```tsx
onFocus={openDropdown}
```

So most likely the dropdown state opens, but your render condition blocks it:

```tsx
!loading && isOpen && inputValue
```

This means: even if `isOpen === true`, the list does not render when input is empty.

If you want dropdown to open on focus and show all available items, change condition to:

```tsx
{!loading && isOpen && (
```

or safer:

```tsx
{!loading && isOpen && canSelectMore && (
```

Then empty input will show all available options because your filter should return all items when search is empty.

# 6. Escape should not require double press

Use early returns in `handleKeyDown`.

Instead of several independent `if` blocks, use:

```ts
if (event.key === 'Escape') {
  event.preventDefault();
  closeDropdown();
  return;
}
```

Same for ArrowDown, ArrowUp, Enter. This prevents one key press from accidentally continuing through later logic.

Also make sure `closeDropdown()` does:

```ts
setIsOpen(false);
setHighlightedIndex(0);
```

If Escape still feels like double press after that, it is probably because the dropdown is visually hidden by `inputValue` condition while state is still open. Fixing the render condition should help.

# 7. Create row accessibility

Your create row currently has:

```tsx
<li role="option" aria-selected={false}>
```

but it has no `id`.

If the create row can be reached by keyboard or selected with Enter, it should also have a stable ID.

Example:

```tsx
const createOptionId = 'multi-select-combobox-create-option';
```

Then:

```tsx
<li
  id={createOptionId}
  role="option"
  aria-selected={false}
>
```

Even better: include create option in your highlighted logic later. For now, since `Enter` creates when there are no results, it is acceptable, but not perfect for screen readers.

# 8. Remove buttons

This part is good:

```tsx
aria-label={`Remove ${getItemLabel(item)}`}
```

The user can remove selected items with keyboard if the remove buttons are focusable. Native `<button>` is keyboard-accessible.

So your answer:

> Can user remove selected items using only keyboard? Not only keyboard.

Technically, if the button can receive focus by `Tab`, then yes. You should test:

```txt
Tab to remove button
Press Enter or Space
Selected item should be removed
```

Optional UX improvement later:

```txt
Backspace removes last selected chip when input is empty
```

Not required, but nice.

# 9. What I would fix first

Do these in this exact order:

1. Change dropdown render condition from:

```tsx
!loading && isOpen && inputValue
```

to:

```tsx
!loading && isOpen && canSelectMore
```

2. Change:

```tsx
aria-autocomplete="both"
```

to:

```tsx
aria-autocomplete="list"
```

unless inline completion is truly implemented.

3. Remove nested `<button>` inside `role="option"` and make `<li role="option">` clickable.

4. Add ID to create option.

5. Refactor `handleKeyDown` to use early `return`.

After these fixes, your component will look much cleaner from a frontend/accessibility review perspective.


````

#### Prompt 5.3

```text
Problem: Creating new tags - thow error shows only in console. What should I change to generate bugs also under component?
```

**Full AI response:**

````text
You need to catch the error inside the combobox hook and store it in state, then render that state under the component.

Right now the error probably happens here:

```ts
const createdItem = await onCreateItem(normalizedInput);
```

but if `onCreateItem` fails, nothing in your component saves that error.

# 1. Add error state in `useMultiSelectCombobox.ts`

Add this near your other states:

```ts
const [createError, setCreateError] = useState('');
```

# 2. Clear error when user types again

In `handleInputChange`, add:

```ts
setCreateError('');
```

Full example:

```ts
function handleInputChange(value: string) {
  setInputValue(value);
  setHighlightedIndex(0);
  setCreateError('');

  if (value.trim()) {
    openDropdown();
  } else {
    closeDropdown();
  }
}
```

# 3. Catch error in `handleCreateItem`

Change `handleCreateItem` to this:

```ts
async function handleCreateItem() {
  if (!onCreateItem || !canCreateItem) {
    return;
  }

  try {
    setIsCreating(true);
    setCreateError('');

    const createdItem = await onCreateItem(normalizedInput);

    onChange([...selectedItems, createdItem]);
    setInputValue('');
    closeDropdown();
  } catch (error) {
    setCreateError(error instanceof Error ? error.message : 'Could not create item.');
  } finally {
    setIsCreating(false);
  }
}
```

# 4. Return `createError` from the hook

```ts
return {
  inputValue,
  isOpen,
  highlightedIndex,
  filteredItems,
  canSelectMore,
  canCreateItem,
  isCreating,
  createError,
  handleInputChange,
  handleKeyDown,
  handleSelectItem,
  handleRemoveItem,
  handleCreateItem,
  openDropdown,
  closeDropdown,
};
```

# 5. Use it in `MultiSelectCombobox.tsx`

Add it to destructuring:

```ts
const {
  inputValue,
  isOpen,
  highlightedIndex,
  filteredItems,
  canSelectMore,
  canCreateItem,
  isCreating,
  createError,
  handleInputChange,
  handleKeyDown,
  handleSelectItem,
  handleRemoveItem,
  handleCreateItem,
  openDropdown,
  closeDropdown,
} = useMultiSelectCombobox({
  items,
  selectedItems,
  onChange,
  getItemLabel,
  getItemValue,
  onCreateItem,
  maxSelected,
});
```

Then render the error under the dropdown:

```tsx
{createError && (
  <p className="multi-select-combobox__error" role="alert">
    {createError}
  </p>
)}
```

# 6. Add CSS

```css
.multi-select-combobox__error {
  margin-top: 6px;
  color: #b91c1c;
  font-size: 14px;
}
```

This keeps the architecture clean:

```txt
MultiSelectCombobox calls onCreateItem()
Parent/API service may throw an error
Hook catches the error
Component displays it under the combobox
```

The component still does not know anything about the backend. It only displays the error from the callback.

````

### 6. Documentation stage

**Context:** Project without documentation is known only for owner. It's important to create documentation easy to understand for everyone. AI can help us with it the most because it can process a lot of data in parallel. We as humans can search every folder for key places and we may miss something important or talking too much because everything is important for us.

I used AI also to describe technical decisions in a more professional way. The goal was to clearly explain the API-first approach, generic data model, controlled component pattern, accessibility strategy and future extensibility. It helps me to understand core fundamentals.

#### Prompt 6.1:

```text
How can I short describe my project architecture? Should I leave a schema or do something else?
```

**Full AI response:**

````text
For the README, I wouldn't describe each file with a single sentence like "tsconfig configuration," but rather something more functional.

You could create a section:

## Project Structure

### Backend (`api/`)

| Path                        | Purpose                                                                       |
| --------------------------- | ----------------------------------------------------------------------------- |
| `data/items.json`           | Mock dataset used by the API. Contains tags, users and addresses collections. |
| `routes/items.routes.ts`    | Express routes responsible for handling API requests.                         |
| `services/items.service.ts` | Business logic for retrieving, filtering and creating items.                  |
| `types/item.types.ts`       | Shared TypeScript types used by the API.                                      |
| `server.ts`                 | Express application setup and API entry point.                                |

### Frontend (`frontend/src/`)

| Path                                                          | Purpose                                                       |
| ------------------------------------------------------------- | ------------------------------------------------------------- |
| `components/MultiSelectCombobox/`                             | Reusable generic multi-select combobox component.             |
| `components/MultiSelectCombobox/MultiSelectCombobox.tsx`      | Main component UI and rendering logic.                        |
| `components/MultiSelectCombobox/useMultiSelectCombobox.ts`    | Custom hook containing component state and interaction logic. |
| `components/MultiSelectCombobox/MultiSelectCombobox.types.ts` | Public component API and TypeScript definitions.              |
| `components/MultiSelectCombobox/MultiSelectCombobox.css`      | Component styles.                                             |
| `examples/TagsExample.tsx`                                    | Demonstration of the component with tag data.                 |
| `examples/AddressesExample.tsx`                               | Demonstration of the component with address data.             |
| `services/itemsApi.ts`                                        | Frontend API layer used to communicate with the mock backend. |
| `types/item.types.ts`                                         | Frontend data models and shared types.                        |
| `App.tsx`                                                     | Demo page used to showcase component functionality.           |
| `index.css`                                                   | Global styles and CSS variables.                              |
| `main.tsx`                                                    | React application entry point.                                |

### Root

| Path                    | Purpose                                                              |
| ----------------------- | -------------------------------------------------------------------- |
| `README.md`             | Project overview, setup instructions and architecture description.   |
| `ai-logs.md`            | Full AI interaction log required by the assignment.                  |
| `docs/component-api.md` | Component API contract created before implementation.                |
| `docs/mock-api.md`      | Mock API contract and endpoint specification.                        |
| `package.json`          | Root scripts for development, linting, formatting and type checking. |

It looks much more profesionall than:

```txt
server.ts - express configuration
item.types.ts - datatypes
vite-env.d.ts - configuration
```

because you describe **functional use in architecture**, not filename.


````

#### Prompt 6.2:

```text
What should I add to my documentation to show proffesional way during creating my component and suprise others? Think like a specialist, not like junior. Tell me only about sections names and what can I describe there.
```

**Full AI response:**

```text
Here are strong documentation sections that look more senior/professional:

## 1. Design Goals

Describe what the component is trying to achieve: reusable, generic, accessible, keyboard-friendly, API-first, independent from backend logic.

## 2. API-First Component Design

Describe how you designed props, callbacks and generic types before implementation. Explain why `getItemLabel`, `getItemValue`, `onChange`, `onCreateItem` exist.

## 3. Data Flow

Describe the flow:

Mock API → frontend service → example page → MultiSelectCombobox props

Explain that the component does not fetch data itself.

## 4. Generic Data Model

Describe why the component works with different item shapes: tags, addresses, users, etc. Explain that it does not depend on fixed fields like `name` or `label`.

## 5. Controlled Component Pattern

Describe that selected items are controlled by the parent through `selectedItems` and `onChange`. This is important because it makes the component predictable and reusable.

## 6. State Management Strategy

Describe which state is internal: input value, dropdown state, highlighted index, creating state. Explain why this logic is extracted into a custom hook.

## 7. Keyboard Interaction Model

Describe how `ArrowUp`, `ArrowDown`, `Enter`, `Escape`, and optionally `Backspace` behave.

## 8. Accessibility Strategy

Describe ARIA roles and attributes: `combobox`, `listbox`, `option`, `aria-expanded`, `aria-controls`, `aria-activedescendant`, accessible remove buttons.

## 9. Inline Autocomplete Behavior

Describe how inline suggestion works: user types part of a word, the component shows the suggested completion, and `Enter` accepts the suggestion.

## 10. Item Creation Flow

Describe how new items are created, how duplicates are handled, what happens during loading/creating state, and where created items are stored.

## 11. Error Handling

Describe frontend and backend error handling: failed fetch, invalid collection, duplicate item, invalid request body, empty results.

## 12. Mock API Contract

Describe available endpoints, request/response shapes, supported collections, and the fact that created items are stored only in memory during the API session.

## 13. Architecture Decisions

Describe why the backend is simple, why controllers were skipped, why logic is in services, and why the component has its own folder with hook/types/styles.

## 14. Trade-offs

Describe conscious decisions, for example: local JSON instead of real database, no external autocomplete library, simple CSS instead of UI framework, mock API instead of production backend.

## 15. Extensibility

Describe how the component could be extended: async search, virtualization for large lists, form library integration, grouped options, custom rendering, validation.

## 16. Testing Strategy

Describe what should be tested: filtering, selecting, removing, keyboard navigation, item creation, accessibility behavior, API service functions.

## 17. Quality Tooling

Describe ESLint, Prettier, TypeScript type checking, scripts, and why they improve maintainability.

## 18. AI Usage Log

Describe that `ai-logs.md` contains prompts and responses in chronological order, as required by the assignment.

```

#### Prompt 6.3:

````text
## API-first approach

Component

### Component idea

```js
<MultiSelectCombobox<TItem>
  items={items}
  selectedItems={selectedItems}
  onChange={setSelectedItems}
  getItemLabel={getItemLabel}
  getItemValue={getItemValue}
  onCreateItem={handleCreateItem}
  placeholder="Search..."
  ariaLabel="Select items"

  disabled={false}
  loading={false}
  maxSelected={5}
/>
```

Props

```js
type MultiSelectComboboxProps<TItem> = {
  items: TItem[];
  selectedItems: TItem[];
  onChange: (selectedItems: TItem[]) => void;
  getItemLabel: (item: TItem) => string;
  getItemValue: (item: TItem) => string;
  onCreateItem?: (inputValue: string) => TItem | Promise<TItem>;
  placeholder?: string;
  ariaLabel: string;
  disabled?: boolean;
  loading?: boolean;
  maxSelected?: number;
};
```

help me describe this section

````

**Full AI response:**

`````text
Możesz opisać tę sekcję tak:

````md
## API-first approach

The component was designed using an API-first approach. Before implementing the UI and internal logic, the public component API was defined first: props, callbacks, generic type support and expected behavior.

The goal of this approach is to make the component reusable, predictable and independent from a specific data structure or backend implementation. The `MultiSelectCombobox` does not assume that every item has fields such as `id`, `name` or `label`. Instead, the parent component provides functions that describe how each item should be displayed and identified.

### Component idea

```tsx
<MultiSelectCombobox<TItem>
  items={items}
  selectedItems={selectedItems}
  onChange={setSelectedItems}
  getItemLabel={getItemLabel}
  getItemValue={getItemValue}
  onCreateItem={handleCreateItem}
  placeholder="Search..."
  ariaLabel="Select items"
  disabled={false}
  loading={false}
  maxSelected={5}
/>
```

This example shows the intended usage of the component. The parent component controls selected items through `selectedItems` and `onChange`, while the combobox is responsible for user interaction, filtering, keyboard navigation and item removal.

The component receives generic `items`, so it can work with different object shapes, for example tags, users or addresses. The `getItemLabel` function defines what text should be shown to the user, and `getItemValue` defines how the component should uniquely identify each item.

### Props

```ts
type MultiSelectComboboxProps<TItem> = {
  items: TItem[];
  selectedItems: TItem[];
  onChange: (selectedItems: TItem[]) => void;
  getItemLabel: (item: TItem) => string;
  getItemValue: (item: TItem) => string;
  onCreateItem?: (inputValue: string) => TItem | Promise<TItem>;
  placeholder?: string;
  ariaLabel: string;
  disabled?: boolean;
  loading?: boolean;
  maxSelected?: number;
};
```

### Props description

| Prop            | Description                                                                  |
| --------------- | ---------------------------------------------------------------------------- |
| `items`         | Full list of available options passed from the parent component.             |
| `selectedItems` | Currently selected items. This makes the component controlled by the parent. |
| `onChange`      | Callback called whenever selected items change.                              |
| `getItemLabel`  | Function used to display an item in the UI.                                  |
| `getItemValue`  | Function used to uniquely identify an item and compare selected values.      |
| `onCreateItem`  | Optional callback used to create a new item from the current input value.    |
| `placeholder`   | Placeholder text displayed in the input.                                     |
| `ariaLabel`     | Accessible label for screen readers.                                         |
| `disabled`      | Disables user interaction with the component.                                |
| `loading`       | Shows loading state when data is being fetched.                              |
| `maxSelected`   | Optional limit for the maximum number of selected items.                     |

This API keeps data fetching outside of the component. The parent or demo page is responsible for loading data from the mock API and passing it into the combobox through props. This separation makes the component easier to reuse, test and extend.

```

Najważniejsze poprawki: użyj `tsx` dla przykładu komponentu i `ts` dla typu propsów, nie `js`, bo to jest TypeScript.
```

`````

#### Prompt 6.4:

```text
help me create this:

4. Generic Data Model

Describe why the component works with different item shapes: tags, addresses, users, etc. Explain that it does not depend on fixed fields like name or label.

5. Controlled Component Pattern

Describe that selected items are controlled by the parent through selectedItems and onChange. This is important because it makes the component predictable and reusable.

6. State Management Strategy

Describe which state is internal: input value, dropdown state, highlighted index, creating state. Explain why this logic is extracted into a custom hook.

```

**Full AI response:**

`````text

Use this in your documentation:

````md
## Generic Data Model

The `MultiSelectCombobox` is designed to work with different item shapes. It is not limited to one specific structure such as:

```ts
{
  id: string;
  name: string;
}
```

Instead, the component is generic and receives the item type from the parent component:

```ts
MultiSelectCombobox<TItem>
```

This means the same component can be used with different data models, for example:

```ts
type Tag = {
  id: string;
  name: string;
};

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

type Address = {
  id: string;
  city: string;
  street: string;
  postalCode: string;
};
```

The component does not directly access fields like `name`, `label`, `firstName` or `city`. Instead, the parent component tells the combobox how to display and identify items by passing two functions:

```ts
getItemLabel={(item) => item.name}
getItemValue={(item) => item.id}
```

For more complex objects, the label can be composed from multiple fields:

```ts
getItemLabel={(user) => `${user.firstName} ${user.lastName}`}
getItemValue={(user) => user.id}
```

This design makes the component reusable across different contexts and proves that it is not hardcoded for tags only.

```

```md
## Controlled Component Pattern

The `MultiSelectCombobox` follows the controlled component pattern for selected items.

This means that the component does not store the final selected items internally. Instead, the selected state is owned by the parent component and passed into the combobox through props:

```ts
selectedItems={selectedItems}
onChange={setSelectedItems}
```

When the user selects or removes an item, the combobox calls `onChange` with the updated list of selected items. The parent then updates its own state and passes the new value back to the component.

This makes the component predictable because there is a single source of truth for selected items. It also makes the component easier to reuse, debug and integrate with other parts of an application, such as forms, API calls or validation logic.

The combobox is responsible for user interaction, while the parent decides what should happen with the selected data.

```

```md
## State Management Strategy

The component uses internal state only for temporary UI interaction state. The selected items are controlled by the parent, but the combobox manages its own interaction behavior.

Internal state includes:

| State | Purpose |
|---|---|
| `inputValue` | Stores the current text typed by the user. |
| `isOpen` | Controls whether the suggestions dropdown is visible. |
| `highlightedIndex` | Tracks which suggestion is currently highlighted during keyboard navigation. |
| `isCreating` | Indicates whether a new item is currently being created. |

This state is extracted into a custom hook:

```ts
useMultiSelectCombobox()
```

The hook contains the component logic, such as filtering items, selecting items, removing items, handling keyboard navigation and creating new items.

This separation keeps the main component focused on rendering UI, while the hook is responsible for behavior and state transitions.

The result is a cleaner architecture:

```txt
MultiSelectCombobox.tsx        → UI rendering
useMultiSelectCombobox.ts      → state and interaction logic
MultiSelectCombobox.types.ts   → public API and TypeScript types
```

This makes the code easier to maintain and extend. For example, keyboard navigation, item creation or filtering logic can be changed inside the hook without making the JSX component harder to read.

```


`````

#### Prompt 6.5:

```text
Keyboard Interaction Model
Describe how ArrowUp, ArrowDown, Enter, Escape, Backspace and Tab behave.
```

**Full AI response:**

````text

Use this section in your documentation:

```md
## Keyboard Interaction Model

The component supports keyboard interaction to make item selection possible without using a mouse. This is important for both accessibility and general usability.

| Key | Behavior |
|---|---|
| `ArrowDown` | Opens the suggestion list if it is closed and moves the highlight to the next available option. |
| `ArrowUp` | Moves the highlight to the previous available option. |
| `Enter` | Selects the currently highlighted option. If no option is highlighted, it selects the first matching suggestion. If item creation is available and there are no matching results, it creates a new item. |
| `Escape` | Closes the suggestion list and clears the current highlight. |
| `Backspace` | When the input is empty, removes the last selected item. This behavior is useful for quickly editing selected values. |
| `Tab` | Keeps the default browser focus behavior. It moves focus to the next focusable element and does not trap the user inside the component. |

The keyboard behavior is handled inside the `useMultiSelectCombobox` hook. This keeps keyboard logic separated from the JSX structure and makes the component easier to maintain.

The goal is to make the combobox predictable:

- arrow keys are used for navigation,
- `Enter` confirms a selection,
- `Escape` cancels the current interaction,
- `Backspace` helps remove selected items,
- `Tab` follows normal browser accessibility behavior.

This interaction model makes the component usable for keyboard-only users and supports the expected behavior of an accessible combobox.
```


````

#### Prompt 6.6:

```text
Accessibility Strategy
Describe ARIA roles and attributes: combobox, listbox, option, aria-expanded, aria-controls, aria-activedescendant, accessible remove buttons.
```

**Full AI response:**

````text
Use this section:

```md
## Accessibility Strategy

The component is designed to support keyboard and screen reader users by following the common combobox/listbox accessibility pattern.

The input element uses the `combobox` role because it is the main interactive element where the user types a query and receives suggestions. The suggestions container uses the `listbox` role, and each suggestion uses the `option` role.

ARIA attributes are used to describe the current state of the component:

| Attribute / Role | Purpose |
|---|---|
| `role="combobox"` | Defines the input as a combobox control connected with a suggestion list. |
| `role="listbox"` | Defines the suggestions container as a list of selectable options. |
| `role="option"` | Defines each suggestion as a selectable item. |
| `aria-expanded` | Tells assistive technologies whether the suggestion list is currently open. |
| `aria-controls` | Connects the input with the suggestion list by referencing the listbox ID. |
| `aria-activedescendant` | Points to the currently highlighted option during keyboard navigation. |
| `aria-selected` | Indicates which option is currently highlighted or selected in the list. |
| `aria-label` | Provides an accessible name for the combobox when there is no visible label. |
| `aria-autocomplete` | Describes how suggestions are presented to the user. |

Example idea:

```tsx
<input
  role="combobox"
  aria-label={ariaLabel}
  aria-autocomplete="both"
  aria-expanded={isOpen}
  aria-controls={isOpen ? listboxId : undefined}
  aria-activedescendant={activeOptionId}
/>
```

The remove buttons for selected items are also accessible. Each selected item has its own button with a descriptive label, for example:

```tsx
<button aria-label={`Remove ${getItemLabel(item)}`}>x</button>
```

This is better than using only a visual `x`, because screen reader users hear a meaningful action such as “Remove React” instead of only “button”.

The component also keeps normal focus behavior. `Tab` is not trapped inside the combobox, so users can move naturally to the next focusable element. Keyboard navigation is handled with `ArrowUp`, `ArrowDown`, `Enter`, `Escape` and `Backspace`, which makes the component usable without a mouse.

The goal of this accessibility strategy is to make the component understandable, predictable and usable for both mouse users and keyboard-only users.
```
````

#### Prompt 6.7:

```text
Inline Autocomplete Behavior
Describe how inline suggestion works: user types part of a word, the component shows the suggested completion, and Enter accepts the suggestion.
```

**Full AI response:**

````text
Use this section:

```md
## Inline Autocomplete Behavior

The component supports inline autocomplete to make suggestions faster and more visible while the user is typing.

When the user types a partial value, the component checks the filtered suggestions and uses the first matching item as the inline suggestion. For example, if the available item is `HTML` and the user types `ht`, the component can visually suggest the remaining part of the word:

```txt
ht + ml
```

The typed part remains controlled by the input value, while the suggested completion is displayed as a secondary visual hint. This completion is not added to the input automatically. It only becomes selected when the user confirms it.

The expected behavior is:

| Action                     | Behavior                                                                   |
| -------------------------- | -------------------------------------------------------------------------- |
| User types a partial value | The component searches matching items.                                     |
| Matching item exists       | The remaining part of the best match is displayed as an inline suggestion. |
| User presses `Enter`       | The suggested item is selected.                                            |
| User continues typing      | The suggestion updates based on the new input value.                       |
| No matching item exists    | No inline suggestion is displayed.                                         |

This behavior improves usability because users can quickly recognize and accept an existing option without typing the full value.

The inline suggestion is only a visual helper. The actual selected data is still controlled through the normal component flow:

```txt
input value → matching suggestion → Enter → onChange(updatedSelectedItems)
```

This keeps the component predictable and consistent with the controlled component pattern.

````

#### Prompt 6.8:

```text
Architecture Decisions
Describe why the backend is simple, why controllers were skipped, why logic is in services, and why the component has its own folder with hook/types/styles.
```

**Full AI response:**

```text

## Architecture Decisions

The backend was intentionally kept simple because its role is only to support the frontend demo with mock data. It uses a local JSON file instead of a real database, which is enough for demonstrating fetching, filtering and creating items during the current API session.

Controllers were skipped on purpose to avoid unnecessary abstraction. Since the API has only one main resource, the structure based on routes, services and types is easier to understand and maintain. Routes are responsible for HTTP endpoints, while services contain the actual data logic, such as searching, validating and creating items.

On the frontend, the `MultiSelectCombobox` has its own folder because it is the core reusable part of the project. The component is separated into a UI file, a custom hook, type definitions and CSS styles. This keeps responsibilities clear: the component renders the interface, the hook manages state and behavior, the types define the public API, and the CSS file contains styling.

This structure keeps the project professional but not over-engineered. It also makes the component easier to extend later with features such as async search, better accessibility, custom option rendering or form integration.

```
