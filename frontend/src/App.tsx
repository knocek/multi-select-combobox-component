import { useEffect, useState } from 'react';

import { MultiSelectCombobox } from './components/MultiSelectCombobox/MultiSelectCombobox';
import { createItem, fetchItems } from './services/itemApi';
import type { Tag } from './types/item.types';

import './App.css';

function App() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  useEffect(() => {
    async function loadTags() {
      const data = await fetchItems('tags');
      setTags(data);
    }

    loadTags();
  }, []);

  return (
    <main>
      <h1>MultiSelectCombobox test</h1>

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

      <h2>Selected tags</h2>
      <pre>{JSON.stringify(selectedTags, null, 2)}</pre>
    </main>
  );
}

export default App;
