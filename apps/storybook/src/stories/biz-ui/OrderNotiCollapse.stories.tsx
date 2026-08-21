import {
  Flex,
  ORDER_NOTI_COLLAPSE_TYPES,
  OrderNotiCollapse,
  OrderNotiCollapseProps,
} from '@bbodek/biz-ui';
import { Decorator, Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const SCREEN_WIDTH = 'w-[380px]';

const REGISTERED_AT_LABEL = '2026-00-00 16:30 등록';

const REGISTRANT = '뽀득';

const LONG_REGISTRANT = '김뽀득 매니저';

const withScreenWidth: Decorator = (Story) => (
  <div className={SCREEN_WIDTH}>
    <Story />
  </div>
);

const meta = {
  title: 'core/biz-ui/Order/OrderNotiCollapse',
  component: OrderNotiCollapse,
  decorators: [withScreenWidth],
  argTypes: {
    type: {
      control: 'inline-radio',
      options: Object.values(ORDER_NOTI_COLLAPSE_TYPES),
      type: { name: 'string', required: true },
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(ORDER_NOTI_COLLAPSE_TYPES),
          }),
        },
      },
    },
    registeredAtLabel: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    registrant: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    isOpen: {
      control: 'boolean',
      type: { name: 'boolean', required: true },
    },
    'aria-controls': { control: 'text' },
    onClick: { action: 'click' },
  },
  args: {
    type: ORDER_NOTI_COLLAPSE_TYPES.ORDER_STOP,
    registeredAtLabel: REGISTERED_AT_LABEL,
    registrant: REGISTRANT,
    isOpen: false,
  },
} satisfies Meta<OrderNotiCollapseProps>;

export default meta;

type Story = StoryObj<OrderNotiCollapseProps>;

export const Default: Story = {};

export const Types: Story = {
  parameters: { controls: { disable: true } },
  render: ({ registeredAtLabel, registrant, isOpen, onClick }) => (
    <Flex direction='column'>
      {Object.values(ORDER_NOTI_COLLAPSE_TYPES).map((type) => (
        <OrderNotiCollapse
          isOpen={isOpen}
          key={type}
          registeredAtLabel={registeredAtLabel}
          registrant={registrant}
          type={type}
          onClick={onClick}
        />
      ))}
    </Flex>
  ),
};

export const Interactive: Story = {
  parameters: { controls: { disable: true } },
  render: ({ type, registeredAtLabel, registrant }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <OrderNotiCollapse
        isOpen={isOpen}
        registeredAtLabel={registeredAtLabel}
        registrant={registrant}
        type={type}
        onClick={() => setIsOpen(!isOpen)}
      />
    );
  },
};

export const LongText: Story = {
  parameters: { controls: { disable: true } },
  render: ({ type, isOpen, onClick }) => (
    <OrderNotiCollapse
      isOpen={isOpen}
      registeredAtLabel='2026-00-00 16:30 등록 · 매우 긴 부가 설명이 붙는 경우'
      registrant={LONG_REGISTRANT}
      type={type}
      onClick={onClick}
    />
  ),
};
