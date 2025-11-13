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

type IconOptions = Required<ConfirmModalProps>['iconOption'];

export interface ConfirmModalArgs extends ConfirmModalProps {
  iconKey?: IconOptions['iconKey'];
  iconColor?: IconOptions['color'];
  iconBackgroundColor?: IconOptions['backgroundColor'];
  cancelLabel?: NonNullable<ConfirmModalProps['cancelOption']>['label'];
  onCancel?: NonNullable<ConfirmModalProps['cancelOption']>['onCancel'];
  confirmLabel?: ConfirmModalProps['confirmOption']['label'];
  onConfirm?: ConfirmModalProps['confirmOption']['onConfirm'];
  confirmTooltipContent?: NonNullable<
    ConfirmModalProps['confirmOption']['tooltipOption']
  >['content'];
  confirmTooltipUseTooltip?: NonNullable<
    ConfirmModalProps['confirmOption']['tooltipOption']
  >['useTooltip'];
}

const meta = {
  title: 'core/internal-ui/Modal/ConfirmModal',
  component: ConfirmModal,
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'is open modal',
      type: { name: 'boolean', required: true },
    },
    title: {
      control: 'object',
      description: 'modal title',
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
    iconOption: {
      control: 'object',
      description: 'icon iconKey, color, backgroundColor',
      table: {
        type: {
          summary: 'object',
        },
      },
    },
    iconKey: {
      ...iconKey,
      table: {
        ...iconKey?.table,
        category: 'iconOption',
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
      name: 'color',
      options: Object.values(COLOR_VARIANTS),
      description: 'icon color',
      table: {
        category: 'iconOption',
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
      name: 'backgroundColor',
      options: Object.values(COLOR_VARIANTS),
      description: 'icon background color',
      table: {
        category: 'iconOption',
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
    confirmOption: {
      control: 'object',
      description: 'confirm button label, onConfirm',
      type: {
        required: true,
        name: 'string',
      },
    },
    cancelOption: {
      control: 'object',
      description: 'cancel button label, onCancel',
      table: {
        type: {
          summary: 'object',
        },
      },
    },
    confirmLabel: {
      name: 'label',
      control: 'text',
      description: 'confirm button label',
      type: {
        required: true,
        name: 'string',
      },
      table: {
        category: 'confirmOption',
      },
    },
    onConfirm: {
      description: 'confirm button click',
      type: {
        required: true,
        name: 'function',
      },
      table: {
        category: 'confirmOption',
      },
    },
    confirmTooltipContent: {
      control: 'text',
      name: 'content',
      description: 'confirm button tooltip content',
      table: {
        category: 'confirmOption',
        subcategory: 'tooltipOption',
        defaultValue: {
          summary: '필수 항목을 모두 입력해주세요',
        },
        type: {
          summary: 'ReactNode',
        },
      },
    },
    confirmTooltipUseTooltip: {
      control: 'boolean',
      name: 'useTooltip',
      description: 'confirm button use tooltip',
      type: 'boolean',
      table: {
        category: 'confirmOption',
        subcategory: 'tooltipOption',
        defaultValue: {
          summary: '!possibleConfirm',
        },
      },
    },
    cancelLabel: {
      name: 'label',
      control: 'text',
      description: 'cancel button label',
      type: 'string',
      table: {
        category: 'cancelOption',
        defaultValue: {
          summary: '취소',
        },
      },
    },
    onCancel: {
      description: 'cancel button click',
      type: 'function',
      table: {
        category: 'cancelOption',
      },
    },
    possibleConfirm: {
      control: 'boolean',
      description: 'possible confirm',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    isPending: {
      control: 'boolean',
      description: 'data fetching is pending',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'is loading',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    children: {
      control: 'object',
      description: 'children',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
    className: {
      control: 'text',
      description: 'className',
      type: 'string',
    },
    ref: {
      description: 'ref',
      table: {
        type: {
          summary: 'Ref<HTMLDialogElement>',
        },
      },
    },
  },
} satisfies Meta<ConfirmModalArgs>;

export default meta;

type Story = StoryObj<ConfirmModalArgs>;

export const Default: Story = {
  args: {
    useIcon: false,
    title: '승인신청이 완료되었습니다',
    possibleConfirm: true,
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
        <Button label='Open Modal' onClick={() => setIsOpen(true)} />
        <ConfirmModal
          {...args}
          confirmOption={{
            ...confirmOption,
            onConfirm: () => setIsOpen(false),
          }}
          cancelOption={cancelOption}
          iconOption={iconOption}
          isOpen={isOpen}
        >
          <ConfirmModal.Description description='승인이 완료되면 슬랙으로 알려드립니다' />
        </ConfirmModal>
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
    possibleConfirm: true,
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
        <Button label='Open Modal' onClick={() => setIsOpen(true)} />
        <ConfirmModal
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
          <ConfirmModal.Description description='선택한 정보가 모두 삭제됩니다' />
        </ConfirmModal>
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
    possibleConfirm: true,
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
        <Button label='Open Modal' onClick={() => setIsOpen(true)} />
        <ConfirmModal
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
          <ConfirmModal.Description description='선택한 정보가 모두 삭제됩니다' />
        </ConfirmModal>
      </>
    );
  },
};
