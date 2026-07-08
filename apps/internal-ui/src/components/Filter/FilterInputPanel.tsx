import FilterSelectButton from '@/components/Filter/FilterSelectButton';
import useFilterInputPanel from '@/components/Filter/hooks/useFilterInputPanel';
import { Flex } from '@/components/Flex';
import { InputField } from '@/components/Input';

const FilterInputPanel = () => {
  const {
    models: { label, inputValue, placeholder, regCallback },
    operations: { onChange, onSubmit },
    status: { isDisabled },
  } = useFilterInputPanel();

  return (
    <Flex
      className='in-tablet:min-w-[23.75rem] mx-auto w-[22.5rem]'
      direction='column'
    >
      <div className='p-4'>
        <InputField
          label={label}
          placeholder={placeholder}
          regCallback={regCallback}
          value={inputValue}
          hiddenLabel
          onChange={onChange}
        />
      </div>
      <FilterSelectButton disabled={isDisabled} onClick={onSubmit} />
    </Flex>
  );
};

export default FilterInputPanel;
