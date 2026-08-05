import {
  COLOR_VARIANTS,
  Typography,
  TYPOGRAPHY_ELEMENTS,
  TYPOGRAPHY_VARIANTS,
} from '@bbodek/biz-ui';
import type { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const meta = {
  title: 'core/biz-ui/Typography',
  component: Typography,
  argTypes: {
    children: {
      control: 'text',
      description: 'Typography Content',
      type: {
        required: true,
        name: 'string',
      },
    },
    as: {
      control: 'select',
      options: Object.values(TYPOGRAPHY_ELEMENTS),
      description: 'Typography Element',
      table: {
        defaultValue: {
          summary: TYPOGRAPHY_ELEMENTS.SPAN,
        },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(TYPOGRAPHY_ELEMENTS),
          }),
        },
      },
    },
    color: {
      control: 'select',
      options: Object.values(COLOR_VARIANTS),
      description: 'Typography Color',
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(COLOR_VARIANTS),
          }),
        },
      },
    },
    variant: {
      control: 'select',
      options: Object.values(TYPOGRAPHY_VARIANTS),
      description: 'Typography Variant',
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(TYPOGRAPHY_VARIANTS),
          }),
        },
      },
    },
    title: {
      control: 'text',
      description: 'Typography title',
      type: 'string',
    },
    id: {
      control: 'text',
      description: 'Typography id',
      type: 'string',
    },
    role: {
      control: 'text',
      description: 'Typography role',
      type: 'string',
    },
    'aria-live': {
      control: 'text',
      description: 'Typography aria-live',
      type: 'string',
    },
    ref: {
      description: 'Typography ref',
      table: {
        type: {
          summary: 'Ref<HTMLElement>',
        },
      },
    },
    className: {
      control: 'text',
      description: 'Typography className',
      type: 'string',
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    children: 'Typography',
    color: COLOR_VARIANTS.GRAY_900,
    variant: TYPOGRAPHY_VARIANTS.BODY,
    as: TYPOGRAPHY_ELEMENTS.SPAN,
  },
};

export const Variants: Story = {
  render: () => (
    <div className='flex-v-stack gap-4'>
      {Object.values(TYPOGRAPHY_VARIANTS).map((variant) => (
        <div className='flex-v-stack gap-1' key={variant}>
          <Typography color={COLOR_VARIANTS.GRAY_500} variant='caption'>
            {variant}
          </Typography>
          <Typography
            as={TYPOGRAPHY_ELEMENTS.P}
            color={COLOR_VARIANTS.GRAY_900}
            variant={variant}
          >
            뽀득 비즈파트너 Bbodek 0123
          </Typography>
        </div>
      ))}
    </div>
  ),
};
