import { SelectProvider } from '@/components/Select/shared/context/SelectContext';

const Select = () => {
  return (
    <SelectProvider>
      <div
        role='combobox'
        aria-haspopup='listbox'
        aria-expanded='false'
        aria-controls='select-listbox'
      >
        <div>
          <button type='button'>Select</button>
        </div>
        <div>
          <input
            type='text'
            aria-label='Option Select'
            aria-autocomplete='list'
            aria-controls='select-listbox'
          />
          <ul role='listbox' id='select-listbox' aria-label='Options'>
            <li role='option' aria-selected='true'>
              Option 1
            </li>
            <li role='option' aria-selected='false'>
              Option 2
            </li>
          </ul>
        </div>
      </div>
    </SelectProvider>
  );
};

export default Select;
