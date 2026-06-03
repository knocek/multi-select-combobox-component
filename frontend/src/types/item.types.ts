export type Tag = {
  id: string;
  name: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type Address = {
  id: string;
  city: string;
  street: string;
  postalCode: string;
};

export type CollectionName = 'tags' | 'users' | 'addresses';

export type CollectionItemMap = {
  tags: Tag;
  users: User;
  addresses: Address;
};

export type CollectionItem<TCollection extends CollectionName> = CollectionItemMap[TCollection];

export type CreateItemPayload<TCollection extends CollectionName> = CollectionItemMap[TCollection];
