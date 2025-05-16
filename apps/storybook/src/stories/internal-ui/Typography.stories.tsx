import {
  colorVariants,
  Typography,
  TYPOGRAPHY_ELEMENTS,
  TypographyProps,
  typographyVariants,
} from '@bbodek/internal-ui';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof Typography> = {
  title: 'core/internal-ui/Typography',
  component: Typography,
  argTypes: {
    children: {
      control: 'text',
      description: 'typography content',
      type: 'string',
    },
    color: {
      control: 'select',
      options: colorVariants,
      description: 'typography color',
      type: 'string',
      table: {
        defaultValue: {
          summary: 'black',
        },
      },
    },
    variant: {
      control: 'select',
      options: typographyVariants,
      description: 'typography variant',
      type: 'string',
      table: {
        defaultValue: {
          summary: 'body-16-r',
        },
      },
    },
    as: {
      control: 'select',
      options: Object.values(TYPOGRAPHY_ELEMENTS),
      description: 'typography element',
      type: 'string',
      table: {
        defaultValue: {
          summary: 'span',
        },
      },
    },
  },
  args: {
    children: 'Typography',
    color: 'black',
    variant: 'body-16-r',
    as: 'span',
  },
};

export default meta;

export const Default = (props: TypographyProps) => {
  return <Typography {...props} />;
};
