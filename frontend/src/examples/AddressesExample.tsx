import { useEffect, useState } from 'react';

import { MultiSelectCombobox } from '../components/MultiSelectCombobox/MultiSelectCombobox';
import { createItem, fetchItems } from '../services/itemApi';
import type { Address } from '../types/item.types';

function trimStreetNumbers(value: string): string {
  return value.replace(/\s*\d+.*$/, '').trim();
}

export function AddressesExample() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddresses, setSelectedAddresses] = useState<Address[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadAddresses() {
      try {
        const data = await fetchItems('addresses');
        setAddresses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not load addresses.');
      }
    }

    loadAddresses();
  }, []);

  return (
    <section>
      <h2>Addresses example</h2>
      <p>Example using address objects. Street numbers are trimmed automatically.</p>

      {error && <p>{error}</p>}

      <MultiSelectCombobox<Address>
        items={addresses}
        selectedItems={selectedAddresses}
        onChange={setSelectedAddresses}
        getItemLabel={(address) => `${address.city}, ${address.street}`}
        getItemValue={(address) => address.id}
        placeholder="Search addresses..."
        ariaLabel="Select addresses"
        onCreateItem={async (inputValue) => {
          const [city = '', street = ''] = inputValue.split(',').map((s) => s.trim());

          const newAddress = await createItem('addresses', {
            id: `address-${Date.now()}`,
            city,
            street: trimStreetNumbers(street),
          });

          setAddresses((current) => [...current, newAddress]);

          return newAddress;
        }}
      />

      <h3>Selected addresses</h3>

      {selectedAddresses.length > 0 ? (
        <pre>{JSON.stringify(selectedAddresses, null, 2)}</pre>
      ) : (
        <p>No addresses selected yet.</p>
      )}
    </section>
  );
}
