import {
  Avatar,
  AVATAR_SIZES,
  AVATAR_THEMES,
  AVATAR_VARIANTS,
} from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';

import { default as IconMeta } from '@/stories/internal-ui/Icon.stories';
import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const iconKey = IconMeta.argTypes?.iconKey;

const meta: Meta<typeof Avatar> = {
  title: 'core/internal-ui/Avatar',
  component: Avatar,
  globals: {
    backgrounds: { value: '#f7f8f9', grid: false },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(AVATAR_VARIANTS),
      description: 'Avatar variant',
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(AVATAR_VARIANTS),
          }),
        },
      },
      type: {
        required: true,
        name: 'string',
      },
    },
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
    src: {
      control: 'text',
      description: `Avatar image src ( required: when variant is 'image' )`,
      type: 'string',
    },
    alt: {
      control: 'text',
      description: `Avatar image alt ( optional: when variant is 'image' )`,
      type: 'string',
    },
    fallbackIconKey: {
      ...iconKey,
      control: 'select',
      description: `Avatar fallback icon key ( optional: when variant is 'image' )`,
      table: {
        ...iconKey?.table,
        defaultValue: { summary: 'user' },
      },
      type: {
        required: false,
        name: 'string',
      },
    },
    iconKey: {
      ...iconKey,
      control: 'select',
      description: `Avatar icon key ( required: when variant is 'icon' )`,
      type: {
        required: false,
        name: 'string',
      },
    },
    text: {
      control: 'text',
      description: `Avatar text ( required: when variant is 'text' )`,
      type: 'string',
    },
    theme: {
      control: 'select',
      description: `Avatar theme ( optional: when variant is 'icon' or 'text' )`,
      options: Object.values(AVATAR_THEMES),
      type: 'string',
      table: {
        defaultValue: { summary: AVATAR_THEMES.PRIMARY },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(AVATAR_THEMES),
          }),
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const IconAvatar: Story = {
  args: {
    variant: 'icon',
    iconKey: 'user',
    size: 'sm',
  },
};

export const TextAvatar: Story = {
  args: {
    variant: 'text',
    text: '+7',
    theme: 'gray',
  },
};

export const ImageAvatar: Story = {
  args: {
    variant: 'image',
    alt: '강준영',
    fallbackIconKey: 'user',
    src: 'https://ca.slack-edge.com/T01HSRM9C0Z-U0673TXRU2U-7184f5cfe3fe-512',
  },
};

export const ImageAvatarWithFallbackIcon: Story = {
  args: {
    variant: 'image',
    alt: '강준영',
    fallbackIconKey: 'user',
    src: 'https://404.png',
  },
};

export const AvatarSizes: Story = {
  args: {
    variant: 'icon',
    iconKey: 'user',
    size: 'sm',
  },
  render: (args) => (
    <div className='flex-h-stack items-end gap-x-2'>
      <Avatar {...args} size={AVATAR_SIZES.SM} />
      <Avatar {...args} size={AVATAR_SIZES.MD} />
    </div>
  ),
};
