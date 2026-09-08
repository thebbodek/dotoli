import {
  Flex,
  LinkNavigationListItem,
  LinkNavigationListItemProps,
  NavigationListItem,
  Typography,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';

const DOCUMENT_FRAME_WIDTH = 'w-[340px]';

const SETTING_ITEMS: Pick<
  LinkNavigationListItemProps,
  'label' | 'value' | 'href'
>[] = [
  { label: '매니저 계정', value: '김뽀득, 이뽀득 외 2명', href: '/managers' },
  { label: '주문 담당자', value: '2명', href: '/order-managers' },
  { label: '거래명세서 수신자', value: '2명', href: '/statement-receivers' },
  { label: '알림', href: '/notifications' },
];

const meta = {
  title: 'core/biz-ui/LinkNavigationListItem',
  component: LinkNavigationListItem,
  argTypes: {
    label: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    value: { control: 'text' },
    href: {
      control: 'text',
      type: { name: 'string', required: true },
    },
  },
  args: {
    label: '매니저 계정',
    value: '김뽀득, 이뽀득 외 2명',
    href: '/managers',
  },
} satisfies Meta<LinkNavigationListItemProps>;

export default meta;

type Story = StoryObj<LinkNavigationListItemProps>;

export const Default: Story = {
  render: (args) => (
    <Flex className={DOCUMENT_FRAME_WIDTH}>
      <LinkNavigationListItem {...args} />
    </Flex>
  ),
};

export const List: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Flex className={DOCUMENT_FRAME_WIDTH} direction='column'>
      {SETTING_ITEMS.map(({ label, value, href }) => (
        <LinkNavigationListItem
          href={href}
          key={label}
          label={label}
          value={value}
        />
      ))}
    </Flex>
  ),
};

// 링크 행과 버튼 행(시트 트리거)이 한 목록에 섞이는 실제 형태.
// 태그가 갈려도 last:border-b-0이 마지막 항목에만 걸리는지 여기서 본다
export const Mixed: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Flex className={DOCUMENT_FRAME_WIDTH} direction='column' gap='8'>
      <Typography color='gray-500' variant='label-bold'>
        링크 2 + 버튼 1 (마지막이 버튼)
      </Typography>
      <Flex direction='column'>
        <LinkNavigationListItem
          href='/managers'
          label='매니저 계정'
          value='김뽀득, 이뽀득 외 2명'
        />
        <LinkNavigationListItem href='/notifications' label='알림' />
        <NavigationListItem
          label='업체 전환'
          value='뽀득컴퍼니'
          onClick={() => {}}
        />
      </Flex>
    </Flex>
  ),
};
