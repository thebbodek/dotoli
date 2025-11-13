import { Button, ConfirmBottomSheet } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import {
  ConfirmModalArgs,
  default as ConfirmModalMeta,
} from '../Modal/ConfirmModal.stories';

const { isOpen, title, ...argsArgs } = ConfirmModalMeta.argTypes;

interface ConfirmBottomSheetArgs extends ConfirmModalArgs {}

const meta = {
  title: 'core/internal-ui/BottomSheet/ConfirmBottomSheet',
  component: ConfirmBottomSheet,
  argTypes: {
    ...argsArgs,
    isOpen: {
      ...isOpen,
      description: 'is open bottom sheet',
    },
    title: {
      ...title,
      description: 'bottom sheet title',
    },
  },
  args: {
    possibleConfirm: true,
  },
} satisfies Meta<ConfirmBottomSheetArgs>;

export default meta;

type Story = StoryObj<ConfirmBottomSheetArgs>;

export const Default: Story = {
  args: {
    title: '승인신청이 완료되었습니다',
  },
  render: ({
    iconKey,
    iconColor,
    iconBackgroundColor,
    cancelLabel,
    onCancel,
    confirmLabel,
    onConfirm,
    confirmTooltipContent,
    confirmTooltipUseTooltip,
    ...args
  }) => {
    const [isOpen, setIsOpen] = useState(false);

    const iconOption = {
      color: iconColor,
      backgroundColor: iconBackgroundColor,
      iconKey,
    };

    const confirmOption = args.confirmOption
      ? args.confirmOption
      : {
          label: confirmLabel || '확인',
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
        <Button label='Open BottomSheet' onClick={() => setIsOpen(true)} />
        <ConfirmBottomSheet
          {...args}
          confirmOption={{
            ...confirmOption,
            onConfirm: () => setIsOpen(false),
          }}
          cancelOption={cancelOption}
          iconOption={iconOption}
          isOpen={isOpen}
        >
          <ConfirmBottomSheet.Description description='승인이 완료되면 슬랙으로 알려드립니다' />
        </ConfirmBottomSheet>
      </>
    );
  },
};

export const WithClose: Story = {
  args: {
    title: (
      <>
        삭제한 정보는 복구할 수 없습니다
        <br /> 정보를 삭제하시겠습니까?
      </>
    ),
  },
  render: ({
    iconKey,
    iconColor,
    iconBackgroundColor,
    cancelLabel,
    onCancel,
    confirmLabel,
    onConfirm,
    confirmTooltipContent,
    confirmTooltipUseTooltip,
    ...args
  }) => {
    const [isOpen, setIsOpen] = useState(false);

    const iconOption = {
      color: iconColor,
      backgroundColor: iconBackgroundColor,
      iconKey,
    };

    const confirmOption = args.confirmOption
      ? args.confirmOption
      : {
          label: confirmLabel || '네',
          onConfirm,
          tooltipOption: {
            content: confirmTooltipContent,
            useTooltip: confirmTooltipUseTooltip,
          },
        };

    const cancelOption = args.cancelOption
      ? args.cancelOption
      : {
          label: cancelLabel || '아니요',
          onCancel,
        };

    return (
      <>
        <Button label='Open BottomSheet' onClick={() => setIsOpen(true)} />
        <ConfirmBottomSheet
          {...args}
          cancelOption={{
            ...cancelOption,
            onCancel: () => setIsOpen(false),
          }}
          confirmOption={{
            ...confirmOption,
            onConfirm: () => setIsOpen(false),
          }}
          iconOption={iconOption}
          isOpen={isOpen}
        >
          <ConfirmBottomSheet.Description description='선택한 정보가 모두 삭제됩니다' />
        </ConfirmBottomSheet>
      </>
    );
  },
};

export const WithIcon: Story = {
  args: {
    useIcon: true,
    title: (
      <>
        삭제한 정보는 복구할 수 없습니다 <br />
        정보를 삭제하시겠습니까?
      </>
    ),
  },
  render: ({
    iconKey,
    iconColor,
    iconBackgroundColor,
    cancelLabel,
    onCancel,
    confirmLabel,
    onConfirm,
    confirmTooltipContent,
    confirmTooltipUseTooltip,
    ...args
  }) => {
    const [isOpen, setIsOpen] = useState(false);

    const iconOption = {
      color: iconColor,
      backgroundColor: iconBackgroundColor,
      iconKey,
    };

    const confirmOption = args.confirmOption
      ? args.confirmOption
      : {
          label: confirmLabel || '네',
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
        <Button label='Open BottomSheet' onClick={() => setIsOpen(true)} />
        <ConfirmBottomSheet
          {...args}
          cancelOption={{
            ...cancelOption,
            onCancel: () => setIsOpen(false),
          }}
          confirmOption={{
            ...confirmOption,
            onConfirm: () => setIsOpen(false),
          }}
          iconOption={iconOption}
          isOpen={isOpen}
        >
          <ConfirmBottomSheet.Description description='선택한 정보가 모두 삭제됩니다' />
        </ConfirmBottomSheet>
      </>
    );
  },
};
