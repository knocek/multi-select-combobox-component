// This file contains the service logic for managing items in the mock data collections.

import data from '../data/items.json';
import type { CollectionItemMap, CollectionName, MockData, MockItem } from '../types/item.types';

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

  return getItems(collection).filter((item) =>
    Object.values(item).some((value) => String(value).toLowerCase().includes(normalizedSearch)),
  );
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function hasStringField(value: Record<string, unknown>, field: string): boolean {
  return typeof value[field] === 'string' && value[field].trim().length > 0;
}

function validateItem(collection: CollectionName, item: unknown): asserts item is MockItem {
  if (!isObject(item)) {
    throw new Error('Request body must be an object.');
  }

  if (!hasStringField(item, 'id')) {
    throw new Error('Field "id" is required and must be a non-empty string.');
  }

  if (collection === 'tags') {
    if (!hasStringField(item, 'name')) {
      throw new Error('Field "name" is required and must be a non-empty string.');
    }

    return;
  }

  if (collection === 'addresses') {
    for (const field of ['city', 'street']) {
      if (!hasStringField(item, field)) {
        throw new Error(`Field "${field}" is required and must be a non-empty string.`);
      }
    }
  }
}

function itemExsists<K extends CollectionName>(
  collection: K,
  itemToCheck: CollectionItemMap[K],
): boolean {
  return mockData[collection].some((existingItem) => {
    if (collection === 'tags') {
      return (
        'name' in existingItem &&
        'name' in itemToCheck &&
        existingItem.name.trim().toLowerCase() === itemToCheck.name.trim().toLowerCase()
      );
    }

    if (collection === 'addresses') {
      return (
        'city' in existingItem &&
        'street' in existingItem &&
        'city' in itemToCheck &&
        'street' in itemToCheck &&
        existingItem.city.trim().toLowerCase() === itemToCheck.city.trim().toLowerCase() &&
        existingItem.street.trim().toLowerCase() === itemToCheck.street.trim().toLowerCase()
      );
    }

    return false;
  });
}

export function createItem<K extends CollectionName>(
  collection: K,
  item: unknown,
): CollectionItemMap[K] {
  validateItem(collection, item);

  const typedItem = item as CollectionItemMap[K];

  if (itemExsists(collection, typedItem)) {
    throw new Error('Item with the same name already exists.');
  }

  mockData[collection].push(typedItem);

  return typedItem;
}
