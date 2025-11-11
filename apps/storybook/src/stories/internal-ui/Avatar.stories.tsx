import { Avatar, AVATAR_SIZES, AVATAR_TYPES } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const meta = {
  title: 'core/internal-ui/Avatar',
  component: Avatar,
  globals: {
    backgrounds: { value: '#f7f8f9', grid: false },
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(AVATAR_SIZES),
      description: 'Avatar size',
      table: {
        defaultValue: { summary: AVATAR_SIZES.SM },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(AVATAR_SIZES),
          }),
        },
      },
    },
    type: {
      control: 'select',
      options: Object.values(AVATAR_TYPES),
      description: 'Avatar type',
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(AVATAR_TYPES),
          }),
        },
      },
      type: {
        required: true,
        name: 'string',
      },
    },
    src: {
      control: 'text',
      description: `Avatar image src`,
      type: 'string',
    },
    alt: {
      control: 'text',
      description: `Avatar image alt`,
      type: 'string',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    alt: '김뽀득',
    src: 'https://image.thebbodek.com/logo/logo-color-symbol-bg.png',
    type: AVATAR_TYPES.SINGLE,
    size: AVATAR_SIZES.SM,
  },
};

export const AvatarOnImageError: Story = {
  args: {
    alt: '김뽀득',
    src: 'https://ca.slack-edge.com/404-test.png',
    type: AVATAR_TYPES.SINGLE,
    size: AVATAR_SIZES.SM,
  },
};

export const AvatarSizes: Story = {
  render: ({ type, ...args }) => (
    <div className='in-flex-h-stack items-end gap-x-2'>
      <Avatar {...args} type={type ?? 'single'} size={AVATAR_SIZES.SM} />
      <Avatar {...args} type={type ?? 'single'} size={AVATAR_SIZES.MD} />
    </div>
  ),
};
