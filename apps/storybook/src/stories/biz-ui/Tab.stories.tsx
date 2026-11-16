import {
  Flex,
  Tab,
  TAB_VARIANTS,
  TabItemOption,
  TabPanel,
  TabProps,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const SCREEN_WIDTH_STYLE = 'w-[380px]';

const PAGE_CONTENT_STYLE = 'w-[380px] px-[20px]';

const PANEL_STYLE = 'px-[20px] py-[16px]';

const TAB_ID = 'orderManagement';

const ORDER_MANAGEMENT_TABS = {
  FIXED_ORDER: 'fixedOrder',
  ORDER_LIST: 'orderList',
  HISTORY: 'history',
} as const;

const TWO_TABS: TabItemOption[] = [
  { value: ORDER_MANAGEMENT_TABS.ORDER_LIST, label: '주문 목록' },
  { value: ORDER_MANAGEMENT_TABS.HISTORY, label: '변경 이력' },
];

const THREE_TABS: TabItemOption[] = [
  { value: ORDER_MANAGEMENT_TABS.FIXED_ORDER, label: '고정주문' },
  ...TWO_TABS,
];

const WEEK_TABS = {
  THIS_WEEK: 'thisWeek',
  NEXT_WEEK: 'nextWeek',
  WEEK_AFTER_NEXT: 'weekAfterNext',
} as const;

const WEEK_TAB_ITEMS: TabItemOption[] = [
  { value: WEEK_TABS.THIS_WEEK, label: '이번 주' },
  { value: WEEK_TABS.NEXT_WEEK, label: '다음 주' },
  { value: WEEK_TABS.WEEK_AFTER_NEXT, label: '다다음 주' },
];

const meta = {
  title: 'core/biz-ui/Tab',
  component: Tab,
  argTypes: {
    id: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    items: {
      control: 'object',
      type: {
        name: 'array',
        required: true,
        value: { name: 'object', value: {} },
      },
      table: {
        type: { summary: 'TabItemOption[]' },
      },
    },
    value: {
      control: 'inline-radio',
      options: TWO_TABS.map(({ value }) => value),
      type: { name: 'string', required: true },
      table: {
        type: { summary: 'string' },
      },
    },
    variant: {
      control: 'inline-radio',
      options: Object.values(TAB_VARIANTS),
      table: {
        defaultValue: { summary: TAB_VARIANTS.LINE },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(TAB_VARIANTS),
          }),
        },
      },
    },
    onChange: { action: 'change' },
    'aria-label': {
      control: 'text',
    },
  },
  args: {
    id: TAB_ID,
    items: TWO_TABS,
    value: ORDER_MANAGEMENT_TABS.ORDER_LIST,
    'aria-label': '주문 관리',
  },
  render: (args) => (
    <Flex className={SCREEN_WIDTH_STYLE}>
      <Tab {...args} />
    </Flex>
  ),
} satisfies Meta<TabProps>;

export default meta;

type Story = StoryObj<TabProps>;

export const Default: Story = {};

export const ThreeTabs: Story = {
  argTypes: {
    value: {
      options: THREE_TABS.map(({ value }) => value),
    },
  },
  args: {
    items: THREE_TABS,
    value: ORDER_MANAGEMENT_TABS.FIXED_ORDER,
  },
};

export const Filled: Story = {
  argTypes: {
    value: {
      options: WEEK_TAB_ITEMS.map(({ value }) => value),
    },
  },
  args: {
    id: 'orderWeek',
    items: WEEK_TAB_ITEMS,
    value: WEEK_TABS.NEXT_WEEK,
    variant: TAB_VARIANTS.FILLED,
    'aria-label': '주문할 주',
  },
  render: (args) => (
    <Flex className={PAGE_CONTENT_STYLE}>
      <Tab {...args} />
    </Flex>
  ),
};

export const Interactive: Story = {
  parameters: { controls: { disable: true } },
  args: {
    items: THREE_TABS,
    value: ORDER_MANAGEMENT_TABS.FIXED_ORDER,
  },
  render: ({ id, items, value: initialValue, 'aria-label': ariaLabel }) => {
    const [value, setValue] = useState<string>(initialValue);
    const selectedLabel = items.find((item) => item.value === value)?.label;

    return (
      <Flex className={SCREEN_WIDTH_STYLE} direction='column'>
        <Tab
          aria-label={ariaLabel}
          id={id}
          items={items}
          value={value}
          onChange={setValue}
        />
        <TabPanel className={PANEL_STYLE} tabId={id} value={value}>
          <Typography color='gray-700' variant='body'>
            {selectedLabel} 패널
          </Typography>
        </TabPanel>
      </Flex>
    );
  },
};
