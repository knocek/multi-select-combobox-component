import { useEffect, useState } from 'react';

import { MultiSelectCombobox } from '../components/MultiSelectCombobox/MultiSelectCombobox';
import { createItem, fetchItems } from '../services/itemApi';
import type { Tag } from '../types/item.types';

export function TagsExample() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTags() {
      try {
        const data = await fetchItems('tags');
        setTags(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not load tags.');
      }
    }

    loadTags();
  }, []);

  return (
    <section>
      <h2>Tags example</h2>
      <p>Simple example using tag objects with id and name.</p>

      {error && <p>{error}</p>}

      <MultiSelectCombobox<Tag>
        items={tags}
        selectedItems={selectedTags}
        onChange={setSelectedTags}
        getItemLabel={(tag) => tag.name}
        getItemValue={(tag) => tag.id}
        placeholder="Search tags..."
        ariaLabel="Select tags"
        onCreateItem={async (inputValue) => {
          const newTag = await createItem('tags', {
            id: `tag-${Date.now()}`,
            name: inputValue,
          });

          setTags((currentTags) => [...currentTags, newTag]);

          return newTag;
        }}
      />

      {/* <h3>Selected tags</h3>*/}
      {/*debug for selected tags */}

      {/*

      {selectedTags.length > 0 ? (
        <pre>{JSON.stringify(selectedTags, null, 2)}</pre>
      ) : (
        <p>No tags selected yet.</p>
      )}
      
      */}
    </section>
  );
}
