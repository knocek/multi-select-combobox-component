# Mock API Contract

## Description

Backend is a small mock API used only to provide demo data for the frontend. The backend does not manage selected items or combobox state. It only returns, filters and creates mock items. Items added in session, won't append to mock dataset after session closed. Created items are stored only in server memory during the current API session. They are added to the in-memory `mockData` object and are not persisted back to `items.json`.

## Endpoints

| Method | Endpoint                          | Description                                 |
| ------ | --------------------------------- | ------------------------------------------- |
| `GET`  | `/health`                         | Checks if API is running                    |
| `GET`  | `/items/:collection`              | Returns all items from selected collection  |
| `GET`  | `/items/:collection?search=value` | Returns filtered items                      |
| `POST` | `/items/:collection`              | Creates a new mock item with data from body |

## Supported collections

```text
tags
addresses
```

## Example requests and responses

### `GET /health`

```json
{
  "status": "ok",
  "message": "Mock API is running."
}
```

### `GET /items/tags`

```json
[
  {
    "id": "tag-1",
    "name": "React"
  },
  {
    "id": "tag-2",
    "name": "TypeScript"
  },
  {
    "id": "tag-3",
    "name": "JavaScript"
  },
  {
    "id": "tag-4",
    "name": "CSS"
  },
  {
    "id": "tag-5",
    "name": "HTML"
  }
]
```

### `GET /items/tags?search=react`

```json
[
  {
    "id": "tag-1",
    "name": "React"
  }
]
```

### `GET /items/addresses?search=warszawa`

```json
[
  {
    "id": "address-1",
    "city": "Warszawa",
    "street": "Marszałkowska"
  }
]
```

### `POST /items/addresses`

Use body params:

```json
{
  "id": "address-111",
  "city": "Kraków",
  "street": "Bieńczycka"
}
```

## Data shapes

### Tag

```js
type Tag = {
  id: string;
  name: string;
};
```

### Address

```js
type Address = {
  id: string;
  city: string;
  street: string;
};
```

## Design decision

The mock API returns collections with different object shapes on purpose. Tags use a simple `name` field, addresses use `city` and `street`.

This is used to prove that the frontend `MultiSelectCombobox` is truly generic. The component should not depend on fixed fields such as `name`, `label` or `id`. Instead, the parent component decides how each item should be displayed and identified by passing functions such as `getItemLabel` and `getItemValue`.

Created items are stored only in server memory during the current API session. They are added to the in-memory mock data object and are not persisted back to `items.json`. After restarting the API server, the dataset is reset to the original JSON file.
