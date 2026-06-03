// Inlined type to avoid missing external declaration file
export interface MultiSelectComboboxProps<TItem> {
  items: TItem[];
  selectedItems: TItem[];
  onChange: (items: TItem[]) => void;
  getItemLabel: (item: TItem) => string;
  getItemValue: (item: TItem) => string | number;
  onCreateItem?: (value: string) => Promise<TItem> | TItem | void;
  placeholder?: string;
  ariaLabel?: string;
  disabled?: boolean;
  loading?: boolean;
  maxSelected?: number;
}
import { useMultiSelectCombobox } from './useMultiSelectCombobox';

import './MultiSelectCombobox.css';

export function MultiSelectCombobox<TItem>({
  items,
  selectedItems,
  onChange,
  getItemLabel,
  getItemValue,
  onCreateItem,
  placeholder = 'Search...',
  ariaLabel,
  disabled = false,
  loading = false,
  maxSelected,
}: MultiSelectComboboxProps<TItem>) {
  const {
    inputValue,
    isOpen,
    highlightedIndex,
    filteredItems,
    canSelectMore,
    canCreateItem,
    isCreating,
    handleInputChange,
    handleKeyDown,
    handleSelectItem,
    handleRemoveItem,
    handleCreateItem,
    openDropdown,
    autoCompleteValue,
    inlineSuggestion,
  } = useMultiSelectCombobox({
    items,
    selectedItems,
    onChange,
    getItemLabel,
    getItemValue,
    maxSelected,
    onCreateItem,
  });

  const listboxId = 'multi-select-combobox-listbox';
  const activeOptionId =
    highlightedIndex >= 0 && filteredItems[highlightedIndex]
      ? `multi-select-combobox-option-${getItemValue(filteredItems[highlightedIndex])}`
      : undefined;

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
              x
            </button>
          </span>
        ))}

        <div className="multi-select-combobox__input-wrapper">
          {inlineSuggestion && (
            <span className="multi-select-combobox__inline-suggestion" aria-hidden="true">
              <span className="multi-select-combobox__inline-value">{inputValue}</span>
              <span className="multi-select-combobox__inline-completion">{autoCompleteValue}</span>
            </span>
          )}

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
        </div>
      </div>

      {loading && (
        <p className="multi-select-combobox__status" role="status">
          Loading...
        </p>
      )}

      {!loading && isOpen && inputValue && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={`${ariaLabel} suggestions`}
          className="multi-select-combobox__list"
        >
          {filteredItems.map((item, index) => {
            const optionId = `multi-select-combobox-option-${getItemValue(item)}`;

            return (
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
              </li>
            );
          })}

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

          {filteredItems.length === 0 && !canCreateItem && (
            <li className="multi-select-combobox__empty" role="status">
              No results found.
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
