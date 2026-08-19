import {
  Flex,
  MENU_ITEM_ICON_KEYS,
  MenuItem,
  MenuItemProps,
} from '@bbodek/biz-ui';
import { Decorator, Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const DOCUMENT_FRAME_WIDTH = 'w-[420px]';

const MOBILE_FRAME_WIDTH = 'w-[360px]';

const withFrameWidth: Decorator = (Story) => (
  <div className={DOCUMENT_FRAME_WIDTH}>
    <Story />
  </div>
);

const MENUS: Pick<MenuItemProps, 'iconKey' | 'label' | 'description'>[] = [
  {
    iconKey: MENU_ITEM_ICON_KEYS.CHAT,
    label: '채팅 문의',
    description: '문의사항을 남겨주시면 꼭 답변드려요',
  },
  {
    iconKey: MENU_ITEM_ICON_KEYS.PHONE,
    label: '전화 문의',
    description: '평일 9시-6시만 가능합니다',
  },
];

const meta = {
  title: 'core/biz-ui/MenuItem',
  component: MenuItem,
  decorators: [withFrameWidth],
  argTypes: {
    // 타입은 모든 phosphor 아이콘을 받지만 컨트롤은 Figma가 정의한 2종만 노출한다
    iconKey: {
      control: 'inline-radio',
      options: Object.values(MENU_ITEM_ICON_KEYS),
      type: { name: 'string', required: true },
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(MENU_ITEM_ICON_KEYS),
          }),
        },
      },
    },
    label: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    description: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    onClick: { action: 'click' },
  },
  args: MENUS[0],
} satisfies Meta<MenuItemProps>;

export default meta;

type Story = StoryObj<MenuItemProps>;

export const Default: Story = {};

// Figma 문서 프레임과 같은 배치 — 심볼 2종을 실제 문구 그대로.
// 간격은 Figma가 9인데 Flex 스케일이 짝수뿐이라 10이다 (menu-item.md 「디자인 확인 필요」)
export const Types: Story = {
  parameters: { controls: { disable: true } },
  render: ({ onClick }) => (
    <Flex direction='column' gap='10'>
      {MENUS.map(({ iconKey, label, description }) => (
        <MenuItem
          description={description}
          iconKey={iconKey}
          key={label}
          label={label}
          onClick={onClick}
        />
      ))}
    </Flex>
  ),
};

// w-full이라 좁아지면 텍스트만 줄고 아이콘 30 · gap 12 · 패딩 19는 그대로여야 한다
export const Narrow: Story = {
  parameters: { controls: { disable: true } },
  render: ({ iconKey, label, description, onClick }) => (
    <div className={MOBILE_FRAME_WIDTH}>
      <MenuItem
        description={description}
        iconKey={iconKey}
        label={label}
        onClick={onClick}
      />
    </div>
  ),
};

// 카드 높이가 82로 고정이라 두 줄 다 말줄임된다
export const LongText: Story = {
  parameters: { controls: { disable: true } },
  render: ({ iconKey, onClick }) => (
    <MenuItem
      description='설명이 아주 길어서 한 줄에 다 들어가지 않고 잘려야 하는 경우입니다'
      iconKey={iconKey}
      label='제목이 아주 길어서 한 줄에 다 들어가지 않고 잘려야 하는 경우입니다'
      onClick={onClick}
    />
  ),
};
