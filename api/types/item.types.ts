// This file defines TypeScript types for items in the mock data collections.

export type Tag = {
  id: string;
  name: string;
};

export type Address = {
  id: string;
  city: string;
  street: string;
};

export type CollectionName = 'tags' | 'addresses';

export type CollectionItemMap = {
  tags: Tag;
  addresses: Address;
};

export type MockData = {
  [K in CollectionName]: CollectionItemMap[K][];
};

export type MockItem = Tag | Address;
