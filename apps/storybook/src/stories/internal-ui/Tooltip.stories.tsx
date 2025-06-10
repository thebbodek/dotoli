import { IconButton, Tooltip } from '@bbodek/internal-ui';
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

const meta: Meta<typeof Tooltip> = {
  title: 'core/internal-ui/Tooltip',
  component: Tooltip,
  argTypes: {
    content: {
      control: 'text',
      description: 'Tooltip Content',
      type: {
        required: true,
        name: 'string',
      },
    },
    placement: {
      control: 'select',
      options: placements,
      description: 'Tooltip Placement',
      table: {
        defaultValue: {
          summary: 'top',
        },
        type: {
          summary: generateArgTypeSummary({ options: placements }),
        },
      },
    },
    hidden: {
      control: 'boolean',
      description: 'Hide Tooltip',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: '수정',
    placement: 'top',
    hidden: false,
  },
  render: (args) => (
    <Tooltip {...args}>
      <IconButton iconKey='pencil' arialLabel={'수정'} />
    </Tooltip>
  ),
};
