import {
  Badge,
  BADGE_THEMES,
  BADGE_VARIANTS,
  Flex,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const meta = {
  title: 'core/biz-ui/Badge',
  component: Badge,
  argTypes: {
    label: {
      control: 'text',
      type: {
        name: 'string',
        required: true,
      },
    },
    theme: {
      control: 'inline-radio',
      options: Object.values(BADGE_THEMES),
      table: {
        defaultValue: { summary: BADGE_THEMES.PRIMARY },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(BADGE_THEMES),
          }),
        },
      },
    },
    variant: {
      control: 'inline-radio',
      options: Object.values(BADGE_VARIANTS),
      table: {
        defaultValue: { summary: BADGE_VARIANTS.TONAL },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(BADGE_VARIANTS),
          }),
        },
      },
    },
  },
  args: {
    label: '주간주문',
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const Matrix: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: ({ label }) => (
    <Flex direction='column' gap='24'>
      {Object.values(BADGE_VARIANTS).map((variant) => (
        <Flex
          align={{ items: 'start' }}
          direction='column'
          gap='12'
          key={variant}
        >
          <Typography variant='heading-5'>variant = {variant}</Typography>
          <Flex align={{ items: 'center' }} gap='16'>
            {Object.values(BADGE_THEMES).map((theme) => (
              <Flex
                align={{ items: 'center' }}
                direction='column'
                gap='8'
                key={theme}
              >
                <Badge label={label} theme={theme} variant={variant} />
                <Typography color='gray-500' variant='caption'>
                  {theme}
                </Typography>
              </Flex>
            ))}
          </Flex>
        </Flex>
      ))}
    </Flex>
  ),
};
