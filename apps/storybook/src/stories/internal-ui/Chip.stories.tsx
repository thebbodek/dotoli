import { Chip, ChipGroup } from '@bbodek/internal-ui';
import { Meta } from '@storybook/react';
import { useRef } from 'react';

const meta: Meta<typeof Chip> = {
  title: 'core/internal-ui/Chip',
  component: Chip,
  argTypes: {
    label: {
      description: 'Chip label',
      control: 'text',
      type: 'string',
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
    ariaLabel: {
      description: 'Chip a11y label',
      control: 'text',
      type: 'string',
    },
    onClick: { action: 'clicked', type: 'function' },
  },
};

export default meta;

export const Default = {
  args: {
    label: '뽀득 고등학교',
    onClick: () => alert('clicked'),
  },
};

export const WithGroup = {
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
