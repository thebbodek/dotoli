import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';
import {
  COLOR_VARIANTS,
  Typography,
  TYPOGRAPHY_ELEMENTS,
  TYPOGRAPHY_VARIANTS,
} from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const meta: Meta<typeof Typography> = {
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
    id: {
      control: 'text',
      description: 'Typography ID',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    color: {
      control: 'select',
      options: Object.values(COLOR_VARIANTS),
      description: 'Typography Color',
      table: {
        defaultValue: {
          summary: 'black',
        },
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
        defaultValue: {
          summary: 'body-16-r',
        },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(TYPOGRAPHY_VARIANTS),
          }),
        },
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
  },
};

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
