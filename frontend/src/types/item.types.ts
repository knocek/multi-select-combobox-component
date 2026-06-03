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

export type CollectionItem<TCollection extends CollectionName> = CollectionItemMap[TCollection];

export type CreateItemPayload<TCollection extends CollectionName> = CollectionItemMap[TCollection];
