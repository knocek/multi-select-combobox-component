import { TagsExample } from './examples/TagsExample';
import { AddressesExample } from './examples/AddressesExample';

function App() {
  return (
    <main>
      <h1>MultiSelectCombobox demo</h1>

      <p>
        This demo shows a reusable generic multi-select combobox component connected to a mock API.
      </p>

      <TagsExample />
      <AddressesExample />
    </main>
  );
}

export default App;
