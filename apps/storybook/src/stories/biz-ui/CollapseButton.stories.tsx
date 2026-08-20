import {
  COLLAPSE_BUTTON_LABELS,
  CollapseButton,
  CollapseButtonProps,
  Flex,
  Typography,
} from '@bbodek/biz-ui';
import { Decorator, Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const CARD_CONTENT_WIDTH = 'w-[300px]';

const withCardWidth: Decorator = (Story) => (
  <div className={CARD_CONTENT_WIDTH}>
    <Story />
  </div>
);

const meta = {
  title: 'core/biz-ui/Button/CollapseButton',
  component: CollapseButton,
  decorators: [withCardWidth],
  argTypes: {
    isOpen: {
      control: 'boolean',
      type: { name: 'boolean', required: true },
    },
    'aria-controls': { control: 'text' },
    onClick: { action: 'click' },
  },
  args: { isOpen: false },
} satisfies Meta<CollapseButtonProps>;

export default meta;

type Story = StoryObj<CollapseButtonProps>;

export const Default: Story = {};

export const Interactive: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <CollapseButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
    );
  },
};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: ({ onClick }) => (
    <Flex direction='column' gap='24'>
      {[false, true].map((isOpen) => (
        <Flex direction='column' gap='12' key={String(isOpen)}>
          <Typography color='gray-500' variant='label-bold'>
            isOpen = {String(isOpen)} ·{' '}
            {isOpen
              ? COLLAPSE_BUTTON_LABELS.EXPANDED
              : COLLAPSE_BUTTON_LABELS.COLLAPSED}
          </Typography>
          <CollapseButton isOpen={isOpen} onClick={onClick} />
        </Flex>
      ))}
    </Flex>
  ),
};
