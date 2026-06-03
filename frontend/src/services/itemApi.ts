import type { CollectionItem, CollectionName, CreateItemPayload } from '../types/item.types';

// in a real app we should use .env
const API_BASE_URL = 'http://localhost:5000';

type ApiErrorResponse = {
  message?: string;
};

async function requestJson<TResponse>(endpoint: string, options?: RequestInit): Promise<TResponse> {
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
  const endpoint = queryString ? `/items/${collection}?${queryString}` : `/items/${collection}`;

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
