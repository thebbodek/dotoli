import { ActionChip, ActionChipProps } from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'core/biz-ui/ActionChip',
  component: ActionChip,
  argTypes: {
    label: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    onClick: { action: 'click' },
  },
  args: {
    label: '라벨',
  },
} satisfies Meta<ActionChipProps>;

export default meta;

type Story = StoryObj<ActionChipProps>;

export const Default: Story = {};
