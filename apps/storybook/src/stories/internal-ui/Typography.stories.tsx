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
      description: 'Typography Content',
      type: {
        required: true,
        name: 'string',
      },
    },
    id: {
      control: 'text',
      description: 'Typography ID',
      type: 'string',
    },
    color: {
      control: 'select',
      options: colorVariants,
      description: 'Typography Color',
      type: 'string',
      table: {
        defaultValue: {
          summary: 'black',
        },
        type: {
          summary: `'${Object.values(colorVariants).join("' | '")}'`,
        },
      },
    },
    variant: {
      control: 'select',
      options: typographyVariants,
      description: 'Typography Variant',
      type: 'string',
      table: {
        defaultValue: {
          summary: 'body-16-r',
        },
        type: {
          summary: `'${Object.values(typographyVariants).join("' | '")}'`,
        },
      },
    },
    as: {
      control: 'select',
      options: Object.values(TYPOGRAPHY_ELEMENTS),
      description: 'Typography Element',
      type: 'string',
      table: {
        defaultValue: {
          summary: 'span',
        },
        type: {
          summary: `'${Object.values(TYPOGRAPHY_ELEMENTS).join("' | '")}'`,
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
