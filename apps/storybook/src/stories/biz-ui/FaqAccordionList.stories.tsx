import {
  FAQ_ACCORDION_OPEN_MODES,
  FaqAccordionItem,
  FaqAccordionList,
  FaqAccordionListProps,
} from '@bbodek/biz-ui';
import { Decorator, Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const SCREEN_WIDTH = 'w-[380px]';

const ITEMS: FaqAccordionItem[] = [
  {
    id: 'order-change',
    question: '주문은 언제까지 변경할 수 있나요?',
    answer:
      '사용일 기준 2일 전 오후 3시까지 변경할 수 있습니다. 마감 이후에는 고객센터로 문의해 주세요.',
  },
  {
    id: 'order-stop',
    question: '방학 기간에 주문을 멈출 수 있나요?',
    answer:
      '주문 중지 기능으로 기간을 지정하면 해당 기간에는 주문이 생성되지 않습니다.',
  },
  {
    id: 'delivery-time',
    question: '배송은 몇 시에 오나요?',
    answer: '지역에 따라 다르며, 사용일 전날 오후에 순차 배송됩니다.',
  },
  {
    id: 'payment',
    question: '결제일은 언제인가요?',
    answer: '매월 말일에 이용 금액이 확정되고 다음 달 10일에 청구됩니다.',
  },
];

const withScreenWidth: Decorator = (Story) => (
  <div className={SCREEN_WIDTH}>
    <Story />
  </div>
);

const meta = {
  title: 'core/biz-ui/FaqAccordionList',
  component: FaqAccordionList,
  decorators: [withScreenWidth],
  argTypes: {
    openMode: {
      control: 'inline-radio',
      options: Object.values(FAQ_ACCORDION_OPEN_MODES),
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(FAQ_ACCORDION_OPEN_MODES),
          }),
        },
        defaultValue: { summary: FAQ_ACCORDION_OPEN_MODES.SINGLE },
      },
    },
  },
  args: { items: ITEMS },
} satisfies Meta<FaqAccordionListProps>;

export default meta;

type Story = StoryObj<FaqAccordionListProps>;

export const Default: Story = {};

export const SearchResult: Story = {
  parameters: { controls: { disable: true } },
  args: {
    items: ITEMS.slice(0, 2),
    openMode: FAQ_ACCORDION_OPEN_MODES.ALL,
  },
};
