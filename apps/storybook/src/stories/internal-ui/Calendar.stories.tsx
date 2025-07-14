import { Calendar } from '@bbodek/internal-ui';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'core/internal-ui/Calendar',
  component: Calendar,
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: (args) => <Calendar />,
};
