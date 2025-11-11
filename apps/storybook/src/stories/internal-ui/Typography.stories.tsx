import {
  COLOR_VARIANTS,
  Typography,
  TYPOGRAPHY_ELEMENTS,
  TYPOGRAPHY_VARIANTS,
} from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const meta = {
  title: 'core/internal-ui/Typography',
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
          summary: 'span',
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
    id: {
      control: 'text',
      description: 'Typography ID',
      type: 'string',
    },
    title: {
      control: 'text',
      description: 'Typography title',
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
    color: 'black',
    variant: 'body-16-r',
    as: 'span',
  },
};
