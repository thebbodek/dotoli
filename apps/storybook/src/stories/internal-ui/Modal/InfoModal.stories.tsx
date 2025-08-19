import { Button, InfoModal } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { default as ConfirmModalMeta } from '../Modal/ConfirmModal.stories';

const { isOpen, title, confirmOption, cancelOption, isLoading } =
  ConfirmModalMeta.argTypes ?? {};

const meta: Meta<typeof InfoModal> = {
  title: 'core/internal-ui/Modal/InfoModal',
  component: InfoModal,
  argTypes: {
    isOpen,
    title,
    confirmOption,
    cancelOption,
    isLoading,
  },
};

export default meta;

type Story = StoryObj<typeof InfoModal>;

const defaultArgs = {
  title: '한줄 타이틀이 들어갑니다',
  confirmOption: { label: '확인 완료', onConfirm: () => {} },
};

const Box = () => (
  <div className='bg-in-gray-02 rounded-in-8 h-[11.687rem] w-full' />
);

export const Default: Story = {
  args: defaultArgs,
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button label='Open Modal' onClick={() => setIsOpen(true)} />
        <InfoModal
          {...args}
          isOpen={isOpen}
          confirmOption={{
            ...args.confirmOption,
            onConfirm: () => setIsOpen(false),
          }}
        >
          <div className='in-flex-v-stack gap-y-5'>
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
  args: {
    ...defaultArgs,
    confirmOption: { label: '바로가기', onConfirm: () => {} },
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button label='Open Modal' onClick={() => setIsOpen(true)} />
        <InfoModal
          {...args}
          isOpen={isOpen}
          confirmOption={{
            ...args.confirmOption,
            onConfirm: () => setIsOpen(false),
          }}
          cancelOption={{
            ...args.cancelOption,
            onCancel: () => setIsOpen(false),
          }}
        >
          <div className='in-flex-v-stack gap-y-5'>
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
