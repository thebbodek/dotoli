import {
  TabItemRefs,
  TabList,
  TabListProps,
  TabListProvider,
  TabPanel,
  Tabs,
  Typography,
} from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import { default as TabMeta } from '@/stories/internal-ui/Tab/Tabs.stories';
import { tabItems } from '@/stories/internal-ui/Tab/constants';

const { variant, size, theme, full, disabled, ariaLabel } =
  TabMeta.argTypes ?? {};

const meta: Meta<typeof TabList> = {
  title: 'core/internal-ui/Tab/TabList',
  component: TabList,
  argTypes: { variant, size, theme, full, disabled, ariaLabel },
};

export default meta;

type Story = StoryObj<typeof TabList>;

export const Default: Story = {
  args: {
    variant: 'line',
  },
  render: (args: TabListProps) => {
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
              key={item.value}
              value={item.value}
              className='shadow-in-8 rounded-in-8 bg-in-white mt-6 flex-1 p-4'
            >
              <Typography variant='body-16-b' color='gray-07'>
                {item.label}
              </Typography>
            </TabPanel>
          ))}
        </TabListProvider>
      </div>
    );
  },
};
