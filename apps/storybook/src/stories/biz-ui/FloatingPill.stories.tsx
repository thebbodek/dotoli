import {
  Flex,
  FLOATING_PILL_VARIANTS,
  FloatingPill,
  FloatingPillVariant,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const meta = {
  title: 'core/biz-ui/Button/FloatingPill',
  component: FloatingPill,
  argTypes: {
    label: {
      control: 'text',
      type: {
        name: 'string',
        required: true,
      },
    },
    variant: {
      control: 'inline-radio',
      options: Object.values(FLOATING_PILL_VARIANTS),
      table: {
        defaultValue: { summary: FLOATING_PILL_VARIANTS.NAVIGATE },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(FLOATING_PILL_VARIANTS),
          }),
        },
      },
    },
  },
  args: {
    label: '다음주 주문',
  },
} satisfies Meta<typeof FloatingPill>;

export default meta;

type Story = StoryObj<typeof FloatingPill>;

export const Default: Story = {};

const VARIANT_LABELS: Record<FloatingPillVariant, string> = {
  [FLOATING_PILL_VARIANTS.NAVIGATE]: '다음주 주문',
  [FLOATING_PILL_VARIANTS.SCROLL_TO_TOP]: '위로',
};

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Flex align={{ items: 'start' }} gap='24'>
      {Object.values(FLOATING_PILL_VARIANTS).map((variant) => (
        <Flex
          align={{ items: 'start' }}
          direction='column'
          gap='12'
          key={variant}
        >
          <Typography color='gray-500' variant='label-bold'>
            variant = {variant}
          </Typography>
          <FloatingPill label={VARIANT_LABELS[variant]} variant={variant} />
        </Flex>
      ))}
    </Flex>
  ),
};
