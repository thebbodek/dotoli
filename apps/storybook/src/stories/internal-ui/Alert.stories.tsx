import { Alert, ALERT_THEMES, Typography } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';

import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';

const meta: Meta<typeof Alert> = {
  title: 'core/internal-ui/Alert',
  component: Alert,
  argTypes: {
    content: {
      control: 'object',
      description: 'Alert content',
      type: {
        required: true,
        name: 'string',
      },
    },
    title: {
      control: 'object',
      description: 'Alert title',
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
    collapsible: {
      control: 'boolean',
      description: 'Alert collapsible',
    },
    useClose: {
      control: 'boolean',
      description: 'use close',
    },
    actionOption: {
      control: 'object',
      description: 'Alert button option',
    },
    iconOption: {
      control: 'object',
      description: 'Alert icon option',
    },
  },
};

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

export const WithDescription: Story = {
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
            title={undefined}
            theme={theme}
          />
        ))}
        {Object.values(ALERT_THEMES).map((theme) => (
          <Alert
            key={theme}
            {...args}
            collapsible={args.collapsible ?? true}
            theme={theme}
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
            title={undefined}
            theme={theme}
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
    collapsible: true,
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
