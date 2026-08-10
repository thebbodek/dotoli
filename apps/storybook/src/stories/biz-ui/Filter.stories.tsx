import {
  Filter,
  FILTER_STATES,
  FilterProps,
  Flex,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { default as IconMeta } from '@/stories/biz-ui/Icon.stories';

const { iconKey: iconKeyArgType } = IconMeta.argTypes ?? {};

export interface FilterArgs extends Omit<FilterProps, 'iconOption'> {
  iconKey: NonNullable<FilterProps['iconOption']>['iconKey'];
}

const meta = {
  title: 'core/biz-ui/Button/Filter',
  component: Filter,
  argTypes: {
    label: {
      control: 'text',
      type: {
        name: 'string',
        required: true,
      },
    },
    isSelected: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    iconKey: {
      ...iconKeyArgType,
      type: { name: 'string', required: false },
      table: { subcategory: 'iconOption' },
    },
  },
  args: {
    label: '필터',
    iconKey: 'list-star',
  },
} satisfies Meta<FilterArgs>;

export default meta;

type Story = StoryObj<FilterArgs>;

export const Default: Story = {
  render: ({ iconKey, ...args }) => (
    <Filter {...args} iconOption={{ iconKey }} />
  ),
};

export const Interactive: Story = {
  parameters: { controls: { disable: true } },
  render: ({ label, iconKey }) => {
    const [isSelected, setIsSelected] = useState(false);

    return (
      <Filter
        iconOption={{ iconKey }}
        isSelected={isSelected}
        label={label}
        onClick={() => setIsSelected(!isSelected)}
      />
    );
  },
};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: ({ label, iconKey }) => (
    <Flex align={{ items: 'start' }} gap='24'>
      {Object.values(FILTER_STATES).map((state) => (
        <Flex
          align={{ items: 'start' }}
          direction='column'
          gap='12'
          key={state}
        >
          <Typography color='gray-500' variant='label-bold'>
            state = {state}
          </Typography>
          <Filter
            iconOption={{ iconKey }}
            isSelected={state === FILTER_STATES.SELECTED}
            label={label}
          />
        </Flex>
      ))}
    </Flex>
  ),
};
