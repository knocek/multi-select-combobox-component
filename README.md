# multi-select-combobox-component

## Project architecture

Plik tags.routes.ts odpowiada za obsługę endpointów HTTP, natomiast tags.service.ts zawiera logikę operacji na danych, takich jak pobieranie, filtrowanie i dodawanie tagów. Dane są przechowywane w pliku JSON pełniącym rolę mock database.

```text
project/
├─ .husky/
├─ api/
│  ├─ src/
│  │  ├─ data/tags.json # mock data
│  │  ├─ routes/tags.routes.ts # API endpoints
│  │  ├─ services/tags.service.ts # searching/filtering/adding logic
│  │  ├─ types/tag.types.ts # datatypes
│  │  └─ server.ts # express configuration
│  └─ package.json
├─ frontend/
│  ├─ src/
│  │  ├─ api/
│  │  │  └─ tagsApi.ts
│  │  ├─ components/
│  │  │  └─ ui/
│  │  │     └─ Autocomplete/
│  │  │        ├─ Autocomplete.tsx
│  │  │        ├─ useAutocomplete.ts
│  │  │        └─ Autocomplete.types.ts
│  │  ├─ hooks/
│  │  │  ├─ useDebounce.ts
│  │  │  └─ useClickOutside.ts
│  │  ├─ App.tsx
│  │  └─ main.tsx
│  └─ package.json
├─ eslint.config.mjs
├─ .prettierrc
├─ package.json
└─ README.md
```

| Tool        | Responsibility                    |
| ----------- | --------------------------------- |
| ESLint      | code correctness and rules        |
| Prettier    | formatting                        |
| Husky       | runs checks at Git commit         |
| lint-staged | runs checks only on changed files |

## Some things to improve

1. Creating new tags - before creating new tag, system does not check if the same tag exssists.
2. After press 'Escape', then 'Enter' we see that items from lists are added selected.
3. closeDropdown - should be done with useCallback
4. Acessibility should be done in professional way: aria-live should be add, aria atributtes should be checked.
5. No debounce on searching. Every key press calls request.
6. Zero tests.
7. Creating new tags - thow error shows only in console. **resolved**
