import {
  Button,
  COLOR_VARIANTS,
  ConfirmModal,
  ConfirmModalProps,
} from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { default as IconMeta } from '@/stories/internal-ui/Icon.stories';
import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const { iconKey } = IconMeta.argTypes ?? {};

type IconOptions = Required<ConfirmModalProps>['iconOptions'];

interface ConfirmModalArgs extends Omit<ConfirmModalProps, 'iconOptions'> {
  iconKey?: IconOptions['iconKey'];
  iconColor?: IconOptions['color'];
  iconBackgroundColor?: IconOptions['backgroundColor'];
}

const meta: Meta<ConfirmModalArgs> = {
  title: 'core/internal-ui/Modal/ConfirmModal',
  component: ConfirmModal,
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'is open modal',
      type: 'boolean',
    },
    title: {
      control: 'text',
      description: 'modal title',
      type: {
        required: true,
        name: 'string',
      },
    },
    description: {
      control: 'object',
      description: 'modal description',
      type: {
        required: true,
        name: 'string',
      },
    },
    useIcon: {
      control: 'boolean',
      description: 'use info icon',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    iconKey: {
      ...iconKey,
      table: {
        ...iconKey?.table,
        defaultValue: {
          summary: 'exclamation-mark',
        },
      },
      type: {
        required: false,
        name: 'string',
      },
    },
    iconColor: {
      control: 'select',
      options: Object.values(COLOR_VARIANTS),
      description: 'icon color',
      table: {
        defaultValue: {
          summary: COLOR_VARIANTS.PRIMARY_04,
        },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(COLOR_VARIANTS),
          }),
        },
      },
    },
    iconBackgroundColor: {
      control: 'select',
      options: Object.values(COLOR_VARIANTS),
      description: 'icon background color',
      table: {
        defaultValue: {
          summary: COLOR_VARIANTS.PRIMARY_01,
        },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(COLOR_VARIANTS),
          }),
        },
      },
    },
    confirmButtonLabel: {
      control: 'text',
      description: 'confirm button label',
      type: 'string',
      table: {
        defaultValue: {
          summary: `'확인' (with cancel button: '네')`,
        },
      },
    },
    cancelButtonLabel: {
      control: 'text',
      description: 'cancel button label',
      type: 'string',
      table: {
        defaultValue: {
          summary: `'아니요'`,
        },
      },
    },
    onConfirm: {
      description: 'on confirm',
      type: {
        required: true,
        name: 'function',
      },
    },
    onCancel: {
      description: 'on cancel',
      type: 'function',
    },
  },
};

export default meta;

type Story = StoryObj<ConfirmModalArgs>;

export const Default: Story = {
  args: {
    useIcon: false,
    title: '승인신청이 완료되었습니다',
    description: '승인이 완료되면 슬랙으로 알려드립니다',
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
        <Button label='Open Modal' onClick={() => setIsOpen(true)} />
        <ConfirmModal
          {...rest}
          isOpen={isOpen}
          onConfirm={() => setIsOpen(false)}
          iconOptions={iconOptions}
        />
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
    description: '선택한 정보가 모두 삭제됩니다',
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
        <Button label='Open Modal' onClick={() => setIsOpen(true)} />
        <ConfirmModal
          {...rest}
          isOpen={isOpen}
          onConfirm={() => setIsOpen(false)}
          onCancel={() => setIsOpen(false)}
          iconOptions={iconOptions}
        />
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
    description: '선택한 정보가 모두 삭제됩니다',
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
        <Button label='Open Modal' onClick={() => setIsOpen(true)} />
        <ConfirmModal
          {...rest}
          isOpen={isOpen}
          onConfirm={() => setIsOpen(false)}
          onCancel={() => setIsOpen(false)}
          iconOptions={iconOptions}
        />
      </>
    );
  },
};
