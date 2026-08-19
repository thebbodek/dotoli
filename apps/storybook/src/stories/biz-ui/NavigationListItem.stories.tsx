import {
  Flex,
  NavigationListItem,
  NavigationListItemProps,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';

const DOCUMENT_FRAME_WIDTH = 'w-[340px]';

const SETTING_ITEMS: Pick<NavigationListItemProps, 'label' | 'value'>[] = [
  { label: '매니저 계정', value: '김뽀득, 이뽀득 외 2명' },
  { label: '주문 담당자', value: '2명' },
  { label: '거래명세서 수신자', value: '2명' },
  { label: '세금계산서 수신자', value: '2명' },
  { label: '알림' },
];

// 정책 `524:5` 값 표기 규칙. 축약은 소비자가 하고 DS는 받은 문자열을 그대로 그린다
const VALUE_RULES = [
  { label: '인원 수', value: '2명' },
  { label: '다수 목록', value: '김뽀득, 이뽀득 외 2명' },
  { label: '값 없음', value: '-' },
];

const meta = {
  title: 'core/biz-ui/NavigationListItem',
  component: NavigationListItem,
  argTypes: {
    label: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    value: { control: 'text' },
    onClick: { action: 'click' },
  },
  args: {
    label: '라벨',
    value: '값이 들어갑니다',
  },
} satisfies Meta<NavigationListItemProps>;

export default meta;

type Story = StoryObj<NavigationListItemProps>;

export const Default: Story = {
  render: (args) => (
    <Flex className={DOCUMENT_FRAME_WIDTH}>
      <NavigationListItem {...args} />
    </Flex>
  ),
};

export const Types: Story = {
  parameters: { controls: { disable: true } },
  render: ({ label, value, onClick }) => (
    <Flex className={DOCUMENT_FRAME_WIDTH} direction='column' gap='24'>
      <Flex direction='column' gap='8'>
        <Typography color='gray-500' variant='label-bold'>
          value 전달 (withValue)
        </Typography>
        <NavigationListItem label={label} value={value} onClick={onClick} />
      </Flex>
      <Flex direction='column' gap='8'>
        <Typography color='gray-500' variant='label-bold'>
          value 미전달 (default)
        </Typography>
        <NavigationListItem label={label} onClick={onClick} />
      </Flex>
    </Flex>
  ),
};

// 형제로 나열하면 last:border-b-0으로 마지막 항목만 구분선이 빠진다
export const List: Story = {
  parameters: { controls: { disable: true } },
  render: ({ onClick }) => (
    <Flex className={DOCUMENT_FRAME_WIDTH} direction='column'>
      {SETTING_ITEMS.map(({ label, value }) => (
        <NavigationListItem
          key={label}
          label={label}
          value={value}
          onClick={onClick}
        />
      ))}
    </Flex>
  ),
};

export const ValueRules: Story = {
  parameters: { controls: { disable: true } },
  render: ({ onClick }) => (
    <Flex className={DOCUMENT_FRAME_WIDTH} direction='column'>
      {VALUE_RULES.map(({ label, value }) => (
        <NavigationListItem
          key={label}
          label={label}
          value={value}
          onClick={onClick}
        />
      ))}
    </Flex>
  ),
};

export const LongLabel: Story = {
  parameters: { controls: { disable: true } },
  render: ({ onClick }) => (
    <Flex className={DOCUMENT_FRAME_WIDTH} direction='column'>
      <NavigationListItem
        label='아주 길어서 잘려야 하는 라벨이 들어가는 경우입니다'
        value='김뽀득, 이뽀득 외 2명'
        onClick={onClick}
      />
      <NavigationListItem
        label='아주 길어서 잘려야 하는 라벨이 들어가는 경우입니다'
        onClick={onClick}
      />
    </Flex>
  ),
};
