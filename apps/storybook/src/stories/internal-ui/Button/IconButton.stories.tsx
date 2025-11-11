import {
  ICON_BUTTON_THEMES,
  IconButton,
  IconButtonProps,
  TooltipProps,
} from '@bbodek/internal-ui';
import { Meta, StoryObj } from '@storybook/react';

import { default as IconMeta } from '@/stories/internal-ui/Icon.stories';
import { default as TooltipMeta } from '@/stories/internal-ui/Tooltip.stories';
import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';
import { default as ButtonMeta } from './Button.stories';

const { disabled, onClick, type, isPending, ref, className } =
  ButtonMeta.argTypes;
const { iconKey } = IconMeta.argTypes;
const { placement } = TooltipMeta.argTypes;

export interface IconButtonArgs extends Omit<IconButtonProps, 'tooltipOption'> {
  tooltipContent?: TooltipProps['content'];
  tooltipPlacement?: TooltipProps['placement'];
}

const meta = {
  title: 'core/internal-ui/Button/IconButton',
  component: IconButton,
  argTypes: {
    theme: {
      description: 'Icon Button Theme',
      control: 'select',
      options: Object.values(ICON_BUTTON_THEMES),
      table: {
        defaultValue: { summary: ICON_BUTTON_THEMES.HOVER_GRAY },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(ICON_BUTTON_THEMES),
          }),
        },
      },
    },
    arialLabel: {
      description: 'Icon Button Aria Label',
      control: 'text',
      type: {
        required: true,
        name: 'string',
      },
    },
    tooltipContent: {
      name: 'content',
      description: 'tooltip content',
      control: 'text',
      table: {
        subcategory: 'tooltipOption',
        type: {
          summary: 'ReactNode',
        },
      },
    },
    tooltipPlacement: {
      ...placement,
      name: 'placement',
      description: 'tooltip placement',
      table: {
        ...placement?.table,
        subcategory: 'tooltipOption',
        defaultValue: {
          summary: 'bottom',
        },
      },
    },
    iconKey,
    type,
    disabled,
    isPending,
    onClick,
    ref,
    className,
  },
} satisfies Meta<IconButtonArgs>;

export default meta;

type Story = StoryObj<IconButtonArgs>;

export const Default: Story = {
  args: {
    theme: ICON_BUTTON_THEMES.HOVER_GRAY,
    disabled: false,
    iconKey: 'pencil',
    arialLabel: '수정',
    tooltipContent: '수정',
    tooltipPlacement: 'bottom',
  },
  render: ({ tooltipContent, tooltipPlacement, ...args }) => (
    <IconButton
      {...args}
      tooltipOption={{ content: tooltipContent, placement: tooltipPlacement }}
    />
  ),
};
