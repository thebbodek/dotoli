import {
  Notification,
  NOTIFICATION_ICON_KEYS,
  NOTIFICATION_VARIANTS,
  NotificationProps,
} from '@bbodek/biz-ui';
import { Decorator, Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const SCREEN_WIDTH = 'w-[380px]';

const NARROW_SCREEN_WIDTH = 'w-[320px]';

const withScreenWidth: Decorator = (Story) => (
  <div className={SCREEN_WIDTH}>
    <Story />
  </div>
);

const COMPANY_NAME = '최고의 맛 한식뷔페';

const RECEIVED_AT = '06.30';

// 픽스처는 표시용 값만 갖는다. onAction은 스토리마다 넘길지 갈리고 className은 쓰지 않는다
type NotificationFixture = Omit<NotificationProps, 'className' | 'onAction'>;

// 아래 5종은 알림함 화면(MYP-101 `1439:17915`)의 카드를 문구 그대로 옮긴 것이다
const SERVICE_ENDED: NotificationFixture = {
  iconKey: NOTIFICATION_ICON_KEYS.ALARM,
  variant: NOTIFICATION_VARIANTS.NO_READ,
  companyName: COMPANY_NAME,
  receivedAt: RECEIVED_AT,
  title: '뽀득 사용이 종료되었습니다',
  description:
    '1년간 계정이 유지되며 주문내역과 거래내역을 확인 할 수 있습니다\n그동안 뽀득을 이용해주셔서 감사합니다',
};

const ORDER_DEADLINE: NotificationFixture = {
  iconKey: NOTIFICATION_ICON_KEYS.ALARM,
  variant: NOTIFICATION_VARIANTS.NO_READ,
  companyName: COMPANY_NAME,
  receivedAt: RECEIVED_AT,
  title: '긴급!⏰ 6시에 다음주 주문 마감',
  description: '목요일 6시까지 주문하지 않으면 다음주 식기를 사용할 수 없어요',
};

const HOLIDAY_ORDER: NotificationFixture = {
  iconKey: NOTIFICATION_ICON_KEYS.ALARM,
  variant: NOTIFICATION_VARIANTS.NO_READ,
  companyName: COMPANY_NAME,
  receivedAt: RECEIVED_AT,
  title: '공휴일, 식기 사용시 주문 필요',
  description:
    '공휴일에는 자동으로 주문되지 않아요\n식기를 사용한다면 주문해 주세요',
};

const INVOICE_ISSUED: NotificationFixture = {
  iconKey: NOTIFICATION_ICON_KEYS.INVOICE,
  variant: NOTIFICATION_VARIANTS.READ,
  companyName: COMPANY_NAME,
  receivedAt: RECEIVED_AT,
  title: '{n}월 최종 결제 금액이 나왔어요',
  description: '이용 내역을 확인해보세요\n거래명세서를 다운받을 수 있습니다',
};

const CONTRACT_DONE: NotificationFixture = {
  iconKey: NOTIFICATION_ICON_KEYS.CHECK_CIRCLE,
  variant: NOTIFICATION_VARIANTS.READ,
  companyName: COMPANY_NAME,
  receivedAt: RECEIVED_AT,
  title: '뽀득 계약 완료!',
  description: '이제부터 뽀득을 이용할 수 있어요',
};

const NOTIFICATIONS = [
  SERVICE_ENDED,
  ORDER_DEADLINE,
  HOLIDAY_ORDER,
  INVOICE_ISSUED,
  CONTRACT_DONE,
];

// 기획 [알림 유형]에서 바로가기가 붙는 것은 (2) (3) (4)뿐이다
const WITH_ACTION = [ORDER_DEADLINE, HOLIDAY_ORDER, INVOICE_ISSUED];

const meta = {
  title: 'core/biz-ui/Notification',
  component: Notification,
  decorators: [withScreenWidth],
  argTypes: {
    // 타입은 모든 phosphor 아이콘을 받지만 컨트롤은 Figma가 정의한 3종만 노출한다
    iconKey: {
      control: 'inline-radio',
      options: Object.values(NOTIFICATION_ICON_KEYS),
      type: { name: 'string', required: true },
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(NOTIFICATION_ICON_KEYS),
          }),
        },
      },
    },
    variant: {
      control: 'inline-radio',
      options: Object.values(NOTIFICATION_VARIANTS),
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(NOTIFICATION_VARIANTS),
          }),
        },
      },
    },
    companyName: { control: 'text', type: { name: 'string', required: true } },
    receivedAt: { control: 'text', type: { name: 'string', required: true } },
    title: { control: 'text', type: { name: 'string', required: true } },
    description: { control: 'text', type: { name: 'string', required: true } },
    onAction: { action: 'action' },
  },
  args: ORDER_DEADLINE,
} satisfies Meta<NotificationProps>;

export default meta;

type Story = StoryObj<NotificationProps>;

export const Default: Story = {};

// Figma 심볼 4종. onAction을 넘기지 않은 카드는 바로가기 버튼도 클릭도 없다
export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: ({ onAction }) => (
    <>
      {[SERVICE_ENDED, ORDER_DEADLINE, CONTRACT_DONE, INVOICE_ISSUED].map(
        (notification) => (
          <Notification
            key={notification.title}
            {...notification}
            onAction={WITH_ACTION.includes(notification) ? onAction : undefined}
          />
        ),
      )}
    </>
  ),
};

// 알림함 화면 그대로. 카드가 간격 · 구분선 없이 붙고 배경색만으로 갈린다
export const List: Story = {
  parameters: { controls: { disable: true } },
  render: ({ onAction }) => (
    <>
      {NOTIFICATIONS.map((notification) => (
        <Notification
          key={notification.title}
          {...notification}
          onAction={WITH_ACTION.includes(notification) ? onAction : undefined}
        />
      ))}
    </>
  ),
};

// 업체명만 말줄임되고 제목 · 설명은 줄바꿈으로 흐른다 (카드 높이를 고정하지 않았다)
export const LongText: Story = {
  parameters: { controls: { disable: true } },
  render: ({ onAction }) => (
    <Notification
      companyName='아주 긴 이름을 가진 최고의 맛 한식뷔페 강남점 본관 1층'
      description='설명이 길어지면 줄바꿈되어 카드 높이가 그만큼 늘어납니다 말줄임 처리를 하지 않았습니다'
      iconKey={NOTIFICATION_ICON_KEYS.ALARM}
      receivedAt={RECEIVED_AT}
      title='제목이 아주 길어져서 두 줄을 넘어가도 잘리지 않고 그대로 흐릅니다'
      onAction={onAction}
    />
  ),
};

// w-full이라 좁아지면 텍스트만 줄고 아이콘 14 · gap 8 · 패딩 20은 그대로여야 한다
export const Narrow: Story = {
  parameters: { controls: { disable: true } },
  render: ({ onAction }) => (
    <div className={NARROW_SCREEN_WIDTH}>
      <Notification {...ORDER_DEADLINE} onAction={onAction} />
    </div>
  ),
};
