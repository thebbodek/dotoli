import {
  Flex,
  OrderBox,
  OrderBoxItem,
  OrderDateInfo,
  OrderDateInfoAction,
  OrderDateInfoProps,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';

const ROW_WIDTH_STYLE = 'w-[306px]';

const PAGE_STYLE = 'flex-v-stack w-[380px] gap-[8px] bg-gray-50 p-[20px]';

const CARD_STYLE =
  'flex-v-stack w-full gap-[6px] rounded-16 bg-white px-[16px] py-[12px] inset-ring inset-ring-gray-200';

const EDIT_ACTION: OrderDateInfoAction = {
  label: '주문 수정',
  onClick: () => {},
};

interface OrderDateInfoCase {
  caseLabel: string;
  props: OrderDateInfoProps;
}

interface OrderDayCase {
  props: OrderDateInfoProps;
  items: OrderBoxItem[];
}

const CASES: OrderDateInfoCase[] = [
  {
    caseLabel: '마감 전',
    props: {
      dateLabel: '13일(금)',
      deadlineLabel: '수 18시 마감',
      action: EDIT_ACTION,
    },
  },
  {
    caseLabel: '오늘 마감',
    props: {
      dateLabel: '12일(목)',
      deadlineLabel: '오늘 18시 마감',
      action: EDIT_ACTION,
    },
  },
  {
    caseLabel: '주문마감',
    props: { dateLabel: '10일(화)', isDeadlinePassed: true },
  },
  {
    caseLabel: '휴일',
    props: {
      dateLabel: '14일(토)',
      isHoliday: true,
      deadlineLabel: '목 18시 마감',
      action: EDIT_ACTION,
    },
  },
  {
    caseLabel: '날짜만',
    props: { dateLabel: '15일(일)', isHoliday: true },
  },
  {
    caseLabel: '긴 날짜',
    props: {
      dateLabel: '2026년 11월 12일(목) 사용분',
      deadlineLabel: '오늘 18시 마감',
      action: EDIT_ACTION,
    },
  },
];

const ORDER_DAYS: OrderDayCase[] = [
  {
    props: { dateLabel: '10일(화)', isDeadlinePassed: true },
    items: [{ itemName: '식판', quantity: '5박스 · 125개' }],
  },
  {
    props: {
      dateLabel: '12일(목)',
      deadlineLabel: '오늘 18시 마감',
      action: EDIT_ACTION,
    },
    items: [{ itemName: '식판', quantity: '5박스 · 125개' }],
  },
  {
    props: {
      dateLabel: '13일(금)',
      deadlineLabel: '수 18시 마감',
      action: EDIT_ACTION,
    },
    items: [
      { itemName: '식판', quantity: '4박스 · 100개' },
      { itemName: '국그릇', quantity: '주문 없음' },
      { itemName: '수저', quantity: '1박스 · 50개' },
    ],
  },
  {
    props: {
      dateLabel: '14일(토)',
      isHoliday: true,
      deadlineLabel: '목 18시 마감',
      action: EDIT_ACTION,
    },
    items: [],
  },
];

const meta = {
  title: 'core/biz-ui/Order/OrderDateInfo',
  component: OrderDateInfo,
  argTypes: {
    dateLabel: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    isHoliday: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    deadlineLabel: {
      control: 'text',
      table: { type: { summary: 'string' } },
    },
    action: {
      control: 'object',
      table: { type: { summary: 'OrderDateInfoAction' } },
    },
    isDeadlinePassed: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    dateLabel: '12일(목)',
    deadlineLabel: '오늘 18시 마감',
    action: EDIT_ACTION,
  },
  render: (args) => (
    <Flex className={ROW_WIDTH_STYLE}>
      <OrderDateInfo {...args} />
    </Flex>
  ),
} satisfies Meta<typeof OrderDateInfo>;

export default meta;

type Story = StoryObj<typeof OrderDateInfo>;

export const Default: Story = {};

export const States: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Flex direction='column' gap='16'>
      {CASES.map(({ caseLabel, props }) => (
        <Flex direction='column' gap='8' key={caseLabel}>
          <Typography color='gray-500' variant='label-bold'>
            {caseLabel}
          </Typography>
          <Flex className={ROW_WIDTH_STYLE}>
            <OrderDateInfo {...props} />
          </Flex>
        </Flex>
      ))}
    </Flex>
  ),
};

export const InCard: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <ul className={PAGE_STYLE}>
      {ORDER_DAYS.map(({ props, items }) => (
        <li className={CARD_STYLE} key={props.dateLabel}>
          <OrderDateInfo {...props} />
          <OrderBox items={items} />
        </li>
      ))}
    </ul>
  ),
};
