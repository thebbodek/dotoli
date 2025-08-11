import { Button, ConfirmBottomSheet } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import {
  ConfirmModalArgs,
  default as ConfirmModalMeta,
} from '@/stories/internal-ui/Modal/ConfirmModal.stories';

const { isOpen, title, ...restArgs } = ConfirmModalMeta.argTypes ?? {};

interface ConfirmBottomSheetArgs extends ConfirmModalArgs {}

const meta: Meta<ConfirmBottomSheetArgs> = {
  title: 'core/internal-ui/BottomSheet/ConfirmBottomSheet',
  component: ConfirmBottomSheet,
  argTypes: {
    ...restArgs,
    isOpen: {
      ...isOpen,
      description: 'is open bottom sheet',
    },
    title: {
      ...title,
      description: 'bottom sheet title',
    },
  },
};

export default meta;

type Story = StoryObj<ConfirmBottomSheetArgs>;

export const Default: Story = {
  args: {
    useIcon: false,
    title: '승인신청이 완료되었습니다',
    confirmOption: {
      label: '확인',
      onConfirm: () => {},
    },
    possibleConfirm: true,
  },
  render: ({ iconKey, iconColor, iconBackgroundColor, ...rest }) => {
    const [isOpen, setIsOpen] = useState(false);

    const iconOptions = {
      color: iconColor,
      backgroundColor: iconBackgroundColor,
      iconKey,
    };

    return (
      <>
        <Button label='Open BottomSheet' onClick={() => setIsOpen(true)} />
        <ConfirmBottomSheet
          {...rest}
          isOpen={isOpen}
          confirmOption={{
            label: rest.confirmOption?.label ?? '확인',
            onConfirm: () => setIsOpen(false),
          }}
          iconOptions={iconOptions}
        >
          <ConfirmBottomSheet.Description description='승인이 완료되면 슬랙으로 알려드립니다' />
        </ConfirmBottomSheet>
      </>
    );
  },
};

export const WithClose: Story = {
  args: {
    useIcon: false,
    title: (
      <>
        삭제한 정보는 복구할 수 없습니다
        <br /> 정보를 삭제하시겠습니까?
      </>
    ),
    confirmOption: {
      label: '네',
      onConfirm: () => {},
    },
    cancelOption: {
      label: '아니요',
    },
    possibleConfirm: true,
  },
  render: ({ iconKey, iconColor, iconBackgroundColor, ...rest }) => {
    const [isOpen, setIsOpen] = useState(false);

    const iconOptions = {
      color: iconColor,
      backgroundColor: iconBackgroundColor,
      iconKey,
    };

    return (
      <>
        <Button label='Open BottomSheet' onClick={() => setIsOpen(true)} />
        <ConfirmBottomSheet
          {...rest}
          isOpen={isOpen}
          confirmOption={{
            ...rest.confirmOption,
            onConfirm: () => setIsOpen(false),
          }}
          cancelOption={{
            ...rest.cancelOption,
            onCancel: () => setIsOpen(false),
          }}
          iconOptions={iconOptions}
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
    confirmOption: {
      label: '네',
      onConfirm: () => {},
    },
    cancelOption: {
      label: '아니요',
    },
    possibleConfirm: true,
  },
  render: ({ iconKey, iconColor, iconBackgroundColor, ...rest }) => {
    const [isOpen, setIsOpen] = useState(false);

    const iconOptions = {
      color: iconColor,
      backgroundColor: iconBackgroundColor,
      iconKey,
    };

    return (
      <>
        <Button label='Open BottomSheet' onClick={() => setIsOpen(true)} />
        <ConfirmBottomSheet
          {...rest}
          isOpen={isOpen}
          confirmOption={{
            ...rest.confirmOption,
            onConfirm: () => setIsOpen(false),
          }}
          cancelOption={{
            ...rest.cancelOption,
            onCancel: () => setIsOpen(false),
          }}
          iconOptions={iconOptions}
        >
          <ConfirmBottomSheet.Description description='선택한 정보가 모두 삭제됩니다' />
        </ConfirmBottomSheet>
      </>
    );
  },
};
