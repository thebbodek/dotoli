import {
  AvatarGroup,
  AvatarGroupItem,
  Flex,
  IconButton,
} from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { default as AvatarMeta } from './Avatar.stories';

const meta: Meta<typeof AvatarGroup> = {
  title: 'core/internal-ui/AvatarGroup',
  component: AvatarGroup,
  globals: AvatarMeta.globals,
  argTypes: {
    items: {
      description: 'Array of avatar objects (each with name, src, type)',
      type: {
        required: true,
        name: 'array',
        value: {
          name: 'object',
          value: {
            name: { name: 'string', required: true },
            type: { name: 'string', required: true },
            src: { name: 'string', required: false },
          },
        },
      },
    },
    total: {
      control: 'number',
      description: 'AvatarGroup total',
      type: 'number',
    },
    tooltipClassName: {
      control: 'text',
      description: 'AvatarGroup tooltip className',
      type: 'string',
    },
  },
};

export default meta;

type Story = StoryObj<typeof AvatarGroup>;

const generateItems = (length: number): AvatarGroupItem[] =>
  Array.from({ length }, (_, index) => `뽀득${index + 1}`).map((name) => ({
    name,
    type: 'single',
  }));

export const Default: Story = {
  args: {
    items: generateItems(5),
  },
  render: (args) => {
    const [length, setLength] = useState(args.items.length);

    return (
      <Flex direction='column' align={{ items: 'center' }} gap={3}>
        <AvatarGroup
          {...args}
          items={generateItems(length)}
          tooltipClassName='max-w-[197px]'
        />
        <Flex gap={1}>
          <IconButton
            iconKey='minus'
            arialLabel='minus'
            theme='bg-white'
            onClick={() => setLength(length - 1)}
          />
          <IconButton
            iconKey='plus'
            arialLabel='plus'
            theme='bg-white'
            onClick={() => setLength(length + 1)}
          />
        </Flex>
      </Flex>
    );
  },
};
