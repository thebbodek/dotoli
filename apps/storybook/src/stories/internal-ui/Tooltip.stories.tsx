import { Button, COLOR_VARIANTS, Tooltip } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const placements = [
  'top',
  'top-start',
  'top-end',
  'right',
  'right-start',
  'right-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
];

const meta = {
  title: 'core/internal-ui/Tooltip',
  component: Tooltip,
  argTypes: {
    content: {
      control: 'object',
      description: 'Tooltip content',
      type: {
        required: true,
        name: 'other',
        value: 'ReactNode',
      },
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
    placement: {
      control: 'select',
      options: placements,
      description: 'Tooltip placement',
      table: {
        defaultValue: {
          summary: 'top',
        },
        type: {
          summary: generateArgTypeSummary({ options: placements }),
        },
      },
    },
    isKeepFloating: {
      control: 'boolean',
      description: 'Tooltip keep floating',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    hidden: {
      control: 'boolean',
      description: 'Tooltip hide',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    color: {
      control: 'select',
      options: Object.values(COLOR_VARIANTS),
      description: 'Tooltip color',
      table: {
        defaultValue: {
          summary: COLOR_VARIANTS.WHITE,
        },
      },
    },
    id: {
      control: 'text',
      description: 'Tooltip id',
      type: 'string',
    },
    ariaLive: {
      control: 'text',
      description: 'Tooltip aria-live',
      type: 'string',
    },
    role: {
      control: 'text',
      description: 'Tooltip role',
      type: 'string',
    },
    gap: {
      control: 'number',
      description: 'Tooltip gap',
      type: 'number',
      table: {
        defaultValue: {
          summary: '4',
        },
      },
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'hello world',
    placement: 'top',
    hidden: false,
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button label='Hover Me' />
    </Tooltip>
  ),
};
