import {
  BOTTOM_TAB_DEFAULT_VALUE,
  BOTTOM_TAB_VALUES,
  BottomTab,
  BottomTabProps,
  BottomTabValue,
  Flex,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const DOCUMENT_FRAME_WIDTH = 'w-[380px]';

const meta = {
  title: 'core/biz-ui/BottomTab',
  component: BottomTab,
  argTypes: {
    value: {
      control: 'inline-radio',
      options: Object.values(BOTTOM_TAB_VALUES),
      type: { name: 'string', required: true },
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(BOTTOM_TAB_VALUES),
          }),
        },
      },
    },
    onChange: { action: 'change' },
  },
  args: {
    value: BOTTOM_TAB_DEFAULT_VALUE,
  },
} satisfies Meta<BottomTabProps>;

export default meta;

type Story = StoryObj<BottomTabProps>;

export const Default: Story = {
  render: (args) => (
    <Flex className={DOCUMENT_FRAME_WIDTH}>
      <BottomTab {...args} />
    </Flex>
  ),
};

// 라우터가 없는 환경에서 전환만 보여준다. 앱에서는 value를 URL에서 파생시킨다
// (docs/biz-ui/components/bottom-tab.md 「API」)
export const Interactive: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const [value, setValue] = useState<BottomTabValue>(
      BOTTOM_TAB_DEFAULT_VALUE,
    );

    return (
      <Flex className={DOCUMENT_FRAME_WIDTH}>
        <BottomTab value={value} onChange={setValue} />
      </Flex>
    );
  },
};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: ({ onChange }) => (
    <Flex className={DOCUMENT_FRAME_WIDTH} direction='column' gap='12'>
      {Object.values(BOTTOM_TAB_VALUES).map((value) => (
        <Flex direction='column' gap='8' key={value}>
          <Typography color='gray-500' variant='label-bold'>
            value = {value}
          </Typography>
          <BottomTab value={value} onChange={onChange} />
        </Flex>
      ))}
    </Flex>
  ),
};
