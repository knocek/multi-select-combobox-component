# Component API Contract

## Goal

`MultiSelectCombobox` is a reusable React component for selecting multiple items from a predefined list with autocomplete support.

The component is generic and should work with different data types, such as tags, users, addresses or categories.

## Main design decision

The component does not fetch data by itself.

Data flow:

```text
API / local data
↓
parent component or demo page
↓
MultiSelectCombobox props
```

This keeps the component reusable and independent from any specific backend.

## Generic component idea

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
/>
```

## Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| items | `TItem[]` | ✅ | Full list of avaible items |
| selectedItem | `TItem[]` | ✅ | Currently selected items |
| onChange | `(items: TItem[]) => void` | ✅ | Called when selection changes |
| getItemLabel | `(item: TItem) => string` | ✅ | Returns dosplay label for an item |
| getItemValue | `(item: TItem)` => string | ✅ | Returns unique identifier for item |
| ariaLabel | `string` | ✅ | Accessibility for input |
| onCreateItem | `(value: string) => TItem \| Promise<TItem>` |  | Enables creating new items for typed input |

## Required behaviour

- User can search available items.
- User can select multiple items.
- Selected items are visible inside the component.
- Selected items can be removed.
- User can create a new item if it is not found.
- ArrowDown moves to the next suggestion.
- ArrowUp moves to the previous suggestion.
- Enter selects highlighted suggestion or creates a new item.
- Escape closes the suggestion list.
- Backspace allow to delete selected item.
- Component follows accessibility rules for combobox/listbox behavior.
