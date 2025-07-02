import {
  Tab,
  TAB_SIZES,
  TAB_THEMES,
  TAB_VARIANTS,
  TabItemRef,
  TabPanel,
  TabProvider,
  Typography,
} from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const meta: Meta<typeof Tab> = {
  title: 'core/internal-ui/Tab',
  component: Tab,
  argTypes: {
    currentValue: {
      control: 'text',
      description: 'Tab current value',
      type: {
        required: true,
        name: 'string',
      },
    },
    items: {
      description:
        'Array of Tab item objects (each with label, value, number, disabled)',
      type: {
        required: true,
        name: 'array',
        value: {
          name: 'object',
          value: {
            label: { name: 'string', required: true },
            value: { name: 'string', required: true },
            number: { name: 'number', required: false },
            disabled: { name: 'boolean', required: false },
          },
        },
      },
    },
    variant: {
      control: 'select',
      options: Object.values(TAB_VARIANTS),
      description: 'Tab variant',
      table: {
        defaultValue: {
          summary: TAB_VARIANTS.LINE,
        },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(TAB_VARIANTS),
          }),
        },
      },
    },
    size: {
      control: 'select',
      options: Object.values(TAB_SIZES),
      description: 'Tab size',
      table: {
        defaultValue: { summary: TAB_SIZES.MD },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(TAB_SIZES),
          }),
        },
      },
    },
    theme: {
      control: 'select',
      options: Object.values(TAB_THEMES),
      description: 'Tab theme',
      table: {
        defaultValue: { summary: TAB_THEMES.GRAY },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(TAB_THEMES),
          }),
        },
      },
    },
    full: {
      control: 'boolean',
      description: 'Tab item full width',
      type: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Tab all disabled',
      type: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'Tab aria-label',
      type: 'string',
    },
    onChange: {
      action: 'onChange',
      description: 'Tab on change',
      type: {
        required: true,
        name: 'function',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tab>;

const items = [
  { label: '업체 정보', value: 'tab1' },
  { label: '정산 정보', value: 'tab2' },
  { label: '첫 주문 정보', value: 'tab3' },
  { label: '배송 정보', value: 'tab4' },
  { label: '파일 첨부', value: 'tab5' },
];

export const Default: Story = {
  args: {
    variant: 'line',
    items,
  },
  render: (args) => {
    const tabRefs = useRef<TabItemRef>({});
    const [currentValue, setCurrentValue] = useState(items['0'].value);

    return (
      <Tab
        {...args}
        tabRefs={tabRefs}
        currentValue={args.currentValue ?? currentValue}
        onChange={({ value }) => setCurrentValue(value)}
      />
    );
  },
};

const stateItems = [
  { label: '전체', value: 'tab1', number: 4 },
  { label: '진행중', value: 'tab2', number: 1, disabled: true },
  { label: '승인', value: 'tab3', number: 2 },
  { label: '수정요청', value: 'tab4', number: 3 },
  { label: '종결', value: 'tab5', number: 5 },
];
export const Filled: Story = {
  args: {
    variant: 'filled',
    items: stateItems,
  },
  render: (args) => {
    const tabRefs = useRef<TabItemRef>({});
    const [currentValue, setCurrentValue] = useState(items[0].value);

    return (
      <Tab
        {...args}
        tabRefs={tabRefs}
        currentValue={args.currentValue ?? currentValue}
        onChange={({ value }) => setCurrentValue(value)}
      />
    );
  },
};

export const WithFull: Story = {
  args: {
    variant: 'line',
    items: items,
    full: true,
  },
  render: (args) => {
    const tabRefs = useRef<TabItemRef>({});
    const [currentValue, setCurrentValue] = useState(items[0].value);

    return (
      <Tab
        {...args}
        tabRefs={tabRefs}
        currentValue={args.currentValue ?? currentValue}
        onChange={({ value }) => setCurrentValue(value)}
        className='w-[800px]'
      />
    );
  },
};

export const WithPanel: Story = {
  args: {
    variant: 'line',
    items: items,
  },
  render: (args) => {
    const tabRefs = useRef<TabItemRef>({});
    const [currentValue, setCurrentValue] = useState(items[0].value);

    return (
      <div className='flex-v-stack h-[600px] w-[600px]'>
        <TabProvider
          currentValue={args.currentValue ?? currentValue}
          tabRefs={tabRefs}
        >
          <Tab
            {...args}
            tabRefs={tabRefs}
            currentValue={args.currentValue ?? currentValue}
            onChange={({ value }) => setCurrentValue(value)}
          />
          {items.map((item) => (
            <TabPanel
              key={item.value}
              value={item.value}
              className='shadow-8 rounded-8 mt-6 flex-1 bg-white p-4'
            >
              <Typography variant='body-16-b' color='gray-06'>
                {item.label}
              </Typography>
            </TabPanel>
          ))}
        </TabProvider>
      </div>
    );
  },
};
