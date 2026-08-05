import { Icon, ICON_WEIGHTS } from '@bbodek/biz-ui';
import { icons } from '@phosphor-icons/core';
import { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const meta = {
  title: 'core/biz-ui/Icon',
  component: Icon,
  argTypes: {
    iconKey: {
      control: 'select',
      options: icons.map((icon) => icon.name),
      description: '@phosphor-icons/web icon name',
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: icons.map((icon) => icon.name),
          }),
        },
      },
      type: {
        name: 'string',
        required: true,
      },
    },
    weight: {
      control: 'select',
      options: Object.values(ICON_WEIGHTS),
      description:
        'Icon weight. Figma 아이콘 세트가 정의한 3종만 노출합니다 (regular · bold · fill)',
      type: 'string',
      table: {
        defaultValue: {
          summary: ICON_WEIGHTS.BOLD,
        },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(ICON_WEIGHTS),
          }),
        },
      },
    },
    title: {
      control: 'text',
      description: 'Icon title',
      type: 'string',
    },
    'aria-hidden': {
      control: 'boolean',
      description: 'Icon aria-hidden',
      type: 'boolean',
    },
    className: {
      control: 'text',
      description: 'Icon className',
      type: 'string',
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    iconKey: 'plus',
  },
};

export const Weights: Story = {
  render: () => (
    <div className='flex-h-stack items-center gap-6'>
      {Object.values(ICON_WEIGHTS).map((weight) => (
        <div className='flex-v-stack items-center gap-2' key={weight}>
          <Icon
            className='text-2xl text-blue-500'
            iconKey='plus'
            weight={weight}
          />
          <span className='text-caption text-gray-600'>{weight}</span>
        </div>
      ))}
    </div>
  ),
};
