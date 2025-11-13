import {
  TabItemRefs,
  TabList,
  TabListProvider,
  TabPanel,
  Tabs,
  Typography,
} from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import { tabItems } from '@/stories/internal-ui/Tab/constants';
import { default as TabMeta } from '@/stories/internal-ui/Tab/Tabs.stories';

const {
  variant,
  size,
  theme,
  isFull,
  disabled,
  'aria-label': ariaLabel,
} = TabMeta.argTypes ?? {};

const meta = {
  title: 'core/internal-ui/Tab/TabList',
  component: TabList,
  argTypes: { variant, size, theme, isFull, disabled, 'aria-label': ariaLabel },
} satisfies Meta<typeof TabList>;

export default meta;

type Story = StoryObj<typeof TabList>;

export const Default: Story = {
  args: {
    variant: 'line',
  },
  render: (args) => {
    const tabRefs: TabItemRefs = useRef({});
    const [currentValue, setCurrentValue] = useState(tabItems[0].value);

    return (
      <div className='in-flex-v-stack h-[600px] w-[600px]'>
        <TabListProvider currentValue={currentValue} tabRefs={tabRefs}>
          <TabList {...args}>
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
          </TabList>
          {Object.values(tabItems).map((item) => (
            <TabPanel
              className='shadow-in-8 rounded-in-8 bg-in-white mt-6 flex-1 p-4'
              key={item.value}
              value={item.value}
            >
              <Typography color='gray-07' variant='body-16-b'>
                {item.label}
              </Typography>
            </TabPanel>
          ))}
        </TabListProvider>
      </div>
    );
  },
};
