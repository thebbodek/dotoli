import { Button, InfoModal } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { default as ConfirmModalMeta } from '@/stories/internal-ui/ConfirmModal.stories';

const {
  isOpen,
  title,
  description,
  onCancel,
  onConfirm,
  confirmButtonLabel,
  cancelButtonLabel,
} = ConfirmModalMeta.argTypes ?? {};

const meta: Meta<typeof InfoModal> = {
  title: 'core/internal-ui/Modal/InfoModal',
  component: InfoModal,
  argTypes: {
    isOpen,
    title,
    description,
    onCancel,
    onConfirm,
    confirmButtonLabel: {
      ...confirmButtonLabel,
      table: {
        defaultValue: {
          summary: '확인 완료',
        },
      },
    },
    cancelButtonLabel: {
      ...cancelButtonLabel,
      table: {
        defaultValue: {
          summary: '닫기',
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof InfoModal>;

const defaultArgs = {
  title: '승인신청이 완료되었습니다',
  description: (
    <>
      설명글이 세 줄 이상 들어가나요? <br />
      이 타입의 모달을 사용하여 줄글로 설명을 적어보세요 <br />
      사용자에게 안내 메세지를 전달하세요
    </>
  ),
};

const Box = () => <div className='bg-gray-01 rounded-8 h-[11.687rem] w-full' />;

export const Default: Story = {
  args: defaultArgs,
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button label='Open Modal' onClick={() => setIsOpen(true)} />
        <InfoModal
          {...args}
          description={args.description}
          isOpen={isOpen}
          onConfirm={() => setIsOpen(false)}
        >
          <Box />
        </InfoModal>
      </>
    );
  },
};

export const WithClose: Story = {
  args: { ...defaultArgs, confirmButtonLabel: '바로가기' },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button label='Open Modal' onClick={() => setIsOpen(true)} />
        <InfoModal
          {...args}
          isOpen={isOpen}
          onConfirm={() => setIsOpen(false)}
          onCancel={() => setIsOpen(false)}
        >
          <Box />
        </InfoModal>
      </>
    );
  },
};
