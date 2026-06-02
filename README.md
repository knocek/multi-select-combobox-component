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

| Tool        | Responsibility                      |
| ----------- | ----------------------------------- |
| ESLint      | code correctness and rules          |
| Prettier    | formatting                          |
| Husky       | runs checks at Git commit/push time |
| lint-staged | runs checks only on changed files   |
