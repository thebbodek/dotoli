import { Filter, FilterOnChangeParams, FilterProps } from '@bbodek/internal-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof Filter> = {
  title: 'core/internal-ui/Filter',
  component: Filter,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [selectValues, setSelectValues] =
      useState<FilterProps['selectValues']>();
    const [toggleValues, setToggleValues] =
      useState<FilterProps['toggleValues']>();

    const onChange = (value: FilterOnChangeParams) => {
      setSelectValues(value.selectValues);
      setToggleValues(value.toggleValues);
    };

    return (
      <Filter
        toggleValues={toggleValues}
        selectValues={selectValues}
        toggleOptions={[{ label: 'Toggle 1', key: 'toggle1' }]}
        selectOptions={[
          {
            label: 'Select 1',
            key: 'select1',
            type: 'multi_select',
            options: [
              { displayValue: 'Option 1', value: 'option1' },
              { displayValue: 'Option 2', value: 'option2' },
            ],
          },
        ]}
        onChange={onChange}
      />
    );
  },
};
