import { Button, InfoModal, InfoModalProps } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import {
  ConfirmModalArgs,
  default as ConfirmModalMeta,
} from '../Modal/ConfirmModal.stories';

const {
  isOpen,
  title,
  confirmOption,
  confirmLabel,
  onConfirm,
  confirmTooltipContent,
  confirmTooltipUseTooltip,
  cancelOption,
  cancelLabel,
  onCancel,
  isLoading,
  ref,
  className,
  children,
} = ConfirmModalMeta.argTypes;

export interface InfoModalArgs
  extends Pick<ConfirmModalArgs, keyof InfoModalProps>,
    Pick<
      ConfirmModalArgs,
      | 'confirmLabel'
      | 'onConfirm'
      | 'confirmTooltipContent'
      | 'confirmTooltipUseTooltip'
      | 'cancelLabel'
      | 'onCancel'
    > {}

const meta = {
  title: 'core/internal-ui/Modal/InfoModal',
  component: InfoModal,
  argTypes: {
    isOpen,
    title,
    confirmOption,
    confirmLabel,
    onConfirm,
    confirmTooltipContent,
    confirmTooltipUseTooltip,
    cancelOption,
    cancelLabel: {
      ...cancelLabel,
      table: {
        ...cancelLabel?.table,
        defaultValue: {
          summary: '닫기',
        },
      },
    },
    onCancel,
    isLoading,
    ref,
    className,
    children,
  },
  args: {
    title: '한줄 타이틀이 들어갑니다',
  },
} satisfies Meta<InfoModalArgs>;

export default meta;

type Story = StoryObj<InfoModalArgs>;

const Box = () => (
  <div className='bg-in-gray-02 rounded-in-8 h-[11.687rem] w-full' />
);

export const Default: Story = {
  render: ({
    cancelLabel,
    onCancel,
    confirmLabel,
    onConfirm,
    confirmTooltipContent,
    confirmTooltipUseTooltip,
    ...args
  }) => {
    const [isOpen, setIsOpen] = useState(false);

    const confirmOption = args.confirmOption
      ? args.confirmOption
      : {
          label: confirmLabel || '확인 완료',
          onConfirm,
          tooltipOption: {
            content: confirmTooltipContent,
            useTooltip: confirmTooltipUseTooltip,
          },
        };

    const cancelOption = args.cancelOption
      ? args.cancelOption
      : {
          label: cancelLabel,
          onCancel,
        };

    return (
      <>
        <Button label='Open Modal' onClick={() => setIsOpen(true)} />
        <InfoModal
          {...args}
          isOpen={isOpen}
          confirmOption={{
            ...confirmOption,
            onConfirm: () => setIsOpen(false),
          }}
          cancelOption={cancelOption}
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
  render: ({
    confirmLabel,
    onConfirm,
    confirmTooltipContent,
    confirmTooltipUseTooltip,
    cancelLabel,
    onCancel,
    ...args
  }) => {
    const [isOpen, setIsOpen] = useState(false);

    const confirmOption = args.confirmOption
      ? args.confirmOption
      : {
          label: confirmLabel || '바로가기',
          onConfirm,
          tooltipOption: {
            content: confirmTooltipContent,
            useTooltip: confirmTooltipUseTooltip,
          },
        };

    const cancelOption = args.cancelOption
      ? args.cancelOption
      : {
          label: cancelLabel,
          onCancel,
        };

    return (
      <>
        <Button label='Open Modal' onClick={() => setIsOpen(true)} />
        <InfoModal
          {...args}
          isOpen={isOpen}
          confirmOption={{
            ...confirmOption,
            onConfirm: () => setIsOpen(false),
          }}
          cancelOption={{
            ...cancelOption,
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
