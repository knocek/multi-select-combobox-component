import { TagsExample } from './examples/TagsExample';
import { AddressesExample } from './examples/AddressesExample';

function App() {
  return (
    <main>
      <h1>MultiSelectCombobox demo</h1>

      <p>
        This demo shows a reusable generic multi-select combobox component connected to a mock API.
      </p>

      <div className="mockup-example">
        <TagsExample />
      </div>

      <div className="mockup-example">
        <AddressesExample />
      </div>
    </main>
  );
}

export default App;
