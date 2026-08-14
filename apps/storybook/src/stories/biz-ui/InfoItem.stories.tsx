import { Flex, INFO_ITEM_THEMES, InfoItem, Typography } from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

// 실제 폭은 fill이라 문서 프레임과 같은 275px을 스토리에서만 건다
const DOCUMENT_FRAME_WIDTH = 'w-[275px]';

const meta = {
  title: 'core/biz-ui/Info/InfoItem',
  component: InfoItem,
  argTypes: {
    label: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    theme: {
      control: 'inline-radio',
      options: Object.values(INFO_ITEM_THEMES),
      table: {
        defaultValue: { summary: INFO_ITEM_THEMES.GRAY },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(INFO_ITEM_THEMES),
          }),
        },
      },
    },
  },
  args: {
    label: '한달 주문이 끝나면 거래명세서를 받습니다',
  },
  decorators: [
    (Story) => (
      <div className={DOCUMENT_FRAME_WIDTH}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InfoItem>;

export default meta;

type Story = StoryObj<typeof InfoItem>;

export const Default: Story = {};

export const Themes: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: ({ label }) => (
    <Flex direction='column' gap='24'>
      {Object.values(INFO_ITEM_THEMES).map((theme) => (
        <Flex align={{ items: 'start' }} direction='column' gap='8' key={theme}>
          <Typography color='gray-500' variant='caption'>
            {theme}
          </Typography>
          <InfoItem label={label} theme={theme} />
        </Flex>
      ))}
    </Flex>
  ),
};

// 문구가 접혀도 아이콘은 첫 줄에 붙어 있어야 한다
export const LongText: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Flex direction='column' gap='24'>
      {Object.values(INFO_ITEM_THEMES).map((theme) => (
        <Flex align={{ items: 'start' }} direction='column' gap='8' key={theme}>
          <Typography color='gray-500' variant='caption'>
            {theme}
          </Typography>
          <InfoItem
            label='한달 주문이 끝나면 거래명세서를 받습니다. 세금계산서는 다음 달 초에 별도로 발행됩니다'
            theme={theme}
          />
        </Flex>
      ))}
    </Flex>
  ),
};
