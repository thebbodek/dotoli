import { Badge, BADGE_THEMES, BADGE_VARIANTS } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';
import { default as IconMeta } from './Icon.stories';

const { iconKey } = IconMeta.argTypes ?? {};

const meta: Meta<typeof Badge> = {
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
  },
};

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
            variant={variant}
            theme={theme}
            key={`${variant}-${theme}`}
          />
        )),
      )}
    </ul>
  ),
};

export const WithIcon: Story = {
  args: {
    label: 'Badge',
    variant: BADGE_VARIANTS.FILLED,
    theme: BADGE_THEMES.PRIMARY,
  },
  render: (args) => (
    <ul className='grid grid-cols-5 gap-4'>
      {Object.values(BADGE_VARIANTS)
        .filter((variant) => variant !== BADGE_VARIANTS.STATUS)
        .map((variant) =>
          Object.values(BADGE_THEMES).map((theme) => (
            <Badge
              {...args}
              variant={variant}
              theme={theme}
              key={`${variant}-${theme}`}
              iconKey='shield-check'
            />
          )),
        )}
    </ul>
  ),
};
