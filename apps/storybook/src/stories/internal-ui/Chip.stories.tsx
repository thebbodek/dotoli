import { Chip, ChipGroup } from '@bbodek/internal-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';

const meta = {
  title: 'core/internal-ui/Chip',
  component: Chip,
  argTypes: {
    label: {
      description: 'Chip label',
      control: 'text',
      type: { name: 'string', required: true },
    },
    disabled: {
      description: 'Chip disabled',
      control: 'boolean',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    'aria-label': {
      description: 'Chip a11y label',
      control: 'text',
      type: 'string',
    },
    onClick: { action: 'clicked', type: 'function' },
    className: {
      description: 'Chip className',
      control: 'text',
      type: 'string',
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    label: '뽀득 고등학교',
    onClick: () => alert('clicked'),
  },
};

export const WithGroup: Story = {
  render: () => {
    const ref = useRef<HTMLUListElement | null>(null);
    const data = ['뽀득 고등학교', '뽀득 중학교', '뽀득 초등학교'];

    return (
      <ChipGroup ref={ref}>
        {data.map((label) => (
          <Chip label={label} onClick={() => alert('clicked')} />
        ))}
      </ChipGroup>
    );
  },
};
