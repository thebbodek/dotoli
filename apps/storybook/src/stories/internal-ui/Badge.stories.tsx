import {
  Badge,
  BADGE_THEMES,
  BADGE_VARIANTS,
  INFO_BADGE_SIZES,
  INFO_BADGE_THEMES,
  InfoBadge,
} from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';

import { default as IconMeta } from './Icon.stories';
import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const { iconKey } = IconMeta.argTypes ?? {};

const meta = {
  title: 'core/internal-ui/Badge',
  component: Badge,
  argTypes: {
    label: {
      control: 'text',
      description: 'Badge Label',
      type: {
        required: true,
        name: 'string',
      },
    },
    variant: {
      control: 'select',
      options: Object.values(BADGE_VARIANTS),
      description: 'Badge Variant',
      table: {
        defaultValue: {
          summary: BADGE_VARIANTS.STATUS,
        },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(BADGE_VARIANTS),
          }),
        },
      },
    },
    theme: {
      control: 'select',
      options: Object.values(BADGE_THEMES),
      description: 'Badge Color',
      table: {
        defaultValue: {
          summary: BADGE_THEMES.PRIMARY,
        },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(BADGE_THEMES),
          }),
        },
      },
    },
    iconKey: {
      ...iconKey,
      type: {
        required: false,
        name: 'string',
      },
    },
    className: {
      control: 'text',
      description: 'Badge className',
      type: 'string',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    label: '진행중',
    variant: BADGE_VARIANTS.STATUS,
    theme: BADGE_THEMES.PRIMARY,
  },
};

export const VariantsAndColors: Story = {
  args: {
    label: 'Badge',
    variant: BADGE_VARIANTS.FILLED,
    theme: BADGE_THEMES.PRIMARY,
  },
  render: (args) => (
    <ul className='grid grid-cols-5 gap-4'>
      {Object.values(BADGE_VARIANTS).map((variant) =>
        Object.values(BADGE_THEMES).map((theme) => (
          <Badge
            {...args}
            iconKey='shield-check'
            key={`${variant}-${theme}`}
            theme={theme}
            variant={variant}
          />
        )),
      )}
    </ul>
  ),
};

export const InfoBadgeStories: Story = {
  render: () => {
    const sizeOrder = [INFO_BADGE_SIZES.MD, INFO_BADGE_SIZES.SM];

    return (
      <ul className='grid grid-cols-6 gap-4'>
        {sizeOrder.map((size) =>
          Object.values(INFO_BADGE_THEMES).map((theme) => (
            <InfoBadge
              key={`info-${theme}-${size}`}
              label='Info'
              size={size}
              theme={theme}
              variant='info'
            />
          )),
        )}
        {sizeOrder.map((size) =>
          Object.values(INFO_BADGE_THEMES).map((theme) => (
            <InfoBadge
              key={`circle-${theme}-${size}`}
              label='2'
              size={size}
              theme={theme}
              variant='circle'
            />
          )),
        )}
        {sizeOrder.map((size) =>
          Object.values(INFO_BADGE_THEMES).map((theme) => (
            <InfoBadge
              key={`circle-soft-${theme}-${size}`}
              label='2'
              size={size}
              theme={theme}
              variant='circle-soft'
            />
          )),
        )}
      </ul>
    );
  },
};
