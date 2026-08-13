import { Flex, OrderDateInfo, Typography } from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';

const DELIVERY_INFO = '2일(화) 배송시작';

const CASES = [
  {
    label: '평일 · 배송 있음',
    dateLabel: '3일(수)',
    deliveryInfo: DELIVERY_INFO,
  },
  { label: '평일 · 배송 없음', dateLabel: '3일(수)' },
  {
    label: '휴일 · 배송 있음',
    dateLabel: '3일(일)',
    deliveryInfo: DELIVERY_INFO,
    isHoliday: true,
  },
  { label: '휴일 · 배송 없음', dateLabel: '3일(일)', isHoliday: true },
];

const meta = {
  title: 'core/biz-ui/Order/OrderDateInfo',
  component: OrderDateInfo,
  argTypes: {
    dateLabel: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    deliveryInfo: {
      control: 'text',
      table: { type: { summary: 'string' } },
    },
    isHoliday: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    dateLabel: '3일(수)',
    deliveryInfo: DELIVERY_INFO,
  },
} satisfies Meta<typeof OrderDateInfo>;

export default meta;

type Story = StoryObj<typeof OrderDateInfo>;

export const Default: Story = {};

export const Matrix: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Flex align={{ items: 'start' }} gap='40'>
      {CASES.map(({ label, ...args }) => (
        <Flex
          align={{ items: 'start' }}
          direction='column'
          gap='12'
          key={label}
        >
          <Typography color='gray-500' variant='label-bold'>
            {label}
          </Typography>
          <OrderDateInfo {...args} />
        </Flex>
      ))}
    </Flex>
  ),
};
