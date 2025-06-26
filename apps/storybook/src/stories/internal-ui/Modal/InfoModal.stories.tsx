import { Button, InfoModal } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { default as ConfirmModalMeta } from '@/stories/internal-ui/Modal/ConfirmModal.stories';

const {
  isOpen,
  title,
  onCancel,
  onConfirm,
  confirmButtonLabel,
  cancelButtonLabel,
  isLoading,
} = ConfirmModalMeta.argTypes ?? {};

const meta: Meta<typeof InfoModal> = {
  title: 'core/internal-ui/Modal/InfoModal',
  component: InfoModal,
  argTypes: {
    isOpen,
    title,
    onCancel,
    onConfirm,
    confirmButtonLabel,
    isLoading,
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
  title: '한줄 타이틀이 들어갑니다',
  confirmButtonLabel: '확인 완료',
};

const Box = () => <div className='bg-gray-02 rounded-8 h-[11.687rem] w-full' />;

export const Default: Story = {
  args: defaultArgs,
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button label='Open Modal' onClick={() => setIsOpen(true)} />
        <InfoModal {...args} isOpen={isOpen} onConfirm={() => setIsOpen(false)}>
          <div className='flex-v-stack gap-y-5'>
            <InfoModal.Description
              description={
                <>
                  설명글이 세 줄 이상 들어가나요? <br />
                  이 타입의 모달을 사용하여 줄글로 설명을 적어보세요 <br />
                  사용자에게 안내 메세지를 전달하세요
                </>
              }
            />
            <Box />
          </div>
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
          <div className='flex-v-stack gap-y-5'>
            <InfoModal.Description
              description={
                <>
                  설명글이 세 줄 이상 들어가나요? <br />
                  이 타입의 모달을 사용하여 줄글로 설명을 적어보세요 <br />
                  사용자에게 안내 메세지를 전달하세요
                </>
              }
            />
            <Box />
          </div>
        </InfoModal>
      </>
    );
  },
};
