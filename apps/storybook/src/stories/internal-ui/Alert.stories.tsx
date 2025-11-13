import { Alert, ALERT_THEMES, Typography } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const meta = {
  title: 'core/internal-ui/Alert',
  component: Alert,
  argTypes: {
    content: {
      control: 'object',
      description: 'Alert content',
      type: {
        name: 'other',
        value: 'ReactNode',
        required: true,
      },
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
    title: {
      control: 'text',
      description: 'Alert title',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
    theme: {
      control: 'select',
      options: Object.values(ALERT_THEMES),
      description: 'Alert theme',
      table: {
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(ALERT_THEMES),
          }),
        },
        defaultValue: {
          summary: ALERT_THEMES.PRIMARY,
        },
      },
    },
    useCollapse: {
      control: 'boolean',
      type: 'boolean',
      description: 'Alert collapsible',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    useClose: {
      control: 'boolean',
      type: 'boolean',
      description: 'use close',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    actionOption: {
      control: 'object',
      description: 'Alert button option',
      table: {
        type: {
          summary:
            'Partial<Pick<ActionButtonProps, "as" | "buttonOption" | "disabled" | "label" | "linkOption" | "responsive">>',
        },
      },
    },
    iconOption: {
      control: 'object',
      description: 'Alert icon option',
      table: {
        type: {
          summary: 'Pick<IconProps, "iconKey">',
        },
      },
    },
    className: {
      control: 'text',
      description: 'Alert className',
      type: 'string',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    content: (
      <>
        배송유형 변경 예정이{' '}
        <Typography as='strong' variant='body-14-b'>
          1건
        </Typography>{' '}
        있습니다
      </>
    ),
    className: 'w-[600px]',
  },
};

const commonArgs = {
  title: '타이틀이 들어갑니다',
  content:
    '내용이 들어갑니다 내용이 들어갑니다 내용이 들어갑니다 내용이 들어갑니다 내용이 들어갑니다 내용이 들어갑니다 내용이 들어갑니다',
};

export const WithTitle: Story = {
  args: {
    ...commonArgs,
    className: 'w-[490px]',
  },
};

export const WithButton: Story = {
  args: {
    ...commonArgs,
    className: 'w-[490px]',
    actionOption: {
      linkOption: {
        href: 'https://www.google.com',
        target: '_blank',
      },
    },
  },
  render: (args) => {
    return (
      <div className='in-flex-v-stack gap-y-2'>
        {Object.values(ALERT_THEMES).map((theme) => (
          <Alert
            key={theme}
            {...args}
            content={Default.args?.content}
            theme={theme}
            title={undefined}
          />
        ))}
        {Object.values(ALERT_THEMES).map((theme) => (
          <Alert
            key={theme}
            {...args}
            theme={theme}
            useCollapse={args.useCollapse ?? true}
          />
        ))}
      </div>
    );
  },
};

export const WithClose: Story = {
  args: {
    ...commonArgs,
    className: 'w-[490px]',
    useClose: true,
  },
  render: (args) => {
    return (
      <div className='in-flex-v-stack gap-y-2'>
        {Object.values(ALERT_THEMES).map((theme) => (
          <Alert
            key={theme}
            {...args}
            content={Default.args?.content}
            theme={theme}
            title={undefined}
          />
        ))}
        {Object.values(ALERT_THEMES).map((theme) => (
          <Alert key={theme} {...args} theme={theme} />
        ))}
      </div>
    );
  },
};

export const WithCollapsible: Story = {
  args: {
    ...commonArgs,
    className: 'w-[490px]',
    useCollapse: true,
  },
  render: (args) => {
    return (
      <div className='in-flex-v-stack gap-y-2'>
        {Object.values(ALERT_THEMES).map((theme) => (
          <Alert key={theme} {...args} theme={theme} />
        ))}
      </div>
    );
  },
};
