import {
  TAB_SIZES,
  TAB_THEMES,
  TAB_VARIANTS,
  TabItemRef,
  Tabs,
} from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import { tabItems } from '@/stories/internal-ui/Tab/constants';
import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const meta: Meta<typeof Tabs> = {
  title: 'core/internal-ui/Tab/Tabs',
  component: Tabs,
  argTypes: {
    tabRefs: {
      control: false,
      description: 'Tab ref object',
      type: {
        required: true,
        name: 'object',
        value: {},
      },
    },
    currentValue: {
      control: 'text',
      description: 'Tab current value',
      type: {
        required: true,
        name: 'string',
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
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    variant: 'line',
  },
  render: (args) => {
    const tabRefs = useRef<TabItemRef>({});
    const [currentValue, setCurrentValue] = useState(tabItems['0'].value);

    return (
      <Tabs
        {...args}
        tabRefs={tabRefs}
        currentValue={args.currentValue ?? currentValue}
      >
        {Object.values(tabItems).map((tab) => (
          <Tabs.Tab
            key={tab.value}
            value={tab.value}
            onChange={() => setCurrentValue(tab.value)}
          >
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs>
    );
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
  },
  render: (args) => {
    const tabRefs = useRef<TabItemRef>({});
    const [currentValue, setCurrentValue] = useState(tabItems[0].value);

    return (
      <Tabs
        {...args}
        tabRefs={tabRefs}
        currentValue={args.currentValue ?? currentValue}
      >
        {Object.values(tabItems).map((tab) => (
          <Tabs.Tab
            key={tab.value}
            value={tab.value}
            onChange={() => setCurrentValue(tab.value)}
          >
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs>
    );
  },
};

export const WithNumber: Story = {
  args: {
    variant: 'line',
  },
  render: (args) => {
    const tabRefs = useRef<TabItemRef>({});
    const [currentValue, setCurrentValue] = useState(tabItems[0].value);

    return (
      <Tabs
        {...args}
        tabRefs={tabRefs}
        currentValue={args.currentValue ?? currentValue}
      >
        {Object.values(tabItems).map((tab, index) => (
          <Tabs.Tab
            key={tab.value}
            value={tab.value}
            onChange={() => setCurrentValue(tab.value)}
          >
            {tab.label}
            {index === 0 && <Tabs.Tab.Number>{10}</Tabs.Tab.Number>}
          </Tabs.Tab>
        ))}
      </Tabs>
    );
  },
};

export const WithFull: Story = {
  args: {
    variant: 'line',
    full: true,
  },
  render: (args) => {
    const tabRefs = useRef<TabItemRef>({});
    const [currentValue, setCurrentValue] = useState(tabItems[0].value);

    return (
      <Tabs
        {...args}
        tabRefs={tabRefs}
        currentValue={args.currentValue ?? currentValue}
        className='w-[800px]'
      >
        {Object.values(tabItems).map((tab) => (
          <Tabs.Tab
            key={tab.value}
            value={tab.value}
            onChange={() => setCurrentValue(tab.value)}
          >
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs>
    );
  },
};
