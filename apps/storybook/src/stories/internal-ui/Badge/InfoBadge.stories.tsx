import { InfoBadge } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const INFO_BADGE_VARIANTS = {
  INFO: 'info',
  CIRCLE: 'circle',
  CIRCLE_SOFT: 'circle-soft',
} as const;

const INFO_BADGE_THEMES = {
  GRAY: 'gray',
  PRIMARY: 'primary',
  GREEN: 'green',
  YELLOW: 'yellow',
  RED: 'red',
  BLUR: 'blur',
} as const;

const INFO_BADGE_SIZES = {
  SM: 'sm',
  MD: 'md',
} as const;

const meta = {
  title: 'core/internal-ui/Badge/InfoBadge',
  component: InfoBadge,
  argTypes: {
    label: {
      control: 'text',
      description: 'InfoBadge Label',
      type: {
        required: true,
        name: 'string',
      },
    },
    variant: {
      control: 'select',
      options: Object.values(INFO_BADGE_VARIANTS),
      description: 'InfoBadge Variant',
      table: {
        defaultValue: {
          summary: INFO_BADGE_VARIANTS.INFO,
        },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(INFO_BADGE_VARIANTS),
          }),
        },
      },
    },
    theme: {
      control: 'select',
      options: Object.values(INFO_BADGE_THEMES),
      description: 'InfoBadge Color',
      table: {
        defaultValue: {
          summary: INFO_BADGE_THEMES.PRIMARY,
        },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(INFO_BADGE_THEMES),
          }),
        },
      },
    },
    size: {
      control: 'select',
      options: Object.values(INFO_BADGE_SIZES),
      description: 'InfoBadge Size',
      table: {
        defaultValue: {
          summary: INFO_BADGE_SIZES.MD,
        },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(INFO_BADGE_SIZES),
          }),
        },
      },
    },
    className: {
      control: 'text',
      description: 'InfoBadge className',
      type: 'string',
    },
  },
} satisfies Meta<typeof InfoBadge>;

export default meta;

type Story = StoryObj<typeof InfoBadge>;

export const Default: Story = {
  args: {
    label: 'Info',
    variant: INFO_BADGE_VARIANTS.INFO,
    theme: INFO_BADGE_THEMES.PRIMARY,
    size: INFO_BADGE_SIZES.MD,
  },
};

export const VariantsThemesAndSizes: Story = {
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
              variant={INFO_BADGE_VARIANTS.INFO}
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
              variant={INFO_BADGE_VARIANTS.CIRCLE}
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
              variant={INFO_BADGE_VARIANTS.CIRCLE_SOFT}
            />
          )),
        )}
      </ul>
    );
  },
};
