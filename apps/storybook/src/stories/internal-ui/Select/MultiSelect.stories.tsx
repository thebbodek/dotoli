import { MultiSelect, MultiSelectListItemProps } from '@bbodek/internal-ui';
import { highlightText } from '@bbodek/utils';
import { Meta, StoryObj } from '@storybook/react';
import clsx from 'clsx';
import { ChangeEvent, useState } from 'react';

const items = [
  'BD-01-0001',
  'BD-01-0002',
  'BD-01-0003',
  'BD-01-0004',
  'BD-01-0005',
  'BD-01-0006',
  'BD-01-0007',
  'BD-01-0008',
  'BD-01-0009',
  'BD-01-0010',
];

const meta: Meta<typeof MultiSelect> = {
  title: 'core/internal-ui/Select/MultiSelect',
  component: MultiSelect,
  argTypes: {
    searchPanel: {
      description: 'MultiSelect search panel',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
      type: {
        name: 'other',
        value: 'ReactNode',
        required: true,
      },
    },
    selectedPanel: {
      description: 'MultiSelect selected panel',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
      type: {
        name: 'other',
        value: 'ReactNode',
        required: true,
      },
    },
    onSelect: {
      action: 'clicked',
      description: 'MultiSelect select item function',
      type: {
        name: 'function',
        required: true,
      },
    },
    onRemove: {
      action: 'clicked',
      description: 'MultiSelect remove item function',
      type: {
        name: 'function',
        required: true,
      },
    },
    onAllSelect: {
      action: 'changed',
      description: 'MultiSelect all select function',
      type: {
        name: 'function',
        required: true,
      },
    },
    selectedValues: {
      description: 'MultiSelect selected values',
      type: {
        name: 'other',
        value: '(string | number | null)[]',
        required: true,
      },
      table: {
        type: {
          summary: '(string | number | null)[]',
        },
      },
    },
    inputOption: {
      description: 'MultiSelect input option',
      type: {
        name: 'other',
        value: 'object',
        required: true,
      },
      table: {
        type: {
          summary: 'object',
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof MultiSelect>;

export const Default: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [searchValue, setSearchValue] = useState('');

    const onRemove = ({
      value,
    }: Pick<MultiSelectListItemProps<string>, 'value'>) => {
      setSelectedValues((prev) => prev.filter((v) => v !== value));
    };

    const onSelect = ({
      value,
    }: Pick<MultiSelectListItemProps<string>, 'value'>) => {
      setSelectedValues((prev) => [...prev, value]);
    };

    const _items = !searchValue
      ? items
      : items.filter((item) =>
          item.toLowerCase().includes(searchValue.toLowerCase()),
        );

    const onAllSelect = () => {
      const isAllSelected = selectedValues.length === items.length;

      setSelectedValues(!isAllSelected ? items : []);
    };

    return (
      <MultiSelect
        onSelect={onSelect}
        onRemove={onRemove}
        onAllSelect={onAllSelect}
        selectedValues={selectedValues}
        inputOption={{
          value: searchValue,
          onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setSearchValue(e.target.value),
        }}
        searchPanel={
          <>
            <MultiSelect.ListHeader count={_items.length} />
            <MultiSelect.List>
              {_items.map((item) => {
                const selected = selectedValues.includes(item);

                return (
                  <MultiSelect.ListItem
                    key={item}
                    value={item}
                    heightClassName='h-[2rem]'
                  >
                    <MultiSelect.OptionsLabel>
                      {highlightText({ text: item, targetText: searchValue })}
                    </MultiSelect.OptionsLabel>
                    <MultiSelect.CheckIcon
                      activeClassName={clsx(selected && 'text-primary-06')}
                    />
                  </MultiSelect.ListItem>
                );
              })}
            </MultiSelect.List>
          </>
        }
        selectedPanel={
          <MultiSelect.SelectedList>
            {selectedValues.map((value) => (
              <MultiSelect.SelectedListItem
                key={`${value}-selected`}
                label={value}
                value={value}
              />
            ))}
          </MultiSelect.SelectedList>
        }
      />
    );
  },
};
