import { FaqAccordion, FaqAccordionProps, Flex } from '@bbodek/biz-ui';
import { Decorator, Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const SCREEN_WIDTH = 'w-[380px]';

const QUESTION = '주문은 언제까지 변경할 수 있나요?';

const ANSWER =
  '사용일 기준 2일 전 오후 3시까지 변경할 수 있습니다. 마감 이후에는 고객센터로 문의해 주세요.';

const LONG_ANSWER =
  '사용일 기준 2일 전 오후 3시까지 변경할 수 있습니다. 마감 이후에는 고객센터로 문의해 주세요. 주말과 공휴일은 마감 기준에서 제외되며, 연휴가 낀 주에는 별도 공지로 안내드립니다.';

const withScreenWidth: Decorator = (Story) => (
  <div className={SCREEN_WIDTH}>
    <Story />
  </div>
);

const meta = {
  title: 'core/biz-ui/FaqAccordion',
  component: FaqAccordion,
  decorators: [withScreenWidth],
  argTypes: {
    question: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    answer: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    isOpen: {
      control: 'boolean',
      type: { name: 'boolean', required: true },
    },
    onToggle: { action: 'toggle' },
  },
  args: {
    question: QUESTION,
    answer: ANSWER,
    isOpen: false,
  },
} satisfies Meta<FaqAccordionProps>;

export default meta;

type Story = StoryObj<FaqAccordionProps>;

export const Default: Story = {};

export const Interactive: Story = {
  parameters: { controls: { disable: true } },
  render: ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <FaqAccordion
        answer={answer}
        isOpen={isOpen}
        question={question}
        onToggle={() => setIsOpen(!isOpen)}
      />
    );
  },
};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: ({ question, answer, onToggle }) => (
    <Flex direction='column'>
      {[false, true].map((isOpen) => (
        <FaqAccordion
          answer={answer}
          isOpen={isOpen}
          key={String(isOpen)}
          question={question}
          onToggle={onToggle}
        />
      ))}
    </Flex>
  ),
};

export const LongText: Story = {
  parameters: { controls: { disable: true } },
  render: ({ onToggle }) => (
    <FaqAccordion
      answer={LONG_ANSWER}
      question='주문 마감 시간과 배송 일정은 어떻게 계산되나요? 공휴일이 끼면 어떻게 되나요?'
      isOpen
      onToggle={onToggle}
    />
  ),
};
