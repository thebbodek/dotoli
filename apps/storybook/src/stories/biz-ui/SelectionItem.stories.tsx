import {
  Flex,
  SelectionItem,
  SelectionItemProps,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const BOOLEAN_VALUES = [false, true];

const DOCUMENT_FRAME_WIDTH = 'w-[340px]';

const STORES = ['최고의 맛 한식뷔페', '백수저 한식뷔페', '뽀득 판교점'];

const meta = {
  title: 'core/biz-ui/SelectionItem',
  component: SelectionItem,
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
    label: '최고의 맛 한식뷔페',
    checked: false,
    onChange: () => {},
  },
} satisfies Meta<SelectionItemProps>;

export default meta;

type Story = StoryObj<SelectionItemProps>;

export const Default: Story = {
  render: (args) => (
    <Flex className={DOCUMENT_FRAME_WIDTH}>
      <SelectionItem {...args} />
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
          <SelectionItem checked={checked} label={label} onChange={onChange} />
        </Flex>
      ))}
    </Flex>
  ),
};

export const SingleSelect: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const [selected, setSelected] = useState(STORES[0]);

    return (
      <Flex className={DOCUMENT_FRAME_WIDTH} direction='column' gap='8'>
        {STORES.map((store) => (
          <SelectionItem
            checked={selected === store}
            key={store}
            label={store}
            name='stores'
            value={store}
            onChange={() => setSelected(store)}
          />
        ))}
      </Flex>
    );
  },
};

export const LongLabel: Story = {
  parameters: { controls: { disable: true } },
  render: ({ onChange }) => (
    <Flex className={DOCUMENT_FRAME_WIDTH} direction='column' gap='8'>
      {BOOLEAN_VALUES.map((checked) => (
        <SelectionItem
          checked={checked}
          key={`long-${checked}`}
          label='최고의 맛 한식뷔페 강남역 2호점 본관 지하 1층'
          onChange={onChange}
        />
      ))}
    </Flex>
  ),
};
