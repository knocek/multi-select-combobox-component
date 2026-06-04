# Project architecture scheme

```text
project/
├─ .husky/ pre-commit       # automate code checks and prevent bad code from being committed
├─ api/
│  ├─ data/items.json       # mock data with tags and adresses
│  ├─ routes/items.routes.ts         # espress routes for handling API requests
│  ├─ services/tags.service.ts      # business logic for searching, filtering and creating items
│  ├─ types/tag.types.ts        # TypeScript types used by API
│  ├─ server.ts         # express configuration and API entry point
│  ├─ package.json
|  └─ tsconfig.json
├─ frontend/
|  ├─ public/
│  ├─ src/
│  │  ├─ components/
│  │  │  └─ MultiSelectCombobox /       # reusable generic select combobox component
│  │  │        ├─ MultiSelectCombobox.tsx       # main component UI and rendering logic
│  │  │        ├─ MultiSelectCombobox.css       # component styles
|  |  |        ├─ MultiSelectCombobox.types.tx       # public component API and TypeScript definitions
│  │  │        └─ useMultiSelectCombobox.ts      # hook containing component state
|  |  ├─ examples/
│  │  │  ├─ AddressesExample.tsx         # demonstration for addresses data
│  │  │  └─ TagsExample.tsx         # demonstration for tags data
│  │  ├─ services/
│  │  │  └─ itemApi.ts          # frontend API layer to communicate with mock backend
│  │  ├─ types/
│  │  │  └─ item.types.ts        # frontend data models and shared types
│  │  ├─ App.tsx        # demo page to show component functionality
|  |  ├─ index.css      # global styles and CSS variables
│  │  ├─ main.tsx
│  │  └─ vite-env.d.ts      # configuration
|  ├─ index.html
│  ├─ package.json
|  ├─ tsconfig.json
|  ├─ vite.config.ts
|  └─ package.json
├─ .gitignore
├─ .prettierignore        # files that will be ignore with prettier checks
├─ .prettierrc       # prettier configuration
├─ eslint.config.mjs        # eslint configuration
├─ ai-logs.md       # AI usage documentation
├─ package.json
└─ README.md
```

## Project architecture decisions

The project is split into two main parts: `api` and `frontend`. This separation keeps the mock backend independent from the React component and makes the project easier to understand, test and extend.

Backend uses a local JSON file as a mock database and exposes only the endpoints needed by the demo application. The API logic is separated into routes, services and types. Routes handle HTTP requests, services contain data operations such as filtering and creating items and types define the supported data structures.

Frontend is organized around the reusable `MultiSelectCombobox` component. The component is isolated in its own folder with styles, public TypeScript API and custom hook. This keeps rendering logic separated from state and interaction logic. The component does not fetch data by itself. Instead, data is loaded by the parent/demo layer and passed through props, which makes the component reusable with different item types.

The `examples` folder demonstrates the generic nature of the component. The same combobox is used with different data structures.
