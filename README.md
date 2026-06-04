# Multi select combobox component

To run app use commands below:

```bash
git clone https://github.com/knocek/multi-select-combobox-component.git
cd multi-select-combobox-component
npm install
npm run dev
```

## Content

- [1. Design goals](#design-goals)
- [2. API-first Approach ](#api-first-approach)
  - [Component idea](#component-idea)
  - [Props](#props)
- [3. Data flow](#data-flow)
- [4. Generic data model](#generic-data-model)
- [5. Controlled Component Pattern](#controlled-component-pattern)
- [6. State Management Strategy](#state-management-strategy)
- [7. Keyboard Interaction Model](#keyboard-interaction-model)
- [8. Accessibility Strategy](#accessibility-strategy)
  - [Acessibility test by Lighthouse](#acessibility-test-by-lighthouse)
  - [Things to improve with acessibility](#things-to-improve-with-acessibility)
- [9. Inline Aurocomplete Behaviour](#inline-autocomplete-behavior)
- [10. Project architecture](#project-architecture)
- [11. Quality Tooling](#quality-tooling)
- [12. Avaible scripts](#avaible-scripts)
- [13. Extensibility](#extensibility)
  - [Bug fixing ideas](#bug-fixing-ideas)
  - [Component extension ideas](#component-extension-ideas)
- [14. AI Usage Log](#ai-usage-log)

## Design goals

Our goal was to create generic autocomplete component that can be used to choose one or more tags or create new tags if not exsists. Our component:

- should consider API-first solution,
- can't be done with exsisting libraries,
- should be generic for various data types,
- should be keyboard friendly,
- comply with accessibility requirements.

## API-first approach

Before implementation, component API was defined first: props, callbacks, generic type support and expected behavior. The goal of this approach is to make the component reusable and independent from a specific data structure or backend implementation.

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

This example shows usage of the component. Parent component controls selected items through `selectedItems` and `onChange`. The combobox is responsible for user interaction, filtering, keyboard navigation.

Component receives collection through `items`, so it can work with different object shapes. `getItemLabel` defines what text should user see, `getItemValue` how component should identify each item.

### Props

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

| Prop         | Description                                                                 |
| ------------ | --------------------------------------------------------------------------- |
| items        | Full list of avaible items passed from parent component.                    |
| selectedItem | Currently selected items.                                                   |
| onChange     | Called when selected items change.                                          |
| getItemLabel | Returns display label for an item in UI.                                    |
| getItemValue | Returns unique identifier for item and compares selected values.            |
| onCreateItem | Enables creating new items for typed input. Optional callback.              |
| placeholder  | Placeholder text displayed in the input.                                    |
| ariaLabel    | Accessible label for screen readers for input.                              |
| disabled     | Makes component read only. _(not implemented in mockup)_                    |
| loading      | Shows loading state when data is being fetched.                             |
| maxSelected  | Enables set number limits for selected items. _(not implemented in mockup)_ |

Detailed design documents are available in the `docs` directory:

- [Component API Contract](./docs/component-api.md)
- [Mock API Contract](./docs/mock-api.md)
- [Project architecture scheme](./docs/project-architecture-scheme.md)

These documents were created before implementation following an API-first approach.

## Data flow

```text
Mock API → frontend service → example page → MultiSelectCombobox props
```

- Mock API `/api` - Express server with data included in `items.json`. Endpoint:
  - `GET /health` - to check if server works,
  - `GET /items/:collection` - returns all items from selected collection,
  - `GET /items/:collection?search=value` - returns filtered items,
  - `POST /items/:collection` - creates new mock item with data from body.
- Frontend service `itemApi.ts` - communication layer, knows API adress. Inludes:
  - `fetchItems(collection, search?)` - fetches items from a given collection, optionally filtered by search query
  - `createItem(collection, item)` - sends a new item to the API and returns the created object
- Example page: `TagsExample`, `AddresessExample` - manage state, calls service and hold item list and `selectedItems` in `useState`, manage `onCreateItem`. Here is business logic for special usage case.
- `MultiSelectCombobox` props - receives ready daya via props. Doesn't know where it comes from, it could be from API, local state or any source. Its responsibility is render the list of items, handle input and inform parent of changes via `onChange` and `onCreateItem`.

This separation makes component easy to test in isolation without server or API using props.

## Generic Data Model

Component is designed to works with different item shapes. It's not limited to one specific structure.

Component accepts any type from the parent component: `MultiSelectCombobox<TItem>`. The parent component tells how to display and identify items by two functions:

- `getItemLabel` - how display text from item,
- `getItemValue` - how get unique identifier for item.

TypeScript ensures that whatever type is passed as items, the same type flows through selectedItems, onChange and onCreateItem.

Example from `AddressesExample.tsx`:

```js
getItemLabel={(address) => `${address.city}, ${address.street}`}
getItemValue={(address) => address.id}
```

## Controlled Component Pattern

The `MultiSelectCombobox` follows the controlled component pattern for selected items.

This means that component doesn't store final selected items internally. The selected state is owned by the parent component and passed into the combobox through props:

```js
selectedItems = { selectedItems };
onChange = { setSelectedItems };
```

- `selectedItems` - the current selection passed down from the parent. Component reads this to know what to display as chips and what to exclude from the dropdown list.
- `onChange` - when user select or remove item, component calls `onChange` with new array. Parent updates its own state and passes the new value back to the component.

Benefit of this pattern is predictability - component always renders what receives through props. Parent has full control over the selection without touching component internals.

Disadvantage is that every keypress is re-rendering the entire component. We should e.g. add debounce state updates or useTransition hook.

## State Management Strategy

The component separates two kinds of state:

- **External state** - selected items - is owned by the parent as described in the controlled component pattern.

- **Internal state** - everything related to the UI interaction, lives inside the component.

| State | Goal |
| --- | --- |
| `inputValue` | Stores what user is currently typing. |
| `isOpen` | Controls if suggestions dropdown is visible. |
| `highlightedIndex` | Tracks which suggestion is currently highlighted during keyboard navigation. |
| `isCreating` | If new item is currently being created. |
| `createError` | Error message if creating failed. |

This state is extracted into a custom hook: `useMultiSelectCombobox`. The hook contains the component logic like filtering items, selecting items, removing items, handling keyboard an creating new items.

This separation keeps the main component focused on rendering UI, while the hook is responsible for behavior. This separation makes logic easier to read, test and maintain.

## Keyboard Interaction Model

Component supports keyboard interaction to make item selection possible without using a mouse. This is important for both accessibility and general usability.

- `ArrowDown` - opens the dropdown if closed, moves highlight to next option on list. Back highlight to the first item when the end is reached.
- `ArrowUp` - moves highlight to previous option on dropdown list. Back highlight to the last item when top item is reached.
- `Enter` - selects the currently highlighted option. If no item is highlighted and canCreateItem is true, triggers item creation. If no option is highlighted, it selects the first matching suggestion
- `Escape` - closes dropdown without selecting anything.
- `Backspace` - when the input is empty, removes the last selected item (chip)
- `Tab` - closes the dropdown and moves focus to the next element on the page.

The keyboard behavior is handled inside the `useMultiSelectCombobox` hook.

## Accessibility Strategy

Accessibility was based on ARIA Authoring Practices Guide for Combobox: [w3.org](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/).

About navigation with keyboard you can read above.

| Role | Place | Purpose |
| --- | --- | --- |
| `role="combobox"` | Input | Defines the input as a combobox control connected with a suggestion list. |
| `role="listbox"` | Dropdown list | Identifies list of avaible options. |
| `role="option"` | Each list item | Defines each suggestion as a selectable item. |
| `role="alert"` | Error message | Announces error to screen readers immediately. |
| `role="status"` | Loading elements | Identifies that something is loading. |

ARIA attributes are used to describe the current state of the component:

| Attribute / Role | Purpose |
| --- | --- |
| `aria-expanded` | Tells the suggestion list is currently open. |
| `aria-controls` | When dropdown is open, link input id to list. |
| `aria-activedescendant` | Points to currently highlighted option during keyboard navigation. |
| `aria-selected` | Tells which option is currently highlighted or selected in the list. |
| `aria-label` | Provides a name for the combobox when there is no visible label. |
| `aria-label` on remove button | instead of "x" reader announce "remove" action |
| `aria-autocomplete` | Describes how suggestions are presented to the user. |

Example:

```js
<input
    className="multi-select-combobox__input"
    ...
    aria-label={ariaLabel}
    role="combobox"
    autoComplete="off"
    aria-autocomplete="both"
    aria-expanded={isOpen}
    aria-controls={isOpen ? listboxId : undefined}
    aria-activedescendant={activeOptionId}
/>
```

### Acessibility test by Lighthouse

![Accessibility score: 93](/docs/accessibility-test.png)

Most important passed audits:

- `[aria-*]` attributes match their roles.
- `[aria-hidden="true"]` is not present on the document \<body>.
- `[role]s` have all required `[aria-*]` attributes.
- `[aria-*]` attributes are valid and not misspelled.
- Form elements have associated labels.
- Elements use only permitted ARIA attributes.
- Deprecated ARIA roles were not used.
- ARIA attributes are used as specified for the element's role.

### Things to improve with acessibility

The component already supports basic keyboard navigation and ARIA attributes, but accessibility can still be improved by validating the full combobox behavior with screen readers. Future improvements should include better focus management and unique IDs for multiple component instances.

![Accessibility problem: [aria-*] attributes do not have valid values](docs/accessibility-problems.png)

## Inline Autocomplete Behavior

The component supports inline autocomplete to make suggestions faster while the user is typing. When user types a partial value, the component checks the filtered suggestions and uses the first matching item as the inline suggestion. Suggestion is displayed as grey text after the cursor.

Example: Typing "ht" shows "**ht\***ML\*".

The inline suggestion is only a visual helper. The actual selected data is still controlled through the normal component flow:

```text
input value -> matching suggestion -> Enter press -> onChange(updateSelectedItems)
```

## Project architecture

### Backend (`api/`)

Backend is intentionally kept simple to simulate a real backend for demo.

| Path                        | Description                                                        |
| --------------------------- | ------------------------------------------------------------------ |
| `data/items.json`           | Mock dataset used by API. Contains tags and addresses collections. |
| `routes/items.routes.ts`    | Express routes responsible for handling API requests.              |
| `services/items.service.ts` | Business logic for retrieving, filtering and creating items.       |
| `types/item.types.ts`       | Shared TypeScript types used by API.                               |
| `server.ts`                 | Express application setup and API entry point.                     |

### Frontend (`frontend/src/`)

On frontend, `MultiSelectCombobox` has its own folder because it is the core reusable part of the project. The component is separated into a UI file, a custom hook, type definitions and CSS styles. This keeps responsibilities clear: component renders the interface, hook manages state and behavior, types define the public API and CSS file contains styling.

| Path | Description |
| --- | --- |
| `components/MultiSelectCombobox/MultiSelectCombobox.tsx` | Main UI component and rendering logic. |
| `components/MultiSelectCombobox/useMultiSelectCombobox.ts` | Custom hook containing component state and interaction logic. |
| `components/MultiSelectCombobox/MultiSelectCombobox.types.ts` | Public component API and TypeScript definitions. |
| `components/MultiSelectCombobox/MultiSelectCombobox.css` | Component styles. |
| `examples/` | Directory with component demonstrations with different data. |
| `services/itemsApi.ts` | Frontend API layer used to communicate with the mock backend. |
| `types/item.types.ts` | Frontend data models and shared types. |
| `App.tsx` | Demo page used to showcase component functionality. |

## Quality tooling

| Tool        | Responsibility                                                          |
| ----------- | ----------------------------------------------------------------------- |
| ESLint      | check code quality and catches potential bugs                           |
| Prettier    | handles code formatting automatically                                   |
| Husky       | runs checks at Git commit                                               |
| lint-staged | runs linting and formatting only on staged files, not the whole project |

## Avaible scripts

Root package.json contains scripts that run checks across workspaces.

| Script | Description |
| --- | --- |
| `npm run dev` | Starts both the mock API and the frontend application at the same time using `concurrently`. |
| `npm run lint` | Runs ESLint for frontend and API files. It checks TypeScript, React and JavaScript code quality. |
| `npm run lint:fix` | Runs ESLint with automatic fixes where possible. |
| `npm run format` | Formats the whole project using Prettier. |
| `npm run format:check` | Checks if files are correctly formatted without changing them. Useful before committing or reviewing code. |
| `npm run typecheck` | Runs TypeScript type checking for both the frontend and the API. |
| `npm run pre-commit` | Runs `lint-staged`, which checks only files staged for commit. |
| `npm run prepare` | Initializes Husky Git hooks after dependencies are installed. |

## Extensibility

Each component can be extended by adding new features or fixing bugs. It's important to always be open to change: both technological and resulting from peer review.

### Bug fixing ideas

1. After press `Escape`, when press `Enter` we see that items from lists are adding as selected.
2. `closeDropdown` - should be done with useCallback.
3. Acessibility should be done in professional way: aria-live should be add, exsisting aria atributtes should be checked.
4. No debounce on searching. Every key press calls request.
5. Zero tests.
6. `disabled`, `loading` and `maxSelected` props are implemented but not demonstrated in example.
7. **[resolved]** Creating new tags - thow error shows only in console.

## Component extension ideas

1. Async search - currently filtering happends on the frontend from preloaded list. Component could accept an onSearch callback instead, allowing the parent to fetch results from the API.
2. Component could also be integrated with form libraries such as React Hook Form.
3. Future improvements could include grouped options, custom option rendering and custom selected item rendering. For now only flatlist is available.

## AI Usage Log

File [ai-logs.md](ai-logs.md) contains prompts and responses used in project in chronological order.
