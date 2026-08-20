import {
  CONFIRM_MODAL_TITLE_ELEMENTS,
  ConfirmModal,
  ConfirmModalProps,
  CtaButton,
} from '@bbodek/biz-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const TITLE = '주문을 멈추고 이전으로 돌아갈까요?';

const DESCRIPTION = '입력한 주문이 모두 삭제됩니다';

const PAGE_STYLE =
  'flex-v-stack h-[520px] w-[380px] gap-[12px] bg-gray-50 p-[20px]';

const meta = {
  title: 'core/biz-ui/ConfirmModal',
  component: ConfirmModal,
  argTypes: {
    title: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    titleAs: {
      control: 'inline-radio',
      options: Object.values(CONFIRM_MODAL_TITLE_ELEMENTS),
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(CONFIRM_MODAL_TITLE_ELEMENTS),
          }),
        },
        defaultValue: { summary: CONFIRM_MODAL_TITLE_ELEMENTS.P },
      },
    },
    description: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    onClose: { action: 'close' },
  },
  args: {
    title: TITLE,
    description: DESCRIPTION,
  },
} satisfies Meta<ConfirmModalProps>;

export default meta;

type Story = StoryObj<ConfirmModalProps>;

export const Default: Story = {
  render: ({ title, titleAs, description, onClose }) => {
    const [isOpen, setIsOpen] = useState(false);
    const close = () => setIsOpen(false);

    return (
      <div className={PAGE_STYLE}>
        <CtaButton label='모달 열기' onClick={() => setIsOpen(true)} />
        <ConfirmModal
          confirm={{ label: '확인', onClick: close }}
          description={description}
          isOpen={isOpen}
          title={title}
          titleAs={titleAs}
          onClose={onClose}
        />
      </div>
    );
  },
};

export const TwoActions: Story = {
  parameters: { controls: { disable: true } },
  render: ({ title, description }) => {
    const [isOpen, setIsOpen] = useState(false);
    const close = () => setIsOpen(false);

    return (
      <div className={PAGE_STYLE}>
        <CtaButton label='모달 열기' onClick={() => setIsOpen(true)} />
        <ConfirmModal
          cancel={{ label: '삭제', onClick: close }}
          confirm={{ label: '계속 주문', onClick: close }}
          description={description}
          isOpen={isOpen}
          title={title}
          onClose={close}
        />
      </div>
    );
  },
};

export const Nested: Story = {
  parameters: { controls: { disable: true } },
  render: ({ description }) => {
    const [isLowerOpen, setIsLowerOpen] = useState(false);
    const [isUpperOpen, setIsUpperOpen] = useState(false);

    return (
      <div className={PAGE_STYLE}>
        <CtaButton
          label='아래 모달 열기'
          onClick={() => setIsLowerOpen(true)}
        />
        <ConfirmModal
          confirm={{
            label: '위에 하나 더 열기',
            onClick: () => setIsUpperOpen(true),
          }}
          description='ESC를 누르면 위에 쌓인 모달만 닫혀야 합니다'
          isOpen={isLowerOpen}
          title='아래 모달'
          onClose={() => setIsLowerOpen(false)}
        />
        <ConfirmModal
          confirm={{ label: '확인', onClick: () => setIsUpperOpen(false) }}
          description={description}
          isOpen={isUpperOpen}
          title='위 모달'
          onClose={() => setIsUpperOpen(false)}
        />
      </div>
    );
  },
};
