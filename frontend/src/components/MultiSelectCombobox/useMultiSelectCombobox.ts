import { useState } from 'react';

type UseMultiSelectComboboxParams<TItem> = {
  items: TItem[];
  selectedItems: TItem[];
  onChange: (selectedItems: TItem[]) => void;
  getItemLabel: (item: TItem) => string;
  getItemValue: (item: TItem) => string;
  onCreateItem?: (inputValue: string) => TItem | Promise<TItem>;
  maxSelected?: number;
};

export function useMultiSelectCombobox<TItem>({
  items,
  selectedItems,
  onChange,
  getItemLabel,
  getItemValue,
  onCreateItem,
  maxSelected,
}: UseMultiSelectComboboxParams<TItem>) {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [isCreating, setIsCreating] = useState(false);

  const selectedValues = new Set(selectedItems.map(getItemValue));

  const availableItems = items.filter((item) => !selectedValues.has(getItemValue(item)));

  const normalizedInput = inputValue.trim();

  const filteredItems = availableItems.filter((item) =>
    getItemLabel(item).toLowerCase().includes(normalizedInput.toLowerCase()),
  );

  const canSelectMore = maxSelected === undefined || selectedItems.length < maxSelected;

  const canCreateItem =
    Boolean(onCreateItem) &&
    normalizedInput.length > 0 &&
    filteredItems.length === 0 &&
    canSelectMore;

  const inlineSuggestion = filteredItems[0] ? getItemLabel(filteredItems[0]) : '';

  const autoCompleteValue =
    inputValue && inlineSuggestion.toLowerCase().startsWith(inputValue.toLowerCase())
      ? inlineSuggestion.slice(inputValue.length)
      : '';

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

  async function handleCreateItem() {
    if (!canCreateItem || !canCreateItem) {
      return;
    }

    try {
      setIsCreating(true);
      const createdItem = await onCreateItem(normalizedInput);
      onChange([...selectedItems, createdItem]);
      setInputValue('');
      closeDropdown();
    } finally {
      setIsCreating(false);
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

    if (event.key == 'Backspace' && inputValue === '') {
      event.preventDefault();

      if (selectedItems.length > 0) {
        handleRemoveItem(selectedItems[selectedItems.length - 1]);
      }
    }

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
    canCreateItem,
    isCreating,
    handleCreateItem,
    autoCompleteValue,
    inlineSuggestion,
  };
}
