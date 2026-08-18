import {
  Flex,
  ItemCheckbox,
  ItemCheckboxProps,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const BOOLEAN_VALUES = [false, true];

const DOCUMENT_FRAME_WIDTH = 'w-[340px]';

const ACCOUNTS = ['최고의 맛 한식뷔페', '뽀득 강남점', '뽀득 판교점'];

const meta = {
  title: 'core/biz-ui/ItemCheckbox',
  component: ItemCheckbox,
  argTypes: {
    label: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    checked: {
      control: 'boolean',
      type: { name: 'boolean', required: true },
    },
  },
  args: {
    label: '계정명',
    checked: false,
    onChange: () => {},
  },
} satisfies Meta<ItemCheckboxProps>;

export default meta;

type Story = StoryObj<ItemCheckboxProps>;

export const Default: Story = {
  render: (args) => (
    <Flex className={DOCUMENT_FRAME_WIDTH}>
      <ItemCheckbox {...args} />
    </Flex>
  ),
};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: ({ label, onChange }) => (
    <Flex className={DOCUMENT_FRAME_WIDTH} direction='column' gap='12'>
      {BOOLEAN_VALUES.map((checked) => (
        <Flex direction='column' gap='8' key={`checked-${checked}`}>
          <Typography color='gray-500' variant='label-bold'>
            checked = {String(checked)}
          </Typography>
          <ItemCheckbox checked={checked} label={label} onChange={onChange} />
        </Flex>
      ))}
    </Flex>
  ),
};

export const MultiSelect: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const [selected, setSelected] = useState<string[]>([ACCOUNTS[1]]);

    return (
      <Flex className={DOCUMENT_FRAME_WIDTH} direction='column' gap='8'>
        {ACCOUNTS.map((account) => (
          <ItemCheckbox
            checked={selected.includes(account)}
            key={account}
            label={account}
            name='accounts'
            value={account}
            onChange={({ target }) =>
              setSelected((prev) =>
                target.checked
                  ? [...prev, account]
                  : prev.filter((item) => item !== account),
              )
            }
          />
        ))}
      </Flex>
    );
  },
};
